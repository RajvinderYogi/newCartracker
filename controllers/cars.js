const express = require('express');
const router = express.Router();
const Car = require('../models/car');
const  functions =require('../config/functions');

//GET: /cars
router.get('/', (req, res, next) => {
    //get car document from db
    Car.find((err,cars)=>{
    if (err){
        console.log(err);
    }
    else {
        res.render('cars/index', {
            title:"Car List",
            cars:cars,
            user: req.user
        });
    }
    });
});
//GET /cars/add
router.get('/add',functions.isLoggedIn, (req, res, next)=>{
   res.render('cars/add', {
      title:'Add a New Car',
       user: req.user
   });
});


//POST: /cars/add
router.post('/add', functions.isLoggedIn, (req, res, next)=>{
   //use car model to save thee car
   Car.create({
      make: req.body.make,
       model: req.body.model,
       year: req.body.year,
       color: req.body.color
   }, (err, car)=>{
       if (err){
           console.log(err);
       }
       else {
           res.redirect('/cars')
       }
   });
});

//GET: /Delete
router.get('/delete/:_id', functions.isLoggedIn, (req, res, next) =>{
   let _id= req.params._id;

   Car.remove({_id: _id}, (err) =>{
       if(err){
           console.log(err);
       }
       else {
           res.redirect('/cars');
       }
   });
});

//GET:  /cars/edit
router.get('/edit/:_id', functions.isLoggedIn, (req, res, next)=>{
    let _id= req.params._id;
    Car.findById(_id, (err, car)=>{
       if(err){
           console.log(err);
       }
       else{
           res.render('cars/edit', {
               title:'Edit Car',
               car: car,
               user: req.user
           });
       }
    });

});
//POST: /cars/edit
router.post('/edit/:_id', functions.isLoggedIn, (req, res, next)=>{
    let _id = req.params._id;

    Car.update({_id:_id},
        {$set:{
                 make: req.body.make,
                 model: req.body.model,
                 year: req.body.year,
                 color: req.body.color
        }}, null, (err)=>{
            if (err){
                console.log(err);
                }
                else {
                res.redirect('/cars')
                }
    });
});

//make public
module.exports = router;