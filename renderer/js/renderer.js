const info = document.querySelector('#account-info');
const button = document.querySelector('#button');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const platform = document.querySelector('#platform');
const searchButton = document.querySelector('#searchButton');
const search = document.querySelector('#search');
const emailOut = document.querySelector('#emailOut');
const passwordOut = document.querySelector('#passwordOut');
const platformOut = document.querySelector('#platformOut');

button.addEventListener('click', ()=>{
    const data = {
        [platform.value.toLowerCase()]:{
            email: email.value,
            password: password.value,
        }
    };
    if(email.value !== "" || password.vakue !== "" || platform.value !== ""){
        ipcRenderer.sendData('sendData', data)
        email.value = "";
        password.value = "";
        platform.value = "";
    } 
});

searchButton.addEventListener('click', function(){
    if(search.value !== ""){
        ipcRenderer.search('search', search.value.toLowerCase());
        const searchVal = search.value
        ipcRenderer.searchOn((_event, value) => {
            info.textContent = "Account Info";
            emailOut.textContent = `Email: ${value.email}`;
            platformOut.textContent = "Platform: " + searchVal;
            passwordOut.textContent = `Password: ${value.password}`;
            search.value = "";
        });
    };
    
    
});

