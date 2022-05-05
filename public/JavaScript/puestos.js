const puesto = [
    'Recepcionista', 
    'Programador', 
    'Gerente de Operaciones', 
    'Gerente de Mantenimiento', 
    'Contador', 
    'Auxiliar Contable', 
    'Ejecutivo de Mantenimiento y Almacen',
    'Ejecutivo de Almacen y Diesel', 
    'Supervisor de Coordinadores', 
    'Auxiliar de Operaciones',
    'Supervisor de Mantenimiento',
    'Jefe de Mecánicos',
    'Analista de Procesos',
    'Ejecutivo de Compras',
]
let i = 0
const select = document.querySelector('#floatingPuesto');
function puestos() {
for (opt of puesto) {
const option = document.createElement('option')
option.value = puesto[i]
option.innerText = puesto[i]
select.appendChild(option)
i ++
}
}

puestos();