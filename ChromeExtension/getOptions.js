
function getOptions(){
  var storage = chrome.storage.local;
  chrome.storage.local.get(['enableExtension', 'storageLocation', 'operatingSystem'], function(result) {
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
      enableExtension      = (result.enableExtension !== undefined) ? result.enableExtension : enableExtension_default;
      operatingSystem      = result.operatingSystem || extensionSystem_default;
      // log('Reading config');
      storage.get(['shortcutAutoComplete', 'shortcutBibtexSearch', 'debugEnabled', 'keyboardDelay'], function(result) {
          shortcutAutoComplete = result.shortcutAutoComplete || shortcutAutoComplete_default;
          shortcutBibtexSearch = result.shortcutBibtexSearch || shortcutBibtexSearch_default;
          debugEnabled         = (result.debugEnabled !== undefined) ? result.debugEnabled : debugEnabled_default;
          keyboardDelay        = result.keyboardDelay || keyboardDelay_default;
          
          log('shortcutAutoComplete: ' + shortcutAutoComplete);
          log('shortcutBibtexSearch: ' + shortcutBibtexSearch);
          log('debugEnabled: ' + debugEnabled);
          log('enableExtension: ' + enableExtension);
          log('operatingSystem: ' + operatingSystem);
          log('keyboardDelay: ' + keyboardDelay);
      });
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    getOptions();
});

getOptions();
