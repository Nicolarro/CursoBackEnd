import { Router } from "express";
import { ProductManager } from "../../Managers/productManager.js";

export const productos = new ProductManager("./products.json");

const router = Router();

/* router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;

    const products = await ProductManager.getProducts();
    if (!limit || limit < 1 || limit > products.length) {
      return res.send({ sucess: true, products: products });
    } else {
      const productFiltered = products.slice(0, limit);
      return res.send({ sucess: true, products: productFiltered });
    }
  } catch {
    res.send({ success: false, error: "Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id: paramId } = req.params;
    const id = Number(paramId);

    if (id < 0 ){
      return res.send ({ success: false, error: "Ingrese un id valido" })
    }

    const productsById = await ProductManager.getProductById(id);

    if (!productsById) {
      return res.send({
        success: false,
        error: "No se encontro el producto",
      });
    } else {
      res.send({ success: true, productsById: productsById });
    }
  } catch (error) {
    res.send({ success: false, error: "Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return res.send({ success: false, error: "El campo es obligatorio" });
    } else {
      const productAdded = await ProductManager.addProduct({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
      res.send({ success: true, productAdded: productAdded });
    }
  } catch (error) {
    console.log(error)
    throw new Error(error)
    res.send();
  }
});

router.put(
  "/:id",
 async (req, res) => {
    try {
      const { id } = req.params;

      if (!id || id < 0) {
        res.send({ success: false, error: "Id is not valid" });
      } else {
        const productToUpdate = req.body;
        const product = await ProductManager.getProductById(parseInt(id));
        if (!product) {
          return res.status(404).send("Product not found")
        }
        else {
          updateProduct = await ProductManager.updateProduct({id, newData: {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
          }});
          res.send({ success: true, updateProduct: updateProduct });
        }
      }
    } catch (error) {
      throw new Error();
    }
  }
);

        router.put('/:pid', async (req, res) => {
          const id = parselnt(req.params.pid)
          const productToUpdate = req.body
          const product = await fileManager.getByID(id)
          if (!product) return res.status(404).send('Product not found')
          for (const key of Object.keys(productToUpdate)) {
            product[key] = productToUpdate[key]}

            await fileManager.update(id, product)
            res.json({ status: "success", product})
          } )
         */


/*  */

/* TODO OK */
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;

    const products = await productos.getProducts();
    if (!limit || limit < 1 || products.length < limit) {
      return res.send({ sucess: true, products: products });
    } else {
      const productFiltered = products.slice(0, limit);
      res.send({ sucess: true, products: productFiltered });
    }
  } catch (error) {
    console.log(error)
    res.send({ success: false, error: "Error" });
  }
});
/* TODO OK */
router.get("/:id", async (req, res) => {
  try {
    const { id: paramId } = req.params;
    const id = Number(paramId);

    if (Number.isNaN(id) || id < 0) {
      return res.send({ success: false, error: "El id no es valido" })
    }

    const productsById = await productos.getProductById(id);

    if (!productsById) {
      return res.send({
        success: false,
        error: "No se encontro el producto",
      });
    } else {
      res.send({ success: true, productsById: productsById });
    }
  } catch (error) {
    console.log(error)
    res.send({ success: false, error: "Error" });
  }
});

/* TODO OK */
router.post("/",
  async (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.send({ success: false, error: "El campo es obligatorio" });
      } else {
        const productAdded = await productos.addProduct({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        });
        return res.send({ success: true, productAdded: productAdded });
      }
    } catch (error) {
      console.log(error)
      return res.send({ success: false, message: "Ha ocurrido un error" })
    }
  });

/* REVISAR */
router.put("/:id",
  async (req, res) => {
    try {
      const { id: paramId } = req.params;
      const id = Number(paramId);

      if (Number.isNaN(id) || id < 0) {
        res.send({ success: false, error: "Id is not valid" });
      } else {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const updateProduct = await productos.updateProduct(id, {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        });
        res.send({ success: true, updateProduct: updateProduct });
      }
    } catch (error) {
      console.log(error)
      return res.send({ success: false, message: "Ha ocurrido un error" })
    }
  });

/* TODO OK */
router.delete('/:id', async (req, res) => {
  try {
    const { id: paramId } = req.params
    const id = Number(paramId)

    if (Number.isNaN(id) || id < 0) {
      return res.send({ success: false, error: "Id invalido" })
    }
    else {
      const productoBorrado = await productos.deleteProduct(id)
      console.log(productoBorrado)
      return res.send({ success: true, productoBorrado: productoBorrado })
    }

  }
  catch (error) {
    return res.send({ success: false, error: error })
  }




}
)


export default router;
