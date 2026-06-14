import { ipcMain } from 'electron'
import authService from './auth.service.js'
import pathConfig from './pathConfig.service.js'
import machinesService from './machines.service.js'
import userService from './user.service.js'
import fileService from './file.service.js'
// auth service
ipcMain.handle('auth:login', async (_, payload) => {
  return authService.login(payload)
})

ipcMain.handle('auth:register', async (_, payload) => {
  return authService.createUser(payload)
})

// path config service
ipcMain.handle('pathConfig:getAllPathConfigs', async () => {
  return pathConfig.getAllPathConfigs()
})

ipcMain.handle('pathConfig:addPathConfig', async (_, payload) => {
  return pathConfig.addPathConfig(payload)
})

ipcMain.handle('pathConfig:deletePathConfig', async (_, id) => {
  return pathConfig.deletePathConfig(id)
})

// machines service
ipcMain.handle('machines:getAllMachines', async () => {
  return machinesService.getAllMachines()
})

ipcMain.handle('machines:addMachine', async (_, machine) => {
  return machinesService.addMachine(machine)
})

ipcMain.handle('machines:updateMachine', async (_, id, machine) => {
  return machinesService.updateMachine(id, machine)
})

ipcMain.handle('machines:deleteMachine', async (_, id) => {
  return machinesService.deleteMachine(id)
})

//user service
ipcMain.handle('user:getAllUsers', async () => {
  return userService.getAllUsers()
})

ipcMain.handle('user:addUser', async (_, user) => {
  return userService.addUser(user)
})

ipcMain.handle('user:updateUser', async (_, id, user) => {
  return userService.updateUser(id, user)
})

ipcMain.handle('user:deleteUser', async (_, id) => {
  return userService.deleteUser(id)
})

//file service
ipcMain.handle('file:createFileContent', async (_, data) => {
  data = JSON.parse(data)
  if(!data){
    return { success: false, message: 'Missing required data'}
  }
  const {machine} = data
  if(!machine){
    return { success: false, message: 'Missing machine'}
  }
  switch(machine.name){
    case 'HOLLY':
      return fileService[machine.name].createFileContentHolly(data)
    case 'JUTZE-V1':
      return fileService[machine.name].createFileContentJutzeV1(data)
    case 'TRI':
      return fileService[machine.name].createFileContentTri(data)
    case 'SPI-KY':
      return fileService[machine.name].createFileContentSpi(data)
    default:
      return { success: false, message: 'Machine not supported'}
  }
})

