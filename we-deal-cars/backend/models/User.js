const db = require('../config/db');

class User {
    constructor(id, name, email, password, mobile, address, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.address = address;
        this.role = role;
    }

    // Create a new user
    static async create(name, email, password, mobile, address) {
        const sql = 'INSERT INTO users (name, email, password, mobile, address) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [name, email, password, mobile, address]);
        return result.insertId; // Return the ID of the newly created user
    }

    // Get all users
    static async getAll() {
        const sql = 'SELECT * FROM users';
        const [rows] = await db.execute(sql);
        return rows;
    }

    // Get a user by ID
    static async getById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    // Get a user by email and password
    static async getByEmailAndPassword(email, password) {
        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
        const [rows] = await db.execute(sql, [email, password]);
        return rows[0]; // Return the user if found, otherwise undefined
    }

    // Delete a user by ID
    static async deleteById(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0; // Return true if user was deleted
    }
}

module.exports = User;
