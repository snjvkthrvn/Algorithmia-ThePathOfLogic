using UnityEngine;
using UnityEditor;
using System.Collections.Generic;
using System.Linq;

namespace Algorithmia.Editor
{
    /// <summary>
    /// Editor utility to help create animation clips from sprite sequences.
    /// Accessible via Tools > Algorithmia > Animation Helper
    /// </summary>
    public class AnimationHelper : EditorWindow
    {
        #region Window Setup

        private Vector2 scrollPosition;
        private Sprite[] selectedSprites;
        private string animationName = "NewAnimation";
        private int frameRate = 12;
        private bool looping = true;
        private string savePath = "Assets/Animations/Player/";

        [MenuItem("Tools/Algorithmia/Animation Helper")]
        public static void ShowWindow()
        {
            var window = GetWindow<AnimationHelper>("Animation Helper");
            window.minSize = new Vector2(400, 500);
            window.Show();
        }

        #endregion

        #region GUI

        private void OnGUI()
        {
            scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition);

            DrawHeader();
            DrawSpriteSelection();
            DrawAnimationSettings();
            DrawCreateButton();
            DrawQuickCreateSection();

            EditorGUILayout.EndScrollView();
        }

        private void DrawHeader()
        {
            EditorGUILayout.Space(10);
            EditorGUILayout.LabelField("Animation Clip Creator", EditorStyles.boldLabel);
            EditorGUILayout.HelpBox(
                "Select sprites in order, configure settings, and click Create to generate an animation clip.",
                MessageType.Info
            );
            EditorGUILayout.Space(10);
        }

        private void DrawSpriteSelection()
        {
            EditorGUILayout.LabelField("Sprite Selection", EditorStyles.boldLabel);

            // Drag-and-drop area
            var dropArea = GUILayoutUtility.GetRect(0f, 50f, GUILayout.ExpandWidth(true));
            GUI.Box(dropArea, "Drag & Drop Sprites Here");

            HandleDragAndDrop(dropArea);

            // Display selected sprites count
            if (selectedSprites != null && selectedSprites.Length > 0)
            {
                EditorGUILayout.HelpBox($"Selected: {selectedSprites.Length} sprite(s)", MessageType.None);

                // Show sprite names
                EditorGUILayout.BeginVertical("box");
                for (int i = 0; i < selectedSprites.Length; i++)
                {
                    EditorGUILayout.LabelField($"{i + 1}. {selectedSprites[i].name}");
                }
                EditorGUILayout.EndVertical();

                if (GUILayout.Button("Clear Selection"))
                {
                    selectedSprites = null;
                }
            }
            else
            {
                EditorGUILayout.HelpBox("No sprites selected. Drag sprites here or select them in Project window.", MessageType.Warning);
            }

            EditorGUILayout.Space(10);
        }

        private void DrawAnimationSettings()
        {
            EditorGUILayout.LabelField("Animation Settings", EditorStyles.boldLabel);

            animationName = EditorGUILayout.TextField("Animation Name", animationName);
            frameRate = EditorGUILayout.IntSlider("Frame Rate", frameRate, 1, 60);
            looping = EditorGUILayout.Toggle("Looping", looping);
            savePath = EditorGUILayout.TextField("Save Path", savePath);

            if (GUILayout.Button("Browse Save Location"))
            {
                string path = EditorUtility.OpenFolderPanel("Select Save Location", "Assets/", "");
                if (!string.IsNullOrEmpty(path))
                {
                    // Convert absolute path to relative path
                    savePath = "Assets" + path.Substring(Application.dataPath.Length);
                }
            }

            EditorGUILayout.Space(10);
        }

        private void DrawCreateButton()
        {
            GUI.enabled = selectedSprites != null && selectedSprites.Length > 0 && !string.IsNullOrEmpty(animationName);

            if (GUILayout.Button("Create Animation Clip", GUILayout.Height(40)))
            {
                CreateAnimationClip(selectedSprites, animationName, frameRate, looping, savePath);
            }

            GUI.enabled = true;

            EditorGUILayout.Space(20);
        }

