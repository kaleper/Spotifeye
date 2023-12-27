import express from "express";
import { URLSearchParams } from "url";
// Requires to be loaded into environment variable
import dotenv from 'dotenv';
import fetch from 'node-fetch';
// Module in express that works with file and directory paths
import path from 'path';

// Gets URL of module, converts to file path, and extracts directory name.
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();

dotenv.config();

// Set the views directory and view engine. Joining ensures view directory is correctly identified regardless of current working directory
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Files to be displayed in public folder`
app.use (express.static("public"));

// Index generated when requested
app.get("/", (request, response) => {
    response.render("index");
});

const redirect_uri = "http://localhost:3000/callback";
const client_id = "d764ab4503c14f3392d2ffcfb9530fcf";
// Set up environment variable, use node package dotenv
const client_secret = process.env.CLIENT_SECRET;



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
 app.get("/callback", async (request, response) => {
    // Can implement state later. Will contain auth code when user grants access
    const code = request.query.code;

    const bodyResponse = new URLSearchParams({
        code: code,
        // Does not redirect, serves only for validation per spotify docs
        redirect_uri: redirect_uri,
        // Required field per spotify docs
        grant_type: "authorization_code"
    })

    //Node fetch to send POST request to spotify server 
    const newResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "post",
        body: bodyResponse,
        // Required headers per spotify docs 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Buffer, client ID and client secret key make up a base 64 encoded string
            Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
        }
    });

    // Converts data received to json and stores in data
    const data = await newResponse.json();

    // Saves access token
    const access_token = data.access_token;

    response.render("dashboard");

    
});

let listener = app.listen(3000, () => { console.log(
    "App listening on http://localhost:" + listener.address().port);
});
