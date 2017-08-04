import fetch from '../utils/fetch'

// get /topics 主题首页
export function getTopics (options) {
  return fetch('/topics', options)
}
// get /topic/:id 主题详情
export function getTopic (topicId, options) {
  return fetch(`/topic/${topicId}`, options)
}
// get /user/:loginname 用户详情
export function getUser (loginname, options) {
  return fetch(`/user/${loginname}`, options)
}
