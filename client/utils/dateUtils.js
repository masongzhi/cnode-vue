import moment from 'moment'

// function prefixZero (value) {
//   return +value >= 10 ? value : '0' + value
// }
export default {
  getFormatTime (time, format = 'YYYY-MM-DD HH:mm:ss') {
    const dateTime = time instanceof Date ? time : new Date(time)
    return moment(dateTime || new Date()).format(format)
  }
}
