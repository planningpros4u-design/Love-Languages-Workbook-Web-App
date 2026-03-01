// ============================================================
//  THE LOVE LANGUAGES WORKBOOK  -  app.js
// ============================================================

// ─── DATA ────────────────────────────────────────────────────

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

// Scoring key: {language: [{q: 1-based, choice: 'A'|'B'}, ...]}
const SCORING_KEY = {
  words:   [{q:1,c:'A'},{q:6,c:'B'},{q:8,c:'A'},{q:10,c:'B'},{q:13,c:'A'},{q:15,c:'B'},{q:17,c:'B'},{q:20,c:'A'}],
  time:    [{q:1,c:'B'},{q:6,c:'A'},{q:9,c:'A'},{q:11,c:'B'},{q:14,c:'A'},{q:16,c:'B'},{q:19,c:'A'}],
  touch:   [{q:3,c:'A'},{q:5,c:'A'},{q:7,c:'B'},{q:9,c:'B'},{q:12,c:'A'},{q:14,c:'B'},{q:17,c:'A'},{q:19,c:'B'}],
  service: [{q:2,c:'B'},{q:4,c:'B'},{q:7,c:'A'},{q:11,c:'A'},{q:15,c:'A'},{q:18,c:'A'},{q:20,c:'B'}],
  gifts:   [{q:2,c:'A'},{q:5,c:'B'},{q:8,c:'B'},{q:10,c:'A'},{q:13,c:'B'},{q:16,c:'A'},{q:18,c:'B'}]
};

const LL_INFO = {
  words:   { label: "Words of Affirmation", icon: "💬", cls: "words",   color: "#c97b63" },
  time:    { label: "Quality Time",         icon: "⏱",  cls: "time",    color: "#8aac8e" },
  touch:   { label: "Physical Touch",       icon: "🤝", cls: "touch",   color: "#b07bbf" },
  service: { label: "Acts of Service",      icon: "🛠",  cls: "service", color: "#d4a043" },
  gifts:   { label: "Receiving Gifts",      icon: "🎁", cls: "gifts",   color: "#6b9fc4" }
};

const LL_DESCRIPTIONS = {
  words: {
    full: "At its core, this language is about verbal acknowledgment — the need to have your worth, your effort, and your presence in someone's life spoken out loud. For people whose primary language is words, silence is loud and specific praise is felt in the chest.",
    needs: "Specific, genuine praise; hearing \"I love you\" regularly and sincerely; and to have their efforts and contributions named out loud.",
    hurt: "Harsh words, criticism delivered carelessly, or long stretches without affirmation, even if everything is technically fine.",
    quote: "\"I just need to hear that you notice me.\""
  },
  time: {
    full: "This language is about prioritized, intentional presence. Not just proximity but actual connection. People who speak this language feel most loved when their partner chooses them, clears the noise, and shows up fully.",
    needs: "Focused attention without competing distractions, shared experiences that feel intentional, and eye contact and genuine conversation that says: you are my priority right now.",
    hurt: "Cancelled plans, distracted presence, or feeling like they are always competing with a phone, a project, or other people's needs.",
    quote: "\"I don't need much. I just need you to actually be here.\""
  },
  touch: {
    full: "This language lives in the body. For people whose primary language is physical touch, affectionate contact is a constant, quiet reassurance that all is well between you. It's not about any single big gesture. It's about the steady, small ones.",
    needs: "Regular, casual physical affection (not just during intimate moments), to be reached for, held, touched, and kept close, and to feel their partner's physical presence as a baseline of security.",
    hurt: "Physical withdrawal, being withheld from during conflict, or long periods without affectionate contact, which can feel to them like emotional distance.",
    quote: "\"When you stop touching me, I think something is wrong with us.\""
  },
  service: {
    full: "For people who speak this language, love is demonstrated through action, specifically through the kind of quiet, practical help that makes someone's life easier. The most romantic thing you can do for this person is notice what they need and handle it.",
    needs: "A partner who follows through and does what they say they'll do, to have their effort recognized and reciprocated, and to feel that the weight of life is carried together.",
    hurt: "Broken promises, leaving tasks undone that you said you'd handle, or a partner who is warm in words but absent in action.",
    quote: "\"If you loved me, you would just do it. I shouldn't have to ask.\""
  },
  gifts: {
    full: "This is the most misread love language, and it deserves a proper defense. This is not about materialism. It is about the symbol. A gift is physical proof that someone crossed your mind and acted on it. The price is irrelevant. The thought is everything.",
    needs: "To receive tokens of thoughtfulness regularly (frequency matters more than size), to feel remembered in small, tangible ways, and to see evidence that they exist in their partner's mind even when they're not in the room.",
    hurt: "Forgotten occasions, receiving clearly thoughtless or obligatory gifts, or a partner who dismisses the importance of the gesture entirely.",
    quote: "\"I just want to know that you think about me when I'm not in the room.\""
  }
};

const TRANSLATION_GUIDE = {
  words: {
    dos: [
      "Say \"I love you\" regularly and mean it, not just on special occasions",
      "Tell them specifically what you admire, appreciate, or find beautiful",
      "Send a message out of nowhere that says you were thinking of them",
      "Acknowledge their effort out loud, especially when they've been working hard",
      "Praise them in front of others, because being seen positively is deeply affirming"
    ],
    donts: [
      "Go long stretches without verbal affirmation, even if everything is fine",
      "Criticize carelessly in the heat of a moment, because those words stay long",
      "Assume they know how you feel without you saying it"
    ]
  },
  time: {
    dos: [
      "Put your phone down and actually be present, truly present",
      "Plan something intentional, even if simple: a walk, a meal, a drive",
      "Ask real questions and listen all the way to the end of their answer",
      "Choose them and make it clear that being with them is something you want",
      "Create recurring rituals, however small, that belong to just the two of you"
    ],
    donts: [
      "Cancel or repeatedly postpone time you had planned together",
      "Be distracted during what was supposed to be their time",
      "Fill every shared moment with screens or other people"
    ]
  },
  touch: {
    dos: [
      "Reach for them casually throughout the day: a hand on the back, a quick squeeze",
      "Greet them and leave them with real physical warmth, a proper hug",
      "Stay physically close during hard conversations rather than creating distance",
      "Initiate affection for no reason, not just when you want something",
      "Sit close enough to touch when you're watching something or resting together"
    ],
    donts: [
      "Withdraw physically during conflict or stress",
      "Go long stretches without casual, non-transactional touch",
      "Pull away in public or in front of others"
    ]
  },
  service: {
    dos: [
      "Handle something difficult before they have to ask, by anticipating and acting",
      "Follow through on what you say you'll do, every time, without being reminded",
      "Step in during busy seasons and carry more of the weight",
      "Do the small, unglamorous tasks that nobody notices but keep life running",
      "Complete things fully, not halfway done and abandoned"
    ],
    donts: [
      "Make promises and don't keep them",
      "Leave tasks undone that you said you'd handle",
      "Only help when asked, because they need you to pay attention without prompting"
    ]
  },
  gifts: {
    dos: [
      "Pick up something small that reminded you of them, even a candy bar or a flower",
      "Remember things they mentioned wanting and act on it, unprompted",
      "Mark meaningful occasions thoughtfully, because the thought matters more than the price",
      "Give them something that says \"I paid attention,\" like a book they mentioned",
      "Create a memento from a shared experience: a photo printed, a ticket saved"
    ],
    donts: [
      "Forget occasions that matter to them",
      "Give clearly generic or obligatory gifts",
      "Dismiss the importance of small gestures"
    ]
  }
};

const ACTION_MENU = {
  words: [
    "Send a voice note that says something specific you love about them, not a text but a voice note",
    "Leave a handwritten sticky note somewhere they'll find it after you're gone",
    "Say \"I'm proud of you\" out loud, unprompted, and mean it",
    "Text them in the middle of a random Tuesday just to say you were thinking of them",
    "Tell them one thing they do that you would genuinely miss if they stopped",
    "Thank them for something specific they did this week and name it clearly",
    "Say out loud what you find beautiful about them, not just physically",
    "Share a memory of a moment with them that made you think \"I'm so glad I have this person\"",
    "Read something they wrote, made, or shared and tell them what it meant to you",
    "Before you fall asleep tonight, say one true thing you love about who they are"
  ],
  time: [
    "Have a phone-free dinner with phones in another room and just the two of you",
    "Take a 20-minute walk together with nowhere to go and no agenda",
    "Ask one of these questions and actually listen: \"What's something you haven't told anyone lately?\"",
    "Cook a meal together with music on and no rushing",
    "Establish a tiny ritual that's just yours: morning coffee, evening walk, Sunday breakfast",
    "Watch something they've been wanting to watch, without your phone in your hand",
    "Drive somewhere together with no destination, just drive and talk",
    "Sit outside together after dark, say nothing, and just be there",
    "Revisit somewhere meaningful to your relationship: a first date spot, a favorite place",
    "Plan a no-phone hour and sit together, make something, play something, or just be present"
  ],
  touch: [
    "Give a real hug, not a pat, but a proper hug that you hold",
    "Reach for their hand during a movie or while you're sitting together",
    "Put a hand on their back when you walk past them in the kitchen",
    "Greet them when they come home and actually stop what you're doing",
    "Sit close enough to be touching when you're resting or watching something",
    "Give an unprompted shoulder rub, not as a lead-up to anything but just because",
    "Touch their face gently, just once, and mean it",
    "Hold hands when you walk somewhere, even just from the car to the door",
    "Stay physically close during a hard conversation instead of pulling away",
    "Fall asleep touching, because even just feet touching under the covers counts"
  ],
  service: [
    "Handle one task they've been putting off and do it quietly without announcement",
    "Fill their gas tank before they realize it needs it",
    "Make their coffee (or tea, or breakfast) exactly how they like it before they ask",
    "Take the task they dread most this week and just do it",
    "Book the thing, make the call, handle the appointment they've been meaning to schedule",
    "Clean or organize one space in your home they find stressful",
    "Handle bedtime, dinner, or another recurring task solo and tell them to rest",
    "Send them a text that says: \"Is there anything I can take off your plate today?\"",
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
    "Write their name on something small: a card, a box, or a personalized gesture",
    "Put together a playlist of songs that remind you of them and send it with a note",
    "The next time you travel anywhere, even briefly, bring something back"
  ]
};

