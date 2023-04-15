const express = require("express");
require("dotenv").config();
const colors = require("colors");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.listen(port, () =>
    console.log(`Server running on port: ${port}`.brightGreen)
);
