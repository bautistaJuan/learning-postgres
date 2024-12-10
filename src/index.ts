import * as express from "express";
import * as cors from "cors";
import { sequelize } from "./db";
import { User } from "./db/user";
import { Auth } from "./db/auth";
import { getUsers, createUser } from "./services";
const colors = require("colors");
import * as crypto from "crypto";

const app = express();
app.use(express.json());
app.use(cors());

// sequelize.sync({ alter: true }).then(res => {
//   console.log(res);
// });

function hashPassword(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}
app.post("/auth", async (req, res) => {
  const [user, created] = await User.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      email: req.body.email,
      name: req.body.name,
      birthdate: req.body.birthdate,
    },
  });

  const [auth, authCreated] = await Auth.findOrCreate({
    where: {
      id: user.get("id"),
    },
    defaults: {
      email: req.body.email,
      password: hashPassword(req.body.password),
      user_id: user.get("id"),
    },
  });

  console.log({ user, created });
  res.json(user);
});

// app.post("/users", async (req, res) => {
//   const { email, name } = req.body;
//   User.create({ email, name });
//   res.send("User created");
// });

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    res.status(400).send("Error getting users");
  }
});
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
