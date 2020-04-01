/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { Tag, Slider, Button, Modal } from 'antd';
import { Content, PictureWrapper, Block } from './style';
import { pictureActions } from '../../redux/modules/picture';

class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newScore: 0,
    };
    this.deleteTag = this.deleteTag.bind(this);
    this.showTagInput = this.showTagInput.bind(this);
    this.deleteScore = this.deleteScore.bind(this);
    this.addScore = this.addScore.bind(this);
  }

  componentDidMount() {
    // 使滚动条回到最顶端
    window.scrollTo(0, 0);
  }

  // 删除 tag
  deleteTag = () => {};

  // 弹出 Modal 增加 tag
  showTagInput = () => {
    return <Button>增加 Tag</Button>;
  };

  // 删除评分
  deleteScore = () => {};

  // 添加评分
  addScore = () => {
    Modal.confirm({
      // TODO: 评分成功后刷新
      content: '确认评分吗？',
      onOk: () => {
        // 评分图片，分值。用户 uid 在 ajax 请求中读取并传递
        this.props.addScore(this.props.pictureData.picture_id, this.state.newScore);
      },
      onCancel() {
        return null;
      },
    });
  };

  // 保存当前评分，为提交评分做准备
  handleNewScore = (newScore) => {
    this.setState({ newScore });
  };

  render() {
    const { create_time, picture_dir, total_score, tags = [] } = this.props.pictureData || {};
    const user = 'yusa'; // TODO: 投稿人
    return (
      <Content>
        <PictureWrapper>
          <img src={picture_dir} alt="loading" />
        </PictureWrapper>
        <Block>
          <div className="titleWrapper">
            当前总分：
            <span className="totalScore">{total_score}</span>
          </div>
          <div className="titleWrapper">
            {/* TODO: 展示所有评分 */}
            <Tag
              title={user}
              color="red"
              closable
              onClose={(e) => {
                e.preventDefault();
                this.deleteScore();
              }}
            >
              80
            </Tag>
          </div>
          <div className="newScore">
            <Slider
              className="slider"
              defaultValue={80}
              onChange={(score) => {
                this.handleNewScore(score);
              }}
            />
            <Button type="danger" onClick={this.addScore}>
              增加评分
            </Button>
          </div>
          <div className="titleWrapper">
            {tags.map((tag) => (
              <div
                className="tagStyle"
                title={user}
                color="cyan"
                closable
                onClose={(e) => {
                  e.preventDefault();
                  this.handleDelTag();
                }}
              >
                #{tag.tag}
              </div>
            ))}
            <Tag onClick={this.showTagInput} className="site-tag-plus">
              + 新标签
            </Tag>
            {this.tagInput}
          </div>
          <div className="foot">
            <span>
              投稿时间：
              {Moment(Number(`${create_time}000`)).format('YYYY-MM-DD')}
            </span>
            <div>
              投稿人：
              {user}
            </div>
          </div>
        </Block>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pictureData: state.picture.get('pictureData'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addScore: (pid, score) => {
      dispatch(pictureActions.addScore(pid, score));
    },
    deleteScore: () => {
      dispatch();
    },
    addTag: (pid, tag) => {
      // TODO: 发送 tag action
      const { picture_id } = this.props.pictureData;
      dispatch(pictureActions.addTag(pid, tag));
    },
    deleteTag: () => {
      dispatch();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Picture);
