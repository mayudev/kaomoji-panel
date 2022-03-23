<p align="center">
<img src="public/icon.png" width="96px" />
</p>


<h1 align="center">Kaomoji Picker</h1>

<p align="center">
<img src="https://img.shields.io/github/license/mayudev/kaomoji-panel?style=for-the-badge" alt="license" />
<img src="https://img.shields.io/chrome-web-store/v/daijnhkkklalelhfkhcjbcmhiedfnigk?style=for-the-badge" alt="version for chrome">
<img src="https://img.shields.io/github/languages/top/mayudev/kaomoji-panel?style=for-the-badge" alt="typescript">
</p>

<p align="center">
<a href="https://addons.mozilla.org/en-US/firefox/addon/kaomoji-picker/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Firefox addon"></a> 
<a href="https://chrome.google.com/webstore/detail/kaomoji-picker/daijnhkkklalelhfkhcjbcmhiedfnigk"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Chrome extension"></a>
</p>

A [kaomoji](https://en.wikipedia.org/wiki/Emoticon#Japanese_(kaomoji)) picker browser extension.

Kaomoji Picker is a simple extension that allows you to copy and paste kaomoji quickly and use them to make yourself look cuter (✿^‿^)

Emoticons are divided into groups for the ease of use. Supports light and dark theme.

![Screenshot](https://addons.mozilla.org/user-media/previews/full/267/267612.png)

## Building

Requirements: node.js (recommended v16+)

Install dependencies: `npm install`

### Run in development mode
```
npm start
```
### Build the package for production
```
npm run build:firefox
```
Builds a package for Firefox. Outputs to `package/`

```
npm run build:chrome
```
Build a package for Chrome. Outputs to `package-chrome/`

```
npm run build
```
Builds the React app and outputs to `build/`. Can be used for testing the popup.

### Run tests

```
npm test
```
