const timeDiv = document.querySelector('.time');
const visitorDiv = document.querySelector('.visitor');
const messageDiv = document.querySelector('.message');
const transferedDiv = document.querySelector('.transfered');
const arDiv = document.querySelector('.ar');
const btn = document.querySelector('.addToForm');

const addTime = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    newDiv.className = 'form-floating pb-2'
    newInput.type = 'text'
    newInput.className = 'form-control form-control-lg'
    newInput.name = 'time'
    newInput.placeholder = 'Hora: '
    newLabel.htmlFor = 'time'
    newLabel.className = 'form-label'
    newLabel.innerText = 'Hora: '
    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);
    timeDiv.appendChild(newDiv);
}

const addvisitor = ()=>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    newDiv.className = 'form-floating pb-2'
    newInput.type = 'text'
    newInput.className = 'form-control form-control-lg'
    newInput.name = 'visitor'
    newInput.placeholder = 'Nombre de Visita: '
    newLabel.htmlFor = 'visitor'
    newLabel.className = 'form-label'
    newLabel.innerText = 'Nombre de Visita: '
    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);
    visitorDiv.appendChild(newDiv);
}

const addMessage = () => {
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    newDiv.className = 'form-floating pb-2'
    newInput.type = 'text'
    newInput.className = 'form-control form-control-lg'
    newInput.name = 'message'
    newInput.placeholder = 'Recado: '
    newLabel.htmlFor = 'message'
    newLabel.className = 'form-label'
    newLabel.innerText = 'Recado: '
    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);
    messageDiv.appendChild(newDiv);
}

const addTransfer = () => {
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    newDiv.className = 'form-floating pb-2'
    newInput.type = 'text'
    newInput.className = 'form-control form-control-lg'
    newInput.name = 'transfered'
    newInput.placeholder = 'Dirigido A: '
    newLabel.htmlFor = 'transfered'
    newLabel.className = 'form-label'
    newLabel.innerText = 'Dirigido A: '
    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);
    transferedDiv.appendChild(newDiv);
}

const addAr = () =>{
    const newDiv = document.createElement('div')
    const newInput = document.createElement('input');
    const newLabel = document.createElement('label');
    newDiv.className = 'form-floating pb-2'
    newInput.type = 'text'
    newInput.className = 'form-control form-control-lg'
    newInput.name = 'ar'
    newInput.placeholder = 'A / R: '
    newLabel.htmlFor = 'ar'
    newLabel.className = 'form-label'
    newLabel.innerText = 'A / R: '
    newDiv.appendChild(newInput);
    newDiv.appendChild(newLabel);
    arDiv.appendChild(newDiv);
}
btn.addEventListener('click', ()=>{
    addTime()
    addvisitor()
    addMessage()
    addTransfer()
    addAr()
})
