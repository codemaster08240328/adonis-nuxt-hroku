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
    SET_DRIVING_SCHOOL_DETAIL: (state, action) => {
        state.detail.data = action
    },
    SET_DRIVING_SCHOOL_LIST: (state, action) => {
        state.list.data = action
    }
}

export const actions = {
    fetchDetail({ commit }, id = {}) {
        return this.$axios
            .$get(`/api/v1/drivingschools/${id}`)
            .then(response => {
                commit('SET_DRIVING_SCHOOL_DETAIL', response.data)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    },
    fetchList({ commit }) {
        return this.$axios
            .$get(`/api/v1/drivingschools`)
            .then(response => {
                commit('SET_DRIVING_SCHOOL_LIST', response.data)
            })
            .catch(error => {
                return Promise.reject(error)
            })
    }
}
