//Implementación de una API con XMLHttpRequest

//Instalar la dependancia en desarrollo
// $ npm install xmlhttprequest --save
//Instanciando el request.
//Permite hacer peticiones a algun servidor en la nube

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; 
// Estableciendo API

let API = 'https://rickandmortyapi.com/api/character/';


function fetchData(url_api, callback) {
    //Referencia al objeto XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    /*
    A nuestra referencia xhttp le pasamos un LLAMADO 'open' 
    donde: parametro1 = el método, 
    parametro2 = la url, 
    parametro3 = verificación si es asincrono o no, valor por defecto true */
    xhttp.open('GET', url_api, true);
    //Cuando el estado del objeto cambia, ejecutar la función:
    xhttp.onreadystatechange = function (event) {
        /* Los estado que puede tener
        estado 0: inicializando
        estado 1: cargando
        estado2: ya se cargó
        estado 3: ya hay información
        estado 4: solicitud completa
        PD: recuerda estas trabajando con un API externa osea un servidor por lo que,
        depende del servidor cuanto demore en cada estado haces un pedido por datos
        (request) y solo es aplicar lógica
         */
        if(xhttp.readyState === 4) {
            /* 
            Verifica estado, aqui un resumen de los casos más comunes:

            Estado 1xx (100 - 199):
            Indica que la petición esta siendo procesada.
            Estado 2xx (200 - 299):
            Indica que la petición fue recibida, aceptada y procesada correctamente.
            Estado 3xx (300 - 399):
            Indica que hay que tomer acciones adicionales para completar la solicitud. 
            Pro lo general indican redirreccionamiento.
            Estado 4xx (400 - 499):
            Errores del lado del cliente. Indica que se hizo mal la solicitud de datos.
            Estado 5xx (500 - 599): 
            Errores del servidor. Indica que falló totalmente la ejecución.
            */
            if(xhttp.status === 200) {
                //Estandar de node con callback, primer parametro error, segundo el resultado
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error('Error' + url_api);
                return callback(error, null)
            }
        }
    }
    //Envio de la solicitud.
    xhttp.send();
}
//multiples peticiones a un API con Callbacks 
fetchData(API, function(error1, data1){
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function(error2, data2){
        if (error2) return console.error(error2);
        fetchData(data2.origin.url, function (error3, data3){
            if (error3) return console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
            

        });
    })
})