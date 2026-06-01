import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

console.log('Preload script loaded, contextIsolated')
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', {
      //auth methods
      login: (payload) => {
        return ipcRenderer.invoke('auth:login', payload)
      },
      register: (payload) => {
        return ipcRenderer.invoke('auth:register', payload)
      },
      //path config methods
      getAllPathConfigs: () => {
        return ipcRenderer.invoke('pathConfig:getAllPathConfigs')
      },
      addPathConfig: (payload) => {
        return ipcRenderer.invoke('pathConfig:addPathConfig', payload)
      },
      deletePathConfig: (id) => {
        return ipcRenderer.invoke('pathConfig:deletePathConfig', id)
      },
      //user methods
      getAllUsers: () => {
        return ipcRenderer.invoke('user:getAllUsers')
      },
      addUser: (user) => {
        return ipcRenderer.invoke('user:addUser', user)
      },
      updateUser: (id, user) => {
        return ipcRenderer.invoke('user:updateUser', id, user)
      },
      deleteUser: (id) => {
        return ipcRenderer.invoke('user:deleteUser', id)
      },
      //machine methods
      getAllMachines: () => {
        return ipcRenderer.invoke('machines:getAllMachines')
      },
      addMachine: (machine) => {
        return ipcRenderer.invoke('machines:addMachine', machine)
      },
      updateMachine: (id, machine) => {
        return ipcRenderer.invoke('machines:updateMachine', id, machine)
      },
      deleteMachine: (id) => {
        return ipcRenderer.invoke('machines:deleteMachine', id)
      },
      //file methods
      createFileContent: (data) => {
        return ipcRenderer.invoke('file:createFileContent', data)
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
}
