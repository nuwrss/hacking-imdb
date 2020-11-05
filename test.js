const test = require("tape");
const router = require("./server/router");
const supertest = require("supertest");

// tests:
test("name = f  status code is 200", (t) => {
  supertest(router)
    .get("/search?name=f")
    .expect(200)
    .expect("Content-Type", "application/json")
    .end((err, res) => {
      t.error(err);
      console.log(res.text);
      t.equal(res.text, '["Fight Club","Ferris Bueller\'s Day Off","Fargo","Forrest Gump"]');
      t.end();
    });
});


test("name =   status code is 200", (t) => {
  supertest(router)
    .get("/search?name=     ")
    .expect(200)
    .expect("Content-Type", "application/json")
    .end((err, res) => {
      t.error(err);
      console.log(res.text);
      t.equal(res.text, '[]');
      t.end();
    });
});

test("check /hello status code is 404", (t) => {
  supertest(router)
    .get("/hello")
    .expect(404)
    .expect("Content-Type", "text/html")
    .end((err, res) => {
      t.error(err);
      console.log(res.text);
      t.equal(res.text, '<h1>Not found!</h1>');
      t.end();
    });
});
