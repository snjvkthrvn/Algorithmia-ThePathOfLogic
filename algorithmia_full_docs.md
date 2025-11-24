# Combined GDD + PDD

## PDD

Puzzle Design Doc
🧩 Puzzle Design Documents — Early 
Access
Algorithmia: The Path of Logic
This document cont ains all puzzle design specific ations f or the Ear ly Access  
build:
Prologue 2 puzzles + boss)
Array Plains 4 puzzles + boss)
Twin Rivers 4 puzzles + boss)
Each puzzle includes:
Concept
Difficul ty
Environment
Trigger
Exact mechanics
Solution beha vior
Failur e conditions
NPC dialogue (if an y)
Concept Br idge br eakdown
Code x entr y unlock
🌑 Region 0 — Prologue: Chamber of Flow
🧩 Puzzle P0-1 — Follow the Path
Puzzle Design Doc
1
Element Specif ic ation
Concept Pattern Mat ching / Sequential R easoning
Difficulty Very Easy
Environment Floating whit e tiles in a v oid-lik e arena
Trigger Player st eps on first tile OR int eract s with the flo ating cr ystal
MechanicsA sequence of tiles glo ws; pla yer repeats the sequence. Cor rect tile =
chime. W rong tile = flash + r eset.
Solution Complet e 23 r ounds of p attern growth
Failure
ConditionsWrong tile; le aving puzzle z one
NPC Dialogue “Pat terns ar e the r hythm of logic. T rust what y ou saw .ˮ
🟧 Concept Bridge — Follow the Path (P0-1)
󾠮 Story Recap — What You Just Did
Professor Node mat erializes gentl y beside y ou:
“Back ther e on the tiles, y ou didn ʼt guess.
You wat ched a p attern unf old…
You memor ized the or der…
And y ou repla yed that e xact or der with y our st eps. ˮ
He continues:
“You didn ʼt jump randoml y or check e very tile.
You trust ed the sequence y ou obser ved — one tile at a time.
That instinct y ou just used?
Itʼs the f oundation of ho w man y algor ithms think. ˮ
This r einforces:
observe → remember → r epeat,
the cor e ment al model of sequential pr ocessing.
Puzzle Design Doc
2
󾠯 Pattern Reveal — Explained Slowly
Professor Node smiles:
“What y ou did is the essence of a v ery impor tant ide a:
Sequence R ecognition .ˮ
He br eaks it do wn cle arly:
“You recorded a sequence .ˮ
“You held it in y our working memor y.ˮ
“You processed e ach item in or der, without skipping or shuf fling. ˮ
He adds:
“Whene ver w e follow instructions st ep-b y-step,
repla y a ser ies of mo ves,
or read a list fr om st art to finish…
weʼre using this p attern.ˮ
Still no code — just intuition.
󾠰 Pseudocode + Casual Explanation
A glo wing p anel appe ars with a simple pr ogram:
watch the tiles light up
recor d the sequence
for each tile in the sequence:
    walk ont o that tile in or der
Professor Node br eaks it do wn in plain English:
“wat ch the tiles light up ˮ
Puzzle Design Doc
3
Youʼre just obser ving. Let the puzzle ‘ speak.ʼ
“recor d the sequence ˮ
You st ore the or der ment ally — tile 3 , tile 1, tile 4 …
“for each tile in the sequence:ˮ
This me ans: go thr ough the list one st ep at a time.
“walk ont o that tile in or derˮ
Repla y what y ou memor ized, e xactl y as y ou saw it.
He concludes:
“Thatʼ s all a loop is:
‘Do this for each thing in t he list.ʼ
You just e xecut ed a loop with y our f eet.ˮ
󾠱 Mini-Forge Practice — Tiny Interactive Drill
A small F orge UI f ades in with draggable tiles:
Arrange these in t he order you actuall y used:
“Walk ont o each tile in or der.ˮ
“Watch the tiles light up. ˮ
“Remember the sequence of tiles. ˮ
The cor rect or der:
 Watch the tiles light up.
 Remember t he sequence of tiles.
 Walk onto each tile in or der.
If the pla yer is wr ong:
“Think about what must happen bef ore you c an retrace the st eps. ˮ
Puzzle Design Doc
4
When cor rect:
“Perfect.
Man y algor ithms f ollow this structur e:
Observe  Remember  Pr ocess in Or der.ˮ
󾠲 Codex Unlock — Patterns & Sequence Recognition
The Code x gains a ne w glo wing entr y:
📘 Patterns & Sequence Recognition
What You Felt:
“I wat ched a p attern, remember ed it, and r epeated it. ˮ
Plain Explanation:
“Some pr oblems r equir e following a sequence e xactl y as it was giv en.
This is the cor e of r eading ar rays, it erating thr ough list s,
or pr ocessing or dered st eps. ˮ
Pattern Steps:
 Obser ve
 Store/Recor d
 Repla y or Pr ocess
Where Youʼll See This A gain:
Repla ying mo ves in simulations
Reading charact ers in str ings
Scanning thr ough ar rays
Performing st ep-b y-step operations
Unlocked Abilit y:
Puzzle Design Doc
5
Recogniz e when a pr oblem is about or der, sequence, and e xact r epla y.
! END OF CONCEPT BRIDGE FOR PUZZLE P01 
🧩 Puzzle P0-2 — Fractured Sentinel
Element Specif ic ation
Concept Spatial R easoning  Mapping (pr ecursor t o Hashing)
Difficulty Easy
Environment Floating st one plat form; 34 cr ystal fragment s; Sentinel frame
Trigger Interact with an y shar d
Mechanics Push/pull shar ds; e ach fit s onl y one sock et; snaps when cor rect
Solution Assemble all shar ds cor rectly
Failure Conditions None
NPC Dialogue “Logic begins with placing e ach piece wher e it belongs. ˮ
🟧 Concept Bridge — Fractured Sentinel (P0-2)
󾠮 Story Recap — What You Just Did
Professor Node st eps f orward as the r econstruct ed Sentinel hums bene ath y our 
feet:
“Those fragment s werenʼt random pieces.
Each one had a pr oper place  — a slot wher e it made per fect sense.
And y ou figur ed that out b y comp aring shapes, colors, and edges. ˮ
He gestur es to the Sentinel:
“You didn ʼt try every spot blindl y.
You look ed at a piece…
You look ed at the sock ets…
And y ou mat ched them b ased on similar ity.ˮ
Puzzle Design Doc
6
This anchors the ide a:
Identify a piece
Find it s mat ching slot
Place it
󾠯 Pattern Reveal — Explained Slowly
Professor Node:
“What y ou just used is the he art of mapping.
Mapping me ans t aking one thing…
and figur ing out wher e it belongs .ˮ
He walks y ou thr ough the logic:
“Each fragment act ed lik e a key.ˮ
“Each sock et was a slot waiting f or that k ey.ˮ
“Your job was t o mat ch k ey → slot. ˮ
He giv es a r eal-w orld analogy:
“Think of put ting cutler y awa y.
Spoons go in the spoon slot.
Forks go in the f ork slot.
You don ʼt try every draw er — y ou kno w wher e each t ype belongs. ˮ
This set s up the ment al model f or maps and hash maps lat er.
󾠰 Pseudocode + Casual Explanation
A glo wing diagram appe ars:
for each fragment:
    find the mat ching sock et
Puzzle Design Doc
7
    place the fragment int o that sock et
Professor Node translat es:
“for each fragment:ˮ
You pick up one piece at a time. No rush.
“find the mat ching sock etˮ
You inspect the slot s and ask:
“Which place w as this piece meant f or?ˮ
“place the fragment int o that sock etˮ
Once y ou kno w, you put it e xactl y wher e it belongs.
Node continues:
“Thatʼ s mapping.
One thing point s to the place that belongs t o it.
Just lik e:
names map t o phone numbers
words map t o definitions
keys map t o values
fragment s map t o sock etsˮ
󾠱 Mini-Forge Practice — Tiny Interactive Drill
The Logic F orge opens a small practice windo w:
Arrange these actions in t he order you used t hem:
“Place the fragment wher e it belongs. ˮ
“Find the sock et that mat ches the fragment. ˮ
“Pick up one fragment. ˮ
Puzzle Design Doc
8
Correct or der:
 Pick up one fragment.
 Find the sock et that mat ches the fragment.
 Place the fragment wher e it belongs.
If the pla yer get s it wr ong:
“Think first: what must y ou pick up bef ore you c an place?ˮ
When cor rect:
“Exactl y.
Mapping alwa ys follows this p attern:
Take an item → find its slot → put it t here.ˮ
󾠲 Codex Unlock — Mapping & Matching
A ne w entr y glo ws in the Code x:
📘 Mapping & Matching
What You Felt:
“I found wher e each piece belonged and placed it ther e.ˮ
Plain Explanation:
“Mapping me ans using one thing t o find another thing.
Itʼs the f oundation of:
dictionar ies
hash maps
routing t ables
inventory syst emsˮ
Pattern Steps:
Puzzle Design Doc
9
 Read it em
 Identify slot
 Place it em
Where Youʼll See This Lat er:
Hashing puzzles in Ar ray Plains
Grouping/Classific ation challenges
Hash map p atterns in coding pr oblems
Unlocked Abilit y:
Recogniz e when a pr oblem is about mat ching it ems t o the cor rect destination.
! END OF CONCEPT BRIDGE FOR PUZZLE P0 2 
🛡 Prologue Boss — The Fractured Sentinel
Element Specif ic ation
Concept Multi-step p attern mast ery
Difficulty Easy
Mechanics3-phase puzzle: longer sequence → assembling mul ti-piece p attern →
stepping on trail of f ading f ootpr ints
Solution Complet e the sequence without er ror
Fail Conditions Incor rect tile r eset s phase
Narrative
ResultSentinel awak ens → opens p ath t o Ar ray Plains
🛡 Concept Bridge — Boss: The Fractured Sentinel
Prologue Boss — Multi-Step Pattern Mastery
󾠮 Story Recap — What You Just Did
Puzzle Design Doc
10
The fragment s of the Sentinel r eform behind y ou, glo wing with sof t light.
Professor Node mat erializes:
“This guar dian didn ʼt test just one skill.
It tested ho w w ell y ou could chain mul tiple steps,
remember e volving p atterns, and adapt without losing y our place. ˮ
He p aces ar ound the r econstruct ed st atue:
First, y ou followed an expanding sequence
Then, y ou reassembled multiple fragments
Finall y, you traced vanishing f ootprints before the y disappe ared
“The Sentinel wasn ʼt testing y our memor y.
It was t esting y our ability to keep your thoughts ordered.ˮ
This anchors the ide a:
Multi-step reasoning
Pattern extension
Sequence st abilit y
Contr olled decision flo w
󾠯 Pattern Reveal — The Meta-Pattern: 
Sequential Logical Execution
Professor Node:
“Some pr oblems c anʼt be sol ved b y one tr ick.
They requir e a series of logic al steps,
wher e each st ep depends on the pr evious one being cor rect.ˮ
He e xplains:
Puzzle Design Doc
11
You recogniz ed a p attern
You buil t a structur e
You followed a timed sequence
You maint ained cont ext acr oss st eps
This is the cor e of:
Multi-pass algor ithms
Stepwise transf ormations
“First do X, then Y , then Zˮ pr oblems
Any LeetCode pr oblem that has preprocessing + cor e logic + f inal check
Examples this boss echoes:
Valid Parentheses  → sc an + st ack updat es
String Compr ession  → build r epresent ation in phases
Pattern matching  → sequential r ecognition
Preprocessing bef ore two-pointer/DP logic
He concludes:
“The Sentinel t eaches y ou the first gr eat truth of algor ithms:
Break problems int o phases — and f inish each phase cle anly before moving 
on.ˮ
󾠰 Pseudocode — High-Level Multi-Phase 
Structure
A glo wing p anel appe ars:
# Phase 1 R ecogniz e and r eproduce a gr owing p attern
obser ve sequence
repeat sequence
Puzzle Design Doc
12
# Phase 2 R econstruct structur e from pieces
for each fragment:
    map t o cor rect position
    assemble
