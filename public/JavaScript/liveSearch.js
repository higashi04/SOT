const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
const resultsDisplay = document.getElementById('searchResults');
searchBar.addEventListener('change',  function(e) {
    e.preventDefault();
    console.log(searchBar.value)
    let match = searchBar.value.match(/^[a-zA-Z ]*/);
    let matchTwo = searchBar.value.match(/\s*/);
    if (matchTwo[0] === searchBar.value) {
      searchResults.innerHTML = ''
      return
    }
    if (match[0] === searchBar.value){
        fetch(route, {
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
      
      payload.forEach((item, index) => {
        const newDiv = document.createElement('div')
        newDiv.className = 'col-6 my-3'
        const anchor = document.createElement('a')
        anchor.className = 'btn btn-dark'
        anchor.href = `${origin}/show/${item._id}`
        anchor.innerText = item.nombre || item.name
        newDiv.appendChild(anchor)
        searchResults.appendChild(newDiv)
      })
    })
    }
})