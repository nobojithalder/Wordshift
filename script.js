const categories = [
  { id: 'case', label: 'Change case', icon: 'Aa', tools: [
    ['sentence', 'Sentence case', 'Capitalizes the start of each sentence.'],
    ['lower', 'lowercase', 'Makes every letter lowercase.'],
    ['upper', 'UPPERCASE', 'Makes every letter uppercase.'],
    ['capitalized', 'Capitalized Case', 'Capitalizes the first letter of each word.'],
    ['alternating', 'aLtErNaTiNg', 'Alternates lowercase and uppercase letters.'],
    ['title', 'Title Case', 'Capitalizes the important words in a title.'],
    ['inverse', 'iNVERSE cASE', 'Switches uppercase and lowercase letters.'],
    ['camel', 'camelCase', 'Turns words into camelCase with no spaces.'],
    ['snake', 'snake_case', 'Separates words with lowercase underscores.'],
    ['kebab', 'kebab-case', 'Separates words with lowercase hyphens.'],
    ['constant', 'CONSTANT_CASE', 'Uppercase words separated by underscores.']
  ] },
  { id: 'transform', label: 'Transform', icon: '↔', tools: [
    ['reverse', 'Reverse text', 'Reads the text from end to beginning.'],
    ['upside', 'Upside down', 'Turns letters into their upside down forms.'],
    ['mirror', 'Mirror text', 'Flips the text into a mirror view.'],
    ['strike', 'Strikethrough', 'Adds a line through each character.'],
    ['underline', 'Underline', 'Underlines each character.'],
    ['rot13', 'ROT13', 'Shifts Latin letters by thirteen places.'],
    ['cleanSpaces', 'Clean spaces', 'Removes extra spaces and trims each line.'],
    ['sortLines', 'Sort lines', 'Sorts lines in alphabetical order.'],
    ['dedupeLines', 'Remove duplicates', 'Deletes duplicate lines from text.']
  ] },
  { id: 'style', label: 'Style text', icon: '✦', tools: [
    ['normal', 'Normal text', 'Removes decorative Unicode styling where possible.'],
    ['bold', 'Bold', 'Uses bold Unicode characters.'],
    ['italic', 'Italic', 'Uses italic Unicode characters.'],
    ['boldItalic', 'Bold italic', 'Uses bold italic Unicode characters.'],
    ['script', 'Cursive', 'Turns letters into a flowing script style.'],
    ['boldScript', 'Bold cursive', 'Uses a heavier script style.'],
    ['wide', 'Wide text', 'Widens Latin letters and punctuation.'],
    ['smallcaps', 'Small caps', 'Makes letters look smaller.'],
    ['superscript', 'Superscript', 'Raises letters and numbers.'],
    ['bubble', 'Bubble text', 'Puts letters in circles.'],
    ['invisible', 'Invisible text', 'Replaces characters with blank spaces.'],
    ['zalgo', 'Zalgo', 'Adds a glitch effect with combining marks.']
  ] },
  { id: 'encode', label: 'Translate', icon: '01', tools: [
    ['morse', 'Morse code', 'Translates text and Morse code in both directions.'],
    ['binary', 'Binary', 'Translates text and binary in both directions.'],
    ['base64', 'Base64', 'Encodes and decodes text using Base64 format.'],
    ['url', 'URL encode', 'Encodes and decodes web URLs and query strings.'],
    ['wingdings', 'Wingdings', 'Turns Latin letters into symbol text.']
  ] }
];

const maps = {
  morse: {
    A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',
    0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.',
    '.':'.-.-.-', ',':'--..--', '?':'..--..', "'":'.----.', '!':'-.-.--', '/':'-..-.', '(':'-.--.', ')':'-.--.-',
    '&':'.-...', ':':'---...', ';':'-.-.-.', '=':'-...-', '+':'.-.-.', '-':'-....-', '_':'..--.-', '"':'.-..-.',
    '$':'...-..-', '@':'.--.-.'
  },
  wingdings: Object.fromEntries('abcdefghijklmnopqrstuvwxyz'.split('').map((c, i) => [c, [...'☯✌☻♦♣♠•◘○◙♂♀♪♫☼▧↕¶§▬↨↑↓→←∟↔▲▼'][i] || '✦']))
};

const morseReverseMap = Object.fromEntries(Object.entries(maps.morse).map(([k, v]) => [v, k]));
const wingdingsReverseMap = Object.fromEntries(Object.entries(maps.wingdings).map(([letter, symbol]) => [symbol, letter.toUpperCase()]));

