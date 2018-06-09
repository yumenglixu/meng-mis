import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from "mobx-react";
import {extendObservable, observable, autorun} from "mobx";
import {
    Icon,
    Tooltip,
    Form,
    Input,
    InputNumber,
    Select,
    Cascader,
    Upload,
    Button,
    Pagination,
    message
} from 'antd';
import objectAssign from 'object-assign';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Service from '../config/service';
import config from '../config/config';
const queryString = require('query-string');
const Option = Select.Option;
let Info = observer(class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 10
        }
        extendObservable(this, {
            list: [],
            activePage: 1,
            initLoading: true
        });
        this.reset();
    }

    render() {
        let {form: {getFieldDecorator}} = this.props;
        return (
            <div className="base-info">
                <div className="review-container">
                    <div className="review-filter">
                        <Form className="ant-row review-border review-head">
                            <Form layout="inline">
                                <div className="ant-row ant-form-item" style={{width: 250}}>
                                    <div className="ant-form-item-label">
                                        <label for="select" >机构名称</label>
                                    </div>
                                    {getFieldDecorator('corporateName', {initialValue: ''})(
                                        <Input type="uid" placeholder="请输入机构名称" style={{width: 150}}/>
                                    )}
                                </div>
                                <div className="ant-row ant-form-item" style={{width: 250}}>
                                    <div className="ant-form-item-label">
                                        <label for="select" >课程名称</label>
                                    </div>
                                    {getFieldDecorator('name', {initialValue: ''})(
                                        <Input type="text" placeholder="请输入课程名称" style={{width: 150}}/>
                                    )}
                                </div>
                                <div className="ant-row ant-form-item" style={{width: 250}}>
                                    <div className="ant-form-item-label">
                                        <label for="select" >课程状态</label>
                                    </div>
                                    {getFieldDecorator('state', {initialValue:''})(
                                        <Select id="select" size="large" initialValue="" style={{width: 150}}>
                                            <Option value="">不限</Option>
                                            <Option value="1">待提交</Option>
                                            <Option value="2">待审核</Option>
                                            <Option value="4">待发布</Option>
                                            <Option value="3">已上线</Option>
                                            <Option value="5">已下线</Option>
                                        </Select>
                                    )}
                                </div>

                                <Button type="primary" onClick={this.reset.bind(this)}>查 询</Button>
                            </Form>
                        </Form>
                    </div>
                    <div className="review-list-container">
                        <div className="review-table">
                            <div className="ant-row review-border review-head">
                                <div className="ant-col-2">进件ID</div>
                                <div className="ant-col-2">课程分类</div>
                                <div className="ant-col-4">课程名称</div>
                                <div className="ant-col-4">机构名称</div>
                                <div className="ant-col-2">课程单价</div>
                                <div className="ant-col-2">进件时间</div>
                                <div className="ant-col-2">课程状态</div>
                                <div className="ant-col-2">发起人</div>
                                <div className="ant-col-4 col-center">操作</div>
                            </div>
                            {!this.initLoading && this.list.map((val, key) => {
                                return (
                                    <div className="ant-row review-content review-border" key={key}>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.id}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.categoryName}</span>
                                        </div>
                                        <div className="ant-col-4 col-height">
                                            <span>{val.name}</span>
                                        </div>
                                        <div className="ant-col-4 col-height">
                                            <span>{val.corporateName}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.price}元 / {val.priceUnit}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.cendDate}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.stateLable}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.createUserName}</span>
                                        </div>
                                        <div className="ant-col-4 col-height handle-branch-menu">
                                            {val.state == 3 && (
                                                <Button type="ghost" onClick={this.updateState.bind(this, val, 5)}>下线</Button>
                                            )}
                                            {val.state == 5 && (
                                                <Button type="ghost" onClick={this.updateState.bind(this, val, 3)}>上线</Button>
                                            )}
                                            {val.state != 4 && (
                                                <Button type="ghost" className="ant-btn-red" onClick={this.updateState.bind(this, val, 4)}>拒绝</Button>
                                            )}
                                            <Button type="ghost" onClick={() => {
                                                this.props.history.push(`/mis/course/info/${val.id}`);    
                                            }}>详情</Button>
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
                                    this.getList();
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
    reset() {
        this.activePage = 1;
        this.initLoading = true;
        this.getList();
    }
    getList() {
        this.initLoading = true;
        let {name, state, corporateName} = this.props.form.getFieldsValue();
        Service.getCourseList({
            name,
            state,
            corporateName,
            pageIndex: this.activePage,
            pageSize: 10
        }).then(res => {
            if (res.rspCode == '0000000000') {
                this.list = res.body.list.map(val => {
                    val.stateLable = config.state[val.state]
                    return val;
                });
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
    updateState(val, state) {
        Service.updateCourse({
            id: val.id,
            state
        }).then(res => {
            if (res.rspCode == '0000000000') {
                val.state = state;
                val.stateLable = config.state[state]
                message.success('操作成功');
            }
            else {
                message.error(res.rspMsg || '未知原因导致失败');
            }
        });
    }

});

Info = Form.create()(Info);
export default Info;
