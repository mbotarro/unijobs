import UniData from '../constants/UniData'

// * output:
// requests: list of requests
// last: hash for next page of requests

// * request:
// ID
// Name
// Description
// ExtraInfo
// MaxPrice
// MinPrice
// Userid
// Categoryid
// Timestamp
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

async function loadCategories (onResponse) {
    fetch(UniData.categoriesApi, { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response))
    .catch((error) => {
        console.log(error.message);
        alert(error.message);
    });
}


module.exports = { loadRequests, loadCategories, loadMyRequests };