# Phase 3 F ollow transient inf ormation
while trail e xists:
    track ne xt footpr int bef ore it f ades
# Final: Combine all st eps without mixing them
Node e xplains:
Phase 1  Input sc anning
You read and r epla yed sequences (lik e sc anning ar rays).
Phase 2  Structur al assembl y
You mat ched component s to positions (lik e mapping k eys to slot s).
Phase 3  Time-sensitiv e traversal
You act ed bef ore inf ormation e xpired (lik e sliding windo w expiry or queue  
operations).
Final  Sequential composition
LeetCode pr oblems of ten requir e:
“Do A, then B, then C  no shor t cut s. ˮ
󾠱 Mini-Forge Drill — “Which Step Comes 
Next?ˮ Challenge
A small F orge windo w opens with this challenge:
Goal: Put the algor ithmic phases in the cor rect or der.
Pieces:
“Track f ading inf ormation bef ore it disappe arsˮ
Puzzle Design Doc
13
“Map fragment s to their cor rect slot sˮ
“Obser ve and r eproduce the opening p atternˮ
“Combine r esul ts from all phases cle anlyˮ
Correct Or der:
 Obser ve and r eproduce the opening p attern
 Map fragment s to their cor rect slot s
 Track f ading inf ormation bef ore it disappe ars
 Combine r esul ts from all phases cle anly
If the pla yer get s it wr ong:
“Think: some t asks depend on e arlier inf ormation being cor rect.ˮ
Then Node adds:
“This is the structur e of man y real pr oblems:
Preprocess  Build  T raverse  Finaliz e.ˮ
󾠲 Codex Unlock — Sequential 
Algorithmic Phasing
A ne w Code x entr y appe ars:
📘 Sequential Algorithmic Phasing
Met a-pat t er n)
What You Felt:
You sol ved mul tiple small p atterns in or der — none w orked alone.
Plain Explanation:
Some algor ithmic pr oblems r equir e a sequence of st eps.
You:
Puzzle Design Doc
14
 Identify  information
 Organize it
 Traverse  or pr ocess it
 Finalize or check cor rectness
Where Youʼll See This A gain:
“Valid Par enthesesˮ (sc an → st ack → check)
“Group Anagramsˮ (hash → gr oup → output)
“3Sum ˮ (sor t → t wo point ers → sc an)
“Remo ve Duplic atesˮ (r ead → fil ter → compr ess)
Unlocked Abilit y:
Recogniz e when a pr oblem r equir es mul tiple phases —
and structur e your solution one cle an p ass at a time.
! END OF CONCEPT BRIDGE  BOSS FRA CTURED SENTINEL 
🌾 Region 1 — Array Plains
🧩 Puzzle AP1 — Fix the Farmland
Element Specif ic ation
Concept Sorting / Inde xing
Difficulty Easy  Medium
Environment Cropland tiles labeled 07
Trigger NPC “The fields ar e scrambled! Help me fix them!ˮ
Mechanics Push tiles lef t/right; lock when cor rect
Solution Ordered row  0 1 2 3 4 5 6 7
Fail Conditions Leaving puzzle r eset s
NPC Farmer who e xplains the issue
Puzzle Design Doc
15
🟧 Concept Bridge — Fix the Farmland (AP1)
󾠮 Story Recap — What You Just Did
Professor Node wat ches the no w per fectly ordered fields:
“A moment ago, this f arm was a mess.
Plots labeled 3 , 7, 1, 5 … all jumbled.
You didn ʼt add ne w land.
You didn ʼt remo ve an y crops.
You just rearranged  what was alr eady ther e…
until the numbers w ere in or der.ˮ
He point s do wn the r ow:
“Now it r eads:
0, 1, 2, 3, 4, 5, 6, 7.
That ma y look simple,
but itʼ s one of the most po werful ide as in computing:
put things in or der first,
so everything else becomes e asier.ˮ
This anchors the f eel of:
Taking a scrambled sequence
Reordering it
Ending with cle an, sor ted structur e
󾠯 Pattern Reveal — Explained Slowly
Professor Node:
“What y ou used her e is c alled sor ting.
Sorting is when y ou take a bunch of it ems and ar range them
Puzzle Design Doc
16
in a me aningful or der: smallest t o lar gest, A t o Z, e arliest t o lat est.ˮ
He giv es e veryday parallels:
“Put ting books on a shelf fr om A  Z. ˮ
“Lining up t est scor es fr om lo west t o highest. ˮ
“Arranging files b y dat e so the ne west is at the t op.ˮ
Then he connect s to wh y it mat ters f or algor ithms:
“Wh y do w e care?
Because once things ar e sor ted,
searching is f aster,
detecting p atterns is easier ,
and man y algor ithms suddenl y become wa y simpler .
You just transf ormed chaos int o structur e.ˮ
󾠰 Pseudocode + Casual Explanation
A glo wing p anel appe ars o ver the fields:
repeat until the r ow is sor ted:
    look at e ach p air of neighbor ing plot s
    if a plot has a bigger number than the one af ter it:
        swap them
Professor Node walks thr ough it lik e a co ach:
 r e p e a t  u n t i l  t h e  r o w  i s  s o r t e d :
“This me ans:
‘Keep doing p asses o ver the r ow
until ther e are no mist akes lef t.ʼ
Puzzle Design Doc
17
You might not fix e verything in one sw eep,
so y ou k eep going until nothing is out of or der.ˮ
 l o o k  a t  e a c h  p a i r  o f  n e i g h b o r i n g  p l o t s
“You don ʼt comp are random plot s far ap art.
You comp are neighbor ing ones:
0,1, 1,2, 2, 3, et c.ˮ
 i f  a  p l o t  h a s  a  b i g g e r  n u m b e r  t h a n  t h e  o n e  a f t e r  i t :
“This is the ‘uh-oh ʼ moment.
If plot 3 has number 7 and plot 4 has number 2,
then 7 and 2 ar e out of or der.ˮ
 s w a p  t h e m
“You simpl y trade places.
The bigger number mo ves right,
the smaller number mo ves lef t.ˮ
He summar izes:
“You k eep sw eeping thr ough neighbors, swapping when needed,
until e veryone is st anding in the cor rect spot.
Thatʼ s one wa y to sor t:
fix local problems until t he whole t hing is cle an.ˮ
󾠱 Mini-Forge Practice — Tiny Sorting Drill
A mini Logic F orge p anel appe ars:
“Letʼ s sor t a tin y row the wa y you just did. ˮ
On scr een:
Row: 4, 2, 1, 3
Puzzle Design Doc
18
Step 1  Identify Out -of-Order Neighbors
Prompt:
“Which p air is out of or der?ˮ
Options (but ton or mul tiple choice st yle):
4, 2
2, 1
1, 3
Correct answ er:
First 4 , 2, then 2, 1 in subsequent sw eeps.
If the pla yer picks wr ong, hint:
“Look f or a p air wher e the lef t number is bigger than the r ight. ˮ
Step 2  Drag to Swap
The pla yer drags 4 and 2 to swap them:
Row becomes: 2, 4, 1, 3
Step 3  Repeat Until Sor ted
The mini-F orge walks them visuall y thr ough:
Next pass: swap 4 , 1  2, 1, 4, 3
Next pass: swap 2, 1  1, 2, 4, 3
Finall y: swap 4 , 3  1, 2, 3, 4
Node comment ary:
“See?
Just b y fixing neighbor mist akes,
the whole r ow ends up sor ted.ˮ
󾠲 Codex Unlock — Sorting & Ordered Fields
Puzzle Design Doc
19
The Code x entr y unlocks:
📘 Sorting & Ordered Fields
What You Felt:
“I took a messy r ow of number ed plot s and r earranged them until the numbers  
were in or der.ˮ
Plain Explanation:
“Sor ting me ans r earranging it ems int o a useful or der.
Once things ar e sor ted,
searching, sc anning, and spot ting p atterns all become e asier .ˮ
Pattern Steps:
 Look at neighbors.
 Detect out -of-order p airs.
 Swap them.
 Repeat until no p airs ar e out of or der.
