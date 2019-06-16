var Data = require('./models/data');
var mongoose = require('mongoose');

var check = new Data();
check.name = 'rahul';
check.data = 'Hello World';

mongoose.connect("mongodb://localhost:27017/Notepad", { useNewUrlParser: true });

check.save();


mongoose.disconnect();