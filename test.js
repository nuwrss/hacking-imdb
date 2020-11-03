const test = require("tape");
const router = require("./server/router");
const supertest = require("supertest");

// tests::
test("check status code is 200", (t) => {
  supertest(router)
    .get("/")
    .send("h")
    .expect(200)
    .expect("Content-Type", "application/json")
    .end((err, res) => {
      t.error(err);
      console.log(res.text);
      t.equal(res.text, '["hala","hello","hola"]');
      t.end();
    });
});
