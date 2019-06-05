"use strict";

// assync storage keys
const USER_STORAGE_KEYS = {
    username: 'user.username',
    // password: 'user.password',
};

const AWS_SERVER = {
    serverUrl: 'http://ec2-54-205-214-239.compute-1.amazonaws.com:8080',

    autenticationApi: 'http://ec2-54-205-214-239.compute-1.amazonaws.com:8080/users/authenticate',
    allRequestsApi: 'http://ec2-54-205-214-239.compute-1.amazonaws.com:8080/requests?size=2',
    categoriesApi: 'http://ec2-54-205-214-239.compute-1.amazonaws.com:8080/categories',
    //'http://ec2-54-205-214-239.compute-1.amazonaws.com:8080/requests/size=2'
}

module.exports = {
    ...USER_STORAGE_KEYS,
    ...AWS_SERVER,
};
