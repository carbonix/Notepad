var mongooose = require('mongoose');
var schema = mongooose.Schema;

var dataschema = new schema({
    name: {type: String, required:true},
    data: {type: String}
});

module.exports = mongooose.model('Data', dataschema);