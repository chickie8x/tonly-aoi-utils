import db from "../db/database";
import authService from "./auth.service";

const user = authService.user;
console.log('user', user);

const pathConfig = {
    getAllPathConfigs: () => {
        const result = db.prepare(`SELECT * FROM path_config ORDER BY created_at DESC`).all()
        if (!result) {
            return { success: false, message: 'Error reading path configs' }
        }
        if (result.length === 0) {
            return { success: true, data: [] }
        }
        return { success: true, data: result }
    },
    addPathConfig: (pathConfig) => {
        if(!user || user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        const result = db.prepare(`INSERT INTO path_config (name, src_path, dst_path) VALUES (@name, @src_path, @dst_path)`).run(pathConfig)
        if (!result.changes || result.changes === 0) {
            return { success: false, message: 'Failed to add path config' }
        }
        const newPath = db.prepare(`SELECT * FROM path_config WHERE id = ?`).get(result.lastInsertRowid)
        return { success: true, data: newPath }
    },
    deletePathConfig: (id) => {
        if(!user || user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        const result = db.prepare(`DELETE FROM path_config WHERE id = ?`).run(id)
        if (!result.changes || result.changes === 0) {
            return { success: false, message: 'Failed to delete path' }
        }
        return { success: true, message: 'Path deleted successfully' }
    }
}

export default pathConfig

