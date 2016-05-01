const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const session = require('electron').session;
var BrowserWindow = require('browser-window');
var Menu = require('menu');

var force_quit = false;

var menu = Menu.buildFromTemplate([
  {
    label: 'Pivotal Tracker',
    submenu: [
      {
        label: 'About Pivotal Tracker',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide Pivotal Tracker',
        accelerator: 'CmdOrCtrl+H',
        click: function() {mainWindow.hide();}
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit Pivotal Tracker',
        accelerator: 'CmdOrCtrl+Q',
        click: function() {force_quit=true; app.quit();}
      },
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function() {mainWindow.reload();}
      },
      {
        label: 'Toggle Sidebar',
        accelerator: 'Shift+Cmd+L',
        click: function() {toggleSidebar();}
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
          else
            return 'F11';
        })(),
        click: function(item, focusedWindow) {
          if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (function() {
          if (process.platform == 'darwin')
            return 'Alt+Command+I';
          else
            return 'Ctrl+Shift+I';
        })(),
        click: function() {mainWindow.toggleDevTools();}
      },
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Pivotal Tracker on GitHub',
        click: function() { require('electron').shell.openExternal('https://github.com/wr/tracker-mac') }
      },
    ]
  }
]);

// Report crashes to our server.
//electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  Menu.setApplicationMenu(menu);

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 2000,
    height: 1200,
    minWidth: 900,
    minHeight: 550,
    'node-integration': false,
    //'title-bar-style': 'hidden-inset',
    'web-preferences': {'web-security': false},
    zoomFactor: 1.3
  });

  // and load the index.html of the app.
  mainWindow.loadURL('https://www.pivotaltracker.com/n/projects/1528533');

  // open _blank links in same window
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('shell').openExternal(url);
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('close', function(e){
    if(!force_quit){
      e.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('closed', function(){
    mainWindow = null;
    globalShortcut.unregisterAll()
    app.quit();
  });

  app.on('activate', function(){
    mainWindow.show();
  });

});