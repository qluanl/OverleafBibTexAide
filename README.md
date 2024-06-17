# OverleafBibTexAide
`by Shenggao Li`

Helpful Extension for Using BibTeX on Overleaf.

![icon](ChromeExtension/resources/icon128.png)

## Purpose
This project can help you use Bibtex on Overleaf.
There are three functionalities of this project:
1. Use a customized shortcut to call the auto-complete and reference search.
2. Automatically paste the selected text in the reference search bar.
3. Directly open reference search bar by one shortcut.

## Requirement
1. It relies on the Premium feature of Overleaf.
2. It works on Chrome and any other browser that supports Tampermonkey.

## Installation
This project is designed as a Chrome extension and contains an alternative Tampermonkey script.

### Use as Chrome Extension
1. Install from [Chrome Web Store](https://chromewebstore.google.com/detail/overleaf-autpcomplete-and/acpelegceefpigddjgeeponapnnlbmeh). That's all.

### Use in Tampermonkey
1. Make sure Tampermonkey is installed on your browser.
   > Download from the [chrome web store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   >
   > Or check [Tampermonkey's homepage](https://www.tampermonkey.net/) for more information.
2. Simply click this [Tamplermonkey script](https://github.com/qluanl/OverleafBibTexAide/raw/main/OverleafBibTexAide_Tampermonkey.user.js) to install.
3. Change the `extensionSystem` variable in the script to `'mac'` or `'win'`. (See customize for more information)

> #### Which one should I use?
> If you are using Chrome, you should choose extension. 
> - Chrome Extension
>   - It works standing alone so that you don't have to install Tampermonkey (which seems to be an overkill for our purpose). It also has a better interface to customize your own shortcut key choice. 
>   - However, it is Chrome exclusive. 
> - Tampermonkey Script
>   - This might be overkill but it and supports many other browsers.
>   - You have to change the script manually to customize your own hotkey and OS.

## Usage

Overleaf uses `Ctrl+Space` (or `Alt+Space` on some Mac systems) to open the auto-complete feature. The auto-complete will display the BibTeX list if you are in a citation environment. Pressing the same shortcut again will activate the advanced reference search. However, `Ctrl+Space` and/or `Alt+Space` might be inconvenient or conflict with other shortcuts.

- This extension/script allows you to press `Ctrl+J` (default) to open the auto-complete window and the reference search. It simply maps `Ctrl+J` to the keyboard event `Ctrl+Space`/`Alt+Space`. 
- Additionally, if you have selected some text in the editor, the script will automatically paste your selection into the advanced reference search bar.
- To further simplify the process, you can also press `Ctrl+Shift+J` (default) to directly open the advanced search without needing to press `Ctrl+J` twice.
- Chrome extension will automatically detect your operating system upon installation. You have to manually config it for Tampermonkey script.


## Customize
You can also change the default shortcut to anyone you prefer.

#### Chrome Extension
There are two user-friendly pages where you can change the configurations:

1. **Popup Page**: Click the extension icon to enable/disable the extension and change the hotkey.
   - Simply click the hotkey input box and press the key combination you want, then save.
2. **Options Page**: Click "Advanced Options" on the popup page to access additional settings (including OS configuration).
   - You can choose to save the configuration locally or synchronize it through your Google account.

New settings would immediately apply, no refresh needed.

#### Tampermonkey Script
Customizing in Tampermonkey is a bit more complex. To do so, follow these steps:

1. Open the Tampermonkey options page.
2. Click on "Installed Userscripts."
3. Open our script.
4. Modify the variables `shortcutAutoComplete` and `shortcutBibtexSearch` according to the long comments in the script.
5. Modify the variable `operatingSystem` to `'mac'` / `'win'` / `'linux'` according to your OS.
5. Refresh the overleaf page to active your modifications.


## Known Issues
- I attempted to convert the Chrome extension to a Safari extension, but I'm unsure how to do it correctly.
- Tampermonkey script can use similar approach to detect the OS as extension, but not implemented yet.
- I didn't fully test on different OSs. Please report bugs to me.
- Synchronization of configurations is not tested. It should work though.

## Others

### Fork and Build
- You can clone/fork/download this project and load the folder [ChromeExtension](ChromeExtension) to Chrome (dev mode required). Then you can modify the source code.

- This project is based on the Chrome extension, to pack the extension and generate the Tampermonkey script, run the bash script [autoscript](autoscript). (You may have to config the path to Chrome.)
