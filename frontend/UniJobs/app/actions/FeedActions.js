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
    fetch(UniData.allRequestsApi(10), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.requests))
    .catch((error) => {
        console.log("Load All Requests Error!");
        alert(error.message);
    });
};

async function loadMyRequests (id, onResponse) {
    fetch(UniData.userRequestsApi(id, 10), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.requests))
    .catch((error) => {
        console.log("Load All Requests Error!");
        alert(error.message);
    });
};

async function loadOffers (onResponse) {
    fetch(UniData.allOffersApi(10), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.offers))
    .catch((error) => {
        console.log("Load All Offers Error!");
        alert(error.message);
    });
};

async function loadMyOffers (id, onResponse) {
    fetch(UniData.userOffersApi(id, 10), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.offers))
    .catch((error) => {
        console.log("Load All Offers Error!");
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
        case 1 : return require('../assets/_test_categories/genetics.png');
        case 2 : return require('../assets/_test_categories/the-sum-of.png');
        case 2 : return require('../assets/_test_categories/piano.png');
        case 4 : return require('../assets/_test_categories/translate.png');
    }
    
    return require('../assets/_test_categories/rectangle.png');
};


module.exports = { loadRequests,loadOffers, loadCategories, loadMyRequests, loadMyOffers, loadUserInfo };