const VIEWBOX = { w: 1086, h: 1462 };
const SCREEN = { x: 348, y: 261, w: 391, h: 548 };
const SEGMENT_ON = "#373435";
const SEGMENT_OFF = "rgba(55, 52, 53, 0.01)";

const digitSegments = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "1": ["b", "c"],
  "2": ["a", "b", "g", "e", "d"],
  "3": ["a", "b", "c", "d", "g"],
  "4": ["f", "g", "b", "c"],
  "5": ["a", "f", "g", "c", "d"],
  "6": ["a", "f", "g", "e", "c", "d"],
  "7": ["a", "b", "c"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
};

const largeTemplate = {
  a: { x: 0.988, y: 0, w: 36.027, h: 12.817, path: "M 6.924835114359442 0 L 35.54201916440382 0 L 36.02705383300781 2.563472143430808 L 31.36223926081506 12.817360877990724 L 12.112075477981044 12.817360877990724 L 0 6.15233314423394 L 6.924835114359442 0 Z" },
  b: { x: 44.417, y: 1.072, w: 39.272, h: 11.851, path: "M 7.5485238515363315 0 L 38.743126395280065 0 L 39.271846771240234 2.370273178875155 L 34.1868932173158 11.85136604309082 L 13.4492629630352 11.85136604309082 L 0 5.688655629300372 L 7.5485238515363315 0 Z" },
  c: { x: 44.909, y: 83.928, w: 40.078, h: 11.851, path: "M 7.548523484289135 0 L 38.743124510367885 0 L 40.07796859741211 1.8712683225932873 L 34.18689155407131 11.85136604309082 L 13.449262308708047 11.85136604309082 L 0 5.688655629300372 L 7.548523484289135 0 Z" },
  d: { x: 1.48, y: 85, w: 36.027, h: 12.817, path: "M 6.924835114359442 0 L 35.54201916440382 0 L 36.02705383300781 2.563472143430808 L 31.36223926081506 12.817360877990724 L 12.338031906426188 12.817360877990724 L 0 6.15233314423394 L 6.924835114359442 0 Z" },
  e: { x: 0.493, y: 43.57, w: 33.362, h: 11.851, path: "M 5.676990499598438 0.13610156455551178 L 32.83325627841153 0 L 33.361976623535156 2.3702724352999307 L 28.277056820209634 11.85136604309082 L 6.721229071881482 11.85136604309082 L 0 3.2494618013186387 L 5.676990499598438 0.13610156455551178 Z" },
  f: { x: 0, y: 41.151, w: 33.079, h: 11.851, path: "M 6.745979302590047 0 L 32.55052617280112 0 L 33.079246520996094 2.270198215020125 L 27.658515140619194 11.85136604309082 L 7.420577232849052 11.85136604309082 L 0 3.7425366451865747 L 6.745979302590047 0 Z" },
  g: { x: 43.431, y: 48.417, w: 38.988, h: 12.817, path: "M 10.363945982394547 0 L 31.36223635041255 0 L 38.98817825317383 6.152333114806043 L 31.36223635041255 12.817360877990723 L 12.33803076146206 12.817360877990723 L 0 6.152333114806043 L 10.363945982394547 0 Z" },
};

