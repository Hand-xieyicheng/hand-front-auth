import handRequest from '@/utils/requestHand';
import request from '@/utils/request';


export const getSelfData = (data) => {
  return handRequest({
    url: '/iam/hzero/v1/users/self',
    method: 'get',
  });
}

// 获取当前登录用户信息
export function getUserInfo(data) {
  return request({
    url: '/login/api/get-user-info',
    method: 'get',
    params: data,
  });
}

export const updateUserInfo = (data) => {
  return request({
    url: '/login/api/update-user-info',
    method: 'post',
    data,
  });
}
