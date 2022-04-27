const data = document.querySelector('#data');
const chofer = document.getElementById('name')
const downloadBtn = document.querySelector('#downloadBtn');
const img = document.getElementById('img')




const opt = {
    margin:       1,
    filename:     `gafete_${chofer.innerHTML}.pdf`,
    image:        { type: 'jpg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

downloadBtn.addEventListener('click', async() => {
    const pdfElement = document.createElement('div');
    pdfElement.appendChild(data.cloneNode(true))
    html2pdf().set(opt).from(pdfElement).save(`gafete_${chofer.innerHTML}.pdf`)
})