Where Youʼll See This A gain:
Searching in sor ted ar rays
Binar y se arch lat er on
Grouping and sc anning t asks
Man y int erview questions that st art with:
‘First, sor t the input… ʼ
Unlocked Abilit y:
Notice when a pr oblem becomes e asier
once y ou “sort first, then think.ˮ
! END OF CONCEPT BRIDGE FOR PUZZLE AP1 
🧩
Puzzle Design Doc
20
🧩 Puzzle AP2 — Find the Lost Tool
Element Specif ic ation
Concept O1 Access / Dir ect Inde xing
Difficulty Easy
Environment Barn with b askets labeled 09
Trigger NPC “M y tool is in b asket 5…ˮ
Mechanics Walk t o Bask et 5 ; no se arching
Solution Selecting inde x dir ectly
Failure Conditions None
🟧 Concept Bridge — Find the Lost Tool (AP2)
󾠮 Story Recap — What You Just Did
Professor Node appe ars ne ar the b arn door way, wat ching y ou c asuall y pick the  
correct b asket:
“You didn ʼt lift every basket.
You didn ʼt search e ach one in or der:
basket 0, basket 1, b asket 2, b asket 3…
You w ent straight  to the b asket with the r ight number on it. ˮ
He continues:
“Someone t old y ou:
‘The t ool is in b asket 5.ʼ
And y ou walk ed dir ectly to basket 5.
No sc anning.
No guessing. ˮ
This r einforces:
You knew the position  ahe ad of time
Puzzle Design Doc
21
You used the label/inde x as a dir ect loc ator
You did zero searching
󾠯 Pattern Reveal — Explained Slowly
Professor Node smiles:
“What y ou just used is the po wer of dir ect inde xing. ˮ
He la ys it out in simple t erms:
“You had a list of baskets.ˮ
“Each b asket had a number  on it — that number is it s index.ˮ
“You w ere giv en an index 5 and w ent straight  to that spot. ˮ
He r elates it t o code:
“In man y problems, w e use something c alled an ar ray.
You c an think of an ar ray as:
‘A row of labeled slot s.ʼ
If you kno w the label — the inde x —
you c an jump t o that slot inst antly.ˮ
Then he mak es it r eal-w orld:
“Itʼs like ap artment numbers:
If your fr iend sa ys ‘Iʼ m in 3B, ʼ
you don ʼt knock on e very door in the building.
You go straight t o 3B.ˮ
󾠰 Pseudocode + Casual Explanation
A small p anel appe ars with a tin y example:
Puzzle Design Doc
22
baskets = [b asket0, basket1, b asket2, b asket3, basket4, basket5
target_ inde x  5
tool_ location = b askets[target_ inde x]
Professor Node goes line b y line:
baskets = [b asket0, basket1, b asket2, ...]
“This is just our r ow of b askets.
Each b asket has a position:
0, 1, 2, 3 , 4, 5…ˮ
target_ inde x  5
“This is what the villager t old y ou:
‘The t ool is in b asket 5.ʼˮ
tool_ location = b askets[target_ inde x]
“This is y ou walking exactly to basket 5.
No loops, no se arching, no sc anning the whole r ow.
Just:
‘Give me what ever is at position 5 .ʼˮ
He sums it up:
“This is c alled O1 or const ant-time access.
That me ans:
No mat ter ho w man y baskets ther e are  10 , 100 , 10,000 
jumping t o basket 5 takes the same amount of st eps. ˮ
󾠱 Mini-Forge Practice — Direct Access Drill
Puzzle Design Doc
23
A small Logic F orge windo w appe ars with a r ow of bo xes:
Row of cont ainers:
[  🎁   ,  ❌   ,  🔧   ,  📦   ,  🍎   ,  🪓   ]
Inde xes:
0      1      2      3      4      5
Prompt:
“The villager sa ys:
‘The t ool is in cont ainer 2.ʼ
Click the cor rect cont ainer .ˮ
Correct answ er: inde x 2 (🔧).
Follow-up v ariation:
“Now the t arget inde x is 5 .
Which cont ainer do y ou jump t o?ˮ
Correct answ er: inde x 5 (🪓).
If the pla yer hesit ates or clicks wr ong:
“Remember , youʼre not se arching b y icon first.
Youʼre jumping b y position  — the index.ˮ
Once sol ved:
“Nice.
Thatʼ s all dir ect inde xing is:
You know the index → you jump str aight there.
No loop r equir ed.ˮ
󾠲 Codex Unlock — Array Indexing (O(1))
The Code x glo ws with a ne w entr y:
Puzzle Design Doc
24
📘 Array Indexing (O(1))
What You Felt:
“I kne w which b asket number had the t ool, so I just walk ed to that one. ˮ
Plain Explanation:
“In an ar ray, every slot has a number c alled an inde x.
If you kno w the inde x, you c an jump straight t o that slot
in const ant time — without looping. ˮ
Pattern Steps:
 Have a list (ar ray) of it ems.
 Know the inde x you c are about.
 Access the v alue at that inde x dir ectly.
Where Youʼll See This A gain:
Looking up element s by position in ar rays or list s
Implementing f ast access t ables
Man y problems wher e the hint is:
“You c an tr eat this as an ar ray and jump b y inde x.ˮ
Unlocked Abilit y:
Recogniz e problems wher e you don ʼt need t o se arch,
because the position is already known.
! END OF CONCEPT BRIDGE FOR PUZZLE AP2 
🧩 Puzzle AP3 — Organize the Harvest
Element Specif ic ation
Concept Hashing / Buck eting
Puzzle Design Doc
25
Element Specif ic ation
Difficulty Medium
Environment Barn floor with buck ets A, B, C, D; f alling cr op it ems
Trigger Interact with hopper
MechanicsItems f all → hash rule decides buck et → collisions occur → pla yer gr oups
correctly
Solution Map it em → buck et
Fail Conditions Wrong buck et  5 sec dela y
🟧 Concept Bridge — Organize the Harvest (AP3)
󾠮 Story Recap — What You Just Did
Professor Node st ands beside the b arn, wat ching the last cr op fall int o the cor rect 
basket:
“Those cr ops w erenʼt just random icons f alling fr om the ceiling.
Each t ype had a natural home  — a b asket it belonged t o.
And inst ead of piling e verything int o one he ap,
you sep arated them using a rule.ˮ
He nods t oward the buck ets:
“You didn ʼt care wher e the y landed at first.
You c ared about what they were:
This symbol goes her e,
that symbol goes ther e.
And some it ems e ven shared the same b asket.ˮ
This anchors the f eel:
Reading the itemʼs identit y
Using a rule  to decide it s buck et
Puzzle Design Doc
26
Accepting that mul tiple it ems c an liv e in the same  buck et
󾠯 Pattern Reveal — Explained Slowly
Professor Node:
“What y ou used her e is the cor e ide a behind hashing. ˮ
He e xplains in c alm, concr ete terms:
“You had many items  falling fr om abo ve.ˮ
“You had a small number of b askets on the floor .ˮ
“You used a rule  to decide:
‘This it em goes int o this b asket.ʼˮ
He continues:
“In computing, w e often:
take a piece of dat a (lik e a w ord or a number),
run it thr ough a small function  that tur ns it int o a smaller v alue,
and use that v alue t o decide which bucket it goes int o.
That function is c alled a hash function .ˮ
Then he connect s to what y ou saw:
“You noticed something else:
Sometimes dif ferent items land in t he same buck et.
Thatʼ s called a collision .
And itʼ s not an er ror — itʼ s something w e expect and handle. ˮ
󾠰 Pseudocode + Casual Explanation
A glo wing diagram appe ars sho wing it ems and buck ets:
Puzzle Design Doc
27
for each it em in the str eam:
    buck et_inde x = hash(it em)
    put it em int o buck ets[buck et_inde x]
Professor Node br eaks it do wn:
“for each it em in the str eam:ˮ
Youʼre not pr ocessing them all at once.
You de al with them one at a time  as the y arrive.
“buck et_inde x = hash(it em)ˮ
This is y our rule .
You look at the it em (it s symbol, t ype, color , etc.)
and sa y:
“Items lik e this belong in buck et 2. ˮ
“put it em int o buck ets[buck et_inde x]ˮ
You don ʼt create a brand-ne w basket every time.
You thr ow it int o an existing one :
maybe itʼ s alone,
maybe it lands with other it ems of the same “t ypeˮ,
or ma ybe it collides with dif ferent it ems that shar e the same buck et inde x.
He summar izes:
“Hashing is just:
Turn each item into a buck et number → put it t here.
Over and o ver.ˮ
󾠱 Mini-Forge Practice — Bucket Assignment Drill
A small Logic F orge int erface appe ars with 4 b askets:
Puzzle Design Doc
28
Bask et 0
Bask et 1
Bask et 2
Bask et 3
Abo ve them, it ems appe ar with a simple visible rule, f or example:
Hash rule on scr een:
‘Count t he number of le aves on the icon,  then take that number mod 4 .ʼ
Or:
‘If itʼs a grain 🌾  → buck et 0, berry 🍓  → buck et 1, root 🥔  → buck et 2, 
anything else → buck et 3.ʼ
Step 1 — Assign to Buckets
Prompt:
“Use the rule t o send e ach cr op to its cor rect buck et.ˮ
Items sho wn:
🌾 (grain)
🍓 (ber ry)
🥔 (root)
🌾 (grain again)
🍓 (another ber ry)
Player drags:
🌾  Buck et 0
🍓  Buck et 1
🥔  Buck et 2
second 🌾   Buck et 0 ( collision)
second 🍓   Buck et 1 ( collision)
Puzzle Design Doc
29
If the pla yer misplaces an it em:
“Check the rule again.
The b asket doesn ʼt care wher e the it em f ell fr om —
only what  it is. ˮ
Step 2 — Highlight Collisions
After placement, Node c alls at tention:
“Notice ho w mul tiple it ems ended up in the same b asket.
Two 🌾  in buck et 0.
Two 🍓  in buck et 1.
Thatʼ s a collision — and thatʼ s oka y.
Buck ets are allo w ed to hold mor e than one thing. ˮ
Player clicks on a buck et and sees a mini-list:
Buck et 0  🌾 , 🌾 ]
Buck et 1  🍓 , 🍓 ]
Buck et 2  🥔 ]
Node:
“Lat er, when w e se arch for a specific it em,
we can jump straight t o one buck et using the hash…
and onl y look thr ough that tin y list inst ead of the whole b arn.ˮ
󾠲 Codex Unlock — Hashing & Buckets
The Code x gains a ne w entr y:
📘 Hashing & Buckets
What You Felt:
“I used a rule t o thr ow each it em int o one of a f ew baskets.
Puzzle Design Doc
30
Some b askets ended up holding mul tiple it ems. ˮ
Plain Explanation:
“Hashing uses a rule (hash function) t o decide which buck et an it em belongs in.
Instead of se arching e verything, y ou:
 Appl y the rule → get a buck et inde x.
 Look onl y inside that one buck et.ˮ
Pattern Steps:
 Read the it em.
 Appl y a rule (hash) t o get a buck et inde x.
 Put the it em int o that buck et.
 Accept that dif ferent it ems might shar e the same buck et (collision).
Where Youʼll See This A gain:
Hash map / dictionar y implement ations
Grouping it ems b y a pr oper ty (e.g., b y remainder , by categor y, by first let ter)
Optimizing lookups b y shr inking the se arch sp ace t o a single buck et
Unlocked Abilit y:
Recogniz e problems wher e you:
donʼt want t o se arch the entir e collection,
can inst ead jump to one buck et using a rule,
and handle the smaller list inside that buck et.
! END OF CONCEPT BRIDGE FOR PUZZLE AP3 
🧩 Puzzle AP4 — The Pairing Grounds
Puzzle Design Doc
31
Element Specif ic ation
Concept Two Sum
Difficulty Medium  Har d
Environment Number tiles; T arget = e.g. 11
Mechanics Step on 2 tiles that sum t o target
Failure Wrong p air reset s
Solution Find tiles that sum t o target
🟧 Concept Bridge — The Pairing Grounds (AP4)
󾠮 Story Recap — What You Just Did
Professor Node appe ars at the edge of the Pair ing Gr ounds, looking at the number  
tiles y ou just st epped on:
“You w erenʼt just st epping on random tiles.
First, y ou look ed at one number .
Then y ou ask ed y ourself:
‘What other number w ould I need so that t ogether the y mak e the t arget?ʼˮ
He continues:
“You didn ʼt try every pair:
2 with 3 ,
2 with 4 ,
2 with 5 ,
and so on…
Instead, y ou flipped the question:
‘Iʼm st anding on 3 , the t arget is 11,
so I need 8 .
Is ther e an 8 out ther e?ʼˮ
Puzzle Design Doc
32
This locks in the ment al model:
Pick one number
Think of it s partner
Check if the p artner e xists
If it does → y ouʼre done
󾠯 Pattern Reveal — Explained Slowly
Professor Node:
“That wa y of thinking has a name.
Itʼs called the Two Sum p attern.ˮ
He e xplains it in nor mal language:
“You ha ve a list of numbers .ˮ
“You ha ve a target sum .ˮ
“For each number , you don ʼt test it with e very other number .ˮ
“Inst ead, y ou ask:
‘What p artner do I need t o reach the t arget?ʼ
and y ou check if that p artner is alr eady kno wn.ˮ
He contrast s the naiv e wa y vs. what y ou did:
“You could check e very pair:
2 with 3 , 2 with 4 , 2 with 5 …
then 3 with 4 , 3 with 5 , 3 with 6 …
Thatʼ s slo w and p ainful.
But y ou did something smar ter:
You turned every number int o a question:
‘If Iʼm holding this, what complet es me?ʼˮ
Puzzle Design Doc
33
No math symbols, just “p artner thinking. ˮ
󾠰 Pseudocode + Casual Explanation
A glo wing p anel appe ars with the algor ithm:
for each number x in the list:
    figur e out y = t arget - x
    if y is alr eady in memor y:
        retur n (x, y)
    other wise:
        remember x in memor y
Professor Node walks thr ough it lik e a st ory:
“for each number x in the list:ˮ
“This just me ans:
‘Look at e ach number one b y one. ʼ
Youʼre walking do wn the list, st epping thr ough e ach v alue. ˮ
“figur e out y = t arget - xˮ
“This is the k ey thought:
‘If Iʼm holding x and I want target,
I need y to complet e it.ʼ
For example:
If x  3 and t arget  11,
then y  11  3  8 .ˮ
“if y is alr eady in memor y:ˮ
“Imagine y ou ha ve a lit tle not ebook.
Every time y ou p ass a number ,
you wr ite it do wn.
Now you flip b ack and ask:
Puzzle Design Doc
34
‘Have I seen 8 bef ore?ʼˮ
“retur n (x, y)ˮ
“If the answ er is y es,
youʼve found y our p air.
Thatʼ s the moment in the puzzle when y ou st epped on the second tile
and e verything lit up. ˮ
“other wise: r emember x in memor yˮ
“If y our p artner isn ʼt ther e yet,
you don ʼt giv e up.
You wr ite x int o your not ebook,
so lat er numbers c an see it as their p artner.ˮ
He summar izes:
“So T wo Sum isn ʼt magic.
Itʼs just:
Look at a number → f igure out what complet es it →
check if t hat partner has sho wn up bef ore →
if not, remember t his one. ˮ
󾠱 Mini-Forge Practice — Partner Matching Drill
A mini Logic F orge p anel appe ars with a tin y example:
Numbers:
 2, 7, 4, 5, 9 
Target:
11
Step 1 — Mental Partner Calculation
Prompt:
Puzzle Design Doc
35
“You look at 2.
What p artner do y ou need t o reach 11?ˮ
Options (but tons):
9
7
4
Correct: 9
Then:
“You look at 7 .
What p artner do y ou need no w?ˮ
Correct: 4
Step 2 — Step Order Rearrangement
Next, the F orge sho ws jumbled st eps:
“Check if p artner is alr eady in memor y.ˮ
“Write the cur rent number int o memor y.ˮ
“For each number in the list, look at it. ˮ
“Comput e what p artner y ou need t o reach the t arget.ˮ
“If p artner e xists in memor y, retur n the p air.ˮ
Prompt:
“Put these in the or der the algor ithm actuall y uses. ˮ
Correct or der:
 For each number in the list, look at it.
 Comput e what p artner y ou need t o reach the t arget.
 Check if p artner is alr eady in memor y.
