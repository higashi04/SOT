const output = document.querySelector('.output')
const sendBar = document.getElementById('send')
const sendBtn = document.getElementById('send-btn')
const url = document.getElementById('url')

const socket = io.connect(`${url.innerText}`)


sendBtn.addEventListener('click', () => {
    alert('fuck_u')
})