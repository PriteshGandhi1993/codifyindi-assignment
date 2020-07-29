let mongoose = require('../util/connection');
let Schema = mongoose.Schema;

let agencySchema = new Schema({
    name: {type: String, default: null, required: true},
    address1: {type: String, default: null, required: true},
    address2: {type: String, default: null},
    state: {type: String, default: null, required: true},
    city: {type: String, default: null, required: true},
    phoneNumber: {type: String, default: null, required: true, unique: true}
},
{
    toObject: { virtuals: true },
	toJSON: { virtuals: true }
});

//Transform
agencySchema.options.toJSON.transform = function (doc, ret) {
	// remove the _id of every document before returning the result
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
};

agencySchema.options.toObject.transform = function (doc, ret) {
	// remove the _id of every document before returning the result
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
};

let Agency = mongoose.model('agency', agencySchema);

let saveAgency = function (agencyData) {
    return new Promise(function (resolve,reject) {
        let agency = {
            name: agencyData.name,
            address1: agencyData.address1,
            address2: agencyData.address2,
            state: agencyData.state,
            city: agencyData.city,
            phoneNumber: agencyData.phoneNumber
        };

        let agencyObj = new Agency(agency);
        
        agencyObj.save( function (error) {
            if (error) {
                error.code = 101;
                reject(error);
            } else {
                console.log("model result: ",agencyObj);
                resolve(agencyObj);
            }
        });
    });
}

let updateAgency = function (agencyData) {
    return new Promise( function (resolve,reject) {
    
        Agency.findByIdAndUpdate(agencyData.id, agencyData, function (error, docs) {
            if(error) {
                console.log("err: ",err);
                error.code = 102;
                reject(error);
            } else if(docs) {
                console.log("docs: ",docs);
                resolve(agencyData);
            } else {
                let error = new Error("Agency not found");
                error.code = 103;
                reject(error);
            }
        });
    });
}

let getAgencyById = function (agencyId) {
    return new Promise( function (resolve, reject) {
        Agency.findById(agencyId, function (error, doc) {
            if(error) {
                error.code = 104;
                reject(error);
            } else if(doc) {
                resolve(doc);
            } else {
                let error = new Error("Agency not found");
                error.code = 105;
                reject(error);
            }
        });
    });
}

let getAgencyByNumber = function (agencyPhoneNumber) {
    console.log("req in model: ",agencyPhoneNumber);
    return new Promise( function (resolve, reject) {
        Agency.findOne({"phoneNumber": agencyPhoneNumber}, function (error, doc) {
            if(error) {
                console.log("error in model: ",error);
                error.code = 106;
                reject(error);
            } else if(doc){
                console.log("result in model: ",doc);
                resolve(doc);
            } else {
                let error = new Error("Agency not found");
                error.code = 107;
                reject(error);
            }
        });
    });
}

let deleteAgency = function (agencyId) {
    console.log("req in model: ",agencyId);
    return new Promise( function (resolve, reject) {
        Agency.deleteOne({"_id": agencyId}, function (error, doc) {
            if(error) {
                console.log("error in model: ",error);
                error.code = 108;
                reject(error);
            } else if(doc.deleteCount > 0){
                console.log("result in model: ",doc);
                resolve(doc);
            } else {
                let error = new Error("Agency not found");
                error.code = 109;
                reject(error);
            }
        });
    });
}

exports.saveAgency = saveAgency;
exports.updateAgency = updateAgency;
exports.getAgencyById = getAgencyById;
exports.getAgencyByNumber = getAgencyByNumber;
exports.deleteAgency = deleteAgency;
