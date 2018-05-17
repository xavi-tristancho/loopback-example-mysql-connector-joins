const async = require("async");
const faker = require("faker");
const SessionManager = require("./user-session");
const TestDatabase = require("./test-database");

const testDatabase = TestDatabase();
const managedSession = SessionManager();

const testSuite = app => {
  return {
    resetDB,
    getSession,
    resetDBAndGetSession,
    seedDB
  };

  function resetDB() {
    return testDatabase.reset();
  }

  function getSession() {
    return managedSession.getSession();
  }

  function resetDBAndGetSession() {
    return resetDB().then(() => getSession());
  }

  function seedDB(settings) {
    return new Promise((resolve, reject) => {
      async.map(
        settings,
        (setting, next) => {
          seed(setting).then(seeds => {
            next(null, seeds);
          }).catch(next);
        },
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  function seed({ model, faker, count }) {
    return model.create(faker.getFakes(count));
  }
};

module.exports = testSuite;
