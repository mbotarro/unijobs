import UniData from '../constants/UniData'

// * output:
// email : same as input
// valid : autentication succeeded
// onResponse (email, valid) : callback on api answered
async function tryLogin (email, password, onResponse) {
    fetch(UniData.autenticationApi, {
    method: 'POST',
        body: JSON.stringify({
        email: email,
        password: password,
        }),
    })
    .then((response) => response.json())
    .then((json) => {
        onResponse(json.email, json.valid);
    }).catch((error) => {
        console.log("Autentication API error!");
        alert(error.message);
    });
};


module.exports = { tryLogin };