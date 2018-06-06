import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from "mobx-react";
import {extendObservable, observable, autorun, computed} from "mobx";
import {
    Icon,
    Tooltip,
    Form,
    Input,
    message,
    Select,
    Popconfirm,
    Upload,
    Button,
    Radio,
    Pagination
} from 'antd';
import objectAssign from 'object-assign';
import { Label } from 'react-bootstrap';
import Modal from '../components/Modal';
import MyActionSheetChoose from '../components/MyActionSheetChoose';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import config from '../config/config';
import Service from '../config/service';
const queryString = require('query-string');
const Option = Select.Option;
const RadioGroup = Radio.Group;
let Info = observer(class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            total: 10
        }
        extendObservable(this, {
            showModal: false,
            titleModal: '',
            handleType: 'add',
            roleModal: false,
            userModal: false,
            user: {
                id: '',
                account: '',
                password: '',
                email: '',
                mobileNo: '',
                gender: 0,
                imgHead: 'http://thirdqq.qlogo.cn/g?b=sdk&k=VD0fzkMRZQB7PT09DaCtiaQ&s=640&t=1483366371',
                corid: '',
                userType: 1,
                roleType: 1
            },
            userTypeName: computed(()=>{
                let name = '';
                config.userType.forEach(val => {
                    if (val.key == this.user.userType) {
                        name = val.name;
                    }
                })
                return name;
            }),
            roleTypeName: computed(()=>{
                let name = '';
                config.roleType.forEach(val => {
                    if (val.key == this.user.roleType) {
                        name = val.name;
                    }
                })
                return name;
            }),
            list: [],
            activePage: 1,
            initLoading: true
        });
        this.getList();
    }

    render() {
        let {form: {getFieldDecorator}} = this.props;
        return (
            <div className="base-info">
                <div className="review-container">
                    <div className="review-filter">
                        <Form className="ant-row review-border review-head">
                            <Form layout="inline">
                                <div className="ant-row ant-form-item" style={{width: 180}}>
                                    <div className="ant-form-item-label">
                                        <span for="select" className="label" title="姓名">姓名</span>
                                    </div>
                                    {getFieldDecorator('account', {initialValue: ''})(
                                        <Input type="uid" placeholder="请输入用户姓名" style={{width: 130}}/>
                                    )}
                                </div>
                                <div className="ant-row ant-form-item" style={{width: 180}}>
                                    <div className="ant-form-item-label">
                                        <span for="select" className="label" title="邮箱">邮箱</span>
                                    </div>
                                    {getFieldDecorator('email', {initialValue: ''})(
                                        <Input type="uid" placeholder="请输入用户邮箱" style={{width: 130}}/>
                                    )}
                                </div>
                                <div className="ant-row ant-form-item" style={{width: 180}}>
                                    <div className="ant-form-item-label">
                                        <span for="select" className="label" title="姓名">电话</span>
                                    </div>
                                    {getFieldDecorator('mobileNo', {initialValue: ''})(
                                        <Input type="uid" placeholder="请输入用户姓名" style={{width: 130}}/>
                                    )}
                                </div>
                                <div className="ant-row ant-form-item" style={{width: 220}}>
                                    <div className="ant-form-item-label">
                                        <span for="select" className="label" title="权限类别">权限类别</span>
                                    </div>
                                    {getFieldDecorator('userType', {initialValue:''})(
                                        <Select id="select" size="large" initialValue="" style={{width: 130}}>
                                            <Option value="">不限</Option>
                                            <Option value="1">cms人员</Option>
                                            <Option value="2">mis人员</Option>
                                        </Select>
                                    )}
                                </div>
                                <div className="ant-row ant-form-item" style={{width: 220}}>
                                    <div className="ant-form-item-label">
                                        <span for="select" className="label" title="权限类别">角色类别</span>
                                    </div>
                                    {getFieldDecorator('roleType', {initialValue:''})(
                                        <Select id="select" size="large" initialValue="" style={{width: 150}}>
                                            <Option value="">不限</Option>
                                            <Option value="1">员工</Option>
                                            <Option value="2">经理</Option>
                                        </Select>
                                    )}
                                </div>
                                <Button type="primary" onClick={this.reset.bind(this)}>查 询</Button>
                                <Button type="danger" className="fr" onClick={() => {
                                    this.titleModal = '添加人员';
                                    this.handleType = 'add';
                                    this.showModal = true;
                                }}>
                                    <Icon type="plus" />
                                    添加人员
                                </Button>
                            </Form>
                        </Form>
                    </div>
                    <div className="review-list-container">
                        <div className="review-table">
                            <div className="ant-row review-border review-head">
                                <div className="ant-col-2">序号</div>
                                <div className="ant-col-6">账号姓名</div>
                                <div className="ant-col-2">权限类别</div>
                                <div className="ant-col-2">角色类型</div>
                                <div className="ant-col-3">手机号</div>
                                <div className="ant-col-3">电子邮件</div>
                                <div className="ant-col-3 col-center">性别</div>
                                <div className="ant-col-3 col-center">操作</div>
                            </div>
                            {!this.initLoading && this.list.map((val, key) => {
                                return (
                                    <div className="ant-row review-content review-border" key={key}>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.id}</span>
                                        </div>
                                        <div className="ant-col-6 col-height">
                                            <span>{val.account}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.userType == 1 ? 'cms人员' : 'mis人员'}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.roleType == 1 ? '员工' : '经理'}</span>
                                        </div>
                                        <div className="ant-col-3 col-height">
                                            <span>{val.mobileNo}</span>
                                        </div>
                                        <div className="ant-col-3 col-height">
                                            <span>{val.email}</span>
                                        </div>
                                        <div className="ant-col-3 col-height">
                                            <span>{val.gender == 0 ? '男' : '女'}</span>
                                        </div>
                                        <div className="ant-col-3 col-height handle-branch-menu">
                                            <Button type="ghost" onClick={() => {
                                                this.titleModal = '修改人员信息';
                                                this.handleType = 'update';
                                                for (let prop in val) {
                                                    if (this.user.hasOwnProperty(prop)) {
                                                        this.user[prop] = val[prop];
                                                    }
                                                }
                                                this.showModal = true;
                                            }}>修改</Button>
                                            <Popconfirm placement="topRight" title={'确定要删除该用户吗？'} onConfirm={this.delUser.bind(this, val.id)}>
                                                <Button type="ghost">删除</Button>
                                            </Popconfirm>         
                                        </div>
                                    </div>
                                )
                            })}
                            <Loading show={this.initLoading} message={"加载中..."}/>
                            <NoData show={!this.initLoading && !this.list.length}/>
                        </div>
                        {this.list.length > 0 && (
                            <Pagination
                                selectComponentClass={Select}
                                total={this.state.total}
                                showTotal={total => `共 ${total} 条`}
                                pageSize={10}
                                current={this.activePage}
                                defaultCurrent={this.activePage}
                                onChange={(noop) => {
                                    this.activePage = noop;
                                }}
                            />
                        )}
                    </div>
                </div>
                <Modal 
                    show={this.showModal}
                    title={this.titleModal}
                    onClose={() => {
                        this.showModal = false;
                    }}
                    onSubmit={() => {
                        this.handleUser();
                    }}
                >
                    {this.renderUser()}
                </Modal>
            </div>
        );
    }
    renderUser() {
        return (
            <ul>
                <li className="item border-t userName">
                    <input type="text" className="the_input topSpecial users_tel" value={this.user.account}  onChange={(v) => {
                        this.user.account = v.target.value;
                    }} placeholder="请输入账号"/>
                </li>
                <li className="item border-t userName">
                    <input type="text" className="the_input topSpecial users_tel" value={this.user.password}  onChange={(v) => {
                        this.user.password = v.target.value;
                    }} placeholder="请输入密码"/>
                </li>
                <li className="item border-t userName">
                    <Label>性别</Label>
                    <RadioGroup onChange={(e) => {
                        this.user.gender = e.target.value;
                    }} value={this.user.gender}>
                        <Radio key="0" value={0}>男</Radio>
                        <Radio key="1" value={1}>女</Radio>
                    </RadioGroup>
                </li>
                <li className="item border-t userName">
                    <input type="text" className="the_input topSpecial users_tel" value={this.user.mobileNo}  onChange={(v) => {
                        this.user.mobileNo = v.target.value;
                    }} placeholder="请输入手机号"/>
                </li>
                <li className="item border-t userName">
                    <input type="text" className="the_input topSpecial users_tel" value={this.user.email}  onChange={(v) => {
                        this.user.email = v.target.value;
                    }} placeholder="请输入邮箱"/>
                </li>
                <li className="item border-t userName">
                    <input type="text" className="the_input topSpecial users_tel" value={this.user.corid}  onChange={(v) => {
                        this.user.corid = v.target.value;
                    }} placeholder="请输入机构"/>
                </li>
                <li className="item border-t userName">
                    <input type="text" className="the_input topSpecial users_tel" readOnly value={this.userTypeName} placeholder="请选择权限类别" onClick={() => {
                        this.userModal = !this.userModal;
                    }}/>
                    <i className="select-shixin-arrow"></i>
                    <MyActionSheetChoose
                        maskClosable={true}
                        index ={this.user.userType || ''}
                        data={config.userType}
                        top={48}
                        onClose={() => {     
                            this.userModal = false;
                        }}
                        onChange={(val) => {  
                            if (val) {
                                this.user.userType = val.key;
                            }
                            this.userModal = false;
                        }}
                        visible={this.userModal}>
                    </MyActionSheetChoose>
                </li>
                <li className="item border-t userName">
                    <input type="text" className="the_input topSpecial users_tel" readOnly value={this.roleTypeName} placeholder="请选择角色类别" onClick={() => {
                        this.roleModal = !this.roleModal;
                    }}/>
                    <i className="select-shixin-arrow"></i>
                    <MyActionSheetChoose
                        maskClosable={true}
                        index ={this.user.roleType || ''}
                        data={config.roleType}
                        top={48}
                        onClose={() => {     
                            this.roleModal = false;
                        }}
                        onChange={(val) => {  
                            if (val) {
                                this.user.roleType = val.key;
                            }
                            this.roleModal = false;
                        }}
                        visible={this.roleModal}>
                    </MyActionSheetChoose>
                </li>
            </ul> 
        )
    }
    handleUser() {
        Service.updateUser(this.user, this.handleType).then(res => {
            if (res.rspCode == '0000000000') {
                this.reset();
                this.showModal = false;
            }
            else {
                message.error(res.rspMsg || '操作失败');
            }
        });   
    }
    reset() {
        this.activePage = 1;
        this.initLoading = true;
        this.getList();
    }
    getList() {
        this.initLoading = true;
        let {account, email, roleType, userType, mobileNo} = this.props.form.getFieldsValue();
        Service.getUserList({
            account,
            email,
            roleType,
            userType,
            mobileNo,
            pageIndex: this.activePage,
            pageSize: 10
        }).then(res => {
            if (res.rspCode == '0000000000') {
                this.list = res.body.list;
                this.setState({
                    total: parseInt(res.body.totalNum, 10)
                });
            }
            else {
                this.list = [];
                this.setState({
                    total: 0
                });
            }
            this.initLoading = false;
        });
    }
    delUser(id) {
        Service.delUserInfo({
            id
        }).then(res => {
            if (res.rspCode == '0000000000') {
                this.reset();
            }
            else {
                message.error(res.rspMsg || '操作失败');
            }
        });  
    }
});

Info = Form.create()(Info);
export default Info;
