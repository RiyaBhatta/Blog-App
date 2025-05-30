const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require("dotenv")
const connectDB = require("./config/db.js")

dotenv.config()

const userRoutes = require('./routes/userRoutes.js')
const blogRoutes = require('./routes/blogRoutes.js')

const PORT = process.env.PORT || 8081

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes)

app.listen(PORT, () => {
    console.log("Server running".bgCyan.white);
})

