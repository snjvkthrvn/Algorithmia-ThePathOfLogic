using UnityEngine;

namespace Algorithmia.Player
{
    /// <summary>
    /// Handles 4-directional player movement and animation state updates.
    /// Responds to WASD/Arrow key input and communicates with the Animator component.
    /// </summary>
    [RequireComponent(typeof(Rigidbody2D))]
    [RequireComponent(typeof(Animator))]
    [RequireComponent(typeof(SpriteRenderer))]
    public class SimplePlayerMovement : MonoBehaviour
    {
        #region Serialized Fields

        [Header("Movement Settings")]
        [SerializeField]
        [Tooltip("Movement speed in units per second")]
        private float moveSpeed = 5f;

        #endregion

        #region Private Fields

        private Rigidbody2D rb;
        private Animator animator;
        private SpriteRenderer spriteRenderer;

        // Input values
        private Vector2 moveInput;
        private Vector2 lastMoveDirection;

        // Animator parameter IDs (cached for performance)
        private static readonly int SpeedParam = Animator.StringToHash("Speed");
        private static readonly int DirectionXParam = Animator.StringToHash("DirectionX");
        private static readonly int DirectionYParam = Animator.StringToHash("DirectionY");

        #endregion

        #region Unity Lifecycle Methods

        private void Awake()
        {
            // Cache component references
            rb = GetComponent<Rigidbody2D>();
            animator = GetComponent<Animator>();
            spriteRenderer = GetComponent<SpriteRenderer>();

            // Initialize last direction to face down
            lastMoveDirection = Vector2.down;
        }

        private void Start()
        {
            // Configure Rigidbody2D for 2D top-down movement
            rb.gravityScale = 0f;
            rb.constraints = RigidbodyConstraints2D.FreezeRotation;
        }

        private void Update()
        {
            // Get input from keyboard
            HandleInput();

            // Update animation parameters
            UpdateAnimation();
        }

        private void FixedUpdate()
        {
            // Apply movement in physics update
            Move();
        }

        #endregion

        #region Input Handling

        /// <summary>
        /// Reads input from keyboard and normalizes diagonal movement.
        /// </summary>
        private void HandleInput()
        {
            // Get raw input from WASD or Arrow keys
            float horizontal = Input.GetAxisRaw("Horizontal"); // A/D or Left/Right arrows
            float vertical = Input.GetAxisRaw("Vertical");     // W/S or Up/Down arrows

            // Create movement vector
            moveInput = new Vector2(horizontal, vertical);

            // Normalize diagonal movement to prevent faster diagonal speed
            if (moveInput.magnitude > 1f)
            {
                moveInput.Normalize();
            }

            // Store last movement direction for idle animation
            // Only update if there's actual movement input
            if (moveInput.magnitude > 0.01f)
            {
                lastMoveDirection = moveInput;
            }
        }

        #endregion

        #region Movement

        /// <summary>
        /// Applies velocity to the Rigidbody2D for smooth movement.
        /// </summary>
        private void Move()
        {
            // Calculate velocity
            Vector2 velocity = moveInput * moveSpeed;

            // Apply velocity to Rigidbody2D
            rb.velocity = velocity;
        }

        #endregion

        #region Animation

        /// <summary>
        /// Updates Animator parameters based on movement state.
        /// Handles sprite flipping for left/right directions.
        /// </summary>
        private void UpdateAnimation()
        {
            // Calculate speed for idle/walk animation blend
            float currentSpeed = moveInput.magnitude;

            // Determine which direction to show in animation
            Vector2 animDirection = currentSpeed > 0.01f ? moveInput : lastMoveDirection;

            // Update Animator parameters
            animator.SetFloat(SpeedParam, currentSpeed);
            animator.SetFloat(DirectionXParam, animDirection.x);
            animator.SetFloat(DirectionYParam, animDirection.y);

            // Handle sprite flipping for left-facing direction
            // Only flip based on horizontal movement to avoid weird flipping on vertical movement
            if (animDirection.x < -0.01f)
            {
                // Moving left - flip sprite
                spriteRenderer.flipX = true;
            }
            else if (animDirection.x > 0.01f)
            {
                // Moving right - unflip sprite
                spriteRenderer.flipX = false;
            }
            // If moving purely vertically (x == 0), maintain current flip state
        }

        #endregion

        #region Public Methods (Optional - for external control)

        /// <summary>
        /// Sets the movement speed. Useful for power-ups or status effects.
        /// </summary>
        /// <param name="newSpeed">New movement speed value</param>
        public void SetMoveSpeed(float newSpeed)
        {
            moveSpeed = Mathf.Max(0f, newSpeed); // Ensure speed is never negative
        }

        /// <summary>
        /// Gets the current movement speed.
        /// </summary>
        public float GetMoveSpeed()
        {
            return moveSpeed;
        }

        /// <summary>
        /// Returns true if the player is currently moving.
        /// </summary>
        public bool IsMoving()
        {
            return moveInput.magnitude > 0.01f;
        }

        /// <summary>
        /// Gets the current movement direction as a normalized Vector2.
        /// </summary>
        public Vector2 GetMoveDirection()
        {
            return moveInput;
        }

        #endregion
    }
}