Puzzle Design Doc
36
 If partner e xists in memor y, retur n the p air.
 Write the cur rent number int o memor y.
If the y get it wr ong:
“Think:
Do y ou comput e the p artner bef ore or af ter you check memor y?ˮ
Once cor rect:
“Nice.
Youʼre not brut e forcing e very pair —
youʼre using memory to tur n the pr oblem int o:
‘Has m y partner alr eady sho wn up?ʼˮ
󾠲 Codex Unlock — Two Sum Pattern
The Code x unlocks a major entr y:
📘 Two Sum Pattern
What You Felt:
“I stood on one number and ask ed m yself what other number w ould complet e 
the t arget.ˮ
Plain Explanation:
“The T wo Sum p attern is about finding t wo values in a list that add up t o a 
target
without checking e very possible p air.
Instead, y ou:
 Walk thr ough numbers one b y one.
 For each number , comput e the p artner y ou need.
 Check if that p artner has appe ared bef ore.
Puzzle Design Doc
37
 If yes, y ouʼre done.
 If not, y ou remember the cur rent number f or futur e partners. ˮ
Pattern Steps:
 Initializ e an empt y ‘memor yʼ (set or hash map ).
 For each number x in the list:
Comput e y = target - x.
If y is in memor y → r etur n (x, y).
Other wise, add x to memor y.
Where Youʼll See This A gain:
Classic T wo Sum int erview pr oblem
Variants like:
“Pair with giv en dif ference ˮ
“Pair with giv en pr oductˮ (same logic, dif ferent operation)
Problems wher e you see:
“Find t wo numbers that… ˮ
Unlocked Abilit y:
Recogniz e when a pr oblem c an be tur ned int o:
“I have this — what p artner do I need?ˮ
And when itʼ s bet ter to store what y ouʼve seen
instead of checking e very pair fr om scrat ch.
! END OF CONCEPT BRIDGE FOR PUZZLE AP4 
🛡 Array Plains Boss — The Shuffler
Puzzle Design Doc
38
Element Specif ic ation
Concept Sorting  Hashing  Pair ing
Difficulty Medium
Theme A chaotic cr eature representing disor der
Phases1. Sor t rows  2. Buck et symbols  3 . Two Sum ar ena  4 . Mul ti-lane
scramble
Solution Solve each algor ithmic phase
Fail Conditions Wrong tile r eset s phase
Narrative
ResultFlow restored to Ar ray Plains
🛡 Concept Bridge — Boss: The Shuffler
Array Plains Boss — Multi-Pattern Recognition Under Pressure
󾠮 Story Recap — What You Just Did
The cr eature of pur e chaos dissol ves int o swir ling fragment s of numbers,  
symbols, and tiles.
Professor Node appr oaches the ar ena:
“The Shuf fler didn ʼt test a single ide a.
It thr ew multiple algor ithmic challenges  at y ou — b ack t o back —
and y ou swit ched p atterns as naturall y as br eathing. ˮ
He point s to each ar ena segment:
Phase 1  You restored order to shif ting r ows Sor ting).
Phase 2  You gr ouped symbols int o buckets Hashing).
Phase 3  You found mat ching pairs to reach t argets Two Sum).
Phase 4  You aligned three shifting sequences  at once Sc anning / Mul ti-
pass logic ).
Puzzle Design Doc
39
Node continues:
“This boss t ested something deeper than an y single puzzle bef ore it:
Can you recogniz e the shape of a pr oblem —
even when e verything is mo ving? ˮ
This set s the st age f or ad vanced p attern recognition:
Sorting  Hashing  T wo Sum  Mul ti-lane sc anning.
󾠯 The Meta-Lesson — Recognizing 
Patterns Under Chaos
Node f olds his hands:
“Real pr oblems rar ely announce themsel ves.
They wonʼt tell y ou, ‘Use sor ting. ʼ
Or ‘Use hashing her e.ʼ
You must see the pattern.ˮ
He e xplains:
The shif ting r ows?  Sorting problem form.
Grouping symbols?  Hash buck et form.
Matching numbers t o a t arget?  Two Sum form.
Fixing mul tiple scrambles at once?  Sequential mul ti-pass form.
He concludes:
“Your r eal mast ery appe ars when the w orld looks chaotic —
and y et you c an still sa y:
‘ Ah. I kno w this pat t er n. ʼˮ
Puzzle Design Doc
40
🟦 PHASE 1 — SORTING THE SHIFTING 
FIELDS
🔍 Pattern Recognition
Node:
“That first phase look ed chaotic — r ows sliding lef t and r ight.
But the go al was simple:
Fix each out-of-order neighbor until t he whole r ow is sor ted.
Classic sor ting beha vior.ˮ
This mir rors LeetCode pr oblems lik e:
“Sor t Colorsˮ (loc al swaps)
“Bubble-sor t-like cle aning of a cor rupt ed rowˮ
“Minimum adjacent swaps t o sor tˮ
💡 Why Sorting Fits This Problem
Node gestur es at the r ow:
“When cor rectness depends on or der, and e very tile has a kno wn place,
sorting is the r ight instinct. ˮ
Sorting is useful when:
You c an define a “ correct or derˮ
Incor rect p airs appe ar adjacent
The syst em st abiliz es af ter enough loc al fix es
🔣 High-Level Pseudocode
while r ow is not in cor rect or der:
    for each adjacent p air:
Puzzle Design Doc
41
        if lef t > r ight:
            swap them
Node:
“You didn ʼt comp are dist ant tiles.
You fix ed local mistakes until the entir e row was consist ent.
Thatʼ s the essence of adjacent -swap sor ting. ˮ
🧪 Mini-Forge Drill — “Spot the Disorderˮ
Forge UI sho ws:
Row: 3 , 1, 2
Prompt:
“Which p air is out of or der?ˮ
Correct:
3, 1
Next:
“Swap them t o fix the first mist ake.ˮ
Player swaps t o get: 1, 3 , 2
Then:
“Keep going until full y sor ted.ˮ
Correct final r esul t: 1, 2, 3
🟩 Codex Update (Phase 1) — Sorting Under 
Motion
📘 Sorting Under Motion
Puzzle Design Doc
42
When the pr oblem looks lik e a r ow that needs or dering → think sor ting
Fix loc al mist akes to fix the entir e syst em
Useful when it ems ha ve a natural or der and ar e out of place
🟧 PHASE 2 — BUCKETING THE SYMBOLS 
(HASHING)
🔍 Pattern Recognition
Node:
“Next, the Shuf fler hur led symbols at y ou.
You gr ouped them b y category using a rule.
That is the he art of hashing .ˮ
LeetCode equiv alent s:
“Group Anagramsˮ
“Buck et Sor tˮ
“Counting F requenciesˮ
“Hash map c ategor y groupingˮ
💡 Why Hashing Fits This Problem
“When it ems shar e categor ies,
and y ou need fast grouping ,
hashing is per fect.ˮ
Hashing is ide al when:
Items must be gr ouped
Order doesn ʼt mat ter
Puzzle Design Doc
43
Collisions ar e expect ed
Searching all it ems w ould be slo w
🔣 High-Level Pseudocode
for each symbol:
    buck et_inde x = hash(symbol)
    buck ets[buck et_inde x].append(symbol)
Node:
“You w erenʼt sor ting.
You w ere classifying .ˮ
🧪 Mini-Forge Drill — “Bucket Thisˮ
Forge sho ws symbols and rules lik e:
Rule:
“If symbol is 🍓  → buck et 0
If 🌾  → buck et 1
If 🥔  → buck et 2
Else → buck et 3ˮ
Player drags it ems t o cor rect buck ets.
Node:
“Collisions ar e nor mal — mul tiple it ems belong t ogether .ˮ
🟩 Codex Update (Phase 2) — Hash 
Grouping
📘 Hash Gr ouping
Puzzle Design Doc
44
Use when dat a falls naturall y int o categor ies
Appl y rules t o send it ems int o buck ets
Expect collisions — buck ets ma y hold mul tiple element s
🟥 PHASE 3 — TWO SUM ARENA 
(PARTNER MATCHING)
🔍 Pattern Recognition
The ar ena tiles with numbers lighting up r epresent:
“Giv en a t arget, find t wo values that sum t o it.ˮ
Node:
“This was a pur e Two Sum p attern.
You look ed at a number → c alculat ed it s partner → check ed if it e xisted.ˮ
LeetCode equiv alent s:
Two Sum
Pair sum v ariants
Target complement pr oblems
💡 Why Two Sum Fits This Problem
“When y our go al is:
‘Find two numbers t hat combine int o a targetʼ
Two Sum is the answ er.ˮ
Two Sum is per fect when:
You need pairs
You ha ve a target
Puzzle Design Doc
45
You want ON  time with a memor y structur e
🔣 High-Level Pseudocode
for x in numbers:
    y = t arget - x
    if y is in seen:
        retur n (x, y)
    seen.add(x)
Node summar izes:
“Think in t erms of p artners,
not brut e-force p airing.ˮ
🧪 Mini-Forge Drill — “Find the Partnerˮ
Numbers: 2, 7 , 4, 5, t arget  9
Step 1
“Look at 2. Need 7 .ˮ
Step 2
“Look at 7 . Need 2  f ound it in memor y.ˮ
🟩 Codex Update (Phase 3) — Partner Logic 
(Two Sum)
📘 Partner Logic T wo Sum)
Comput e partner = t arget - cur rent
Check memor y
Retur n inst antly when p artner e xists
Puzzle Design Doc
46
🟪 PHASE 4 — MULTI-LANE SCRAMBLE 
(SEQUENTIAL MULTI-PASS)
🔍 Pattern Recognition
The thr ee rows scrambling independentl y requir ed:
“Straight -line sc anning with mul tiple p asses —
fix one lane, then the ne xt, then the ne xt.ˮ
Node:
“This wasn ʼt sor ting, hashing, or p airing.
It was multi-pass cleanup ,
just lik e problems that r equir e:
scanning once t o collect inf o
scanning again t o appl y logic
scanning again f or final f ormattingˮ
LeetCode equiv alent s:
“Cle an up str ing in p assesˮ
“Reformat dat a in mul tiple sc ansˮ
“Stabiliz e sequences with r epeated sw eepsˮ
💡 Why Multi-Pass Logic Fits This Problem
“Some pr oblems c annot be sol ved in one sw eep.
You fix lane 1  lane 2  lane 3 ,
then check if all ar e stable. ˮ
🔣 High-Level Pseudocode
Puzzle Design Doc
47
for each lane:
    while lane not st able:
        fix loc al or der issues