const upsideMap = Object.fromEntries([...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,!?()[]{}\'"_&'].map((c, i) => [c, [...'ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀𐐒Ɔ◖ƎℲ⅁HᴉſӼ˥WNOԀὉᴚS⊥ՈΛMX⅄Z˙,¡¿)(][}{,„‾⅋'][i]]));
// Fixed: 72 keys and 72 values (added mirrored 9: '୧')
const mirrorMap = Object.fromEntries([...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?()[]{}'].map((c, i) => [c, [...'ɒdɔbɘꟻϱʜiꞁʞlmᴎoqpɿƨƚυvwxγzAᗺƆᗡƎꟻӘHIႱꓘ⅃MИOꟼϘЯƧTUVWXYZ0ƖᄅƐㄣ59L8୧˙,¡¿)(][}{'][i]]));

// Precomputed static arrays & lookup maps for optimal typing performance
const smallCapsArray = [...'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ'];
const scriptUpper = [...'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'];
const scriptLower = [...'𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏'];
const superscriptSup = Object.fromEntries([...'0123456789+-=()'].map((c, i) => [c, [...'⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾'][i]]));
const superscriptLetters = Object.fromEntries([...'abcdefghijklmnopqrstuvwxyz'].map((c, i) => [c, [...'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ'][i] || c]));
const bubbleMap = Object.fromEntries([...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'].map((c, i) => [c, i < 26 ? String.fromCodePoint(0x24D0 + i) : i < 52 ? String.fromCodePoint(0x24B6 + i - 26) : String.fromCodePoint(0x2460 + i - 52)]));
bubbleMap['0'] = '⓪';

const normalStyledMap = new Map();
const unicodeStyleRanges = [
  [0x1D400, 0x1D41A], [0x1D434, 0x1D44E], [0x1D468, 0x1D482],
  [0x1D4D0, 0x1D4EA], [0x1D5A0, 0x1D5BA], [0x1D5D4, 0x1D5EE],
  [0x1D608, 0x1D622], [0x1D63C, 0x1D656], [0x1D670, 0x1D68A]
];
for (const [upperStart, lowerStart] of unicodeStyleRanges) {
  for (let i = 0; i < 26; i++) {
    normalStyledMap.set(String.fromCodePoint(upperStart + i), String.fromCharCode(65 + i));
    normalStyledMap.set(String.fromCodePoint(lowerStart + i), String.fromCharCode(97 + i));
  }
}
scriptUpper.forEach((char, index) => normalStyledMap.set(char, String.fromCharCode(65 + index)));
scriptLower.forEach((char, index) => normalStyledMap.set(char, String.fromCharCode(97 + index)));
normalStyledMap.set('ℎ', 'h');
for (const start of [0x1D7CE, 0x1D7D8, 0x1D7E2, 0x1D7EC, 0x1D7F6]) {
  for (let i = 0; i < 10; i++) normalStyledMap.set(String.fromCodePoint(start + i), String(i));
}
smallCapsArray.forEach((char, index) => normalStyledMap.set(char, String.fromCharCode(97 + index)));
[...'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'].forEach((char, index) => normalStyledMap.set(char, String.fromCharCode(97 + index)));
[...'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'].forEach((char, index) => normalStyledMap.set(char, String.fromCharCode(65 + index)));
[...'⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉'].forEach((char, index) => normalStyledMap.set(char, String(index % 10)));
[...'⁺⁻⁼⁽⁾'].forEach((char, index) => normalStyledMap.set(char, ['+', '-', '=', '(', ')'][index]));
[...'₊₋₌₍₎'].forEach((char, index) => normalStyledMap.set(char, ['+', '-', '=', '(', ')'][index]));
[...'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ'].forEach((char, index) => normalStyledMap.set(char, String.fromCharCode(97 + index)));
Object.entries({ ₐ:'a', ₑ:'e', ₕ:'h', ᵢ:'i', ⱼ:'j', ₖ:'k', ₗ:'l', ₘ:'m', ₙ:'n', ₒ:'o', ₚ:'p', ᵣ:'r', ₛ:'s', ₜ:'t', ᵤ:'u', ᵥ:'v', ₓ:'x' }).forEach(([char, plain]) => normalStyledMap.set(char, plain));
[...'①②③④⑤⑥⑦⑧⑨'].forEach((char, index) => normalStyledMap.set(char, String(index + 1)));
normalStyledMap.set('⓪', '0');

function rangeMap(text, upperStart, lowerStart, exceptions = {}, digitsStart = 0) {
  return [...text].map(char => {
    const code = char.codePointAt(0);
    if (char >= 'A' && char <= 'Z') return String.fromCodePoint(exceptions[char] || upperStart + code - 65);
    if (char >= 'a' && char <= 'z') return String.fromCodePoint(exceptions[char] || lowerStart + code - 97);
    if (digitsStart && char >= '0' && char <= '9') return String.fromCodePoint(digitsStart + code - 48);
    return char;
  }).join('');
}

function styleText(text, type) {
  if (type === 'bold') return rangeMap(text, 0x1D400, 0x1D41A, {}, 0x1D7CE);
  if (type === 'italic') return rangeMap(text, 0x1D434, 0x1D44E, { h: 0x210E });
  if (type === 'boldItalic') return rangeMap(text, 0x1D468, 0x1D482, {}, 0x1D7CE);
  if (type === 'boldScript') return rangeMap(text, 0x1D4D0, 0x1D4EA, {}, 0x1D7CE);
  if (type === 'script') {
    return [...text].map(c => c >= 'A' && c <= 'Z' ? scriptUpper[c.charCodeAt(0) - 65] : c >= 'a' && c <= 'z' ? scriptLower[c.charCodeAt(0) - 97] : c).join('');
  }
  if (type === 'wide') return [...text].map(c => c === ' ' ? '　' : c.codePointAt(0) >= 33 && c.codePointAt(0) <= 126 ? String.fromCodePoint(c.codePointAt(0) + 0xFEE0) : c).join('');
  if (type === 'smallcaps') {
    return [...text].map(c => c >= 'a' && c <= 'z' ? smallCapsArray[c.charCodeAt(0) - 97] : c).join('');
  }
  if (type === 'superscript') {
    return [...text].map(c => superscriptSup[c] || superscriptLetters[c.toLowerCase()] || c).join('');
  }
  if (type === 'bubble') {
    return [...text].map(c => bubbleMap[c] || c).join('');
  }
  if (type === 'strike') return [...text].map(c => /\s/u.test(c) ? c : c + '\u0336').join('');
  if (type === 'underline') return [...text].map(c => /\s/u.test(c) ? c : c + '\u0332').join('');
  if (type === 'invisible') return [...text].map(c => /\s/u.test(c) ? c : '\u3164').join('');
  if (type === 'zalgo') {
    const marks = ['\u030d','\u030e','\u0304','\u0305','\u033f','\u0311','\u0306','\u0310','\u0352','\u0357','\u0351','\u0307','\u0308'];
    return [...text].map((c, i) => /\s/u.test(c) ? c : c + marks[(i * 5 + 2) % marks.length] + marks[(i * 7 + 4) % marks.length] + (i % 3 ? marks[(i + 3) % marks.length] : '')).join('');
  }
  return text;
}

function normalText(text) {
  let plain = [...text].map(char => normalStyledMap.get(char) || char).join('');
  plain = [...plain].map(char => {
    const code = char.codePointAt(0);
    if (code === 0x3000) return ' ';
    if (code >= 0xFF01 && code <= 0xFF5E) return String.fromCodePoint(code - 0xFEE0);
    if (code >= 0x24B6 && code <= 0x24CF) return String.fromCharCode(65 + code - 0x24B6);
    if (code >= 0x24D0 && code <= 0x24E9) return String.fromCharCode(97 + code - 0x24D0);
    return char;
  }).join('');
  plain = plain.replace(/\u0332|\u0336/gu, '').replace(/(\P{M})([\u0300-\u036f]{2,})/gu, '$1');
  return plain.replace(/[\u3164\u200B\u200C\u200D\uFEFF]/gu, '');
}

function titleCase(text) {
  const small = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
    'as', 'at', 'by', 'in', 'of', 'on', 'per', 'to', 'via', 'vs', 'vs.',
    'off', 'out', 'up'
  ]);

  const wordMatches = [...text.matchAll(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)];
  if (!wordMatches.length) return text;

  const firstWordIndex = 0;
  const lastWordIndex = wordMatches.length - 1;

  let result = '';
  let lastIndex = 0;

  wordMatches.forEach((match, index) => {
    const word = match[0];
    const offset = match.index;
    const precedingText = text.slice(lastIndex, offset);
    result += precedingText;

    const followsMajorBreak = /[:.!?—–\n]\s*$/u.test(precedingText);
    const isFirst = index === firstWordIndex || followsMajorBreak;
    const isLast = index === lastWordIndex;
    const lowerWord = word.toLocaleLowerCase();

    if (!isFirst && !isLast && small.has(lowerWord)) {
      result += lowerWord;
    } else {
      result += word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
    }

    lastIndex = offset + word.length;
  });

  result += text.slice(lastIndex);
  return result;
}

function getCustomTerms() {
  const elem = $('custom-terms');
  if (!elem) return [];
  return elem.value.split(',').map(s => s.trim().replace(/\s+/gu, ' ').slice(0, 60)).filter(Boolean).slice(0, 40).sort((a, b) => b.length - a.length);
}

function applyTerms(text) {
  const terms = [...new Set(['NASA', 'HTML', 'CSS', 'URL', 'API', 'JavaScript', 'PostgreSQL', 'iPhone', 'YouTube', 'Google', 'London', 'New York', ...getCustomTerms()])].sort((a, b) => b.length - a.length);
  const termByLowercase = new Map(terms.map(term => [term.toLocaleLowerCase(), term]));
  const alternatives = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  if (!alternatives) return text;
  const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])(${alternatives})(?=$|[^\\p{L}\\p{N}])`, 'giu');
  return text.replace(pattern, (_, prefix, match) => prefix + (termByLowercase.get(match.toLocaleLowerCase()) || match));
}

function sentenceCase(text) {
  const lower = text.toLocaleLowerCase();
  // Robust sentence boundary detection:
  // 1. Beginning of text, line, or terminal punctuation ([.!?]+ followed by quotes/parens)
  // 2. Followed by optional opening quotation marks or brackets
  // 3. Followed by the letter to capitalize
  const capitalized = lower.replace(/(^|\n|[.!?]+["'”’)\]}]*\s+)(["'“‘(\[{«¡¿\s]*)([\p{L}])/gu,
    (_, boundary, opening, letter) => boundary + opening + letter.toLocaleUpperCase()
  );
  return applyTerms(capitalized.replace(/\bi\b/gu, 'I'));
}

function toWords(text) {
  const spaced = text
    .replace(/([\p{Ll}\p{N}])([\p{Lu}])/gu, '$1 $2')
    .replace(/([\p{Lu}]+)([\p{Lu}][\p{Ll}\p{N}])/gu, '$1 $2');
  return spaced.match(/[\p{L}\p{N}]+/gu) || [];
}

function camelCase(text) {
  const words = toWords(text);
  if (!words.length) return '';
  return words.map((w, i) => i === 0 ? w.toLocaleLowerCase() : w.charAt(0).toLocaleUpperCase() + w.slice(1).toLocaleLowerCase()).join('');
}

function snakeCase(text) {
  return toWords(text).map(w => w.toLocaleLowerCase()).join('_');
}

function kebabCase(text) {
  return toWords(text).map(w => w.toLocaleLowerCase()).join('-');
}

function constantCase(text) {
  return toWords(text).map(w => w.toLocaleUpperCase()).join('_');
}

function cleanSpaces(text) {
  return text.split(/\r?\n/).map(line => line.trim().replace(/[ \t]+/g, ' ')).join('\n').trim();
}

function sortLines(text) {
  return text.split(/\r?\n/).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })).join('\n');
}

function dedupeLines(text) {
  return [...new Set(text.split(/\r?\n/))].join('\n');
}

function alternating(text) {
  return text.split(/(\s+)/u).map(part => {
    if (/^\s+$/u.test(part)) return part;
    let n = 0;
    return [...part].map(c => /\p{L}/u.test(c) ? (n++ % 2 === 0 ? c.toLocaleLowerCase() : c.toLocaleUpperCase()) : c).join('');
  }).join('');
}

function rot13(text) {
  return text.replace(/[a-z]/gi, c => String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() <= 'm' ? 13 : -13)));
}

function morseEncode(text) {
  if (!text.trim()) return '';
  return text.trim().split(/\s+/u).map(word => {
    return [...word.toLocaleUpperCase()].map(c => maps.morse[c] || c).join(' ');
  }).join(' / ');
}

function morseDecode(text) {
  return text.trim().split(/\s*\/\s*/).map(word => {
    return word.trim().split(/\s+/).map(code => morseReverseMap[code] || (code === '' ? '' : '')).join('');
  }).join(' ');
}

function binaryEncode(text) {
  return [...new TextEncoder().encode(text)].map(byte => byte.toString(2).padStart(8, '0')).join(' ');
}

function binaryDecode(text) {
  const input = text.trim();
  if (!input) return '';
  let bytes;
  if (/\s/u.test(input)) {
    bytes = input.split(/\s+/u).map(b => b.padStart(8, '0'));
  } else {
    if (input.length % 8 !== 0) return null;
    bytes = input.match(/.{8}/gu) || [];
  }
  if (!bytes.length || bytes.some(byte => !/^[01]{8}$/u.test(byte))) return null;
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes.map(bits => parseInt(bits, 2))));
  } catch {
    return null;
  }
}

function base64Encode(text) {
  try {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch {
    return text;
  }
}

function base64Decode(text) {
  try {
    const trimmed = text.trim();
    if (!trimmed) return '';
    const binary = atob(trimmed);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
}

function urlEncode(text) {
  return encodeURIComponent(text);
}

function urlDecode(text) {
  try {
    return decodeURIComponent(text.replace(/\+/g, ' '));
  } catch {
    return null;
  }
}

function wingdingsEncode(text) {
  return [...text].map(c => maps.wingdings[c.toLowerCase()] || c).join('');
}

function wingdingsDecode(text) {
  return [...text].map(c => wingdingsReverseMap[c] || c).join('');
}

const $ = id => document.getElementById(id);
const categoryTabs = $('category-tabs');
const toolPicker = $('tool-picker');
const source = $('source-text');
const result = $('result-text');
const documentEditor = $('document-editor');
const selectionMenu = $('selection-menu');
let activeCategory = 'case';
let activeTool = 'sentence';
let direction = 'encode';
let selectedEditorRange = null;
let lastDocumentValue = '';
let editorMenuCategory = 'case';
const editorUndoStack = [];
const editorRedoStack = [];
const maxEditorHistoryStates = 60;
const maxEditorHistoryBytes = 16 * 1024 * 1024;
const editorDraftStorageKey = 'wordshift-long-form-draft';
const maxRecoverableDraftChars = 1_500_000;
let editorHistoryBytes = 0;
let lastEditorInputCheckpoint = 0;
let editorDraftSaveTimer = 0;
let lastClearedSource = '';

// Morse Audio Player Controller
let currentMorseAudioContext = null;
let morseAudioTimer = 0;

function stopMorsePlayback() {
  if (morseAudioTimer) {
    window.clearTimeout(morseAudioTimer);
    morseAudioTimer = 0;
  }
  if (currentMorseAudioContext) {
    try {
      currentMorseAudioContext.close();
    } catch { /* context might already be closed */ }
    currentMorseAudioContext = null;
  }
  updatePlayButton(false);
}

function updatePlayButton(isPlaying) {
  const playButton = $('play-button');
  if (!playButton) return;
  if (isPlaying) {
    playButton.replaceChildren(document.createTextNode('⏹ '), document.createTextNode('Stop'));
    playButton.classList.add('playing');
  } else {
    playButton.replaceChildren(document.createTextNode('▶ '), document.createTextNode('Play'));
    playButton.classList.remove('playing');
  }
}

function playMorse() {
  if (currentMorseAudioContext) {
    stopMorsePlayback();
    return;
  }
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext || !result.value) return;

  const morseText = result.value.slice(0, 1500); // Safety limit to avoid audio flood
  if (result.value.length > 1500) {
    $('result-status').textContent = 'Playing first 1,500 Morse characters';
  }

  const context = new AudioContext();
  currentMorseAudioContext = context;
  updatePlayButton(true);

  const unit = 0.08;
  let time = context.currentTime + 0.05;
  const words = morseText.split(' / ');

  words.forEach((word, wordIndex) => {
    const letters = word.trim().split(/\s+/);
    letters.forEach((letter, letterIndex) => {
      for (const mark of letter) {
        if (mark !== '.' && mark !== '-') continue;
        const duration = mark === '-' ? 3 * unit : unit;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.frequency.value = 640;
        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(0.12, time + 0.006);
        gain.gain.setValueAtTime(0.12, time + duration - 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(time);
        oscillator.stop(time + duration);
        time += duration + unit;
      }
      if (letterIndex < letters.length - 1) time += 2 * unit;
    });
    if (wordIndex < words.length - 1) time += 5 * unit;
  });

  const totalDurationMs = Math.max(200, (time - context.currentTime) * 1000);
  morseAudioTimer = window.setTimeout(() => {
    stopMorsePlayback();
  }, totalDurationMs);
}

function renderCategories() {
  const buttons = categories.map(category => {
    const button = document.createElement('button');
    button.className = 'category-tab';
    button.type = 'button';
    button.setAttribute('role', 'tab');
    button.id = `tab-${category.id}`;
    button.setAttribute('aria-controls', 'tool-picker');
    button.setAttribute('aria-selected', String(category.id === activeCategory));
    button.dataset.category = category.id;
    const icon = document.createElement('span');
    icon.className = 'category-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = category.icon;
    button.append(icon, document.createTextNode(category.label));
    return button;
  });
  categoryTabs.replaceChildren(...buttons);
  categoryTabs.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    stopMorsePlayback();
    activeCategory = button.dataset.category;
    activeTool = categories.find(category => category.id === activeCategory).tools[0][0];
    direction = 'encode';
    renderCategories();
    renderTools();
    renderResult();
  }));
}

function renderTools() {
  const category = categories.find(item => item.id === activeCategory);
  toolPicker.setAttribute('role', 'tablist');
  toolPicker.setAttribute('aria-label', `${category.label} tools`);
  const buttons = category.tools.map(([id, label, description]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tool-chip';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(activeTool === id));
    button.setAttribute('aria-pressed', String(activeTool === id));
    button.title = description;
    button.dataset.tool = id;
    button.textContent = label;
    return button;
  });
  toolPicker.replaceChildren(...buttons);
  toolPicker.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    stopMorsePlayback();
    activeTool = button.dataset.tool;
    direction = 'encode';
    renderTools();
    renderResult();
  }));
  const isEncoder = ['morse', 'binary', 'base64', 'url', 'wingdings'].includes(activeTool);
  $('encode-controls').hidden = !isEncoder;
  document.querySelectorAll('[data-direction]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.direction === direction)));
  $('play-button').hidden = activeTool !== 'morse' || direction !== 'encode';
  $('sentence-options').hidden = !['sentence', 'title'].includes(activeTool);
  $('sentence-options').open = false;
  updateSelectionContext();
}

function updateSelectionContext() {
  const category = categories.find(item => item.id === activeCategory);
  const tool = category.tools.find(item => item[0] === activeTool);
  const modeSymbols = { case: 'Aa', transform: '↔', style: '✦', encode: '01' };
  let title = tool[1];
  let description = tool[2];
  if (['morse', 'binary', 'base64', 'url', 'wingdings'].includes(activeTool)) {
    const modeName = activeTool === 'morse' ? 'Morse code' : activeTool === 'binary' ? 'Binary' : activeTool === 'base64' ? 'Base64' : activeTool === 'url' ? 'URL' : 'Wingdings';
    title = direction === 'encode' ? `Text to ${modeName}` : `${modeName} to text`;
    description = direction === 'encode' ? `Turn your text into ${modeName.toLowerCase()}.` : `Translate ${modeName.toLowerCase()} back into text.`;
  }
  $('selection-symbol').textContent = modeSymbols[category.id] || '✦';
  $('selection-title').textContent = title;
  $('selection-description').textContent = description;
}

function convert(text) {
  switch (activeTool) {
    case 'sentence': return sentenceCase(text);
    case 'lower': return text.toLocaleLowerCase();
    case 'upper': return text.toLocaleUpperCase();
    case 'capitalized': return text.replace(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu, word => word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase());
    case 'alternating': return alternating(text);
    case 'title': return applyTerms(titleCase(text));
    case 'inverse': return [...text].map(c => c === c.toLocaleUpperCase() ? c.toLocaleLowerCase() : c.toLocaleUpperCase()).join('');
    case 'camel': return camelCase(text);
    case 'snake': return snakeCase(text);
    case 'kebab': return kebabCase(text);
    case 'constant': return constantCase(text);
    case 'cleanSpaces': return cleanSpaces(text);
    case 'sortLines': return sortLines(text);
    case 'dedupeLines': return dedupeLines(text);
    case 'normal': return normalText(text);
    case 'reverse': return [...text].reverse().join('');
    case 'upside': return [...text].reverse().map(c => upsideMap[c] || c).join('');
    case 'mirror': return [...text].reverse().map(c => mirrorMap[c] || c).join('');
    case 'rot13': return rot13(text);
    case 'strike': case 'underline': case 'bold': case 'italic': case 'boldItalic': case 'script': case 'boldScript': case 'wide': case 'smallcaps': case 'superscript': case 'bubble': case 'invisible': case 'zalgo': return styleText(text, activeTool);
    case 'morse': return direction === 'encode' ? morseEncode(text) : morseDecode(text);
    case 'binary': return direction === 'encode' ? binaryEncode(text) : binaryDecode(text);
    case 'base64': return direction === 'encode' ? base64Encode(text) : base64Decode(text);
    case 'url': return direction === 'encode' ? urlEncode(text) : urlDecode(text);
    case 'wingdings': return direction === 'encode' ? wingdingsEncode(text) : wingdingsDecode(text);
    default: return text;
  }
}

function countWords(text) {
  const matches = text.trim().match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu);
  return matches ? matches.length : 0;
}

function renderStats() {
  const text = source.value;
  const chars = [...text].length;
  const words = countWords(text);
  const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
  const readingMins = Math.ceil(words / 200);

  $('char-count').textContent = chars.toLocaleString();
  $('word-count').textContent = words.toLocaleString();
  $('line-count').textContent = lines.toLocaleString();
  const readingTime = $('reading-time');
  if (readingTime) readingTime.textContent = readingMins.toLocaleString();
}

function renderResult() {
  const value = source.value;
  const converted = value ? convert(value) : '';
  result.value = converted ?? '';

  let statusMsg = 'Your converted text will appear here';
  if (converted === null) {
    if (activeTool === 'binary') statusMsg = 'Invalid binary. Use groups of 8 bits.';
    else if (activeTool === 'base64') statusMsg = 'Invalid Base64 encoded string.';
    else if (activeTool === 'url') statusMsg = 'Invalid URL-encoded string.';
    else statusMsg = 'Could not translate input.';
  } else if (value) {
    statusMsg = 'Ready to copy';
  }

  $('result-status').textContent = statusMsg;
  $('copy-button').disabled = !result.value;
  $('swap-button').disabled = !result.value;
  $('play-button').hidden = activeTool !== 'morse' || direction !== 'encode' || !result.value;

  const dlBtn = $('download-button');
  if (dlBtn) dlBtn.disabled = !result.value;

  const quickDiff = $('quick-diff-btn');
  if (quickDiff) quickDiff.disabled = !source.value && !result.value;
  const quickExport = $('quick-export-btn');
  if (quickExport) quickExport.disabled = !result.value;
}

function setDirection(value) {
  stopMorsePlayback();
  direction = value;
  document.querySelectorAll('[data-direction]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.direction === direction)));
  updateSelectionContext();
  renderResult();
}

function overview() {
  const items = categories.flatMap(category => category.tools.slice(0, 4).map(([id, title, description]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'overview-item';
    button.dataset.overview = category.id;
    button.dataset.tool = id;
    const heading = document.createElement('strong');
    heading.textContent = title;
    const copy = document.createElement('p');
    copy.textContent = description;
    button.append(heading, copy);
    return button;
  }));
  $('tool-overview').replaceChildren(...items);
  $('tool-overview').querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    stopMorsePlayback();
    setView('quick');
    activeCategory = button.dataset.overview;
    activeTool = button.dataset.tool;
    direction = 'encode';
    renderCategories();
    renderTools();
    renderResult();
    $('top').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

function setView(view) {
  stopMorsePlayback();
  const isDocument = view === 'document';
  $('quick-mode-view').hidden = isDocument;
  $('document-mode-view').hidden = !isDocument;
  $('quick-mode-button').setAttribute('aria-selected', String(!isDocument));
  $('document-mode-button').setAttribute('aria-selected', String(isDocument));
  hideSelectionMenu(false);
  if (isDocument) updateEditorStats();
}

document.querySelectorAll('.mode-switch-button').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));

function updateEditorHistoryButtons() {
  $('editor-undo').disabled = editorUndoStack.length === 0;
  $('editor-redo').disabled = editorRedoStack.length === 0;
}

function editorSnapshotSize(value) { return value.length * 2; }

function trimEditorHistory() {
  while (editorUndoStack.length + editorRedoStack.length > maxEditorHistoryStates || editorHistoryBytes > maxEditorHistoryBytes) {
    const oldestStack = editorUndoStack.length ? editorUndoStack : editorRedoStack;
    if (!oldestStack.length) break;
    editorHistoryBytes = Math.max(0, editorHistoryBytes - editorSnapshotSize(oldestStack.shift()));
  }
  updateEditorHistoryButtons();
}

function saveEditorSnapshot(value) {
  if (editorUndoStack.at(-1) !== value) {
    editorUndoStack.push(value);
    editorHistoryBytes += editorSnapshotSize(value);
  }
  for (const snapshot of editorRedoStack) editorHistoryBytes = Math.max(0, editorHistoryBytes - editorSnapshotSize(snapshot));
  editorRedoStack.length = 0;
  trimEditorHistory();
}

function updateEditorStats() {
  const text = documentEditor.value;
  const words = countWords(text);
  const readingMins = Math.ceil(words / 200);

  $('editor-char-count').textContent = [...text].length.toLocaleString();
  $('editor-word-count').textContent = words.toLocaleString();
  $('editor-paragraph-count').textContent = text.trim() ? text.trim().split(/\n\s*\n/u).filter(Boolean).length.toLocaleString() : '0';
  const editorReading = $('editor-reading-time');
  if (editorReading) editorReading.textContent = readingMins.toLocaleString();

  $('editor-copy').disabled = !text;
  const editorDl = $('editor-download');
  if (editorDl) editorDl.disabled = !text;
  $('editor-clear').disabled = !text;

  const start = documentEditor.selectionStart;
  const end = documentEditor.selectionEnd;
  const selectedCount = [...text.slice(start, end)].length;
  $('editor-selection-status').textContent = selectedCount ? `${selectedCount.toLocaleString()} selected` : 'No selection';

  const menuTrigger = $('editor-menu-trigger');
  if (menuTrigger) menuTrigger.disabled = selectedCount === 0;

  const editorDiff = $('editor-diff-trigger');
  if (editorDiff) editorDiff.disabled = editorUndoStack.length === 0 && !text;
  const editorExport = $('editor-export-trigger');
  if (editorExport) editorExport.disabled = !text;

  $('editor-status').textContent = selectedCount
    ? 'Click Transform or right-click the selection to apply a change'
    : text ? 'Select text, then right-click for tools' : 'Ready for your text';
  updateEditorHistoryButtons();
}

function setDraftTabBadge(label) {
  const badge = $('draft-tab-badge');
  badge.textContent = label;
  badge.hidden = !label;
}

function saveEditorDraft() {
  window.clearTimeout(editorDraftSaveTimer);
  const text = documentEditor.value;
  try {
    if (!text) {
      localStorage.removeItem(editorDraftStorageKey);
      $('draft-status').textContent = 'Draft recovery is on';
      setDraftTabBadge('');
      return true;
    }
    if (text.length > maxRecoverableDraftChars) {
      localStorage.removeItem(editorDraftStorageKey);
      $('draft-status').textContent = 'Draft is too large for recovery';
      setDraftTabBadge('Not saved');
      return false;
    }
    localStorage.setItem(editorDraftStorageKey, text);
    $('draft-status').textContent = 'Draft saved on this device';
    setDraftTabBadge('Saved');
    return true;
  } catch {
    try { localStorage.removeItem(editorDraftStorageKey); } catch { /* Storage disabled */ }
    $('draft-status').textContent = 'Draft could not be saved';
    setDraftTabBadge('Not saved');
    return false;
  }
}

function scheduleEditorDraftSave() {
  window.clearTimeout(editorDraftSaveTimer);
  if (!documentEditor.value) {
    $('draft-status').textContent = 'Clearing saved draft';
    setDraftTabBadge('');
  } else if (documentEditor.value.length > maxRecoverableDraftChars) {
    $('draft-status').textContent = 'Draft is too large for recovery';
    setDraftTabBadge('Not saved');
  } else {
    $('draft-status').textContent = 'Saving draft';
    setDraftTabBadge('Saving');
  }
  editorDraftSaveTimer = window.setTimeout(saveEditorDraft, 600);
}

function restoreEditorDraft() {
  try {
    const savedDraft = localStorage.getItem(editorDraftStorageKey);
    if (!savedDraft) return;
    if (savedDraft.length > maxRecoverableDraftChars) {
      localStorage.removeItem(editorDraftStorageKey);
      $('draft-status').textContent = 'Saved draft is too large to recover';
      setDraftTabBadge('Not saved');
      return;
    }
    documentEditor.value = savedDraft;
    lastDocumentValue = savedDraft;
    updateEditorStats();
    $('editor-status').textContent = 'Draft recovered. Select text to edit it.';
    $('draft-status').textContent = 'Draft recovered';
    setDraftTabBadge('Recovered');
  } catch {
    $('draft-status').textContent = 'Draft recovery is unavailable';
    setDraftTabBadge('');
  }
}

function renderEditorMenu(categoryId) {
  editorMenuCategory = categoryId;
  document.querySelectorAll('[data-menu-category]').forEach(button => button.setAttribute('aria-selected', String(button.dataset.menuCategory === categoryId)));
  const category = categories.find(item => item.id === categoryId);
  const operations = categoryId === 'encode'
    ? category.tools.flatMap(([tool, label, description]) => [
        { tool, direction: 'encode', label: `Text → ${label}`, description },
        { tool, direction: 'decode', label: `${label} → text`, description: `Decode this ${label.toLowerCase()} selection.` }
      ])
    : category.tools.map(([tool, label, description]) => ({ tool, direction: 'encode', label, description }));

  const items = operations.map(operation => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'selection-menu-item';
    button.dataset.tool = operation.tool;
    button.dataset.direction = operation.direction;
    const label = document.createElement('strong');
    label.textContent = operation.label;
    const description = document.createElement('span');
    description.textContent = operation.description;
    button.append(label, description);
    return button;
  });
  $('selection-menu-items').replaceChildren(...items);
}

function closeSelectionMenu(restoreSelection = false) {
  selectionMenu.hidden = true;
  documentEditor.setAttribute('aria-expanded', 'false');
  if (restoreSelection && selectedEditorRange) {
    documentEditor.focus();
    documentEditor.setSelectionRange(selectedEditorRange.start, selectedEditorRange.end);
  }
}
function hideSelectionMenu(restoreSelection = false) { closeSelectionMenu(restoreSelection); }

function openSelectionMenuAt(clientX, clientY) {
  const start = documentEditor.selectionStart;
  const end = documentEditor.selectionEnd;
  if (start === end) return;
  selectedEditorRange = { start, end };
  const selectedText = documentEditor.value.slice(start, end).replace(/\s+/gu, ' ').trim();
  $('selection-menu-preview').textContent = selectedText.length > 56 ? `${selectedText.slice(0, 53)}…` : selectedText;
  renderEditorMenu('case');
  selectionMenu.hidden = false;
  documentEditor.setAttribute('aria-expanded', 'true');

  requestAnimationFrame(() => {
    const rect = selectionMenu.getBoundingClientRect();
    let left = clientX;
    let top = clientY;
    if (clientX === undefined || clientY === undefined || (clientX === 0 && clientY === 0)) {
      const editorRect = documentEditor.getBoundingClientRect();
      left = Math.max(8, editorRect.left + 24);
      top = Math.max(8, editorRect.top + 60);
    }
    const finalLeft = Math.max(8, Math.min(left, window.innerWidth - rect.width - 8));
    const finalTop = Math.max(8, Math.min(top, window.innerHeight - rect.height - 8));
    selectionMenu.style.left = `${finalLeft}px`;
    selectionMenu.style.top = `${finalTop}px`;
    selectionMenu.querySelector('[data-tool]')?.focus({ preventScroll: true });
  });
}

function openSelectionMenu(event) {
  if (documentEditor.selectionStart === documentEditor.selectionEnd) return;
  event.preventDefault();
  openSelectionMenuAt(event.clientX, event.clientY);
}

function applyEditorChange(tool, mode) {
  if (!selectedEditorRange) return;
  const { start, end } = selectedEditorRange;
  const original = documentEditor.value;
  const selected = original.slice(start, end);
  const category = categories.find(item => item.tools.some(([id]) => id === tool));
  if (!category) return;

  const previousActiveTool = activeTool;
  const previousDirection = direction;
  activeTool = tool;
  direction = mode;
  const transformed = convert(selected);
  activeTool = previousActiveTool;
  direction = previousDirection;

  if (transformed === null) {
    $('editor-status').textContent = 'Could not translate selected format.';
    return;
  }
  if (transformed !== selected) saveEditorSnapshot(original);

  documentEditor.value = original.slice(0, start) + transformed + original.slice(end);
  lastDocumentValue = documentEditor.value;
  lastEditorInputCheckpoint = 0;
  selectedEditorRange = { start, end: start + transformed.length };
  closeSelectionMenu(false);
  documentEditor.focus();
  documentEditor.setSelectionRange(selectedEditorRange.start, selectedEditorRange.end);
  updateEditorStats();
  scheduleEditorDraftSave();

  const operation = category.tools.find(([id]) => id === tool);
  $('editor-status').textContent = `${operation[1]} applied to selection`;
}

function undoEditorChange() {
  if (!editorUndoStack.length) return;
  const previous = editorUndoStack.pop();
  editorHistoryBytes = Math.max(0, editorHistoryBytes - editorSnapshotSize(previous));
  editorRedoStack.push(documentEditor.value);
  editorHistoryBytes += editorSnapshotSize(documentEditor.value);
  documentEditor.value = previous;
  lastDocumentValue = documentEditor.value;
  lastEditorInputCheckpoint = 0;
  trimEditorHistory();
  selectedEditorRange = null;
  updateEditorStats();
  scheduleEditorDraftSave();
  $('editor-status').textContent = 'Last change undone';
}

function redoEditorChange() {
  if (!editorRedoStack.length) return;
  const restored = editorRedoStack.pop();
  editorHistoryBytes = Math.max(0, editorHistoryBytes - editorSnapshotSize(restored));
  editorUndoStack.push(documentEditor.value);
  editorHistoryBytes += editorSnapshotSize(documentEditor.value);
  documentEditor.value = restored;
  lastDocumentValue = documentEditor.value;
  lastEditorInputCheckpoint = 0;
  trimEditorHistory();
  selectedEditorRange = null;
  updateEditorStats();
  scheduleEditorDraftSave();
  $('editor-status').textContent = 'Change restored';
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* Fallback */ }
  const temporary = document.createElement('textarea');
  temporary.value = text;
  temporary.setAttribute('readonly', '');
  temporary.style.position = 'fixed';
  temporary.style.left = '-10000px';
  temporary.style.top = '0';
  document.body.appendChild(temporary);
  temporary.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch { copied = false; }
  temporary.remove();
  return copied;
}

async function copyDocument() {
  if (!documentEditor.value) return;
  if (!await copyText(documentEditor.value)) {
    $('editor-status').textContent = 'Copy failed. Select the document and copy it manually.';
    return;
  }
  const copiedLabel = document.createElement('span');
  copiedLabel.textContent = 'Copied';
  $('editor-copy').replaceChildren(document.createTextNode('✓ '), copiedLabel);
  $('editor-status').textContent = 'Document copied to clipboard';
  window.setTimeout(() => {
    const copyLabel = document.createElement('span');
    copyLabel.textContent = 'Copy all';
    $('editor-copy').replaceChildren(document.createTextNode('▢ '), copyLabel);
    if (!selectionMenu.hidden) return;
    $('editor-status').textContent = 'Select text, then right-click for tools';
  }, 1400);
}

document.querySelectorAll('[data-menu-category]').forEach(button => button.addEventListener('click', () => renderEditorMenu(button.dataset.menuCategory)));
$('selection-menu-items').addEventListener('click', event => {
  const button = event.target.closest('[data-tool]');
  if (button) applyEditorChange(button.dataset.tool, button.dataset.direction);
});
$('close-selection-menu').addEventListener('click', () => closeSelectionMenu(true));
selectionMenu.addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); closeSelectionMenu(true); return; }
  if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
  const items = [...selectionMenu.querySelectorAll('[data-tool]')];
  const index = items.indexOf(document.activeElement);
  const next = event.key === 'ArrowDown' ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
  event.preventDefault(); items[next]?.focus();
});
document.addEventListener('pointerdown', event => {
  if (!selectionMenu.hidden && !selectionMenu.contains(event.target) && event.target !== $('editor-menu-trigger')) {
    closeSelectionMenu(false);
  }
});
documentEditor.addEventListener('contextmenu', openSelectionMenu);
const editorMenuTrigger = $('editor-menu-trigger');
if (editorMenuTrigger) {
  editorMenuTrigger.addEventListener('click', () => {
    const rect = editorMenuTrigger.getBoundingClientRect();
    openSelectionMenuAt(rect.left, rect.bottom + 8);
  });
}

documentEditor.addEventListener('input', event => {
  if (lastDocumentValue !== documentEditor.value) {
    const now = Date.now();
    const bulkEdit = /paste|drop|replacement/iu.test(event.inputType || '');
    if (bulkEdit || now - lastEditorInputCheckpoint > 700) {
      saveEditorSnapshot(lastDocumentValue);
      lastEditorInputCheckpoint = now;
    }
  }
  lastDocumentValue = documentEditor.value;
  scheduleEditorDraftSave();
  updateEditorStats();
});
['select', 'keyup', 'mouseup'].forEach(type => documentEditor.addEventListener(type, updateEditorStats));
$('editor-undo').addEventListener('click', undoEditorChange);
$('editor-redo').addEventListener('click', redoEditorChange);
$('editor-copy').addEventListener('click', copyDocument);
const editorDownloadBtn = $('editor-download');
if (editorDownloadBtn) {
  editorDownloadBtn.addEventListener('click', () => {
    if (!documentEditor.value) return;
    const docTitle = $('document-title')?.textContent?.trim() || 'wordshift-document';
    const filename = docTitle.endsWith('.txt') ? docTitle : `${docTitle}.txt`;
    const blob = new Blob([documentEditor.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('editor-status').textContent = 'Download started';
  });
}

$('editor-clear').addEventListener('click', () => {
  if (!documentEditor.value) return;
  saveEditorSnapshot(documentEditor.value);
  documentEditor.value = '';
  lastDocumentValue = '';
  lastEditorInputCheckpoint = 0;
  selectedEditorRange = null;
  documentEditor.focus();
  updateEditorStats();
  scheduleEditorDraftSave();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    stopMorsePlayback();
    saveEditorDraft();
  }
});
window.addEventListener('pagehide', () => {
  stopMorsePlayback();
  saveEditorDraft();
});

source.addEventListener('input', () => {
  stopMorsePlayback();
  renderStats();
  renderResult();
});

$('clear-button').addEventListener('click', () => {
  stopMorsePlayback();
  if (source.value) lastClearedSource = source.value;
  source.value = '';
  renderStats();
  renderResult();
  source.focus();
  if (lastClearedSource) {
    $('result-status').textContent = 'Text cleared. Press Ctrl+Z or click ⇄ to restore.';
  }
});

$('swap-button').addEventListener('click', () => {
  stopMorsePlayback();
  if (!result.value && lastClearedSource) {
    source.value = lastClearedSource;
    lastClearedSource = '';
  } else {
    source.value = result.value;
  }
  renderStats();
  renderResult();
  source.focus();
});

$('copy-button').addEventListener('click', async () => {
  if (!result.value) return;
  if (!await copyText(result.value)) {
    $('result-status').textContent = 'Copy failed. Select the result and copy it manually.';
    return;
  }
  $('copy-label').textContent = 'Copied';
  $('result-status').textContent = 'Copied to clipboard';
  window.setTimeout(() => {
    $('copy-label').textContent = 'Copy';
    $('result-status').textContent = result.value ? 'Ready to copy' : 'Your converted text will appear here';
  }, 1500);
});

// Paste button handler
const pasteButton = $('paste-button');
if (pasteButton) {
  pasteButton.addEventListener('click', async () => {
    try {
      if (navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          source.value = text;
          renderStats();
          renderResult();
          $('result-status').textContent = 'Pasted from clipboard';
          return;
        }
      }
    } catch { /* Clipboard permission blocked */ }
    source.focus();
    $('result-status').textContent = 'Paste not permitted by browser. Use Ctrl+V.';
  });
}

document.addEventListener('keydown', event => {
  const modifier = event.ctrlKey || event.metaKey;
  if (event.key === 'Escape') {
    closeActiveModals();
  }
  if (modifier && !$('document-mode-view').hidden && event.key.toLowerCase() === 'f') {
    event.preventDefault();
    toggleFindBar(true);
    return;
  }
  if (modifier && !$('document-mode-view').hidden && event.target === documentEditor) {
    if (event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (event.shiftKey) redoEditorChange(); else undoEditorChange();
      return;
    }
    if (event.key.toLowerCase() === 'y') { event.preventDefault(); redoEditorChange(); return; }
  }
  // Undo clear in Quick mode
  if (modifier && $('document-mode-view').hidden && event.target === source && event.key.toLowerCase() === 'z' && !source.value && lastClearedSource) {
    event.preventDefault();
    source.value = lastClearedSource;
    lastClearedSource = '';
    renderStats();
    renderResult();
    return;
  }
  if (modifier && event.key === 'Enter') {
    event.preventDefault();
    if ($('document-mode-view').hidden) $('copy-button').click(); else copyDocument();
  }
});

const quickDownloadBtn = $('download-button');
if (quickDownloadBtn) {
  quickDownloadBtn.addEventListener('click', () => {
    if (!result.value) return;
    const blob = new Blob([result.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted-text.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    $('result-status').textContent = 'Download started';
    window.setTimeout(() => $('result-status').textContent = result.value ? 'Ready to copy' : 'Your converted text will appear here', 1800);
  });
}

// File upload for Quick mode
$('file-upload').addEventListener('change', async event => {
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    $('result-status').textContent = 'File is too large. Choose a file under 10 MB.';
    event.target.value = '';
    return;
  }
  try {
    source.value = await file.text();
    renderStats();
    renderResult();
    $('result-status').textContent = `Opened ${file.name}`;
  } catch {
    $('result-status').textContent = 'Could not read this file. Try a plain text file.';
  } finally {
    event.target.value = '';
  }
});

// File upload for Document editor
const editorFileUpload = $('editor-file-upload');
if (editorFileUpload) {
  editorFileUpload.addEventListener('change', async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      $('editor-status').textContent = 'File is too large. Choose a file under 10 MB.';
      event.target.value = '';
      return;
    }
    try {
      const content = await file.text();
      saveEditorSnapshot(documentEditor.value);
      documentEditor.value = content;
      lastDocumentValue = content;
      const titleElem = $('document-title');
      if (titleElem) titleElem.textContent = file.name;
      updateEditorStats();
      scheduleEditorDraftSave();
      $('editor-status').textContent = `Opened ${file.name}`;
    } catch {
      $('editor-status').textContent = 'Could not read this file.';
    } finally {
      event.target.value = '';
    }
  });
}

// Drag & drop file support
function setupDropZone(textarea, onFileText) {
  ['dragenter', 'dragover'].forEach(name => {
    textarea.addEventListener(name, e => {
      e.preventDefault();
      textarea.classList.add('drag-active');
    });
  });
  ['dragleave', 'dragend'].forEach(name => {
    textarea.addEventListener(name, () => textarea.classList.remove('drag-active'));
  });
  textarea.addEventListener('drop', async e => {
    e.preventDefault();
    textarea.classList.remove('drag-active');
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      onFileText(text, file.name);
    } catch { /* read failure */ }
  });
}

// Prevent browser from navigating away on dropped files outside drop targets
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => e.preventDefault());

setupDropZone(source, (text, name) => {
  source.value = text;
  renderStats();
  renderResult();
  $('result-status').textContent = `Dropped ${name}`;
});

setupDropZone(documentEditor, (text, name) => {
  saveEditorSnapshot(documentEditor.value);
  documentEditor.value = text;
  lastDocumentValue = text;
  const titleElem = $('document-title');
  if (titleElem) titleElem.textContent = name;
  updateEditorStats();
  scheduleEditorDraftSave();
  $('editor-status').textContent = `Dropped ${name}`;
});

// Custom terms persistence
try {
  $('custom-terms').value = localStorage.getItem('form-custom-terms') || '';
} catch {
  $('custom-terms').value = '';
}
$('custom-terms').addEventListener('input', () => {
  try { localStorage.setItem('form-custom-terms', $('custom-terms').value); } catch { /* Ignore storage error */ }
  renderResult();
});
document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => setDirection(button.dataset.direction)));

$('play-button').addEventListener('click', playMorse);

// Theme Toggle System
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = $('theme-icon');
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  const metaTheme = $('theme-color-meta');
  if (metaTheme) metaTheme.content = theme === 'dark' ? '#0c0e0d' : '#eaf0eb';
  try { localStorage.setItem('wordshift-theme', theme); } catch { /* Storage disabled */ }
}

const themeToggle = $('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

try {
  const savedTheme = localStorage.getItem('wordshift-theme') || (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);
} catch {
  setTheme('light');
}

renderCategories();
renderTools();
overview();
renderStats();
renderResult();
updateEditorStats();
restoreEditorDraft();

// Feature 1: Service Worker Registration for PWA Offline Caching
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => { /* Registration failed or offline */ });
  });
}

// Modal management
function closeActiveModals() {
  const diffModal = $('diff-modal');
  if (diffModal && !diffModal.hidden) diffModal.hidden = true;
  const exportModal = $('export-modal');
  if (exportModal && !exportModal.hidden) exportModal.hidden = true;
  const analyticsModal = $('analytics-modal');
  if (analyticsModal && !analyticsModal.hidden) analyticsModal.hidden = true;
  const findBar = $('find-replace-bar');
  if (findBar && !findBar.hidden) toggleFindBar(false);
}

[$('diff-modal'), $('export-modal'), $('analytics-modal')].forEach(modal => {
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.hidden = true;
    });
  }
});

// Feature 2: In-Document Find and Replace System
let findMatches = [];
let findMatchIndex = -1;
let findCase = false;
let findWord = false;
let findRegex = false;

function toggleFindBar(show) {
  const bar = $('find-replace-bar');
  if (!bar) return;
  const willShow = typeof show === 'boolean' ? show : bar.hidden;
  bar.hidden = !willShow;
  const trigger = $('editor-find-trigger');
  if (trigger) trigger.setAttribute('aria-expanded', String(willShow));

  if (willShow) {
    const input = $('find-input');
    if (input) {
      input.focus();
      input.select();
    }
    updateFindMatches();
  } else {
    findMatches = [];
    findMatchIndex = -1;
    documentEditor.focus();
  }
}

function updateFindMatches() {
  const input = $('find-input');
  const countDisplay = $('find-count');
  if (!input || !countDisplay) return;

  const query = input.value;
  if (!query) {
    findMatches = [];
    findMatchIndex = -1;
    countDisplay.textContent = '0 of 0';
    return;
  }

  let pattern = query;
  if (!findRegex) {
    pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  if (findWord) {
    pattern = `\\b(?:${pattern})\\b`;
  }

  let re;
  try {
    re = new RegExp(pattern, findCase ? 'gu' : 'giu');
  } catch {
    countDisplay.textContent = 'Regex error';
    findMatches = [];
    findMatchIndex = -1;
    return;
  }

  const text = documentEditor.value;
  const matches = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
    if (m.index === re.lastIndex) re.lastIndex++;
  }

  findMatches = matches;
  if (matches.length === 0) {
    countDisplay.textContent = 'No matches';
    findMatchIndex = -1;
  } else {
    const cursor = documentEditor.selectionStart;
    let nextIdx = matches.findIndex(match => match.start >= cursor);
    if (nextIdx === -1) nextIdx = 0;
    findMatchIndex = nextIdx;
    highlightCurrentMatch();
  }
}

function highlightCurrentMatch() {
  const countDisplay = $('find-count');
  if (findMatchIndex >= 0 && findMatchIndex < findMatches.length) {
    if (countDisplay) countDisplay.textContent = `${findMatchIndex + 1} of ${findMatches.length}`;
    const m = findMatches[findMatchIndex];
    documentEditor.focus();
    documentEditor.setSelectionRange(m.start, m.end);
  } else if (countDisplay) {
    countDisplay.textContent = findMatches.length ? `${findMatches.length} matches` : ($('find-input')?.value ? 'No matches' : '0 of 0');
  }
}

function stepFindMatch(delta) {
  if (!findMatches.length) return;
  findMatchIndex = (findMatchIndex + delta + findMatches.length) % findMatches.length;
  highlightCurrentMatch();
}

function replaceCurrentMatch() {
  if (!findMatches.length || findMatchIndex < 0 || findMatchIndex >= findMatches.length) return;
  const repInput = $('replace-input');
  const replacement = repInput ? repInput.value : '';
  const m = findMatches[findMatchIndex];

  saveEditorSnapshot(documentEditor.value);
  documentEditor.value = documentEditor.value.slice(0, m.start) + replacement + documentEditor.value.slice(m.end);
  lastDocumentValue = documentEditor.value;
  updateEditorStats();
  scheduleEditorDraftSave();

  documentEditor.setSelectionRange(m.start + replacement.length, m.start + replacement.length);
  updateFindMatches();
}

function replaceAllMatches() {
  const findIn = $('find-input');
  if (!findIn || !findIn.value || !findMatches.length) return;

  let pattern = findIn.value;
  if (!findRegex) {
    pattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  if (findWord) {
    pattern = `\\b(?:${pattern})\\b`;
  }

  let re;
  try {
    re = new RegExp(pattern, findCase ? 'gu' : 'giu');
  } catch {
    return;
  }

  const repInput = $('replace-input');
  const replacement = repInput ? repInput.value : '';
  const count = findMatches.length;

  saveEditorSnapshot(documentEditor.value);
  documentEditor.value = documentEditor.value.replace(re, findRegex ? replacement : () => replacement);
  lastDocumentValue = documentEditor.value;
  updateEditorStats();
  scheduleEditorDraftSave();

  const countDisplay = $('find-count');
  if (countDisplay) countDisplay.textContent = `Replaced ${count}`;
  findMatches = [];
  findMatchIndex = -1;
}

const editorFindTrigger = $('editor-find-trigger');
if (editorFindTrigger) editorFindTrigger.addEventListener('click', () => toggleFindBar());

const findCloseBtn = $('find-close');
if (findCloseBtn) findCloseBtn.addEventListener('click', () => toggleFindBar(false));

const findIn = $('find-input');
if (findIn) {
  findIn.addEventListener('input', updateFindMatches);
  findIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) stepFindMatch(-1); else stepFindMatch(1);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      toggleFindBar(false);
    }
  });
}

const repIn = $('replace-input');
if (repIn) {
  repIn.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      replaceCurrentMatch();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      toggleFindBar(false);
    }
  });
}

const findPrevBtn = $('find-prev');
if (findPrevBtn) findPrevBtn.addEventListener('click', () => stepFindMatch(-1));

const findNextBtn = $('find-next');
if (findNextBtn) findNextBtn.addEventListener('click', () => stepFindMatch(1));

const findCaseBtn = $('find-case-toggle');
if (findCaseBtn) {
  findCaseBtn.addEventListener('click', () => {
    findCase = !findCase;
    findCaseBtn.classList.toggle('active', findCase);
    findCaseBtn.setAttribute('aria-pressed', String(findCase));
    updateFindMatches();
  });
}

const findWordBtn = $('find-word-toggle');
if (findWordBtn) {
  findWordBtn.addEventListener('click', () => {
    findWord = !findWord;
    findWordBtn.classList.toggle('active', findWord);
    findWordBtn.setAttribute('aria-pressed', String(findWord));
    updateFindMatches();
  });
}

const findRegexBtn = $('find-regex-toggle');
if (findRegexBtn) {
  findRegexBtn.addEventListener('click', () => {
    findRegex = !findRegex;
    findRegexBtn.classList.toggle('active', findRegex);
    findRegexBtn.setAttribute('aria-pressed', String(findRegex));
    updateFindMatches();
  });
}

const replaceOneBtn = $('replace-one-btn');
if (replaceOneBtn) replaceOneBtn.addEventListener('click', replaceCurrentMatch);

const replaceAllBtn = $('replace-all-btn');
if (replaceAllBtn) replaceAllBtn.addEventListener('click', replaceAllMatches);

// Feature 3: Text Diff Viewer (Word-level LCS comparison)
function computeDiff(original, modified) {
  const tokenize = text => text.match(/[\p{L}\p{N}]+|[^\p{L}\p{N}\s]+|\s+/gu) || [];
  const a = tokenize(original).slice(0, 1500);
  const b = tokenize(modified).slice(0, 1500);

  const dp = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1));
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      dp[i + 1][j + 1] = a[i] === b[j] ? dp[i][j] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  let i = a.length, j = b.length;
  const chunks = [];
  let adds = 0, dels = 0, matches = 0;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      chunks.unshift({ type: 'same', text: a[i - 1] });
      matches++;
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      chunks.unshift({ type: 'add', text: b[j - 1] });
      adds++;
      j--;
    } else {
      chunks.unshift({ type: 'del', text: a[i - 1] });
      dels++;
      i--;
    }
  }

  const merged = [];
  for (const c of chunks) {
    if (merged.length && merged[merged.length - 1].type === c.type) {
      merged[merged.length - 1].text += c.text;
    } else {
      merged.push({ ...c });
    }
  }

  return { chunks: merged, adds, dels, matches };
}

function showDiffModal(original, modified, title) {
  const modal = $('diff-modal');
  const titleElem = $('diff-title');
  const summaryElem = $('diff-summary');
  const bodyElem = $('diff-body');
  if (!modal || !bodyElem) return;

  if (titleElem) titleElem.textContent = title || 'Text Comparison / Diff';

  const { chunks, adds, dels, matches } = computeDiff(original, modified);

  if (summaryElem) {
    summaryElem.innerHTML = `<span>Additions: <strong>+${adds}</strong></span> <span>Deletions: <strong>-${dels}</strong></span> <span>Unchanged: <strong>${matches}</strong></span>`;
  }

  let html = '';
  for (const chunk of chunks) {
    const safeText = escapeHtml(chunk.text);
    if (chunk.type === 'add') {
      html += `<ins class="diff-ins">${safeText}</ins>`;
    } else if (chunk.type === 'del') {
      html += `<del class="diff-del">${safeText}</del>`;
    } else {
      html += `<span>${safeText}</span>`;
    }
  }
  bodyElem.innerHTML = html || '<em>No differences found. Both texts are identical.</em>';
  modal.hidden = false;
}

const quickDiffBtn = $('quick-diff-btn');
if (quickDiffBtn) {
  quickDiffBtn.addEventListener('click', () => {
    showDiffModal(source.value, result.value, 'Comparison: Source vs Result');
  });
}

const editorDiffTrigger = $('editor-diff-trigger');
if (editorDiffTrigger) {
  editorDiffTrigger.addEventListener('click', () => {
    const prevText = editorUndoStack.length ? editorUndoStack.at(-1) : '';
    showDiffModal(prevText, documentEditor.value, 'Comparison: Previous Revision vs Current Text');
  });
}

const diffCloseBtn = $('diff-close');
if (diffCloseBtn) diffCloseBtn.addEventListener('click', () => { $('diff-modal').hidden = true; });

const diffDoneBtn = $('diff-done-btn');
if (diffDoneBtn) diffDoneBtn.addEventListener('click', () => { $('diff-modal').hidden = true; });

// Feature 4: Safe Zero-Dependency Markdown Live Preview
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function formatMarkdownInline(str) {
  let res = escapeHtml(str);
  res = res.replace(/`([^`]+)`/g, '<code>$1</code>');
  res = res.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  res = res.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  res = res.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  res = res.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  res = res.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|#[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return res;
}

function parseMarkdown(md) {
  if (!md) return '';
  const lines = md.split(/\r?\n/);
  let html = '';
  let inCodeBlock = false;
  let inList = false;
  let listType = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        html += '</code></pre>\n';
        inCodeBlock = false;
      } else {
        const lang = escapeHtml(line.trim().slice(3).trim());
        html += `<pre><code class="${lang ? 'language-' + lang : ''}">`;
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      html += escapeHtml(line) + '\n';
      continue;
    }

    if (!line.trim()) {
      if (inList) {
        html += listType === 'ol' ? '</ol>\n' : '</ul>\n';
        inList = false;
        listType = null;
      }
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      if (inList) { html += listType === 'ol' ? '</ol>\n' : '</ul>\n'; inList = false; }
      const level = headingMatch[1].length;
      html += `<h${level}>${formatMarkdownInline(headingMatch[2])}</h${level}>\n`;
      continue;
    }

    if (/^(?:---|\*\*\*|___)\s*$/.test(line.trim())) {
      if (inList) { html += listType === 'ol' ? '</ol>\n' : '</ul>\n'; inList = false; }
      html += '<hr>\n';
      continue;
    }

    if (line.startsWith('>')) {
      if (inList) { html += listType === 'ol' ? '</ol>\n' : '</ul>\n'; inList = false; }
      html += `<blockquote>${formatMarkdownInline(line.replace(/^>\s*/, ''))}</blockquote>\n`;
      continue;
    }

    const ulMatch = line.match(/^[\*\-]\s+(.*)$/);
    if (ulMatch) {
      if (!inList || listType !== 'ul') {
        if (inList) html += listType === 'ol' ? '</ol>\n' : '</ul>\n';
        html += '<ul>\n';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${formatMarkdownInline(ulMatch[1])}</li>\n`;
      continue;
    }

    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) html += listType === 'ol' ? '</ol>\n' : '</ul>\n';
        html += '<ol>\n';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${formatMarkdownInline(olMatch[1])}</li>\n`;
      continue;
    }

    if (inList) { html += listType === 'ol' ? '</ol>\n' : '</ul>\n'; inList = false; }
    html += `<p>${formatMarkdownInline(line)}</p>\n`;
  }

  if (inCodeBlock) html += '</code></pre>\n';
  if (inList) html += listType === 'ol' ? '</ol>\n' : '</ul>\n';

  return html;
}

