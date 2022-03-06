
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        //Referencia al objeto XMLHttpRequest
        const xhttp = new XMLHttpRequest();
        /*
        A nuestra referencia xhttp le pasamos un LLAMADO 'open' 
        donde: parametro1 = el método, 
        parametro2 = la url, 
        parametro3 = verificación si es asincrono o no, valor por defecto true */
        xhttp.open('GET', url_api, true);
        //Cuando el estado del objeto cambia, ejecutar la función:
        xhttp.onreadystatechange = (() =>  {
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

                (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error('Error ${url_api}'))
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
                
            }
        });
        //Envio de la solicitud.
        xhttp.send();
    });
}


module.exports = fetchData;