const btn = document.querySelector('#eventBtn')
const rutas = document.getElementById('rutas')
const driver = document.getElementById('driver')
const shift  = document.getElementById('shift')
const service  = document.getElementById('service')
const people  = document.getElementById('people')
const start  = document.getElementById('start')
const end  = document.getElementById('end')
const driverSelect = document.getElementById('driverSelect')

const addRuta = () => {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'text'
    newLine.id = id
    newDiv.setAttribute('class', 'form-floating mb-3 col');
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    newLine.className= 'form-control form-control-lg'
    newLine.placeholder= 'Ruta: '
    newLine.name = 'route'
    newLabel.innerText = 'Ruta: '
    newLabel.htmlFor = 'route'
    newLabel.id = id
    rutas.appendChild(newDiv)
}

const addDriver = () => {
    const clone = driverSelect.cloneNode(true)
    clone.removeAttribute("hidden")
    driver.appendChild(clone)
}

const addShift = () =>{
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'text'
    newLine.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Turno: '
    newLine.placeholder= 'Turno: '
    newLabel.htmlFor = 'shift'
    newLine.name = 'shift'
    newLine.className= 'form-control form-control-lg'
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    shift.appendChild(newDiv)
}

const addService = () =>{
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'text'
    newLine.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Servicio: '
    newLine.placeholder= 'Servicio: '
    newLabel.htmlFor = 'service'
    newLine.name = 'service'
    newLine.className= 'form-control form-control-lg'
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    service.appendChild(newDiv)
}

const addNumOfPassengers = () => {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'number'
    newLine.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Personas: '
    newLine.placeholder= 'Personas: '
    newLabel.htmlFor = 'numOfPassengers'
    newLine.name = 'numOfPassengers'
    newLine.className= 'form-control form-control-lg'
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    people.appendChild(newDiv)
}

const addStartTime = () => {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'text'
    newLine.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Hora de Inicio: '
    newLine.placeholder= 'Hora de Inicio: '
    newLabel.htmlFor = 'startTime'
    newLine.name = 'startTime'
    newLine.className= 'form-control form-control-lg'
    newDiv.appendChild(newLine)
    newDiv.appendChild(newLabel)
    start.appendChild(newDiv)
}

const addEndTime = () => {
    const newDiv = document.createElement('div')
    const newLine = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newLine.type = 'text'
    newLine.id = id
    newDiv.className = 'form-floating mb-3 col'
    newLabel.innerText = 'Hora Termino: '
    newLine.placeholder= 'Hora Termino: '
    newLabel.htmlFor = 'endTime'
    newLine.name = 'endTime'
    newLine.className= 'form-control form-control-lg'
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