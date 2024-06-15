
function getOptions(){
  var storage = chrome.storage.local;
  chrome.storage.local.get(['enableExtension', 'storageLocation'], function(result) {
      switch (result.storageLocation) {
        case 'sync':
          storage = chrome.storage.sync;
          log('Config on sync');
          break;
        case 'local':
          storage = chrome.storage.local;
          log('Config on local');
          break;
      }
      enableExtension      = (result.enableExtension !== undefined) ? result.enableExtension : true;
      // log('Reading config');
      storage.get(['shortcutAutoComplete', 'shortcutBibtexSearch', 'debugEnabled', 'system', 'keyboardDelay'], function(result) {
          shortcutAutoComplete = result.shortcutAutoComplete || shortcutAutoComplete_default;
          shortcutBibtexSearch = result.shortcutBibtexSearch || shortcutBibtexSearch_default;
          debugEnabled         = (result.debugEnabled !== undefined) ? result.debugEnabled : false;
          extensionSystem      = result.system || 'mac';
          keyboardDelay        = result.keyboardDelay || 50;
          
          log('shortcutAutoComplete: ' + shortcutAutoComplete);
          log('shortcutBibtexSearch: ' + shortcutBibtexSearch);
          log('debugEnabled: ' + debugEnabled);
          log('enableExtension: ' + enableExtension);
          log('extensionSystem: ' + extensionSystem);
          log('keyboardDelay: ' + keyboardDelay);
      });
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    getOptions();
});

getOptions();
