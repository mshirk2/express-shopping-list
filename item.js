const items = require('./fakeDb');

class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static findAll(){
        return items
    }

    static update(name, data){
        let foundItem = Item.find(name);
        if (foundItem === undefined) {
            throw {message: "Not Found", status: 404}
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }


}

module.exports = Item;