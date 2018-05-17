const app = require("../../server");
const UsersFaker = require("../users/users.faker");
const { User } = app.models;

const session = () => {
  const credentials = UsersFaker().getFakes(1)[0];
  return {
    getSession() {
      return User.create(credentials).then(() =>
        User.login(credentials)
      );
    },
    setEmail(email) {
      credentials.email = email;
    }
  };
};

module.exports = session;
