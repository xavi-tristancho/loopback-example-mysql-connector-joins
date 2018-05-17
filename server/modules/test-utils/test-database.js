const app = require("../../server");
const async = require("async");
const modelConfig = require("../../model-config.json");

const testDatabase = () => {
  const dbModels = Object.keys(modelConfig).filter(key => {
    return key != "_meta" && key != "User" && modelConfig[key].dataSource === "db";
  });

  return {
    reset
  };

  function reset() {
    return new Promise((resolve, reject) => {
      app.dataSources.db.automigrate(dbModels, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }
};

module.exports = testDatabase;
