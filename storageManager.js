
var storage = require('node-localstorage').LocalStorage;
var localStorage = new storage(require('./config').localStoragePath);

module.exports = {
    setItem: function(key, value) {
        localStorage.setItem(key, value);
    },
    getItem: function(key) {
        return localStorage.getItem(key);
    },
    removeItem: function(key) {
        localStorage.removeItem(key);
    }
};
