require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const fs = require("fs");
const cors = require("cors");
let app = express();
app.use(cors()); 

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

var bodyParser = require("body-parser");
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json()); 
var Request = require("request");
app.use(express.json());

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const categorieRouter = require("./routes/categorie");
app.use("/categorie", categorieRouter);

const sousCategRouter = require("./routes/sousCateg");
app.use("/sousCateg", sousCategRouter);

const produitRouter = require("./routes/produit");
app.use("/produit", produitRouter);



// cron.schedule("* 30 * * * *", function() {
//     Request.get('http://localhost:3000/cas/apiSync')
//     //console.log("ok");
// });

app.listen(3000, () => console.log("Server Started"));
