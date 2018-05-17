const faker = require("faker");

function UsersFaker(propertiesOverrides) {
  function getUser() {
    return Object.assign({}, {
      name: faker.name.findName(),
      username: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: "123456"
    }, propertiesOverrides);
  }

  function getFakes(count) {
    const users = [];
    count = count || 10;

    for (let i = 0; i < count; i++) {
      users.push(getUser());
    }

    return users;
  }

  return {
    getFakes
  };
}

module.exports = UsersFaker;
