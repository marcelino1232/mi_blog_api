
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

connection();

const app = express();

const puerto = 3900;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const rutas_article = require("./routers/ArticleRouter");

app.use("/api", rutas_article);

app.listen(puerto, () => {
  console.log("servidor");
});
