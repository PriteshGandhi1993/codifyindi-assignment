var express = require('express');
var router = express.Router();
const agencyService = require('../service/agency.service');
const utils = require('../util/utils');


router.post('/create', async function(req, res) {
   
    if(req.body.clients) {
        await agencyService.createAgencyWithClients(req.body)
        .then(result => {
            let message = utils.messageFactory();
            message.successMessage = "Agency and client added successfully.";
            console.log("result: ",result);
            utils.jsonWriter(message, 201, res);
        })
        .catch((error) => {
            console.log("error: ",error);
            utils.throwError(error.code, error.message, 500, null, res);
        });
    } else {
        await agencyService.createAgency(req.body)
        .then(result => {
            let message = utils.messageFactory();
            message.successMessage = "Agency added successfully.";
            console.log("result: ",result);
            utils.jsonWriter(message, 201, res);
        })
        .catch((error) => {
            console.log("error: ",error);
            utils.throwError(error.code, error.message, 500, null, res);
        });
    }
    
});

router.post('/update', async function(req, res) {
    await agencyService.updateAgency(req.body)
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Agency updated successfully.";
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
    await agencyService.getAgencyById(req.params.id)
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Agency got successfully.";
        console.log("result: ",result);
        message.data = result;
        utils.jsonWriter(message, 200, res);
    })
    .catch((error) => {
        console.log("error: ",error);
        utils.throwError(error.code, error.message, 500, null, res);
    });
});

router.get('/getbynumber/:phone', async function(req, res) {
    console.log("id: ",req.params.phone);
    await agencyService.getAgencyByNumber(req.params.phone)
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Agency got successfully.";
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
    await agencyService.deleteAgency(req.params.id)
    .then(result => {
        let message = utils.messageFactory();
        message.successMessage = "Agency deleted successfully.";
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