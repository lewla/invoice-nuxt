export const state = () => ({
  list: [
    { id: "abcde-fghj-1", checked: false, invoiceNumber: "2055-1", client: "Spiderman 1", power: 1, created: 1659113522118, due: 1659113522118, total: 1940, status: "draft" },
    { id: "abcde-fghj-2", checked: false, invoiceNumber: "2055-2", client: "Aquaman 2", power: 2, created: 1659213522218, due: 1659213522218, total: 204, status: "draft" },
    { id: "abcde-fghj-3", checked: false, invoiceNumber: "2055-3", client: "Superman 3", power: 3, created: 1659313522318, due: 1659313522318, total: 340, status: "draft" },
    { id: "abcde-fghj-4", checked: false, invoiceNumber: "2055-4", client: "Superman 4", power: 4, created: 1659413522418, due: 1659413522418, total: 340, status: "draft" },
    { id: "abcde-fghj-5", checked: false, invoiceNumber: "2055-5", client: "Superman 5", power: 5, created: 1659513522518, due: 1659513522518, total: 340, status: "draft" },
    { id: "abcde-fghj-6", checked: false, invoiceNumber: "2055-6", client: "Superman 6", power: 6, created: 1659613522618, due: 1659613522618, total: 340, status: "draft" },
    { id: "abcde-fghj-7", checked: false, invoiceNumber: "2055-7", client: "Superman 7", power: 7, created: 1659713522718, due: 1659713522718, total: 340, status: "draft" },
    { id: "abcde-fghj-8", checked: false, invoiceNumber: "2055-8", client: "Superman 8", power: 8, created: 1659813522818, due: 1659813522818, total: 340, status: "draft" },
    { id: "abcde-fghj-9", checked: false, invoiceNumber: "2055-9", client: "Superman 9", power: 9, created: 1659913522918, due: 1659913522918, total: 340, status: "draft" },
    { id: "abcde-fghj-10", checked: false, invoiceNumber: "2055-10", client: "Superman 10", power: 10, created: 1661001121082, due: 1661001121082, total: 340, status: "draft" },
    { id: "abcde-fghj-11", checked: false, invoiceNumber: "2055-11", client: "Superman 11", power: 11, created: 1661111121182, due: 1661111121182, total: 340, status: "draft" },
    { id: "abcde-fghj-12", checked: false, invoiceNumber: "2055-12", client: "Superman 12", power: 12, created: 1661221121282, due: 1661221121282, total: 340, status: "draft" },
    { id: "abcde-fghj-13", checked: false, invoiceNumber: "2055-13", client: "Superman 13", power: 13, created: 1661331121382, due: 1661331121382, total: 340, status: "draft" },
    { id: "abcde-fghj-14", checked: false, invoiceNumber: "2055-14", client: "Superman 14", power: 14, created: 1661441121482, due: 1661441121482, total: 340, status: "draft" },
    { id: "abcde-fghj-15", checked: false, invoiceNumber: "2055-15", client: "Superman 15", power: 15, created: 1661551121582, due: 1661551121582, total: 340, status: "draft" },
    { id: "abcde-fghj-16", checked: false, invoiceNumber: "2055-16", client: "Superman 16", power: 16, created: 1661661121682, due: 1661661121682, total: 340, status: "draft" },
    { id: "abcde-fghj-17", checked: false, invoiceNumber: "2055-17", client: "Superman 17", power: 17, created: 1661771121782, due: 1661771121782, total: 340, status: "draft" },
    { id: "abcde-fghj-18", checked: false, invoiceNumber: "2055-18", client: "Superman 18", power: 18, created: 1661881121882, due: 1661881121882, total: 340, status: "draft" },
    { id: "abcde-fghj-19", checked: false, invoiceNumber: "2055-19", client: "Superman 19", power: 19, created: 1661991121982, due: 1661991121982, total: 340, status: "draft" },
    { id: "abcde-fghj-20", checked: false, invoiceNumber: "2055-20", client: "Superman 20", power: 20, created: 1662001222082, due: 1662001222082, total: 340, status: "draft" },
    { id: "abcde-fghj-21", checked: false, invoiceNumber: "2055-21", client: "Superman 21", power: 21, created: 1662111222182, due: 1662111222182, total: 340, status: "draft" },
    { id: "abcde-fghj-22", checked: false, invoiceNumber: "2055-22", client: "Superman 22", power: 22, created: 1662221222282, due: 1662221222282, total: 340, status: "draft" },
    { id: "abcde-fghj-23", checked: false, invoiceNumber: "2055-23", client: "Superman 23", power: 23, created: 1662331222382, due: 1662331222382, total: 340, status: "draft" },
    { id: "abcde-fghj-24", checked: false, invoiceNumber: "2055-24", client: "Superman 24", power: 24, created: 1662441222482, due: 1662441222482, total: 340, status: "draft" },
    { id: "abcde-fghj-25", checked: false, invoiceNumber: "2055-25", client: "Superman 25", power: 25, created: 1662551222582, due: 1662551222582, total: 340, status: "draft" },
    { id: "abcde-fghj-26", checked: false, invoiceNumber: "2055-26", client: "Superman 26", power: 26, created: 1662661222682, due: 1662661222682, total: 340, status: "draft" },
  ]
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
        if(state.list[key].checked) {
          state.list[key].status = data.status
        }
      }
    }
  },
  setAllChecked(state, data) {
    for (let key in state.list) {
      if(state.list.hasOwnProperty(key)) {
        state.list[key].checked = data.checked
      }
    }
  },
  toggleChecked(state, data) {
    console.log("check")
    state.list.find(e => e.id == data.id).checked = !state.list.find(e => e.id == data.id).checked
  }
}

export const actions = {
  fetchAll(ctx) {
  }
}

export const getters = () => ({
  invoice(state, id) {
    return state.list.find(e => e.id == id)
  }
})