const DATE_IDEAS = [
  { ll: "Words",   i1: "A 'love letter dinner': you each write the other a real letter and read them aloud over a meal", i2: "A memory jar date: each of you writes your 5 favorite memories on slips, then pull and read them together" },
  { ll: "Time",    i1: "A full tech-free evening: cook together, eat together, play a game, talk", i2: "A 'yes night': one partner plans the entire evening around what the other person loves most" },
  { ll: "Touch",   i1: "A slow evening at home with a long bath, a real massage, music, and no agenda", i2: "A stargazing night: lay outside, stay close, and talk about nothing and everything" },
  { ll: "Service", i1: "Each partner secretly handles three things the other has been putting off, then reveal them over dinner", i2: "A 'take care of you' date: one partner plans everything and handles everything, the other just receives" },
  { ll: "Gifts",   i1: "A scavenger hunt where each clue comes with a small meaningful gift", i2: "A 'box of us' date: you each bring 5 things that represent something about your relationship, then share them" }
];

const CHALLENGE_DAYS = [
  { day:1,  ll:"words",   action:"Send your partner a voice note, not a text. Tell them one specific thing you love about them. No multitasking. Just that." },
  { day:2,  ll:"service", action:"Handle one task your partner has been putting off. Do it without telling them first. Let them find it done." },
  { day:3,  ll:"time",    action:"Spend 20 minutes together tonight with no screens. Talk, play something, sit outside. No agenda." },
  { day:4,  ll:"gifts",   action:"Pick up something small for your partner today: their favorite snack, a drink, a little something. No occasion needed." },
  { day:5,  ll:"touch",   action:"Give your partner a real hug today. Not quick, but held for a full 6 seconds. No rushing." },
  { day:6,  ll:"words",   action:"Tell your partner out loud what you find most beautiful about who they are as a person, not just how they look." },
  { day:7,  ll:"time",    action:"Have a phone-free meal together. Phones in another room. Actually eat together and talk." },
  { day:8,  ll:"service", action:"Make their coffee, tea, or breakfast how they like it before they ask." },
  { day:9,  ll:"touch",   action:"Sit close enough to be touching while you watch something tonight and stay there." },
  { day:10, ll:"words",   action:"Leave a handwritten note somewhere unexpected: their bag, the mirror, their bedside table." },
  { day:11, ll:"gifts",   action:"Send a playlist you made for them: songs that remind you of them, of you both, or of this month." },
  { day:12, ll:"time",    action:"Ask your partner a question you've never asked before. Listen all the way through their answer." },
  { day:13, ll:"service", action:"Follow through completely on one thing you've been meaning to do for them. No more delay." },
  { day:14, ll:"touch",   action:"Reach for their hand today: in the car, on a walk, on the couch. Just reach for it." },
  { day:15, ll:"words",   action:"Say \"I'm proud of you\" today and tell them specifically why." },
  { day:16, ll:"gifts",   action:"Get them something you heard them mention once: proof that you were listening." },
  { day:17, ll:"time",    action:"Plan a small ritual that's just yours: morning coffee, evening walk, Sunday breakfast. Suggest it today." },
  { day:18, ll:"words",   action:"Ask your partner: \"Is there something I've been doing that hasn't been landing for you?\" Then listen without defending." },
  { day:19, ll:"touch",   action:"Greet your partner today like you mean it: stop what you're doing and actually greet them when they arrive." },
  { day:20, ll:"service", action:"Ask: \"Is there anything I can take off your plate today?\" and then do it, whatever the answer is." },
  { day:21, ll:"time",    action:"Revisit somewhere that means something to your relationship: a first date spot, a favorite place, or a meaningful drive." },
  { day:22, ll:"gifts",   action:"Create something for them: a printed photo, a written memory, a hand-drawn card. Something made, not bought." },
  { day:23, ll:"words",   action:"Share a memory of a moment with them that made you think: \"I'm so glad I have this person.\"" },
  { day:24, ll:"touch",   action:"Give an unprompted back rub or shoulder rub, not as a lead-up to anything but just because." },
  { day:25, ll:"service", action:"Plan an entire date or evening and handle every detail. They show up. You take care of everything." },
  { day:26, ll:"time",    action:"Spend an hour doing something your partner loves, not what you'd choose but what they would. Be fully present." },
  { day:27, ll:"words",   action:"Write your partner a letter, not a text but an actual written letter. Tell them what this month meant to you." },
  { day:28, ll:"gifts",   action:"Book an experience for you both: a class, a restaurant, a trip, a film. Give them something to look forward to." },
  { day:29, ll:"touch",   action:"Spend the evening physically close: cook together, watch something together, stay in contact all evening." },
  { day:30, ll:"together",action:"Sit together. Read your Day 1 intentions aloud. Talk about what shifted this month. Then complete the reflection page." }
];

// ─── STATE ───────────────────────────────────────────────────
const STATE_KEY = 'llw_v1';

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveState(state) {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch {}
}

let state = loadState() || {
  nameA: '',
  nameB: '',
  currentPage: 'cover',
  quizAnswersA: {},
  quizAnswersB: {},
  quizDoneA: false,
  quizDoneB: false,
  scoresA: {},
  scoresB: {},
  warmupA: '',
  warmupB: '',
  profileA: { primary: '', secondary: '', feels: '', secNotice: '', partnerDoes: '', wishUnderstood: '', showsThrough: '', partnerNeeds: '' },
  profileB: { primary: '', secondary: '', feels: '', secNotice: '', partnerDoes: '', wishUnderstood: '', showsThrough: '', partnerNeeds: '' },
  comparisonPrompts: { overlap: '', difference: '', misunderstood: '', opportunity: '', alreadyWell: '' },
  requestA: { ll: '', r1: '', r2: '', r3: '', mostMeans: '', sign: '' },
  requestB: { ll: '', r1: '', r2: '', r3: '', mostMeans: '', sign: '' },
  translationNote: '',
  dateNightA: { partnerLL: '', idea: '', feel_seen: '', prepare: '', want_to_feel: '', date: '' },
  dateNightB: { partnerLL: '', idea: '', feel_seen: '', prepare: '', want_to_feel: '', date: '' },
  barriersA: { difficult: '', family: '', naturally: '', belief: '', stretch: '' },
  barriersB: { difficult: '', family: '', naturally: '', belief: '', stretch: '' },
  commitA: { doRegularly: '', whenTired: '', remindMe: '' },
  commitB: { doRegularly: '', whenTired: '', remindMe: '' },
  challengeChecked: {},
  challengeNotes: {},
  intentionA: '',
  intentionB: '',
  challengeStartDate: '',
  reflectionA: { dayMeant: '', why: '', noticed: '', surprised: '', understand: '' },
  reflectionB: { dayMeant: '', why: '', noticed: '', surprised: '', understand: '' },
  reflectionTogether: { commitment: '' }
};

function persist() { saveState(state); }

// ─── HELPERS ─────────────────────────────────────────────────
function nameA() { return state.nameA || 'Partner A'; }
function nameB() { return state.nameB || 'Partner B'; }

function computeScores(answers) {
  const scores = { words:0, time:0, touch:0, service:0, gifts:0 };
  for (const [lang, keys] of Object.entries(SCORING_KEY)) {
    keys.forEach(({ q, c }) => {
      const ans = answers[q];
      if (ans && ans.toUpperCase() === c) scores[lang]++;
    });
  }
  return scores;
}

