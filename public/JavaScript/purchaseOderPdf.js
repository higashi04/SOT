const data = document.querySelector('#data');
const downloadBtn = document.querySelector('#downloadBtn');
const date = document.querySelector('#currentDate');
const currentUser = document.querySelector('#currentUser');
const order = document.querySelector('#currentOrder');

downloadBtn.addEventListener('click', async() => {
    const doc = new jspdf('1', 'pt');
    await html2canvas(data).then((canvas) =>{
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 5, 65, 500, 500)
    })
    doc.text(35, 25, `Descargado el ${date.innerHTML} por ${currentUser.innerHTML}`)
    doc.text(35,55, order.innerHTML) 
    doc.save(`${order.innerHTML}.pdf`)
})