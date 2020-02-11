import React from 'react';

export default function Login() {
    return (
        <div className="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">用户登陆</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form action="login.php">
                        帐号：<input type="text" name="account" placeholder="邮箱/用户名"/><br />
                        密码：<input type="password" name="passwd" style={{margin:'10px 0'}} /><br />
                        验证码：<input type="text" size="6" name="checkcode"/>
                        <img width="100px" title="点击切换" height="30px" style={{marginLeft:'20px'}} />
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">登陆</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">关闭</button>
                </div>
                </div>
            </div>
        </div>
    );
}