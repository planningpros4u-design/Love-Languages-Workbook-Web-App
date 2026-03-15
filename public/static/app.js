/* ================================================================
   THE LOVE LANGUAGES WORKBOOK - app.js
   Complete Rewrite: One-Session Print-to-PDF Experience
   ================================================================ */

/* ── QUIZ DATA ────────────────────────────────────────────────── */
const QUIZ_QUESTIONS = [
  { a: "I feel loved when my partner tells me specifically what they appreciate about me.", b: "I feel loved when my partner sits with me and gives me their complete attention." },
  { a: "A small, thoughtful surprise means more to me than an expensive grand gesture.", b: "When my partner does something helpful without being asked, I feel deeply cared for." },
  { a: "Physical closeness, like my partner reaching for my hand, makes me feel connected.", b: "I feel most loved when my partner looks me in the eye and really listens to me." },
  { a: "Words of encouragement from my partner genuinely lift me up.", b: "I feel loved when my partner takes care of something stressful so I don't have to." },
  { a: "A hug at the right moment means everything to me.", b: "Receiving a small gift that shows my partner was thinking about me makes me feel special." },
  { a: "I feel cherished when my partner chooses to spend free time with me.", b: "My partner saying \"I love you\" out loud still matters every single time." },
  { a: "When my partner handles a task I've been dreading, I feel genuinely loved.", b: "Being touched affectionately, even casually, helps me feel close and secure." },
  { a: "A heartfelt compliment from my partner stays with me all day.", b: "A little gift that says \"I thought of you\" moves me more than words can." },
  { a: "I feel loved when we do something together, even something small like cooking dinner.", b: "When my partner touches my face, holds my hand, or puts their arm around me, I feel safe." },
  { a: "My partner picking up something I mentioned wanting once, without me asking again, means a lot.", b: "My partner writing me a note or a message that says something real makes me emotional." },
  { a: "I feel most loved when my partner follows through on something they said they'd do.", b: "Undivided, phone-free time together feels like a real gift to me." },
  { a: "A long hug when I come home matters more to me than almost anything.", b: "When my partner quietly handles something hard for me, I feel genuinely taken care of." },
  { a: "Hearing my partner say they're proud of me or believe in me fills something in me.", b: "A meaningful gift, even something small and inexpensive, tells me I was on their mind." },
  { a: "My partner choosing to spend time with me over other options makes me feel chosen.", b: "Physical touch, even casual, everyday contact, keeps me feeling connected." },
  { a: "When my partner does something kind and practical for me, it speaks louder than words.", b: "My partner telling me what they love about me specifically is deeply meaningful." },
  { a: "A small, thoughtful gift I didn't ask for moves me emotionally.", b: "Quality time together, really together and not just in the same room, is what I need most." },
  { a: "Physical affection, cuddling, holding hands, sitting close, is how I feel most at home.", b: "Hearing sincere, specific words of love or appreciation from my partner means the world." },
  { a: "My partner helping with something difficult, without making it a big deal, shows real love.", b: "A small token or memento, something that shows they remembered, touches me deeply." },
  { a: "I feel deeply loved when my partner makes time for me, just us with no distractions.", b: "Physical closeness and affectionate touch are how I know I'm loved." },
  { a: "My partner expressing gratitude or admiration out loud and sincerely fills my love tank.", b: "My partner doing something thoughtful and practical for me without being asked is how I feel truly loved." }
];

const SCORING_KEY = {
  words:   [{q:1,c:'A'},{q:6,c:'B'},{q:8,c:'A'},{q:10,c:'B'},{q:13,c:'A'},{q:15,c:'B'},{q:17,c:'B'},{q:20,c:'A'}],
  time:    [{q:1,c:'B'},{q:6,c:'A'},{q:9,c:'A'},{q:11,c:'B'},{q:14,c:'A'},{q:16,c:'B'},{q:19,c:'A'}],
  touch:   [{q:3,c:'A'},{q:5,c:'A'},{q:7,c:'B'},{q:9,c:'B'},{q:12,c:'A'},{q:14,c:'B'},{q:17,c:'A'},{q:19,c:'B'}],
  service: [{q:2,c:'B'},{q:4,c:'B'},{q:7,c:'A'},{q:11,c:'A'},{q:15,c:'A'},{q:18,c:'A'},{q:20,c:'B'}],
  gifts:   [{q:2,c:'A'},{q:5,c:'B'},{q:8,c:'B'},{q:10,c:'A'},{q:13,c:'B'},{q:16,c:'A'},{q:18,c:'B'}]
};

const LL = {
  words:   { label: "Words of Affirmation", icon: "💬", color: "#A0607A", max: 8 },
  time:    { label: "Quality Time",         icon: "⏱",  color: "#7A9E84", max: 7 },
  touch:   { label: "Physical Touch",       icon: "🤝", color: "#8B6BA8", max: 8 },
  service: { label: "Acts of Service",      icon: "🛠",  color: "#C89A4A", max: 7 },
  gifts:   { label: "Receiving Gifts",      icon: "🎁", color: "#5B8FB8", max: 7 }
};

const LL_SHORT_DESC = {
  words:   "You feel most loved when your partner speaks your worth out loud, with specific, sincere words that name what they see in you and why you matter to them.",
  time:    "You feel most loved when your partner chooses you, clears the noise, and shows up fully present with nowhere else to be and nothing more important than you.",
  touch:   "You feel most loved through physical closeness, not just in intimate moments but in the steady, small everyday touches that say: all is well between us.",
  service: "You feel most loved when your partner notices what you need and quietly handles it, the kind of love shown through action rather than announced in words.",
  gifts:   "You feel most loved when your partner gives you a token that proves you crossed their mind. The cost is irrelevant. The thought is the entire point."
};

const LL_GIVES = {
  words:   "You likely express love through encouragement, specific compliments, and heartfelt notes. When you care about someone, you tell them exactly why.",
  time:    "You likely express love by being fully present. You show up, you listen all the way through, and you make the people you love feel like the most important person in the room.",
  touch:   "You likely express love physically and naturally, reaching for people, staying close, and showing warmth through consistent, casual affection.",
  service: "You likely express love by doing things. You handle problems before they're asked, follow through without reminders, and show care through consistent, practical action.",
  gifts:   "You likely express love through thoughtfulness made tangible. You remember details, mark occasions, and bring home small things that say: I was thinking about you."
};

const LL_OVERLOOKED = {
  words:   "Long silences feel loud. Criticism delivered carelessly stays longer than it should. Going without affirmation, even when everything is technically fine, can feel like something is wrong.",
  time:    "Cancelled plans land hard. Being half-present during what was supposed to be your time feels like rejection. Competing with a phone or other people's needs is exhausting.",
  touch:   "Physical withdrawal during conflict is painful in a way that is difficult to explain. Long stretches without casual affection can quietly feel like emotional distance.",
  service: "Broken promises and unfinished tasks are not small things to you. When words are warm but actions are absent, you feel the gap between what is said and what is done.",
  gifts:   "Forgotten occasions sting. An obligatory or clearly thoughtless gift can feel worse than no gift at all. Being unmemorable to your partner is a specific kind of hurt."
};

const LL_THRIVES = {
  words:   "You thrive when your partner makes a habit of naming what they love about you, out loud, specifically, and often.",
  time:    "You thrive when you have recurring rituals with your partner, small pockets of protected time that belong just to the two of you.",
  touch:   "You thrive when physical affection is woven through ordinary life, not just reserved for special moments or intimate ones.",
  service: "You thrive when your partner follows through and the weight of life feels genuinely shared between you.",
  gifts:   "You thrive when your partner occasionally brings home proof that you exist in their mind even when you're not in the room."
};

