let taxSwitch = document.querySelector("#flexSwitchCheckDefault");
taxSwitch.addEventListener('click', () => {
    let taxInfo = document.querySelectorAll(".taxInfo");
    for(let info of taxInfo) {
        if(info.innerText == "night") {
            info.innerText = "night + 18% GST";
        }
        else {
            info.innerText = "night";
        }
    }
})