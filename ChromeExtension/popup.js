
// "Global" bool
var debugEnabled = false;
// Customized log function
function log(message) {
    if (debugEnabled) {
        console.log(message);
    }
}

var storage = chrome.storage.local;
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
        // Read and show current config
        storage.get(['shortcutAutoComplete', 'shortcutBibtexSearch'], function(result) {
            document.getElementById('shortcutAutoComplete').value = result.shortcutAutoComplete || '';
            document.getElementById('shortcutBibtexSearch').value = result.shortcutBibtexSearch || '';
        });
        chrome.storage.local.get(['enableExtension'], function(result) {
            document.getElementById('enableExtension').checked = (result.enableExtension !== undefined) ? result.enableExtension : true;
        });
    });
}


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
        // refreshStorageConfig();
    });
});

function enableSave() {
  document.getElementById('save').disabled = false;
  document.getElementById('save').innerText = "Save";
}

refreshStorageConfig();



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
