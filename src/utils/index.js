export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const debounce = (func, wait = 2000) => {
  let timmer = null
  return () => {
    const arg = arguments
    const content = this
    if (timmer) {
      clearTimeout(timmer)
      timmer = null
    }
    timmer = setTimeout(() => {
      func.apply(content, arg)
    }, wait)
  }
}

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
export const deepClone = values => {
  let copy

  // Handle the 3 simple types, and null or undefined
  if (values == null || typeof values != 'object') return values

  // Handle Date
  if (values instanceof Date) {
    copy = new Date()
    copy.setTime(values.getTime())
    return copy
  }

  // Handle Array
  if (values instanceof Array) {
    copy = []
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i])
    }
    return copy
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const attr in values) {
      // eslint-disable-next-line no-prototype-builtins
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr])
    }
    return copy
  }

  throw new Error("Unable to copy values! Its type isn't supported.")
}