const smallTemplate = {
  a: { x: 0.813, y: 0, w: 29.669, h: 10.556, path: "M 5.702824042553064 0 L 29.26999387918177 0 L 29.669435501098636 2.1111259195537824 L 25.82781093430005 10.55562973022461 L 9.974683021378633 10.55562973022461 L 0 5.066702206929079 L 5.702824042553064 0 Z" },
  b: { x: 36.579, y: 0.882, w: 32.342, h: 9.76, path: "M 6.216522586572063 0 L 31.90657207258552 0 L 32.34199523925781 1.951996015849916 L 28.15432500844739 9.759980201721191 L 11.076026071698639 9.759980201721191 L 0 4.684790438039799 L 6.216522586572063 0 Z" },
  c: { x: 36.985, y: 69.116, w: 33.006, h: 9.76, path: "M 6.2165231550370414 0 L 31.906574990256697 0 L 33.00587463378906 1.541049505534925 L 28.15432758299731 9.759980201721191 L 11.076027084537058 9.759980201721191 L 0 4.684790438039799 L 6.2165231550370414 0 Z" },
  d: { x: 1.219, y: 70, w: 29.669, h: 10.556, path: "M 5.702824042553064 0 L 29.26999387918177 0 L 29.669435501098636 2.1111259195537824 L 25.82781093430005 10.55562973022461 L 10.160765394666388 10.55562973022461 L 0 5.066702206929079 L 5.702824042553064 0 Z" },
  e: { x: 0.406, y: 35.881, w: 27.475, h: 9.76, path: "M 4.675238160080533 0.11208400539273548 L 27.039554264427856 0 L 27.47497749328613 1.9519954034918603 L 23.28733421519041 9.759980201721191 L 5.535212123699291 9.759980201721191 L 0 2.676036056249263 L 4.675238160080533 0.11208400539273548 Z" },
  f: { x: 0, y: 33.889, w: 27.242, h: 9.76, path: "M 5.555594668953621 0 L 26.806712793770142 0 L 27.242136001586914 1.8695810720905444 L 22.777938142709843 9.759980201721191 L 6.111154135848983 9.759980201721191 L 0 3.08209901106985 L 5.555594668953621 0 Z" },
  g: { x: 35.767, y: 39.874, w: 32.108, h: 10.556, path: "M 8.535042373484652 0 L 25.827808889849685 0 L 32.10801696777344 5.066702182693981 L 25.827808889849685 10.55562973022461 L 10.160764590371336 10.55562973022461 L 0 5.066702182693981 L 8.535042373484652 0 Z" },
};

const largeMatrix = {
  a: [1, 0, 0, 1, 0.988, 0],
  b: [0, 1, -1, 0, 44.417, 1.072],
  c: [0, -1, -1, 0, 44.909, 83.928],
  d: [1, 0, 0, -1, 1.48, 85],
  e: [0, 1, 1, 0, 0.493, 43.57],
  f: [0, -1, 1, 0, 0, 41.151],
  g: [-1, 0, 0, -1, 43.431, 48.417],
};

const smallMatrix = {
  a: [1, 0, 0, 1, 0.813, 0],
  b: [0, 1, -1, 0, 36.579, 0.882],
  c: [0, -1, -1, 0, 36.985, 69.116],
  d: [1, 0, 0, -1, 1.219, 70],
  e: [0, 1, 1, 0, 0.406, 35.881],
  f: [0, -1, 1, 0, 0, 33.889],
  g: [-1, 0, 0, -1, 35.767, 39.874],
};

const displays = {
  weight: {
    pad: 3,
    digits: largeDigits([
      [368, 288],
      [419.148, 288],
      [470.297, 288],
    ]),
  },
  total: {
    pad: 3,
    digits: smallDigits([
      [578, 303],
      [620.122, 303],
      [662.245, 303],
    ]),
  },
  net1: { pad: 2, digits: smallDigits([[391, 510], [433.123, 510]]) },
  net2: { pad: 2, digits: smallDigits([[507, 511], [549.122, 511]]) },
  net3: { pad: 2, digits: smallDigits([[623, 511], [665.123, 511]]) },
  net4: { pad: 2, digits: smallDigits([[391, 606], [433.123, 606]]) },
  net5: { pad: 2, digits: smallDigits([[507, 606], [549.123, 606]]) },
  net6: { pad: 2, digits: smallDigits([[623, 606], [665.123, 606]]) },
  stopwatch: {
    pad: 8,
    digits: [
      ...largeDigits([[398, 403], [449.148, 403]]),
      ...largeDigits([[506, 403], [557.148, 403]]),
      ...smallDigits([[614, 418], [656.121, 418]]),
    ],
  },
  clock: {
    pad: 8,
    digits: [
      ...largeDigits([[391, 716], [442.148, 716]]),
      ...largeDigits([[499, 716], [550.148, 716]]),
      ...largeDigits([[607, 716], [658.147, 716]]),
    ],
  },
};

