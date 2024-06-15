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
1. Download the CRX file [OverleafBibTexAide_Chrome.crx](OverleafBibTexAide_Chrome.crx)
2. Open the extension manage page: [chrome://extensions/](chrome://extensions/)
3. Turn on the develop mode (top right corner)
4. Drag the downloaded file to this page to install
### Use in Tampermonkey
1. Make sure Tampermonkey is installed on your browser.
   > Download from the [chrome web store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   >
   > Or check [Tampermonkey's homepage](https://www.tampermonkey.net/) for more information.
2. Simply click this [Tamplermonkey script](OverleafBibTexAide_Tampermonkey.user.js) to install.

> #### Which one should I use?
> Well, it is your own choice, really. 
> - Chrome Extension
>   - It works standing alone so that you don't have to install Tampermonkey (which seems to be an overkill for our purpose). It also has a better interface to customize your own shortcut key choice. 
>   - However, I do not wish to pay the $5 fee or go through the review process at this stage, so I will not publish this extension on the Chrome Web Store. As a result, you have to use the develop mode, which can be annoying and/or a security concern. Also, it is Chrome exclusive. 
> - Tampermonkey Script
>   - This might be overkill but it is easy to install (if you already have Tampermonkey) and supports cross-platform browsers.
>   - As stated above, you have to change the script manually to customize your own hotkey.

## Usage

Overleaf uses `Ctrl+Space` (or `Alt+Space` on some Mac systems) to open the auto-complete feature. The auto-complete will display the BibTeX list if you are in a citation environment. Pressing the same shortcut again will activate the advanced reference search. However, `Ctrl+Space` and/or `Alt+Space` might be inconvenient or conflict with other shortcuts.

- This extension/script allows you to press `Ctrl+J` (default) to open the auto-complete window and the reference search. It simply maps `Ctrl+J` to the keyboard event `Ctrl+Space`/`Alt+Space`. 
- Additionally, if you have selected some text in the editor, the script will automatically paste your selection into the advanced reference search bar.
- To further simplify the process, you can also press `Ctrl+Shift+J` (default) to directly open the advanced search without needing to press `Ctrl+J` twice.


## Customize
You can also change the default shortcut to anyone you prefer.

#### Chrome Extension
There are two user-friendly pages where you can change the configurations:

1. **Popup Page**: Click the extension icon to enable/disable the extension and change the hotkey.
   - Simply click the hotkey input box and press the key combination you want, then save.
2. **Options Page**: Click "Advanced Options" on the popup page to access additional settings (including OS configuration).
   - You can choose to save the configuration locally or synchronize it through your Google account.

#### Tampermonkey Script
Customizing in Tampermonkey is a bit more complex. To do so, follow these steps:

1. Open the Tampermonkey options page.
2. Click on "Installed Userscripts."
3. Open our script.
4. Modify the variables `shortcutAutoComplete` and `shortcutBibtexSearch` according to the long comments in the script.


## Known Bugs
- I attempted to convert the Chrome extension to a Safari extension, but I'm unsure how to do it correctly.

## Others

### Fork and build
- You can clone/fork/download this project and load the folder [ChromeExtension](ChromeExtension) to Chrome (dev mode required). Then you can modify the source code.

- This project is based on the Chrome extension, to pack the extension and generate the Tampermonkey script, run the bash script [autoscript](autoscript). (You may have to config the path to Chrome.)
