const addBtn = document.getElementById('addToForm');
const removeBtn = document.getElementById('removeBtn');
const company = document.getElementById('company').innerText

const driverDiv = document.getElementById('driver');
const dateDiv = document.getElementById('date');
const agreeDiv = document.getElementById('agree');
const resultDiv = document.getElementById('result');
const commentsDiv = document.getElementById('comments');
const performedDiv = document.getElementById('performed');

const datesIDs = []
const driversIDs = []
const agreeIDs = []
const resultIDS = []
const commentsIDs = []
const performedIDs = []

const addDate = () => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newDiv = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    newDiv.className = 'form-floating pb-2'
    newDiv.id = id
    input.type = 'date'
    input.className = 'form-control form-control-lg'
    input.name = 'date'
    label.htmlFor = 'date'
    label.innerText = 'Fecha:'
    datesIDs.push(id)
    newDiv.appendChild(input)
    newDiv.appendChild(label)
    dateDiv.appendChild(newDiv)
}

const addDriver = () => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newDiv = document.createElement('div')
    const label = document.createElement('label')
    const select = document.createElement('select')
    newDiv.id = id
    newDiv.className = 'form-floating mb-2'
    select.className = 'form-select'
    select.name = 'driver'
    fetch('getCompany', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({payload: company})
    }).then(res => res.json()).then(data => {
      let payload = data.payload
      payload.forEach(element => {
        if (element.fueDadoDeBaja === false) {
            const option = document.createElement('option')
            option.value = element._id
            option.innerText = element.name
            select.appendChild(option)
        }
      })
    })
    label.htmlFor = 'driver'
    label.innerText = 'Chofer'
    driversIDs.push(id)
    newDiv.appendChild(select)
    newDiv.appendChild(label)
    driverDiv.appendChild(newDiv)
}

const addAgree = () => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newDiv = document.createElement('div')
    const label = document.createElement('label')
    const select = document.createElement('select')
    const yesOpt = document.createElement('option')
    const noOpt = document.createElement('option')
    newDiv.className = 'form-floating mb-2'
    newDiv.id = id
    select.className = 'form-select'
    select.name = 'agree'
    yesOpt.value = 'true'
    yesOpt.innerText = 'Sí'
    noOpt.value = 'false'
    noOpt.innerText = 'No'
    label.htmlFor = 'agree'
    label.innerText = 'Autorizó a Realizar Prueba'
    agreeIDs.push(id)
    select.appendChild(yesOpt)
    select.appendChild(noOpt)
    newDiv.appendChild(select)
    newDiv.appendChild(label)
    agreeDiv.appendChild(newDiv)
}

const addResult = () =>{
    const id = Math.floor(Math.random() * 1000) + 1
    const newDiv = document.createElement('div')
    const label = document.createElement('label')
    const select = document.createElement('select')
    const yesOpt = document.createElement('option')
    const noOpt = document.createElement('option')
    newDiv.className = 'form-floating mb-2'
    newDiv.id = id
    select.className = 'form-select'
    select.name = 'result'
    yesOpt.value = 'Positivo'
    yesOpt.innerText = 'Positivo'
    noOpt.value = 'Negativo'
    noOpt.innerText = 'Negativo'
    noOpt.setAttribute('selected', 'true')
    label.htmlFor = 'result'
    label.innerText = 'Resultado'
    resultIDS.push(id)
    select.appendChild(yesOpt)
    select.appendChild(noOpt)
    newDiv.appendChild(select)
    newDiv.appendChild(label)
    resultDiv.appendChild(newDiv)
}

const addComments = () =>{
    const id = Math.floor(Math.random() * 1000) + 1
    const newDiv = document.createElement('div')
    const text = document.createElement('textarea')
    const label = document.createElement('label')
    newDiv.id = id
    newDiv.className = 'form-floating pb-2'
    text.name = 'comments'
    text.className = 'form-control'
    text.placeholder = 'Observaciones'
    label.htmlFor = 'comments'
    label.innerText = 'Observaciones'
    commentsIDs.push(id)
    newDiv.appendChild(text)
    newDiv.appendChild(label)
    commentsDiv.appendChild(newDiv)
}

const addPerformed = () => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newDiv = document.createElement('div')
    const input = document.createElement('input')
    const label = document.createElement('label')
    newDiv.className = 'form-floating pb-2'
    newDiv.id = id
    input.className = 'form-control form-control-lg'
    input.type = 'text'
    input.name = 'performedBy'
    input.placeholder = 'Realizado por: '
    label.htmlFor = 'performedBy'
    label.innerText = 'Realizado por: '
    performedIDs.push(id)
    newDiv.appendChild(input)
    newDiv.appendChild(label)
    performedDiv.appendChild(newDiv)
}


const removeItems = () => {
    const date = document.getElementById(datesIDs[datesIDs.length - 1])
    const driver = document.getElementById(driversIDs[driversIDs.length - 1])
    const agree = document.getElementById(agreeIDs[agreeIDs.length - 1])
    const result = document.getElementById(resultIDS[resultIDS.length - 1])
    const comments = document.getElementById(commentsIDs[commentsIDs.length-1])
    const performed = document.getElementById(performedIDs[performedIDs.length - 1])
    if (datesIDs[0] !== undefined) {
        dateDiv.removeChild(date)
        datesIDs.pop()
        driverDiv.removeChild(driver)
        driversIDs.pop()
        agreeDiv.removeChild(agree)
        agreeIDs.pop()
        resultDiv.removeChild(result)
        resultIDS.pop()
        commentsDiv.removeChild(comments)
        commentsIDs.pop()
        performedDiv.removeChild(performed)
        performedIDs.pop()
    } else {
        alert('No hay filas para eliminar.')
    }
}

addBtn.addEventListener('click', ()=>{
    addDate()
    addDriver()
    addAgree()
    addResult()
    addComments()
    addPerformed()
})
removeBtn.addEventListener('click', ()=> {
    removeItems()
})