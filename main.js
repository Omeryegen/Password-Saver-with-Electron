const { app, BrowserWindow, ipcMain, webFrameMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
let win 
console.log(os.homedir());
const createWindow = () => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
        preload: path.join(__dirname,  "preload.js")
      }
    });
  
    win.loadFile(path.join(__dirname, "renderer", "index.html"));
};

const writeToFile = (filePath, data)=>{
    const file = fs.readFileSync(filePath);
    const parsed = JSON.parse(file);
    parsed.accounts.push(data);
    const newData= JSON.stringify(parsed, null, 4);
    fs.writeFile(filePath, newData, err =>{
        if(err){
            console.log(err)
        };
    });
};

const handleData = (event,data)=>{
    const filePath = os.homedir()+ "/desktop/private/data.json";
    
    if(fs.existsSync(filePath)){    
        writeToFile(filePath, data);
    }else{
        fs.open(filePath, 'w',  (err, response)=>{
            if(!err){
                fs.writeFile(filePath, JSON.stringify({"accounts": []}, null, 4),  err =>{
                    if(err){
                        console.log(err);
                    }else{
                        writeToFile(filePath, data);
                    };
                });
            };
        });
    };
};

const handleSearch = (event, input)=>{
    const filePath = os.homedir()+ "/desktop/private/data.json";
    
    if(fs.existsSync(filePath)){
        const file = fs.readFileSync(filePath, {encoding: "utf-8"});
        const parsed = JSON.parse(file);
        parsed.accounts.forEach(target=>{
            if(target[input]){
                win.webContents.send("sendBack", target[input])
            };
        });
        console.log(parsed.accounts[0][input]);
    };
};



app.whenReady().then(() => {
    createWindow();

    ipcMain.on('sendData', handleData);
    ipcMain.on('search', handleSearch);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});