const ruta = document.getElementById('ruta');
const servicio = document.getElementById('servicio');
const turno = document.getElementById('turno');
const pasajeros = document.getElementById('pasajeros');
const kmInicial = document.getElementById('kmInicial');
const kmFinal = document.getElementById('kmFinal');
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const fecha = document.getElementById('fecha');
const fuel = document.getElementById('fuel');
const btn = document.getElementById('eventBtn');

const addRuta = () => {
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control form-control-lg'
    newInput.id = id
    newInput.placeholder = 'Ruta: '
    newInput.name = 'route'
    newLabel.htmlFor = 'route'
    newLabel.innerText = 'Ruta: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    ruta.appendChild(newDiv)
}
const addServicio = () => {
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control'
    newInput.id = id
    newInput.placeholder = 'Servicio: '
    newInput.name = 'service'
    newLabel.htmlFor = 'service'
    newLabel.innerText = 'Servicio: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    servicio.appendChild(newDiv)
}
const addTurno = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control'
    newInput.id = id
    newInput.placeholder = 'Turno: '
    newInput.name = 'shift'
    newLabel.htmlFor = 'shift'
    newLabel.innerText = 'Turno: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    turno.appendChild(newDiv)
}
const addPasajeros = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'number'
    newInput.className = 'form-control'
    newInput.id = id
    newInput.placeholder = 'Pasajeros: '
    newInput.name = 'numOfPassengers'
    newLabel.htmlFor = 'numOfPassengers'
    newLabel.innerText = 'Pasajeros: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    pasajeros.appendChild(newDiv)
}
const addKmIni = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'number'
    newInput.className = 'form-control'
    newInput.id = id
    newInput.placeholder = 'Km Inicial: '
    newInput.name = 'startKm'
    newLabel.htmlFor = 'startKm'
    newLabel.innerText = 'Km Inicial: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    kmInicial.appendChild(newDiv)
}
const addKmEnd = () => {
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'number'
    newInput.className = 'form-control'
    newInput.id = id
    newInput.placeholder = 'Km Final: '
    newInput.name = 'endKm'
    newLabel.htmlFor = 'endKm'
    newLabel.innerText = 'Km Final: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    kmFinal.appendChild(newDiv)
}
const addStartTime = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control'
    newInput.id = id
    newInput.placeholder = 'Hora Inicial: '
    newInput.name = 'startTime'
    newLabel.htmlFor = 'startTime'
    newLabel.innerText = 'Hora Inicial: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    startTime.appendChild(newDiv)
}
const addEndTime = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control'
    newInput.id = id
    newInput.placeholder = 'Hora Final: '
    newInput.name = 'endTime'
    newLabel.htmlFor = 'endTime'
    newLabel.innerText = 'Hora Final: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    endTime.appendChild(newDiv)
}
const addDate = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'date'
    newInput.className = 'form-control'
    newInput.id = id
    newInput.placeholder = 'Fecha: '
    newInput.name = 'date'
    newLabel.htmlFor = 'date'
    newLabel.innerText = 'Fecha: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    fecha.appendChild(newDiv)
}
const addFuel = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = Math.floor(Math.random() * 100) + 1
    newInput.type = 'range'
    newInput.className = 'form-control form-range'
    newInput.min = 0
    newInput.max = 10
    newInput.step = 1
    newInput.id = id
    newInput.placeholder = 'Combustible: '
    newInput.name = 'fuel'
    newLabel.htmlFor = 'fuel'
    newLabel.innerText = 'Combustible: '
    newLabel.id = id
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    fuel.appendChild(newDiv)
}
const addToForm = () => {
    addRuta()
    addServicio()
    addTurno()
    addPasajeros()
    addKmIni()
    addKmEnd()
    addStartTime()
    addEndTime()
    addDate()
    addFuel()
}

btn.addEventListener('click', ()=>{
    addToForm()
})