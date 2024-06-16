
// ==UserScript==
// @name         Overleaf Advanced Shortcut
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Helpful Extension for Using BibTeX on Overleaf.
// @author       Shenggao Li
// @match        https://www.overleaf.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


// Default Config
// Included and shared by content.js, options page, and popup page
const shortcutAutoComplete_default = 'Ctrl+KeyJ';
const shortcutBibtexSearch_default = 'Ctrl+Shift+KeyJ';
const debugEnabled_default = false;
const enableExtension_default = true;
const extensionSystem_default = 'mac';
const keyboardDelay_default = 50;
/* Define shortcuts pattern
**** This comment is only for Tampermonkey usage
**** Use options page for Chrome extension
*  - You can enter any shortcut pattern as [mod keys]+[key code].
*  - Shortcut patterns are case insensitive.
*  - You can use as many modifier keys as you want, but you must connect them with '+' and ensure they are ordered as listed below.
*    - Allowed modifier keys: Ctrl, Shift, Alt, and Meta (Meta is the Win/Cmd key on Windows/Mac).
*  - Key codes represent the value of each key on the keyboard and include: [KeyA~KeyZ], [Digit0~Digit9], Comma, Slash, Period, etc.
*
*  Examples:
*    - Alt+Meta+KeyP       [Good]
*    - Ctrl+Meta+KeyL      [Good]
*    - ctrl+SHIFT+Digit0   [Good]
*    - Alt+Ctrl+KeyJ       [Bad] Incorrect modifier key order, should be Ctrl+Alt+KeyJ
*    - Meta+J              [Bad] 'J' is not a key code, should be Meta+KeyJ
*
*  Tips:
*    - If you are unsure about the shortcut pattern you want to use, set the debugEnabled variable below to true and save your changes.
*    - Refresh the Overleaf webpage to reload this script.
*    - Open the JavaScript Console using the shortcut Command+Option+J (Mac) or Control+Shift+J (Windows).
*    - Press the hotkey you want to use. The associated pattern will be printed in the console.
*    - Copy the pattern from the console and paste it below.
*    - Pure modifier keys as hotkey is not recommanded since the key code depends on the last mod key you pressed.
*/
var shortcutAutoComplete = shortcutAutoComplete_default;
var shortcutBibtexSearch = shortcutBibtexSearch_default;

// "Global" bool
var debugEnabled = debugEnabled_default;
var enableExtension = enableExtension_default;

// System char (default: mac)
var operatingSystem = operatingSystem_default;

// Keyboard delay (ms) (default: 50)
var keyboardDelay = keyboardDelay_default;

// Customized log function
function log(message) {
    if (debugEnabled) {
        console.log(message);
    }
}

// Create alt+space event [discard]
var altSpaceEvent = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    key: ' ',
    code: 'Space',
    keyCode: 32,
    charCode: 32,
    which: 32,
    altKey: true
});

// Create alt+space event function with delay
async function triggerAltSpace() {
    var altSpaceDownEvent = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: ' ',
        code: 'Space',
        keyCode: 32,
        charCode: 32,
        which: 32,
        altKey: true
    });
    var altSpaceUpEvent = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key: ' ',
        code: 'Space',
        keyCode: 32,
        charCode: 32,
        which: 32,
        altKey: true
    });

    document.activeElement.dispatchEvent(altSpaceDownEvent);
    await new Promise(resolve => setTimeout(resolve, 50)); // Delay [default: 50ms]
    document.activeElement.dispatchEvent(altSpaceUpEvent);
    await new Promise(resolve => setTimeout(resolve, 50)); // Delay [default: 50ms]
}

