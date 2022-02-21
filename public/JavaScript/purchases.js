const form = document.querySelector('.form');
const forma = document.querySelector('#form');
const qty = document.querySelector('.qty');
const np = document.querySelector('.np')
const importe = document.querySelector('.importe');
const addToForm = document.querySelector('.addToForm');
const total = document.querySelector('.total');
const btn = document.querySelector('.calculus');9
const importeSum = [];
const pzs = [];

function addItem() {
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
    newLine.id= id
    newLine.name = 'cantidad'
    newLabel.innerText = 'Cantidad'
    newLabel.id = id
    newLabel.htmlFor = 'cantidad'
    qty.appendChild(newDiv)
    newLine.addEventListener('change', ()=>{ 
        pzs.push(parseInt(newLine.value))
    }, { once: true }) 
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
    newLine.id= id
    newLine.name = 'partNumber'
    newLabel.innerText = 'Número de parte'
    newLabel.id = id
    newLabel.htmlFor = 'partNumber'
    np.appendChild(newDiv) 
}

function addImporte() {
    const newDiv = document.createElement('div')
    const newLineImp = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLineImp.type= 'number'
    newLineImp.id = id
    newDiv.setAttribute('class', 'form-floating pb-2');
    newDiv.appendChild(newLineImp)
    newDiv.appendChild(newLabel)
    newLineImp.className= 'form-control form-control-lg num'
    newLineImp.placeholder= 'Importe'
    newLineImp.name = 'importe'
    newLabel.innerText = 'Importe'
    newLabel.id = id
    newLabel.htmlFor = 'importe'
    importe.appendChild(newDiv)
    newLineImp.addEventListener('change', ()=>{
        importeSum.push(parseInt(newLineImp.value))
    }, { once: true })
}

addToForm.addEventListener('click', ()=>{
    addItem();
    addPartNumber();
    addQty();
    addImporte();
})
btn.addEventListener('click', ()=>{
    const totals = []
    for (i=0;i < pzs.length; i++){
        totals.push(pzs[i] * importeSum[i])
    }
    const totalOne = totals.reduce(function (a, b) {
        const preIva = a + b 
        return preIva }, 0)
    total.innerHTML = (totalOne * 1.16).toFixed(2)
})