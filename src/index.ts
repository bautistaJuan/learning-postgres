import * as express from "express";
import * as cors from "cors";
import * as crypto from "crypto";
import { sequelize } from "./db/sequelize";
import { User } from "./db/users";
import { Auth } from "./db/auth";
import * as jwt from "jsonwebtoken";
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
  const { name, email, password, birthdate } = req.body;

  // User
  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      email,
      name,
      birthdate,
    },
  });

  // Auth
  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: user.getDataValue("id") },
    defaults: {
      email,
      password: getSHA256ofString(password),
      user_id: user.getDataValue("id"),
    },
  });
  console.log({ auth, authCreated });
  res.json(user);
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
  console.log({ user });

  res.json(user);
});

app.listen(port, () => {
  console.log("Todo ok", port);
});
