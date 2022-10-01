const express = require("express");
const Item = require('../item');
const router = new express.Router();



////////////////////// GET /items : get list of all items
router.get("", function(req, res) {
    try {
        return res.json( {items: Item.findAll()} );
    } catch (err) { 
        return next(err)}
});

////////////////////// POST /items : post an item
router.post("/", function(req, res){
    return
})

////////////////////// GET /items/:name : get single item


////////////////////// PATCH /items/:name : edit an item


////////////////////// DELETE /items/:name : delete an item
router.delete("/:id", function(req, res) {
    const idx = items.findIndex(item => item.id === +req.params.id);
    items.splice(idx, 1);
    return res.json({ message: "Deleted" });
});


module.exports = router;