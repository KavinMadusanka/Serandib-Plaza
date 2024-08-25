import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
<<<<<<< HEAD
<<<<<<< Updated upstream
=======

import AuthRoutes from './routes/AuthRoute.js'
import promotionRoutes from "./routes/promotionRoute.js"

>>>>>>> 3d60f5e73549bca8481a53c9dcb6dcab9dc0caa0
import categoryRoutes from './routes/categoryRoute.js'
=======
import AuthRoutes from './routes/AuthRoute.js'
import promotionRoutes from "./routes/promotionRoute.js"
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from  './routes/productRoute.js'

>>>>>>> Stashed changes


//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middelwares
app.use(express.json())
app.use(morgan('dev'))

//routes
<<<<<<< HEAD
<<<<<<< Updated upstream
=======

app.use("/api/v1/userauth",AuthRoutes)
app.use("/api/v1/promotions",promotionRoutes)


>>>>>>> 3d60f5e73549bca8481a53c9dcb6dcab9dc0caa0
app.use('/api/v1/category', categoryRoutes);
=======
app.use("/api/v1/userauth",AuthRoutes)
app.use("/api/v1/promotions",promotionRoutes)
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
>>>>>>> Stashed changes


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
