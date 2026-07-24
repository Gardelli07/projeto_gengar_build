// One-off generator: reads the real filenames from assets/Aula Cafeteria and
// splices ITEM_PHOTOS/SCENE_PHOTOS/VIDEOS/AUDIO require() blocks straight into
// CoffeeShopLesson.js, between the "GENERATED MEDIA START/END" markers.
// Filenames have spaces/accents/apostrophes/&/$/double-dots, so this reads
// them straight off disk (via JSON.stringify) instead of hand-transcribing —
// re-run after adding/renaming files in assets/Aula Cafeteria.
const fs = require('fs');
const path = require('path');

const ASSET_DIR = path.join(__dirname, '..', 'assets', 'Aula Cafeteria');
const TARGET_FILE = path.join(__dirname, '..', 'src', 'pages', 'aulas', 'aulasplus', 'CoffeeShopLesson.js');
const REQUIRE_PREFIX = '../../../../assets/Aula Cafeteria/';
const START_MARKER = '// GENERATED MEDIA START';
const END_MARKER = '// GENERATED MEDIA END';

const files = fs.readdirSync(ASSET_DIR);
function find(name) {
  const hit = files.find((f) => f === name);
  if (!hit) throw new Error('Asset not found: ' + name);
  return hit;
}
function req(name) {
  return `require(${JSON.stringify(REQUIRE_PREFIX + find(name))})`;
}

const ITEM_PHOTOS = {
  espresso: 'coffee classics -espresso v2.jpg',
  americano: 'coffee classics -americano v2.jpg',
  latte: 'coffee classics -latte v2.jpg',
  mocha: 'coffee classics - mocha v2.jpg',
  coldbrew: 'cold favorites- cold brew v2.jpg',
  icedlatte: 'cold favorites - iced latte v2.jpg',
  icedamericano: 'cold favorites - Iced americano v2.jpg',
  greentea: 'tea section - green tea v2.jpg',
  earlgrey: 'tea section - earl grey tea v2.jpg',
  chamomile: 'tea section - camomile tea v2.jpg',
  croissant: 'fresh bakery - butter croissant v2.jpg',
  muffin: 'fresh bakery - blueberry muffin v2.jpg',
  bananabread: 'sweet treats - banana bread v2.jpg',
  cookie: 'sweet treats- Chocolate Chip Cookie v2.jpg',
  brownie: 'sweet treats - brownie v2.jpg',
  sandwichham: 'cafe kitchen - ham and cheese sandwich v2.jpg',
  sandwichturkey: 'cafe kitchen - turkey sandwich v2.jpg',
};

const SCENE_PHOTOS = {
  welcomeBg: 'primeira imagem .jpg',
  diningHere: 'for here.jpeg',
  diningTogo: 'to go.jpeg',
  cashBill: "You paid with a $20 bill..jpg",
};

// Real video clips (played visually via expo-video) — kept separate from
// AUDIO below since they have a picture track, not just sound.
const VIDEOS = {
  menuIntro: 'hi what can I do for you today.mp4',
  anythingElse: 'anything else.mp4',
  followupShots: 'A singele or double espresso.mp4',
  followupSize: 'What size would you like, small, medium or large.mp4',
  followupTemp: 'Hot or iced.mp4',
  followupWarm: 'Would you like it warmed up.mp4',
  followupToast: 'would you like that toasted.mp4',
  tapHere: 'Tap here please.mp4',
  goodbyeFull: 'Here is your receipt. We gonna call your name when your order is ready. thank you.mp4',
};

const AUDIO = {
  espresso: 'espresso.mp3',
  americano: 'americano.mp3',
  cappuccino: 'Cappuccino.mp3',
  latte: 'latte.mp3',
  mocha: 'mocha.mp3',
  coldbrew: 'Cold Brew.mp3',
  icedlatte: 'Iced Latte.mp3',
  icedamericano: 'Iced Americano.mp3',
  greentea: 'green tea.mp3',
  earlgrey: 'Earl Grey Tea.mp3',
  chamomile: 'Chamomile Tea.mp3',
  croissant: 'Butter Croissant.mp3',
  muffin: 'Blueberry Muffin.mp3',
  cinnamonroll: 'Cinnamon Roll.mp3',
  cookie: 'Chocolate Chip Cookie.mp3',
  brownie: 'Brownie.mp3',
  bananabread: 'Banana Bread.mp3',
  sandwichham: 'Ham and Cheese Sandwich.mp3',
  sandwichturkey: 'Turkey Sandwich.mp3',

  canihave: 'maneiras de perdir - can I have.mp3',
  illhave: "maneiras de perdir -I'll have.mp3",
  idlike: "maneiras de perdir -I'd like.mp3",

  exampleCanIHave: 'Examples - Can I have a large iced latte, please.mp3',
  exampleIllHave: "Examples - I'll have a cappuccino and a croissant..mp3",
  exampleIdLike: "Examples- I'd like a medium hot americano, to go..mp3",

  wellCallYourName: "We're gonna call your name when your order is ready..mp3",
  thankYou: 'Thank you.mp3',
  haveAGoodOne: 'Have a good one!.mp3',

  noThatsAll: "No, that's all.mp3",
  change: 'Change.mp3',
  heresYourChange: "Here's your change.mp3",
};

function emitBlock(varName, map) {
  const lines = Object.entries(map).map(([key, filename]) => `  ${key}: ${req(filename)},`);
  return `const ${varName} = {\n${lines.join('\n')}\n};`;
}

const generated = [
  START_MARKER,
  '// do not hand-edit; run `node scripts/gen-coffee-media.js` after adding/renaming files in assets/Aula Cafeteria.',
  emitBlock('ITEM_PHOTOS', ITEM_PHOTOS),
  emitBlock('SCENE_PHOTOS', SCENE_PHOTOS),
  emitBlock('VIDEOS', VIDEOS),
  emitBlock('AUDIO', AUDIO),
  END_MARKER,
].join('\n');

const src = fs.readFileSync(TARGET_FILE, 'utf8');
const startIdx = src.indexOf(START_MARKER);
const endIdx = src.indexOf(END_MARKER);
if (startIdx === -1 || endIdx === -1) {
  throw new Error(`Markers not found in ${TARGET_FILE} — expected "${START_MARKER}" and "${END_MARKER}"`);
}
const next = src.slice(0, startIdx) + generated + src.slice(endIdx + END_MARKER.length);
fs.writeFileSync(TARGET_FILE, next);
console.log('Updated media block in', TARGET_FILE);
