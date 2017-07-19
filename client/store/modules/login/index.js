const state = {
  data: null,
  isLoading: false,
  error: null,
  loginForm: {
    userName: '',
    password: ''
  },
  rules: {
    userName: { required: true, message: '请输入用户名', trigger: 'blur' },
    password: { required: true, message: '请输入密码', trigger: 'blur' }
  }
}
const actions = {

}

const mutations = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}