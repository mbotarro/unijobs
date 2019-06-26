import UniData from '../constants/UniData'


async function searchRequests (text, categories, onResponse) {
    fetch(UniData.searchRequestApi(text.toLowerCase(), categories), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response.requests))
    .catch((error) => {
        console.log("Search Requests Api Error!");
        alert(error.message);
    });
};

async function searchOffers (text, categories, onResponse) {
    // fetch(UniData.searchRequestApi(text.toLowerCase(), categories), { method: 'GET' })
    // .then((response) => response.json())
    // .then((response) => onResponse(response.offers))
    // .catch((error) => {
    //     console.log("Search Offers Api Error!");
    //     alert(error.message);
    // });
};


module.exports = { searchRequests, searchOffers };