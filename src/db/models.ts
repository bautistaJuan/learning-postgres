import { Product } from "./product";
import { User } from "./user";
import { Auth } from "./auth";

User.hasMany(Product);
Product.belongsTo(User);

export { Product, User, Auth };