        private void DrawQuickCreateSection()
        {
            EditorGUILayout.LabelField("Quick Actions", EditorStyles.boldLabel);
            EditorGUILayout.HelpBox(
                "Select multiple sprites in the Project window, then use these buttons to quickly create common animations.",
                MessageType.Info
            );

            EditorGUILayout.BeginHorizontal();

            if (GUILayout.Button("Create Idle Down"))
            {
                CreateFromSelection("Player_IdleDown", 6, true);
            }

            if (GUILayout.Button("Create Walk Down"))
            {
                CreateFromSelection("Player_WalkDown", 12, true);
            }

            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();

            if (GUILayout.Button("Create Idle Up"))
            {
                CreateFromSelection("Player_IdleUp", 6, true);
            }

            if (GUILayout.Button("Create Walk Up"))
            {
                CreateFromSelection("Player_WalkUp", 12, true);
            }

            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();

            if (GUILayout.Button("Create Idle Left"))
            {
                CreateFromSelection("Player_IdleLeft", 6, true);
            }

            if (GUILayout.Button("Create Walk Left"))
            {
                CreateFromSelection("Player_WalkLeft", 12, true);
            }

            EditorGUILayout.EndHorizontal();

            EditorGUILayout.BeginHorizontal();

            if (GUILayout.Button("Create Idle Right"))
            {
                CreateFromSelection("Player_IdleRight", 6, true);
            }

            if (GUILayout.Button("Create Walk Right"))
            {
                CreateFromSelection("Player_WalkRight", 12, true);
            }

            EditorGUILayout.EndHorizontal();
        }

        #endregion

        #region Drag and Drop Handling

        private void HandleDragAndDrop(Rect dropArea)
        {
            Event evt = Event.current;

            if (evt.type == EventType.DragUpdated || evt.type == EventType.DragPerform)
            {
                if (!dropArea.Contains(evt.mousePosition))
                    return;

                DragAndDrop.visualMode = DragAndDropVisualMode.Copy;

                if (evt.type == EventType.DragPerform)
                {
                    DragAndDrop.AcceptDrag();

                    // Get sprites from dragged objects
                    var sprites = new List<Sprite>();
                    foreach (var obj in DragAndDrop.objectReferences)
                    {
                        if (obj is Sprite sprite)
                        {
                            sprites.Add(sprite);
                        }
                        else if (obj is Texture2D texture)
                        {
                            // Get all sprites from texture
                            string path = AssetDatabase.GetAssetPath(texture);
                            var textureSprites = AssetDatabase.LoadAllAssetsAtPath(path).OfType<Sprite>();
                            sprites.AddRange(textureSprites);
                        }
                    }

                    selectedSprites = sprites.ToArray();
                }

                evt.Use();
            }
        }

        #endregion

        #region Animation Creation

        private void CreateFromSelection(string name, int fps, bool loop)
        {
            // Get selected sprites from Project window
            var sprites = Selection.objects.OfType<Sprite>().ToArray();

            if (sprites.Length == 0)
            {
                EditorUtility.DisplayDialog("No Sprites Selected", "Please select sprites in the Project window first.", "OK");
                return;
            }

            CreateAnimationClip(sprites, name, fps, loop, savePath);
        }

        private void CreateAnimationClip(Sprite[] sprites, string name, int fps, bool loop, string path)
        {
            if (sprites == null || sprites.Length == 0)
            {
                Debug.LogError("No sprites provided for animation creation.");
                return;
            }

            // Ensure path exists
            if (!AssetDatabase.IsValidFolder(path))
            {
                Debug.LogError($"Invalid save path: {path}");
                return;
            }

            // Create animation clip
            AnimationClip clip = new AnimationClip
            {
                frameRate = fps
            };

            // Configure looping
            if (loop)
            {
                var settings = AnimationUtility.GetAnimationClipSettings(clip);
                settings.loopTime = true;
                AnimationUtility.SetAnimationClipSettings(clip, settings);
            }

            // Create animation curve
            var curveBinding = new EditorCurveBinding
            {
                type = typeof(SpriteRenderer),
                path = "",
                propertyName = "m_Sprite"
            };

            // Create keyframes
            var keyframes = new ObjectReferenceKeyframe[sprites.Length];
            float timePerFrame = 1f / fps;

            for (int i = 0; i < sprites.Length; i++)
            {
                keyframes[i] = new ObjectReferenceKeyframe
                {
                    time = i * timePerFrame,
                    value = sprites[i]
                };
            }

            // Apply curve to clip
            AnimationUtility.SetObjectReferenceCurve(clip, curveBinding, keyframes);

            // Save animation clip
            string fullPath = $"{path}/{name}.anim";
            AssetDatabase.CreateAsset(clip, fullPath);
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();

            Debug.Log($"Animation clip created: {fullPath}");
            EditorUtility.DisplayDialog("Success", $"Animation '{name}' created successfully!\n\nLocation: {fullPath}", "OK");

            // Ping the created asset in Project window
            EditorGUIUtility.PingObject(clip);
        }

        #endregion
    }
}
