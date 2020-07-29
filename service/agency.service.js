const agencyModel = require('../model/agency.model');
const clientModel = require('../model/client.model');

let createAgency = async function (agencyData) {
    if(agencyData) {
        return await agencyModel.saveAgency(agencyData);
    }
}

let updateAgency = async function (agencyData) {
    if(agencyData) {
        return await agencyModel.updateAgency(agencyData)
    }
}

let getAgencyById = async function (agencyId) {
    if(agencyId) {
        return await agencyModel.getAgencyById(agencyId);
    }
}

let getAgencyByNumber = async function (agencyPhoneNumber) {
    console.log("req in service: ",agencyPhoneNumber);
    if(agencyPhoneNumber) {
        return await agencyModel.getAgencyByNumber(agencyPhoneNumber);
    }
}

let deleteAgency = async function (agencyId) {
    console.log("req in service: ",agencyId);
    if(agencyId) {
        return await agencyModel.deleteAgency(agencyId);
    }
}

let createAgencyWithClients = async function (data) {
    let agency = await agencyModel.saveAgency(data.agency);
    console.log("agency: ",agency);
    return Promise.all(data.clients.map(async (element) => {
        if(!element.agencyId) {
            element.agencyId = agency.id;
        }
        let client = await clientModel.saveClient(element);
        console.log("inservice: ",client);
    }));
}

// let getPromiseArray = function(data) {
//     let promises = [];
//     await data.forEach(element => {
//         if(!element.agencyId) {
//             element.agencyId = agency.id;
//         }
//         promises.push(clientModel.createAgency(element));
//     });
// }
exports.createAgency = createAgency;
exports.updateAgency = updateAgency;
exports.getAgencyById = getAgencyById;
exports.getAgencyByNumber = getAgencyByNumber;
exports.deleteAgency = deleteAgency;
exports.createAgencyWithClients = createAgencyWithClients;