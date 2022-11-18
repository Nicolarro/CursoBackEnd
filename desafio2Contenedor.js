const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.producto = [];
  }

  async save(producto) {
    try {
      if (fs.existsSync(this.archivo)) {
        let productos = await this.getAll();
        if (productos.length > 0) {
          let lastId = productos[productos.length - 1].id + 1;
          let newProduct = {
            id: lastId,
            ...producto,
          };

          productos.push(newProduct);
          await fs.promises.writeFile(
            this.archivo,
            JSON.stringify(productos, null, 2)
          );
          return lastId;
        } else {
          let lastId = 1;
          let newProduct = {
            id: lastId,
            ...producto,
          };
        }
        await fs.promises.writeFile(
          this.archivo,
          JSON.stringify([newProduct], null, 2)
        );
        return 1;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      if (fs.existsSync(this.archivo)) {
        let info = await fs.promises.readFile(this.archivo, "utf-8");
        let result = JSON.parse(info);
        return result;
      } else {
        return "No se encontro el archivo";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      let nuevoArray = [];
      console.log(`Borrando datos...`);
      await this.writeFile(this.archivo, nuevoArray);
    } catch (error) {
      console.log(`Ocurrio un error eliminando los datos: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      if (this.exists(this.archivo)) {
        const data = await this.readFile(this.archivo);
        if (data.some((item) => item.id === id)) {
          const data = await this.readFile(this.archivo);
          const datos = data.filter((item) => item.id !== id);
          this.writeFile(this.archivo, datos);
        } else {
          throw new Error(`No se encontro el producto con el id ${id}`);
        }
      }
    } catch (error) {
      console.log(
        `Ocurrio un error eliminando el producto con el id solicitado: ${error.message}`
      );
    }
  }
}

const ejecutarContenedor = async () => {
  let contenedor = new Contenedor("productos.txt")
  console.log(await contenedor.save())
};

ejecutarContenedor();

module.exports = Contenedor;
