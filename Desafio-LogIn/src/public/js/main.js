const socket = io();

const productsContainer = document.getElementById("products-table-body");
const createProductForm = document.getElementById("create-product-form");

socket.on("products", (products) => {
  const allProductsElements = products
    .map(
      (product) => `
        <tr>
            <td> ${product.title} </td>
            <td> ${product.description} </td>
            <td> ${product.price} </td>
            <td> ${product.code} </td>
            <td> ${product.stock} </td>
            <td> <img height="72px" width="72px" src=${product.thumbnail} /> </td>
        </tr>
    `
    )
    .join(" ");
  productsContainer.innerHTML = allProductsElements;
});

createProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(createProductForm);

  const product = {};

  for (const field of formData.entries()) {
    product[field[0]] = field[1];
  }

  console.log(product);

  // podemos enviar un producto al servidor, usando fetch haciendo un post a la ruta de la api

  const response = await fetch("/api/products", {
    body: JSON.stringify(product),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();
  console.log(responseJson);
});

socket.on("hello", (data) => console.log(data));