/* ── 15 COMPATIBILITY INSIGHTS ──────────────────────────────── */
// Key format: 'primaryA-primaryB' (always sorted alphabetically for lookup)
// Each has: shared (strength), difference, growth
const COMPAT = {
  // Same language pairings
  'words-words': {
    shared: "You both speak Words of Affirmation, which means you already know how to give each other what you need most. Affirmation flows naturally in this relationship, and both of you likely feel seen, appreciated, and heard.",
    difference: "The risk for same-language couples is assuming that because you understand each other's need, you can afford to stop being intentional about meeting it. Familiarity can quietly become silence.",
    growth: "The opportunity here is depth. You both know what generic praise feels like and what it doesn't. Practice being specific, not just frequent. The compliment that names one exact thing you noticed will always mean more than ten general ones."
  },
  'time-time': {
    shared: "You both prioritize Quality Time, which means presence is not something you have to explain or justify to each other. When life gets busy and you carve out time just for the two of you, you both feel it.",
    difference: "The tension to watch for is competing expectations about what quality time looks like. For one of you it might mean deep conversation. For the other it might mean comfortable silence doing something together. Both are valid.",
    growth: "Discuss what your ideal version of connected time looks like and take turns. Sometimes the greatest gift is choosing their version of time together, not just your own."
  },
  'touch-touch': {
    shared: "You both speak Physical Touch, which means physical closeness is a shared love and a shared comfort. You likely already have a natural warmth and physical ease in your relationship that other couples work to build.",
    difference: "Even when two people share this language, the type and frequency of touch they need can differ. One partner may need more casual everyday contact; the other more intentional, held moments.",
    growth: "Talk about which specific expressions of touch feel most meaningful to each of you. The more specific you are, the more accurately you can meet each other."
  },
  'service-service': {
    shared: "You both speak Acts of Service, which means you likely show up for each other through practical action, often without saying much about it. The quiet work you each do is not invisible to the other.",
    difference: "The risk is that both of you expect the other to notice and act, without asking. If you are both quietly keeping score of what is being done and not done, resentment can build without either of you fully realizing it.",
    growth: "Make the invisible visible. Tell each other specifically what you notice and appreciate. And once in a while, ask directly: what is one thing on your plate right now that I could just handle?"
  },
  'gifts-gifts': {
    shared: "You both speak Receiving Gifts, which means thoughtfulness made tangible is something you both deeply value and understand. Neither of you has to explain why a small, unexpected token matters so much.",
    difference: "Because you both expect thoughtfulness, the stakes can feel higher when an occasion is forgotten or a gesture lands flat. The shared expectation creates both deep connection and occasional hurt.",
    growth: "Build small rituals of gift-giving into ordinary life rather than reserving it for big occasions. The more casual and consistent the tokens, the more loved you will both feel day to day."
  },
  // Mixed pairings (sorted alphabetically: gifts, service, time, touch, words)
  'gifts-words': {
    shared: "One of you needs to hear the love and one needs to see a symbol of it, but both of you are ultimately asking the same question: do I cross your mind? The good news is these languages translate beautifully into each other.",
    difference: "The Words partner may not think to bring home a gift unprompted, and the Gifts partner may not think to articulate their love in words. Both can feel slightly unmet without understanding why.",
    growth: "A handwritten note tucked into a small, specific gift speaks fluently in both directions at once. Practice that combination and you will reach each other every time."
  },
  'service-words': {
    shared: "One of you needs to hear the love and one needs to feel it through action. These languages complement each other beautifully: they are both fundamentally about paying attention.",
    difference: "The Words partner may express love through affirmation but feel hurt when their partner does not reciprocate verbally. The Service partner may be quietly doing everything and feel unseen because it was not named out loud.",
    growth: "Say what you are doing and why. 'I handled that for you because I love you' speaks both languages in one sentence. And if you are the Words partner, notice the actions your partner is already taking. Name them specifically."
  },
  'time-words': {
    shared: "One of you needs to hear it and one needs to experience it together. Both of these languages are about being fully chosen, and that shared core makes you more aligned than you might realize.",
    difference: "The Words partner may not feel the quality time as deeply, and the Time partner may not feel the verbal affirmation as a substitute for actual presence. Both can end up feeling slightly unmet.",
    growth: "Conversations with full presence cover both. Put the phone down, make eye contact, and say the thing out loud. That one act gives the Time partner focused presence and the Words partner specific, sincere affirmation simultaneously."
  },
  'touch-words': {
    shared: "One of you lives for the right word and one lives for the right touch. Both of you are looking for reassurance that you are loved and chosen, just through different senses.",
    difference: "The Words partner may feel unmoved by physical affection alone, and the Touch partner may feel that words without physical closeness ring slightly hollow. Neither is wrong.",
    growth: "Pair them deliberately. Hold their hand while you tell them something true and specific about what you love about them. That combination reaches both languages at once and requires almost no extra effort."
  },
  'gifts-service': {
    shared: "You both speak languages of thoughtful action. One values practical help; the other values tangible symbols of thought. Both are fundamentally asking: did you think about me and act on it?",
    difference: "The Service partner may find gift-giving awkward or unnecessary, and the Gifts partner may not feel that doing tasks equals being thought of specifically. The gap is subtle but real.",
    growth: "When you handle something for your Gifts partner, bring home a small token alongside it sometimes. And Gifts partner: try to notice and name the acts of service your partner is already doing as gifts, because to them, that is exactly what they are."
  },
  'gifts-time': {
    shared: "One treasures presence and one treasures proof of thought. These are actually deeply related: both are about being remembered and prioritized, just expressed differently.",
    difference: "The Time partner may feel that a gift, however thoughtful, is not a substitute for actual togetherness. The Gifts partner may not register undivided time as the specific kind of love they are looking for.",
    growth: "A small token brought back from a shared experience covers both languages beautifully. And when you give a gift, give it during intentional, unhurried time together so the presence and the thoughtfulness land together."
  },
  'gifts-touch': {
    shared: "One feels love in the body and one feels it in the gesture. Both of these languages are about being thought of and reached for, and that makes them more complementary than they might first appear.",
    difference: "Physical affection may not register as 'being remembered' for the Gifts partner, and a thoughtful gift may not create the sense of physical closeness the Touch partner needs.",
    growth: "A physical gift given with real warmth, a proper hug alongside it, something you picked up specifically for them, covers both languages in one moment. The gesture and the closeness together are more than either alone."
  },
  'service-time': {
    shared: "One feels loved when you show up and one feels loved when you step in. You may have been loving each other perfectly and simply doing it in different rooms.",
    difference: "The Time partner may feel unseen even when the Service partner is quietly handling everything, because what they most need is presence, not productivity. The Service partner may feel unappreciated if their practical acts go unnoticed.",
    growth: "Try being together while you handle something for your partner. Do the task side by side, or tell them what you did and sit with them afterward. Presence plus action covers both languages simultaneously."
  },
  'service-touch': {
    shared: "One needs physical closeness and one needs practical help. Both of these languages require intentional learning for people who do not speak them naturally, but the reward is a partner who feels deeply seen in a specific, personal way.",
    difference: "These two languages can feel quite far apart. Physical affection does not communicate practical love to the Service partner, and practical help does not communicate physical warmth to the Touch partner.",
    growth: "Carve out separate intentional acts for each. Be close during ordinary moments, and handle things without being asked. Neither is difficult on its own. The key is making both habitual rather than occasional."
  },
  'time-touch': {
    shared: "You both speak languages of presence. One needs emotional presence and one needs physical presence, and both of you are ultimately asking for the same thing: be here with me, fully.",
    difference: "The gap is smaller than it looks. The Time partner may want focused conversation and shared experience. The Touch partner may be content simply being close with no agenda. The tension is often about what 'together' looks like.",
    growth: "Shared time that includes physical closeness, a slow walk, cooking a meal side by side, an evening on the couch staying close, covers both languages beautifully. You are not as different as your scores suggest."
  }
};

function getCompatKey(kA, kB) {
  return [kA, kB].sort().join('-');
}

/* ── ACTION POOL ─────────────────────────────────────────────── */
const ACTION_POOL = {
  words: [
    "Send a voice note that says something specific you love about them, not a text but a voice note",
    "Leave a handwritten note somewhere they'll find it after you've gone",
    "Say \"I'm proud of you\" out loud, unprompted, and mean it",
    "Text them on a random Tuesday just to say you were thinking of them",
    "Tell them one thing they do that you would genuinely miss if they stopped",
    "Thank them for something specific they did this week and name it clearly",
    "Say out loud what you find beautiful about them, not just physically",
    "Share a memory of a moment with them that made you think: I'm so glad I have this person",
    "Read something they wrote, made, or shared and tell them what it meant to you",
    "Before you fall asleep tonight, say one true thing you love about who they are"
  ],
  time: [
    "Have a phone-free dinner with phones in another room and just the two of you",
    "Take a 20-minute walk together with nowhere to go and no agenda",
    "Ask one question and actually listen: what's something you haven't told anyone lately?",
    "Cook a meal together with music on and no rushing",
    "Establish a tiny ritual that's just yours: morning coffee, evening walk, Sunday breakfast",
    "Watch something they've been wanting to watch, without your phone in your hand",
    "Drive somewhere with no destination, just drive and talk",
    "Sit outside after dark, say nothing, and just be there",
    "Revisit somewhere meaningful to your relationship: a first date spot, a favorite place",
    "Plan a no-phone hour and sit together, make something, play something, or just be present"
  ],
  touch: [
    "Give a real hug, not a pat, but a proper hug that you hold for a moment",
    "Reach for their hand during a movie or while you're sitting together",
    "Put a hand on their back when you walk past them in the kitchen",
    "Greet them when they come home and actually stop what you're doing",
    "Sit close enough to be touching when you're resting or watching something",
    "Give an unprompted shoulder rub, not as a lead-up to anything, just because",
    "Touch their face gently, just once, and mean it",
    "Hold hands when you walk somewhere, even just from the car to the door",
    "Stay physically close during a hard conversation instead of pulling away",
    "Fall asleep touching, because even just feet touching under the covers counts"
  ],
  service: [
    "Handle one task they've been putting off and do it quietly without announcement",
    "Fill their gas tank before they realize it needs it",
    "Make their coffee or breakfast exactly how they like it before they ask",
    "Take the task they dread most this week and just do it",
    "Book the thing, make the call, handle the appointment they've been meaning to schedule",
    "Clean or organize one space in your home they find stressful",
    "Handle bedtime, dinner, or another recurring task solo and tell them to rest",
    "Send them a text: is there anything I can take off your plate today?",
    "Grocery shop for what they need specifically, not just what you want",
    "Follow through on something you said you'd do, all the way, without being reminded"
  ],
  gifts: [
    "Pick up their favorite snack or drink when you're out and don't wait for a reason",
    "Bring home flowers on a completely ordinary day",
    "Save a ticket stub, a receipt, or a small memento from something you did together",
    "Order something small you heard them mention once, as proof that you listen",
    "Leave a little package somewhere they'll find it with no occasion needed",
    "Send them a book, article, or song that made you think of them",
    "Get them something themed around an inside joke or shared memory",
    "Put together a playlist of songs that remind you of them and send it with a note",
    "The next time you travel anywhere, even briefly, bring something back",
    "Print and frame a photo from a moment that mattered to both of you"
  ]
};

const DATE_IDEAS = [
  { ll: "Words",   i1: "A love letter dinner: you each write a real letter and read them aloud over a meal", i2: "A memory jar date: write your 5 favorite memories on slips and pull them together" },
  { ll: "Time",    i1: "A full tech-free evening: cook together, eat together, play a game, talk", i2: "A yes night: one partner plans the entire evening around what the other person loves most" },
  { ll: "Touch",   i1: "A slow evening at home with a long bath, a real massage, music, and no agenda", i2: "A stargazing night: lay outside, stay close, and talk about nothing and everything" },
  { ll: "Service", i1: "Each partner secretly handles three things the other has been putting off, then reveal at dinner", i2: "A take care of you date: one partner plans everything, the other just receives" },
  { ll: "Gifts",   i1: "A scavenger hunt where each clue comes with a small meaningful gift", i2: "A box of us date: each bring 5 things that represent something about your relationship" }
];

/* ── PERSONALIZED 30-DAY PLAN ───────────────────────────────── */
function buildPersonalizedPlan(targetScores) {
  const keys = ['words','time','touch','service','gifts'];
  if (!targetScores || !Object.keys(targetScores).length) {
    return Array.from({length:30}, (_,i) => ({
      day: i+1, ll: keys[i % keys.length],
      action: ACTION_POOL[keys[i % keys.length]][i % 10]
    }));
  }
  const total = Object.values(targetScores).reduce((a,b)=>a+b,0) || 1;
  const sorted = [...keys].sort((a,b) => targetScores[b]-targetScores[a]);
  const alloc = {}; let assigned = 0;
  sorted.forEach((k, i) => {
    if (i === sorted.length - 1) { alloc[k] = 30 - assigned; }
    else { alloc[k] = Math.max(1, Math.round((targetScores[k]/total)*30)); assigned += alloc[k]; }
  });
  // Build interleaved plan
  const buckets = {};
  sorted.forEach(k => {
    buckets[k] = [];
    for (let i = 0; i < alloc[k]; i++) buckets[k].push({ ll: k, action: ACTION_POOL[k][i % 10] });
  });
  const interleaved = [];
  const maxB = Math.max(...Object.values(buckets).map(b=>b.length));
  for (let i = 0; i < maxB; i++) {
    for (const k of sorted) { if (buckets[k][i]) interleaved.push(buckets[k][i]); }
  }
  return interleaved.slice(0,30).map((d,i) => ({ day: i+1, ll: d.ll, action: d.action }));
}

/* ── STATE ───────────────────────────────────────────────────── */
const SK = 'llw_v3';
let S;

function defaultState() {
  return {
    nameA: '', nameB: '',
    screen: 'welcome',      // welcome | quizA | transA | quizB | transB | results | personal | download
    quizA: { answers: {}, done: false, scores: {} },
    quizB: { answers: {}, done: false, scores: {} },
    qcA: 1, qcB: 1,        // current question number per quiz
    personal: {
      wordA: '', wordB: '',
      moreA: '', moreB: '',
      memory: '',
      skippedWordA: false, skippedWordB: false,
      skippedMoreA: false, skippedMoreB: false,
      skippedMemory: false
    }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(SK);
    if (raw) return deepMerge(defaultState(), JSON.parse(raw));
  } catch(e) {}
  return defaultState();
}

