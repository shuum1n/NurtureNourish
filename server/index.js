if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const options = {}

if (process.env.NODE_ENV === "test") {
  options.dbName = "jest_test"
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = 3000
const router = require("./routes")
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_CONNECTION_STRING, options)
mongoose.connection
  .once("open", function () {
    console.log("Database connected Successfully")
  })
  .on("error", function (err) {
    console.log("Error", err)
  })

app.get("/", (req, res) => res.send("server is running"))
app.use(router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
