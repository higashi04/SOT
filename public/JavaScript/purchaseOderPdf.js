const data = document.querySelector('#data');
const downloadBtn = document.querySelector('#downloadBtn');

downloadBtn.addEventListener('click', async() => {
    const doc = new jspdf('1', 'pt');
    console.log('lololololololol')
    await html2canvas(data).then((canvas) =>{
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 5, 5, 500, 500)
    })
    doc.save('orden.pdf')
})