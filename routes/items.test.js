process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");
let pickles = { name: "Pickles", price: 2.25 };


//////////////// Test setup and teardown
beforeEach(function() {
    items.push(pickles);
});

afterEach(function() {
    // make sure this *mutates*, not redefines, `items`
    items.length = 0;
});


//////////////// GET /items - returns `{items: [item, ...]}`

describe("GET /items", function() {
    test("Gets a list of items", async function() {
        const resp = await request(app).get(`/items`);

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [pickles]});
    });
});


//////////////// POST /items - create item from data; return item

describe("POST /items", function() {
    test("Creates a new item", async function() {
        const resp = await request(app)
            .post(`/items`)
            .send({name: "Cheddar Cheese", price: 1.99});

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: { name: "Cheddar Cheese", price: 1.99 }
        });
    });
});


//////////////// PATCH /items/[name] - update item; return `{item: item}`

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const resp = await request(app)
            .patch(`/items/${pickles.name}`)
            .send({name: "Gerkins"});

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: { name: "Gerkins" }
      });
    });
  
    test("Responds with 404 if name invalid", async function() {
        const resp = await request(app).patch(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});

//////////////// DELETE /items/[name] - delete item, return delete message

describe("DELETE /items/:name", function() {
    test("Deletes a single a item", async function() {
        const resp = await request(app).delete(`/items/${pickles.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});