import { format } from 'date-fns'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'

export const calculateSNChunk = (batch, pcs, index) => {
  const arr = Array.from({ length: batch }, (_, i) => i + 1)
  const chunks = []
  for (let i = 0; i < arr.length; i += pcs) {
    chunks.push(arr.slice(i, i + pcs))
  }
  for (const item of chunks) {
    if (item.includes(index)) {
      return item
    }
  }
  return null
}

export const formatDateTime = (ts) => {
  return format(new Date(ts), 'yyyyMMddHHmmss')
}

export const formatDate = (ts, formatStr = 'yyyyMMdd') => {
  return format(new Date(ts), formatStr)
}

export const formatTime = (ts, formatStr = 'HHmmss') => {
  return format(new Date(ts), formatStr)
}

export const extractSNIndex = (sn) => {
  const num = Number.parseInt(sn.slice(-5), 10)
  return Number.isNaN(num) ? null : num
}

export const unique2DArray = (arr) => {
  if (!Array.isArray(arr)) {
    return null
  }
  const keys = []
  const ret = []
  for (const item of arr) {
    if (!keys.includes(item[0])) {
      ret.push(item)
      keys.push(item[0])
    }
  }
  return ret
}

export const getTemplate = (machine) => {
  const dir = app.isPackaged
    ? path.join(process.resourcesPath, `templates/${machine}`)
    : path.join(__dirname, `../../templates/${machine}`)

  const file = fs.readdirSync(dir).find(f =>
    f.startsWith('template.')
  )

  if (!file) {
    throw new Error(`Template not found for ${machine}`)
  }

  return fs.readFileSync(path.join(dir, file), 'utf8')
}

export const createBoardFromSns = (obj) => {
  if (!obj.sn) {
    return { success: false, message: 'SN not found, check your input' }
  }
  const sns = obj.sn.split(',')
  const batchSN = sns[0].slice(0, -5)
  if (sns.length === 0) {
    return { success: false, message: 'Invalid SN sequence, please check your input' }
  }
  const snByNumber = []
  for (const item of sns) {
    const snIndex = extractSNIndex(item)
    if (snIndex === null) {
      return { success: false, message: `Invalid SN: ${item}, please check your input` }
    }
    snByNumber.push(snIndex)
  }
  if(obj.batchQuantity < 1 || obj.pcs < 1) {
    return { success: false, message: 'Invalid batch quantity or pcs, please check your input' }
  }
  if(obj.batchQuantity < Math.max(...snByNumber)) {
    return { success: false, message: 'LOT size is less than the maximum SN index, please check your input' }
  }
  const snInBoard = snByNumber.map((sn) => {
    return calculateSNChunk(obj.batchQuantity, obj.pcs, sn)
  })
  const uniqueSNBoard = unique2DArray(snInBoard)
  uniqueSNBoard.forEach((sn) => {
    sn.forEach((s, index) => {
      sn[index] = `${batchSN}${String(s).padStart(5, '0')}`
    })
  })
  console.log(uniqueSNBoard)
  return { success: true, data: uniqueSNBoard }
}
