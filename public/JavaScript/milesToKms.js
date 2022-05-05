const millas = document.getElementById('millas')
const kms = document.getElementById('kms')
const calBtn = document.getElementById('calBtn')

const convert = () => {
   if(millas.value === '') {
       kms.value = '0 kilometros'
   } else {
    kms.value = `${parseInt(millas.value) * 1.609344} kilometros`
   }
}

calBtn.addEventListener('click', (e) => {
    e.preventDefault()
    convert()
})