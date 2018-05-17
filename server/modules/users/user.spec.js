const expect = require("chai").expect;
const app = require("../../server");
const request = require("supertest")(app);

const TestSuite = require("../test-utils/test-suite");
const UsersFaker = require("./users.faker");

const { CustomUser, Role } = app.models;

describe("the user", () => {
  const testSuite = TestSuite(app);
  let seedsInstances;

  beforeEach(done => {
    testSuite
      .resetDB()
      .then(() => {
        return testSuite.seedDB([
          {
            model: CustomUser,
            count: 8,
            faker: UsersFaker()
          }
        ]);
      })
      .then(seeds => {
        seedsInstances = seeds[0];
        return Role.create([{ name: "ADMIN" }, { name: "APP_USER" }]);
      })
      .then(() => done())
      .catch(done);
  });

  describe("regarding the roles relation", () => {
    it("should be able to filter all users with the role ADMIN", done => {
      addRole(seedsInstances[0], "ADMIN")
        .then(() => CustomUser.find({ where: { roles: { name: "ADMIN" } } }))
        .then(users => {
          expect(users.length).to.equal(1);
          done();
        }).catch(done);
    });
  });

  function addRole(userInstance, name) {
    return Role.findOne({
      where: { name }
    }).then(role => {
      return role.principals.create({
        principalType: "USER",
        principalId: userInstance.id
      });
    });
  }
});
