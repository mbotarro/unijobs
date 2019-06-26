import UniData from '../constants/UniData';

async function tryAddRequest (userid, title, categoryIndex, description, minPrice, maxPrice, onResponse) {

    const body = JSON.stringify({
        name: title,
        description: description,
        extrainfo: "",
        maxprice: maxPrice,
        minprice: minPrice,
        userid: userid,
        categoryid: categoryIndex,
    });
    
    fetch(UniData.requestsApi,{
        method: 'POST',
        body: body,
    })
    .then((json) => {onResponse(); console.log(json)})
    .catch((error) => {
        console.log(error.message);
        alert("Request API error!");
    });
};



async function tryAddOffer (title, categoryIndex, description,  minPrice, maxPrice, checkedEmail, checkedTelefone, date, info) {
    
    fetch(UniData.allRequestsApi(1),{
    method: 'POST',
        body: JSON.stringify({
            name: title,
            description: description,
            extrainfo: info,
            maxprice: maxPrice,
            minprice: minPrice,
            expiration: date,
            userid: UniData.userid,
            categoryid: categoryIndex,
            email: checkedEmail,
            telephone: checkedTelefone, 
        }),
    })
    .then((response) => response.json())
    //.then((json) => {onResponse(json.teste);})
    .catch((error) => {
        console.log(error.message);
        alert("Request API error!");
    });
};

module.exports = { tryAddRequest, tryAddOffer };