Node:
“You tr eated e ach lane as a sep arate array.
You made independent p asses ,
then v erified all w ere aligned. ˮ
🧪 Mini-Forge Drill — “Fix All Lanesˮ
Forge sho ws:
Row A 3 ,1,2
Row B 5 ,4
Row C 1, 3,2
Prompt:
“Fix e ach r ow independentl y.ˮ
Player per forms sequential p asses.
Node:
“This is the essence of mul ti-pass st abilization. ˮ
🟩 Final Codex Unlock — Mixed-Pattern 
Recognition
📘 Mixed-Pattern Recognition
What You Learned in This Boss:
Recognizing the p attern from the shape  of the pr oblem
Puzzle Design Doc
48
Knowing when t o swit ch fr om sor ting → hashing → p airing
Underst anding that dif ferent pr oblem phases use dif ferent t ools
Appl ying mul tiple classic al techniques under pr essur e
Using mul ti-pass r easoning when pr oblems ha ve independent substructur es
You Unlocked:
The abilit y to sa y:
“This pr oblem looks lik e a sor ting phase…
but this ne xt part is cle arly Two Sum…
and the final st age is a mul ti-pass sc an.ˮ
This skill sep arates beginners fr om ad vanced pr oblem-sol vers — both in  
algor ithms and in int erviews.
! END OF CONCEPT BRIDGE  BOSS THE SHUFFLER 
🌊 Region 2 — Twin Rivers
🧩 Puzzle TR1 — Mirror Walk
Element Specif ic ation
Concept Two Pointers Symmetr ic)
Difficulty Easy  Medium
Environment Two mir rored b anks
Trigger Step on st art tile
Mechanics Movement mir rored; br eak symmetr y = r eset
Solution Reach central glo wing tile
🟧 Concept Bridge — Mirror Walk (TR1)
󾠮 Story Recap — What You Just Did
Puzzle Design Doc
49
Professor Node appe ars bet ween the t wo riverbanks, wat ching y our t wo avatars 
fade b ack int o one:
“On those b anks, y ou w erenʼt just mo ving one bod y.
You w ere contr olling two versions of y ourself :
one on the lef t, one on the r ight. ˮ
He walks a f ew st eps along the r iver:
“You didn ʼt wander randoml y.
You mo ved them in sync :
Left side st epping f orward,
Right side mir roring the mo ve.
Both of y ou walk ed toward the cent er,
until y ou met e xactl y wher e you needed t o.ˮ
This r einforces:
Two charact ers / mar kers
Starting fr om opposit e ends
Moving inwar d together
Meeting at a specific point
󾠯 Pattern Reveal — Explained Slowly
Professor Node smiles:
“That mo vement has a name in algor ithm land:
Itʼs called the Two Pointers technique .ˮ
He e xplains gentl y:
“Imagine y ou ha ve a line of st ones inst ead of a r iverbank. ˮ
“You put one mar ker at the left end .ˮ
Puzzle Design Doc
50
“You put one mar ker at the right end .ˮ
“Inst ead of sc anning fr om just one side,
both mar kers walk toward each other.ˮ
He giv es some e xamples:
“We use this ide a when:
We want t o comp are things at opposit e ends,
We want t o shr ink an int erval from both sides,
We want t o find a ‘meeting pointʼ that depends on v alues on both ends. ˮ
He emphasiz es the intuition:
“Two Pointers is:
‘Look from both ends at once,
and move inward intelligently.ʼˮ
󾠰 Pseudocode + Casual Explanation
A glo wing list appe ars abo ve the r iver:
left  0                # st art of the line
right = n  1           # end of the line
while lef t < r ight:
    look at positions lef t and r ight
    if the y satisfy the go al:
        retur n (lef t, right)
    other wise:
        move one of the point ers inwar d
Professor Node br eaks it do wn:
left  0 and r ight = n  1
“Weʼre just choosing st arting point s:
Puzzle Design Doc
51
left at the beginning,
right at the end.
Think: ‘One of me on the lef t bank, one on the r ight b ank. ʼˮ
while lef t < r ight:
“Keep going as long as the t wo mar kers havenʼt crossed .
If the y cross, it me ans w eʼve alr eady check ed e verything w e can.ˮ
look at positions lef t and r ight
“At each st ep, y ou look at a pair:
the v alue at the lef t point er
and the v alue at the r ight point er.ˮ
if the y satisfy the go al: retur n (lef t, right)
“Sometimes, that p air is alr eady the answ er:
maybe the y sum t o a t arget,
or form the best cont ainer ,
or mat ch a condition w e care about.
If so, w eʼre done. ˮ
other wise: mo ve one of the point ers inwar d
“If this p air doesn ʼt work,
you don ʼt reset e verything.
You move one point er:
either the lef t one st ep right,
or the r ight one st ep lef t,
depending on ho w the v alues comp are and what the pr oblem is asking. ˮ
He summar izes:
“So T wo Pointers is:
Puzzle Design Doc
52
Start at both ends,
Check the p air,
If itʼs not good enough, mo ve one point er closer ,
Repeat until the y meet or cr oss. ˮ
󾠱 Mini-Forge Practice — Symmetry & Movement Drill
The Logic F orge opens a small simulation:
You see a shor t line of tiles:
Inde xes:
0   1   2   3   4
Values ( example ):
2   5   8   5   2
Two mar kers:
L (left) starts at inde x 0
R (right) st arts at inde x 4
Goal (example):
“Mo ve L and R t oward each other while k eeping them symmetr ic ar ound the  
cent er.ˮ
Step 1 — Who Moves?
Prompt:
“If L is at 0 and R is at 4 ,
which mo ve keeps the ide a of ‘mo ving inwar d from both endsʼ?ˮ
Options:
Move L from 0  1
Move R from 4  5
Move L from 0  2
Puzzle Design Doc
53
Correct answ er:
Move L from 0  1  (or R from 4  3  in a dif ferent st ep), but never jump o ver 
or go out ward.
The F orge highlight s:
“Two Pointers mo ve toward each other , not awa y,
and not b y jumping o ver the cent er.ˮ
Step 2 — Correct Sequence
The dr ill walks the pla yer thr ough:
 Start: L  0, R  4
 Move inwar d: L  1, R  3
 Meet or cr oss at cent er: L  2, R  2 (or L  R)
Node comment ary:
“Thatʼ s the r hythm:
left from the st art, right fr om the end,
walking t oward the middle, st ep b y step.ˮ
󾠲 Codex Unlock — Two Pointers (Mirror Walk)
A ne w entr y appe ars in the Code x:
📘 Two Pointers (Mirror Walk)
What You Felt:
“I contr olled t wo versions of m yself fr om opposit e sides and mo ved them  
toward each other .ˮ
Plain Explanation:
“The T wo Pointers t echnique uses t wo mar kers that st art at dif ferent positions  
(often the ends of a list) and mo ve toward each other , checking p airs of v alues  
Puzzle Design Doc
54
along the wa y.
Itʼs useful whene ver:
you c are about pairs from opposit e sides,
you want t o shrink a range ,
or you want t o find some meeting point b ased on v alues fr om both ends. ˮ
Pattern Steps:
 Place one point er at the st art.
 Place one point er at the end.
 While the y ha venʼt crossed:
Look at the p air (lef t, right).
If it satisfies the go al → r etur n it.
Other wise, mo ve one point er inwar d.
Where Youʼll See This A gain:
“Cont ainer With Most W aterˮ
Checking if a str ing is a p alindr ome
Finding p airs in sor ted ar rays
Any problem that sa ys:
“Use t wo point ersˮ
or
“Start from both ends… ˮ
Unlocked Abilit y:
Recogniz e problems that c an be sol ved b y
starting at bot h ends and w alking inw ard
instead of sc anning fr om one side onl y.
! END OF CONCEPT BRIDGE FOR PUZZLE TR1 
Puzzle Design Doc
55
🧩 Puzzle TR2 — Meeting Point
Element Specif ic ation
Concept Conditional P ointer Con vergence
Difficulty Medium
Environment Traps X, Anchors A, nar row path
MechanicsPointers mo ve inwar d; can onl y pass traps when the other point er st ands
on mat ching anchor
Solution Correct sequence of conditional point er mo ves
Failure Illegal mo ve → r eset
🟧 Concept Bridge — Meeting Point (TR2)
󾠮 Story Recap — What You Just Did
Professor Node appe ars on the nar row path, wher e the traps and anchors ar e still  
faintl y glo wing:
“On this p ath, y our t wo sel ves didn ʼt just mar ch straight t oward each other .
You had t o be careful .
Some tiles w ere traps you couldn ʼt cross alone.
You could onl y pass them when y our other self was st anding on the r ight 
anchor tile .ˮ
He gestur es at the mar ked spot s:
“You w erenʼt just mo ving t wo point ers inwar d.
You w ere mo ving them based on conditions :
‘I canʼt mo ve lef t yet… r ight isn ʼt in position. ʼ
‘I canʼt cross this trap until the other side is r eady.ʼˮ
This r einforces:
Puzzle Design Doc
56
Two point ers mo ving inwar d
Their mo ves depend on e ach otherʼs positions
Progress onl y happens when conditions ar e satisfied
󾠯 Pattern Reveal — Explained Slowly
Professor Node:
“This is still the T wo Pointers ide a…
but with a t wist:
Conditional P ointer Logic .ˮ
He br eaks it do wn:
“You still had one point er on the left, one on the r ight. ˮ
“You still want ed them t o meet  in the middle. ˮ
“But y ou couldn ʼt alwa ys just ‘mo ve both inwar dʼ.ˮ
He e xplains the “ conditionalˮ aspect:
“Sometimes:
The lef t side must wait for the r ight.
The r ight side must wait for the lef t.
You don ʼt mo ve blindl y.
You ask:
‘Is it saf e or legal t o mo ve this point er right no w?ʼˮ
He connect s this t o real algor ithm p atterns:
“Ther e are man y problems wher e:
You c an onl y mo ve a point er if a constraint is satisf ied
You c an onl y expand or shr ink a range if a condition holds
Thatʼ s what y ou just practiced:
Puzzle Design Doc
57
Two point ers with rules .ˮ
󾠰 Pseudocode + Casual Explanation
A simple “trap + anchor ˮ sketch appe ars abo ve the p ath:
left  0
right = n  1
while lef t < r ight:
    if lef t_is_at_trap and r ight_ not_on_ matching_anchor:
        move right t oward its anchor
    elif r ight_ is_at_trap and lef t_not_on_ matching_anchor:
        move lef t toward its anchor
    else:
        move both point ers inwar d
# meet at the cor rect meeting point
Professor Node walks thr ough it:
left  0 / r ight = n  1
“Our t wo point ers st art at opposit e ends, as bef ore.ˮ
while lef t < r ight:
“We keep going until the y meet or cr oss — thatʼ s our pot ential meeting point. ˮ
if lef t_is_at_trap and r ight_ not_on_ matching_anchor:
“This is y ou noticing:
‘Left point er has r eached a trap tile .
I canʼt move lef t forward yet,
because r ight hasn ʼt stepped ont o the r ight anchor .ʼˮ
move right t oward its anchor
“So inst ead, y ou mo ve the other point er
Puzzle Design Doc
58
to satisfy the condition.
Youʼre not stuck — y ou just mo ve the side that can move saf ely.ˮ
elif r ight_ is_at_trap and lef t_not_on_ matching_anchor:
“Same ide a, flipped:
If the right point er is block ed b y a trap,
then the left pointer needs t o get t o its anchor .ˮ
else: mo ve both point ers inwar d
“Once the conditions ar e satisfied — anchors in place, traps cle ared —
you c an go b ack t o the ‘nor malʼ mo vement:
both point ers st epping inwar d toward each other .ˮ
He sums up:
“So in this puzzle, mo ving a point er wasn ʼt aut omatic.
Every mo ve was a decision :
‘Is this point er allo wed to mo ve right no w
or does something need t o happen on the other side first?ʼˮ
󾠱 Mini-Forge Practice — Conditional Move Drill
The Logic F orge opens a small mini-game with a simplified r ow:
Tiles (t op vie w):
L   _   X1   _   A1   _   R
Legend:
L = lef t point er
R = right point er
X1 = lef t-side trap
A1 = right-side anchor
Goal:
Puzzle Design Doc
59
“Get L and R t o meet in the middle without cr ossing an y trap illegall y.ˮ
Step 1 — Who Moves First?
Prompt:
“Lef t is ne ar trap X1.
Right is still f ar fr om anchor A 1.
Who should mo ve no w?ˮ
Options:
Move Lef t toward X1
Move Right t oward A1
Correct answ er:
Move Right t oward A 1
If the pla yer chooses lef t:
“Lef t canʼt cross X1 until r ight is on A 1.
Try mo ving the point er that c an saf ely progress the condition. ˮ
Step 2 — Anchor Then Trap
Next, right point er mo ves st ep-b y-step to A1.
Prompt:
“Right has r eached A 1.
Now what c an Lef t do?ˮ
Correct answ er:
Move Lef t acr oss X1 (trap is no w unlock ed b y right being on it s anchor).
The dr ill repeats a tin y sequence with dif ferent trap–anchor p airs, r einforcing:
You check conditions f irst
Then decide which point er is allo wed to mo ve
Puzzle Design Doc
60
Node comment ary:
“This is ho w man y point er pr oblems w ork:
the mo ve you mak e isn ʼt fixed —
it depends on what bot h sides ar e currently seeing .ˮ
󾠲 Codex Unlock — Conditional Pointer Logic
A fresh Code x entr y unlocks:
📘 Conditional Pointer Logic (Meeting Point)
What You Felt:
“I want ed both sides t o meet, but I had t o respect trap rules and wait f or the  
other side t o unlock m y path.ˮ
Plain Explanation:
“Sometimes t wo point ers c anʼt just mar ch inwar d in a simple p attern.
Their mo vement is conditional :
‘Can I mo ve lef t now, giv en wher e right is?ʼ
‘Can I mo ve right, or do I need lef t to catch up?ʼ
You mo ve whiche ver point er mak es sense based on t he current state.ˮ
Pattern Steps:
 Start with t wo point ers (lef t, right).
 While the y ha venʼt met:
