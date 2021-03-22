const getters = {
  isCollapse: state => state.system.isCollapse,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission: state => state.user.permission
};
export default getters;
