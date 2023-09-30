const express = require('express');
const bodyParser = require("body-parser");
const ShwarmaOrder = require("./assignment1Shwarma");
const PizzaOrder = require('./Pizza')
const WrapOrder = require('./Wrap')

// Create a new express application instance
const app = express();
const menuMsg = "What would you like to have:\n" + "Enter 1 for Shawarama \n" + "Enter 2 for Pizza\n" + "Enter 3 for Wrap\n";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let allOrders = []

app.get('/orders', (req, res) => {
    return res.status(200).json(allOrders)
})


let oOrders = {}; // id --> order
let welcomeState = {}

app.post("/sms", (req, res) => {
    let sFrom = req.body.From || req.body.from;
    let sMessage = req.body.Body || req.body.body;
    console.log("From : " + sFrom);
    console.log("Message : " + sMessage)
    let aReply = [];
    if (!welcomeState[sFrom]) {
        aReply = getWelcomeMsg()
        welcomeState[sFrom] = true
    } else {

        if (!oOrders.hasOwnProperty(sFrom)) {
            let choice = parseInt(sMessage)
            console.log("User is welcomed and is going to place order with msg" + choice)
            switch (choice) {
                case 1: {
                    console.log("Shwarma Order")
                    oOrders[sFrom] = new ShwarmaOrder();
                    break;
                }
                case 2: {
                    console.log("Pizza Order")
                    oOrders[sFrom] = new PizzaOrder();
                    break;
                }
                case 3: {
                    console.log("Pizza Order")
                    oOrders[sFrom] = new WrapOrder();
                    break;
                }
                default: {
                    aReply.push(`Incorrect selection ${choice}`)
                    aReply.push(menuMsg)
                }
            }// switch ends.....

        }// order if ends..........

    }// check order and welcome if-else ends....


    if (oOrders[sFrom]) {
        console.log("Preparing input")
        aReply = oOrders[sFrom].handleInput(sMessage)
    }

    console.log("Orders " + JSON.stringify(oOrders))
    console.log(" WelcomeState " + JSON.stringify(welcomeState))

    if (oOrders[sFrom] && oOrders[sFrom].isDone()) {
        console.log("Deleting Order.")
        aReply.push(`View Order => http://localhost:8080/${sFrom}`)
        allOrders.push({...oOrders[sFrom],'userId':sFrom})
        delete oOrders[sFrom];
    }
    res.setHeader('content-type', 'text/xml');
    let sResponse = "<Response>";
    for (let n = 0; n < aReply.length; n++) {
        sResponse += "<Message>";
        sResponse += aReply[n];
        sResponse += "</Message>";
    }
    res.end(sResponse + "</Response>");
});

function getWelcomeMsg() {
    let aResult = []
    aResult.push("Welcome to Grewal's Food Court.")
    aResult.push(menuMsg)
    return aResult;
}

app.get('/allOrders',(req,res)=>{
    return res.contentType('html').send(getAllOrders())
})

app.get('/:userId',(req,res)=>{
    let userId = req.params.userId
    console.log("UserId : " + userId)
    return res.contentType('html').send( generateUserReceipt(userId))
})




function getAllOrders(){
    var style = `<style>table {border-collapse: collapse;width: 80%;}
    th, td {text-align: left;padding: 8px;}
    tr:nth-child(even) {background-color: #D6EEEE;}</style>`

    var response = `<html><head><title>User Order</title> ${style} </head> <body> <table>` +
    `<tr> <th>UserId</th> <th>Item</th> <th>Size</th> <th>Toppings</th> <th>Drinks</th> </tr>`;

    allOrders.forEach(order => {
               response += `<tr> <td>${order.userId}</td> <td>${order.sItem}</td> <td>${order.sSize}</td> <td>${order.sToppings}</td> <td>${order.sDrinks}</td>  </tr>`
    })

    response += "</table></body></html>"
    return response;

}

function generateUserReceipt(userId){
    console.log("All orders : " + JSON.stringify(allOrders))
    var order = allOrders.find((d) => d.userId === userId)
    console.log("User order found : " + JSON.stringify(order))
    var style=`<style>p {color:blue;font-family:cursive;}</style>`
    var response = `<html><head><title>User Order</title>${style}</head> <body>` +
    `<h2>Order Details</h2> <p>UserId: ${order.userId}</p> <p>Item: ${order.sSize} ${order.sItem} </p> <p>Toppings: ${order.sToppings} </p> <p>Drinks: ${order.sDrinks} </p>  <p>Bill: $25</p>`+
    `</body></html>`
    return response;

}

var port = process.env.PORT || parseInt(process.argv.pop()) || 8080;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
