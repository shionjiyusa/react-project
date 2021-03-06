/**
 * 首页跑马灯图片数组
 */
import { fromJS } from 'immutable';
import { message } from 'antd';
import instance from 'utils/axios';

const INIT_PICTURE_BOX = 'initPictureBox';

const defaultState = fromJS({
  pictureBox: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case INIT_PICTURE_BOX:
      return state.set('pictureBox', action.picture);
    default:
  }
  return state;
};

export const pictureBoxActions = {
  initPictureBoxAction: (picture) => ({
    type: INIT_PICTURE_BOX,
    picture,
  }),

  getPictureAction: () => {
    return (dispatch) => {
      instance('api/pictureBox')
        .then((response) => {
          const action = pictureBoxActions.initPictureBoxAction(response.data.data);
          dispatch(action);
        })
        .catch(() => {
          message.warning('服务器故障');
        });
    };
  },
};
