const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/add', carController.addCar);
router.get('/', carController.getCars);
router.delete('/delete/:id', carController.deleteCar);
router.put('/edit/:id', carController.editCar);
router.get('/user/:userId', carController.getCarsByUser); 
router.get('/:id', carController.getCarById);

module.exports = router;
