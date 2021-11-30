import moment from 'moment'

const dateUtil = {}

/**
 * 计算指定时间与今天的时间差
 * @param time 指定时间
 * @return 相差时间 (2天前)
 */
dateUtil.timeDifferenceToContent = (time) => {
  const nowDate = moment(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
  let diff = nowDate.diff(time, 'years')
  if (diff > 0) {
    return diff + '年前'
  }
  diff = nowDate.diff(time, 'months')
  if (diff > 0) {
    return diff + '月前'
  }
  diff = nowDate.diff(time, 'day')
  if (diff > 0) {
    return diff + '天前'
  }
  diff = nowDate.diff(time, 'hours')
  if (diff > 0) {
    return diff + '小时前'
  }
  diff = nowDate.diff(time, 'minutes')
  if (diff > 0) {
    return diff + '分钟前'
  }
  diff = nowDate.diff(time, 'seconds')
  if (diff > 0) {
    return diff + '秒前'
  }
  return '刚刚'
}
var date = new Date();
Date.prototype.Format = function (fmt) { // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
export default dateUtil
