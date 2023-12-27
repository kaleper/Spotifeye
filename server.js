import express from "express";
const app = express();



// app.set("views)", "./views");

// Files to be displayed in public folder
app.use (express.static("public"));

// Index generated when requested
app.get("/", (request, response) => {
    response.render("index");
});

app.get("/authorize", (request, response) => {
    console.log("authorize");

});

let listener = app.listen(3000, () => { console.log(
    "App listening on http://localhost:" + listener.address().port);
});
