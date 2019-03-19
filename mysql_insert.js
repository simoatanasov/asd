//Import the mysql module
var mysql = require('mysql');
var regacc = document.getElementById("reguname").nodeValue;
var regpw = document.getElementById("regpsw").nodeValue;

//Create a connection object with the user details
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mywebsite"
});

//Connect to the database
con.connect(
    //This function is called when the connection is attempted
    function(err) {
        if (err) throw err;//Check for errors

        //Output results
        console.log("Connected!");
    }
);

//Call function that inserts some data into the database
addData();

//Function that adds test data to database
function addData(){
    //Build SQL query

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

    };

    var sql = "INSERT INTO user (UserName, Password) " +
        "VALUES (" + regacc + "," + regpw + ")";

    //Execute the query
    con.query(sql, function (err, result) {

        //Check for errors
        if (err) throw err;

        //Output results
        console.log(result.affectedRows + ' rows updated. ID is ' + result.insertId);
    });
}

//Close the connection
con.end();


