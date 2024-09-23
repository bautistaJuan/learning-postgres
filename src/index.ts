import * as express from "express";
// import { sequelize } from "./db";
import createUser from "./services/createUser";
import * as cors from "cors";
import deleteUser from "./services/deleteUser";
import getUsers from "./services/getUsers";
import getUser from "./services/getUser";

const app = express();
app.use(express.json());
app.use(cors());
// (async function () {
//   // sequelize.authenticate();
//   // await sequelize.sync({ alter: true });
// })();

app.get("/test", (req, res) => {
  console.log("Hello World!");
  res.send(req.body);
});

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    res.status(400).send("Error getting users");
  }
});

app.get("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUser(email);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Error getting user");
  }
});

app.post("/users", (req, res) => {
  const { name, lastName, birthDay, email } = req.body;
  try {
    if (!name || !lastName || !birthDay || !email) {
      throw new Error("Faltan datos");
    }
    createUser({ name, lastName, birthDay, email });
    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user");
  }
});

app.delete("/user/:email", async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  try {
    const result = await deleteUser(email);
    if (!result) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send("User deleted successfully");
  } catch (error) {
    return res.status(500).send("Error deleting user");
  }
});

app.patch("/user/:email", async (req, res) => {
  const updates = req.body;
  const { email } = req.params;

  if (!email || Object.keys(updates).length === 0) {
    return res.status(400).send("Datas are required");
  }

  try {
    const user = await getUser(email);
    if (!user) {
      return res.status(404).send("User not exist");
    }
    await user.update(updates);
    user.save();
    res.status(200).send("User updated successfully");
  } catch (error) {
    res.status(400).send("Error updating user");
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
