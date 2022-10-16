/**
 * 类型判断
 */
export function isValidObj(obj) {
  if (obj === undefined || obj === null) return false
  return Object.keys(obj).length !== 0
}

export function isObj(test) {
  return typeof test === 'object'
}

export function isArray(obj) {
  return Array.isArray(obj)
}

export function isValidArray(obj) {
  return Array.isArray(obj) && obj.length
}

export function isFn(params) {
  return typeof params === 'function'
}
/**
 * 判定数据是否为false|undefined|null|''|0|空对象|空数组
 * @param {*} v 输入
 * @returns boolean 是否为空
 */
export function isEmpty(v) {
  return !v || Array.isArray(v) && !v.length || !Object.keys(v).length
}

export function isString(s) {
  return typeof s === 'string'
}

export function isValidString(test) {
  return isString(test) && test.length > 0
}

export function isNumber(num) {
  return typeof num === 'number'
}

export function isBoolean(test) {
  return typeof test === 'boolean'
}

export function hasKey(test, key) {
  return isObj(test) && test.hasOwnProperty(key)
}
module.exports = {
  isValidObj,
  isValidArray,
  isArray,
  isFn,
  isEmpty,
  isString,
  isValidString,
  isNumber,
  isBoolean,
  isObj,
  hasKey,
}