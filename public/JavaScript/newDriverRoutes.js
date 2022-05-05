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
const remove = document.getElementById('remove')

const rutaArr = []
const servArr = []
const shiftArr = []
const passArr = []
const kmArr = []
const endArr = []
const stimeArr = []
const etimeArr = []
const dArr = []
const fuelArr = []

const addRuta = () => {
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'ruta' + Math.floor(Math.random() * 1000) + 1
    newInput.type = 'text'
    newInput.className = 'form-control form-control-lg'
    newDiv.id = id
    newInput.placeholder = 'Ruta: '
    newInput.name = 'route'
    newLabel.htmlFor = 'route'
    newLabel.innerText = 'Ruta: '
    newLabel.id = id
    rutaArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    ruta.appendChild(newDiv)
}
const addServicio = () => {
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'serv' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control'
    newDiv.id = id
    newInput.placeholder = 'Servicio: '
    newInput.name = 'service'
    newLabel.htmlFor = 'service'
    newLabel.innerText = 'Servicio: '
    newLabel.id = id
    servArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    servicio.appendChild(newDiv)
}
const addTurno = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'shift' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control'
    newDiv.id = id
    newInput.placeholder = 'Turno: '
    newInput.name = 'shift'
    newLabel.htmlFor = 'shift'
    newLabel.innerText = 'Turno: '
    newLabel.id = id
    shiftArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    turno.appendChild(newDiv)
}
const addPasajeros = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'pass' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'number'
    newInput.className = 'form-control'
    newDiv.id = id
    newInput.placeholder = 'Pasajeros: '
    newInput.name = 'numOfPassengers'
    newLabel.htmlFor = 'numOfPassengers'
    newLabel.innerText = 'Pasajeros: '
    newLabel.id = id
    passArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    pasajeros.appendChild(newDiv)
}
const addKmIni = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'km' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'number'
    newInput.className = 'form-control'
    newDiv.id = id
    newInput.placeholder = 'Km Inicial: '
    newInput.name = 'startKm'
    newLabel.htmlFor = 'startKm'
    newLabel.innerText = 'Km Inicial: '
    newLabel.id = id
    kmArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    kmInicial.appendChild(newDiv)
}
const addKmEnd = () => {
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'end' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'number'
    newInput.className = 'form-control'
    newDiv.id = id
    newInput.placeholder = 'Km Final: '
    newInput.name = 'endKm'
    newLabel.htmlFor = 'endKm'
    newLabel.innerText = 'Km Final: '
    newLabel.id = id
    endArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    kmFinal.appendChild(newDiv)
}
const addStartTime = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'stime' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control'
    newDiv.id = id
    newInput.placeholder = 'Hora Inicial: '
    newInput.name = 'startTime'
    newLabel.htmlFor = 'startTime'
    newLabel.innerText = 'Hora Inicial: '
    newLabel.id = id
    stimeArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    startTime.appendChild(newDiv)
}
const addEndTime = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'etime' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'text'
    newInput.className = 'form-control'
    newDiv.id = id
    newInput.placeholder = 'Hora Final: '
    newInput.name = 'endTime'
    newLabel.htmlFor = 'endTime'
    newLabel.innerText = 'Hora Final: '
    newLabel.id = id
    etimeArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    endTime.appendChild(newDiv)
}
const addDate = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'd' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'date'
    newInput.className = 'form-control'
    newDiv.id = id
    newInput.placeholder = 'Fecha: '
    newInput.name = 'date'
    newLabel.htmlFor = 'date'
    newLabel.innerText = 'Fecha: '
    newLabel.id = id
    dArr.push(id)
    newDiv.className = 'form-floating mb-3 col'
    newDiv.appendChild(newInput)
    newDiv.appendChild(newLabel)
    fecha.appendChild(newDiv)
}
const addFuel = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input')
    const newLabel = document.createElement('label')
    const id = 'fuel' + Math.floor(Math.random() * 100) + 1
    newInput.type = 'range'
    newInput.className = 'form-control form-range'
    newInput.min = 0
    newInput.max = 10
    newInput.step = 1
    newDiv.id = id
    newInput.placeholder = 'Combustible: '
    newInput.name = 'fuel'
    newLabel.htmlFor = 'fuel'
    newLabel.innerText = 'Combustible: '
    newLabel.id = id
    fuelArr.push(id)
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

const removeRuta = () => {
    const rutaToRemove = document.getElementById(rutaArr[rutaArr.length-1])
    ruta.removeChild(rutaToRemove)
    rutaArr.pop()
}
const removeServicio = () => {
    const serviToRemove = document.getElementById(servArr[servArr.length-1])
    servicio.removeChild(serviToRemove)
    servArr.pop()
}
const removeShift = () =>{
    const shiftToRemove = document.getElementById(shiftArr[shiftArr.length-1])
    turno.removeChild(shiftToRemove)
    shiftArr.pop()
}
const removePass = () => {
    const passToRemove = document.getElementById(passArr[passArr.length-1])
    pasajeros.removeChild(passToRemove)
    passArr.pop()
}
const removeKmIni = () => {
    const kmToRemove = document.getElementById(kmArr[kmArr.length-1])
    kmInicial.removeChild(kmToRemove)
    kmArr.pop()
}
const removeKmEnd = () => {
    const endToRemove = document.getElementById(endArr[endArr.length-1])
    kmFinal.removeChild(endToRemove)
    endArr.pop()
}
const removeStartTime = () => {
    const stToRemove = document.getElementById(stimeArr[stimeArr.length-1])
    startTime.removeChild(stToRemove)
    stimeArr.pop()
}
const removeEndTime = () => {
    const etToRemove = document.getElementById(etimeArr[etimeArr.length-1])
    endTime.removeChild(etToRemove)
    etimeArr.pop()
}
const removeDate = () => {
    const dateToRemove = document.getElementById(dArr[dArr.length-1])
    fecha.removeChild(dateToRemove)
    dArr.pop()
}
const removeFuel = () => {
    const fuelToRemove = document.getElementById(fuelArr[fuelArr.length-1])
    fuel.removeChild(fuelToRemove)
    fuelArr.pop()
}
const removeFromForm = () =>{
    if(rutaArr[0] !== undefined) {
        removeRuta()
        removeServicio()
        removeShift()
        removePass()
        removeKmIni()
        removeKmEnd()
        removeStartTime()
        removeEndTime()
        removeDate()
        removeFuel()
    } else {
        alert('No hay filas para eliminar.')
    }
}

btn.addEventListener('click', ()=>{
    addToForm()
})
remove.addEventListener('click', () => {
    removeFromForm()
})