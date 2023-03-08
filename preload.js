const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('ipcRenderer', {
    sendData: (channel, data)=> ipcRenderer.send(channel, data),
    search: (channel, input) => ipcRenderer.send(channel, input),
    searchOn: (callback) => ipcRenderer.on("sendBack", callback)
});

contextBridge.exposeInMainWorld('Toastify', {
    toast: (options) => tost(options).showToast(),
})