function getRankedScores(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ key: k, score: v, ...LL_INFO[k] }));
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const pg = document.getElementById('page-' + id);
  if (pg) pg.classList.add('active');
  const nb = document.querySelector('[data-page="' + id + '"]');
  if (nb) nb.classList.add('active');
  state.currentPage = id;
  persist();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSaved(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

function bindTextarea(el, stateObj, key, savedId) {
  if (!el) return;
  el.value = stateObj[key] || '';
  el.addEventListener('input', () => {
    stateObj[key] = el.value;
    persist();
    if (savedId) showSaved(savedId);
  });
}

function bindInput(el, stateObj, key) {
  if (!el) return;
  el.value = stateObj[key] || '';
  el.addEventListener('input', () => { stateObj[key] = el.value; persist(); });
}

// ─── RENDER NAV ──────────────────────────────────────────────
function renderNav() {
  const hasNames = state.nameA && state.nameB;
  return `
  <nav class="app-nav" id="main-nav">
    <span class="nav-logo">Love Languages<span>Workbook</span></span>
    <div class="nav-divider"></div>
    <button class="nav-btn ${state.currentPage==='cover'?'active':''}" data-page="cover" onclick="showPage('cover')">
      <span class="nav-icon">🌸</span> Home
    </button>
    <button class="nav-btn ${state.currentPage==='howto'?'active':''}" data-page="howto" onclick="showPage('howto')">
      <span class="nav-icon">📖</span> How To Use
    </button>
    <button class="nav-btn ${state.currentPage==='quiz'?'active':''}" data-page="quiz" onclick="showPage('quiz')">
      <span class="nav-icon">✏️</span> Take the Quiz
    </button>
    <button class="nav-btn ${state.currentPage==='results'?'active':''}" data-page="results" onclick="showPage('results')">
      <span class="nav-icon">💡</span> Results
    </button>
    <button class="nav-btn ${state.currentPage==='understand'?'active':''}" data-page="understand" onclick="showPage('understand')">
      <span class="nav-icon">🗺️</span> Understand Each Other
    </button>
    <button class="nav-btn ${state.currentPage==='daily'?'active':''}" data-page="daily" onclick="showPage('daily')">
      <span class="nav-icon">🌿</span> Apply Daily
    </button>
    <button class="nav-btn ${state.currentPage==='challenge'?'active':''}" data-page="challenge" onclick="showPage('challenge')">
      <span class="nav-icon">🌟</span> 30-Day Challenge
    </button>
  </nav>`;
}

// ─── RENDER COVER ────────────────────────────────────────────
function renderCover() {
  return `
  <div class="page ${state.currentPage==='cover'?'active':''}" id="page-cover">
    <div class="cover">
      <p class="cover-eyebrow">The Clarity Desk</p>
      <h1 class="cover-title">The Love Languages<br><em>Workbook</em></h1>
      <p class="cover-subtitle">Discover how you give and receive love and transform your relationship together.</p>
      <div class="cover-pills">
        <span class="pill pill-words">💬 Words</span>
        <span class="pill pill-time">⏱ Time</span>
        <span class="pill pill-touch">🤝 Touch</span>
        <span class="pill pill-service">🛠 Service</span>
        <span class="pill pill-gifts">🎁 Gifts</span>
      </div>
      <div class="name-card">
        <h2>Let's make this personal</h2>
        <p>Enter both names so this workbook speaks directly to you.</p>
        <div class="name-row">
          <div class="name-field">
            <label>Your name</label>
            <input type="text" id="input-nameA" placeholder="e.g. Jamie" value="${escHtml(state.nameA)}" />
          </div>
          <div class="name-field">
            <label>Your partner's name</label>
            <input type="text" id="input-nameB" placeholder="e.g. Alex" value="${escHtml(state.nameB)}" />
          </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="handleBegin()">
          Begin Our Journey ✦
        </button>
        ${state.nameA && state.nameB ? `<p class="text-muted mt-2 text-center">Welcome back, ${escHtml(state.nameA)} &amp; ${escHtml(state.nameB)}.</p>` : ''}
      </div>
    </div>
  </div>`;
}

function handleBegin() {
  const a = document.getElementById('input-nameA').value.trim();
  const b = document.getElementById('input-nameB').value.trim();
  if (!a || !b) { alert('Please enter both names to begin.'); return; }
  state.nameA = a; state.nameB = b; persist();
  renderApp();
  showPage('howto');
}

// ─── RENDER HOW TO USE ───────────────────────────────────────
function renderHowTo() {
  return `
  <div class="page ${state.currentPage==='howto'?'active':''}" id="page-howto">
    <div class="section-page">
      <div class="section-header">
        <span class="section-tag">Getting Started</span>
        <h1>How to Use This <em>Workbook</em></h1>
        <p>Four guidelines to get the most from this experience.</p>
      </div>
      <ul class="guideline-list">
        <li class="guideline-item">
          <div class="guideline-num">1</div>
          <div>
            <strong>Complete your quiz independently before comparing answers.</strong>
            <p>Resist the urge to peek at each other's responses. The quiz works best when your answers come from your own honest experience, not from anticipating what your partner might say.</p>
          </div>
        </li>
        <li class="guideline-item">
          <div class="guideline-num">2</div>
          <div>
            <strong>There are no right or wrong love languages.</strong>
            <p>All five are valid, meaningful, and beautiful. The goal isn't to rank your language above your partner's. It is to understand that both of your needs are real, legitimate, and worth meeting.</p>
          </div>
        </li>
        <li class="guideline-item">
          <div class="guideline-num">3</div>
          <div>
            <strong>Revisit this workbook once a year.</strong>
            <p>Your primary love language can shift over time, during major life changes, seasons of stress, or new chapters in your relationship. What you need at 28 may be different from what you need at 38.</p>
          </div>
        </li>
        <li class="guideline-item">
          <div class="guideline-num">4</div>
          <div>
            <strong>Use this as a starting point for conversation, not a final verdict.</strong>
            <p>Your quiz result is a compass, not a cage. Use it to open doors, not close them.</p>
          </div>
        </li>
      </ul>

      <div class="card card-warm mb-3">
        <h3>A Note on Primary &amp; Secondary Languages</h3>
        <p style="color:var(--textMid); font-size:0.92rem; margin-top:0.5rem;">Most people have one dominant love language that when spoken fluently makes them feel most seen and deeply loved. But almost everyone also has a secondary language. As you work through this workbook, pay attention to both. Your primary language is what you need most consistently. Your secondary language often becomes more important during specific seasons, including stress, transition, and grief.</p>
      </div>

      <div class="card">
        <h2 style="margin-bottom:1rem;">Warm-Up Prompt</h2>
        <p class="text-muted mb-2">Take a moment before diving into the quiz. Each partner answers independently:</p>
        <p class="italic mb-3" style="color:var(--brown); font-family:'Playfair Display',serif;">"Right now, the way I most feel loved is..."</p>
        <div class="warmup-grid">
          <div class="field-group">
            <label class="field-label">${escHtml(nameA())}'s answer</label>
            <textarea id="warmup-a" rows="3" placeholder="Write freely here..."></textarea>
          </div>
          <div class="field-group">
            <label class="field-label">${escHtml(nameB())}'s answer</label>
            <textarea id="warmup-b" rows="3" placeholder="Write freely here..."></textarea>
          </div>
        </div>
        <span class="saved-indicator" id="saved-warmup">✓ Saved</span>
      </div>

      <div class="card ll-guide-card" style="border:none; padding:1.5rem 2rem; background:var(--white);">
        <h2 style="margin-bottom:1.2rem;">The Five Love Languages</h2>
        <div class="ll-guide-grid">
          ${Object.entries(LL_INFO).map(([k, ll]) => `
          <div class="ll-guide-card ${ll.cls}">
            <div class="ll-header">
              <span class="ll-icon">${ll.icon}</span>
              <span class="ll-name">${ll.label}</span>
            </div>
            <p>${LL_DESCRIPTIONS[k].full.substring(0,160)}...</p>
            <p class="ll-looks"><strong>Needs:</strong> ${LL_DESCRIPTIONS[k].needs.substring(0,120)}...</p>
          </div>`).join('')}
        </div>
      </div>

      <div class="flex-row mt-3" style="justify-content:flex-end;">
        <button class="btn btn-primary" onclick="showPage('quiz')">Take the Quiz &rarr;</button>
      </div>
    </div>
  </div>`;
}

function bindWarmupFields() {
  bindTextarea(document.getElementById('warmup-a'), state, 'warmupA', 'saved-warmup');
  bindTextarea(document.getElementById('warmup-b'), state, 'warmupB', 'saved-warmup');
}

// ─── RENDER QUIZ ─────────────────────────────────────────────
let quizPartner = 'A'; // which partner is taking the quiz right now
let quizCurrentQ = 1;

function renderQuiz() {
  return `
  <div class="page ${state.currentPage==='quiz'?'active':''}" id="page-quiz">
    <div class="section-page">
      <div class="section-header">
        <span class="section-tag">Section One</span>
        <h1>Discover Your Love <em>Language</em></h1>
        <p>Take the quiz independently. 20 questions. No right or wrong answers.</p>
      </div>
      <div class="quiz-partner-toggle">
        <button class="partner-tab ${quizPartner==='A'?'active':''}" id="tab-partnerA" onclick="switchQuizPartner('A')">
          ${escHtml(nameA())}
          ${state.quizDoneA ? ' ✓' : ''}
        </button>
        <button class="partner-tab ${quizPartner==='B'?'active':''}" id="tab-partnerB" onclick="switchQuizPartner('B')">
          ${escHtml(nameB())}
          ${state.quizDoneB ? ' ✓' : ''}
        </button>
      </div>
      <div id="quiz-body"></div>
    </div>
  </div>`;
}

function switchQuizPartner(p) {
  quizPartner = p;
  quizCurrentQ = 1;
  document.querySelectorAll('.partner-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-partner' + p).classList.add('active');
  renderQuizBody();
}

function renderQuizBody() {
  const answers = quizPartner === 'A' ? state.quizAnswersA : state.quizAnswersB;
  const done    = quizPartner === 'A' ? state.quizDoneA  : state.quizDoneB;
  const pName   = quizPartner === 'A' ? nameA() : nameB();

  if (done) {
    const scores = quizPartner === 'A' ? state.scoresA : state.scoresB;
    const ranked = getRankedScores(scores);
    document.getElementById('quiz-body').innerHTML = `
      <div class="card" style="text-align:center; padding:2.5rem;">
        <div style="font-size:2.5rem; margin-bottom:1rem;">🎉</div>
        <h2 style="margin-bottom:0.5rem;">${escHtml(pName)}'s quiz is complete!</h2>
        <p class="text-muted mb-3">Primary language: <strong>${LL_INFO[ranked[0].key].icon} ${ranked[0].label}</strong></p>
        <div class="score-bars">
          ${ranked.map(r => `
          <div class="score-bar-row">
            <span class="score-bar-label">${r.icon} ${r.label}</span>
            <div class="score-bar-track"><div class="score-bar-fill" style="width:${(r.score/8*100).toFixed(0)}%; background:${r.color};"></div></div>
            <span class="score-bar-num">${r.score}</span>
          </div>`).join('')}
        </div>
        <div class="flex-row mt-3" style="justify-content:center; gap:0.75rem; flex-wrap:wrap;">
          <button class="btn btn-ghost btn-sm" onclick="retakeQuiz('${quizPartner}')">Retake Quiz</button>
          <button class="btn btn-primary" onclick="showPage('results')">See Full Results &rarr;</button>
        </div>
      </div>`;
    return;
  }

  const q = QUIZ_QUESTIONS[quizCurrentQ - 1];
  const answered = Object.keys(answers).length;
  const pct = Math.round(answered / 20 * 100);

  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width:${pct}%"></div>
    </div>
    <div class="quiz-question-card">
      <div class="quiz-q-num">${escHtml(pName)} &bull; Question ${quizCurrentQ} of 20</div>
      <div class="quiz-options">
        <div class="quiz-option ${answers[quizCurrentQ]==='A'?'selected':''}" onclick="selectAnswer('A')">
          <div class="quiz-option-letter">A</div>
          <div class="quiz-option-text">${escHtml(q.a)}</div>
        </div>
        <div class="quiz-option ${answers[quizCurrentQ]==='B'?'selected':''}" onclick="selectAnswer('B')">
          <div class="quiz-option-letter">B</div>
          <div class="quiz-option-text">${escHtml(q.b)}</div>
        </div>
      </div>
    </div>
    <div class="quiz-nav-row">
      <button class="btn btn-ghost btn-sm" onclick="quizPrev()" ${quizCurrentQ===1?'disabled':''}>
        &larr; Previous
      </button>
      <span class="quiz-counter">${answered} / 20 answered</span>
      ${quizCurrentQ < 20
        ? `<button class="btn btn-primary btn-sm" onclick="quizNext()">Next &rarr;</button>`
        : `<button class="btn btn-primary btn-sm" onclick="quizSubmit()" ${answered<20?'disabled':''}>Submit Quiz</button>`
      }
    </div>`;
}

function selectAnswer(choice) {
  const answers = quizPartner === 'A' ? state.quizAnswersA : state.quizAnswersB;
  answers[quizCurrentQ] = choice;
  persist();
  renderQuizBody();
  // auto-advance after a short delay
  if (quizCurrentQ < 20) {
    setTimeout(() => { quizCurrentQ++; renderQuizBody(); }, 320);
  }
}

function quizNext() {
  if (quizCurrentQ < 20) { quizCurrentQ++; renderQuizBody(); }
}
function quizPrev() {
  if (quizCurrentQ > 1) { quizCurrentQ--; renderQuizBody(); }
}

function quizSubmit() {
  const answers = quizPartner === 'A' ? state.quizAnswersA : state.quizAnswersB;
  if (Object.keys(answers).length < 20) { alert('Please answer all 20 questions before submitting.'); return; }
  const scores = computeScores(answers);
  if (quizPartner === 'A') { state.scoresA = scores; state.quizDoneA = true; }
  else                     { state.scoresB = scores; state.quizDoneB = true; }
  persist();
  renderQuizBody();
}

function retakeQuiz(p) {
  if (!confirm('Retake the quiz for ' + (p==='A'?nameA():nameB()) + '? Your previous answers will be cleared.')) return;
  if (p === 'A') { state.quizAnswersA = {}; state.quizDoneA = false; state.scoresA = {}; }
  else           { state.quizAnswersB = {}; state.quizDoneB = false; state.scoresB = {}; }
  persist();
  quizCurrentQ = 1;
  renderQuizBody();
}

// ─── RENDER RESULTS ──────────────────────────────────────────
function renderResults() {
  return `
  <div class="page ${state.currentPage==='results'?'active':''}" id="page-results">
    <div class="section-page">
      <div class="section-header">
        <span class="section-tag">Section One</span>
        <h1>Your <em>Results</em></h1>
        <p>What your love language says about how you love and how you need to be loved.</p>
      </div>
      ${(!state.quizDoneA && !state.quizDoneB) ? `
        <div class="card card-warm text-center">
          <p style="font-size:1.1rem; color:var(--brown); font-family:'Playfair Display',serif; margin-bottom:1rem;">No quiz results yet.</p>
          <p class="text-muted mb-3">Complete the quiz first to see your results here.</p>
          <button class="btn btn-primary" onclick="showPage('quiz')">Take the Quiz &rarr;</button>
        </div>` : renderResultsContent()}
    </div>
  </div>`;
}

function renderResultsContent() {
  let html = '';

  // Partner tabs
  html += `<div class="tab-row">
    <button class="tab-btn active" id="result-tab-A" onclick="switchResultTab('A')">${escHtml(nameA())}</button>
    <button class="tab-btn" id="result-tab-B" onclick="switchResultTab('B')">${escHtml(nameB())}</button>
    ${state.quizDoneA && state.quizDoneB ? `<button class="tab-btn" id="result-tab-both" onclick="switchResultTab('both')">Side by Side</button>` : ''}
  </div>
  <div id="result-panels">`;

  // Partner A panel
  html += `<div class="tab-panel active" id="result-panel-A">` + renderResultPanel('A') + `</div>`;
  html += `<div class="tab-panel" id="result-panel-B">` + renderResultPanel('B') + `</div>`;

  if (state.quizDoneA && state.quizDoneB) {
    html += `<div class="tab-panel" id="result-panel-both">` + renderSideBySide() + `</div>`;
  }

  html += `</div>`;

  // Profile reflection
  html += `
    <div class="ornament-divider">✦ ✦ ✦</div>
    <h2 style="font-size:1.5rem; color:var(--brown); margin-bottom:0.5rem;">My Love Language Profile</h2>
    <p class="text-muted mb-3">Complete this individually after reviewing your quiz results.</p>
    <div class="profile-grid">
      ${renderProfileCard('A')}
      ${renderProfileCard('B')}
    </div>
    <div class="flex-row mt-3" style="justify-content:flex-end;">
      <button class="btn btn-primary" onclick="showPage('understand')">Understand Each Other &rarr;</button>
    </div>`;

  return html;
}

function renderResultPanel(p) {
  const done   = p === 'A' ? state.quizDoneA   : state.quizDoneB;
  const scores = p === 'A' ? state.scoresA     : state.scoresB;
  const pName  = p === 'A' ? nameA()           : nameB();

  if (!done) return `<div class="card card-warm text-center"><p class="text-muted">${escHtml(pName)} hasn't completed the quiz yet.</p><button class="btn btn-primary btn-sm mt-2" onclick="showPage('quiz')">Take the Quiz</button></div>`;

  const ranked = getRankedScores(scores);
  const primary   = ranked[0];
  const secondary = ranked[1];
  const desc = LL_DESCRIPTIONS[primary.key];

  return `
    <div class="partner-badge">🌸 ${escHtml(pName)}</div>
    <div class="results-grid">
      ${ranked.map((r, i) => `
      <div class="result-score-card">
        <div class="rs-icon">${r.icon}</div>
        <div class="rs-label">${i===0?'Primary':'Secondary'} Language</div>
        <div class="rs-name">${r.label}</div>
        <div class="rs-score">${r.score}</div>
        <span class="rs-badge ${i===0?'result-primary-badge':'result-secondary-badge'}">${i===0?'Primary':'Secondary'}</span>
      </div>`).join('')}
    </div>
    <div class="score-bars mb-3" style="background:var(--white);border-radius:var(--radius);padding:1.5rem;box-shadow:0 2px 14px var(--shadow);">
      <h3 style="font-size:1rem;color:var(--brown);margin-bottom:1rem;">Full Score Breakdown</h3>
      ${ranked.map(r => `
      <div class="score-bar-row">
        <span class="score-bar-label">${r.icon} ${r.label}</span>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${(r.score/8*100).toFixed(0)}%;background:${r.color};"></div></div>
        <span class="score-bar-num">${r.score}</span>
      </div>`).join('')}
    </div>
    <div class="result-description">
      <h3>${primary.icon} ${primary.label}: What This Means for ${escHtml(pName)}</h3>
      <p>${escHtml(desc.full)}</p>
      <p><strong style="color:var(--brown);">Needs:</strong> ${escHtml(desc.needs)}</p>
      <p><strong style="color:var(--rose);">What can hurt most:</strong> ${escHtml(desc.hurt)}</p>
      <div class="result-quote">${escHtml(desc.quote)}</div>
    </div>
    ${secondary ? `
    <div class="result-description" style="border-top-color:${LL_INFO[secondary.key].color};">
      <h3>${secondary.icon} Secondary: ${secondary.label}</h3>
      <p>${escHtml(LL_DESCRIPTIONS[secondary.key].full)}</p>
    </div>` : ''}`;
}

function renderSideBySide() {
  const rankedA = getRankedScores(state.scoresA);
  const rankedB = getRankedScores(state.scoresB);

  return `
    <div class="card" style="margin-bottom:1.2rem;">
      <h3 style="margin-bottom:1rem;">Score Comparison</h3>
      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot" style="background:var(--rose);"></div>${escHtml(nameA())}</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--sage);"></div>${escHtml(nameB())}</div>
      </div>
      <canvas id="compChart" height="220"></canvas>
    </div>
    <div class="results-grid">
      <div class="card-sm" style="background:var(--white);border-radius:var(--radius);padding:1.5rem;box-shadow:0 2px 14px var(--shadow);">
        <div class="partner-badge">🌸 ${escHtml(nameA())}</div>
        <p><strong>Primary:</strong> ${rankedA[0].icon} ${rankedA[0].label}</p>
        <p><strong>Secondary:</strong> ${rankedA[1].icon} ${rankedA[1].label}</p>
      </div>
      <div class="card-sm" style="background:var(--white);border-radius:var(--radius);padding:1.5rem;box-shadow:0 2px 14px var(--shadow);">
        <div class="partner-badge">🌿 ${escHtml(nameB())}</div>
        <p><strong>Primary:</strong> ${rankedB[0].icon} ${rankedB[0].label}</p>
        <p><strong>Secondary:</strong> ${rankedB[1].icon} ${rankedB[1].label}</p>
      </div>
    </div>`;
}

function renderProfileCard(p) {
  const pName  = p === 'A' ? nameA() : nameB();
  const profile = p === 'A' ? state.profileA : state.profileB;
  const sid = 'saved-profile-' + p;
  return `
    <div class="card">
      <div class="partner-badge">${p==='A'?'🌸':'🌿'} ${escHtml(pName)}</div>
      <div class="field-group">
        <label class="field-label">My primary love language is</label>
        <input class="styled-input" id="profile-${p}-primary" value="${escHtml(profile.primary)}" placeholder="e.g. Quality Time" />
      </div>
      <div class="field-group">
        <label class="field-label">I feel most loved after...</label>
        <textarea id="profile-${p}-feels" rows="2" placeholder="Describe a specific moment or gesture...">${escHtml(profile.feels)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">My secondary language is</label>
        <input class="styled-input" id="profile-${p}-secondary" value="${escHtml(profile.secondary)}" placeholder="e.g. Words of Affirmation" />
      </div>
      <div class="field-group">
        <label class="field-label">I notice it when...</label>
        <textarea id="profile-${p}-secNotice" rows="2" placeholder="...">${escHtml(profile.secNotice)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">Something my partner does that perfectly speaks my language is...</label>
        <textarea id="profile-${p}-partnerDoes" rows="2" placeholder="...">${escHtml(profile.partnerDoes)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">Something I wish my partner understood about how I need to feel loved is...</label>
        <textarea id="profile-${p}-wishUnderstood" rows="2" placeholder="...">${escHtml(profile.wishUnderstood)}</textarea>
      </div>
      <span class="saved-indicator" id="${sid}">✓ Saved</span>
    </div>`;
}

function switchResultTab(t) {
  document.querySelectorAll('[id^="result-tab-"]').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('[id^="result-panel-"]').forEach(p => p.classList.remove('active'));
  const tb = document.getElementById('result-tab-' + t);
  const pn = document.getElementById('result-panel-' + t);
  if (tb) tb.classList.add('active');
  if (pn) {
    pn.classList.add('active');
    if (t === 'both') setTimeout(drawCompChart, 50);
  }
}

function drawCompChart() {
  const canvas = document.getElementById('compChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const labels = Object.values(LL_INFO).map(l => l.label);
  const dataA  = Object.keys(LL_INFO).map(k => (state.scoresA[k] || 0));
  const dataB  = Object.keys(LL_INFO).map(k => (state.scoresB[k] || 0));

  if (canvas._chart) canvas._chart.destroy();
  canvas._chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: nameA(), data: dataA, backgroundColor: 'rgba(201,123,99,0.75)', borderColor: '#c97b63', borderWidth: 2, borderRadius: 6 },
        { label: nameB(), data: dataB, backgroundColor: 'rgba(138,172,142,0.75)', borderColor: '#8aac8e', borderWidth: 2, borderRadius: 6 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, max: 8, ticks: { stepSize: 1 }, grid: { color: '#f3d9c4' } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

function bindProfileFields() {
  ['A','B'].forEach(p => {
    const profile = p === 'A' ? state.profileA : state.profileB;
    const sid = 'saved-profile-' + p;
    ['primary','secondary','feels','secNotice','partnerDoes','wishUnderstood'].forEach(key => {
      const el = document.getElementById(`profile-${p}-${key}`);
      if (!el) return;
      el.value = profile[key] || '';
      el.addEventListener('input', () => { profile[key] = el.value; persist(); showSaved(sid); });
    });
  });
}

// ─── RENDER UNDERSTAND ───────────────────────────────────────
function renderUnderstand() {
  const cp = state.comparisonPrompts;
  return `
  <div class="page ${state.currentPage==='understand'?'active':''}" id="page-understand">
    <div class="section-page">
      <div class="section-header">
        <span class="section-tag">Section Two</span>
        <h1>Understand Your <em>Partner</em></h1>
        <p>Complete this section together, after both of you have finished your individual quizzes.</p>
      </div>

      ${(state.quizDoneA && state.quizDoneB) ? renderComparisonMap() : `
        <div class="card card-warm text-center mb-3">
          <p class="text-muted">Complete both quizzes first to unlock the comparison map.</p>
          <button class="btn btn-primary btn-sm mt-2" onclick="showPage('quiz')">Go to Quiz</button>
        </div>`}

      <div class="card mt-3">
        <h2 style="margin-bottom:1rem;">What Does Your Map Tell You?</h2>
        <p class="text-muted mb-3">Complete these prompts together:</p>

        <div class="field-group">
          <label class="field-label">Our love languages overlap on...</label>
          <textarea id="cp-overlap" rows="2" placeholder="e.g. We both value quality time...">${escHtml(cp.overlap)}</textarea>
        </div>
        <div class="field-group">
          <label class="field-label">Our biggest difference is that ${escHtml(nameA())} needs ___ but ${escHtml(nameB())} most naturally gives...</label>
          <textarea id="cp-difference" rows="2" placeholder="...">${escHtml(cp.difference)}</textarea>
        </div>
        <div class="field-group">
          <label class="field-label">This explains why we've sometimes misunderstood each other when...</label>
          <textarea id="cp-misunderstood" rows="2" placeholder="...">${escHtml(cp.misunderstood)}</textarea>
        </div>
        <div class="field-group">
          <label class="field-label">Looking at this map, our biggest opportunity to grow closer is...</label>
          <textarea id="cp-opportunity" rows="2" placeholder="...">${escHtml(cp.opportunity)}</textarea>
        </div>
        <div class="field-group">
          <label class="field-label">Something this map confirms that we already do well is...</label>
          <textarea id="cp-alreadyWell" rows="2" placeholder="...">${escHtml(cp.alreadyWell)}</textarea>
        </div>
        <span class="saved-indicator" id="saved-cp">✓ Saved</span>
      </div>

      <div class="ornament-divider">✦ ✦ ✦</div>

      <h2 style="font-size:1.5rem; color:var(--brown); margin-bottom:0.5rem;">The Love Language Translation Guide</h2>
      <p class="text-muted mb-3">The "translation gap" is what happens when you love your partner in your language instead of theirs. Use this as your decoder.</p>

      <div class="mb-3">
        ${Object.entries(LL_INFO).map(([k, ll]) => renderTransCard(k, ll)).join('')}
      </div>

      <div class="card mb-3">
        <h3 style="margin-bottom:0.8rem;">The most important thing I learned about how to love my partner better is...</h3>
        <textarea id="translation-note" rows="3" placeholder="Your reflection here...">${escHtml(state.translationNote)}</textarea>
        <span class="saved-indicator" id="saved-tnote">✓ Saved</span>
      </div>

      <div class="ornament-divider">✦ ✦ ✦</div>

      <h2 style="font-size:1.5rem; color:var(--brown); margin-bottom:0.5rem;">Speak My Language</h2>
      <p class="text-muted mb-3">Fill out your request card independently, then share them with each other.</p>
      <div class="request-grid">
        ${renderRequestCard('A')}
        ${renderRequestCard('B')}
      </div>

      <div class="flex-row mt-3" style="justify-content:flex-end;">
        <button class="btn btn-primary" onclick="showPage('daily')">Apply It Daily &rarr;</button>
      </div>
    </div>
  </div>`;
}

function renderComparisonMap() {
  const rankedA = getRankedScores(state.scoresA);
  const rankedB = getRankedScores(state.scoresB);
  const llKeys  = Object.keys(LL_INFO);

  return `
    <div class="chart-container">
      <h2 style="margin-bottom:0.8rem;">The Love Language Comparison Map</h2>
      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot" style="background:var(--rose);"></div>${escHtml(nameA())}</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--sage);"></div>${escHtml(nameB())}</div>
      </div>
      <canvas id="compareChart" height="240"></canvas>
    </div>
    <div class="results-grid mb-3">
      <div class="card-sm" style="background:var(--white);border-radius:var(--radius);padding:1.3rem;box-shadow:0 2px 12px var(--shadow);">
        <div class="partner-badge">🌸 ${escHtml(nameA())}</div>
        <p><strong>Primary:</strong> ${rankedA[0].icon} ${rankedA[0].label}</p>
        <p><strong>Secondary:</strong> ${rankedA[1].icon} ${rankedA[1].label}</p>
      </div>
      <div class="card-sm" style="background:var(--white);border-radius:var(--radius);padding:1.3rem;box-shadow:0 2px 12px var(--shadow);">
        <div class="partner-badge">🌿 ${escHtml(nameB())}</div>
        <p><strong>Primary:</strong> ${rankedB[0].icon} ${rankedB[0].label}</p>
        <p><strong>Secondary:</strong> ${rankedB[1].icon} ${rankedB[1].label}</p>
      </div>
    </div>`;
}

function renderTransCard(k, ll) {
  const guide = TRANSLATION_GUIDE[k];
  return `
    <div class="trans-card ${ll.cls}" id="trans-${k}">
      <div class="trans-card-header" onclick="toggleTrans('${k}')">
        <span style="font-size:1.3rem;">${ll.icon}</span>
        <h3>${ll.label}</h3>
        <span class="trans-chevron">▼</span>
      </div>
      <div class="trans-card-body">
        <p style="font-size:0.87rem;color:var(--textMid);margin-bottom:0.8rem;">If your partner's language is ${ll.label}, they feel loved when you...</p>
        <div class="dos-donts">
          <div>
            <div class="list-header">They feel loved when you</div>
            <ul class="dos-list">${guide.dos.map(d => `<li>${escHtml(d)}</li>`).join('')}</ul>
          </div>
          <div>
            <div class="list-header">They may feel overlooked when you</div>
            <ul class="donts-list">${guide.donts.map(d => `<li>${escHtml(d)}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    </div>`;
}

function toggleTrans(k) {
  document.getElementById('trans-' + k).classList.toggle('open');
}

function renderRequestCard(p) {
  const pName = p === 'A' ? nameA() : nameB();
  const req   = p === 'A' ? state.requestA : state.requestB;
  const sid   = 'saved-req-' + p;
  return `
    <div class="request-card">
      <div class="partner-badge">${p==='A'?'🌸':'🌿'} ${escHtml(pName)}</div>
      <h3 style="margin-bottom:1rem;">A Request Card from ${escHtml(pName)}</h3>
      <div class="field-group">
        <label class="field-label">My love language is</label>
        <input class="styled-input" id="req-${p}-ll" value="${escHtml(req.ll)}" placeholder="e.g. Quality Time" />
      </div>
      <p style="font-size:0.85rem; color:var(--textMid); margin-bottom:0.7rem;">This week, you could speak my language by:</p>
      ${[1,2,3].map(n => `
      <div class="request-item">
        <div class="request-num">${n}</div>
        <input id="req-${p}-r${n}" value="${escHtml(req['r'+n])}" placeholder="One specific thing..." />
      </div>`).join('')}
      <div class="field-group mt-2">
        <label class="field-label">The one thing that would mean the most to me right now is...</label>
        <textarea id="req-${p}-mostMeans" rows="2" placeholder="...">${escHtml(req.mostMeans)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">Signed with love</label>
        <input class="styled-input" id="req-${p}-sign" value="${escHtml(req.sign)}" placeholder="${escHtml(pName)}" />
      </div>
      <span class="saved-indicator" id="${sid}">✓ Saved</span>
    </div>`;
}

function bindUnderstandFields() {
  const cp = state.comparisonPrompts;
  ['overlap','difference','misunderstood','opportunity','alreadyWell'].forEach(k => {
    bindTextarea(document.getElementById('cp-' + k), cp, k, 'saved-cp');
  });
  bindTextarea(document.getElementById('translation-note'), state, 'translationNote', 'saved-tnote');
  ['A','B'].forEach(p => {
    const req = p === 'A' ? state.requestA : state.requestB;
    const sid = 'saved-req-' + p;
    ['ll','r1','r2','r3','mostMeans','sign'].forEach(k => {
      const el = document.getElementById('req-' + p + '-' + k);
      if (!el) return;
      el.value = req[k] || '';
      el.addEventListener('input', () => { req[k] = el.value; persist(); showSaved(sid); });
    });
  });
  if (state.quizDoneA && state.quizDoneB) setTimeout(drawUnderstandChart, 80);
}

function drawUnderstandChart() {
  const canvas = document.getElementById('compareChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const labels = Object.values(LL_INFO).map(l => l.label);
  const dataA  = Object.keys(LL_INFO).map(k => (state.scoresA[k] || 0));
  const dataB  = Object.keys(LL_INFO).map(k => (state.scoresB[k] || 0));

  if (canvas._chart) canvas._chart.destroy();
  canvas._chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: nameA(), data: dataA, backgroundColor: 'rgba(201,123,99,0.75)', borderColor: '#c97b63', borderWidth: 2, borderRadius: 6 },
        { label: nameB(), data: dataB, backgroundColor: 'rgba(138,172,142,0.75)', borderColor: '#8aac8e', borderWidth: 2, borderRadius: 6 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { font: { family: 'Inter', size: 12 }, color: '#7a5c50' } } },
      scales: {
        y: { beginAtZero: true, max: 8, ticks: { stepSize: 1 }, grid: { color: '#f3d9c4' } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

// ─── RENDER DAILY ────────────────────────────────────────────
let actionFilter = 'all';

function renderDaily() {
  return `
  <div class="page ${state.currentPage==='daily'?'active':''}" id="page-daily">
    <div class="section-page">
      <div class="section-header">
        <span class="section-tag">Section Three</span>
        <h1>Apply It <em>Daily</em></h1>
        <p>From insight to action. Choose one thing today.</p>
      </div>

      <h2 style="font-size:1.4rem; color:var(--brown); margin-bottom:0.5rem;">Love Language Action Menu</h2>
      <p class="text-muted mb-3">Fifty small acts. All five languages. Choose one today.</p>

      <div class="action-filter-row" id="action-filters">
        <button class="filter-btn ${actionFilter==='all'?'active-all':''}" onclick="setActionFilter('all')">All</button>
        <button class="filter-btn ${actionFilter==='words'?'active-words':''}" onclick="setActionFilter('words')">💬 Words</button>
        <button class="filter-btn ${actionFilter==='time'?'active-time':''}" onclick="setActionFilter('time')">⏱ Time</button>
        <button class="filter-btn ${actionFilter==='touch'?'active-touch':''}" onclick="setActionFilter('touch')">🤝 Touch</button>
        <button class="filter-btn ${actionFilter==='service'?'active-service':''}" onclick="setActionFilter('service')">🛠 Service</button>
        <button class="filter-btn ${actionFilter==='gifts'?'active-gifts':''}" onclick="setActionFilter('gifts')">🎁 Gifts</button>
      </div>
      <div class="action-grid" id="action-grid">
        ${renderActionItems()}
      </div>

      <div class="ornament-divider">✦ ✦ ✦</div>

      <h2 style="font-size:1.4rem; color:var(--brown); margin-bottom:0.5rem;">The Love Language Date Night</h2>
      <p class="text-muted mb-3" style="font-style:italic;">"The most meaningful dates aren't the most expensive. They're the ones that speak directly to your partner's heart."</p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;" class="date-grid">
        ${renderDateNightCard('A')}
        ${renderDateNightCard('B')}
      </div>

      <div class="card mb-3">
        <h3 style="margin-bottom:0.8rem;">Date Night Idea Generator</h3>
        <p class="text-muted mb-2">Use these for inspiration or steal them exactly as written.</p>
        <div style="overflow-x:auto;">
          <table class="date-idea-table">
            <thead><tr><th>Language</th><th>Idea One</th><th>Idea Two</th></tr></thead>
            <tbody>
              ${DATE_IDEAS.map(d => `<tr><td><strong>${d.ll}</strong></td><td>${escHtml(d.i1)}</td><td>${escHtml(d.i2)}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="ornament-divider">✦ ✦ ✦</div>

      <h2 style="font-size:1.4rem; color:var(--brown); margin-bottom:0.5rem;">Love Language Barriers</h2>
      <p class="text-muted mb-3">Knowing your partner's love language is only half the journey. This page is for the honest work.</p>
      <div class="barriers-grid">
        ${renderBarriersCard('A')}
        ${renderBarriersCard('B')}
      </div>

      <div class="ornament-divider">✦ ✦ ✦</div>

      <h2 style="font-size:1.4rem; color:var(--brown); margin-bottom:0.5rem;">Our Love Language Commitments</h2>
      <p class="text-muted mb-3">Written to each other. Signed by both of you. Kept as a record.</p>
      <div class="commitment-grid">
        ${renderCommitmentCard('A')}
        ${renderCommitmentCard('B')}
      </div>
      <div class="commitment-together">
        <blockquote>"We will learn each other's language, not perfectly, but persistently. We will choose to love each other on purpose, even on the days it doesn't come easily. And when we miss the mark, we will try again."</blockquote>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field-group">
            <label class="field-label">${escHtml(nameA())}'s signature</label>
            <input class="styled-input" id="commit-signA" value="${escHtml(state.commitA.signA||'')}" placeholder="${escHtml(nameA())}" />
          </div>
          <div class="field-group">
            <label class="field-label">${escHtml(nameB())}'s signature</label>
            <input class="styled-input" id="commit-signB" value="${escHtml(state.commitB.signB||'')}" placeholder="${escHtml(nameB())}" />
          </div>
        </div>
        <span class="saved-indicator" id="saved-commit-sig">✓ Signed</span>
      </div>

      <div class="flex-row mt-3" style="justify-content:flex-end;">
        <button class="btn btn-primary" onclick="showPage('challenge')">Start 30-Day Challenge &rarr;</button>
      </div>
    </div>
  </div>`;
}

function renderActionItems() {
  const items = [];
  for (const [k, actions] of Object.entries(ACTION_MENU)) {
    if (actionFilter !== 'all' && actionFilter !== k) continue;
    actions.forEach(a => {
      items.push(`<div class="action-item ${k}">
        <span class="action-item-tag" style="color:${LL_INFO[k].color};">${LL_INFO[k].icon} ${LL_INFO[k].label}</span>
        <span class="action-item-text">${escHtml(a)}</span>
      </div>`);
    });
  }
  return items.join('');
}

function setActionFilter(f) {
  actionFilter = f;
  document.getElementById('action-grid').innerHTML = renderActionItems();
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.className = 'filter-btn';
    const ff = b.getAttribute('onclick').match(/'(\w+)'/)[1];
    if (ff === f) b.classList.add('active-' + f);
  });
}

function renderDateNightCard(p) {
  const pName = p === 'A' ? nameA() : nameB();
  const dn    = p === 'A' ? state.dateNightA : state.dateNightB;
  const sid   = 'saved-dn-' + p;
  return `
    <div class="card">
      <div class="partner-badge">${p==='A'?'🌸':'🌿'} ${escHtml(pName)} plans a date for ${p==='A'?escHtml(nameB()):escHtml(nameA())}</div>
      <div class="field-group">
        <label class="field-label">Partner's primary love language</label>
        <input class="styled-input" id="dn-${p}-partnerLL" value="${escHtml(dn.partnerLL)}" placeholder="e.g. Quality Time" />
      </div>
      <div class="field-group">
        <label class="field-label">A date idea that speaks their language</label>
        <textarea id="dn-${p}-idea" rows="2" placeholder="Describe your idea...">${escHtml(dn.idea)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">What I'll do to make them feel seen</label>
        <textarea id="dn-${p}-feel_seen" rows="2" placeholder="...">${escHtml(dn.feel_seen)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">What I want them to feel by the end</label>
        <input class="styled-input" id="dn-${p}-want_to_feel" value="${escHtml(dn.want_to_feel)}" placeholder="e.g. Cherished and seen" />
      </div>
      <div class="field-group">
        <label class="field-label">Date I'm planning this for</label>
        <input class="styled-input" id="dn-${p}-date" type="date" value="${escHtml(dn.date)}" />
      </div>
      <span class="saved-indicator" id="${sid}">✓ Saved</span>
    </div>`;
}

function renderBarriersCard(p) {
  const pName = p === 'A' ? nameA() : nameB();
  const bar   = p === 'A' ? state.barriersA : state.barriersB;
  const sid   = 'saved-bar-' + p;
  return `
    <div class="card">
      <div class="partner-badge">${p==='A'?'🌸':'🌿'} ${escHtml(pName)}</div>
      <div class="field-group">
        <label class="field-label">Speaking my partner's love language sometimes feels difficult because...</label>
        <textarea id="bar-${p}-difficult" rows="2" placeholder="Be honest with yourself...">${escHtml(bar.difficult)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">Growing up, love in my family was mostly shown through...</label>
        <input class="styled-input" id="bar-${p}-family" value="${escHtml(bar.family)}" placeholder="e.g. acts of service, words..." />
      </div>
      <div class="field-group">
        <label class="field-label">...which means I naturally default to showing love by...</label>
        <textarea id="bar-${p}-naturally" rows="2" placeholder="...">${escHtml(bar.naturally)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">A belief I hold that makes it hard to show love my partner's way is...</label>
        <textarea id="bar-${p}-belief" rows="2" placeholder="...">${escHtml(bar.belief)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">One small, specific thing I can do this week to stretch outside my comfort zone is...</label>
        <textarea id="bar-${p}-stretch" rows="2" placeholder="...">${escHtml(bar.stretch)}</textarea>
      </div>
      <span class="saved-indicator" id="${sid}">✓ Saved</span>
    </div>`;
}

function renderCommitmentCard(p) {
  const pName  = p === 'A' ? nameA() : nameB();
  const pOther = p === 'A' ? nameB() : nameA();
  const com    = p === 'A' ? state.commitA : state.commitB;
  const sid    = 'saved-com-' + p;
  return `
    <div class="commitment-card">
      <div class="partner-badge">${p==='A'?'🌸':'🌿'} ${escHtml(pName)} writes to ${escHtml(pOther)}</div>
      <div class="field-group">
        <label class="field-label">I commit to speaking your love language by regularly doing...</label>
        <textarea id="com-${p}-doRegularly" rows="3" placeholder="Be specific and sincere...">${escHtml(com.doRegularly)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">When I'm tired, stressed, or busy, I will still try to...</label>
        <textarea id="com-${p}-whenTired" rows="2" placeholder="...">${escHtml(com.whenTired)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">If I'm falling short, please gently remind me by...</label>
        <textarea id="com-${p}-remindMe" rows="2" placeholder="...">${escHtml(com.remindMe)}</textarea>
      </div>
      <span class="saved-indicator" id="${sid}">✓ Saved</span>
    </div>`;
}

function bindDailyFields() {
  ['A','B'].forEach(p => {
    const dn  = p === 'A' ? state.dateNightA : state.dateNightB;
    const bar = p === 'A' ? state.barriersA  : state.barriersB;
    const com = p === 'A' ? state.commitA    : state.commitB;

    ['partnerLL','idea','feel_seen','want_to_feel','date'].forEach(k => {
      const el = document.getElementById('dn-' + p + '-' + k);
      if (!el) return;
      el.value = dn[k] || '';
      el.addEventListener('input', () => { dn[k] = el.value; persist(); showSaved('saved-dn-' + p); });
    });

    ['difficult','family','naturally','belief','stretch'].forEach(k => {
      const el = document.getElementById('bar-' + p + '-' + k);
      if (!el) return;
      el.value = bar[k] || '';
      el.addEventListener('input', () => { bar[k] = el.value; persist(); showSaved('saved-bar-' + p); });
    });

    ['doRegularly','whenTired','remindMe'].forEach(k => {
      const el = document.getElementById('com-' + p + '-' + k);
      if (!el) return;
      el.value = com[k] || '';
      el.addEventListener('input', () => { com[k] = el.value; persist(); showSaved('saved-com-' + p); });
    });
  });

  const signA = document.getElementById('commit-signA');
  const signB = document.getElementById('commit-signB');
  if (signA) { signA.value = state.commitA.signA || ''; signA.addEventListener('input', () => { state.commitA.signA = signA.value; persist(); showSaved('saved-commit-sig'); }); }
  if (signB) { signB.value = state.commitB.signB || ''; signB.addEventListener('input', () => { state.commitB.signB = signB.value; persist(); showSaved('saved-commit-sig'); }); }
}

// ─── RENDER CHALLENGE ────────────────────────────────────────
function renderChallenge() {
  const done  = Object.values(state.challengeChecked).filter(Boolean).length;
  const pct   = Math.round(done / 30 * 100);

  return `
  <div class="page ${state.currentPage==='challenge'?'active':''}" id="page-challenge">
    <div class="section-page">
      <div class="section-header">
        <span class="section-tag">Section Four</span>
        <h1>The 30-Day Connection <em>Challenge</em></h1>
        <p>"The most powerful thing you can do after discovering your love languages isn't to memorize them. It's to practice them."</p>
      </div>

      <div class="challenge-progress">
        <div>
          <div class="challenge-progress-num">${done}</div>
          <div class="challenge-progress-label">of 30 days complete</div>
        </div>
        <div style="flex:1;">
          <div class="challenge-progress-bar">
            <div class="challenge-progress-fill" style="width:${pct}%;"></div>
          </div>
          <div class="text-muted mt-1" style="font-size:0.8rem;">${pct}% complete</div>
        </div>
        ${done === 30 ? `<span style="font-size:1.5rem;">🎉</span>` : ''}
      </div>

      <div class="card mb-3">
        <h3 style="margin-bottom:1rem;">Your Starting Intention</h3>
        <p class="text-muted mb-3">Before Day 1, each partner writes:</p>
        <p class="italic mb-3" style="color:var(--brown); font-family:'Playfair Display',serif;">"The one thing I most hope this challenge does for our relationship is..."</p>
        <div class="warmup-grid">
          <div class="field-group">
            <label class="field-label">${escHtml(nameA())}</label>
            <textarea id="intention-A" rows="2" placeholder="Write freely...">${escHtml(state.intentionA)}</textarea>
          </div>
          <div class="field-group">
            <label class="field-label">${escHtml(nameB())}</label>
            <textarea id="intention-B" rows="2" placeholder="Write freely...">${escHtml(state.intentionB)}</textarea>
          </div>
        </div>
        <div class="field-group mt-2">
          <label class="field-label">Start date</label>
          <input class="styled-input" id="challenge-start" type="date" value="${escHtml(state.challengeStartDate)}" style="max-width:200px;" />
        </div>
        <span class="saved-indicator" id="saved-intent">✓ Saved</span>
      </div>

      <div class="challenge-grid" id="challenge-list">
        ${CHALLENGE_DAYS.map(d => renderChallengeDay(d)).join('')}
      </div>

      ${done >= 30 ? renderReflection() : ''}

    </div>
  </div>`;
}

function renderChallengeDay(d) {
  const checked = state.challengeChecked[d.day];
  const note    = state.challengeNotes[d.day] || '';
  const llKey   = d.ll === 'together' ? null : d.ll;
  const ll      = llKey ? LL_INFO[llKey] : { label: 'Together', icon: '🌟', color: '#d4a043', cls: 'service' };

  return `
    <div class="challenge-day ${checked ? 'done' : ''}">
      <div class="day-num">Day ${d.day}</div>
      <div class="day-action">${escHtml(d.action)}</div>
      <span class="day-lang-chip ll-${ll.cls}-chip">${ll.icon} ${ll.label}</span>
      <button class="challenge-check ${checked ? 'checked' : ''}" onclick="toggleDay(${d.day})" title="${checked ? 'Mark incomplete' : 'Mark complete'}">
        ${checked ? '✓' : ''}
      </button>
    </div>`;
}

function toggleDay(day) {
  state.challengeChecked[day] = !state.challengeChecked[day];
  persist();
  // Re-render challenge page to update progress
  document.getElementById('page-challenge').outerHTML = renderChallenge();
  document.getElementById('page-challenge').classList.add('active');
  bindChallengeFields();
}

function renderReflection() {
  const rA = state.reflectionA;
  const rB = state.reflectionB;
  const rt = state.reflectionTogether;
  return `
    <div class="ornament-divider">✦ ✦ ✦</div>
    <div class="card mb-3" style="background:linear-gradient(135deg,var(--warm1),var(--cream)); border:2px solid var(--blush); text-align:center; padding:2rem;">
      <div style="font-size:2rem; margin-bottom:0.5rem;">🎉</div>
      <h2 style="color:var(--brown); margin-bottom:0.5rem;">30-Day Challenge Reflection</h2>
      <p style="color:var(--textMid); font-style:italic; font-family:'Playfair Display',serif;">"You showed up for each other for 30 days. Not perfectly, but persistently. And that is everything."</p>
    </div>
    <div class="reflection-grid mb-3">
      ${renderReflectionCard('A', rA)}
      ${renderReflectionCard('B', rB)}
    </div>
    <div class="card mb-3">
      <h3 style="margin-bottom:0.8rem;">Together</h3>
      <div class="field-group">
        <label class="field-label">One commitment we're making to carry forward from this challenge is...</label>
        <textarea id="reflect-together-commitment" rows="3" placeholder="...">${escHtml(rt.commitment)}</textarea>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem;">
        <div class="field-group">
          <label class="field-label">${escHtml(nameA())} signs</label>
          <input class="styled-input" id="reflect-signA" value="${escHtml(state.reflectionA.sign||'')}" placeholder="${escHtml(nameA())}" />
        </div>
        <div class="field-group">
          <label class="field-label">${escHtml(nameB())} signs</label>
          <input class="styled-input" id="reflect-signB" value="${escHtml(state.reflectionB.sign||'')}" placeholder="${escHtml(nameB())}" />
        </div>
      </div>
      <span class="saved-indicator" id="saved-reflection">✓ Saved</span>
    </div>
    <div class="closing-hero" style="border-radius:var(--radius-lg);">
      <div class="closing-heart">💞</div>
      <h1>Thank You for Doing This Work Together</h1>
      <p>Not everyone chooses to understand their partner more deeply. The fact that you used this workbook says something real about both of you. Love doesn't ask for perfection. It asks for effort. You gave it.</p>
      <p style="color:var(--textLight); font-size:0.85rem; margin-top:1rem;">With warmth, The Clarity Desk</p>
    </div>`;
}

function renderReflectionCard(p, r) {
  const pName  = p === 'A' ? nameA() : nameB();
  const pOther = p === 'A' ? nameB() : nameA();
  const sid    = 'saved-ref-' + p;
  return `
    <div class="reflection-card">
      <div class="partner-badge">${p==='A'?'🌸':'🌿'} ${escHtml(pName)}</div>
      <div class="field-group">
        <label class="field-label">The day that meant the most to me was Day ___ because...</label>
        <input class="styled-input" id="ref-${p}-dayMeant" value="${escHtml(r.dayMeant)}" placeholder="Day number and why..." />
      </div>
      <div class="field-group">
        <label class="field-label">Something I noticed shift between us this month was...</label>
        <textarea id="ref-${p}-noticed" rows="2" placeholder="...">${escHtml(r.noticed)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">The love language action that surprised me most was...</label>
        <textarea id="ref-${p}-surprised" rows="2" placeholder="...">${escHtml(r.surprised)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">What I now understand about how ${escHtml(pOther)} needs to be loved is...</label>
        <textarea id="ref-${p}-understand" rows="2" placeholder="...">${escHtml(r.understand)}</textarea>
      </div>
    </div>`;
}

function bindChallengeFields() {
  bindTextarea(document.getElementById('intention-A'), state, 'intentionA', 'saved-intent');
  bindTextarea(document.getElementById('intention-B'), state, 'intentionB', 'saved-intent');
  const sd = document.getElementById('challenge-start');
  if (sd) { sd.value = state.challengeStartDate || ''; sd.addEventListener('change', () => { state.challengeStartDate = sd.value; persist(); }); }

  // Reflection fields
  const rc = document.getElementById('reflect-together-commitment');
  if (rc) { rc.value = state.reflectionTogether.commitment || ''; rc.addEventListener('input', () => { state.reflectionTogether.commitment = rc.value; persist(); showSaved('saved-reflection'); }); }
  const rsA = document.getElementById('reflect-signA');
  const rsB = document.getElementById('reflect-signB');
  if (rsA) { rsA.value = state.reflectionA.sign||''; rsA.addEventListener('input', () => { state.reflectionA.sign=rsA.value; persist(); showSaved('saved-reflection'); }); }
  if (rsB) { rsB.value = state.reflectionB.sign||''; rsB.addEventListener('input', () => { state.reflectionB.sign=rsB.value; persist(); showSaved('saved-reflection'); }); }

  ['A','B'].forEach(p => {
    const r = p === 'A' ? state.reflectionA : state.reflectionB;
    ['dayMeant','noticed','surprised','understand'].forEach(k => {
      const el = document.getElementById('ref-' + p + '-' + k);
      if (!el) return;
      el.value = r[k] || '';
      el.addEventListener('input', () => { r[k] = el.value; persist(); showSaved('saved-ref-' + p); });
    });
  });
}

// ─── MAIN RENDER ─────────────────────────────────────────────
function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML =
    renderNav() +
    renderCover() +
    renderHowTo() +
    renderQuiz() +
    renderResults() +
    renderUnderstand() +
    renderDaily() +
    renderChallenge();

  // Bind all fields after render
  bindWarmupFields();
  bindChallengeFields();

  // Bind profile/result fields on next tick (they only exist if relevant page)
  setTimeout(() => {
    bindProfileFields();
    bindUnderstandFields();
    bindDailyFields();
    renderQuizBody();
  }, 0);

  // Show correct page
  const pg = state.currentPage || 'cover';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const activePg = document.getElementById('page-' + pg);
  if (activePg) activePg.classList.add('active');
  const activeNb = document.querySelector('[data-page="' + pg + '"]');
  if (activeNb) activeNb.classList.add('active');

  // Draw chart if needed
  if (pg === 'understand' && state.quizDoneA && state.quizDoneB) setTimeout(drawUnderstandChart, 120);
  if (pg === 'results') setTimeout(() => {
    bindProfileFields();
    if (state.quizDoneA && state.quizDoneB) {
      // check if side-by-side panel is active
      const panel = document.getElementById('result-panel-both');
      if (panel && panel.classList.contains('active')) drawCompChart();
    }
  }, 50);
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
