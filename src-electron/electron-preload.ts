import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    // eeval: (logic: any) => ipcRenderer.invoke('eeval', logic)
    setInkscapePath: () => ipcRenderer.invoke('setInkscapePath'),
    setProjectsPath: () => ipcRenderer.invoke('setProjectsPath'),

    minimizeWindow: () => ipcRenderer.invoke('minimizeWindow'),
    maximizeWindow: () => ipcRenderer.invoke('maximizeWindow'),
    closeWindow: () => ipcRenderer.invoke('closeWindow'),

    createNewProject: () => ipcRenderer.invoke('createNewProject'),


    getConfig: () => ipcRenderer.invoke('getConfig'),
    getAnimState: () => ipcRenderer.invoke('getAnimState'),


    openInkscape: () => ipcRenderer.invoke('openInkscape'),

    updateInkscape: (p: any) => ipcRenderer.invoke('updateInkscape', p),



    // Main to renderer

    onConfigUpdate: (callback: any) => ipcRenderer.on('onConfigUpdate', callback),
    onSvgUpdate: (callback: any) => ipcRenderer.on('onSvgUpdate', callback),



})
