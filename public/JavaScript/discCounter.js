const company = document.querySelectorAll('.company');
const infrigement = document.querySelectorAll('.infrigement');

const infrigOne = document.getElementById('1')
const ingrigTwo = document.getElementById('2')
const ingrigThree = document.getElementById('3')
const ingrigFour = document.getElementById('4')
const infrigFive = document.getElementById('5')
const infrigSix = document.getElementById('6')
const infrigSeven = document.getElementById('7')
let countOne = 0
let countTwo = 0
let countThree = 0
let countFour = 0
let countFive = 0
let countSix = 0
let countSeven = 0

const oesCounter = document.getElementById('oes')
const medlineCounter = document.getElementById('medline')
const bpiCounter = document.getElementById('bpi')
const aistermiCounter = document.getElementById('aistermi')
const tvillaCounter = document.getElementById('tvilla')
let oes = 0
let bpi = 0
let medline = 0
let aistermi = 0
let tvilla = 0

const companyCounter = () => {
    company.forEach((item) => {
        switch (item.innerText) {
            case 'OES':
                oes ++
                oesCounter.innerText = oes
                break;
            case 'BPI':
                bpi ++
                bpiCounter.innerText = bpi
                break;
            case 'MEDLINE':
                medline ++
                medlineCounter.innerText = medline
                break;
            case 'AISTERMI':
                aistermi ++
                aistermiCounter.innerText = aistermi
                break;
            case 'TRANSPORTES VILLARREAL':
                tvilla ++
                tvillaCounter.innerText = tvilla
                break;
            default:
                break;
        }
    })
}
infrigement.forEach(i => console.log(i.innerText))
const ingrigCounter = () => {
    infrigement.forEach((item) => {
       switch (item.innerText) {
           case 'Daño intencional a material / equipo':
               countOne ++
               infrigOne.innerText = countOne
               break;
           case 'Desempeño Laboral':
               countTwo ++
               ingrigTwo.innerText = countTwo
               break;
           case 'Violación de las reglas de seguridad':
               countThree ++
               ingrigThree.innerText = countThree
               break;
           case 'Violación de las políticas o procedimientos de la compañía':
               countFour ++
               ingrigFour.innerText = countFour
               break;
           case 'Asistencia':
               countFive ++
               infrigFive.innerText = countFive
               break;
           case 'Calidad de trabajo insatisfactoria':
               countSix ++
               infrigSix.innerText = countSix
               break;
           case 'Descuido':
               countSeven ++
               infrigSeven.innerText = countSeven
               break;
       
           default:
               break;
       }
    })
}

companyCounter()
ingrigCounter()