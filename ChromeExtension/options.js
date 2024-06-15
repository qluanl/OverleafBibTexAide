
// "Global" bool
var debugEnabled = false;
// Customized log function
function log(message) {
    if (debugEnabled) {
        console.log(message);
    }
}

var storage = chrome.storage.local;
var stgName = 'local';
function refreshStorageConfig() {
    // Read storage setting
    chrome.storage.local.get(['storageLocation'], function(result) {
        switch (result.storageLocation) {
          case 'sync':
            log("Refresh Storage Config to sync");
            storage = chrome.storage.sync;
            stgName = 'sync';
            document.getElementById('useSyncStorage').checked = true;
            break;
          case 'local':
            log("Refresh Storage Config to local");
            storage = chrome.storage.local;
            stgName = 'local';
            document.getElementById('useSyncStorage').checked = false;
            break;
        }
        refreshElements();
    });
}
refreshStorageConfig();

document.getElementById('useSyncStorage').addEventListener('change', function() {
  let checked = document.getElementById('useSyncStorage').checked;
  // log('checked: ' + checked);
  var storageLocation = (checked) ? 'sync' : 'local';
    chrome.storage.local.set({
        storageLocation: storageLocation
    }, function() {
        log('Storage location saved: ' + storageLocation);
        refreshStorageConfig();
    });
});


document.getElementById('save').addEventListener('click', function() {
    const shortcutAutoComplete = document.getElementById('shortcutAutoComplete').value;
    const shortcutBibtexSearch = document.getElementById('shortcutBibtexSearch').value;
    const debugEnabled = document.getElementById('debugEnabled').checked;
    const system = document.getElementById('system').value;
    const keyboardDelay = document.getElementById('keyboardDelay').value;

    storage.set({
        shortcutAutoComplete: shortcutAutoComplete,
        shortcutBibtexSearch: shortcutBibtexSearch,
        debugEnabled: debugEnabled,
        system: system,
        keyboardDelay: keyboardDelay
    }, function() {
        log('Settings saved to ' + stgName);
        document.getElementById('save').disabled = true;
        document.getElementById('save').innerText = "Saved";
    });
});

document.getElementById('clearStorage').addEventListener('click', function() {
    storage.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        } else {
            log('Storage Cleared');
            refreshElements();
        }
    });
});

document.getElementById('enableExtension').addEventListener('change', function() {
  const enableExtension = document.getElementById('enableExtension').checked;
    chrome.storage.local.set({
        enableExtension: enableExtension
    }, function() {
        log('Extension ' + ((enableExtension) ? 'Enabled' : 'Disabled'));
        // refreshStorageConfig();
    });
});

document.getElementById('debugEnabled').addEventListener('change', function() {
    enableSave();
});

document.getElementById('system').addEventListener('change', function() {
    enableSave();
});

document.getElementById('keyboardDelay').addEventListener('input', function() {
    enableSave();
});

function enableSave() {
  document.getElementById('save').disabled = false;
  document.getElementById('save').innerText = "Save";
}

function refreshElements(){
  // Read and show current config
  log("Refreshing element from " + stgName);
  storage.get(['shortcutAutoComplete', 'shortcutBibtexSearch', 'debugEnabled', 'system', 'keyboardDelay'], function(result) {
      document.getElementById('shortcutAutoComplete').value = result.shortcutAutoComplete || '';
      document.getElementById('shortcutBibtexSearch').value = result.shortcutBibtexSearch || '';
      document.getElementById('debugEnabled').checked = (result.debugEnabled !== undefined) ? result.debugEnabled : false;
      document.getElementById('system').value = result.system || 'mac';
      document.getElementById('keyboardDelay').value = result.keyboardDelay || '';
  });
  chrome.storage.local.get(['enableExtension'], function(result) {
      document.getElementById('enableExtension').checked = (result.enableExtension !== undefined) ? result.enableExtension : true;
  });
}

// refreshElements();

chrome.storage.onChanged.addListener(function(changes, namespace) {
    refreshStorageConfig();
});

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
