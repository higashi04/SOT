const btn = document.querySelector('#eventBtn')
const rutas = document.getElementById('rutas')
const driver = document.getElementById('driver')
const shift  = document.getElementById('shift')
const service  = document.getElementById('service')
const people  = document.getElementById('people')
const start  = document.getElementById('start')
const end  = document.getElementById('end')
const driverSelect = document.getElementById('driverSelect')
const remove = document.getElementById('remove')

const rutaArr = []
const driverArr = []
const shiftArr = []
const serviceArr = []
const passArr = []
const startArr = []
const endArr = []

const addRuta = () => {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 10000) + 1
    newLine.type = 'text'
    newDiv.id = id
    newDiv.setAttribute('class', 'form-floating mb-3 col');
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    newLine.className= 'form-control form-control-lg'
    newLine.placeholder= 'Ruta: '
    newLine.name = 'route'
    newLabel.innerText = 'Ruta: '
    newLabel.htmlFor = 'route'
    newLabel.id = id
    rutaArr.push(id)
    rutas.appendChild(newDiv)
}

const addDriver = () => {
    const clone = driverSelect.cloneNode(true)
    const id = Math.floor(Math.random() * 10000) + 1
    clone.removeAttribute("hidden")
    clone.id = id
    driverArr.push(id)
    driver.appendChild(clone)
}

const addShift = () =>{
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 10000) + 1
    newLine.type = 'text'
    newDiv.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Turno: '
    newLine.placeholder= 'Turno: '
    newLabel.htmlFor = 'shift'
    newLine.name = 'shift'
    newLine.className= 'form-control form-control-lg'
    shiftArr.push(id)
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    shift.appendChild(newDiv)
}

const addService = () =>{
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 10000) + 1
    newLine.type = 'text'
    newDiv.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Servicio: '
    newLine.placeholder= 'Servicio: '
    newLabel.htmlFor = 'service'
    newLine.name = 'service'
    newLine.className= 'form-control form-control-lg'
    serviceArr.push(id)
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    service.appendChild(newDiv)
}

const addNumOfPassengers = () => {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 10000) + 1
    newLine.type = 'number'
    newDiv.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Personas: '
    newLine.placeholder= 'Personas: '
    newLabel.htmlFor = 'numOfPassengers'
    newLine.name = 'numOfPassengers'
    newLine.className = 'form-control form-control-lg'
    passArr.push(id)
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    people.appendChild(newDiv)
}

const addStartTime = () => {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 10000) + 1
    newLine.type = 'text'
    newDiv.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Hora de Inicio: '
    newLine.placeholder= 'Hora de Inicio: '
    newLabel.htmlFor = 'startTime'
    newLine.name = 'startTime'
    newLine.className= 'form-control form-control-lg'
    startArr.push(id)
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    start.appendChild(newDiv)
}

const addEndTime = () => {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 10000) + 1
    newLine.type = 'text'
    newDiv.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Hora Termino: '
    newLine.placeholder= 'Hora Termino: '
    newLabel.htmlFor = 'endTime'
    newLine.name = 'endTime'
    newLine.className= 'form-control form-control-lg'
    endArr.push(id)
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    end.appendChild(newDiv)
}
btn.addEventListener('click', ()=>{
    addRuta()
    addDriver()
    addShift()
    addService()
    addNumOfPassengers()
    addStartTime()
    addEndTime()
})


const removeFiles = () => {
    const rutaToRemove = document.getElementById(rutaArr[rutaArr.length-1])
    rutas.removeChild(rutaToRemove)
    rutaArr.pop()
}
const removeDriver = () => {
    const driverToRemove = document.getElementById(driverArr[driverArr.length - 1])
    driver.removeChild(driverToRemove)
    driverArr.pop()
}
const removeShift = () => {
    const shiftToRemove = document.getElementById(shiftArr[shiftArr.length -1])
    shift.removeChild(shiftToRemove)
    shiftArr.pop()
}
const removeService = () => {
    const serviceToRemove = document.getElementById(serviceArr[serviceArr.length - 1])
    service.removeChild(serviceToRemove)
    serviceArr.pop()
}
const removePeople = () => {
    const passToRemove = document.getElementById(passArr[passArr.length-1])
    people.removeChild(passToRemove)
    passArr.pop()
}
const removeStart = () => {
    const startToRemove = document.getElementById(startArr[startArr.length -1])
    start.removeChild(startToRemove)
    startArr.pop()
}
const removeEnd = () => {
    const endToRemove = document.getElementById(endArr[endArr.length-1])
    end.removeChild(endToRemove)
    endArr.pop()
}
remove.addEventListener('click', ()=>{
    if(rutaArr[0] !== undefined) {
        removeFiles()
        removeDriver()
        removeShift()
        removeService()
        removePeople()
        removeStart()
        removeEnd()
    } else {
        alert('No hay filas para eliminar.')
    }
})