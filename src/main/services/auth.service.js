import db from '../db/database.js'
import argon2 from 'argon2'

const ROOT_PASSCODE = '06041986'

const hashPassword = async (password) => {
  return await argon2.hash(password)
}

const verifyPassword = async (password, hash) => {
  return await argon2.verify(hash, password)
}

const authService = {

  identify: null,
  async login(credentials) {
    try {
      const { username, password } = credentials

      // Basic validation
      if (!username || !password) {
        return { success: false, error: 'username and password are required' }
      }
      
      //check user in database
      const user = db.prepare(`
        SELECT *
        FROM users
        WHERE username = ?
      `).get(username)
      
      if (!user) {
        return { success: false, error: 'User not found' }
      }
      
      //verify password
      const isPasswordValid = await verifyPassword(password, user.password)
      if (!isPasswordValid) {
        return { success: false, error: 'Invalid password' }
      }
      
      //return user
      this.identify = { id: user.id, username: user.username, name: user.name, role: user.role }
      return { success: true, data: this.identify }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Authentication failed' }
    }
  },

  async createUser(payload) {
    const { username, password, name } = payload

    //check existing user
    const existingUser = db.prepare(`
      SELECT *
      FROM users
      WHERE username = ?
    `).get(username)
    
    if (existingUser) {
      return { success: false, error: 'User already exists' }
    }

    const hashedPassword = await hashPassword(password)

    const insertStmt = db.prepare(`
    INSERT INTO users (
      username,
      password,
      name
    )
    VALUES (?, ?, ?)
  `)

  const result = insertStmt.run(
    username,
    hashedPassword,
    name
  )

  const user = db.prepare(`
    SELECT *
    FROM users
    WHERE id = ?
  `).get(result.lastInsertRowid)

  this.identify = { id: user.id, username: user.username, name: user.name, role: user.role }
  return { success: true, data: this.identify }
}
}

export default authService