function deepMerge(target, source) {
  const out = { ...target };
  for (const k of Object.keys(source)) {
    if (source[k] !== null && typeof source[k] === 'object' && !Array.isArray(source[k]))
      out[k] = deepMerge(target[k] || {}, source[k]);
    else out[k] = source[k];
  }
  return out;
}

let saveTimer;
function persist() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try { localStorage.setItem(SK, JSON.stringify(S)); } catch(e) {}
    flashSaved();
  }, 180);
}

let flashTimer;
function flashSaved() {
  const el = document.getElementById('auto-save');
  if (!el) return;
  el.classList.add('show');
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ── HELPERS ─────────────────────────────────────────────────── */
const nA = () => S.nameA || 'Partner A';
const nB = () => S.nameB || 'Partner B';
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function computeScores(answers) {
  const sc = { words:0, time:0, touch:0, service:0, gifts:0 };
  for (const [lang, keys] of Object.entries(SCORING_KEY))
    keys.forEach(({q,c}) => { if (answers[q]?.toUpperCase() === c) sc[lang]++; });
  return sc;
}

function getRanked(scores) {
  return Object.entries(scores)
    .sort((a,b) => b[1]-a[1])
    .map(([k,v]) => ({ key:k, score:v, ...LL[k] }));
}

/* ── STEP INDICATOR ──────────────────────────────────────────── */
const STEP_LABELS = ['Names','Quiz A','Quiz B','Results','Personal','Workbook'];
const SCREEN_STEP = {
  welcome: 0, quizA: 1, transA: 1, quizB: 2, transB: 2,
  results: 3, personal: 4, download: 5
};

function renderStepIndicator() {
  const cur = SCREEN_STEP[S.screen] ?? 0;
  const dots = STEP_LABELS.map((label, i) => {
    const cls = i < cur ? 'done' : i === cur ? 'active' : '';
    const line = i < STEP_LABELS.length - 1
      ? `<div class="step-line${i < cur ? ' done' : ''}"></div>` : '';
    return `<div class="step-dot ${cls}" title="${label}"><span class="step-num">${i+1}</span></div>${line}`;
  }).join('');
  return `
<div class="step-indicator" id="step-indicator">
  <div class="step-logo">Love Languages<small>The Clarity Desk</small></div>
  <div>
    <div class="step-track">${dots}</div>
  </div>
  <button class="step-print-btn" onclick="triggerPrint()" title="Print / Save PDF">🖨 Print</button>
</div>`;
}

/* ── SCREEN 1: WELCOME ───────────────────────────────────────── */
function renderWelcome() {
  const hasNames = S.nameA && S.nameB;
  return `
<div class="screen welcome-screen active" id="screen-welcome">
  <div class="welcome-center" style="padding-top:5.5rem;">
    <div class="welcome-badge">The Clarity Desk</div>
    <h1 class="welcome-title">The Love Languages<em>Workbook</em></h1>
    <p class="welcome-tagline">A 30-minute guided session for two. Answer honestly, discover together, and walk away with a personalized printable couples workbook.</p>
    <div class="welcome-card">
      <h2 class="welcome-card-title">Make it personal</h2>
      <p class="welcome-card-sub">Enter both names so this workbook speaks directly to you.</p>
      <div class="name-row">
        <div class="name-field">
          <label for="inp-a">Partner A's name</label>
          <input id="inp-a" type="text" placeholder="e.g. Jamie" value="${esc(S.nameA)}" autocomplete="off" />
        </div>
        <div class="name-field">
          <label for="inp-b">Partner B's name</label>
          <input id="inp-b" type="text" placeholder="e.g. Alex" value="${esc(S.nameB)}" autocomplete="off" />
        </div>
      </div>
      <button class="btn btn-plum btn-full btn-lg" onclick="handleBegin()">Begin Our Session &#10022;</button>
      ${hasNames ? `<p style="text-align:center;font-size:0.83rem;color:var(--plum-mid);margin-top:1rem;">Welcome back, ${esc(nA())} &amp; ${esc(nB())}. Your progress is saved.</p>` : ''}
    </div>
    <div class="start-over-row mt-3">
      <p>Want to start fresh?</p>
      <button class="btn btn-ghost-plum btn-sm" onclick="startOver()">Start Over</button>
    </div>
  </div>
</div>`;
}

function handleBegin() {
  const a = document.getElementById('inp-a')?.value?.trim();
  const b = document.getElementById('inp-b')?.value?.trim();
  if (!a || !b) { alert('Please enter both names to begin.'); return; }
  S.nameA = a; S.nameB = b;
  persist();
  goTo('quizA');
}

function startOver() {
  if (!confirm('Start over? This will erase all quiz answers and saved progress.')) return;
  localStorage.removeItem(SK);
  S = defaultState();
  renderApp();
}

/* ── QUIZ SCREENS ────────────────────────────────────────────── */
function renderQuizScreen(p) {
  const quiz  = p === 'A' ? S.quizA : S.quizB;
  const pName = p === 'A' ? nA() : nB();
  const other = p === 'A' ? nB() : nA();
  const curQ  = p === 'A' ? S.qcA : S.qcB;
  const scid  = `screen-quiz${p}`;
  const isActive = S.screen === `quiz${p}`;
  const answered = Object.keys(quiz.answers).length;
  const pct = Math.round(answered / 20 * 100);
  const q = QUIZ_QUESTIONS[curQ - 1];

  return `
<div class="screen${isActive?' active':''}" id="${scid}">
  <div class="screen-inner">
    <div class="quiz-header">
      <div class="quiz-partner-badge ${p==='A'?'badge-a':'badge-b'}">${p==='A'?'🌸':'🌿'} ${esc(pName)}</div>
      <h1 class="quiz-title">${esc(pName)}, this quiz is just for you.</h1>
      <p class="quiz-subtitle">${esc(other)}, please look away or hand the device over now.</p>
    </div>
    <div class="quiz-progress-wrap">
      <div class="quiz-progress-top">
        <span class="quiz-progress-label">Question ${curQ} of 20</span>
        <span class="quiz-progress-count">${answered} answered</span>
      </div>
      <div class="quiz-pbar"><div class="quiz-pbar-fill" style="width:${pct}%"></div></div>
    </div>
    <div class="quiz-q-wrap">
      <div class="quiz-q-num">Q${curQ} of 20 &bull; ${esc(pName)}'s Quiz</div>
      <div class="quiz-options">
        <div class="quiz-opt${quiz.answers[curQ]==='A'?' selected':''}" onclick="selectAns('${p}','A')">
          <div class="quiz-opt-letter">A</div>
          <div class="quiz-opt-text">${esc(q.a)}</div>
        </div>
        <div class="quiz-opt${quiz.answers[curQ]==='B'?' selected':''}" onclick="selectAns('${p}','B')">
          <div class="quiz-opt-letter">B</div>
          <div class="quiz-opt-text">${esc(q.b)}</div>
        </div>
      </div>
    </div>
    <div class="quiz-nav">
      <button class="btn btn-ghost btn-sm" onclick="quizPrev('${p}')" ${curQ===1?'disabled':''}>&larr; Back</button>
      <span class="quiz-nav-center">${answered} / 20 answered</span>
      ${curQ < 20
        ? `<button class="btn btn-mauve btn-sm" onclick="quizNext('${p}')">Next &rarr;</button>`
        : `<button class="btn btn-plum btn-sm" onclick="quizSubmit('${p}')" ${answered<20?'disabled':''}>See My Results &rarr;</button>`
      }
    </div>
  </div>
</div>`;
}

/* ── TRANSITION SCREEN WRAPPERS ──────────────────────────────── */
function renderTransitionScreen(p) {
  const isActive = S.screen === `trans${p}`;
  return `
<div class="screen${isActive?' active':''}" id="screen-trans${p}">
  <div class="screen-inner" style="padding-top:2rem;">
    ${renderTransition(p)}
  </div>
</div>`;
}

function selectAns(p, choice) {
  const quiz = p === 'A' ? S.quizA : S.quizB;
  const curQ = p === 'A' ? S.qcA : S.qcB;
  quiz.answers[curQ] = choice;
  persist();
  // Re-render just this quiz screen
  const el = document.getElementById(`screen-quiz${p}`);
  if (el) el.outerHTML = renderQuizScreen(p);
  // Auto-advance
  if (curQ < 20) {
    setTimeout(() => {
      if (p === 'A') S.qcA = curQ + 1; else S.qcB = curQ + 1;
      const el2 = document.getElementById(`screen-quiz${p}`);
      if (el2) el2.outerHTML = renderQuizScreen(p);
    }, 320);
  }
}

function quizNext(p) {
  const curQ = p === 'A' ? S.qcA : S.qcB;
  if (curQ < 20) {
    if (p === 'A') S.qcA++; else S.qcB++;
    persist();
    const el = document.getElementById(`screen-quiz${p}`);
    if (el) el.outerHTML = renderQuizScreen(p);
  }
}

function quizPrev(p) {
  const curQ = p === 'A' ? S.qcA : S.qcB;
  if (curQ > 1) {
    if (p === 'A') S.qcA--; else S.qcB--;
    persist();
    const el = document.getElementById(`screen-quiz${p}`);
    if (el) el.outerHTML = renderQuizScreen(p);
  }
}

function quizSubmit(p) {
  const quiz = p === 'A' ? S.quizA : S.quizB;
  if (Object.keys(quiz.answers).length < 20) { alert('Please answer all 20 questions first.'); return; }
  quiz.scores = computeScores(quiz.answers);
  quiz.done = true;
  persist();
  goTo(p === 'A' ? 'transA' : 'transB');
}

/* ── TRANSITION SCREENS ──────────────────────────────────────── */
function renderTransition(p) {
  const quiz  = p === 'A' ? S.quizA : S.quizB;
  const pName = p === 'A' ? nA() : nB();
  const other = p === 'A' ? nB() : nA();
  if (!quiz.done) return '';
  const ranked = getRanked(quiz.scores);
  const primary = ranked[0];
  const secondary = ranked[1];
  const isA = p === 'A';

  if (isA) {
    return `
    <div class="transition-screen">
      <div class="transition-icon">✨</div>
      <h1 class="transition-title">${esc(pName)}'s primary language is ${primary.icon} ${primary.label}.</h1>
      <p class="transition-sub">${esc(LL_SHORT_DESC[primary.key])}</p>
      <div class="result-reveal-grid">
        <div class="result-lang-card">
          <div class="result-lang-label">Primary Language</div>
          <div class="result-lang-name">${primary.icon} ${primary.label}</div>
          <p class="result-lang-desc">${esc(LL_SHORT_DESC[primary.key])}</p>
        </div>
        <div class="result-lang-card secondary">
          <div class="result-lang-label sec-label">Secondary Language</div>
          <div class="result-lang-name" style="font-size:1.15rem;">${secondary.icon} ${secondary.label}</div>
          <p class="result-lang-desc" style="font-size:0.83rem;">${esc(LL_SHORT_DESC[secondary.key])}</p>
        </div>
      </div>
      <div class="handoff-box">
        <p>Great. Now hand the device to ${esc(other)}.</p>
      </div>
      <button class="btn btn-sage btn-lg" onclick="goTo('quizB')">
        ${esc(other)}'s Quiz &rarr;
      </button>
    </div>`;
  } else {
    return `
    <div class="transition-screen">
      <div class="transition-icon">🎉</div>
      <h1 class="transition-title">${esc(pName)}'s primary language is ${primary.icon} ${primary.label}.</h1>
      <p class="transition-sub">${esc(LL_SHORT_DESC[primary.key])}</p>
      <div class="result-reveal-grid">
        <div class="result-lang-card" style="border-color:var(--sage);">
          <div class="result-lang-label" style="color:var(--sage);">Primary Language</div>
          <div class="result-lang-name">${primary.icon} ${primary.label}</div>
          <p class="result-lang-desc">${esc(LL_SHORT_DESC[primary.key])}</p>
        </div>
        <div class="result-lang-card secondary">
          <div class="result-lang-label sec-label">Secondary Language</div>
          <div class="result-lang-name" style="font-size:1.15rem;">${secondary.icon} ${secondary.label}</div>
          <p class="result-lang-desc" style="font-size:0.83rem;">${esc(LL_SHORT_DESC[secondary.key])}</p>
        </div>
      </div>
      <div class="handoff-box" style="border-color:var(--sage);">
        <p>Both quizzes are complete. Ready to see your results together?</p>
      </div>
      <button class="btn btn-plum btn-lg" onclick="goTo('results')">
        See Our Results &rarr;
      </button>
    </div>`;
  }
}

/* ── RESULTS CHART ───────────────────────────────────────────── */
let resultsChart = null;
function drawResultsChart() {
  const canvas = document.getElementById('results-chart');
  if (!canvas || !S.quizA.done || !S.quizB.done) return;
  if (resultsChart) { resultsChart.destroy(); resultsChart = null; }
  const labels = Object.values(LL).map(l => l.label);
  const dA = Object.keys(LL).map(k => S.quizA.scores[k] || 0);
  const dB = Object.keys(LL).map(k => S.quizB.scores[k] || 0);
  resultsChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: nA(), data: dA, backgroundColor: 'rgba(160,96,122,0.72)', borderColor: '#A0607A', borderWidth: 2, borderRadius: 5 },
        { label: nB(), data: dB, backgroundColor: 'rgba(122,158,132,0.72)', borderColor: '#7A9E84', borderWidth: 2, borderRadius: 5 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 }, color: '#6B3560', padding: 18 } } },
      scales: {
        y: { beginAtZero: true, max: 8, ticks: { stepSize: 1, color: '#6B3560' }, grid: { color: '#F3E6DA' } },
        x: { grid: { display: false }, ticks: { color: '#6B3560', font: { size: 10 } } }
      }
    }
  });
}

