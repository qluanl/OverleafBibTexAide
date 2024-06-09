# OverleafBibTexAide
`by Shenggao Li`

Helpful Extension for Using BibTeX on Overleaf.

## Purpose
This project can help you use Bibtex on Overleaf.
There are two functionalities of this project:
1. Use a customized shortcut to call the auto-complete and reference search.
2. Search in the BibTex file with selected text by one shortcut

## Requirement
1. It relies on the Premium feature of Overleaf.
2. It works on Chrome and any browser that supports Tampermonkey.

## Installation
This project is designed as a Chrome extension and contains an alternative Tampermonkey script.

### Use as Chrome Extension
1. Download the file [XXX}(github.com)
2. Open the extension manage page: [chrome://extensions/](chrome://extensions/)
3. Turn on the develop mode (top right corner)
4. Drag the downloaded file to this page to install
### Use in Tampermonkey
1. Make sure Tampermonkey is installed on your browser.
   > Download from the [chrome web store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   > Or check [Tampermonkey's homepage](https://www.tampermonkey.net/) for more information.
2. Simply click this [script](github.com) to install

#### Which one should you use?
Well, it is your own choice, really. As a Chrome extension, it works standing alone so that you don't have to install Tampermonkey (which seems to be an overkill for our purpose). It also has a better interface to customize your own shortcut key choice. However, since I don't want to pay $5 to Chrome, I will not publish this extension on its web store at this stage. As a result, you have to use the develop mode, which can be annoying (if it is not a security concern to you). Also, it is Chrome exclusive. 
On the other hand, Tampermonkey is overkill but easy to install and cross-platform (browser). 

## Usage
Overleaf use Ctrl+Space (for some reason, Alt+Space on my Mac) to open auto-complete. The auto-complete would show the bibtex list if you are in citation environment. If you press the same shortcut again, overleaf would activate advanced reference search. However, Ctrl+Space and/or Alt+Space might be inconvenient or conflicting to other shortcuts. 
This extension/script allows you to press Ctrl+J (default) to open an auto-complete window and reference search. It simply maps Ctrl+J to the keyboard event Alt+Space. Additionally, if you have selected some text in the editor, the script will automatically paste your selection into the advanced reference search bar. 
To further simplify the process, you can also press Ctrl+Shift+J (default) to directly open the advanced searching without pressing the Ctrl+J twice.

### Customize
You can also change the default shortcut to anyone you prefer.

## Known Bugs
...

