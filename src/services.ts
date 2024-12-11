import { Auth } from "./db/auth";
const colors = require("colors");

interface ProductInterface {
  name: string;
  description: string;
  category: string;
  price: string;
}

async function getAllProducts() {
  try {
    const productData = await Product.findAll(); // Para traer todos los productos
    const values = productData.map(product => {
      return product.dataValues; // Devuelve solamente los productos
    });
    console.log(colors.green("Product data:", values));

    return values;
  } catch (error) {
    throw new Error("Error getting products from db");
  }
}

async function createProduct({ name, price }: ProductInterface) {
  try {
    const newProduct = await Product.create({
      name: name,
      price: price,
    });
    console.log(
      colors.green("Product created successfully", newProduct.toJSON())
    );
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

export { getAllProducts, createProduct };
