const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const path = require("path");
const url = require('url')
const iconUrl = url.format({
 pathname: path.join(__dirname, 'assets/logo.icns'),
 protocol: 'file:',
 slashes: true
})

// Disable error dialogs by overriding
dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`);
};

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient("lumen-desktop", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient("lumen-desktop");
}

const gotTheLock = app.requestSingleInstanceLock();
let mainWindow;
let deeplinkingUrl;

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow();

    const menu = Menu.getApplicationMenu(); // get default menu
    menu.items.push();
    menu.items.find((item) => item.role === "help").visible = false; // modify it

    Menu.setApplicationMenu(menu);
  });

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

app.on("will-finish-launching", function () {
  // Protocol handler for osx
  app.on("open-url", (event, url) => {
    event.preventDefault();
    const u = new URL(url);
    const link = u.searchParams.get("url");

    deeplinkingUrl = link;
    if (mainWindow && deeplinkingUrl) mainWindow.loadURL(deeplinkingUrl);

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
});

// modify your existing createWindow() function
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    icon: iconUrl,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: false,
    },
  });

  // set the modified menu

  mainWindow.setContentProtection(true);
  // win.loadURL(
  //   "https://shaka-player-demo.appspot.com/demo/#audiolang=en-US;textlang=en-US;uilang=en-US;asset=https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8;panel=HOME;build=uncompiled"
  // );
  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  ipcMain.on("do-a-thing", (event, title) => {
    const webContents = event.sender;
    // const win = BrowserWindow.fromWebContents(webContents)
    mainWindow.setTitle(Date.now());
  });

  mainWindow.loadURL(deeplinkingUrl ? deeplinkingUrl : "http://localhost:4200");
  mainWindow.focus();

  const { session } = require("electron");
  session.defaultSession.on("will-download", (event, item, webContents) => {
    event.preventDefault();
    require("got")(item.getURL()).then((response) => {
      require("fs").writeFileSync("/somewhere", response.body);
    });
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