If one side is block ed b y a condition (trap, constraint):
Move the other point er to satisfy that condition.
Other wise:
Move one or both point ers inwar d.
Where Youʼll See This A gain:
Puzzle Design Doc
61
Problems with constraint s like:
“You c anʼt cross this until count ≥ kˮ
“You must maint ain a cer tain b alance or windo w condition ˮ
Two-point er solutions wher e mo vement logic depends on:
sums, dif ferences, fr equencies, or other conditions.
Unlocked Abilit y:
Recogniz e problems wher e:
Two point ers still mo ve toward a meeting point,
but who mo ves when  depends on d ynamic rules,
not just a fix ed “mo ve lef t, then mo ve rightˮ p attern.
! END OF CONCEPT BRIDGE FOR PUZZLE TR2 
🧩 Puzzle TR3 — Sliding Window Catch
Element Specif ic ation
Concept Sliding Windo w
Difficulty Medium  Har d
Environment Flowing r iver with it ems; adjust able windo w frame
Mechanics Expand/shr ink windo w to captur e requir ed sequence: e.g. 3 🌾   1 🍓
Solution Identify v alid contiguous windo w
Failure Holding in valid windo w too long
🟧 Concept Bridge — Sliding Window Catch (TR3)
󾠮 Story Recap — What You Just Did
Professor Node wat ches the r iver set tle as the last p attern of fish swims p ast:
“Just no w, you w erenʼt chasing e very fish in the r iver.
Puzzle Design Doc
62
You focused on a section  of the r iver — a windo w.
And inst ead of r estarting y our se arch e very time something changed,
you slid that windo w just a lit tle bit at a time. ˮ
He gestur es toward the mo ving wat er:
“Sometimes y ou e xpanded the windo w to include mor e fish.
Sometimes y ou shrunk  it when the p attern bec ame in valid.
And y ou k ept adjusting the boundar ies until the windo w cont ained e x actl y the 
pattern you needed. ˮ
This r einforces:
You maint ained a continuous r ange
You k ept it valid
You adjust ed the start or end point er as needed
You did not r estart from scrat ch
󾠯 Pattern Reveal — Explained Slowly
Professor Node:
“The t echnique y ou just used is c alled the Sliding Windo w.ˮ
He e xplains the intuition st ep-b y-step:
Why Sliding Window Exists
Some pr oblems de al with continuous chunks  of dat a — sub arrays, 
substr ings, r iver segment s.
You don ʼt want t o restart and sc an e verything fr om scrat ch e ach time the  
windo w changes.
Instead, y ou reuse what y ou alr eady kno w and slide  the boundar ies ar ound.
The Mental Model
Puzzle Design Doc
63
“Imagine y our windo w is a lit tle frame y ou place on the r iver.
Push the r ight side out ward → include mor e fish.
Pull the lef t side inwar d → r emo ve fish y ou don ʼt want.
As long as y ou maint ain the r ight p attern inside the frame, y ouʼre on track. ˮ
He summar izes:
“Sliding Windo w is:
Grow  Shr ink  Mo ve  Repeat
without starting over.ˮ
󾠰 Pseudocode + Casual Explanation
A glo wing UI o verlay sho ws the structur e:
windo w_st art  0
for windo w_end in range(len(str eam)):
    expand windo w to include str eam[windo w_end]
    while windo w is in valid:
        shrink windo w from the lef t
    if windo w has the t arget p attern:
        recor d or r etur n the windo w
Professor Node br eaks it do wn lik e a co ach:
window_start = 0
“This mar ks the lef t edge of y our windo w.ˮ
for window_end in range(len(stream)):
“And this mo ves the r ight edge of y our windo w forward.
Puzzle Design Doc
64
Every time y ou e xtend it, y ou include one ne w item.ˮ
“expand window to include stream[window_end]ˮ
“You added a ne w fish int o the windo w — good or b ad.ˮ
while window is invalid:
“Her eʼs the impor tant p art:
If the ne w fish mak es the windo w br eak the rules
(maybe too man y ber ries, or not enough grains, et c.)
you don ʼt restart the whole se arch.
You shrink the windo w from the left until it's legal again. ˮ
“if window has the target pattern:ˮ
“Once the windo w mat ches the p attern — lik e 3 🌾  and 1 🍓  —
you recor d it or use it. ˮ
He finishes:
“The magic of Sliding Windo w is:
You only move each point er forward. Never backward.
No resets. No full r e-scans. ˮ
󾠱 Mini-Forge Practice — Window Adjustment Drill
The Logic F orge opens a small simulation:
Stream:
🌾 , 🍓 , 🌾  , 🌾  , 🍋  , 🌾  , 🍓
Target Pattern:
“Find a windo w cont aining 3 grains 🌾  and 1 ber ry 🍓 ,
in an y order, but contiguous .ˮ
Puzzle Design Doc
65
Step 1 — Expand
Prompt:
“Exp and the windo w until it cont ains at le ast 3 🌾 .ˮ
The pla yer clicks t o grow right edge:
Windo w picks up: 🌾, 🍓, 🌾 , 🌾
Windo w no w has:
🌾  3
🍓  1
Pattern met.
Step 2 — Shrink if Needed
Prompt:
“Now shr ink fr om the lef t until r emo ving an y mor e would br eak the p attern.ˮ
If the pla yer shr inks t oo far (r emo ves the first 🌾 ):
Windo w becomes:
🌾  2 (in valid)
Forge tooltip:
“Oops! Y ou remo ved a r equir ed it em.
Sliding Windo w shr inks onl y when legally possible .ˮ
Correct action:
Stop shr inking when windo w cont ains e xactl y whatʼ s requir ed.
Step 3 — Slide
Prompt:
“Now slide the whole windo w one st ep to the r ight b y:
Remo ving the lef tmost it em
Puzzle Design Doc
66
Expanding the r ight boundar yˮ
Player practices:
Remo ve first 🌾
Add ne xt 🍋
Windo w becomes in valid → shr ink/e xpand loop r epeats.
Node comment ary:
“This is the r hythm:
Expand  Shr ink  Check  Slide. ˮ
󾠲 Codex Unlock — Sliding Window Technique
A ne w Code x entr y appe ars:
📘 Sliding Window Technique
What You Felt:
“I maint ained a continuous windo w on the r iver and adjust ed m y boundar ies 
until the p attern appe ared.ˮ
Plain Explanation:
“Sliding Windo w is f or pr oblems wher e the answ er lies in a contiguous range.
You mo ve two point ers:
One gr ows the windo w
One shr inks it
You ne ver restart the se arch — y ou adjust the windo w as y ou go. ˮ
Pattern Steps:
 Start with both edges at the beginning.
 Expand r ight edge t o include mor e items.
Puzzle Design Doc
67
 If windo w becomes in valid → shr ink fr om the lef t.
 When windo w mat ches the go al → r ecor d the r esul t.
 Continue sliding thr ough the entir e str eam.
Where Youʼll See This A gain:
“Longest substr ing without r epeating charact ersˮ
“Minimum windo w substr ingˮ
“Sub array sum equals Kˮ
Pattern-counting pr oblems
Any problem that sa ys:
“Find a contiguous sub array/string that … ˮ
Unlocked Abilit y:
Recogniz e problems that r equir e
keeping a running windo w,
adjusting boundar ies,
and a voiding full r estarts.
! END OF CONCEPT BRIDGE FOR PUZZLE TR3 
🧩 Puzzle TR4 — Breaking the Currents
Element Specif ic ation
Concept Non-symmetr ic Pointer Updat es
Difficulty Medium  Har d
Environment Tiles with cur rents that push v alues
Mechanics Maint ain symmetr y value while cur rents modify point er values
Solution Move point er with lo wer value first
Failure Symmetr y dif ference t oo lar ge
Puzzle Design Doc
68
🟧 Concept Bridge — Breaking the Currents (TR4)
󾠮 Story Recap — What You Just Did
The r iver cur rents fade as Pr ofessor Node appe ars, his r obe r ippling as if pushed  
by invisible wa ves:
“Those cur rents werenʼt random.
Sometimes the y pushed the left pointer down — lo wering it s value.
Sometimes the y pushed the right point er up  — raising it s value.
You couldn ʼt mo ve both sides the same wa y an ymor e.ˮ
He continues:
“You had t o wat ch the v alues, not just the positions.
When the cur rents changed one point er mor e than the other ,
you adjust ed:
‘Left is t oo lo w — it must mo ve ne xt.ʼ
‘Right is t oo high — shif t it inwar d to rebalance. ʼˮ
He gestur es at the tiles:
“You w erenʼt just walking inwar d.
You w ere balancing t wo changing v alues ,
keeping them within a saf e range. ˮ
This r einforces:
The point ers ha ve values , not just positions
External f orces change those v alues
Movement choices depend on relative value conditions
It is not symmetr ic like earlier puzzles
󾠯 Pattern Reveal — Explained Slowly
Puzzle Design Doc
69
Professor Node smiles kno wingl y:
“This ide a is c alled Non-Symmetr ic Pointer Logic. ˮ
He br eaks it do wn:
“Classic t wo-point er pr oblems mo ve both point ers inward.ˮ
“But sometimes the point ers ha ve different rules ,
or the dat a under e ach point er changes dif ferently.ˮ
“So y ou c anʼt mo ve them the same wa y.ˮ
He e xplains the k ey intuition:
“When the v alues under the point ers dr ift apart,
you ha ve to mo ve the point er with the weaker value —
the one that needs t o catch up,
or rebalance the condition. ˮ
He giv es real coding analogies:
“In some pr oblems, y ou must k eep difference  K.ˮ
“In others, y ou must k eep a ratio belo w a thr eshold. ˮ
“Or the lef t point er must alwa ys st ay <= the r ight point erʼs value. ˮ
He concludes:
“This is when point er mo vement becomes conditional and asymmetr ic.
You mo ve the point er whose v alue violat es the condition. ˮ
󾠰 Pseudocode + Casual Explanation
A glo wing p anel f orms, sho wing the logic:
left = st art
right = end
while lef t < r ight:
Puzzle Design Doc
70
    if value[lef t] < v alue[r ight]:
        move lef t point er forward
    else:
        move right point er backwar d
    updat e values b ased on cur rents
    check if dif ference <= allo wed_range
