const express = require('express');
const ExpressError = require('./expressError');
const itemRoutes = require("./routes/items");

const app = express();

app.use(express.json());

//  apply prefix /items to every route in routes
app.use("/items", itemRoutes);


////////////////////// Error Routes

app.use(function(req, res, next){
    const notFound = new ExpressError("Not Found", 404);
    return next(notFound)
});


app.use(function(err, req, res, next){
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error:{message, status}
    });
})

module.exports = app