export const state = () => ({
  list: []
});

export const actions = {
  async fetchAll(state) {
    await this.$axios.get('/v1/companies/me')
    .then((data) => {
      console.log("companies data")
      console.log(data)
      if(data.status === 200) {
        state.commit('set', data.data.companies)
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }
}

export const mutations = {
  set(state, list) {
    state.list = list
  }
}

export const getters = () => ({
  company(state, id) {
    return state.list.find(e => e.id == id)
  }
})