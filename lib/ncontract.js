
/**
 * Module Dependencies
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , nc = {}

var ContractSchema = new Schema({
  _id: String, 
  id: String,
  port: Number, 
  title: String, 
  active: Boolean,
  groups: {type: Array, 'default': []}
});

mongoose.model('Contract', ContractSchema)

function activate(active, config, callback) {
  if (config.debug) console.log(config.app.name + (active ? ' - setup' : ' - shutdown'));

  var Contract = mongoose.model('Contract')
  var contract = config.contract;
  contract.active = active;
  var _id = config.contract._id;
  delete contract._id;

  Contract.update({_id: _id}, {$set: contract}, {upsert: true}, function(err) {
    contract._id = _id;
    if (err) {
      console.error(err)
      process.kill();
    }
    if (config.debug) console.log(config.app.name + (active ? ' started' : ' shutdown success'))
    callback();
  });

}

nc.Setup = function (config, callback) {
  activate(true, config, callback);
}

nc.Shutdown = function (config, callback) { 
  activate(false, config, callback);
}

module.exports = nc