const constantLines = [
  { x1: 0, y1: 0, x2: 104, y2: 0, transform: "matrix(0 1 -1 0 543 268)" },
  { x1: 0, y1: 0, x2: 279, y2: 0, transform: "matrix(-1 0 0 -1 683 389)" },
  { x1: 0, y1: 0, x2: 279, y2: 0, transform: "matrix(1 0 0 1 404 504)" },
  { x1: 0, y1: 0, x2: 279, y2: 0, transform: "matrix(-1 0 0 -1 683 706)" },
];

const constantDots = [
  { x: 496, y: 436, size: 7 },
  { x: 496, y: 448, size: 7 },
  { x: 605, y: 436, size: 7 },
  { x: 605, y: 448, size: 7 },
  { x: 489, y: 751, size: 7 },
  { x: 489, y: 763, size: 7 },
  { x: 598, y: 751, size: 7 },
  { x: 598, y: 763, size: 7 },
];

const battery = {
  x: 683,
  y: 271,
  paths: [
    "M50.731 16.6998L51.3079 16.4379L51.6925 15.9006L51.836 15.2256L51.8523 14.8503V9.8174L51.7954 9.1262L51.5544 8.49166L51.0587 8.07588L50.4494 7.92195L50.1054 7.90577H48.9544V3.83407L48.9301 3.14017L48.8407 2.45164L48.6592 1.79014L48.3532 1.18263L47.9145 0.688527L47.3728 0.342912L46.7716 0.135003L46.1514 0.0296967L45.0166 0H44.9841H3.47199L2.84367 0.026994L2.22077 0.126895L1.61955 0.326696L1.06976 0.661501L0.622912 1.14752L0.311456 1.74963L0.124586 2.41116L0.0298034 3.09696L0 3.79089V3.83407V8.45389H2.32911V2.57046H46.6253V22.1H2.32911V16.203H0V20.8255L0.0270925 21.5168L0.113759 22.2053L0.292496 22.8695L0.593109 23.477L1.02915 23.9738L1.5735 24.3221L2.17203 24.5327L2.79221 24.6353L3.42053 24.6677H3.47199H44.9841L46.1189 24.6407L46.7418 24.5408L47.3403 24.341L47.8901 24.0035L48.3342 23.5148L48.6457 22.9127L48.8326 22.2512L48.9273 21.5653L48.9544 20.8714V20.8255V16.7619H50.1054L50.731 16.6998Z",
    "M25.9619 5.94922V19.4144H33.7508V5.94922H25.9619Z",
    "M4.13867 5.94922V19.4144H11.9276V5.94922H4.13867Z",
    "M22.4946 19.4144V5.94922H15.3691V19.4144H22.4946Z",
    "M44.3151 5.94922H37.1924V19.4144H44.3151V5.94922Z",
  ],
};

const netLabels = [
  { text: "NET 1", x: 410, y: 582, w: 43, h: 24 },
  { text: "NET 2", x: 527, y: 582, w: 46, h: 24 },
  { text: "NET 3", x: 644, y: 582, w: 46, h: 24 },
  { text: "NET 4", x: 410, y: 675, w: 46, h: 24 },
  { text: "NET 5", x: 527, y: 675, w: 46, h: 24 },
  { text: "NET 6", x: 644, y: 675, w: 46, h: 24 },
];

const netIdentifierGroups = [
  { x: 410, y: 582 },
  { x: 527, y: 582 },
  { x: 644, y: 582 },
  { x: 410, y: 675 },
  { x: 527, y: 675 },
  { x: 644, y: 675 },
];