let isPreviewActive = false;
function toggleMarkdownPreview(force) {
  const preview = $('document-preview');
  const toggleBtn = $('editor-preview-toggle');
  if (!preview || !toggleBtn) return;

  isPreviewActive = typeof force === 'boolean' ? force : !isPreviewActive;
  if (isPreviewActive) {
    preview.innerHTML = parseMarkdown(documentEditor.value) || '<p><em>Nothing to preview. Write something in the editor first.</em></p>';
    preview.hidden = false;
    documentEditor.hidden = true;
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-pressed', 'true');
    toggleBtn.innerHTML = '<span aria-hidden="true">✎</span> <span>Edit</span>';
  } else {
    preview.hidden = true;
    documentEditor.hidden = false;
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.innerHTML = '<span aria-hidden="true">👁</span> <span>Preview</span>';
    documentEditor.focus();
  }
}

const previewToggleBtn = $('editor-preview-toggle');
if (previewToggleBtn) {
  previewToggleBtn.addEventListener('click', () => toggleMarkdownPreview());
}

// Feature 5: Advanced Export Options
let activeExportText = '';
let activeExportFilename = 'wordshift-document';

function openExportModal(text, defaultName) {
  if (!text) return;
  activeExportText = text;
  activeExportFilename = (defaultName || 'wordshift-document').replace(/[\\/:*?"<>|]/g, '-').trim() || 'wordshift-document';
  const modal = $('export-modal');
  if (modal) modal.hidden = false;
}

function downloadExportBlob(content, filename, mimeType) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function generateStandaloneHtml(text, title) {
  const safeTitle = escapeHtml(title);
  const bodyContent = parseMarkdown(text);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.7;
      max-width: 780px;
      margin: 48px auto;
      padding: 0 24px;
      color: #172a24;
      background: #ffffff;
    }
    h1, h2, h3, h4 { color: #0d4a38; font-weight: 700; line-height: 1.25; margin-top: 1.5em; }
    p, ul, ol, blockquote { margin-bottom: 1.2em; }
    blockquote { border-left: 4px solid #148060; padding-left: 16px; margin-left: 0; color: #40544c; font-style: italic; }
    pre { background: #f4f7f3; border: 1px solid #d7e2da; border-radius: 8px; padding: 14px; overflow-x: auto; font-size: 0.9em; }
    code { font-family: Consolas, Monaco, "Courier New", monospace; background: #eef3ef; padding: 2px 6px; border-radius: 4px; }
    pre code { background: none; padding: 0; }
    hr { border: 0; border-top: 1px solid #d7e2da; margin: 32px 0; }
    a { color: #0f6f52; text-decoration: underline; }
    @media print {
      body { max-width: 100%; margin: 0; padding: 0; }
    }
  </style>
</head>
<body>
  <article>
    ${bodyContent}
  </article>
</body>
</html>`;
}

document.querySelectorAll('.export-option-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.exportType;
    const modal = $('export-modal');
    if (modal) modal.hidden = true;

    if (type === 'txt') {
      downloadExportBlob(activeExportText, `${activeExportFilename}.txt`, 'text/plain');
    } else if (type === 'md') {
      downloadExportBlob(activeExportText, `${activeExportFilename}.md`, 'text/markdown');
    } else if (type === 'html') {
      const htmlDoc = generateStandaloneHtml(activeExportText, activeExportFilename);
      downloadExportBlob(htmlDoc, `${activeExportFilename}.html`, 'text/html');
    } else if (type === 'print') {
      window.print();
    }
  });
});

const quickExportBtn = $('quick-export-btn');
if (quickExportBtn) {
  quickExportBtn.addEventListener('click', () => {
    openExportModal(result.value, 'wordshift-export');
  });
}

const editorExportTrigger = $('editor-export-trigger');
if (editorExportTrigger) {
  editorExportTrigger.addEventListener('click', () => {
    const title = $('document-title')?.textContent || 'wordshift-document';
    openExportModal(documentEditor.value, title);
  });
}

const exportCloseBtn = $('export-close');
if (exportCloseBtn) exportCloseBtn.addEventListener('click', () => { $('export-modal').hidden = true; });

// Feature 6: Text Analytics & Readability Inspector
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyzeTextMetrics(text) {
  const charsTotal = [...text].length;
  const charsNoSpaces = [...text.replace(/\s/gu, '')].length;
  const words = text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];
  const sentences = text.split(/[.!?]+(?:\s+|\n|$)/u).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/u).filter(p => p.trim().length > 0);

  const wordCount = words.length;
  const sentenceCount = sentences.length || (wordCount > 0 ? 1 : 0);
  const paragraphCount = paragraphs.length || (text.trim() ? 1 : 0);

  let totalSyllables = 0;
  for (const w of words) totalSyllables += countSyllables(w);

  let fleschScore = 100;
  let gradeLevel = '5th Grade';
  let readingDifficulty = 'Very Easy';

  if (wordCount > 0 && sentenceCount > 0) {
    const ASL = wordCount / sentenceCount;
    const ASW = totalSyllables / wordCount;
    fleschScore = Math.max(0, Math.min(100, Math.round(206.835 - (1.015 * ASL) - (84.6 * ASW))));
    if (fleschScore >= 90) { gradeLevel = '5th Grade'; readingDifficulty = 'Very Easy'; }
    else if (fleschScore >= 80) { gradeLevel = '6th Grade'; readingDifficulty = 'Easy'; }
    else if (fleschScore >= 70) { gradeLevel = '7th Grade'; readingDifficulty = 'Fairly Easy'; }
    else if (fleschScore >= 60) { gradeLevel = '8th–9th Grade'; readingDifficulty = 'Standard'; }
    else if (fleschScore >= 50) { gradeLevel = '10th–12th Grade'; readingDifficulty = 'Fairly Difficult'; }
    else if (fleschScore >= 30) { gradeLevel = 'College Level'; readingDifficulty = 'Difficult'; }
    else { gradeLevel = 'College Graduate'; readingDifficulty = 'Very Confusing'; }
  }

  const stopWords = new Set(['the','and','a','an','in','on','at','to','for','of','is','it','this','that','with','as','by','was','are','be','or','from','have','has','had','not','but','all','they','we','you','he','she']);
  const freqMap = new Map();
  for (const w of words) {
    const lower = w.toLowerCase();
    if (!stopWords.has(lower) && lower.length > 1) {
      freqMap.set(lower, (freqMap.get(lower) || 0) + 1);
    }
  }
  const topWords = [...freqMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  return {
    charsTotal,
    charsNoSpaces,
    wordCount,
    sentenceCount,
    paragraphCount,
    readingMins: Math.ceil(wordCount / 200),
    speakingMins: Math.ceil(wordCount / 130),
    fleschScore,
    gradeLevel,
    readingDifficulty,
    avgWordLength: wordCount ? (charsNoSpaces / wordCount).toFixed(1) : '0',
    avgSentenceLength: sentenceCount ? Math.round(wordCount / sentenceCount) : 0,
    topWords
  };
}

function showAnalyticsModal(text) {
  const modal = $('analytics-modal');
  const grid = $('analytics-grid');
  if (!modal || !grid) return;

  const data = analyzeTextMetrics(text);

  const keywordsHtml = data.topWords.length
    ? data.topWords.map(([w, c]) => `<span class="word-chip">${escapeHtml(w)} <span>×${c}</span></span>`).join('')
    : '<span class="stat-sub">None detected</span>';

  grid.innerHTML = `
    <div class="stat-tile">
      <span class="stat-label">Reading Ease</span>
      <span class="stat-num">${data.fleschScore}</span>
      <span class="stat-sub">${data.readingDifficulty} • ${data.gradeLevel}</span>
    </div>
    <div class="stat-tile">
      <span class="stat-label">Estimated Time</span>
      <span class="stat-num">${data.readingMins} min</span>
      <span class="stat-sub">Reading • Speaking: ~${data.speakingMins} min</span>
    </div>
    <div class="stat-tile">
      <span class="stat-label">Length</span>
      <span class="stat-num">${data.wordCount.toLocaleString()}</span>
      <span class="stat-sub">Words • ${data.sentenceCount.toLocaleString()} Sentences • ${data.paragraphCount.toLocaleString()} Paragraphs</span>
    </div>
    <div class="stat-tile">
      <span class="stat-label">Characters</span>
      <span class="stat-num">${data.charsTotal.toLocaleString()}</span>
      <span class="stat-sub">${data.charsNoSpaces.toLocaleString()} without spaces</span>
    </div>
    <div class="stat-tile">
      <span class="stat-label">Averages</span>
      <span class="stat-num">${data.avgWordLength}</span>
      <span class="stat-sub">Avg word length • ${data.avgSentenceLength} words/sentence</span>
    </div>
    <div class="stat-tile wide-tile">
      <span class="stat-label">Top Words</span>
      <div class="word-cloud">${keywordsHtml}</div>
    </div>
  `;

  modal.hidden = false;
}

const quickAnalyticsBtn = $('quick-analytics-btn');
if (quickAnalyticsBtn) {
  quickAnalyticsBtn.addEventListener('click', () => {
    showAnalyticsModal(result.value || source.value || '');
  });
}

const editorAnalyticsBtn = $('editor-analytics-btn');
if (editorAnalyticsBtn) {
  editorAnalyticsBtn.addEventListener('click', () => {
    showAnalyticsModal(documentEditor.value || '');
  });
}

const analyticsCloseBtn = $('analytics-close');
if (analyticsCloseBtn) analyticsCloseBtn.addEventListener('click', () => { $('analytics-modal').hidden = true; });

const analyticsDoneBtn = $('analytics-done-btn');
if (analyticsDoneBtn) analyticsDoneBtn.addEventListener('click', () => { $('analytics-modal').hidden = true; });
