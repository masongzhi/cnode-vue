/**
 * Created by llll on 17-7-11.
 */
import { getFormatTime } from './dateUtils'
export function findDetailsName (key) {
  const KEY_NAME = {
    platform_name: '平台名字',
    age: '年龄',
    origin: '所在地',
    gender: '性别',
    address: '详细地址',
    education: '教育程度',
    id_card: '身份证',
    phone: '手机号码',
    real_name: '姓名',
    annual_day: '一年计算天数',
    repay_way: '还款方式',
    offline_fee: '',
    annual_rate: '年利率',
    pay_bank_card: '放款银行卡号',
    pay_bank_name: '放款银行名称',
    apply_date: '还款日期',
    term: '期限',
    term_unit: '期限单位',
    fee_amount: '费用金额',
    pay_amount: '放款金额',
    subject_amount: '标的金额',
    subject_type: '标的类型',
    contacts_num: '',
    is_phone_verified: '手机是否实名认证',
    character: '职业',
    contact_name1: '联系人1姓名',
    push_timestamp: '推送时间',
    subject_id: '标的id',
    subject_name: '标的名字',
    repay_amount: '还款金额',
    platform_type: '平台类型',
    pay_time: '支付时间'
  }
  return KEY_NAME[key] || key
}
export function computedDetailsValue (key, obj) {
  const PLATFORM_TYPE = {
    0: '',
    1: '线下',           // 线下
    2: '线上'    // 线下
  }
  const valueFunction = {
    push_timestamp: getFormatTime(obj[key]),
    bid_date: getFormatTime(obj[key], 'YYYY-MM-DD'),
    createdAt: getFormatTime(obj[key]),
    audit_time: getFormatTime(obj[key]),
    platform_type: PLATFORM_TYPE[obj[key]]
  }
  return valueFunction[key] || obj[key]
}
export function failReason (key) {
  const KEY_NAME = {
    type: '类型',
    name: '名字',
    platform_name: '平台名称',
    amount: '金额',
    progress: '进度',
    phone: '手机号码',
    note_id: '标的id',
    platform_id: '平台id',
    id_card: '身份证',
    invest_date: '投资日期',
    bank_card: '银行卡'
  }
  return KEY_NAME[key] || key
}
export function computedfailReasonValue (key, obj) {
  //  过滤规则
  const ORDER_REPEAT_TYPE = {
    'one_day': '同一天重复',
    'multi_platform': '多平台重复',
    'phone_not_match_id': '手机号码不匹配身份证',
    'bank_card_not_match_id': '银行卡不匹配身份证',
    'id_not_match_name': '身份证不匹配姓名',
    'info_words_not_match': '用户信息不满足规则'
  }
  const valueFunction = {
    invest_date: getFormatTime(obj[key], 'YYYY-MM-DD'),
    type: ORDER_REPEAT_TYPE[obj[key]]
  }
  return valueFunction[key] || obj[key]
}
