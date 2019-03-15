export const state = () => ({
    list: {
        fetching: false,
        data: []
    },
    detail: {
        data: []
    }
})

export const mutations = {
    SET_ROUTE_DETAIL: (state, action) => {
        state.detail.data = action
    },
    SET_ROUTE_LIST: (state, action) => {
        state.list.data = action
    }
}

export const actions = {
    fetchDetail({ commit }, id = {}) {
        return this.$axios
            .$get(`/api/v1/routes/${id}`)
            .then(response => {
                commit('SET_ROUTE_DETAIL', response.data)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    },
    fetchList({ commit }) {
        return this.$axios
            .$get(`/api/v1/routes`)
            .then(response => {
                commit('SET_ROUTE_LIST', response.data)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }
}
