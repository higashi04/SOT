const searchBtn = document.getElementById('searchBtn')
const searchBar = document.getElementById('searchBar')
const table = document.getElementById('table')
const totales = document.getElementById('totales')

const cashTotal = []
const ltsTotal = []

const searchResults = () => {
    let match = searchBar.value.match(/^[a-zA-Z0-9_.-]*$/);
    let matchTwo = searchBar.value.match(/\s*/);
    if (matchTwo[0] === searchBar.value) {
      table.innerHTML = ''
      totales.innerHTML = ''
      return
    }
    if (match[0] === searchBar.value){
        fetch('getDate', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({payload: searchBar.value})
    }).then(res => res.json()).then(data => {
      let payload = data.payload
      table.innerHTML = ''
      totales.innerHTML = ''
      cashTotal.splice(0, cashTotal.length)
      ltsTotal.splice(0, ltsTotal.length)
      if(payload.length < 1) {
        searchResults.innerHTML = '<p>No hubo resultados</p>'
        return
      }

        payload.forEach((item) => {
        const row = document.createElement('div')
        row.className = 'row rutas-row'
        const vale = document.createElement('div')
        vale.className = 'col'
        vale.innerText = item.vale
        row.appendChild(vale)
        const date = document.createElement('div')
        date.className = 'col'
        date.innerText = item.date
        row.appendChild(date)
        const tipo = document.createElement('div')
        tipo.className = 'col'
        tipo.innerText = item.tipo
        row.appendChild(tipo)
        const lts = document.createElement('div')
        lts.className = 'col'
        lts.innerText = item.lts
        ltsTotal.push(item.lts)
        row.appendChild(lts)
        const costo = document.createElement('div')
        costo.className = 'col'
        costo.innerText = '$' + parseFloat(item.costo).toFixed(2)
        row.appendChild(costo)
        const total = document.createElement('div')
        total.className = 'col'
        total.innerText ='$' + (item.lts * item.costo).toFixed(2)
        cashTotal.push(item.lts * item.costo)
        row.appendChild(total)
        const unidad = document.createElement('div')
        unidad.className = 'col'
        unidad.innerText = item.unidad
        row.appendChild(unidad)
        const chofer = document.createElement('div')
        chofer.className = 'col'
        chofer.innerText = item.chofer
        row.appendChild(chofer)
        const kms = document.createElement('div')
        kms.className = 'col'
        kms.innerText = item.kms
        row.appendChild(kms)
        const rendimiento = document.createElement('div')
        rendimiento.className = 'col'
        rendimiento.innerText = (parseInt(item.kms) / parseInt(item.lts)).toFixed(2)
        row.appendChild(rendimiento)
        const autoriza = document.createElement('div')
        autoriza.className = 'col'
        autoriza.innerText = item.autoriza
        row.appendChild(autoriza)
        table.appendChild(row)
      })
       totalsSpent()
       totalConsumed()
       const average = document.createElement('div')
       const colOne = document.createElement('div')
       average.className = 'row rutas-row'
       colOne.className = 'col-6'
       colOne.innerText = `Promedio Gasto por Unidad:  $${(parseInt(cashTotal.reduce((a,b) => {return a + b },0)) / parseInt(payload.length)).toFixed(2)}`
       average.appendChild(colOne)
       const colTwo = document.createElement('div')
       colTwo.className = 'col-6'
       colTwo.innerText = `Promedio de Litros Consumidos por Unidad: ${(parseInt(ltsTotal.reduce((a,b) => {return a + b },0)) / parseInt(payload.length)).toFixed(2)}`
       average.appendChild(colTwo)
       totales.appendChild(average)
    })
    }
}

const totalsSpent = () => {
    const totalCash = cashTotal.reduce((a,b) => {return a + b },0)
    const totalCashRow = document.createElement('div')
    totalCashRow.className = 'row rutas-row'
    const div = document.createElement('div')
    div.className = 'col-12 center'
    div.innerText = `Gasto Total:  $ ${totalCash.toFixed(2)}`
    totalCashRow.appendChild(div)
    totales.appendChild(totalCashRow)
    return totalCash
}

const totalConsumed = () => {
    const totalLts = ltsTotal.reduce((a,b) => {return a + b },0)
    const totalLtsRow = document.createElement('div')
    totalLtsRow.className = 'row rutas-row'
    const div = document.createElement('div')
    div.className = 'col-12 center'
    div.innerText = `Litros Consumidos: ${totalLts}`
    totalLtsRow.appendChild(div)
    totales.appendChild(totalLtsRow)
    return totalLts
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchResults();
    
})