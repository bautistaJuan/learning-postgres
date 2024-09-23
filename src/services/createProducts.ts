import { Product } from "../db/product";
const colors = require("colors");

export interface ProductsInterface {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

export default async function createProduct({
  name,
  price,
  description,
  image,
  category,
  stock,
}: ProductsInterface) {
  //   await Product.drop(); // Elimina la base de datos.

  const newProduct = await Product.create({
    name: name,
    price: price,
    description: description,
    image: image,
    category: category,
    stock: stock,
  });

  console.log(colors.green("User created successfully", newProduct.toJSON()));

  const productsData = await Product.findAll(); // Para traer todos los usuarios

  const productsList = productsData.map(product => {
    return product.dataValues; // Devuelve solamente los productos. dentro de un objeto.
  });
  console.log(colors.yellow("All Products", productsList));
}
