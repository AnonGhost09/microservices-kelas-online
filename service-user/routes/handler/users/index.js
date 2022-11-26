const register = require('./register');
const login = require('./login');
const update = require('./update');
const getUser = require('./getUser.js');
const getUsers = require('./getUsers.js');
const logout = require('./logout');

module.exports = {
    register,
    login,
    update,
    getUser,
    getUsers,
    logout
}