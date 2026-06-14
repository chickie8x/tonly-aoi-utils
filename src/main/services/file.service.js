import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'
import { createBoardFromSns, formatDateTime, formatDate, formatTime, getTemplate } from '../utils/index.js'

const fileService = {
  'HOLLY': {
    createFileContentHolly(obj) {
      if (
        !obj.sn ||
        !obj.model ||
        !obj.side ||
        !obj.batchQuantity ||
        !obj.pcs ||
        !obj.lanes ||
        !obj.line
      ) {
        return { success: false, message: 'Missing required fields' }
      }
      const template = getTemplate('HOLLY').split(',')
      const result = createBoardFromSns(obj)
      if (!result.success) {
        return result
      }
      const uniqueSNBoard = result.data
      const outputDir = path.join(
        app.getPath('desktop'),
        'output',
        `${obj.machine?.name || 'unknown'}`
      )
      fs.mkdirSync(outputDir, { recursive: true })
      uniqueSNBoard.forEach((board, index) => {
        let fileContent = ''
        const ts = new Date().getTime() + index * 1000
        for (const sn of board) {
          let fileData = [...template]
          fileData[0] = obj.model
          fileData[1] = obj.model
          fileData[2] = sn
          fileData[3] = obj.line
          fileData[8] = obj.lanes
          fileData[template.length - 1] = `${formatDateTime(ts)}\r\n`
          const ret = fileData.join(',')
          fileContent += ret
        }

        const outputPath = path.join(outputDir, `${obj.line}_${formatDateTime(ts)}.txt`)
        fs.writeFileSync(outputPath, fileContent)
      })
      return { success: true }
    }
  },
  'JUTZE-V1': {
    createFileContentJutzeV1(obj) {
      if (
        !obj.sn ||
        !obj.model ||
        !obj.side ||
        !obj.batchQuantity ||
        !obj.pcs ||
        !obj.lanes ||
        !obj.line
      ) {
        return { success: false, message: 'Missing required fields' }
      }
      const template = getTemplate('JUTZE-V1').split(/\r?\n/)
      const result = createBoardFromSns(obj)
      if (!result.success) {
        return result
      }
      const uniqueSNBoard = result.data
      const outputDir = path.join(
        app.getPath('desktop'),
        'output',
        `${obj.machine?.name || 'unknown'}`
      )
      fs.mkdirSync(outputDir, { recursive: true })
      uniqueSNBoard.forEach((board, index) => {
        let fileContent = ''
        const ts = new Date().getTime() + index * 1000
        for (const sn of board) {
          const fileData = [...template]
          fileData[0] = obj.model
          fileData[1] = sn
          fileData[3] = obj.lanes
          fileData[5] = formatDateTime(ts)
          fileData[6] = formatDate(ts)
          fileData[7] = formatTime(ts)
          fileData[9] = obj.side === 'Top' ? 'T' : 'B'
          fileData.push(`\r\n`)
          const ret = fileData.join(`\r\n`)
          fileContent += ret
        }
        const outputPath = path.join(outputDir, `${obj.line}_${formatDateTime(ts)}.txt`)
        fs.writeFileSync(outputPath, fileContent)
      })
      return { success: true }
    }
  },
  'TRI': {
    createFileContentTri(obj) {
      if (
        !obj.sn ||
        !obj.model ||
        !obj.side ||
        !obj.batchQuantity ||
        !obj.pcs ||
        !obj.lanes ||
        !obj.line
      ) {
        return { success: false, message: 'Missing required fields' }
      }
      const template = getTemplate('TRI').split(/\r?\n/)
      const result = createBoardFromSns(obj)
      if (!result.success) {
        return result
      }
      const uniqueSNBoard = result.data
      const outputDir = path.join(
        app.getPath('desktop'),
        'output',
        `${obj.machine?.name || 'unknown'}`
      )
      fs.mkdirSync(outputDir, { recursive: true })
      uniqueSNBoard.forEach((board, index) => {
        let fileContent = ''
        const ts = new Date().getTime() + index * 1000
        for (const sn of board) {
          const fileData = [...template]
          fileData[0] = obj.model
          fileData[1] = sn
          fileData[2] = `${obj.line}-POST-TRI`
          fileData[3] = obj.lanes
          fileData[6] = formatDate(ts)
          fileData[7] = formatTime(ts)
          fileData[9] = obj.side === 'Top' ? 'T' : 'B'
          let ret = fileData.join(`\r\n`)
          ret += '\r\n'
          fileContent += ret
        }

        const outputPath = path.join(outputDir, `${obj.line}_${formatDateTime(ts)}.txt`)
        fs.writeFileSync(outputPath, fileContent)
      })
      return { success: true }
    }
  },
  'SPI-KY': {
    createFileContentSpi(obj) {
      if (
        !obj.sn ||
        !obj.model ||
        !obj.side ||
        !obj.batchQuantity ||
        !obj.pcs ||
        !obj.lanes ||
        !obj.line
      ) {
        return { success: false, message: 'Missing required fields' }
      }
      const template = getTemplate('SPI-KY')
      console.log(parse(template))
      // return { success: true, data: parse(template) }
      const result = createBoardFromSns(obj)
      if (!result.success) {
        return result
      }
      const uniqueSNBoard = result.data
      const outputDir = path.join(
        app.getPath('desktop'),
        'output',
        `${obj.machine?.name || 'unknown'}`
      )
      fs.mkdirSync(outputDir, { recursive: true })
      uniqueSNBoard.forEach((board, index) => {
        let fileContent = [...parse(template)]
        fileContent[2][0] = obj.model
        fileContent[2][3] = board[0].slice(0, board[0].length - 5)
        const ts = new Date().getTime() + index * 1000
        for (const sn of board) {
          const fileData = [...fileContent[5]]
          fileData[0] = sn
          fileData[7] = formatDate(ts, 'yyyy/MM/dd')
          fileData[8] = formatTime(ts, 'HH:mm:ss')
          fileData[27] = obj.model
          fileContent.push(fileData)
        }
        fileContent.splice(5, 1)
        const csvRet = stringify(fileContent, {
          record_delimiter: '\r\n'
        })
        const outputPath = path.join(outputDir, `${obj.line}_${formatDateTime(ts)}.csv`)
        fs.writeFileSync(outputPath, csvRet)
      })
      return { success: true }
    }
  }
}

export default fileService
