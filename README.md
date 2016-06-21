# Google Calendar for macOS (unofficial)

This is an [Electron](https://github.com/atom/electron) wrapper for Google Calendar. It lets you install Gcal on your Mac and easily access it from the Dock instead of your web browser.

It also works with Google Calendar's desktop notification setting, so it feels like a pretty native app :)

## Caveats

I'm not really a Node developer, so this is just a basic implementation. There are some known (and some unknown!) issues with this project:

- This is a third-party project not associated with Google, so use it at your own risk.

## How to Install

TBD

## Troubleshooting

¯\_(ツ)_/¯

This Mac app is a hack. Stuff will probably break. Feel free to [submit a GitHub issue](https://github.com/wr/gcal-mac/issues) if you need help.

## Building it yourself

1. Download [Electron](https://github.com/atom/electron) via NPM (`electron-prebuilt`)
2. `cd` to this repo on your Mac, make whatever changes you like, and run `electron .` to run a live preview of your app.
3. To package the app as a binary, download [electron-packager](https://github.com/maxogden/electron-packager) and run it from this directory:
```
npm run mac
```