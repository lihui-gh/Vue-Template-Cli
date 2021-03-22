/**
 * 用户鉴权相关Api
 *
 */

import request from '../utils/customAxios';

export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  });
}

export function getInfo() {
  return request({
    url: 'api/v1/getloginuser',
    method: 'get'
  });
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  });
}
