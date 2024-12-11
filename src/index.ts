import * as express from "express";
import * as cors from "cors";
import * as crypto from "crypto";
import { sequelize } from "./db/sequelize";
import { User } from "./db/users";
import { Auth } from "./db/auth";

// sequelize.sync({ force: true }).then(res => {
//   console.log(res);
// });

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log("Todo ok", port);
});
