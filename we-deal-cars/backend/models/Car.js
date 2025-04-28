const db = require('../config/db');

class Car {
    constructor(id, model, price, image, details, user_id) {
        this.id = id;
        this.model = model;
        this.price = price;
        this.image = image;
        this.details = details;
        this.user_id = user_id;
    }

    // Create a new car
    static async create(model, price, image, details, user_id) {
        const sql = 'INSERT INTO cars (model, price, image, details, user_id) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [model, price, image, details, user_id]);
        return result.insertId; // Return the ID of the newly created car
    }

    // Get all cars
    static async getAll() {
        const sql = 'SELECT * FROM cars';
        const [rows] = await db.execute(sql);
        return rows;
    }

    // Get a car by ID
    static async getById(id) {
        const sql = 'SELECT * FROM cars WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    // Update a car by ID
    static async updateById(id, model, price, image, details) {
        const sql = 'UPDATE cars SET model = ?, price = ?, image = ?, details = ? WHERE id = ?';
        const [result] = await db.execute(sql, [model, price, image, details, id]);
        return result.affectedRows > 0; // Return true if car was updated
    }

    // Delete a car by ID
    static async deleteById(id) {
        const sql = 'DELETE FROM cars WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0; // Return true if car was deleted
    }

    // Filter cars by model, minPrice, and maxPrice
    static async filter(model, minPrice, maxPrice) {
        let sql = 'SELECT * FROM cars';
        const conditions = [];
        const values = [];

        if (model) {
            conditions.push('model LIKE ?');
            values.push(`%${model}%`);
        }
        if (minPrice) {
            conditions.push('price >= ?');
            values.push(minPrice);
        }
        if (maxPrice) {
            conditions.push('price <= ?');
            values.push(maxPrice);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        const [rows] = await db.execute(sql, values);
        return rows;
    }
    // Get all cars posted by a specific user
static async getByUserId(userId) {
    const sql = 'SELECT * FROM cars WHERE user_id = ?';
    const [rows] = await db.execute(sql, [userId]);
    return rows;
}

}

module.exports = Car;
