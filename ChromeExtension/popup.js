
// "Global" bool
var debugEnabled_popupPage = debugEnabled_default;
// Customized log function
function log(message) {
    if (debugEnabled_popupPage) {
        console.log(message);
    }
}

// Set placeholder
document.getElementById('shortcutAutoComplete').placeholder = shortcutAutoComplete_default;
document.getElementById('shortcutBibtexSearch').placeholder = shortcutBibtexSearch_default;

// Initialize storage location
var storage = chrome.storage.local;

// Read and show current config
function refreshElements(){
  storage.get(['shortcutAutoComplete', 'shortcutBibtexSearch', 'debugEnabled'], function(result) {
      document.getElementById('shortcutAutoComplete').value = result.shortcutAutoComplete || '';
      document.getElementById('shortcutBibtexSearch').value = result.shortcutBibtexSearch || '';
      // Sync debug bool for this page
      debugEnabled_popupPage = (result.debugEnabled !== undefined) ? result.debugEnabled : debugEnabled_default;
  });
  chrome.storage.local.get(['enableExtension'], function(result) {
      document.getElementById('enableExtension').checked = (result.enableExtension !== undefined) ? result.enableExtension : enableExtension_default;
  });
}

// Read storage setting
function refreshStorageConfig() {
    // Read storage setting
    chrome.storage.local.get(['storageLocation'], function(result) {
        switch (result.storageLocation) {
          case 'sync':
            log("Refresh Storage Config to sync");
            storage = chrome.storage.sync;
            break;
          case 'local':
            log("Refresh Storage Config to local");
            storage = chrome.storage.local;
            break;
        }
        refreshElements();
    });
}

// Refresh once upon open popup page
refreshStorageConfig();

// Refresh if configuration had been changed
chrome.storage.onChanged.addListener(function(changes, namespace) {
    refreshStorageConfig();
});

// Save configuration
document.getElementById('save').addEventListener('click', function() {
    const shortcutAutoComplete = document.getElementById('shortcutAutoComplete').value;
    const shortcutBibtexSearch = document.getElementById('shortcutBibtexSearch').value;

    storage.set({
        shortcutAutoComplete: shortcutAutoComplete,
        shortcutBibtexSearch: shortcutBibtexSearch,
    }, function() {
        log('Settings saved');
        document.getElementById('save').disabled = true;
        document.getElementById('save').innerText = "Saved";
    });
});

document.getElementById('openOptions').addEventListener('click', function() {
    chrome.runtime.openOptionsPage();
});

document.getElementById('enableExtension').addEventListener('change', function() {
  const enableExtension = document.getElementById('enableExtension').checked;
    chrome.storage.local.set({
        enableExtension: enableExtension
    }, function() {
        log('Extension ' + (enableExtension) ? 'Enabled' : 'Disabled');
    });
});

function enableSave() {
  document.getElementById('save').disabled = false;
  document.getElementById('save').innerText = "Save";
}

// Auto filling the hotkey input box
document.addEventListener('keydown', async function(e) {
    var activeElement = document.activeElement;
    if (activeElement && activeElement.dataset.tag == 'hotkey') {
        try {
            const keyCombo = `${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.altKey ? 'Alt+' : ''}${e.metaKey ? 'Meta+' : ''}${e.code}`;
            activeElement.value = keyCombo;
            e.preventDefault();
            enableSave();
        }
        catch(err) {
        }
    }
});
