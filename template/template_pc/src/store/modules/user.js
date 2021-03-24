import { login, getInfo } from '@/apis/portalApi';
import TokenFactory from '@/utils/tokenFactory'; // get token from cookie

const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    permission: ''
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginname, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: loginname.trim(), password: password }).then(response => {
        const { data } = response;
        TokenFactory.setToken(data.token);
        resolve();
      }).catch(error => {
        // console.log(error)
        reject(error);
      });
    });
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response;

        if (!data) {
          reject('Verification failed, please Login again.');
        }
        const { avatar, name } = data.user;
        commit('SET_NAME', name);
        commit('SET_PERMISSION', data.permissions);
        commit('SET_AVATAR', avatar);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  },

  // user logout
  loginOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout().then(() => {
      TokenFactory.clearToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
      // }).catch(error => {
      //   reject(error)
      // })
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      TokenFactory.clearToken(); // must remove  token  first
      commit('RESET_STATE');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
