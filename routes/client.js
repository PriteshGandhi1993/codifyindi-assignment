var express = require('express');
var router = express.Router();
const clientService = require('../service/client.service');
const utils = require('../util/utils');


router.post('/create', async function(req, res) {
   
    await clientService.createClient(req.body)
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Client added successfully.";
        console.log("result: ",result);
        utils.jsonWriter(message, 201, res);
    })
    .catch((error) => {
        console.log("error: ",error);
        utils.throwError(error.code, error.message, 500, null, res);
    }) ;
    
    
});

router.post('/update', async function(req, res) {
    await clientService.updateClient(req.body)
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Client updated successfully.";
        console.log("result: ",result);
        message.data = result;
        utils.jsonWriter(message, 201, res);
    })
    .catch((error) => {
        console.log("error: ",error);
        utils.throwError(error.code, error.message, 500, null, res);
    });
});

router.get('/getbyid/:id', async function(req, res) {
    console.log("id: ",req.params.id);
    await clientService.getClientById(req.params.id)
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Client got successfully.";
        console.log("result: ",result);
        message.data = result;
        utils.jsonWriter(message, 200, res);
    })
    .catch((error) => {
        console.log("error: ",error);
        utils.throwError(error.code, error.message, 500, null, res);
    });
});

router.delete("/delete/:id",  async function(req, res) {
    console.log("id: ",req.params.id);
    await clientService.deleteClient(req.params.id)
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Client deleted successfully.";
        console.log("result: ",result);
        message.data = result;
        utils.jsonWriter(message, 200, res);
    })
    .catch((error) => {
        console.log("error: ",error);
        utils.throwError(error.code, error.message, 500, null, res);
    });
});

router.get('/gettop', async function(req, res) {
    await clientService.getTopClients()
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Client got successfully.";
        console.log("result: ",result);
        message.data = result;
        utils.jsonWriter(message, 200, res);
    })
    .catch((error) => {
        console.log("error: ",error);
        utils.throwError(error.code, error.message, 500, null, res);
    });
});


module.exports = router;