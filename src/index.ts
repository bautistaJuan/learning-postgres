import * as express from "express";
import * as cors from "cors";
import { sequelize } from "./db/sequelize";
import { Product, User, Auth } from "./db/models";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

// sequelize.sync({ force: true }).then(res => {
//   console.log(res);
// });

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

const SECRET = "asd32asd32a111asddd33awd";

const getSHA256ofString = function (text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
};

// signup
app.post("/auth", async (req, res) => {
  const { name, email, password } = req.body;

  // User
  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      email,
      name,
    },
  });

  // Auth
  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email,
      password: getSHA256ofString(password),
      user_id: user.get("id"),
    },
  });
  console.log({ auth, authCreated });
  res.json({
    message: "Usuario creado",
    id: user.get("id"),
  });
});

// Signin
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const passwordHasheado = getSHA256ofString(password);

  const auth = await Auth.findOne({
    where: {
      email,
      password: passwordHasheado,
    },
  });

  const token = jwt.sign({ id: auth.getDataValue("user_id") }, SECRET);

  if (auth) {
    res.json({ token });
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
});
// Authorization
function authMidleware(req, res, next) {
  // el header siempre tiene que tener el authorization para poder autenticar aun usuario.
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data; // guardo la data en req._user para que esté disponible en la siguiente función a ejecutar.
    next();
  } catch (e) {
    return res.status(401).json({ error: "No autorizado" });
  }
}

app.get("/me", authMidleware, async (req, res) => {
  console.log(req._user.id); // La data del usuario que nos pasa el midleware anterior.
  const user = await User.findByPk(req._user.id);
  res.json(user);
});

app.post("/products", authMidleware, async (req, res) => {
  const product = await Product.create({
    ...req.body,
    userId: req._user.id,
  });
  res.json({
    message: "Producto creado",
    product,
  });
});
app.get("/me/products", authMidleware, async (req, res) => {
  const products = await Product.findAll({
    where: {
      userId: req._user.id,
    },
    include: [User],
  });
  res.json(products);
});

// app.get("/test", async (req, res) => {
// creamos un usuario y un producto
// const user = await User.create({
//   name: "Juan",
// });
// const product = await Product.create({
//   title: "Mate",
//   price: 600,
//   userId: "1028744333384810497" o  userId: user.get("id"),
// });

// Traemos todos los productos que pertenecen al usuario con id 1028744333384810497
//   const product = await Product.findAll({

//   });
//   res.json(pr    where: {
//       userId: "1028744333384810497" o  userId: user.get("id"),
//     },
//     include: [User],oduct);
// });

app.listen(port, () => {
  console.log("Todo ok", port);
});
