const express = require('express');
const moment = require('moment');

const contenedor = require ('./desafio2main.js')

//Instanciamos la app de express
const aplicacion = express();

//Colocamos el puerto de escucha
const puerto = '8080';

//Inicializamos el contador de las visitas
let visitas = 0;

//Definimos la ruta principal en donde mostraremos el mensaje
aplicacion.get('/productos', (peticion, respuesta) => {
    const listadoProductos = contenedor.getAll()
  respuesta.send({data: listadoProductos});
});



//Definimos la ruta para mostrar la fecha y la hora
aplicacion.get('/productoRandom', (peticion, respuesta) => {
    const random = Math.floor(Math.random() * 20)
    const productoRandom= contenedor.getProducto(random)
  respuesta.send({
    data: productoRandom
/* medir cuanto hay desde 0 hasta ultimo id, y generar un numero random entre esos numeros (verlo en clase 5)*/

  });
});

//Hacemos que el app escuche en el puerto determinado
const servidor = aplicacion.listen(puerto, () => {
  console.log(`Servidor Http escuchando en el puerto ${servidor.address().port}`);
});

//Definimos la escucha al evento para mostrar los errores
servidor.on('error', error => console.log(`Error en servidor ${error}`));