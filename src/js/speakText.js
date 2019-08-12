const synth = window.speechSynthesis;

// DOM Elements
const textInput = document.querySelector("#textarea");
const voiceSelect = document.querySelector("#voice-select");

const icon = document.querySelector("#icon");
const startSpeak = document.querySelector("#start-speak");
const pauseSpeak = document.querySelector("#pause-speak");
const stopSpeak = document.querySelector("#stop-speak");

// DETERMINE BROWSER
// is Firefox1.0+
const isFirefox = typeof InstallTrigger !== "undefined";
// is Chrome1+
const isChrome = !!window.chrome && !!window.chrome.webstore;

/** ---------- VOICES ------------------------------ * */

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach((voice) => {
    // Create option element
    const option = document.createElement("option");
    // Fill option with voice and language
    option.textContent = `${voice.name}(${voice.lang})`;

    // Set needed option attributes
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

/** ---------- SPEAKING CONTROL ------------------------------ * */

/**
 * Function to control the speech process
 */
const speak = () => {
  // if speaking, stop speaking
  stop();

  if (textInput.value !== "") {
    // get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    // When the program has finished speaking
    speakText.onend = (e) => {
      // When the speaking ends, act as if the User has clicked the 'stop' button
      displayButton("stop");
    };

    // If there is an error when the speech process
    speakText.onerror = (e) => {
      // TODO: display some sort of error message to the User
      console.error("Oops, there's been an error!");
    };

    // selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );

    // loop through voices
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Start speaking
    synth.speak(speakText);
  }
};

/**
 * Function to control the pause process
 */
const pause = () => {
  // check if speaking
  if (synth.speaking) {
    synth.pause();
  }
};

/**
 * Function to control the stop process
 */
const stop = () => {
  // check if speaking
  if (synth.speaking) {
    synth.cancel();
  }
};

/** ---------- BUTTON LISTENERS ------------------------------ * */

/**
 * When the User clicks the 'play' button
 */
startSpeak.addEventListener("click", (e) => {
  e.preventDefault();
  speak();
  textInput.blur(); // remove focus from textField
  displayButton("start");
});

/**
 * When the User clicks the 'pause' button
 */
pauseSpeak.addEventListener("click", (e) => {
  e.preventDefault();
  pause();
  displayButton("pause");
});

/**
 * When the User clicks the 'stop' button
 */
stopSpeak.addEventListener("click", (e) => {
  e.preventDefault();
  stop();
  displayButton("stop");
});

// Voice select change
// disabled the feature of playing the text as soon as the User changes the voice
// voiceSelect.addEventListener('change', e => speak());

/** ---------- HIDE/DISPLAY RELEVANT BUTTONS ------------------------------ * */

/**
 * Function to control the display of the appropriate buttons (play, pause and stop).
 * The function takes a str parameter of which button has been clicked ('play', 'pause', or 'stop')
 * When the program is speaking, the pause and stop buttons should be showing.
 * When the program is paused, the play and stop buttons should be showing.
 * When the program is stopped, the play button should be showing.
 */
function displayButton(btnClicked) {
  // First, for code simplicity, hide all btns
  startSpeak.style.display = "block";
  pauseSpeak.style.display = "block";
  stopSpeak.style.display = "block";

  // If the User has clicked 'start' btn, show 'pause' and 'stop' buttons
  if (btnClicked === "start") {
    startSpeak.style.display = "none";
  }
  // If the User has clicked 'pause' btn, show 'start' and 'stop' buttons
  if (btnClicked === "pause") {
    pauseSpeak.style.display = "none";
  }
  // If the User has clicked 'start' btn, show 'start' button
  if (btnClicked === "stop") {
    pauseSpeak.style.display = "none";
    stopSpeak.style.display = "none";
  }

  // Toggle the 'pulse' of the icon (indication that the sound is playing)
  icon.classList.toggle("pulse");
}

displayButton();