/* ── SCREEN 4: RESULTS ───────────────────────────────────────── */
function renderResults() {
  const isActive = S.screen === 'results';
  if (!S.quizA.done || !S.quizB.done) return `<div class="screen${isActive?' active':''}" id="screen-results"></div>`;

  const rA = getRanked(S.quizA.scores);
  const rB = getRanked(S.quizB.scores);
  const ck = getCompatKey(rA[0].key, rB[0].key);
  const compat = COMPAT[ck] || { shared:'', difference:'', growth:'' };

  return `
<div class="screen${isActive?' active':''}" id="screen-results">
  <div class="screen-inner-wide">
    <div style="text-align:center;margin-bottom:2.5rem;">
      <span class="quiz-partner-badge badge-a" style="font-size:1.5rem;padding:0.2rem 0.6rem;">💞</span>
      <h1 style="font-family:var(--font-serif);font-size:clamp(2rem,5vw,3rem);color:var(--plum);margin-top:0.5rem;">Your Results</h1>
      <p style="color:var(--plum-mid);font-size:0.95rem;max-width:440px;margin:0.5rem auto 0;">Here is how you each give and receive love, side by side.</p>
    </div>

    <div class="results-hero-grid">
      ${renderPartnerResultCard('A', rA)}
      ${renderPartnerResultCard('B', rB)}
    </div>

    <div class="chart-section mb-3">
      <h3>Score Comparison</h3>
      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot" style="background:#A0607A;"></div>${esc(nA())}</div>
        <div class="legend-item"><div class="legend-dot" style="background:#7A9E84;"></div>${esc(nB())}</div>
      </div>
      <div style="height:240px;position:relative;"><canvas id="results-chart"></canvas></div>
    </div>

    <div class="insights-section">
      <h2>Your Compatibility Map</h2>
      <div class="insight-card strength">
        <span class="insight-tag s-tag">Shared Strength</span>
        <p class="insight-text">${esc(compat.shared)}</p>
      </div>
      <div class="insight-card difference">
        <span class="insight-tag d-tag">Biggest Difference</span>
        <p class="insight-text">${esc(compat.difference)}</p>
      </div>
      <div class="insight-card growth">
        <span class="insight-tag g-tag">Growth Opportunity</span>
        <p class="insight-text">${esc(compat.growth)}</p>
      </div>
    </div>

    <h2 style="font-family:var(--font-serif);font-size:1.5rem;color:var(--plum);margin-bottom:0.8rem;">What's Inside Your Workbook</h2>
    <div class="pdf-preview-grid mb-3">
      <div class="pdf-preview-card"><div class="pdf-preview-icon">📋</div><div class="pdf-preview-title">Your Love Profiles</div><div class="pdf-preview-desc">Side-by-side profiles with each partner's primary language, score breakdown, and personalized "how to love you" guidance.</div></div>
      <div class="pdf-preview-card"><div class="pdf-preview-icon">🗺️</div><div class="pdf-preview-title">Compatibility Map</div><div class="pdf-preview-desc">Your scores overlaid on one chart with the compatibility insight and your shared strength and growth zone highlighted.</div></div>
      <div class="pdf-preview-card"><div class="pdf-preview-icon">🛠</div><div class="pdf-preview-title">Communication Toolkit</div><div class="pdf-preview-desc">The Four Horsemen reference guide, the NVC emotional expression template, and the Five-Minute Check-In structure.</div></div>
      <div class="pdf-preview-card"><div class="pdf-preview-icon">🌟</div><div class="pdf-preview-title">30-Day Challenge</div><div class="pdf-preview-desc">Two personalized plans, each weighted to your partner's love language, with checkboxes and notes space for all 30 days.</div></div>
    </div>

    <div class="generate-cta">
      <h2>Ready to build your personalized workbook?</h2>
      <p>Three quick questions first, then your 15-page printable PDF is ready.</p>
      <button class="btn btn-plum btn-lg" onclick="goTo('personal')">Personalize Our Workbook &rarr;</button>
    </div>
  </div>
</div>`;
}

function renderPartnerResultCard(p, ranked) {
  const pName = p === 'A' ? nA() : nB();
  const isB = p === 'B';
  const scores = p === 'A' ? S.quizA.scores : S.quizB.scores;
  return `
  <div class="results-partner-card${isB?' card-b':''}">
    <div class="results-partner-name">${esc(pName)}</div>
    <div class="results-primary-icon">${ranked[0].icon}</div>
    <div class="results-primary-label">Primary Language</div>
    <div class="results-primary-name">${ranked[0].label}</div>
    <div class="results-sec-lang">Secondary: <strong>${ranked[1].icon} ${ranked[1].label}</strong></div>
    <div class="score-bars">
      ${ranked.map(r => `
      <div class="sbar-row">
        <span class="sbar-label" style="font-size:0.72rem;">${r.icon} ${r.label}</span>
        <div class="sbar-track"><div class="sbar-fill" style="width:${Math.round(r.score/r.max*100)}%;background:${r.color};"></div></div>
        <span class="sbar-num">${r.score}</span>
      </div>`).join('')}
    </div>
  </div>`;
}

/* ── SCREEN 5: PERSONALIZATION ───────────────────────────────── */
function renderPersonal() {
  const p = S.personal;
  const isActive = S.screen === 'personal';
  return `
<div class="screen${isActive?' active':''}" id="screen-personal">
  <div class="screen-inner">
    <div style="text-align:center;margin-bottom:2rem;">
      <h1 style="font-family:var(--font-serif);font-size:clamp(1.8rem,5vw,2.6rem);color:var(--plum);margin-bottom:0.5rem;">Make it <em style="color:var(--mauve);">uniquely yours</em></h1>
      <p style="color:var(--plum-mid);font-size:0.93rem;max-width:400px;margin:0 auto;">Three optional questions. Your answers get woven into your printed workbook's cover and commitment pages.</p>
    </div>

    <div class="personal-card">
      <h3>One word you'd use to describe what you love most about your partner</h3>
      <p class="text-muted mt-1 mb-2" style="font-size:0.85rem;">These appear on your personalized commitment page.</p>
      <div class="personal-two-col">
        <div class="field-wrap">
          <span class="field-label-sm">${esc(nA())}'s word for ${esc(nB())}</span>
          <input class="text-inp" id="p-wordA" value="${esc(p.wordA)}" placeholder="e.g. warm, brave, gentle..." ${p.skippedWordA?'disabled':''} oninput="saveP('wordA',this.value)" />
        </div>
        <div class="field-wrap">
          <span class="field-label-sm">${esc(nB())}'s word for ${esc(nA())}</span>
          <input class="text-inp" id="p-wordB" value="${esc(p.wordB)}" placeholder="e.g. steady, kind, funny..." ${p.skippedWordB?'disabled':''} oninput="saveP('wordB',this.value)" />
        </div>
      </div>
      <div class="skip-row">
        <button class="btn btn-ghost-plum btn-sm" onclick="skipField('wordA','wordB')">${p.skippedWordA ? 'Unskip' : 'Skip this question'}</button>
      </div>
    </div>

    <div class="personal-card">
      <h3>One thing you want more of in your relationship this month</h3>
      <p class="text-muted mt-1 mb-2" style="font-size:0.85rem;">These appear as intentions inside your commitment blocks.</p>
      <div class="personal-two-col">
        <div class="field-wrap">
          <span class="field-label-sm">${esc(nA())}'s intention</span>
          <input class="text-inp" id="p-moreA" value="${esc(p.moreA)}" placeholder="e.g. more laughter, more presence..." ${p.skippedMoreA?'disabled':''} oninput="saveP('moreA',this.value)" />
        </div>
        <div class="field-wrap">
          <span class="field-label-sm">${esc(nB())}'s intention</span>
          <input class="text-inp" id="p-moreB" value="${esc(p.moreB)}" placeholder="e.g. more stillness together..." ${p.skippedMoreB?'disabled':''} oninput="saveP('moreB',this.value)" />
        </div>
      </div>
      <div class="skip-row">
        <button class="btn btn-ghost-plum btn-sm" onclick="skipField('moreA','moreB')">${p.skippedMoreA ? 'Unskip' : 'Skip this question'}</button>
      </div>
    </div>

    <div class="personal-card">
      <h3>A date, place, or memory that is special to both of you</h3>
      <p class="text-muted mt-1 mb-2" style="font-size:0.85rem;">This becomes the pull-quote on your commitment page.</p>
      <input class="text-inp" id="p-memory" value="${esc(p.memory)}" placeholder="e.g. That night in Portland, our first apartment..." ${p.skippedMemory?'disabled':''} oninput="saveP('memory',this.value)" />
      <div class="skip-row">
        <button class="btn btn-ghost-plum btn-sm" onclick="skipField('memory')">${p.skippedMemory ? 'Unskip' : 'Skip this question'}</button>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:2rem;gap:1rem;flex-wrap:wrap;">
      <button class="btn btn-ghost btn-sm" onclick="goTo('results')">&larr; Back to Results</button>
      <button class="btn btn-plum btn-lg" onclick="buildAndDownload()">Build Our Workbook &rarr;</button>
    </div>
  </div>
</div>`;
}

