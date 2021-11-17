export default {
    state: {
        user: {},
        token: false
    },
    getters: {

    },
    mutations: {
        login(state, user) {
            state.user = user
            state.token = user.token
            window.sessionStorage.setItem('user', JSON.stringify(state.user))
            window.sessionStorage.setItem('token', JSON.stringify(state.token))
        }
    },
    actions: {

    }
}