import { format } from "date-fns";


export const calculateSNChunk = (batch, pcs, index) => {
  const arr = Array.from({ length: batch }, (_, i) => i + 1);
  const chunks = [];
  for (let i = 0; i < arr.length; i += pcs) {
    chunks.push(arr.slice(i, i + pcs));
  }
  for (const item of chunks) {
    if (item.includes(index)) {
      return item;
    }
  }
  return null;
}

export const formatDate = (ts) => {
  return format(new Date(ts), 'yyyyMMddHHmmss')
}

export const extractSNIndex = (sn) => {
  const num = Number.parseInt(sn.slice(-5), 10)
  return Number.isNaN(num) ? null : num
}

export const unique2DArray = (arr) => {
  if(!Array.isArray(arr)) {
    return null
  }
  const keys = []
  const ret = []
  for (const item of arr) {
    if(!keys.includes(item[0])) {
      ret.push(item)
      keys.push(item[0])
    }
  }
  return ret
}
