export const state = () => ({
  list: [],
  checked_list: []
});

export const mutations = {
  sort(state, data) {
    // data.by
    // data.desc
    if(data.desc)
      state.list.sort((a,b) => b[data.by] - a[data.by])
    else 
      state.list.sort((a,b) => a[data.by] - b[data.by])
  },
  updateStatus(state, data) {
    state.list.find(e => e.id == data.id).status = data.status
  },
  updateSelectedStatus(state, data) {
    for (let key in state.list) {
      if(state.list.hasOwnProperty(key)) {
        if(state.list[key].checked || state.checked_list.includes(state.list[key].id)) {
          state.list[key].status = data.status
        }
      }
    }
  },
  setAllChecked(state, data) {
    for (let key in state.list) {
      if(state.list.hasOwnProperty(key)) {
        state.list[key].checked = data.checked;
        if(data.checked) {
          if(!state.checked_list.includes(state.list[key].id)) {
            state.checked_list.push(state.list[key].id)
            // this._vm.$set(state.checked_list, state.checked_list.length, state.list[key].id)
          }
        }
        else {
          state.checked_list = state.checked_list.filter(item => item !== state.list[key].id)
        }
      }
    }
  },
  toggleChecked(state, data) {
    console.log("check")
    state.list.find(e => e.id == data.id).checked = !state.list.find(e => e.id == data.id).checked
    if(state.checked_list.includes(data.id)) {
      state.checked_list = state.checked_list.filter(item => item !== data.id)
    }
    else {
      state.checked_list.push(data.id)
      // this._vm.$set(state.checked_list, state.checked_list.length, data.id)
    }
  },
  set(state, data) {
    console.log("setting invoice data to store")
    console.log(data)
    state.list = data.list
  },
}

export const actions = {
  async fetchAllByCompany(state, id) {
    await this.$axios.get(`/v1/companies/${id}/invoices`)
    .then((data) => {
      console.log("invoices data")
      console.log(data)
      if(data.status === 200) {
        state.commit('set', {company_id: id, list: data.data.invoices})
      }
    })
    .catch((e) => {
      console.log(e)
    })
  },
  async fetchAll(state) {
    await this.$axios.get(`/v1/invoices/my`)
    .then((data) => {
      console.log("invoices data")
      console.log(data)
      if(data.status === 200) {
        state.commit('set', {list: data.data.invoices})
      }
    })
    .catch((e) => {
      console.log(e)
    })
  },
}

export const getters = () => ({
  invoice(state, id) {
    return state.list.find(e => e.id == id)
  },
  getAllByCompany(state, id) {
    return state.list.filter(e => e.company_id == id)
  }
})