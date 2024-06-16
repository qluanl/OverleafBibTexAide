function detectOS() {  
  let OSName = "Unknown OS";
  if (navigator.appVersion.indexOf("Win") != -1) OSName = "win";
  if (navigator.appVersion.indexOf("Mac") != -1) OSName = "mac";
  if (navigator.appVersion.indexOf("X11") != -1) OSName = "unix";
  if (navigator.appVersion.indexOf("Linux") != -1) OSName = "linux";
  return OSName;
}

// Listen the extension installation event
chrome.runtime.onInstalled.addListener(function(details) {
  console.log(details.reason);
  if (details.reason === 'install') {
    const os = detectOS();
    chrome.storage.local.set({ operatingSystem: os }, function() {
      console.log('Operating system detected and saved on install:', os);
    });
  }
});
