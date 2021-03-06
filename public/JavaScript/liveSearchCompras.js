const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');

searchBar.addEventListener('change',  function(e) {
    e.preventDefault();
    let match = searchBar.value.match(/^[a-zA-Z0-9_.-]*$/);
    let matchTwo = searchBar.value.match(/\s*/);
    if (matchTwo[0] === searchBar.value) {
      searchResults.innerHTML = ''
      return
    }
    if (match[0] === searchBar.value){
        fetch('getOrder', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({payload: searchBar.value})
    }).then(res => res.json()).then(data => {
      let payload = data.payload
      searchResults.innerHTML = ''
      if(payload.length < 1) {
        searchResults.innerHTML = '<p>No hubo resultados</p>'
        return
      }
      
      payload.forEach((item) => {
        const newDiv = document.createElement('div')
        newDiv.className = 'col-6 my-3'
        const anchor = document.createElement('a')
        anchor.className = 'btn btn-dark'
        anchor.href = `/compras/show/${item._id}`
        anchor.innerText = item.serial === undefined ? `Compra_${item.serialNum}` : item.serial
        newDiv.appendChild(anchor)
        searchResults.appendChild(newDiv)
      })
    })
    }
})