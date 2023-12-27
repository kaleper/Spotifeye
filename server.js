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


// Request
app.get("/authorize", (request, response) => {
    
    // Transform list of json in query parameters
    let authorizeQueryParameters = new URLSearchParams({
        response_type: "code",
        client_id: "d764ab4503c14f3392d2ffcfb9530fcf",
        // Permissions
        scope:"",
        // URI after granted/ denied access
        redirect_uri: "http://localhost:3000/callback"
    });

    // Send request for code, sending query parameters
    response.redirect("https://accounts.spotify.com/authorize?" + authorizeQueryParameters.toString());

});

// Response and token request 
app.get("/callback", (request, response) => {
    // Can implement state later. Will contain auth code when user grants access
    const code = request.query.code;

    

    
});

let listener = app.listen(3000, () => { console.log(
    "App listening on http://localhost:" + listener.address().port);
});
