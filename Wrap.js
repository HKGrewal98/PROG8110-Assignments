const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    BREAD: Symbol("bread"),
    TOPPINGS: Symbol("toppings"),
    DRINKS: Symbol("drinks")
});

const orderStateMsg = {
    "bread": "What bread would you like? \n" + "Enter 1 for Wheat Tortillas \n" + "Enter 2 for Lavash \n" + "Enter 3 for Pita.",
    "toppings": "What toppings would you like?\n" + "Enter 1 for Picklse, Broccoli and Cold sliced meat \n" + "Enter 2 for Green peppers, Black olives, Avocado and Spinach \n"
        + "Enter 3 for Grilled onions, Cheese, and Ranch \n" + "Enter 4 for Pico de gallo, Guacamole and Sauteed mushrooms \n" + "Enter 5 to Skip.",
    "drinks": "Would you like drinks with that?\n" + "Enter 1 for Coke\n" + "Enter 2 for Lime Soda\n" + "Enter 3 for Strawberry Shake\n"
        + "Enter 4 for Masala Tea\n" + "Enter 5 to Skip."
}

const orderStateValidateInput = {
    "bread": true,
    "toppings": true,
    "drinks": true
}


module.exports = class WrapOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = null;
        this.sToppings = null;
        this.sDrinks = null;
        this.sItem = "Wrap";
    }
    handleInput(sInput) {
        let aReturn = [];

        try {
            switch (this.stateCur) {
                case OrderState.WELCOMING:
                    this.stateCur = OrderState.BREAD;
                    console.log(this.stateCur.description)
                    aReturn.push(orderStateMsg[this.stateCur.description])
                    console.log(`Welcoming ${aReturn}`)
                    break;
                case OrderState.BREAD:

                    var choice = parseInt(sInput)
                    switch (choice) {
                        case 1: { this.sSize = "Wheat Tortillas"; break; }
                        case 2: { this.sSize = "Lavash"; break; }
                        case 3: { this.sSize = "Pita"; break; }
                        default: {
                            orderStateValidateInput[this.stateCur.description] = false
                            aReturn.push(`Invalid size input ${sInput}. Please enter correct value :(`)
                        }
                    } // switch ends.....

                    if (orderStateValidateInput[this.stateCur.description]) {
                        this.stateCur = OrderState.TOPPINGS;
                    }

                    aReturn.push(orderStateMsg[this.stateCur.description])
                    orderStateValidateInput[this.stateCur.description] = true
                    break;

                case OrderState.TOPPINGS:

                    var choice = parseInt(sInput)
                    switch (choice) {
                        case 1: { this.sToppings = "Picklse, Broccoli and Cold sliced meat"; break; }
                        case 2: { this.sToppings = "Green peppers, Black olives, Avocado and Spinach"; break; }
                        case 3: { this.sToppings = "Grilled onions, Cheese, and Ranch"; break; }
                        case 4: { this.sToppings = "Pico de gallo, Guacamole and Sauteed mushrooms"; break; }
                        case 5: { break; }
                        default: {
                            orderStateValidateInput[this.stateCur.description] = false
                            aReturn.push(`Invalid toppings input ${sInput}. Please enter correct value :(`)
                        }
                    } // switch ends.....

                    if (orderStateValidateInput[this.stateCur.description]) {
                        this.stateCur = OrderState.DRINKS;
                    }

                    aReturn.push(orderStateMsg[this.stateCur.description])
                    orderStateValidateInput[this.stateCur.description] = true
                    break;

                case OrderState.DRINKS:

                    var choice = parseInt(sInput)
                    switch (choice) {
                        case 1: { this.sDrinks = "Coke"; break; }
                        case 2: { this.sDrinks = "Lime Soda"; break; }
                        case 3: { this.sDrinks = "Strawberry Shake"; break; }
                        case 4: { this.sDrinks = "Masala Tea"; break; }
                        case 5: { break; }
                        default: {
                            orderStateValidateInput[this.stateCur.description] = false
                            aReturn.push(`Invalid drinks input ${sInput}. Please enter correct value :(`)
                        }
                    } // switch ends.....

                    if (orderStateValidateInput[this.stateCur.description]) {
                        this.isDone(true)
                        aReturn.push("Thank-you for your order :)")
                        aReturn.push(`${this.sSize} ${this.sItem} 
                        ${this.sToppings != null ? `with toppings ${this.sToppings}` : ""}`)
                        if (this.sDrinks) {
                            aReturn.push(`Drinks: ${this.sDrinks}`)
                        }
                        let d = new Date();
                        d.setMinutes(d.getMinutes() + 20);
                        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                    } else {
                        aReturn.push(orderStateMsg[this.stateCur.description])
                        orderStateValidateInput[this.stateCur.description] = true
                    }

                    break;
            }
        } catch (ex) {
            aReturn = []
            aReturn.push(`Invalid input ${sInput} :(`)
            aReturn.push(orderStateMsg[this.stateCur.description])
        }
        return aReturn;
    }


}