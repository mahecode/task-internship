const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.get('/', (req , res)=>{
    User.find((err, docs)=>{
        res.render('index', { title: 'Task', users: docs });
      }); 
});

router.get('/batch', (req, res)=>{
    User.find({}).sort({'batch': 1}).exec((err, docs)=>{
        res.render('index', {title: 'Task', users: docs});
    })
});

router.get('/course', (req, res)=>{
    User.find({}).sort({'course': 1}).exec((err, docs)=>{
        res.render('index', {title: 'Task', users: docs});
    })
})

module.exports = router;