const netIdentifierPaths = [
  "M2.6869 13.6923C1.4414 12.9078 1.4414 11.0922 2.6869 10.3077L13.4341 3.5387C14.766 2.69986 16.5 3.65702 16.5 5.23101V18.769C16.5 20.343 14.766 21.3001 13.4341 20.4613L2.6869 13.6923Z",
  "M80.3131 13.6923C81.5586 12.9078 81.5586 11.0922 80.3131 10.3077L69.5659 3.5387C68.234 2.69986 66.5 3.65702 66.5 5.23101V18.769C66.5 20.343 68.234 21.3001 69.5659 20.4613L80.3131 13.6923Z",
];

const state = {
  powered: false,
  mode: "stopwatch",
  activeNet: 1,
  weight: 0,
  nets: [0, 0, 0, 0, 0, 0],
  stopwatchStartedAt: 0,
  stopwatchElapsed: 0,
  stopwatchPaused: false,
  timerMinutes: 0,
  timerSeconds: 0,
  timerAdjustField: null,
  timerTargetAt: 0,
  timerRemainingMs: 0,
  timerSavedMs: 0,
  timerRunning: false,
  timerAlarmed: false,
  blinkVisible: true,
  silentMode: false,
};

let clockTimer = null;
let stopwatchTimer = null;
let holdTimer = null;
let silentHoldTimer = null;
let holdTriggered = false;
let audioUnlocked = false;
let adjustExitTimer = null;
let blinkTimer = null;

function largeDigits(points) {
  return points.map(([x, y]) => makeDigit(x, y, largeTemplate, largeMatrix));
}

function smallDigits(points) {
  return points.map(([x, y]) => makeDigit(x, y, smallTemplate, smallMatrix));
}

function makeDigit(x, y, template, matrixTemplate) {
  const segments = {};

  Object.entries(template).forEach(([name, box]) => {
    const matrix = matrixTemplate[name];
    segments[name] = {
      path: box.path,
      transform: `matrix(${matrix[0]} ${matrix[1]} ${matrix[2]} ${matrix[3]} ${round(x + matrix[4])} ${round(y + matrix[5])})`,
    };
  });

  return segments;
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function formatNumeric(value, pad) {
  return String(Math.max(0, Math.min(10 ** pad - 1, value))).padStart(pad, " ");
}

function digitsOnly(value) {
  return String(value).replaceAll(":", "");
}

function buildSegmentLayer() {
  const root = document.getElementById("displayLayer");
  root.replaceChildren();
  buildConstantLayer(root);

  Object.entries(displays).forEach(([displayName, display]) => {
    display.digits.forEach((digit, digitIndex) => {
      Object.entries(digit).forEach(([segmentName, box]) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.classList.add("segment");
        path.dataset.display = displayName;
        path.dataset.digit = String(digitIndex);
        path.dataset.segment = segmentName;
        path.setAttribute("d", box.path);
        path.setAttribute("transform", box.transform);
        path.setAttribute("fill", SEGMENT_OFF);
        root.appendChild(path);
      });
    });
  });
}

