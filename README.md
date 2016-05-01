# Pivotal Tracker for Mac (unofficial)

This is an [Electron](https://github.com/atom/electron) wrapper for Pivotal Tracker. It lets you install Tracker on your Mac and easily access it from the Dock instead of your web browser.

## Caveats

I'm not really a Node developer, so this is just a basic implementation. There are some known (and some unknown!) issues with this project:

- This is a third-party project not associated with Pivotal Labs, so use it at your own risk.

## How to Install

1. Download the latest [Release](https://github.com/wr/tracker-mac/releases/) from GitHub, unzip, and drag to your Applications folder.

2. Launch the app.

3. Log in with your Tracker credentials.

4. Party hardy.

## Troubleshooting

¯\_(ツ)_/¯

This Mac app is a hack. Stuff will probably break. Feel free to [submit a GitHub issue](https://github.com/wr/tracker-mac/issues) if you need help.

## Building it yourself

1. Download [Electron](https://github.com/atom/electron) via NPM (`electron-prebuilt`)
2. `cd` to this repo on your Mac, make whatever changes you like, and run `electron .` to run a live preview of your app.
3. To package the app as a binary, download [electron-packager](https://github.com/maxogden/electron-packager) and run it from this directory:
```
npm run mac
```