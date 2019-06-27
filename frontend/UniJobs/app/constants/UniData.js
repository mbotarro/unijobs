"use strict";

const USER_STORAGE_KEYS = {
    username: 'user.username',
    userid: 'user.userid',
};
//ec2-54-205-214-239.compute-1.amazonaws.com:8080
const AWS_SERVER = {
    serverUrl: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080',
    requestsApi: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/requests',
    offersApi: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/offers',

    autenticationApi: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/authenticate',
    allRequestsApi: (size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/requests?size=' + size),
    allOffersApi: (userid, size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/offers/users/' + userid + '?size=' + size),
    categoriesApi: 'http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/categories',

    userDataApi: (id) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/' + id),
    userRequestsApi: (id, size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/' + id +'/requests?size=' + size),
    userOffersApi: (id, size) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/users/' + id +'/offers?size=' + size),

    matchApi: (offerid, userid) => ('http://ec2-3-92-175-230.compute-1.amazonaws.com:8080/offers/' + offerid + '/users/' + userid),

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
