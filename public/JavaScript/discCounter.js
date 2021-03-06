const company = document.querySelectorAll('.company');
const infrigement = document.querySelectorAll('.infrigement');

const infrigOne = document.getElementById('1')
const ingrigTwo = document.getElementById('2')
const ingrigThree = document.getElementById('3')
const ingrigFour = document.getElementById('4')
const infrigFive = document.getElementById('5')
const infrigSix = document.getElementById('6')
const infrigSeven = document.getElementById('7')
const infrigEight = document.getElementById('8')
const infrigNine = document.getElementById('9')
const infrigTen = document.getElementById('10')
const infrigEleven = document.getElementById('11')
const infrigTwelve = document.getElementById('12')

let countOne = 0
let countTwo = 0
let countThree = 0
let countFour = 0
let countFive = 0
let countSix = 0
let countSeven = 0
let countEight = 0
let countNine = 0
let countTen = 0
let countEleven = 0
let countTwelve = 0

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

const ingrigCounter = () => {
    infrigement.forEach((item) => {
       switch (item.innerText) {
           case 'Da??o intencional a material / equipo':
               countOne ++
               infrigOne.innerText = countOne
               break;
           case 'Desempe??o Laboral':
               countTwo ++
               ingrigTwo.innerText = countTwo
               break;
           case 'Violaci??n de las reglas de seguridad':
               countThree ++
               ingrigThree.innerText = countThree
               break;
           case 'Violaci??n de las pol??ticas o procedimientos de la compa????a':
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
            case 'Inclumplimiento de las Instrucciones':
                countEight ++
                infrigEight.innerText = countEight
                break;
            case 'Rendimiento Laboral':
                countNine ++
                infrigNine.innerText = countNine
                break;
            case 'Groserias a los Empleados':
                countTen ++
                infrigTen.innerText = countTen
                break;
            case 'Insubordinaci??n':
                countEleven ++
                infrigEleven.innerText = countEleven
                break;
            case 'Trabajando en Asuntos Personales':
                countTwelve ++
                infrigTwelve.innerText = countTwelve
                break;
           default:
               break;
       }
    })
}

companyCounter()
ingrigCounter()