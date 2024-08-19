import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";

//configure env
dotenv.config();

//rest object
const app = express();

// rest api
app.get("/" , (req,res) => {
    res.send({
        message: "Welcome to  Serandib Plaza",
    });
});

//Port
const PORT = process.env.PORT || 8088;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
