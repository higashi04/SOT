const form = document.querySelector('.form');
const np = document.querySelector('.np');
const description = document.querySelector('.description');
const qty = document.querySelector('.qty');
const addToForm = document.querySelector('.addToForm');


function addPartNumber() {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type= 'text'
    newDiv.setAttribute('class', 'form-floating pb-2');
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    newLine.className= 'form-control form-control-lg'
    newLine.placeholder= 'Número de parte'
    newLine.id= id
    newLine.name = 'partNumber'
    newLabel.innerText = 'Número de parte'
    newLabel.id = id
    newLabel.htmlFor = 'partNumber'
    np.appendChild(newDiv) 
}

function addDescription() {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'text'
    newLine.id = id
    newDiv.setAttribute('class', 'form-floating pb-2');
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    newLine.className= 'form-control form-control-lg'
    newLine.placeholder= 'Descripción'
    newLine.name = 'objeto'
    newLabel.innerText = 'Descripción'
    newLabel.htmlFor = 'objeto'
    newLabel.id = id
    description.appendChild(newDiv)
}
function addQty() {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type= 'number'
    newDiv.setAttribute('class', 'form-floating pb-2');
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    newLine.className= 'form-control form-control-lg'
    newLine.placeholder= 'Cantidad'
    newLine.id= id
    newLine.name = 'cantidad'
    newLabel.innerText = 'Cantidad'
    newLabel.id = id
    newLabel.htmlFor = 'cantidad'
    qty.appendChild(newDiv)
}


addToForm.addEventListener('click', ()=>{
    addPartNumber();
    addDescription();
    addQty();
})




//function getRandomNumbers() {
//   const typedArray = new Uint8Array(10);
//   const randomValues = window.crypto.getRandomValues(typedArray);
//   return randomValues.join('');
// } generate random IDs, verify first if it's absolutely needed
