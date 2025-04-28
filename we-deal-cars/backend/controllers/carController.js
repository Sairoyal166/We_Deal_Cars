const Car = require('../models/Car');

exports.addCar = async (req, res) => {
    const { model, price, image, details, user_id } = req.body;
    try {
        const carId = await Car.create(model, price, image, details, user_id);
        res.status(201).json({ message: 'Car added successfully', carId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCars = async (req, res) => {
    const { model, minPrice, maxPrice } = req.query;
    try {
        const cars = await Car.filter(model, minPrice, maxPrice);
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const success = await Car.deleteById(id);
        if (!success) return res.status(404).json({ error: 'Car not found' });
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.editCar = async (req, res) => {
    const { id } = req.params;
    const { model, price, image, details } = req.body;
    try {
        const success = await Car.updateById(id, model, price, image, details);
        if (!success) return res.status(404).json({ error: 'Car not found' });
        res.status(200).json({ message: 'Car updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCarsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const cars = await Car.getByUserId(userId);
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.getById(id);
        if (!car) return res.status(404).json({ error: 'Car not found' });
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
