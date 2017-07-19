import moment from 'moment'

function prefixZero (value) {
  return +value >= 10 ? value : '0' + value
}

export function getFormatTime (time, format = 'YYYY-MM-DD HH:mm:ss') {
  let dateTime;
  if (time instanceof Date) {
    dateTime = time
  } else {
    dateTime = new Date(time)
  }
  return moment(dateTime || new Date()).format(format)
}
