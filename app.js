// import express from module
const express = require("express")
const path = require("path")
const hbs = require("hbs")
// const pagesRouter = require('./routes/pages');

// import mySQL from module
const mySql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" })

// create express server
const app = express()

const DB = mySql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

// DB.connect((error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("MYSQL connected....")
//     }
// })
// Serve static files from the "dist" directory
const publicDirectory = path.join(__dirname, "./dist")
app.use(express.static(publicDirectory))


app.use(express.urlencoded({ extended: false }))

// parse JSON boides as sent to API clients
app.use(express.json())

// Set the view engine to hbs
app.set('view engine', 'hbs')


app.use("/", require("./routes/pages"));

app.use("/auth", require("./routes/auth"))

// app listen to server on port 5000
app.listen(5001, () => {
    console.log("Server started on port 5001")
})
