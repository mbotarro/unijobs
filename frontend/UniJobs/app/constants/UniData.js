"use strict";

// assync storage keys
const USER_STORAGE_KEYS = {
    username: 'user.username',
    userid: 'user.userid',
};

const AWS_SERVER = {
    serverUrl: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080',

    autenticationApi: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/authenticate',
    allRequestsApi: (size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/requests?size=' + size),
    categoriesApi: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/categories',

    userDataApi: (id) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/' + id),
    userRequestsApi: (id, size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/' + id +'/requests?size=' + size),

}

module.exports = {
    ...USER_STORAGE_KEYS,
    ...AWS_SERVER,
};
