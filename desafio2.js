const fs = require ("fs")

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
        this.productos = []
    }

  async save(producto) {
    try{
        if(fs.existsSync(this.archivo)) {

           let productos =  await fs.promises.readFile(this.archivo)
           if( productos.length>0){
            let lastiId = productos[productos.length-1].id + 1
            let newProduct={
                id: lastiId ,
               ...producto
              }
              console.log(newProduct)
              productos.push(newProduct);
              await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
              return lastiId;

        } 
        else
        {

            let lastiId=1
            let newProduct={
              id: lastiId,
             ...producto
            }
            productos.push(newProduct);
            await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
            return lastiId;
       }
       
    }else{
       let newProduct={
        id:1,
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail

        }
    catch (error) {
        console.log(error)
    }

    }

    getById(id) {

        if (id) {
            return 
        }
        else
        {

        }
    }

}

let contenedor = new Contenedor ("productos.txt")