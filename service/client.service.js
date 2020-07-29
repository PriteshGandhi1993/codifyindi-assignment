const clientModel = require('../model/client.model');
const agencyModel = require('../model/agency.model');

let createClient = async function (clientData) {
    if(clientData) {
        await agencyModel.getAgencyById(clientData.agencyId);
        return await clientModel.saveClient(clientData);
    }
}

let updateClient = async function (clientData) {
    if(clientData) {
        return await clientModel.updateClient(clientData)
    }
}

let getClientById = async function (clientId) {
    if(clientId) {
        return await clientModel.getClientById(clientId);
    }
}

let deleteClient = async function (clientId) {
    console.log("req in service: ",clientId);
    if(clientId) {
        return await clientModel.deleteClient(clientId);
    }
}

let getTopClients = async function () {
    let topClient =  await clientModel.topClients();
    console.log("topClient[0].doc.agencyId: ",topClient[0].doc.agencyId);
    let agency = await agencyModel.getAgencyById(topClient[0].doc.agencyId);
    return {
        "AgencyName": agency.name,
        "ClientName": topClient[0].doc.name,
        "TotalBill": topClient[0].doc.totalBill
    }
}

exports.createClient = createClient;
exports.updateClient = updateClient;
exports.getClientById = getClientById;
exports.deleteClient = deleteClient;
exports.getTopClients = getTopClients;