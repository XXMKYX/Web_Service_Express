// npm install express

var express = require('express');
var app = express(); //Contenedor de Endpoints o WS Restful

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async function(request, response) {

  r = {
    'message': 'Nothing to send'
  };

  response.json(r);
});

/*Calling this service sending payload as parameters in URL: 
https://webservice.miguel-ange1319.repl.co/serv001?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv001", async function(req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  r = {
    'user_id': user_id,
    'token': token,
    'geo': geo
  };

  res.json(r);
});

// Call this service sending payload in body: raw - json
/*
{
    "id": "nope",
    "token": "ertydfg456Dfgwerty",
    "geo": "12345678,34567890"
}
*/
app.post("/serv002", async function(req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

  r = {
    'user_id': user_id,
    'token': token,
    'geo': geo
  };

  res.json(r);
});

/*
Call this service sending parameter as a part of the URL
https://webservice.miguel-ange1319.repl.co/serv003/:1234567
*/
app.post("/serv003/:info", async function(req, res) {
  const info = req.params.info;
  let r = { 'info': info };
  res.json(r);
});

app.listen(3000, function() {
  console.log('AplicaciÃ³n ejemplo, escuchando el puerto 3000!');
});

/* Calculadora Binaria 
https://webservice.miguel-ange1319.repl.co/serv004?numero1=1&numero2=0&operacion=suma
*/

app.get("/serv004", async function(req, res) {
  const numero1 = req.query.numero1;
  const numero2 = req.query.numero2;
  const operacion = req.query.operacion;
  let respuesta = "0";

  if (numero1 && numero2) {
    if (operacion === "suma") {
      respuesta = parseInt(numero1) + parseInt(numero2);
    } else if (operacion === "resta") {
      respuesta = parseInt(numero1) - parseInt(numero2);
    } else if (operacion === "multiplicacion") {
      respuesta = parseInt(numero1) * parseInt(numero2);
    } else if (operacion === "division") {
      respuesta = parseInt(numero1) / parseInt(numero2);
    }

    r = {
      "resultado": respuesta.toString(2)
    }
    res.status(200).json(r);
  }

  r = {
    'message': "Te faltan parametros por enviar"
  };

  res.status(400).json(r);
});

