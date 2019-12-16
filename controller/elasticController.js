const client = require('../helper/elasticSearch1')

exports.createIndex = (req, res) => {
    client.createIndex(req, (err, data) => {
        let response={};
        if (err) {
        
            response.sucess = false
                response.error = err
                res.status(500).send(response)
        } else {
            response.sucess = true
            response.data = data
            res.status(200).send(response)
           
        }
    })
}

exports.elasticSearch = (req, res) => {
  

        client.elasticSearch(req, (err, data) => {
            let response={};
            if (err) {
                response.sucess = false
                response.error = err
                res.status(500).send(response)
            }
            else {
                    response.sucess = true
                    response.data = data
                    res.status(200).send(response)
            
            }
        })
   
}

