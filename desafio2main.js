/* Importado de Contenedor */

const Contenedor = require("./desafio2Contenedor")

let contenedor= new Contenedor("productos.txt")

let producto1 ={
    id:1,
    title:"Silla Gamer",
    price:60000,
    thumbnail:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/720/526/products/diseno-sin-titulo-5121-bd311cff4d158548d516372654110148-1024-1024.jpg"

}
let producto2 ={
    id:2,
    title:"Joystick PS5",
    price:25000,
    thumbnail:"https://images.fravega.com/f1000/a23c2e9cbe114eca833fc5f7288457fc.jpg"

}
let producto3 ={
    id: 3,
    title:"Auriculares PS5",
    price:4200,
    thumbnail:"https://arsonyb2c.vtexassets.com/arquivos/ids/348062/PS5_WHS_Pshot_A.jpg?v=637363806123470000"
}

const metodos = async () => {
   console.log( await contenedor.save(producto1))
   console.log( await contenedor.save(producto2))
  console.log( await contenedor.save(producto3))
 console.log(await contenedor.getAll())
console.log(await contenedor.deleteById()) 
}
 metodos()

 module.exports = contenedor