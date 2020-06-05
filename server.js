const express = require("express");
const cors = require("cors");


const app = express();

var corsOptions = {
    origin: ["http://localhost:4200", "https://localhost:4000"]
};
app.use(cors(corsOptions));


app.listen(8000, () => {
    console.log("Server is started and listening.")
});

app.get("/", function(request, response) {
    response.send("Hello, Node!");
});

require("./articles.js")(app);