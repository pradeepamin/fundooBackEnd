// const noteService = require('../services/elasticServices')
const cacheNote = require('../helper/redisCache')
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    hosts: ['http://127.0.0.1:9200/']
});


exports.createIndex = (req, res) => {

    cacheNote.getRedisNote(req.decoded.payload.id, (err, note) => {
        if (note)
            console.log("Gets all data from stored cache------->", note)


        let indexName = req.decoded.payload.id
        console.log("Index---->", indexName);
        client.indices.create({ index: indexName }, ((error, result) => {
            console.log("result from elastic result.index------->", result.index);
            let elasticIndex = result.index;

            let respo = this.addDocument(elasticIndex, note)
            console.log("REspo---->", respo);


            let response = {};
            if (result) {
                console.log("result in index elastic search-->", result);
                response.succes = result;
                res.status(200).send(response);
            } else {
                response.succes = err;
                res.status(500).send(response);
                console.log("error in index", error);
            }
        }))


    })
}

exports.addDocument = (index, note, res) => {
    console.log("Elastic index--------------->", index);
    console.log("All Notes*******************>", note);

    let data = [];
    note.forEach((element, key) => {
        data.push({
            index: {
                _index: index,
                _type: "notes"
            }
        })

        let noteData = {
            _id: element._id,
            title: element.title,
            description: element.description
        };
        data.push(noteData);
    })

    console.log("Arra data---->\n", data);

    client.bulk({ body: data }, (err, res) => {
        if (err) {
            console.log("err---->", err);
            return err;

        } else {
            console.log("data----------->", res);
            return data;
        }
    })
}

// exports.searchNote = (req, res) => {
//     console.log("in search", req.tokenData.id);

//         let body = {
//             query: {
//                 query_string: {
//                     query: `*${req.body.searchKey}*`,
//                     analyze_wildcard: true,
//                     fields: ["title", "description", "_id"]
//                 }
//             }
//         };
//         client.search({ index: req.tokenData.id, body: body, type: "notes" }, (err, res) => {
//             let
//             if (res) {
//                 res.status(200).send(res);
//             } else {
//                 res.status(500).send(error);
//             }
// })

// }



