const seedColorEl = document.getElementById("seed-color-input")
const selectModeEl = document.getElementById("select-mode")
const getSchemeBtn = document.getElementById("get-scheme-btn")
const colorBarsSection = document.getElementById("color-bar-container")
const colorCodesSection = document.getElementById("color-code-container")

getSchemeBtn.addEventListener("click", getColorScheme)

function copyColor(id){
    const copyText = document.getElementById(`${id}`).innerText
    navigator.clipboard.writeText(copyText).then(() => {
        // Alert the user that the action took place.
        // Nobody likes hidden stuff being done under the hood!
        alert("Copied to clipboard")
    })
    console.log(copyText)
}

function getColorScheme(){
    //We eliminate the first element of this string which is the "#" character
    const seedColor = seedColorEl.value.slice(1)
    const mode = selectModeEl.value
    //We clean all the data that is inside the containers
    colorBarsSection.innerHTML = ``
    colorCodesSection.innerHTML = ``
    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
    .then(response => response.json())
    .then(data => {
        
        for(let i = 0; i < data.colors.length; i++){

            const color = data.colors[i].hex.value

            colorBarsSection.innerHTML += `
                <div class="color-bar" style=background-color:${color}></div>    
            `
            //I prefer not to include the "#" character on the id of each color. For that I use slice.
            colorCodesSection.innerHTML += `
                <div onclick=copyColor("id${color.slice(1)}") id="id${color.slice(1)}" class="color-code">${color}</div>    
            `

        }
    })
}


