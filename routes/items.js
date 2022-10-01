const express = require("express");
const Item = require('../item');
const router = new express.Router();



////////////////////// GET /items : get list of all items
router.get("", function(req, res, next) {
    try {
        return res.json( {items: Item.findAll()} );
    } catch (err) { 
        return next(err)}
});

////////////////////// POST /items : post an item
router.post("/", function(req, res, next){
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({item: newItem});
    } catch (err){
        return next(err)
    }
});

////////////////////// GET /items/:name : get single item
router.get("/:name", function(req, res, next){
    try {
        let foundItem = Item.find(req.params.name)
        return res.json({item: foundItem});
    } catch (err){
        return next(err)
    }
});

////////////////////// PATCH /items/:name : edit an item
router.patch("/", function(req, res, next){
    try {
        let foundItem = Item.update(req.params.name, req.body);
        return res.json({item: newItem});
    } catch (err){
        return next(err)
    }
});

////////////////////// DELETE /items/:name : delete an item
router.delete("/:name", function(req, res, next) {
    try{
        Item.remove(req.params.name);
        return res.json({message: 'Deleted'});
    } catch (err){
        return next(err)
    }
});


module.exports = router;