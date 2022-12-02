const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
 let corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db =require("./models");

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

require("./routes/user.routes")(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`server listening on port:${PORT}`);
});