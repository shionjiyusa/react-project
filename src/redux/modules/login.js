import { fromJS } from 'immutable';
import cookie from 'react-cookies';
import { message } from 'antd';
import instance from 'utils/axios';

const LOGIN = 'login';
const LOGOUT = 'logout';

const defaultState = fromJS({
  isLogin: false,
  userInfo: {},
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return state.set('isLogin', true).set('userInfo', action.userInfo);
    case LOGOUT:
      return state.set('isLogin', false).set('userInfo', {});
    default:
      return state;
  }
};

export const loginActions = {
  login: (userInfo) => ({
    type: LOGIN,
    userInfo,
  }),
  loginAction: (params) => {
    return (dispatch) => {
      instance
        .post('api/login', {
          username: params.username,
          password: params.password,
          visaCode: params.visaCode,
          remember: params.remember,
        })
        .then((response) => {
          const { token } = response.data.data;
          const user = response.data.data;
          user.token = '';
          cookie.save('userToken', token, { path: '/' });
          cookie.save('user', user, { path: '/' });
          dispatch(loginActions.login(user));
        })
        .catch((e) => {
          if (e.response.data) {
            switch (e.response.data.errorCode) {
              case 4000:
                message.warning('评分失败，不能重复评分');
                break;
              case 4003:
                message.error('信息有误，登录失败');
                break;
              default:
                message.error('服务器故障');
                break;
            }
          }
        });
    };
  },
  logout: () => ({
    type: LOGOUT,
  }),
  logoutAction: () => {
    return (dispatch) => {
      instance
        .post('api/logout', {
          params: { uid: 1 },
        })
        .then((response) => {
          if (response.data.status === true) {
            cookie.remove('userToken', { path: '/' });
            cookie.remove('user', { path: '/' });
            dispatch(loginActions.logout());
          } else {
            message.error('服务器错误，注销失败');
            cookie.remove('userToken', { path: '/' });
            cookie.remove('user', { path: '/' });
          }
        })
        .catch(() => {
          cookie.remove('userToken', { path: '/' });
          cookie.remove('user', { path: '/' });
          message.error('服务器错误，注销失败');
        });
    };
  },
};