function saveP(key, val) {
  S.personal[key] = val;
  persist();
}

function skipField(keyA, keyB) {
  const p = S.personal;
  if (keyB) {
    const alreadySkipped = p['skipped' + keyA.charAt(0).toUpperCase() + keyA.slice(1)];
    p['skipped' + keyA.charAt(0).toUpperCase() + keyA.slice(1)] = !alreadySkipped;
    p['skipped' + keyB.charAt(0).toUpperCase() + keyB.slice(1)] = !alreadySkipped;
  } else {
    const capKey = 'skipped' + keyA.charAt(0).toUpperCase() + keyA.slice(1);
    p[capKey] = !p[capKey];
  }
  persist();
  const el = document.getElementById('screen-personal');
  if (el) el.outerHTML = renderPersonal();
}

/* ── SCREEN 6: DOWNLOAD ──────────────────────────────────────── */
function renderDownload() {
  const isActive = S.screen === 'download';
  return `
<div class="screen${isActive?' active':''}" id="screen-download">
  <div class="download-screen-inner">
    <div class="download-check">&#10003;</div>
    <div class="download-names">${esc(nA())} &amp; ${esc(nB())}</div>
    <h1 class="download-title">Your workbook is ready.</h1>
    <p class="download-sub">Your personalized Love Languages Workbook has been built with your names, quiz results, compatibility insights, and a 30-day plan tailored to each of you. Save this file. Everything you need is inside.</p>
    <div class="download-btns">
      <button class="btn btn-plum btn-full btn-lg" onclick="triggerPrint()">&#128438; Download / Print as PDF</button>
      <button class="btn btn-ghost btn-sm" onclick="goTo('results')">&larr; Review Results</button>
    </div>
    <p class="download-note">Works best in Chrome or Safari. Choose "Save as PDF" in the print dialog.</p>
  </div>
</div>`;
}

function buildAndDownload() {
  buildPrintDocument();
  goTo('download');
}

/* ── NAVIGATION ──────────────────────────────────────────────── */
function goTo(screen) {
  S.screen = screen;
  persist();

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screen);
  if (el) {
    el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update step indicator
  const si = document.getElementById('step-indicator');
  if (si) si.outerHTML = renderStepIndicator();

  // Post-activate actions
  if (screen === 'results') {
    setTimeout(drawResultsChart, 80);
  }
}

/* ── PRINT ───────────────────────────────────────────────────── */
function triggerPrint() {
  buildPrintDocument();
  setTimeout(() => window.print(), 300);
}