Professor Node br eaks it do wn:
if value[left] < value[right]:
“If the lef t value is smaller — it mo ves ne xt.
Why?
Because it must ‘ catch up ʼ to the r ight
to maint ain a st able dif ference. ˮ
else:
“If the r ight v alue is smaller , or lar ger in a har mful wa y,
then the r ight point er must mo ve.ˮ
update values based on currents
“Every time y ou mo ve,
the en vironment changes the v alues under the point ers.
Maybe the lef t side dr ops b y 2,
maybe the r ight side r ises b y 1.ˮ
check if difference <= allowed_range
“You must k eep the point ers within a saf e dif ference.
If the gap becomes t oo lar ge — the whole syst em collapses. ˮ
He summar izes:
Puzzle Design Doc
71
“This entir e puzzle was about d ynamic conditions.
The cor rect point er to mo ve changed moment t o moment,
depending on cur rent v alues. ˮ
󾠱 Mini-Forge Practice — Non-Symmetric Pointer Drill
A mini simulation opens:
Tiles:
L3    5    7    10    R11
Values under the point ers:
Left point er = 3
Right point er = 11
Allowed dif ference:  6
Step 1 — Choose the Correct Pointer
Prompt:
“Lef t is 3 , Right is 11.
Difference  8 (t oo lar ge).
Which point er must mo ve to reduce the dif ference?ˮ
Options:
Move Lef t (raising v alue )
Move Right (lo wering v alue )
Correct:
Move Left (bec ause incr easing the smaller side r educes the dif ference )
If the pla yer select s wr ong:
“Mo ving the higher point er first w ould incr ease the imb alance.
Move the point er with the weaker value. ˮ
Puzzle Design Doc
72
Step 2 — Apply Current Effects
New values af ter “currentsˮ appl y:
Left incr eases fr om 3  5
Right incr eases fr om 11  12
Difference no w  7 (still t oo lar ge)
Prompt:
“Which point er must mo ve no w?ˮ
Correct:
Move Left again
Step 3 — Landmark Moment
Eventuall y:
Left  7
Right  10
Difference  3 (v alid)
Node comment ary:
“Good.
You adjust ed the point er with the v alue that violat ed the condition.
This is the he art of non-symmetr ic point er pr oblems:
Move the point er that restores balance. ˮ
󾠲 Codex Unlock — Non-Symmetric Pointer 
Adjustments
Code x entr y appe ars:
📘 Non-Symmetric Pointer Adjustments
What You Felt:
Puzzle Design Doc
73
“I mo ved the point er whose v alue br oke the b alance rule,
not necessar ily the one on the lef t or the r ight. ˮ
Plain Explanation:
“Some pr oblems r equir e keeping a d ynamic condition true:
difference ≤ k
ratio ≤ t
value[lef t] <= v alue[r ight]
because e ach point er exper iences e xternal f orces dif ferently.ˮ
Pattern Steps:
 Start with t wo point ers.
 Evaluat e the condition ( difference, ratio, et c.).
 Move the point er that weakens the condition.
 Updat e values.
 Repeat until point ers meet or b alance succeeds.
Where Youʼll See This A gain:
“Minimum operations t o equaliz e arraysˮ
“Pairs within thr eshold constraint sˮ
“Balancing pr oblems with d ynamic changesˮ
Problems wher e input v alues shift as you process them
Unlocked Abilit y:
Detect when point er mo vement depends on v alues,
not just positions —
and mo ve the point er that r estores a st able condition.
! END OF CONCEPT BRIDGE FOR PUZZLE TR4 
🛡
Puzzle Design Doc
74
🛡 Twin Rivers Boss — The Mirror Serpent
Element Specif ic ation
Concept Two Pointers  Sliding Windo w
Difficulty Hard
Theme Serpent that mir rors the pla yerʼs logic
Phases1. Symmetr y trial  2. Con vergence  3 . Sliding Windo w  4 . Combined
final
Failure Wrong logic r eset s phase
Narrative
ResultPath t o ne xt region unlock ed
🛡 Concept Bridge — Boss: The Mirror Serpent
Twin Rivers Boss — Advanced Pointer & Window Reasoning
󾠮 Story Recap — What You Just Did
The Mir ror Ser pent dissol ves int o twin r ipples along both r iverbanks.
Professor Node appe ars wher e the cur rents once collided:
“This ser pent was unlik e an ything else y ouʼve faced.
It tested y our control over both sides  of a pr oblem —
your abilit y to mo ve inwar d, to track ranges,
and t o think in per fect symmetr y when needed. ˮ
He point s to the dif ferent segment s of the ar ena:
Phase 1  You maint ained per fect mir roring — true T wo Pointer symmetr y.
Phase 2  You mo ved point ers inwar d based on e volving constraint s.
Phase 3  You c aptur ed a v alid p attern using a d ynamic Sliding Windo w.
Phase 4  You combined all of them under shif ting conditions.
Puzzle Design Doc
75
Node continues:
“This boss t ested not one skill…
but y our abilit y to choose the r ight t ool
for each f orm the pr oblem t ook. ˮ
This set s up the ad vanced ment al model:
Recogniz e problem shape
Match it to the correct point er/window pattern
Combine p atterns fluidl y
🟦 PHASE 1 — SYMMETRY TRIAL (Basic 
Two Pointers)
🔍 Pattern Recognition
Node:
“The ser pentʼ s opening tr ial was pur e symmetr y.
What ever you did on the lef t,
the r ight had t o reflect per fectly.ˮ
This is identic al to:
Palindrome checking
Mirror-based comp arisons
Two pointers meeting in t he middle
💡 Why Two Pointers Fit This Problem
“When t wo sides must mir ror each other ,
you place a point er at e ach end
and walk inwar d.ˮ
Puzzle Design Doc
76
Exactl y like:
“Is this str ing a p alindr ome?ˮ
“Meet -in-the-middle logic ˮ
“Check symmetr ic conditionsˮ
🔣 High-Level Pseudocode
left  0
right = n  1
while lef t < r ight:
    if river[lef t] ! mir ror[river[right]]:
        reset
    move lef t++
    move right--
Node e xplains:
“Your job wasn ʼt to explor e —
it was t o preser ve symmetr y.ˮ
🧪 Mini-Forge Drill — “Which Move Preserves 
Symmetry?ˮ
UI sho ws t wo mir rored b anks.
Prompt:
“You mo ve lef t forward.
What must the r ight point er do?ˮ
Correct:
Move right b ackwar d.
Forge message:
Puzzle Design Doc
77
“Two Pointers = inwar d symmetr y.ˮ
🟩 Codex Update (Phase 1) — Symmetric 
Pointers
📘 Symmetr ic Pointers
Used when t wo sides must mat ch
Pointers st art at ends, meet in cent er
Common in p alindr ome and p airing pr oblems
🟧 PHASE 2 — CONVERGENCE 
CHALLENGE (Conditional Pointer Logic)
🔍 Pattern Recognition
The Ser pent block ed one p ath unless the other side aligned:
Node:
“Her e, you didn ʼt just walk inwar d.
You mo ved b ased on conditions .ˮ
This is the same p attern as:
“Mo ve smaller point er firstˮ
“Conditional con vergence ˮ
Problems lik e “Cont ainer With Most W ater,ˮ wher e point er choice mat ters
💡 Why Conditional Pointer Movement Fits This Phase
“Each point er saw dif ferent inf ormation.
And y our job was t o mo ve the point er that impr oved the condition. ˮ
Puzzle Design Doc
78
Equiv alent t o:
comp aring height s
comp aring fr equencies
comp aring v alues t o constraint s
🔣 High-Level Pseudocode
while lef t < r ight:
    if condition f avors lef t:
        move lef t++
    else:
        move right--
Node:
“This is decision-making, not chor eograph y.ˮ
🧪 Mini-Forge Drill — “Which Pointer Moves?ˮ
Prompt:
“Lef t value is smaller → which point er mo ves?ˮ
Correct:
Move left, bec ause the smaller side impr oves the condition.
🟩 Codex Update (Phase 2) — Conditional 
Convergence
📘 Conditional Con vergence
Move the point er that impr oves or fix es the condition
Fundament al in:
Cont ainer With Most W ater
Puzzle Design Doc
79
Pair comp arisons
Range tight ening
🟥 PHASE 3 — SLIDING WINDOW TRAP 
(Dynamic Window Logic)
🔍 Pattern Recognition
The ser pent hid it s weak point inside a moving band you could adjust.
Node:
“This was a classic Sliding Windo w.
You e xpanded the windo w…
shrank it…
and maint ained it until the p attern appe ared.ˮ
This cor responds t o:
Substr ing pr oblems
Minimum windo w substr ing
Longest substr ing without r epeating charact ers
Frequenc y-bound pr oblems
💡 Why Sliding Window Fits This Problem
“When a solution must come fr om a contiguous range,
and y ou must maint ain validity,
Sliding Windo w is the r ight t ool.ˮ
🔣 High-Level Pseudocode
Puzzle Design Doc
80
start  0
for end in range(n):
    include r iver[end]
    while windo w in valid:
        remo ve river[st art]
        start++
    if windo w mat ches p attern:
        highlight w eak point
Node:
“You didn ʼt restart your se arch.
You adjust ed y our boundar ies.ˮ
🧪 Mini-Forge Drill — “Expand, Shrink, Checkˮ
Stream e xample:
🌾 🍓 🌾  🌾  🍋  🌾  🍓
Goal: 3 grains  1 ber ry.
Player:
expands until v alid
shrinks until minimal
slides f orward
Forge repeats until itʼ s instinctual.
🟩 Codex Update (Phase 3) — Pattern-
Constrained Windowing
📘 Pattern-Constr ained Windo wing
Maint ain a continuous range
Puzzle Design Doc
81
Expand or shr ink b ased on v alidit y
Used e verywher e patterns depend on fr equenc y or uniqueness
🟪 PHASE 4 — FINAL COMPOSITE (Pointer 
+ Window Fusion)
🔍 Pattern Recognition
This final phase r equir ed:
Symmetr y Two Pointers)
Conditional con vergence
Dynamic sliding windo w
Node:
“This was the first r eal hybrid challenge.
You recogniz ed the shape of the moment
— and chose the r ight t echnique e ach time. ˮ
This r esembles:
Hard LeetCode h ybrids
Problems lik e:
“Longest substr ing with at most K r eplacement sˮ
“Count sub arrays with constraint sˮ
“Sliding windo w af ter sor tingˮ
“Two Pointers  Hash Map  Windo w constraint sˮ
💡 Why Composite Skills Matter
“Real int erview pr oblems of ten requir e
two or thr ee p atterns inside the same question. ˮ
Puzzle Design Doc
82
The Mir ror Ser pent t ests:
When to use Two Pointers
When to apply a windo w
When to tighten conditions
When to move left vs right
When to expand vs shr ink
🔣 High-Level Multi-Pattern Pseudocode
left  0
right = n  1
start  0
while ser pent_activ e:
    # Phase 1 logic
    maint ain_symmetr y()
    # Phase 2 logic
    if condition_f avors_ left: lef t++
    else: r ight--
    # Phase 3 logic
    while windo w_invalid: st art++
    expand_windo w()
    shrink_windo w_if_needed()
    # det ect final w eak point
    if point ers_con verged and windo w_valid:
        defeat_ser pent()
Node:
Puzzle Design Doc
83
“Interviews lo ve this kind of structur e:
Sorting  T wo Pointers  Sliding Windo w.ˮ
“Itʼs rar ely one ide a.
Itʼs the sequence  of ide as.ˮ
🧪 Mini-Forge Drill — “Choose the Right Toolˮ
Forge pr esent s thr ee scenar ios:
Scenario 1 — “Two sides must mirror each other.ˮ
Correct t ool: Two Pointers Symmetr y)
Scenario 2 — “We must track largest valid range.ˮ
Correct t ool: Sliding Windo w
Scenario 3 — “Compare left and right values; move the weaker.ˮ
Correct t ool: Conditional T wo Pointers
Node comment ary:
“This is the he art of ad vanced pr oblem sol ving:
Tool selection. ˮ
🟩 Final Codex Unlock — Hybrid 
Pointer/Window Reasoning
📘 Hybrid Pointer/Window Reasoning
What You Mastered:
Symmetr ic Two Pointers
Conditional point er mo vement
Sliding Windo w range maint enance
Puzzle Design Doc
84
Dynamic t echnique swit ching
Why This Matters:
“Most F AANG-le vel medium/har d problems
are combinations of these ide as.ˮ
Where Youʼll See This Again:
Cont ainer With Most W ater
Longest Substr ing Without R epeating Charact ers
Minimum Windo w Substr ing
3Sum & v ariants (sor t  2p )
Sliding Windo w with constraint s
Two Pointers  Hash Map h ybrids
Unlocked Ability:
Recogniz e when a pr oblem ʼs shape
requir es y ou to combine mor e than one t echnique
— and swit ch fluidl y.
! END OF CONCEPT BRIDGE  BOSS THE MIRROR SERPENT 
🎉 END OF DOCUMENT
Puzzle Design Doc
85


## GDD

