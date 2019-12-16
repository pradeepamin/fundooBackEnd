
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    hosts: ['http://127.0.0.1:9200/']
});


exports.createIndex = (req, callback) => {


    let index = req.decoded.payload.id
    console.log("INDEX_----------->", index);
    client.indices.exists({ index: index }, (err, data) => {
        if (data) {
            console.log("exitss-->");
            callback("user Exits")
        }
        else {
            client.indices.create({ 'index': index }, ((err, result, status) => {
                if (err) {
                    callback(err)
                    console.log("err-->", err);
                } else {
                    callback(null, result)
                    console.log("Result-->", result);
                }
            }))

        }
    })

}
//GetData from when we run getALLNote
exports.addDocument = (note) => {
    let array = [];
    console.log("data in addDoc file", note);
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
        console.log("elements in array ===========>\n", array);
    });
    client.bulk({ body: array }, (err, res) => {
        if (err) {
            console.log(err);

        }
        else {
            console.log("sucess", res);

        }
    })
}

exports.elasticSearch = (req, callback) => {



    console.log("search", req.body);

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

}

