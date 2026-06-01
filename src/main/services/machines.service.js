import db from "../db/database";
import authService from "./auth.service";


const machinesService = {
    getAllMachines: () => {
        const result = db.prepare(`SELECT id, name, type, created_at FROM machines ORDER BY created_at DESC`).all()
        if (!result) {
            return { success: false, message: 'Error fetching machines' }
        }
        if (result.length === 0) {
            return { success: true, data: [] }
        }
        return { success: true, data: result }
    },
    addMachine: (machine) => {
        const user = authService.identify;
        console.log('user', user);
        if(user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        if(!machine || !machine.name || !machine.type) {
            return { success: false, message: 'Invalid machine data' }
        }
        const result = db.prepare(`INSERT INTO machines (name, type) VALUES (@name, @type)`).run(machine)
        if (!result.changes || result.changes === 0) {
            return { success: false, message: 'Error adding machine' }
        }
        return { success: true, data: { id: result.lastInsertRowid, ...machine } }
    },
    updateMachine: (id, machine) => {
        const user = authService.identify;
        if(user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        if(!machine || !machine.name || !machine.type) {
            return { success: false, message: 'Invalid machine data' }
        }
        const result = db.prepare(`UPDATE machines SET name = @name, type = @type WHERE id = @id`).run({ ...machine, id })
        if (!result.changes || result.changes === 0) {
            return { success: false, message: 'Error updating machine' }
        }
        return { success: true, data: { id, ...machine } }
    },
    deleteMachine: (id) => {
        const user = authService.identify;
        if(user.role !== 'ADMIN') {
            return { success: false, message: 'Forbidden' }
        }
        const result = db.prepare(`DELETE FROM machines WHERE id = ?`).run(id)
        if (!result.changes || result.changes === 0) {
            return { success: false, message: 'Error deleting machine' }
        }
        return { success: true, data: { id } }
    }
}

export default machinesService
