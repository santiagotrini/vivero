// un script para poner un reloj en la navbar
// puede servirles para la olimpiada

let date = new Date().toLocaleTimeString();
setInterval(() => {
  document.getElementById('clock').innerHTML = date;
  date = new Date().toLocaleTimeString();
}, 1000)
