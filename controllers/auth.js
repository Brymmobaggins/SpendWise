const mySql = require("mysql");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookieParser = require("cookie-parser")

const DB = mySql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});

exports.register = (req, res) => {
    console.log(req.body)
    // destructuring
    const { name, email, password, passwordConfirm } = req.body

    DB.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.render("register", {
                message: "email is already in use"
            })
        } else if (password != passwordConfirm) {
            return res.render("register", {
                message: "Password do not match"
            })
        }
        let hashedPassword = await bcrypt.hash(password, 8)
        console.log(hashedPassword)
        // res.send("successful")

        DB.query("INSERT INTO users SET ?", {
            name: name,
            email: email,
            password: hashedPassword

        }, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
                res.render("register", {
                    message: "User registered"
                })
            }

        })
    })

}