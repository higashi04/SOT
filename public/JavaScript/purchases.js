const form = document.querySelector('.form');
const qty = document.querySelector('.qty');
const importe = document.querySelector('.importe');
const addToForm = document.querySelector('.addToForm');
const total = document.querySelector('.total');
const btn = document.querySelector('.calculus')
const num = document.querySelectorAll('.num')
const importeSum = []

function addItem() {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'text'
    newLine.id = id
    newDiv.setAttribute('class', 'form-floating col-6 pb-2');
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    newLine.className= 'form-control form-control-lg'
    newLine.placeholder= 'Descripción'
    newLine.name = 'objeto'
    newLabel.innerText = 'Descripción'
    newLabel.htmlFor = 'objeto'
    newLabel.id = id
    form.appendChild(newDiv)
}
function addQty() {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type= 'number'
    newDiv.setAttribute('class', 'form-floating col-6 pb-2');
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

function addImporte() {
    const newDiv = document.createElement('div')
    const newLineImp = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLineImp.type= 'number'
    newLineImp.id = id
    newDiv.setAttribute('class', 'form-floating col-6 pb-2');
    newDiv.appendChild(newLineImp)
    newDiv.appendChild(newLabel)
    newLineImp.className= 'form-control form-control-lg num'
    newLineImp.placeholder= 'Importe'
    newLineImp.name = 'importe'
    newLabel.innerText = 'Importe'
    newLabel.id = id
    newLabel.htmlFor = 'importe'
    importe.appendChild(newDiv)
}

addToForm.addEventListener('click', ()=>{
    addItem();
    addQty();
    addImporte();
})
btn.addEventListener('click', ()=>{
    console.log(num)
    importeSum.push(parseInt(num))
    console.log(importeSum)
    total.innerHTML = importeSum.reduce(function (a, b) {
        return a + b;
      }, 0)
})