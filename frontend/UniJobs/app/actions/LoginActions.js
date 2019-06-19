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
        onResponse(json.email, json.id, json.valid);
    }).catch((error) => {
        console.log(error.message);
        alert("Autentication API error!");
    });
};

async function getUserData (id, onResponse) {
    fetch(UniData.userDataApi(id), { method: 'GET' })
    .then((response) => response.json())
    .then((response) => onResponse(response))
    .catch((error) => {
        console.log(error.message);
        alert('User Data API error!');
    });
};

async function getUserPicture (id, onResponse) {
    onResponse(require('../assets/_test_categories/rectangle.png'));
}




module.exports = { tryLogin, getUserData, getUserPicture };