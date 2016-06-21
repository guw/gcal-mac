const electron = require('electron');
const {app} = electron;
const {BrowserWindow, Menu} = electron;
const globalShortcut = electron.globalShortcut;

const template = [
  {
    label: 'Calendar',
    submenu: [
      {
        label: 'About Calendar',
        selector: 'orderFrontStandardAboutPanel:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide Calendar',
        accelerator: 'CmdOrCtrl+H',
        click: function() {mainWindow.hide();}
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit Calendar',
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
        label: 'Calendar on GitHub',
        click: function() { require('electron').shell.openExternal('https://github.com/wr/gcal-mac') }
      },
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);


// Quit when all windows are closed.
var force_quit = false;

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 2000,
    height: 1200,
    minWidth: 900,
    minHeight: 550,
    webPreferences: {
      nodeIntegration: false,
      scrollBounce: true,
      webSecurity: false
    }
  });

  // and load the index.html of the app.
  win.loadURL('https://calendar.google.com/calendar');

  // Open the DevTools.
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  // open _blank links in same window
  win.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

  win.on('close', function(e){
    if(!force_quit){
      e.preventDefault();
      win.hide();
    }
  });

  win.on('closed', function(){
    win = null;
    globalShortcut.unregisterAll()
    app.quit();
  });

  app.on('activate', function(){
    win.show();
  });

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);