/* ── BUILD PRINT DOCUMENT ────────────────────────────────────── */
function buildPrintDocument() {
  const container = document.getElementById('print-doc');
  if (!container) return;
  if (!S.quizA.done || !S.quizB.done) {
    container.innerHTML = '<div style="padding:1in;text-align:center;font-family:serif;"><h1>Please complete both quizzes first.</h1></div>';
    return;
  }

  const rA = getRanked(S.quizA.scores);
  const rB = getRanked(S.quizB.scores);
  const planA = buildPersonalizedPlan(S.quizB.scores); // A does actions for B
  const planB = buildPersonalizedPlan(S.quizA.scores); // B does actions for A
  const p = S.personal;
  const ck = getCompatKey(rA[0].key, rB[0].key);
  const compat = COMPAT[ck] || { shared:'', difference:'', growth:'' };
  const today = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

  // Score bar helper for print
  function ptBars(ranked) {
    return ranked.map(r => `
    <div style="display:flex;align-items:center;gap:6pt;margin-bottom:4pt;">
      <span style="font-size:8pt;color:#6B3560;width:110pt;flex-shrink:0;">${r.icon} ${r.label}</span>
      <div class="pt-bar-track" style="flex:1;">
        <div class="pt-bar-fill pt-bar-${r.key}" style="width:${Math.round(r.score/r.max*100)}%;"></div>
      </div>
      <span style="font-size:8pt;font-weight:700;color:#3D1C3A;width:14pt;text-align:right;">${r.score}</span>
    </div>`).join('');
  }

  // Action list for print (first 15 for a given language set)
  function ptActions(primaryKey, secondaryKey, actorName, receiverName) {
    const primary10 = ACTION_POOL[primaryKey].slice(0,10);
    const sec5 = ACTION_POOL[secondaryKey].slice(0,5);
    const allActions = [
      ...primary10.map(a => ({ a, ll: primaryKey })),
      ...sec5.map(a => ({ a, ll: secondaryKey }))
    ];
    return allActions.map((item, i) => `
    <div class="print-avoid-break" style="display:grid;grid-template-columns:16pt 12pt 1fr 70pt;gap:5pt;align-items:start;padding:4pt 0;border-bottom:0.5pt solid #EEE0D3;">
      <span style="font-family:'Cormorant Garamond',serif;font-size:11pt;color:#A0607A;font-weight:700;">${i+1}</span>
      <span class="pt-checkbox"></span>
      <span style="font-size:8.5pt;color:#3D1C3A;line-height:1.4;">${esc(item.a)}</span>
      <span class="pt-chip pt-chip-${item.ll}" style="text-align:center;">${LL[item.ll].icon} ${LL[item.ll].label}</span>
    </div>`).join('');
  }

  // 30-day plan rows
  function ptPlanRows(plan) {
    return plan.map(d => `
    <div class="print-avoid-break" style="display:grid;grid-template-columns:28pt 14pt 1fr 64pt;gap:5pt;align-items:start;padding:4pt 0;border-bottom:0.5pt solid #EEE0D3;">
      <span class="pt-day-num">Day ${d.day}</span>
      <span class="pt-checkbox"></span>
      <div>
        <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.4;">${esc(d.action)}</div>
        <div style="font-size:7.5pt;color:#6B3560;border-bottom:0.5pt solid #E8B4B8;margin-top:4pt;padding-bottom:2pt;">Notes:</div>
      </div>
      <span class="pt-chip pt-chip-${d.ll}">${LL[d.ll].icon} ${LL[d.ll].label}</span>
    </div>`).join('');
  }

  // Personal words
  const wordA = p.wordA && !p.skippedWordA ? p.wordA : 'thoughtful';
  const wordB = p.wordB && !p.skippedWordB ? p.wordB : 'caring';
  const moreA = p.moreA && !p.skippedMoreA ? p.moreA : 'deeper connection';
  const moreB = p.moreB && !p.skippedMoreB ? p.moreB : 'more intentional love';
  const memory = p.memory && !p.skippedMemory ? p.memory : '';

  container.innerHTML = `
<div class="print-footer">The Clarity Desk &bull; The Love Languages Workbook</div>

<!-- ======================================================
     PAGE 1: COVER
     ====================================================== -->
<div class="print-page">
  <div class="print-cover-wrap">
    <div class="print-cover-border"></div>
    <svg width="180" height="60" viewBox="0 0 180 60" class="pt-botanical" style="margin-bottom:0.3in;opacity:0.35;">
      <ellipse cx="30" cy="30" rx="22" ry="10" fill="none" stroke="#A0607A" stroke-width="1.2" transform="rotate(-30,30,30)"/>
      <ellipse cx="90" cy="20" rx="28" ry="10" fill="none" stroke="#E8B4B8" stroke-width="1" transform="rotate(15,90,20)"/>
      <ellipse cx="150" cy="32" rx="20" ry="9" fill="none" stroke="#A0607A" stroke-width="1.2" transform="rotate(40,150,32)"/>
      <line x1="28" y1="30" x2="88" y2="20" stroke="#E8B4B8" stroke-width="0.8"/>
      <line x1="90" y1="20" x2="148" y2="32" stroke="#E8B4B8" stroke-width="0.8"/>
    </svg>
    <div style="font-size:8pt;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:0.2in;">The Clarity Desk</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:42pt;font-weight:700;color:#3D1C3A;line-height:1.1;margin-bottom:0.08in;">The Love Languages</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:42pt;font-weight:700;font-style:italic;color:#A0607A;line-height:1.1;margin-bottom:0.35in;">Workbook</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:28pt;color:#3D1C3A;margin-bottom:0.12in;">${esc(nA())} &amp; ${esc(nB())}</div>
    <div style="width:1.5in;height:1.5pt;background:#E8B4B8;margin:0 auto 0.15in;"></div>
    <div style="font-size:9pt;color:#6B3560;font-family:'DM Sans',sans-serif;margin-bottom:0.5in;">${today}</div>
    <svg width="160" height="50" viewBox="0 0 160 50" class="pt-botanical" style="opacity:0.3;">
      <ellipse cx="20" cy="35" rx="16" ry="7" fill="none" stroke="#7A9E84" stroke-width="1.2" transform="rotate(30,20,35)"/>
      <ellipse cx="80" cy="25" rx="24" ry="9" fill="none" stroke="#C4DBC9" stroke-width="1"/>
      <ellipse cx="140" cy="36" rx="16" ry="7" fill="none" stroke="#7A9E84" stroke-width="1.2" transform="rotate(-30,140,36)"/>
      <line x1="20" y1="35" x2="78" y2="25" stroke="#C4DBC9" stroke-width="0.8"/>
      <line x1="80" y1="25" x2="138" y2="36" stroke="#C4DBC9" stroke-width="0.8"/>
    </svg>
  </div>
</div>

<!-- ======================================================
     PAGES 2-3: LOVE LANGUAGE PROFILES
     ====================================================== -->
<div class="print-page">
  <div style="border-bottom:2pt solid #E8B4B8;padding-bottom:0.12in;margin-bottom:0.25in;" class="print-avoid-break">
    <div class="pt-label pt-mb-sm">Section One</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:26pt;font-weight:700;color:#3D1C3A;">Your Love Language Profiles</div>
    <div style="font-size:9pt;color:#6B3560;margin-top:4pt;">How each of you gives and receives love, based on your quiz results.</div>
  </div>
  <div class="pt-grid-2">
    <!-- Partner A Profile -->
    <div style="background:#FDF0F1;border:1.5pt solid #E8B4B8;border-radius:10pt;padding:0.2in;" class="print-avoid-break">
      <div style="background:#FAE8EE;border-radius:6pt;padding:4pt 10pt;display:inline-block;margin-bottom:0.12in;">
        <span style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;">&#127800; ${esc(nA())}</span>
      </div>
      <div style="font-size:24pt;margin-bottom:4pt;">${rA[0].icon}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">Primary Language</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:16pt;color:#3D1C3A;margin-bottom:4pt;">${rA[0].label}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B3560;font-family:'DM Sans',sans-serif;margin-bottom:2pt;">Secondary</div>
      <div style="font-size:9pt;color:#6B3560;margin-bottom:0.12in;">${rA[1].icon} ${rA[1].label}</div>
      <div style="margin-bottom:0.12in;">${ptBars(rA)}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">How ${esc(nA())} receives love</div>
      <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.55;margin-bottom:0.1in;">${esc(LL_SHORT_DESC[rA[0].key])}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">How ${esc(nA())} expresses love</div>
      <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.55;margin-bottom:0.1in;">${esc(LL_GIVES[rA[0].key])}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">What can make ${esc(nA())} feel overlooked</div>
      <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.55;margin-bottom:0.1in;">${esc(LL_OVERLOOKED[rA[0].key])}</div>
      <div style="background:white;border-radius:6pt;padding:8pt 10pt;border:1pt solid #E8B4B8;">
        <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">${esc(nA())} thrives when</div>
        <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.5;font-style:italic;font-family:'Cormorant Garamond',serif;">"${esc(LL_THRIVES[rA[0].key])}"</div>
      </div>
    </div>
    <!-- Partner B Profile -->
    <div style="background:#EEF5F0;border:1.5pt solid #7A9E84;border-radius:10pt;padding:0.2in;" class="print-avoid-break">
      <div style="background:#DFF0E8;border-radius:6pt;padding:4pt 10pt;display:inline-block;margin-bottom:0.12in;">
        <span style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;">&#127807; ${esc(nB())}</span>
      </div>
      <div style="font-size:24pt;margin-bottom:4pt;">${rB[0].icon}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">Primary Language</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:16pt;color:#3D1C3A;margin-bottom:4pt;">${rB[0].label}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B3560;font-family:'DM Sans',sans-serif;margin-bottom:2pt;">Secondary</div>
      <div style="font-size:9pt;color:#6B3560;margin-bottom:0.12in;">${rB[1].icon} ${rB[1].label}</div>
      <div style="margin-bottom:0.12in;">${ptBars(rB)}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">How ${esc(nB())} receives love</div>
      <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.55;margin-bottom:0.1in;">${esc(LL_SHORT_DESC[rB[0].key])}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">How ${esc(nB())} expresses love</div>
      <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.55;margin-bottom:0.1in;">${esc(LL_GIVES[rB[0].key])}</div>
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">What can make ${esc(nB())} feel overlooked</div>
      <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.55;margin-bottom:0.1in;">${esc(LL_OVERLOOKED[rB[0].key])}</div>
      <div style="background:white;border-radius:6pt;padding:8pt 10pt;border:1pt solid #7A9E84;">
        <div style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:3pt;">${esc(nB())} thrives when</div>
        <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.5;font-style:italic;font-family:'Cormorant Garamond',serif;">"${esc(LL_THRIVES[rB[0].key])}"</div>
      </div>
    </div>
  </div>
</div>

<!-- ======================================================
     PAGE 4: COMPATIBILITY MAP
     ====================================================== -->
<div class="print-page">
  <div style="border-bottom:2pt solid #E8B4B8;padding-bottom:0.12in;margin-bottom:0.22in;" class="print-avoid-break">
    <div class="pt-label pt-mb-sm">Section Two</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:26pt;font-weight:700;color:#3D1C3A;">Your Compatibility Map</div>
    <div style="font-size:9pt;color:#6B3560;margin-top:4pt;">Your scores compared, and what the difference means for your relationship.</div>
  </div>

  <!-- Score comparison table -->
  <div class="print-avoid-break" style="margin-bottom:0.2in;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;font-size:7.5pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B3560;padding:5pt 6pt;border-bottom:1.5pt solid #EEE0D3;font-family:'DM Sans',sans-serif;">Language</th>
          <th style="text-align:left;font-size:7.5pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#A0607A;padding:5pt 6pt;border-bottom:1.5pt solid #EEE0D3;font-family:'DM Sans',sans-serif;">${esc(nA())}</th>
          <th style="text-align:left;font-size:7.5pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A9E84;padding:5pt 6pt;border-bottom:1.5pt solid #EEE0D3;font-family:'DM Sans',sans-serif;">${esc(nB())}</th>
          <th style="text-align:left;font-size:7.5pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B3560;padding:5pt 6pt;border-bottom:1.5pt solid #EEE0D3;font-family:'DM Sans',sans-serif;">Visual</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(LL).map(([k,ll]) => {
          const sA = S.quizA.scores[k] || 0;
          const sB = S.quizB.scores[k] || 0;
          return `<tr>
            <td style="padding:5pt 6pt;font-size:9pt;border-bottom:0.5pt solid #F7EFE8;">${ll.icon} ${ll.label}</td>
            <td style="padding:5pt 6pt;font-size:9pt;font-weight:700;color:#A0607A;border-bottom:0.5pt solid #F7EFE8;">${sA}</td>
            <td style="padding:5pt 6pt;font-size:9pt;font-weight:700;color:#7A9E84;border-bottom:0.5pt solid #F7EFE8;">${sB}</td>
            <td style="padding:5pt 6pt;border-bottom:0.5pt solid #F7EFE8;">
              <div style="display:flex;gap:2pt;align-items:center;">
                <div style="height:8pt;width:${Math.round(sA/8*60)}pt;background:#A0607A;border-radius:2pt;opacity:0.75;"></div>
                <div style="height:8pt;width:${Math.round(sB/8*60)}pt;background:#7A9E84;border-radius:2pt;opacity:0.75;"></div>
              </div>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
  </div>

  <div class="pt-grid-2" style="gap:0.18in;margin-bottom:0.18in;">
    <div style="background:#EEF5F0;border:1.5pt solid #7A9E84;border-radius:8pt;padding:0.15in;" class="print-avoid-break">
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:5pt;">Your Shared Strength</div>
      <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.6;">${esc(compat.shared)}</div>
    </div>
    <div style="background:#FDF0F1;border:1.5pt solid #E8B4B8;border-radius:8pt;padding:0.15in;" class="print-avoid-break">
      <div style="font-size:7pt;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:5pt;">Biggest Difference</div>
      <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.6;">${esc(compat.difference)}</div>
    </div>
  </div>
  <div style="background:#F5E8C8;border:1.5pt solid #C89A4A;border-radius:8pt;padding:0.15in;" class="print-avoid-break">
    <div style="font-size:7pt;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#C89A4A;font-family:'DM Sans',sans-serif;margin-bottom:5pt;">Growth Opportunity</div>
    <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.6;">${esc(compat.growth)}</div>
  </div>
</div>

<!-- ======================================================
     PAGES 5-6: COMMUNICATION TOOLKIT
     ====================================================== -->
<div class="print-page">
  <div style="border-bottom:2pt solid #E8B4B8;padding-bottom:0.12in;margin-bottom:0.22in;" class="print-avoid-break">
    <div class="pt-label pt-mb-sm">Section Three</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:26pt;font-weight:700;color:#3D1C3A;">The Communication Toolkit</div>
    <div style="font-size:9pt;color:#6B3560;margin-top:4pt;">Research-backed tools for the conversations that matter most.</div>
  </div>

  <!-- Tool 1: Four Horsemen -->
  <div class="print-avoid-break" style="margin-bottom:0.2in;">
    <div style="display:flex;align-items:baseline;gap:8pt;margin-bottom:0.1in;">
      <div style="background:#A0607A;color:white;border-radius:999pt;width:18pt;height:18pt;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:700;font-family:'DM Sans',sans-serif;flex-shrink:0;">1</div>
      <div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:15pt;color:#3D1C3A;font-weight:700;">The Four Horsemen (Gottman Institute)</div>
        <div style="font-size:8pt;color:#6B3560;font-style:italic;">Four communication patterns that predict relationship distress, each with a proven antidote.</div>
      </div>
    </div>
    <table class="pt-horsemen-table">
      <thead>
        <tr>
          <th style="width:18%">Pattern</th>
          <th style="width:35%">What it sounds like</th>
          <th style="width:47%">The antidote</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Criticism</strong></td>
          <td>"You never think about anyone but yourself."</td>
          <td><strong>Gentle startup:</strong> Focus on a specific behavior, not your partner's character. "I felt hurt when the plans changed. Could we talk about it?" Attack the problem, not the person.</td>
        </tr>
        <tr>
          <td><strong>Contempt</strong></td>
          <td>Eye-rolling, mockery, name-calling, sarcasm.</td>
          <td><strong>Build a culture of appreciation:</strong> Actively look for what your partner does well and say it out loud. Contempt cannot survive genuine, expressed gratitude. Start a daily practice of one appreciation per day.</td>
        </tr>
        <tr>
          <td><strong>Defensiveness</strong></td>
          <td>"That's not my fault. You're the one who..."</td>
          <td><strong>Take responsibility:</strong> Even if only 10% of the issue belongs to you, own that 10% first. "You're right that I could have communicated better there." Partial ownership disarms defensiveness.</td>
        </tr>
        <tr>
          <td><strong>Stonewalling</strong></td>
          <td>Shutting down, leaving, going silent, refusing to engage.</td>
          <td><strong>Physiological self-soothing:</strong> When flooded (heart rate above 100 bpm), ask for a 20-minute break explicitly. "I need to take a break and I will come back to this." Then actually come back.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Tool 2: NVC Template -->
  <div class="print-avoid-break" style="margin-bottom:0.2in;">
    <div style="display:flex;align-items:baseline;gap:8pt;margin-bottom:0.1in;">
      <div style="background:#A0607A;color:white;border-radius:999pt;width:18pt;height:18pt;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:700;font-family:'DM Sans',sans-serif;flex-shrink:0;">2</div>
      <div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:15pt;color:#3D1C3A;font-weight:700;">The Emotional Expression Template (NVC)</div>
        <div style="font-size:8pt;color:#6B3560;font-style:italic;">Based on Nonviolent Communication (Marshall Rosenberg). Use this structure when something needs to be said.</div>
      </div>
    </div>
    <div class="pt-nvc-box">
      "When I noticed <span style="border-bottom:1pt solid #A0607A;padding:0 20pt;">&nbsp;</span>,<br>
      I felt <span style="border-bottom:1pt solid #A0607A;padding:0 20pt;">&nbsp;</span>.<br>
      What I need is <span style="border-bottom:1pt solid #A0607A;padding:0 20pt;">&nbsp;</span>.<br>
      This week, I would love it if <span style="border-bottom:1pt solid #A0607A;padding:0 40pt;">&nbsp;</span>."
    </div>
    <div style="font-size:8pt;color:#6B3560;font-style:italic;margin-top:6pt;">The power of this template is that it separates observation from interpretation, names the feeling without blame, connects it to an underlying need, and makes one concrete, actionable request. Practice it in writing first before saying it aloud.</div>
  </div>

  <!-- Tool 3: Five-Minute Check-In -->
  <div class="print-avoid-break">
    <div style="display:flex;align-items:baseline;gap:8pt;margin-bottom:0.1in;">
      <div style="background:#A0607A;color:white;border-radius:999pt;width:18pt;height:18pt;display:flex;align-items:center;justify-content:center;font-size:9pt;font-weight:700;font-family:'DM Sans',sans-serif;flex-shrink:0;">3</div>
      <div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:15pt;color:#3D1C3A;font-weight:700;">The Five-Minute Check-In</div>
        <div style="font-size:8pt;color:#6B3560;font-style:italic;">A simple evening ritual. Sit together, no phones, five minutes. Take turns with these five steps.</div>
      </div>
    </div>
    <div class="pt-grid-2" style="gap:0.12in;">
      ${[
        ['1. Appreciations', 'Name one thing your partner did today that you noticed and are grateful for. Be specific.'],
        ['2. Updates', 'What happened in your world today? A quick share of what was on your plate.'],
        ['3. Questions', 'Ask one genuine question about something in their life you want to understand better.'],
        ['4. Concern + Request', 'If something is bothering you, name it briefly and make one specific, actionable request.'],
        ['5. Hopes', 'What are you looking forward to tomorrow or this week? End on something forward-facing.']
      ].map(([title, desc]) => `
      <div style="background:#FDF8F5;border:1pt solid #EEE0D3;border-radius:7pt;padding:9pt;" class="print-avoid-break">
        <div style="font-family:'DM Sans',sans-serif;font-size:8pt;font-weight:700;color:#A0607A;margin-bottom:3pt;">${esc(title)}</div>
        <div style="font-size:8pt;color:#3D1C3A;line-height:1.5;">${esc(desc)}</div>
      </div>`).join('')}
      <div style="background:#FDF0F1;border:1.5pt solid #E8B4B8;border-radius:7pt;padding:9pt;" class="print-avoid-break">
        <div style="font-family:'DM Sans',sans-serif;font-size:8pt;font-weight:700;color:#A0607A;margin-bottom:3pt;">The Rule</div>
        <div style="font-size:8pt;color:#3D1C3A;line-height:1.5;">No problem-solving during the check-in. Just listening and acknowledging. Save solutions for a separate conversation.</div>
      </div>
    </div>
  </div>
</div>

<!-- ======================================================
     PAGES 7-8: PERSONALIZED ACTION MENU
     ====================================================== -->
<div class="print-page">
  <div style="border-bottom:2pt solid #E8B4B8;padding-bottom:0.12in;margin-bottom:0.22in;" class="print-avoid-break">
    <div class="pt-label pt-mb-sm">Section Four</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:26pt;font-weight:700;color:#3D1C3A;">Your Personalized Action Menu</div>
    <div style="font-size:9pt;color:#6B3560;margin-top:4pt;">Filtered to each partner's love language. Fifteen acts each. Check the ones you try.</div>
  </div>
  <!-- A's actions FOR B -->
  <div style="margin-bottom:0.2in;">
    <div style="background:#FAE8EE;border-radius:7pt;padding:8pt 12pt;margin-bottom:0.1in;display:inline-block;">
      <span style="font-family:'Cormorant Garamond',serif;font-size:13pt;font-weight:700;color:#3D1C3A;">${esc(nA())}: Here is how to love ${esc(nB())}</span>
    </div>
    <div style="font-size:8pt;color:#6B3560;margin-bottom:8pt;">${esc(nB())}'s primary language is <strong>${rB[0].icon} ${rB[0].label}</strong>. Secondary: ${rB[1].icon} ${rB[1].label}. These 15 actions are written for you, ${esc(nA())}.</div>
    ${ptActions(rB[0].key, rB[1].key, nA(), nB())}
  </div>
</div>
<div class="print-page">
  <!-- B's actions FOR A -->
  <div style="margin-bottom:0.2in;">
    <div style="background:#EEF5F0;border-radius:7pt;padding:8pt 12pt;margin-bottom:0.1in;display:inline-block;">
      <span style="font-family:'Cormorant Garamond',serif;font-size:13pt;font-weight:700;color:#3D1C3A;">${esc(nB())}: Here is how to love ${esc(nA())}</span>
    </div>
    <div style="font-size:8pt;color:#6B3560;margin-bottom:8pt;">${esc(nA())}'s primary language is <strong>${rA[0].icon} ${rA[0].label}</strong>. Secondary: ${rA[1].icon} ${rA[1].label}. These 15 actions are written for you, ${esc(nB())}.</div>
    ${ptActions(rA[0].key, rA[1].key, nB(), nA())}
  </div>
</div>

<!-- ======================================================
     PAGES 9-10: 30-DAY CHALLENGE - PARTNER A
     ====================================================== -->
<div class="print-page">
  <div style="border-bottom:2pt solid #E8B4B8;padding-bottom:0.12in;margin-bottom:0.18in;" class="print-avoid-break">
    <div class="pt-label pt-mb-sm">Section Five</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:24pt;font-weight:700;color:#3D1C3A;">${esc(nA())}'s 30 Days of Loving ${esc(nB())}</div>
    <div style="font-size:8.5pt;color:#6B3560;margin-top:4pt;">Every action here is drawn from ${esc(nB())}'s love language scores. Check each day as you complete it.</div>
  </div>
  <div style="display:flex;gap:12pt;align-items:center;margin-bottom:0.15in;padding:8pt 12pt;background:#FDF0F1;border-radius:7pt;">
    <div style="display:flex;align-items:center;gap:4pt;"><div style="width:8pt;height:8pt;border-radius:50%;background:#A0607A;"></div><span style="font-size:8pt;font-family:'DM Sans',sans-serif;">= ${esc(nA())}</span></div>
    <div style="font-size:8pt;color:#6B3560;">${esc(nB())}'s primary: <strong>${rB[0].icon} ${rB[0].label}</strong> &bull; Secondary: ${rB[1].icon} ${rB[1].label}</div>
  </div>
  ${ptPlanRows(planA.slice(0,15))}
</div>
<div class="print-page">
  <div style="margin-bottom:0.15in;padding:8pt 12pt;background:#FDF0F1;border-radius:7pt;">
    <span style="font-family:'Cormorant Garamond',serif;font-size:14pt;font-weight:700;color:#3D1C3A;">${esc(nA())}'s Challenge, Days 16-30</span>
  </div>
  ${ptPlanRows(planA.slice(15,30))}
  <div style="margin-top:0.15in;background:#FAE8EE;border-radius:7pt;padding:10pt 14pt;text-align:center;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:13pt;font-weight:700;font-style:italic;color:#3D1C3A;">Day 30: Reflect together. What shifted?</div>
  </div>
</div>

<!-- ======================================================
     PAGES 11-12: 30-DAY CHALLENGE - PARTNER B
     ====================================================== -->
<div class="print-page">
  <div style="border-bottom:2pt solid #7A9E84;padding-bottom:0.12in;margin-bottom:0.18in;" class="print-avoid-break">
    <div class="pt-label pt-mb-sm" style="color:#7A9E84;">Section Five, continued</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:24pt;font-weight:700;color:#3D1C3A;">${esc(nB())}'s 30 Days of Loving ${esc(nA())}</div>
    <div style="font-size:8.5pt;color:#6B3560;margin-top:4pt;">Every action here is drawn from ${esc(nA())}'s love language scores. Check each day as you complete it.</div>
  </div>
  <div style="display:flex;gap:12pt;align-items:center;margin-bottom:0.15in;padding:8pt 12pt;background:#EEF5F0;border-radius:7pt;">
    <div style="display:flex;align-items:center;gap:4pt;"><div style="width:8pt;height:8pt;border-radius:50%;background:#7A9E84;"></div><span style="font-size:8pt;font-family:'DM Sans',sans-serif;">= ${esc(nB())}</span></div>
    <div style="font-size:8pt;color:#6B3560;">${esc(nA())}'s primary: <strong>${rA[0].icon} ${rA[0].label}</strong> &bull; Secondary: ${rA[1].icon} ${rA[1].label}</div>
  </div>
  ${ptPlanRows(planB.slice(0,15))}
</div>
<div class="print-page">
  <div style="margin-bottom:0.15in;padding:8pt 12pt;background:#EEF5F0;border-radius:7pt;">
    <span style="font-family:'Cormorant Garamond',serif;font-size:14pt;font-weight:700;color:#3D1C3A;">${esc(nB())}'s Challenge, Days 16-30</span>
  </div>
  ${ptPlanRows(planB.slice(15,30))}
  <div style="margin-top:0.15in;background:#EEF5F0;border-radius:7pt;padding:10pt 14pt;text-align:center;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:13pt;font-weight:700;font-style:italic;color:#3D1C3A;">Day 30: Reflect together. What shifted?</div>
  </div>
</div>

<!-- ======================================================
     PAGE 13: COMMITMENT PAGE
     ====================================================== -->
<div class="print-page">
  <div style="text-align:center;margin-bottom:0.25in;" class="print-avoid-break">
    <svg width="200" height="40" viewBox="0 0 200 40" style="display:block;margin:0 auto 0.1in;opacity:0.4;">
      <ellipse cx="40" cy="20" rx="28" ry="10" fill="none" stroke="#A0607A" stroke-width="1.2" transform="rotate(-20,40,20)"/>
      <ellipse cx="100" cy="14" rx="32" ry="11" fill="none" stroke="#E8B4B8" stroke-width="1"/>
      <ellipse cx="160" cy="21" rx="28" ry="10" fill="none" stroke="#A0607A" stroke-width="1.2" transform="rotate(20,160,21)"/>
      <line x1="38" y1="20" x2="96" y2="15" stroke="#E8B4B8" stroke-width="0.8"/>
      <line x1="100" y1="14" x2="156" y2="21" stroke="#E8B4B8" stroke-width="0.8"/>
    </svg>
    <div class="pt-label pt-mb-sm">Our Commitment</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:28pt;font-weight:700;color:#3D1C3A;">A Promise Between ${esc(nA())} &amp; ${esc(nB())}</div>
    ${memory ? `
    <div style="background:#FDF0F1;border:1.5pt solid #E8B4B8;border-radius:8pt;padding:0.14in 0.2in;margin:0.18in auto;max-width:4in;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:13pt;font-style:italic;color:#3D1C3A;line-height:1.6;">"${esc(memory)}"</div>
    </div>` : ''}
  </div>

  <div class="pt-grid-2" style="gap:0.2in;">
    <!-- Partner A commitment block -->
    <div style="background:#FDF0F1;border:2pt solid #E8B4B8;border-radius:10pt;padding:0.2in;" class="print-avoid-break">
      <div style="background:#FAE8EE;border-radius:6pt;padding:4pt 10pt;display:inline-block;margin-bottom:0.12in;">
        <span style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;">&#127800; ${esc(nA())}</span>
      </div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:11pt;font-style:italic;color:#3D1C3A;line-height:1.7;margin-bottom:0.1in;">
        I see you as <strong>${esc(wordA)}</strong>, and I want to love you the way you actually need to be loved.
        ${moreA ? `This month, I am committed to bringing more <strong>${esc(moreA)}</strong> into what we share.` : ''}
      </div>
      <div style="font-size:8pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:0.08in;">I commit to</div>
      <div class="pt-fill-line-lg"></div>
      <div class="pt-fill-line-lg"></div>
      <div style="font-size:8pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:0.08in;margin-top:0.08in;">Signed with love</div>
      <div class="pt-fill-line"></div>
      <div style="font-size:7.5pt;color:#6B3560;margin-top:3pt;">Date: _______________</div>
    </div>
    <!-- Partner B commitment block -->
    <div style="background:#EEF5F0;border:2pt solid #7A9E84;border-radius:10pt;padding:0.2in;" class="print-avoid-break">
      <div style="background:#DFF0E8;border-radius:6pt;padding:4pt 10pt;display:inline-block;margin-bottom:0.12in;">
        <span style="font-size:7pt;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;">&#127807; ${esc(nB())}</span>
      </div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:11pt;font-style:italic;color:#3D1C3A;line-height:1.7;margin-bottom:0.1in;">
        I see you as <strong>${esc(wordB)}</strong>, and I want to love you the way you actually need to be loved.
        ${moreB ? `This month, I am committed to bringing more <strong>${esc(moreB)}</strong> into what we share.` : ''}
      </div>
      <div style="font-size:8pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:0.08in;">I commit to</div>
      <div class="pt-fill-line-lg"></div>
      <div class="pt-fill-line-lg"></div>
      <div style="font-size:8pt;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:0.08in;margin-top:0.08in;">Signed with love</div>
      <div class="pt-fill-line"></div>
      <div style="font-size:7.5pt;color:#6B3560;margin-top:3pt;">Date: _______________</div>
    </div>
  </div>

  <div style="text-align:center;margin-top:0.25in;padding:0.15in;background:#FDF8F5;border-radius:8pt;border:1pt solid #EEE0D3;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:12pt;font-style:italic;color:#6B3560;line-height:1.7;">
      "We will learn each other's language, not perfectly, but persistently. We will choose to love each other on purpose, even on the days it does not come easily. And when we miss the mark, we will try again."
    </div>
  </div>
</div>

<!-- ======================================================
     PAGE 14: WHEN TO GO DEEPER
     ====================================================== -->
<div class="print-page">
  <div style="border-bottom:2pt solid #E8B4B8;padding-bottom:0.12in;margin-bottom:0.22in;" class="print-avoid-break">
    <div class="pt-label pt-mb-sm">Resources</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:26pt;font-weight:700;color:#3D1C3A;">When to Go Deeper</div>
    <div style="font-size:9pt;color:#6B3560;margin-top:4pt;line-height:1.6;">A workbook is a starting point. Some couples discover through the process of doing one that they would benefit from working with a professional. That is not a sign that something is wrong. It is a sign that you take your relationship seriously enough to invest in it properly.</div>
  </div>

  <!-- EFT section -->
  <div class="print-avoid-break" style="margin-bottom:0.2in;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:15pt;font-weight:700;color:#3D1C3A;margin-bottom:6pt;">Emotionally Focused Therapy (EFT)</div>
    <div style="font-size:8.5pt;color:#3D1C3A;line-height:1.65;margin-bottom:8pt;">EFT, developed by Dr. Sue Johnson, is currently the most research-supported approach to couples therapy, with a documented success rate of 70 to 75 percent across multiple independent studies. It works by helping couples identify and interrupt the negative interaction cycles that repeat in conflict, and by rebuilding the emotional bond that is the actual foundation of a healthy relationship. It is not about communication techniques. It is about attachment and safety.</div>
    <div class="pt-grid-3" style="gap:0.12in;">
      <div style="background:#FDF0F1;border:1pt solid #E8B4B8;border-radius:7pt;padding:10pt;" class="print-avoid-break">
        <div style="font-size:7.5pt;font-weight:700;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:4pt;">Find an EFT Therapist</div>
        <div style="font-size:8pt;color:#3D1C3A;line-height:1.5;">International Centre for Excellence in EFT directory of trained therapists worldwide.</div>
        <div style="font-size:7.5pt;color:#A0607A;margin-top:4pt;">iceeft.com/find-a-therapist</div>
      </div>
      <div style="background:#EEF5F0;border:1pt solid #C4DBC9;border-radius:7pt;padding:10pt;" class="print-avoid-break">
        <div style="font-size:7.5pt;font-weight:700;color:#7A9E84;font-family:'DM Sans',sans-serif;margin-bottom:4pt;">Gottman Referral Network</div>
        <div style="font-size:8pt;color:#3D1C3A;line-height:1.5;">Gottman-trained therapists searchable by location, specialty, and availability.</div>
        <div style="font-size:7.5pt;color:#7A9E84;margin-top:4pt;">gottman.com/couples/find-a-therapist</div>
      </div>
      <div style="background:#F5E8C8;border:1pt solid #C89A4A;border-radius:7pt;padding:10pt;" class="print-avoid-break">
        <div style="font-size:7.5pt;font-weight:700;color:#C89A4A;font-family:'DM Sans',sans-serif;margin-bottom:4pt;">Psychology Today Finder</div>
        <div style="font-size:8pt;color:#3D1C3A;line-height:1.5;">Broad therapist directory with filters for couples counseling, insurance, and telehealth.</div>
        <div style="font-size:7.5pt;color:#C89A4A;margin-top:4pt;">psychologytoday.com/us/therapists</div>
      </div>
    </div>
  </div>

  <!-- Books -->
  <div class="print-avoid-break">
    <div style="font-family:'Cormorant Garamond',serif;font-size:15pt;font-weight:700;color:#3D1C3A;margin-bottom:10pt;">Three Books Worth Reading Together</div>
    ${[
      ['Hold Me Tight', 'Dr. Sue Johnson', 'The foundational text on EFT and attachment in adult relationships. Johnson explains why couples fight the same fights repeatedly and how to break the cycle by addressing what is actually driving it: the question of whether your partner will be there when you need them.'],
      ['The Seven Principles for Making Marriage Work', 'Dr. John Gottman', 'Forty years of research distilled into practical principles. Gottman explains what distinguishes couples who stay together from those who do not, and what you can start doing today that actually moves the needle.'],
      ['Attached: The New Science of Adult Attachment', 'Amir Levine and Rachel Heller', 'A clear, readable introduction to attachment theory and how your early experiences shape the way you love and what you need in a relationship. Understanding your attachment style is often the missing piece in understanding why certain conflicts repeat.']
    ].map(([title, author, desc]) => `
    <div style="display:flex;gap:10pt;margin-bottom:10pt;padding:10pt;background:#FDF8F5;border-radius:7pt;border:1pt solid #EEE0D3;" class="print-avoid-break">
      <div style="width:6pt;flex-shrink:0;background:#A0607A;border-radius:999pt;"></div>
      <div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:11pt;font-weight:700;color:#3D1C3A;">${esc(title)}</div>
        <div style="font-size:8pt;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:3pt;font-weight:600;">${esc(author)}</div>
        <div style="font-size:8pt;color:#6B3560;line-height:1.55;">${esc(desc)}</div>
      </div>
    </div>`).join('')}
  </div>
</div>

<!-- ======================================================
     PAGE 15: BACK COVER
     ====================================================== -->
<div class="print-page" style="page-break-after:avoid;">
  <div style="min-height:9in;background:#FDF8F5;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative;">
    <div style="position:absolute;top:0.25in;left:0.25in;right:0.25in;bottom:0.25in;border:2pt solid #E8B4B8;border-radius:12pt;pointer-events:none;"></div>
    <svg width="160" height="55" viewBox="0 0 160 55" style="margin-bottom:0.25in;opacity:0.35;">
      <ellipse cx="25" cy="30" rx="20" ry="9" fill="none" stroke="#7A9E84" stroke-width="1.2" transform="rotate(25,25,30)"/>
      <ellipse cx="80" cy="20" rx="26" ry="10" fill="none" stroke="#C4DBC9" stroke-width="1"/>
      <ellipse cx="135" cy="30" rx="20" ry="9" fill="none" stroke="#7A9E84" stroke-width="1.2" transform="rotate(-25,135,30)"/>
      <line x1="23" y1="31" x2="76" y2="21" stroke="#C4DBC9" stroke-width="0.8"/>
      <line x1="80" y1="20" x2="132" y2="31" stroke="#C4DBC9" stroke-width="0.8"/>
    </svg>
    <div style="font-size:8pt;letter-spacing:0.22em;text-transform:uppercase;font-weight:700;color:#A0607A;font-family:'DM Sans',sans-serif;margin-bottom:0.15in;">The Clarity Desk</div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:32pt;font-weight:700;font-style:italic;color:#A0607A;margin-bottom:0.1in;">Thank you.</div>
    <div style="width:1.2in;height:1.5pt;background:#E8B4B8;margin:0 auto 0.2in;"></div>
    <div style="font-family:'Cormorant Garamond',serif;font-size:13pt;font-style:italic;color:#6B3560;line-height:1.8;max-width:4in;">
      "Not everyone chooses to understand their partner more deeply. The fact that you sat down together and actually did this says something real about both of you. Love does not ask for perfection. It asks for effort. You gave it."
    </div>
    <div style="margin-top:0.35in;font-family:'Cormorant Garamond',serif;font-size:20pt;font-weight:700;color:#3D1C3A;">${esc(nA())} &amp; ${esc(nB())}</div>
    <div style="font-size:8.5pt;color:#6B3560;margin-top:0.08in;">${today}</div>
    <svg width="180" height="55" viewBox="0 0 180 55" style="margin-top:0.25in;opacity:0.3;">
      <ellipse cx="30" cy="30" rx="22" ry="9" fill="none" stroke="#A0607A" stroke-width="1.2" transform="rotate(-30,30,30)"/>
      <ellipse cx="90" cy="20" rx="28" ry="10" fill="none" stroke="#E8B4B8" stroke-width="1"/>
      <ellipse cx="150" cy="32" rx="22" ry="9" fill="none" stroke="#A0607A" stroke-width="1.2" transform="rotate(30,150,32)"/>
      <line x1="28" y1="30" x2="88" y2="21" stroke="#E8B4B8" stroke-width="0.8"/>
      <line x1="90" y1="20" x2="148" y2="32" stroke="#E8B4B8" stroke-width="0.8"/>
    </svg>
  </div>
</div>
`;
}

/* ── MAIN RENDER ─────────────────────────────────────────────── */
function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML =
    renderStepIndicator() +
    renderWelcome() +
    renderQuizScreen('A') +
    renderTransitionScreen('A') +
    renderQuizScreen('B') +
    renderTransitionScreen('B') +
    renderResults() +
    renderPersonal() +
    renderDownload() +
    `<div class="auto-save" id="auto-save">&#10003; Progress saved</div>`;

  // Show the right screen
  activateScreen(S.screen);

  // If results, draw chart
  if (S.screen === 'results') setTimeout(drawResultsChart, 80);
}

function activateScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + screen);
  if (el) el.classList.add('active');
}

/* ── INIT ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  S = loadState();
  renderApp();
});
