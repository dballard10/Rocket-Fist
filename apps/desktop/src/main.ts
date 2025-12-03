import { app, BrowserWindow } from "electron";
import * as path from "path";

const isDev = !app.isPackaged;

// Suppress harmless DevTools Autofill protocol errors
if (isDev) {
  const originalStderrWrite = process.stderr.write.bind(process.stderr);
  process.stderr.write = (chunk: any, encoding?: any, callback?: any) => {
    const message = chunk?.toString() || "";
    // Filter out harmless Autofill DevTools protocol errors
    if (
      message.includes("Autofill.enable") ||
      message.includes("Autofill.setAddresses")
    ) {
      return true; // Suppress the message
    }
    return originalStderrWrite(chunk, encoding, callback);
  };
}

async function createWindow(): Promise<void> {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    // In development, always use the fixed dev server URL (or override via env var)
    const devUrl = process.env.ELECTRON_START_URL ?? "http://localhost:5173";
    await mainWindow.loadURL(devUrl);
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load the packaged web app from extraResources
    // process.resourcesPath is available in Electron but not in Node types
    const resourcesPath = (process as any).resourcesPath || app.getAppPath();
    const indexPath = path.join(resourcesPath, "web", "index.html");
    await mainWindow.loadFile(indexPath);
  }
}

app.whenReady().then(async () => {
  await createWindow();

  app.on("activate", async () => {
    // On macOS, re-create window when dock icon is clicked and no windows are open
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  // On macOS, keep app running until explicitly quit
  if (process.platform !== "darwin") {
    app.quit();
  }
});

