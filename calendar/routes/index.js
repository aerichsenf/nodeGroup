var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var AutoIncrement = require('mongoose-sequence');
var Schema = mongoose.Schema;

var eventDataSchema = new Schema({
    _id: Number,
    notes: {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
},  {id: false, collection: 'event-data'});
eventDataSchema.plugin(AutoIncrement);

var EventData = mongoose.model('EventData', eventDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET Edit db page. */
router.get('/index2', function(req, res, next) {
    res.render('index2');
});

router.get('/get-data', function(req, res, next) {
    EventData.find()
        .then(function(doc) {
            res.render('index2', {items: doc});
        });
});

router.post('/insert', function(req, res, next) {
    var item = {
        notes: req.body.notes,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    };

    var data = new EventData(item);
    data.save();

    res.redirect('/index2');
});

router.post('/update', function(req, res, next) {
    var id = req.body.id;

    EventData.findById(id, function(err, doc) {
        if (err) {
            console.error('error, no entry found');
        }
        doc.notes = req.body.notes;
        doc.start_date = req.body.start_date;
        doc.end_date = req.body.end_date;
        doc.save();
    })
    res.redirect('/index2');
});

router.get('/data', function(req, res){
    EventData.find({}, function(err, data){
        if (err) {
            console.error('this does not work');
        }
        //output response
        //data = json(data);
        res.send(data);
    });
});

router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    EventData.findByIdAndRemove(id).exec();
    res.redirect('/index2');
});

module.exports = router;