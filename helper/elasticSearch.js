
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    hosts: ['http://127.0.0.1:9200/']
});

exports.createIndex = (req) => {
    try {
        let index = req.decoded.payload.id
        client.indices.exists({ index: index }, (err, data) => {
            if (data) {
                console.log("This user Id already exits");
                // callback("This user Id already exits")
            }
            else {
                client.indices.create({ 'index': index }, ((err, result, status) => {
                    if (err) {
                        // callback(err)
                        console.log("err---", err);
                    } else {
                        // callback(null, result)
                        console.log("UserId added to elasticSearch---", result);
                    }
                }))

            }
        })
    } catch (e) {
        console.log(e);
    }

}
//GetData from when we run getALLNote
exports.addDocument = (note) => {
    try {
        let array = [];
        note.forEach(element => {
            console.log(element);
            array.push({
                index: {
                    _index: element._userId,
                    _type: "notes"
                }
            })
            let data = {
                "id": element._id,
                "title": element.title,
                "description": element.description,
                //"labels": element.labels
            }
            array.push(data);
            console.log("Data after merge------->", array);
        });
        client.bulk({ body: array }, (err, res) => {
            if (err) {
                console.log(err);

            }
            else {
                console.log("sucess", res);

            }
        })
    } catch (e) {
        console.log(e);
    }
}

exports.deleteDocument = (req) => {
    client.indices.delete({ index: req.decoded.payload.id }, (err, data) => {
        if (data) {
            console.log("Deleted doucument");
            this.createIndex(req)
        }
        else {
            console.log("No documents to delete")
        }
    })
}

exports.elasticSearch = (req, callback) => {
    try {
        let body = {
            query: {
                query_string: {
                    query: `*${req.body.search}*`,
                    analyze_wildcard: true,
                    fields: ["title", "description"]
                }
            }
        }
        client.search({ index: req.decoded.payload.id, body: body, type: 'notes' }, (err, data) => {
            if (err) {
                callback(err);

            } else {
                callback(null, data);
                console.log("data-->Sucess", data);

            }
        })
    } catch (e) {
        console.log(e);
    }
}

