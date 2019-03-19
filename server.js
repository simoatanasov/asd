//Import the express and url modules
var express = require('express');

//The express module is a function. When it is executed it returns an app object
var app = express();

//Create a data structure that will be accessed using the web service
var data = {
    user1: {name: "Brian", age: 33, alive: true},
    user2: {name: "Carol", age: 29, alive: true},
    user3: {name: "Sue", age: 103, alive: false}
};

//Set up the application to handle GET requests sent to the user path
app.get('/users/*', handleGetRequest);//Subfolders
app.get('/users', handleGetRequest);

//Set up express to serve static files from the directory called 'public'
app.use(express.static('public'));

//Start the app listening on port 8080
app.listen(8080);

/* Define the function that will handle GET requests to our web service
    This method is only called if the user requests /users     */
function handleGetRequest(request, response){
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    //If path ends with 'users' we return all users
    if(pathEnd === 'users'){
        response.send(JSON.stringify(data));
    }

    //If the last part of the path is a valid user id, return data about that user
    else if(pathEnd in data){
        response.send(JSON.stringify(data[pathEnd]));
    }

    //The path is not recognized. Return an error message
    else
        response.send("{error: 'Path not recognized'}");
}

