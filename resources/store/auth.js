const user = JSON.parse(localStorage.getItem('user'))

export const state = () => ({
    status: {
        loggingIn: false,
        loading: false
    },
    user: user ? user : null,
    registerfailed: false,
    loginfailed: false
})

export const mutations = {
    LOGIN_REQUEST: (state, action) => {
        state.user = action
        state.status.loggingIn = true
        state.loginfailed = false
    },
    LOGIN_SUCCESS: (state, action) => {
        state.status.loggingIn = false
        state.loginfailed = false
        state.user = action
    },
    LOGIN_FAILED: (state, action) => {
        state.status.loggingIn = false
        state.loginfailed = true
    },
    REGISTER_REQUEST: (state, action) => {
        state.user = action
        state.status.loading = true
        state.registerfailed = false
    },
    REGISTER_SUCCESS: (state, action) => {
        state.user = action
        state.status.loading = false
        state.registerfailed = false
    },
    REGISTER_FAILED: (state, action) => {
        state.registerfailed = true
        state.status.loading = false
    }
}

export const actions = {
    login({ commit }, { email_address, password }) {
        commit('LOGIN_REQUEST', { email_address })
        return this.$axios
            .$post('/api/v1/login', { email_address, password })
            .then(response => {
                const { success, data, access_token } = response
                if (success) {
                    localStorage.setItem('token', access_token['token'])
                    commit('LOGIN_SUCCESS', data)
                }
            })
            .catch(error => {
                commit('LOGIN_FAILED', error)
                return Promise.reject(error)
            })
    },
    register({ commit }, user) {
        const { email_address } = user
        commit('REGISTER_REQUEST', { email_address })
        return this.$axios
            .$post('/api/v1/users', user)
            .then(response => {
                commit('REGISTER_SUCCESS', response)
                this.$router.push('/login')
            })
            .catch(error => {
                commit('REGISTER_FAILED', error)
                return Promise.reject(error)
            })
    }
}
