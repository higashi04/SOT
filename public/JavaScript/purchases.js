const form = document.querySelector('.form');
const forma = document.querySelector('#form');
const qty = document.querySelector('.qty');
const np = document.querySelector('.np')
const importe = document.querySelector('.importe');
const addToForm = document.querySelector('.addToForm');
const removeBtn = document.getElementById('remove');

const formIDs = []
const qtyIDs = []
const npIDs = []
const importeIDs = []

function addItem() {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'text'
    newDiv.id = id
    newDiv.setAttribute('class', 'form-floating pb-2');
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    newLine.className= 'form-control form-control-lg'
    newLine.placeholder= 'Descripción'
    newLine.name = 'objeto'
    newLabel.innerText = 'Descripción'
    newLabel.htmlFor = 'objeto'
    newLabel.id = id
    formIDs.push(id)
    form.appendChild(newDiv)
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
    newDiv.id= id
    newLine.name = 'cantidad'
    newLabel.innerText = 'Cantidad'
    newLabel.id = id
    newLabel.htmlFor = 'cantidad'
    qtyIDs.push(id)
    qty.appendChild(newDiv)
}

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
    newDiv.id= id
    newLine.name = 'partNumber'
    newLabel.innerText = 'Número de parte'
    newLabel.id = id
    newLabel.htmlFor = 'partNumber'
    npIDs.push(id)
    np.appendChild(newDiv) 
}

function addImporte() {
    const newDiv = document.createElement('div')
    const newLineImp = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLineImp.type= 'number'
    newDiv.id = id
    newDiv.setAttribute('class', 'form-floating pb-2');
    newDiv.appendChild(newLineImp)
    newDiv.appendChild(newLabel)
    newLineImp.className= 'form-control form-control-lg num'
    newLineImp.placeholder= 'Importe'
    newLineImp.name = 'importe'
    newLabel.innerText = 'Importe'
    newLabel.id = id
    newLabel.htmlFor = 'importe'
    importeIDs.push(id)
    importe.appendChild(newDiv)
}

addToForm.addEventListener('click', ()=>{
    addItem();
    addPartNumber();
    addQty();
    addImporte();
})

const removeItems = () => {
   const formToRemove = document.getElementById(formIDs[formIDs.length - 1])
   const qtyToRemove = document.getElementById(qtyIDs[qtyIDs.length - 1])
   const npToRemove = document.getElementById(npIDs[npIDs.length - 1])
   const importeToRemove = document.getElementById(importeIDs[importeIDs.length - 1])
   if(formIDs[0] !== undefined) {
       form.removeChild(formToRemove)
       formIDs.pop()
       qty.removeChild(qtyToRemove)
       qtyIDs.pop()
       np.removeChild(npToRemove)
       npIDs.pop()
       importe.removeChild(importeToRemove)
       importeIDs.pop() 
    } else {
        alert('No hay filas para eliminar.')
    }
}


removeBtn.addEventListener('click', ()=> {
    removeItems()
})