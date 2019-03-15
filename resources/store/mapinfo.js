export const state = () => ({
    infos: [],
    lol: ['apple', 'juice'],
    lol2: 'asdasddasas'
})

export const mutations = {
    SET_INFO: (state, infos) => {
        state.infos = infos
    }
}

export const actions = {
    fetchInfoList({ commit }) {
        return this.$axios
            .$get('/routes.json')
            .then(infos => {
                //console.debug(infos)
                commit('SET_INFO', infos)
            })
            .catch(error => console.debug('error on fetching info list'))
    }
}
