const data = document.querySelector('#data');
const downloadBtn = document.querySelector('#downloadBtn');
const date = document.querySelector('#currentDate');
const currentUser = document.querySelector('#currentUser');
const order = document.querySelector('#currentOrder');


const opt = {
    margin:       1,
    filename:     `${order.innerHTML}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2.5 },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

downloadBtn.addEventListener('click', async() => {
    const pdfElement = document.createElement('div');
    pdfElement.appendChild(data.cloneNode(true))
    html2pdf().set(opt).from(pdfElement).save(`${order.innerHTML}.pdf`)
})