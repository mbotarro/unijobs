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
    .then((response) => {
        if (response.status == '201') 
            onResponse()
        else
            alert("Requests API error");
    })
    .catch((error) => {
        console.log(error.message);
        alert("Requests API error!");
    });
};



async function tryAddOffer (userid, title, categoryIndex, description, 
    minPrice, maxPrice, checkedEmail, checkedTelefone, date, info, onResponse) {

    const body = JSON.stringify({
        name: title,
        description: description,
        extrainfo: info,
        maxprice: maxPrice,
        minprice: minPrice,
        expiration: date,
        userid: userid,
        categoryid: categoryIndex,
        email: checkedEmail,
        telephone: checkedTelefone, 
    })
    
    fetch(UniData.offersApi,{
        method: 'POST',
        body: body,
    })
    .then((response) => {
        if (response.status == '201') 
            onResponse()
        else
            alert("Offers API error")
    })
    .catch((error) => {
        console.log(error.message);
        alert("Offers API error!");
    });
};

module.exports = { tryAddRequest, tryAddOffer };
