const searchBar = document.getElementById('searchBar')

// function search(e) {
//     fetch('getInv', {
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({payload: e.value})
//     })
//   }
  

//by passing this as a parameter, I'm referring to the element itself
searchBar.addEventListener('keyup',  function search (e) {
    fetch('getInv', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({payload: e.value})
    })
  })