function buildConstantLayer(root) {
  battery.paths.forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.classList.add("constant", "constant-fill");
    path.setAttribute("d", pathData);
    path.setAttribute("transform", `translate(${battery.x} ${battery.y})`);
    path.setAttribute("fill", "transparent");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("clip-rule", "evenodd");
    root.appendChild(path);
  });

  constantLines.forEach((line) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    element.classList.add("constant", "constant-stroke");
    element.setAttribute("x1", line.x1);
    element.setAttribute("y1", line.y1);
    element.setAttribute("x2", line.x2);
    element.setAttribute("y2", line.y2);
    element.setAttribute("transform", line.transform);
    element.setAttribute("stroke", "transparent");
    element.setAttribute("stroke-width", "5");
    element.setAttribute("stroke-linecap", "butt");
    root.appendChild(element);
  });

  constantDots.forEach((dot) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    element.classList.add("constant", "constant-fill");
    element.setAttribute("x", dot.x);
    element.setAttribute("y", dot.y);
    element.setAttribute("width", dot.size);
    element.setAttribute("height", dot.size);
    element.setAttribute("rx", "1");
    element.setAttribute("fill", "transparent");
    root.appendChild(element);
  });

  netLabels.forEach((label) => {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.classList.add("constant", "constant-fill");
    text.setAttribute("x", label.x + label.w / 2);
    text.setAttribute("y", label.y + label.h / 2 + 5.5);
    text.setAttribute("fill", "transparent");
    text.setAttribute("font-family", "Inter, Arial, sans-serif");
    text.setAttribute("font-size", "16");
    text.setAttribute("font-weight", "700");
    text.setAttribute("text-anchor", "middle");
    text.textContent = label.text;
    root.appendChild(text);
  });

  netIdentifierGroups.forEach((group, index) => {
    netIdentifierPaths.forEach((pathData) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.classList.add("net-arrow");
      path.dataset.net = String(index + 1);
      path.setAttribute("d", pathData);
      path.setAttribute("transform", `translate(${group.x} ${group.y})`);
      path.setAttribute("fill", "transparent");
      root.appendChild(path);
    });
  });
}

function setSegment(displayName, digitIndex, segmentName, isOn) {
  const selector = `.segment[data-display="${displayName}"][data-digit="${digitIndex}"][data-segment="${segmentName}"]`;
  const segment = document.querySelector(selector);
  if (segment) segment.setAttribute("fill", isOn ? SEGMENT_ON : SEGMENT_OFF);
}

function renderDisplay(displayName, rawValue) {
  const display = displays[displayName];
  const value = digitsOnly(rawValue);
  const chars = value.padStart(display.digits.length, " ").slice(-display.digits.length);

  display.digits.forEach((digit, index) => {
    const active = digitSegments[chars[index]] || [];

    Object.keys(digit).forEach((segmentName) => {
      setSegment(displayName, index, segmentName, state.powered && active.includes(segmentName));
    });
  });
}

function formatPart(value) {
  return String(value).padStart(2, "0");
}

function currentClockValue() {
  const now = new Date();
  return `${formatPart(now.getHours())}:${formatPart(now.getMinutes())}:${formatPart(now.getSeconds())}`;
}

function stopwatchValue() {
  if (state.mode === "timer") {
    return timerValue();
  }

  const elapsed = state.stopwatchElapsed + (state.stopwatchPaused ? 0 : Math.max(0, Date.now() - state.stopwatchStartedAt));
  const totalSeconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(totalSeconds / 60) % 100;
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((elapsed % 1000) / 10);
  return `${formatPart(minutes)}:${formatPart(seconds)}:${formatPart(centiseconds)}`;
}

function timerValue() {
  const remaining = currentTimerRemainingMs();
  const totalSeconds = Math.floor(remaining / 1000);
  const minutes = Math.floor(totalSeconds / 60) % 100;
  const seconds = totalSeconds % 60;
  const centiseconds = Math.ceil((remaining % 1000) / 10) % 100;
  let value = `${formatPart(minutes)}:${formatPart(seconds)}:${formatPart(centiseconds)}`;

  if (state.timerAdjustField && !state.blinkVisible) {
    if (state.timerAdjustField === "minutes") value = `  :${formatPart(seconds)}:00`;
    if (state.timerAdjustField === "seconds") value = `${formatPart(minutes)}:  :00`;
  }

  return value;
}

function currentTimerRemainingMs() {
  if (state.timerAdjustField) {
    return (state.timerMinutes * 60 + state.timerSeconds) * 1000;
  }

  if (state.timerRunning) {
    return Math.max(0, state.timerTargetAt - Date.now());
  }

  return Math.max(0, state.timerRemainingMs);
}

function renderTimeDisplays() {
  if (!state.powered) return;

  renderDisplay("stopwatch", stopwatchValue());
  renderDisplay("clock", currentClockValue());
}