// Create ctrl+space event function with delay
async function triggerCtrlSpace() {
    var ctrlSpaceDownEvent = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: ' ',
        code: 'Space',
        keyCode: 32,
        charCode: 32,
        which: 32,
        ctrlKey: true
    });
    var ctrlSpaceUpEvent = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        key: ' ',
        code: 'Space',
        keyCode: 32,
        charCode: 32,
        which: 32,
        ctrlKey: true
    });

    document.activeElement.dispatchEvent(ctrlSpaceDownEvent);
    await new Promise(resolve => setTimeout(resolve, keyboardDelay)); // Delay [default: 50ms]
    document.activeElement.dispatchEvent(ctrlSpaceUpEvent);
    await new Promise(resolve => setTimeout(resolve, keyboardDelay)); // Delay [default: 50ms]
}

async function triggerAutoComplete() {
    switch (operatingSystem.toUpperCase()) {
      case 'WIN':
      case 'LINUX':
        triggerCtrlSpace();
        break;
      case 'MAC':
        triggerAltSpace();
        break;
      default:
        console.warning("Unkown operating system " + operatingSystem + ". Using Mac.");
        triggerAltSpace();
        
    }
}

async function pasteSelectionToBibtexSearch(selectedText){
    // Find the current active element
    var activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' && activeElement.placeholder === 'Search by author, title, year…')) {
        log('Bibtex search box focused');

        // Paste the selected text to the input box
        var start = activeElement.selectionStart;
        var end = activeElement.selectionEnd;
        if (typeof start === 'number' && typeof end === 'number') {
            var textvalue = activeElement.value.slice(0, start) + selectedText + activeElement.value.slice(end);
            activeElement.setAttribute('value', textvalue);
            activeElement.selectionStart = activeElement.selectionEnd = start + selectedText.length;

            // Trigger all relevant events to notify the input box
            ['input', 'change', 'keyup', 'keydown', 'keypress'].forEach(eventType => {
                var event = new Event(eventType, { bubbles: true, cancelable: true });
                activeElement.dispatchEvent(event);
            });
            log('Triggered all events');
        } else if (activeElement.isContentEditable) {
            document.execCommand('insertText', false, selectedText);
            alert("Alert from Tampermonkey Script\n [Script] Overleaf Autocomplete And BibTex Search Shortcut\nUnexpected input box. Filling with selection anyway.");
        }
        log('Text pasted');
    } else {
        log('No Bibtex search box found');
    }
}

// Function to open auto complete and bibtex search (if in citation)
async function openAutoComplete() {
    // Get selected text
    var selectedText = window.getSelection().toString();
    log('Selected text:'+selectedText);

    await triggerAltSpace();
    await pasteSelectionToBibtexSearch(selectedText);
    // document.activeElement.dispatchEvent(altSpaceEvent);
}

async function openBibtexSearch() {
        // Get selected text
        var selectedText = window.getSelection().toString();
        log('Selected text:'+selectedText);

        // Trigger twice alt+space events
        await triggerAltSpace();
        log('First alt+space pressed');
        await triggerAltSpace();
        log('Second alt+space pressed');

        // Wait to ensure Overleaf is ready
        await new Promise(resolve => setTimeout(resolve, keyboardDelay));

        await pasteSelectionToBibtexSearch(selectedText);
}

// Handle keypress event, detect user defined shortcuts
document.addEventListener('keydown', async function(e) {
    if (enableExtension) {
        try {
            const keyCombo = `${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.altKey ? 'Alt+' : ''}${e.metaKey ? 'Meta+' : ''}${e.code}`;
            log('Key pressed: ' + keyCombo);
            switch (keyCombo.toUpperCase()) {
                case shortcutAutoComplete.toUpperCase():
                    e.preventDefault();
                    log(shortcutAutoComplete + ' pressed'); // Log pressed event
                    await openAutoComplete();
                    break;
                case shortcutBibtexSearch.toUpperCase():
                    e.preventDefault();
                    log(shortcutBibtexSearch + ' pressed'); // Log pressed event
                    await openBibtexSearch();
                    break;
            }
        }
        catch(err) {
        }
    }
});


})();

