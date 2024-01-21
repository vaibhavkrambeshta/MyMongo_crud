var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'mern_crud_app_1',
    bearerOnly: true,
    serverUrl: 'http://13.60.20.87:8080/auth',
    realm: 'Demo-Realm',
    credentials: {
        secret: 'd56AejXPXK19nkEjFrXu5AGh88n9PaxW'
    }
    // realmPublicKey: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuX44i/pAgHouI5CmZNygu5TNzePxVsqgIkj2TvqxHf2NzVT4UjZKqquvk2tErWO5/Ku320fz8qCys8gKGSgrYtK5cfEj/ojelwJySymoNc2H0a8/zS5QcU6fZEu6eDVWBVYULxd4E//IFqe+X9oQSSaMrCDAwf7f17/jCVqGnSG6BtH13OQCO/Y3x0UutU0aZa41VPG6UH20q+lJCY/tb2fCQIuKJnSbgeSitUEvNIF0yuappRqzocYniGIV/7AJoqrc2AyIcb+agTcPjGxU7i5MeQL6pIfpkF5il/Ovfcwh6GiDCL50M4m1Qxf3c4BCgGAtJvYqwPoD/HUQu2dHQQIDAQAB"
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};