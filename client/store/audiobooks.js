
export const state = () => ({
  audiobooks: [],
  listeners: []
})

export const getters = {

}

export const actions = {
  load({ commit }) {
    this.$axios
      .$get(`/api/audiobooks`)
      .then((data) => {
        commit('set', data)
      })
      .catch((error) => {
        console.error('Failed', error)
        commit('set', [])
      })
  }
}

export const mutations = {
  set(state, audiobooks) {
    console.log('Set Audiobooks', audiobooks)
    state.audiobooks = audiobooks
    state.listeners.forEach((listener) => {
      listener.meth()
    })
  },
  addUpdate(state, audiobook) {
    var index = state.audiobooks.findIndex(a => a.id === audiobook.id)
    if (index >= 0) {
      console.log('Audiobook Updated', audiobook)
      state.audiobooks.splice(index, 1, audiobook)
    } else {
      console.log('Audiobook Added', audiobook)
      state.audiobooks.push(audiobook)
    }

    state.listeners.forEach((listener) => {
      if (!listener.audiobookId || listener.audiobookId === audiobook.id) {
        listener.meth()
      }
    })
  },
  remove(state, audiobook) {
    console.log('Audiobook removed', audiobook)
    state.audiobooks = state.audiobooks.filter(a => a.id !== audiobook.id)

    state.listeners.forEach((listener) => {
      if (!listener.audiobookId || listener.audiobookId === audiobook.id) {
        listener.meth()
      }
    })
  },
  addListener(state, listener) {
    var index = state.listeners.findIndex(l => l.id === listener.id)
    if (index >= 0) state.listeners.splice(index, 1, listener)
    else state.listeners.push(listener)
  },
  removeListener(state, listenerId) {
    state.listeners = state.listeners.filter(l => l.id !== listenerId)
  }
}