const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();
require("./connections/conn");

const cors = require("cors");
app.use(cors());

//routes
const user = require("./routes/user");
app.use("/api/v1",user);

const Books = require("./routes/book");
app.use("/api/v1",Books);

const Favourite = require("./routes/favourite");
app.use("/api/v1",Favourite);

const Cart = require("./routes/cart");
app.use("/api/v1",Cart);

const Order = require("./routes/order");
app.use("/api/v1",Order);

//get respond from server
/*
app.get("/", (req, res) => {
    res.send("Hello from backend side");
});*/



//creating port
app.listen(process.env.PORT, () =>{
    console.log(`Server Started at port ${process.env.PORT}`);
});
