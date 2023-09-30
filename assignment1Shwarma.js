const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    SIZE: Symbol("size"),
    TOPPINGS: Symbol("toppings"),
    DRINKS: Symbol("drinks")
});

const orderStateMsg = {
    "size": "What size would you like? \n" + "Enter 1 for Large \n" + "Enter 2 for Medium \n" + "Enter 3 for Small.",
    "toppings": "What toppings would you like?\n" + "Enter 1 for Hummus , couscous and french fries\n" + "Enter 2 for Yogurt, pita bread and baba ganoush \n"
        + "Enter 3 for Garlic Sauce, fattoush and grilled vegetables\n" + "Enter 4 for Pickled Vegetables, rice pilaf and tabbouleh\n" + "Enter 5 to Skip.",
    "drinks": "Would you like drinks with that?\n" + "Enter 1 for Coke\n" + "Enter 2 for Lime Soda\n" + "Enter 3 for Strawberry Shake\n"
        + "Enter 4 for Masala Tea\n" + "Enter 5 to Skip."
}

const orderStateValidateInput = {
    "size": true,
    "toppings": true,
    "drinks": true
}


module.exports = class ShwarmaOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = null;
        this.sToppings = null;
        this.sDrinks = null;
        this.sItem = "Shawarama";
    }
    handleInput(sInput) {
        let aReturn = [];

        try {
            switch (this.stateCur) {
                case OrderState.WELCOMING:
                    this.stateCur = OrderState.SIZE;
                    console.log(this.stateCur.description)
                    aReturn.push(orderStateMsg[this.stateCur.description])
                    console.log(`Welcoming ${aReturn}`)
                    break;
                case OrderState.SIZE:

                    var choice = parseInt(sInput)
                    switch (choice) {
                        case 1: { this.sSize = "Large"; break; }
                        case 2: { this.sSize = "Medium"; break; }
                        case 3: { this.sSize = "Small"; break; }
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
                        case 1: { this.sToppings = "Hummus , couscous and french fries"; break; }
                        case 2: { this.sToppings = "Yogurt, pita bread and baba ganoush"; break; }
                        case 3: { this.sToppings = "Garlic Sauce, fattoush and grilled vegetables"; break; }
                        case 4: { this.sToppings = "Pickled Vegetables, rice pilaf and tabbouleh"; break; }
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