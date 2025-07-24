const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const {
      name,
      email,
      password
    } = userData;

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (
        name, email, password_hash
      )
      VALUES ($1, $2, $3)
      RETURNING id, name, email, created_at
    `;

    const values = [
      name,
      email.toLowerCase(),
      passwordHash
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = `
      SELECT id, name, email, password_hash,
             created_at
      FROM users 
      WHERE email = $1
    `;

    try {
      const result = await pool.query(query, [email.toLowerCase()]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = `
      SELECT id, name, email, created_at
      FROM users 
      WHERE id = $1
    `;

    try {
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateLastLogin(userId) {
    const query = `
      UPDATE users 
      SET updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1
    `;

    try {
      await pool.query(query, [userId]);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  static async getAllUsers(limit = 50, offset = 0) {
    const query = `
      SELECT id, first_name, last_name, email, native_language,
             target_language, proficiency_level, learning_goal, 
             created_at
      FROM users 
      WHERE is_active = true
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async getUserStats() {
    const query = `
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as new_users_this_month
      FROM users
    `;

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;