function renderStopwatch() {
  if (!state.powered) return;

  renderDisplay("stopwatch", stopwatchValue());

  if (state.mode === "timer" && state.timerRunning && currentTimerRemainingMs() <= 0 && !state.timerAlarmed) {
    state.timerAlarmed = true;
    state.timerRunning = false;
    state.timerRemainingMs = 0;
    state.timerMinutes = 0;
    state.timerSeconds = 0;
    renderDisplay("stopwatch", "00:00:00");
    playAlarm();
  }
}

function renderMasks() {
  if (!state.powered) {
    document.querySelectorAll(".constant-fill").forEach((element) => element.setAttribute("fill", "transparent"));
    document.querySelectorAll(".constant-stroke").forEach((element) => element.setAttribute("stroke", "transparent"));
    document.querySelectorAll(".net-arrow").forEach((element) => element.setAttribute("fill", "transparent"));
    document.querySelectorAll(".segment").forEach((segment) => segment.setAttribute("fill", SEGMENT_OFF));
    return;
  }

  document.querySelectorAll(".constant-fill").forEach((element) => element.setAttribute("fill", SEGMENT_ON));
  document.querySelectorAll(".constant-stroke").forEach((element) => element.setAttribute("stroke", SEGMENT_ON));
  document.querySelectorAll(".net-arrow").forEach((element) => {
    element.setAttribute("fill", Number(element.dataset.net) === state.activeNet ? SEGMENT_ON : "transparent");
  });

  renderDisplay("weight", formatNumeric(state.weight, 3));
  renderDisplay("total", formatNumeric(totalWeight(), 3));
  renderDisplay("stopwatch", stopwatchValue());
  renderDisplay("clock", currentClockValue());

  state.nets.forEach((value, index) => {
    renderDisplay(`net${index + 1}`, formatNumeric(value, 2));
  });
}

function totalWeight() {
  return state.nets.reduce((sum, value) => sum + value, 0);
}

function powerOn() {
  if (state.powered) return;

  state.powered = true;
  state.stopwatchStartedAt = Date.now();
  state.stopwatchElapsed = 0;
  state.stopwatchPaused = false;
  renderMasks();
  clockTimer = window.setInterval(() => renderDisplay("clock", currentClockValue()), 1000);
  stopwatchTimer = window.setInterval(renderStopwatch, 100);
}

function playBuzzer(force = false) {
  if (state.silentMode && !force) return;

  if (!audioUnlocked) {
    unlockAudio();
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = getAudioContext();

  if (context.state === "suspended") {
    context.resume();
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(4000, now);
  gain.gain.cancelScheduledValues(now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.003);
  gain.gain.setValueAtTime(0.12, now + 0.045);
  gain.gain.linearRampToValueAtTime(0, now + 0.07);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.07);
}

function playDoubleBuzzer() {
  playBuzzer();
  window.setTimeout(playBuzzer, 120);
}

function playForcedBuzzer() {
  playBuzzer(true);
}

function playTripleBuzzer() {
  playForcedBuzzer();
  window.setTimeout(playForcedBuzzer, 120);
  window.setTimeout(playForcedBuzzer, 240);
}

function playAlarm() {
  for (let group = 0; group < 3; group += 1) {
    const groupDelay = group * 620;
    for (let beep = 0; beep < 3; beep += 1) {
      window.setTimeout(playBuzzer, groupDelay + beep * 120);
    }
  }
}

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  playBuzzer.context = playBuzzer.context || new AudioContext();
  return playBuzzer.context;
}

function unlockAudio() {
  const context = getAudioContext();
  if (!context || audioUnlocked) return;

  if (context.state === "suspended") {
    context.resume();
  }

  const buffer = context.createBuffer(1, 1, 22050);
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
  audioUnlocked = true;
}

function clampWeight(value) {
  return Math.max(0, Math.min(999, value));
}

