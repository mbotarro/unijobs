import UniData from '../constants/UniData'

// * output:
// requests: list of requests
// last: hash for next page of requests

// * request:
// id
// name
// description
// extrainfo
// maxprice
// minprice
// userid
// categoryid
// timestamp
async function loadRequests (onResponse) {
    fetch(UniData.allRequestsApi(50), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.requests))
    .catch((error) => {
        console.log("Load All Requests Error!");
        alert(error.message);
    });
};

async function loadMyRequests (id, onResponse) {
    fetch(UniData.userRequestsApi(id, 50), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.requests))
    .catch((error) => {
        console.log("Load User Requests Error!");
        alert(error.message);
    });
};

async function loadOffers (onResponse) {
    fetch(UniData.allOffersApi(50), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.offers))
    .catch((error) => {
        console.log("Load All Offers Error!");
        alert(error.message);
    });
};

async function loadMyOffers (id, onResponse) {
    fetch(UniData.userOffersApi(id, 50), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.offers))
    .catch((error) => {
        console.log("Load User Offers Error!");
        alert(error.message);
    });
};

async function loadCategories (onResponse) {
    fetch(UniData.categoriesApi, { method: 'GET' })
    .then((response) => response.json())
    .then((response) => {
        for (var i = 0; i < response.length; i++)
            response[i].image = getCategoryImage(response[i].id)
        onResponse(response)
    })
    .catch((error) => {
        console.log(error.message);
        alert(error.message);
    });
}

async function loadUserInfo(id, onResponse) {
    fetch(UniData.userDataApi(id), {method: 'GET'})
    .then((response) => response.json())
    .then((response) => onResponse(response))
    .catch((error) => {
        console.log("Error while getting user info");
        alert(error.message)
    })
}


function getCategoryImage(id) {
    switch (id) {
        case 1 : return require('../assets/_test_categories/cat_1.png');
        case 2 : return require('../assets/_test_categories/cat_2.png');
        case 2 : return require('../assets/_test_categories/cat_3.png');
        case 4 : return require('../assets/_test_categories/cat_4.png');
        case 5 : return require('../assets/_test_categories/cat_5.png');
        case 6 : return require('../assets/_test_categories/cat_6.png');
        case 7 : return require('../assets/_test_categories/cat_7.png');
        case 8 : return require('../assets/_test_categories/cat_8.png');
        case 9 : return require('../assets/_test_categories/cat_9.png');
        case 10 : return require('../assets/_test_categories/cat_10.png');
        case 11 : return require('../assets/_test_categories/cat_11.png');
        case 12 : return require('../assets/_test_categories/cat_12.png');
    }
    
    return require('../assets/_test_categories/rectangle.png');
};


module.exports = { loadRequests,loadOffers, loadCategories, loadMyRequests, loadMyOffers, loadUserInfo };