import handRequest from '@/utils/requestHand';


export const getSelfData = (data) => {
  return handRequest({
    url: '/iam/hzero/v1/users/self',
    method: 'get',
  });
}