function resetStopwatch() {
  state.stopwatchStartedAt = Date.now();
  state.stopwatchElapsed = 0;
  state.stopwatchPaused = false;
}

function toggleStopwatchPause() {
  if (state.stopwatchPaused) {
    state.stopwatchElapsed = 0;
    state.stopwatchStartedAt = Date.now();
    state.stopwatchPaused = false;
  } else {
    state.stopwatchElapsed += Math.max(0, Date.now() - state.stopwatchStartedAt);
    state.stopwatchPaused = true;
  }
}

function resetEverythingExceptClock() {
  state.activeNet = 1;
  state.weight = 0;
  state.nets = [0, 0, 0, 0, 0, 0];
  exitTimerMode();
  resetStopwatch();
}

function saveWeight() {
  const index = state.activeNet - 1;
  state.nets[index] = clampWeight(state.nets[index] + state.weight);

  if (state.mode === "timer") {
    restartTimer();
    renderMasks();
    return;
  }

  resetStopwatch();
}

function restartTimer() {
  if (state.timerSavedMs <= 0) return;

  state.timerRemainingMs = state.timerSavedMs;
  state.timerTargetAt = Date.now() + state.timerSavedMs;
  state.timerRunning = true;
  state.timerAlarmed = false;
  renderDisplay("stopwatch", timerValue());
}

function runAction(action) {
  if (!state.powered) {
    powerOn();
    return;
  }

  if ((action === "plus" || action === "minus") && state.timerAdjustField) {
    adjustTimerValue(action === "plus" ? 1 : -1);
    renderMasks();
    return;
  }

  if (action === "plus") state.weight = clampWeight(state.weight + 1);
  if (action === "minus") state.weight = clampWeight(state.weight - 1);
  if (action === "save") saveWeight();
  if (action === "net") state.activeNet = state.activeNet === 6 ? 1 : state.activeNet + 1;
  if (action === "reset") toggleStopwatchPause();
  if (action === "adjust") handleAdjustButton();

  renderMasks();
}

function handleAdjustButton() {
  if (state.mode !== "timer") {
    enterTimerAdjust("minutes");
    return;
  }

  if (state.timerAdjustField === "minutes") {
    enterTimerAdjust("seconds");
    return;
  }

  if (state.timerAdjustField === "seconds") {
    exitTimerAdjust();
    return;
  }

  enterTimerAdjust("minutes");
}

function enterTimerAdjust(field) {
  if (state.timerSavedMs > 0) {
    const savedSeconds = Math.ceil(state.timerSavedMs / 1000);
    state.timerMinutes = Math.floor(savedSeconds / 60) % 100;
    state.timerSeconds = savedSeconds % 60;
    state.timerRemainingMs = state.timerSavedMs;
  }

  state.mode = "timer";
  state.timerRunning = false;
  state.timerAlarmed = false;
  state.timerAdjustField = field;
  state.blinkVisible = true;

  startBlinking();
  scheduleAdjustExit();
}

function exitTimerAdjust() {
  stopBlinking();
  state.timerAdjustField = null;

  if (state.timerMinutes === 0 && state.timerSeconds === 0) {
    exitTimerMode();
    resetStopwatch();
    return;
  }

  state.mode = "timer";
  state.timerRunning = true;
  state.timerAlarmed = false;
  state.timerRemainingMs = (state.timerMinutes * 60 + state.timerSeconds) * 1000;
  state.timerTargetAt = Date.now() + state.timerRemainingMs;
  state.timerSavedMs = state.timerRemainingMs;
}

function exitTimerMode() {
  stopBlinking();
  window.clearTimeout(adjustExitTimer);
  state.mode = "stopwatch";
  state.timerMinutes = 0;
  state.timerSeconds = 0;
  state.timerAdjustField = null;
  state.timerTargetAt = 0;
  state.timerRemainingMs = 0;
  state.timerSavedMs = 0;
  state.timerRunning = false;
  state.timerAlarmed = false;
  state.blinkVisible = true;
}

