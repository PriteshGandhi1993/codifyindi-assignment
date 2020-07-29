let mongoose = require('../util/connection');
let Schema = mongoose.Schema;

let clientSchema = new Schema({
    agencyId: {type: Schema.Types.ObjectId, ref: 'agency', required: true},
    name: {type: String, default: null, required: true},
    email: {type: String, default: null, required: true},
    phoneNumber: {type: String, default: null, required: true},
    totalBill: {type: Number, default: 0, required: true}
},
{
    toObject: { virtuals: true },
	toJSON: { virtuals: true }
});

//Transform
clientSchema.options.toJSON.transform = function (doc, ret) {
	// remove the _id of every document before returning the result
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
};

clientSchema.options.toObject.transform = function (doc, ret) {
	// remove the _id of every document before returning the result
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
};

let Client = mongoose.model('client', clientSchema);

let saveClient = function (clientData) {
    return new Promise(function (resolve,reject) {
        let client = {
            agencyId: clientData.agencyId,
            name: clientData.name,
            email: clientData.email,
            phoneNumber: clientData.phoneNumber,
            totalBill: clientData.totalBill
        };

        let clientObj = new Client(client);
        setTimeout(() => {
            clientObj.save( function (error) {
                if (error) {
                    error.code = 201;
                    reject(error);
                } else {
                    console.log("model result: ",clientObj);
                    resolve(clientObj);
                }
            }); 
        }, 5000);
               
    });
}

let updateClient = function (clientData) {
    return new Promise( function (resolve,reject) {
    
        Client.findByIdAndUpdate(clientData.id, clientData, function (error, docs) {
            if(error) {
                console.log("err: ",err);
                error.code = 202;
                reject(error);
            } else if(docs){
                console.log("docs: ",docs);
                resolve(clientData);
            } else {
                let error = new Error("Client Not found");
                error.code = 203;
                reject(error);
            }
        });
    });
}

let getClientById = function (clientId) {
    return new Promise( function (resolve, reject) {
        Client.findById(clientId, function (error, doc) {
            if(error) {
                error.code = 204;
                reject(error);
            } else if(doc){
                resolve(doc);
            } else {
                let error = new Error("Client not found");
                error.code = 205;
                reject(error);
            }
        });
    });
}

let deleteClient = function (clientId) {
    console.log("req in model: ",clientId);
    return new Promise( function (resolve, reject) {
        Client.deleteOne({"_id": clientId}, function (error, doc) {
            if(error) {
                console.log("error in model: ",error);
                error.code = 206;
                reject(error);
            } else if(doc.deleteCount > 0){
                console.log("result in model: ",doc);
                resolve(doc);
            } else {
                let error = new Error("Client Not found");
                error.code = 207;
                reject(error);
            }
        });
    });
}

let topClients = function () {
    return new Promise( function (resolve, reject) {
        Client.aggregate([
            { 
                "$group" : { 
                    '_id': null, 
                    "max": { "$max": "$totalBill" },
                    "doc": {
                        "$first": "$$ROOT"
                    }
                }
            }
        ], function( error, docs){
            if(error) {
                console.log("error in model: ",error);
                error.code = 208;
                reject(error);
            } else if(docs){
                console.log("result in model: ",docs);
                resolve(docs);
            } else {
                let error = new Error("Client Not found");
                error.code = 207;
                reject(error);
            }
        });
    });
}

exports.saveClient = saveClient;
exports.updateClient = updateClient;
exports.getClientById = getClientById;
exports.deleteClient = deleteClient;
exports.topClients = topClients;
