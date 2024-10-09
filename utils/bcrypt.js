const bcrypt = require("bcryptjs");

const generatVisitorPassword = (password) => bcrypt.hashSync(password, 10);

const comparePasswords = (password, cryptPassword) => {
    return bcrypt.compare(password, cryptPassword);
};

module.exports = { generatVisitorPassword, comparePasswords };