function adjustTimerValue(delta) {
  if (state.timerAdjustField === "minutes") {
    state.timerMinutes = Math.max(0, Math.min(99, state.timerMinutes + delta));
  }

  if (state.timerAdjustField === "seconds") {
    state.timerSeconds = Math.max(0, Math.min(59, state.timerSeconds + delta));
  }

  state.timerRemainingMs = (state.timerMinutes * 60 + state.timerSeconds) * 1000;
  state.timerAlarmed = false;
  state.blinkVisible = true;
  scheduleAdjustExit();
}

function resetActiveTimerField() {
  if (state.timerAdjustField === "minutes") {
    state.timerMinutes = 0;
  }

  if (state.timerAdjustField === "seconds") {
    state.timerSeconds = 0;
  }

  state.timerRemainingMs = (state.timerMinutes * 60 + state.timerSeconds) * 1000;
  state.timerAlarmed = false;
  state.blinkVisible = true;
  scheduleAdjustExit();
}

function scheduleAdjustExit() {
  window.clearTimeout(adjustExitTimer);
  adjustExitTimer = window.setTimeout(() => {
    if (state.timerAdjustField) {
      exitTimerAdjust();
      renderMasks();
    }
  }, 5000);
}

function startBlinking() {
  window.clearInterval(blinkTimer);
  blinkTimer = window.setInterval(() => {
    if (!state.timerAdjustField) return;
    state.blinkVisible = !state.blinkVisible;
    renderDisplay("stopwatch", stopwatchValue());
  }, 450);
}

function stopBlinking() {
  window.clearInterval(blinkTimer);
  blinkTimer = null;
  state.blinkVisible = true;
}

function startHold(action) {
  if (action !== "plus" && action !== "minus" && action !== "reset") return;

  holdTriggered = false;
  window.clearTimeout(holdTimer);
  holdTimer = window.setTimeout(() => {
    if (!state.powered) {
      powerOn();
      holdTriggered = true;
      playDoubleBuzzer();
      renderMasks();
      return;
    }

    if (action === "reset") {
      resetEverythingExceptClock();
    } else if (state.timerAdjustField) {
      resetActiveTimerField();
    } else {
      state.weight = 0;
    }
    holdTriggered = true;
    playDoubleBuzzer();
    renderMasks();
  }, 1000);
}

function startSilentHold(action) {
  if (action !== "adjust") return;

  window.clearTimeout(silentHoldTimer);
  silentHoldTimer = window.setTimeout(() => {
    if (!state.powered) {
      powerOn();
      holdTriggered = true;
      return;
    }

    state.silentMode = !state.silentMode;
    holdTriggered = true;
    playTripleBuzzer();
  }, 2000);
}

function finishHold(control) {
  const action = control.dataset.action;
  window.clearTimeout(holdTimer);
  window.clearTimeout(silentHoldTimer);

  if (!holdTriggered) {
    runAction(action);
  }
}

document.querySelectorAll(".control").forEach((control) => {
  control.addEventListener("pointerdown", () => {
    unlockAudio();
    playBuzzer();
    holdTriggered = false;
    startHold(control.dataset.action);
    startSilentHold(control.dataset.action);
  });
  control.addEventListener("pointerup", () => finishHold(control));
  control.addEventListener("pointerleave", () => {
    window.clearTimeout(holdTimer);
    window.clearTimeout(silentHoldTimer);
  });
  control.addEventListener("pointercancel", () => {
    window.clearTimeout(holdTimer);
    window.clearTimeout(silentHoldTimer);
  });
  control.addEventListener("contextmenu", (event) => event.preventDefault());
  control.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.detail === 0) {
      runAction(control.dataset.action);
      playBuzzer();
    }
  });
});

["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
  window.addEventListener(eventName, unlockAudio, { once: true, passive: true });
});

buildSegmentLayer();
renderMasks();

window.catchClickerDisplay = {
  state,
  powerOn,
  render: renderMasks,
};
