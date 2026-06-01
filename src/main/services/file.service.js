import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { calculateSNChunk, extractSNIndex, formatDate, unique2DArray } from '../utils/index.js'

const fileService = {
  HOLLY: {
    getTemplate() {
      const templatePath = app.isPackaged
        ? path.join(process.resourcesPath, `templates/HOLLY/template.txt`)
        : path.join(__dirname, `../../templates/HOLLY/template.txt`)
      return fs.readFileSync(templatePath, 'utf-8')
    },

    createBoardFromSns(obj){
      const template = this.getTemplate().split(',')
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
      return uniqueSNBoard
    },

    createFileContent(obj) {
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
      const template = this.getTemplate().split(',')
      const uniqueSNBoard = this.createBoardFromSns(obj)
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
          fileData[1] = obj.model
          fileData[2] = sn
          fileData[8] = obj.line
          fileData[template.length - 1] = `${formatDate(ts)}\r\n`
          const ret = fileData.join(',')
          fileContent += ret
        }

        const outputPath = path.join(outputDir, `${obj.line}_${formatDate(ts)}-OK.txt`)
        fs.writeFileSync(outputPath, fileContent)
      })
      return { success: true }
    }
  }
}

export default fileService
