/********************************************************* 
 * @description : function to store data using redis cache
 * @overview    : Redis cache
*********************************************************/

const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('connected redis');
});

client.on('error', (err) => {
    console.log("Error " + err)
});
/**
 * Below three function used to store the token to verify
 **/

exports.setRedis = (val, callback) => {
    client.set(process.env.key, JSON.stringify(val), (err, result) => {
        if (result) {
            console.log("token set in cache", result);
            callback(null, result);

        } else {
            console.log("error in setting data");
            callback(err);
        }
    })
}

exports.getRedis = (callback) => {
    client.get(process.env.key, (err, data) => {
        if (data) {
            callback(null, data);
            // console.log("GET DATA-->");
        } else {
            callback(err);
            console.log("no data");

        }
    })
}
delRedis = () => {
    client.del(process.env.key, (err, data) => {
        if (data) {
            console.log("Data to delete", data);
        } else {
            console.log("no data");

        }
    })
}

/**
 * Below function used to get and set all the notes.
 **/

exports.setRedisNote = (valueCache, callback) => {
    client.set(process.env.key + valueCache.id, JSON.stringify(valueCache.result), (err, result) => {
        if (result) {
            callback(null, result);
            console.log("token set in cache", result);

        } else {
            callback(err);
            console.log("error in setting data");

        }
    })
}
exports.getRedisNote = (id, callback) => {
    client.get(process.env.key + id, (err, data) => {
        if (data) {
            callback(null, JSON.parse(data));
            console.log("Gets data from cache");
        } else {
            callback(err);
            console.log("No data found");
        }
    })
}
exports.delRedisNote = (id) => {
    client.del(process.env.key + id, (err, data) => {
        if (data)
            console.log("Cleared cache to add new data..!");
        else
            console.log("Error in deleting cache");
    })
}



