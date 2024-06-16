
// "Global" bool
var debugEnabled_optionsPage = debugEnabled_default;
// Customized log function
function log(message) {
    if (debugEnabled_optionsPage) {
        console.log(message);
    }
}

// Set placeholder
document.getElementById('shortcutAutoComplete').placeholder = shortcutAutoComplete_default;
document.getElementById('shortcutBibtexSearch').placeholder = shortcutBibtexSearch_default;
document.getElementById('keyboardDelay').placeholder = keyboardDelay_default;

// Initialize storage location
var storage = chrome.storage.local;
var stgName = 'local';

// Read and show current config
function refreshElements(){
  log("Refreshing element from " + stgName);
  storage.get(['shortcutAutoComplete', 'shortcutBibtexSearch', 'debugEnabled', 'keyboardDelay'], function(result) {
      document.getElementById('shortcutAutoComplete').value = result.shortcutAutoComplete || '';
      document.getElementById('shortcutBibtexSearch').value = result.shortcutBibtexSearch || '';
      document.getElementById('debugEnabled').checked = (result.debugEnabled !== undefined) ? result.debugEnabled : debugEnabled_default;
      document.getElementById('keyboardDelay').value = result.keyboardDelay || '';
      // Sync debug bool for this page
      debugEnabled_optionsPage = document.getElementById('debugEnabled').checked;
  });
  chrome.storage.local.get(['enableExtension', 'operatingSystem'], function(result) {
      document.getElementById('enableExtension').checked = (result.enableExtension !== undefined) ? result.enableExtension : enableExtension_default;
      document.getElementById('operatingSystem').value = result.operatingSystem || operatingSystem_default;
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

// Refresh once upon open options page
refreshStorageConfig();

// Refresh if configuration had been changed
chrome.storage.onChanged.addListener(function(changes, namespace) {
    refreshStorageConfig();
});

// Listener for storage switch change
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

document.getElementById('enableExtension').addEventListener('change', function() {
    const enableExtension = document.getElementById('enableExtension').checked;
    chrome.storage.local.set({
        enableExtension: enableExtension
    }, function() {
        log('Extension ' + ((enableExtension) ? 'Enabled' : 'Disabled'));
    });
});

document.getElementById('operatingSystem').addEventListener('change', function() {
    const operatingSystem = document.getElementById('operatingSystem').value;
    
    chrome.storage.local.set({
    operatingSystem: operatingSystem
    }, function() {
        log('Operating system saved: ' + operatingSystem);
    });
});

// Save configuration
document.getElementById('save').addEventListener('click', function() {
    const shortcutAutoComplete = document.getElementById('shortcutAutoComplete').value;
    const shortcutBibtexSearch = document.getElementById('shortcutBibtexSearch').value;
    const debugEnabled = document.getElementById('debugEnabled').checked;
    const keyboardDelay = document.getElementById('keyboardDelay').value;
    // Sync debug bool for this page
    debugEnabled_optionsPage = debugEnabled;

    storage.set({
        shortcutAutoComplete: shortcutAutoComplete,
        shortcutBibtexSearch: shortcutBibtexSearch,
        debugEnabled: debugEnabled,
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


function enableSave() {
  document.getElementById('save').disabled = false;
  document.getElementById('save').innerText = "Save";
}

document.getElementById('debugEnabled').addEventListener('change', function() {
    enableSave();
});

document.getElementById('keyboardDelay').addEventListener('input', function() {
    enableSave();
});

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
