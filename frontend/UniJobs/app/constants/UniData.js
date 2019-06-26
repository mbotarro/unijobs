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
    allOffersApi: (size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/offers?size=' + size),
    categoriesApi: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/categories',

    userDataApi: (id) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/' + id),
    userRequestsApi: (id, size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/' + id +'/requests?size=' + size),
    userOffersApi: (id, size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/' + id +'/offers?size=' + size),

    searchRequestApi: (text, categories) => {
        if (categories.length == 0)
            return 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/requests?q=' + text
        
        var cats = categories[0]
        for (var i = 1; i < categories.length; i++)
            cats += ',' + categories[i]

        console.log('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/requests?q=' + text + '&cat=' + cats)
        
        return  'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/requests?q=' + text + '&cat=' + cats
    },
    
    searchOfferApi: (text, categories) => {
        if (categories.length == 0)
            return 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/offers?q=' + text
        
        var cats = categories[0]
        for (var i = 1; i < categories.length; i++)
            cats += ',' + categories[i]

        console.log('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/offers?q=' + text + '&cat=' + cats)
        
        return  'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/offers?q=' + text + '&cat=' + cats
    },
}

module.exports = {
    ...USER_STORAGE_KEYS,
    ...AWS_SERVER,
};
