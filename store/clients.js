export const state = () => ({
  list: []
});

export const actions = {
  async fetchAll(state) {
    await this.$axios.get('/v1/clients/my')
    .then((data) => {
      console.log("clients data")
      console.log(data)
      if(data.status === 200) {
        state.commit('set', data.data.clients)
      }
    })
    .catch((e) => {
      console.log(e)
    })
  },
  async removeClient(state, id) {
    await this.$axios.delete('/v1/clients/' + id)
    .then((data) => {
      console.log("remove client")
      console.log(data)
      if(data.status === 200) {
        state.commit('removeClient', data.data.client.id)
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
  },
  removeClient(state, id) {
    state.list = state.list.filter(e => e.id != id)
  }
}

export const getters = () => ({
  client(state, id) {
    return state.list.find(e => e.id == id)
  },
  getByCompanyId(state, company_id) {
    return state.list.filter(e => e.company_id == company_id)
  }
})