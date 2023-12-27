import express from "express";
import { URLSearchParams } from "url";
const app = express();



// app.set("views)", "./views");

// Files to be displayed in public folder
app.use (express.static("public"));

// Index generated when requested
app.get("/", (request, response) => {
    response.render("index");
});

const redirect_uri = "http://localhost:3000/callback";
const client_id = "d764ab4503c14f3392d2ffcfb9530fcf"


// Request
app.get("/authorize", (request, response) => {
    
    // Transform list of json in query parameters
    let authorizeQueryParameters = new URLSearchParams({
        response_type: "code",
        client_id: client_id,
        // Permissions
        scope:"",
        // URI after granted/ denied access
        redirect_uri: redirect_uri
    });

    // Send request for code, sending query parameters
    response.redirect("https://accounts.spotify.com/authorize?" + authorizeQueryParameters.toString());

});

// Response and token request 
app.get("/callback", (request, response) => {
    // Can implement state later. Will contain auth code when user grants access
    const code = request.query.code;

    const bodyResponse = new URLSearchParams({
        code: code,
        // Does not redirect, serves only for validation 
        redirect_uri = redirect_uri
    })

    
});

let listener = app.listen(3000, () => { console.log(
    "App listening on http://localhost:" + listener.address().port);
});
