
/**
 * Dependencies
 */

var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ncontracts_test')
var ncontract = require(process.cwd() + "/lib/ncontract")

var config = {
  debug: true,
  app: {
    name: "Test application"
  },
  contract: {
    _id: 'dbsim',
    port: 65536,
    title: 'Simulation',
    groups: ['dbsim_base', 'dbsim_manager']
  }
}

describe('ncontract', function() {
  it('setup', function(done) {
    ncontract.Setup(config, function() {
      done();
    });  
  })
})

describe('ncontract', function() {
  it('shutdown', function(done) {
    ncontract.Shutdown(config, function() {
      done();
    });  
  })
})

