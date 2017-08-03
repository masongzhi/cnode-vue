import floor from 'lodash/floor'
import isNil from 'lodash/isNil'
import round from 'lodash/round'

export function fixedFloat (number, byte = 2) {
  if (!number) {
    return 0
  }

  return parseFloat(number.toFixed(parseInt(byte, 10)))
}

export function fixedFloatPro (number) {
  const left = Math.abs(number - fixedFloat(number))
  // 是 0.34999999999 的情况才 fix
  if (left < 0.00001) {
    return fixedFloat(number)
  }
  return number
}

export function fixedRoundFloat (number, digits = 2) {
  if (!number || digits < 0) {
    return number
  }

  return roundFloat(number, digits).toFixed(digits)
}

export function roundFloat (number, digits = 2) {
  if (!number || digits < 0) {
    return number
  }

  return round(number, digits)
}

export function cutFloat (number, digits = 2) {
  if (!number || digits < 0) {
    return number
  }

  number = fixedFloatPro(number)
  const isMinus = (number < 0)
  if (isMinus) {
    number = -number
  }
  const result = fixedFloatPro(floor(number, digits))
  return result * (isMinus ? -1 : 1)
}

export function toPercent (number) {
  if (isNil(number)) {
    return number
  }

  return cutFloat(number * 100) + '%'
}
export function thousandBitSeparator (number, symbol) {
  if (number && isNil(number)) {
    return number
  }
  const arr = number.toString().split('.')
  arr[0] = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + symbol)
  return arr.join('.')
}
