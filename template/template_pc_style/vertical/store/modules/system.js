const state = {
  isCollapse: false
};

const mutations = {
  SET_ISCOLLAPSE: (state, isCollapse) => {
    state.isCollapse = isCollapse;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};

