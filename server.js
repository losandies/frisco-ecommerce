const express = require("express");
require("dotenv").config();
const colors = require("colors");
const path = require("path");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

if (
    process.env.NODE_ENV === "production" ||
    process.env.NODE_ENV === "staging"
) {
    app.use(express.static("client/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/dist/index.html"));
    });
}

app.listen(port, () =>
    console.log(`Server running on port: ${port}`.brightGreen)
);
