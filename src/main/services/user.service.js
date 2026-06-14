import db from "../db/database";
import authService from "./auth.service";

const user = authService.user;

const userService = {
    getAllUsers: () => {
        if(user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        const result = db.prepare(`SELECT id, username, name, role, created_at FROM users ORDER BY created_at DESC`).all()
        if (!result) {
            return { success: false, message: 'Error fetching users' }
        }
        if (result.length === 0) {
            return { success: true, data: [] }
        }
        return { success: true, data: result }
    },
    addUser: (user) => {
        if(user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        const result = db.prepare(`INSERT INTO users (username, password, name, role) VALUES (@username, @password, @name, @role)`).run(user)
        if (!result.changes || result.changes === 0) {
            return { success: false, message: 'Error adding user' }
        }
        const newUser = db.prepare(`SELECT id, username, name, role, created_at FROM users WHERE id = ?`).get(result.lastInsertRowid)
        return { success: true, data: newUser }
    },
    updateUser: (id, role) => {
        if(user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        const result = db.prepare(`UPDATE users SET role = ? WHERE id = ?`).run(role, id)
        if (!result.changes || result.changes === 0) {
            return { success: false, message: 'Error updating user' }
        }
        const updatedUser = db.prepare(`SELECT id, username, name, role, created_at FROM users WHERE id = ?`).get(id)
        return { success: true, data: updatedUser }
    },
    deleteUser: (id) => {
        if(user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        const result = db.prepare(`DELETE FROM users WHERE id = ?`).run(id)
        if (!result.changes || result.changes === 0) {
            return { success: false, message: 'Error deleting user' }
        }
        return { success: true, data: { id } }
    }
}

export default userService;