GDD
🎮  E A R L Y  A C C E S S  G A M E  D E S I G N  
D O C U M E N T  ( G D D )
Algorithmia: The Path of Logic — Early 
Access Build
Pr ologue  Ar r a y Plains  T win Riv ers)
📌 0. Overview
Algor ithmia is a puzzle-ad venture RPG that t eaches dat a structur es and  
algor ithms DSA  through exploration, visual puzzles, and intuitiv e interactions.
Instead of memor izing formulas or gr inding LeetCode, pla yers learn DSA concept s 
by living them  inside a st ory-driven world.
Early Access includes:
3 regions: Prologue, Ar ray Plains, T win Rivers
10 cor e puzzles
A full Concept Br idge syst em
Two mul ti-phase boss puzzle b attles
A simplif ied Logic F orge syst em
Code x entr ies f or every concept le arned
24 hours of gamepla y
The purpose of Ear ly Access is t o deliver a polished v ertical slice that c aptures 
the game ʼs identit y:
✨ DSA lear ning thr ough fun, intuitiv e gamepla y .
GDD
1
📌 1. Core Gameplay Pillars
1. Exploration
Top-down 2D pix el world
Walk around villages and natural ar eas
Talk to NPCs
Step into puzzle z ones or int eract with puzzle object s
2. Intuitive DSA Puzzles
Each region cont ains 35 puzzles
Each puzzle is a visual/met aphorical representation of an algor ithmic p attern
Difficulty escalates graduall y
3. Concept Bridge (Core Feature)
After each puzzle:
NPC explains what the pla yer actuall y did
Introduces the DSA p attern informally
Shows comment ed pseudocode
Provides a mini int eractive practice e xercise
Updates the Code x
4. Boss Puzzle Battles
No comb at
Multi-step, high-int ensity puzzles
Each boss r epresents a FAANG-style algorithm pattern
Completing all r egion puzzles unlocks boss
5. Logic Forge
A small “ coding dojo ˮ
GDD
2
Lets the pla yer practice algor ithm steps in simplified f orm
Early Access v ersion uses drag-and-dr op, choose-the-st ep, point er-
movement puzzles
6. Codex
In-game enc yclopedia
Stores all patterns, explanations, and w orked examples
Unlocks entr ies as you complet e puzzles
📌 2. Controls
Move: WASD / Ar row Keys
Interact: E
Menu: ESC
Code x: C
Inventory: I
Fast-forward dialogue:  Space
📌 3. World Structure (Early Access 
Scope)
Regions Included
 Prologue  Chamber of Flo w
 Array Plains  Ar rays, Sor ting,  Hashing,  Two Sum
 Twin Riv ers  T wo Pointers, Sliding Windo w
Region Flow
Prologue  Ar ray Plains  T win Rivers  End of EA
GDD
3
Each region:
35 core puzzles
1 boss
12 Logic F orge challenges
1 Codex set
📌 4. Region 0 — Prologue (Chamber of 
Flow)
Purpose
Teach exploration b asics
Introduce puzzle activ ation
Establish tone + w orld rules
Introduce Pr ofessor Node
Show how Concept Br idge works in a simple f orm
Environment
Floating geometr ic platforms
Ambient glo w
Minimal obst acles
Soft music
🧩 Prologue Puzzles
Puzzle P0-1 — “Follow the Pathˮ
Goal: Introduce p attern following
Mechanics:
GDD
4
A sequence of tiles light s up
Player walks on tiles in the same or der
Learning:
Pattern matching
Sequence r ecognition
Puzzle P0-2 — “Fractured Sentinelˮ
Goal: Teach environmental manipulation
Mechanics:
34 glowing fragment s are scattered
Push them int o correct slots
Unlock p assage
Learning:
Spatial reasoning
Cause-and-ef fect
🛡 Prologue Boss — Fractured Sentinel
Type: Simple puzzle r oom boss
Phases
 Repeat longer p attern sequence
 Assemble lar ger multi-part tile formation
 Follow fading footprints to final pedest al
Resul t:
Sentinel bo ws and dissol ves
Unlocks Ar ray Plains
GDD
5
📌 5. Region 1 — Array Plains
Theme
Order, indexing, grouping.
Inspired by sorted farmland and or ganized crop fields.
Atmosphere
Rows of cr ops, each labeled
Barns filled with b askets and crat es
Villagers frustrat ed by “out-of-orderˮ items
Concepts Taught
Arrays
Sorting
Hashing
Two Sum Pat tern
🧩 Array Plains Puzzles (Core)
Puzzle AP1 – “Fix the Farmlandˮ
Concept:  Sorting  Inde xing
Mechanics:
Tiles 07 scrambled
Push them int o correct order
Rails lock when cor rect
Concept Br idge:
Sorting
Index value relationship
GDD
6
Pseudocode f or simple sor t
Puzzle AP2 – “Find the Lost Toolˮ
Concept:  Direct access O1
Mechanics:
Villager descr ibes lost t ool
Baskets labeled with indices
Player chooses e xact basket
Concept Br idge:
Index vs search
Why O1 is po werful
Puzzle AP3 – “Organize the Harvestˮ
Concept:  Hashing
Mechanics:
Items fall with symbols ( 🌾 , 🍓 , 🥔 )
Group into matching baskets
Some items designed t o collide
Concept Br idge:
Hash buck ets
Collision concept
Simple hash illustration
Puzzle AP4 – “The Pairing Groundsˮ
Concept:  Two Sum p attern
Mechanics:
Step on 2 tiles that add t o target
GDD
7
Timer incr eases tension
Wrong pairs reset
Concept Br idge:
Two Sum e xplanation
Pseudocode + annot ated walk-through
Mini-forge: choose p artner logic
📌 6. Region 1 Boss — The Shuffler
Pattern Inspiration:
Sorting
Hashing
Two Sum
FAANG equiv alent: Group Anagr ams / T wo Sum / 3Sum
Boss Type:  H y b r i d  P u z z l e  B o s s
Phase Breakdown
Phase 1 — Sort the Rows
Rearrange shif ting crop rows under time pr essure.
Phase 2 — Hash the Baskets
Correctly group symbols int o matching “buck ets.ˮ
Phase 3 — Two Sum Arena
Step on pairs of tiles that sum t o the target.
Phase 4 — Fix the Broken Sequence
Three lanes scramble independentl y — fix all at once.
GDD
8
📌 7. Region 2 — Twin Rivers
Theme
Mirrored riverbanks, war m vs cold wat ers, floating bridges.
Concepts Taught
Two Pointers
Pointer Movement
Sliding Windo w
Atmosphere
Gentle flo wing sound
Reflective surfaces
NPCs refer to “moving togetherˮ or “tracking windo wsˮ
🧩 Twin Rivers Puzzles (Core)
Puzzle TR1 – “Mirror Walkˮ
Concept:  Two pointers
Mechanics:
Control two charact ers simul taneously
Must stay symmetr ic
Concept Br idge:
What two pointers are
Why they start opposit e ends
Puzzle TR2 – “Meeting Pointˮ
Concept:  Convergence
Mechanics:
GDD
9
Move inward to reach glowing target
If wrong move made → r eset
Concept Br idge:
Pointer convergence logic
When to move which point er
Puzzle TR3 – “Sliding Window Catchˮ
Concept:  Sliding windo w
Mechanics:
Adjustable glowing frame
Must capture moving fish p attern
Concept Br idge:
Expanding vs shr inking windo w
Maintaining a v alid windo w
Puzzle TR4 – “Breaking the Currentsˮ
Concept:  Pointer logic under shif ting conditions
Mechanics:
Current pushes lef t pointer down, right point er up
Maintain symmetr y
Concept Br idge:
Pointer decisions under constraint s
📌 8. Region 2 Boss — Mirror Serpent
Pattern Inspiration:
Two Pointers
GDD
10
Sliding Windo w
FAANG equiv alents: “Cont ainer With Most W aterˮ, “Longest Substr ing Without  
Repeating Charact ersˮ
Boss Type:  T r a v e r s a l  +  P a t t e r n  B o s s
Phase Breakdown
Phase 1 — Symmetry Trial
Move two charact ers in mir rored paths.
Phase 2 — Convergence Challenge
Reach the e xact meeting point disco vering correct logic.
Phase 3 — Sliding Window Trap
Adjust windo w to capture serpentʼs weak spot.
Phase 4 — Combined Final
Perform all mechanics under timed pr essure.
📌 9. Concept Bridge System (Detailed)
This is the MOST impor tant educ ational mechanic.
Each puzzle ends with:
🟧 1. Story Recap
NPC tells the pla yer what the y did:
“You didnʼt check e very pair.
You looked at one tile, then ask ed what tile complet es it.ˮ
🟦 2. Pattern Reveal
GDD
11
Example:
“This is c alled the T wo Sum p attern.
Itʼs used whene ver you need t o find two values that add t o a target
without checking e very possible p air.ˮ
🟨 3. Pseudocode with Human Explanation
for each number x in the list:
    figure out y = t arget - x
    if y is in memor y:
        return (x, y)
    else:
        store x in memor y
Explained:
“Look at e ach number one at a time. ˮ
“Ask what p artner you need. ˮ
“Check if y ou've seen that p artner before.ˮ
“If yes, you're done.ˮ
🟩 4. Micro-Practice (Logic Forge Lite)
Examples:
Reorder algor ithm steps
Choose point er movement
Match value with p artner
Identify e arliest valid windo w
🟫 5. Codex Update
Unlocks full entr y with:
GDD
12
Concept name
Plain-English e xplanation
Pattern definition
Pseudocode
12 text-only real problem descr iptions
Tips for recognition
📌 10. Logic Forge (EA Version)
Location
A small glo wing building in e ach region.
Early Access Version Includes
“Assemble the algor ithm stepsˮ puzzles
“Choose point er moveˮ interactive snippet s
“Match the p atternˮ quizzes
No real code e xecution y et
Rewards
Codex unlocks
Advancement
Story dialogue
📌 11. Codex (DSA Pokédex)
Stores
Patterns
Explanations
GDD
13
Pseudocode
Real-world analogies
Example pr oblems ( described, not sol ved)
EA Entries
Arrays
Sorting
Hash Maps
Two Sum
Two Pointers
Sliding Windo w
📌 12. Inventory
Very lightweight:
Key Fragment s
Special r egion ar tifacts
Logic Forge passes
No consumables y et.
📌 13. UI/UX
Panels
Dialogue bo x
Inventory
Codex
Quest Log (main quest s only)
GDD
14
Settings
HUD
Clean, minimal
Interaction pr ompts only
UX Principles
Simple
Readable
Friendly
No clutter
Fast dialogue with Sp ace
📌 14. Art Direction
Style
2D pixel art
Bright, clean, Pokémon/Minish Cap-inspir ed
Smooth animations
Subtle glo w around algor ithmic element s
Regions
Prologue → abstract, glo wing
Array Plains → agr icultural, organized
Twin Rivers → mir rored blue/orange p alette
📌 15. Audio Direction
GDD
15
Music
Calm, reflective
Region-themed melodies
SFX
Soft footsteps
Puzzle tr iggers
Item pickups
Glitch effects for boss
📌 16. Technical Design
Engine
Godot 4 .2 2D
Core Singletons
G a m e S t a t e — save progress
C o d e x M a n a g e r — pattern entries
L o g i c F o r g e M a n a g e r  Forge challenges
A n a l y t i c s — local event logging
Scenes
Regions (maps)
Puzzle r ooms
Logic Forge
Boss arenas
Concept Br idge scr eens
Save Data
GDD
16
Complet ed puzzles
Codex unlocks
Key fragment s
Region pr ogress
📌 17. Early Access Roadmap
Phase 1 — Prologue
Build map
2 puzzles
Boss
Base UI
Concept Br idge frame work
Phase 2 — Array Plains
Map  NPCs
35 puzzles
Boss
Logic Forge AP
Codex AP
Concept Br idges
Phase 3 — Twin Rivers
Map + mechanics
35 puzzles
Boss
Logic Forge TR
GDD
17
Codex TR
Concept Br idges
Phase 4 — Polish & Launch
Save/load
Music
SFX
QA
Trailer
Steam setup
Release
GDD
18
