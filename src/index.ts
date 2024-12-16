import * as express from "express";
import * as cors from "cors";
import { Comercio } from "./db/comercios";
import { sequelize } from "./db/sequelize";
import { clientWrite, clientSearch } from "./lib/algolia";
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// sequelize.sync({ force: true }).then(res => {
//   console.log(res);
// });
var indexName = "comercios";
app.post("/comercios", async (req, res) => {
  let newComercioData = req.body;
  const newComercio = await Comercio.create(newComercioData);
  const algoliaResponse = await clientWrite.saveObject({
    indexName,
    body: {
      objectID: newComercio.get("id"),
      nombre: newComercio.get("nombre"),
      _geoloc: {
        lat: newComercio.get("lat"),
        lng: newComercio.get("lng"),
      },
    },
  });

  console.log(algoliaResponse);
  res.json(newComercio);
});

app.get("/comercios", async (req, res) => {
  const allComercios = await Comercio.findAll();

  res.json(allComercios);
});
app.get("/comercios/:id", async (req, res) => {
  const id = req.params.id;
  const searchComercios = await Comercio.findByPk(id);
  res.json(searchComercios);
});

const bodyToRecord = (body, id?: number) => {
  const updateRecord = {} as any;

  if (body.nombre) {
    updateRecord.nombre = body.nombre;
  }
  if (body.rubro) {
    updateRecord.rubro = body.rubro;
  }
  if (body.lat && body.lng) {
    updateRecord._geoloc = {
      lat: body.lat,
      lng: body.lng,
    };
  }
  // if (id) {
  //   updateRecord.objectID = id;
  // }
  return updateRecord;
};

app.put("/comercios/:id", async (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  if (!id || !nombre) res.json({ message: "Update data to sends" });
  const updateComercios = await Comercio.update(req.body, {
    where: {
      id: id,
    },
  });
  const updateRecordAtributes = bodyToRecord(req.body, id);
  const algoliaResponse = await clientWrite.partialUpdateObject({
    indexName,
    objectID: id,
    attributesToUpdate: updateRecordAtributes,
  });
  console.log(algoliaResponse);
  res.json(updateComercios);
});

// app.get("/test", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// }); f

app.listen(port, () => {
  console.log("Todo ok", port);
});
