const test = require("tape");
const router = require("./server/router");
const supertest = require("supertest");

// tests::
test("check status code is 200", (t) => {
  supertest(router)
    .get("/")
    .query({name:'a'})
    .expect(200)
    .expect("Content-Type", "application/json")
    .end((err, res) => {
      t.error(err);
      console.log(res.text);
      t.equal(res.text, '["Airplane","Amadeus","All the President\'s Men","Almost Famous","Avatar","Amelie","All About Eve","Alien","A Clockwork Orange","American Beauty","Annie Hall","Apocalypse Now"]');
      t.end();
    });
});
