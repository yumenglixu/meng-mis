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
import moment from 'moment';
const queryString = require('query-string');
const Option = Select.Option;
const RadioGroup = Radio.Group;
let Info = observer(class Merchants extends Component {
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
                                <div className="ant-row ant-form-item" style={{width: 220}}>
                                    <div className="ant-form-item-label">
                                        <span for="select" className="label">审核状态</span>
                                    </div>
                                    {getFieldDecorator('state', {initialValue:''})(
                                        <Select size="large" style={{width: 130}}>
                                            <Option value="">不限</Option>
                                            <Option value="1">待审核</Option>
                                            <Option value="2">审核通过</Option>
                                            <Option value="3">拒绝</Option>
                                        </Select>
                                    )}
                                </div>
                                <div className="ant-row ant-form-item" style={{width: 220}}>
                                    <div className="ant-form-item-label">
                                        <span for="select" className="label">商户名称</span>
                                    </div>
                                    {getFieldDecorator('name', {initialValue: ''})(
                                        <Input type="uid" placeholder="请输入商户名称" style={{width: 130}}/>
                                    )}
                                </div>
                                <div className="ant-row ant-form-item" style={{width: 220}}>
                                    <div className="ant-form-item-label">
                                        <span for="select" className="label">法人姓名</span>
                                    </div>
                                    {getFieldDecorator('prinName', {initialValue: ''})(
                                        <Input type="uid" placeholder="请输入法人姓名" style={{width: 130}}/>
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
                                <div className="ant-col-3">商户名称</div>
                                <div className="ant-col-6">商户所在省市区</div>
                                <div className="ant-col-2">商户法人</div>
                                <div className="ant-col-2">法人手机号</div>
                                <div className="ant-col-2">进件时间</div>
                                <div className="ant-col-2">操作时间</div>
                                <div className="ant-col-2">商户状态</div>
                                <div className="ant-col-3 col-center">操作</div>
                            </div>
                            {!this.initLoading && this.list.map((val, key) => {
                                return (
                                    <div className="ant-row review-content review-border" key={key}>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.id}</span>
                                        </div>
                                        <div className="ant-col-3 col-height">
                                            <span>{val.name}</span>
                                        </div>
                                        <div className="ant-col-6 col-height">
                                            <span>{val.address}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.prinName}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.mobileNo}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.incomeTime ? moment(val.incomeTime).format('YYYY-MM-DD') : ''}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.approveTime ? moment(val.approveTime).format('YYYY-MM-DD') : ''}</span>
                                        </div>
                                        <div className="ant-col-2 col-height">
                                            <span>{val.stateLable}</span>
                                        </div>
                                        <div className="ant-col-3 col-height handle-branch-menu">
                                            <Button type="ghost" onClick={() => {
                                               this.props.history.push(`/mis/merchants/info/${val.id}`);
                                            }}>查看详情</Button>       
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
        let {name, prinName, state} = this.props.form.getFieldsValue();
        console.log(this.props.form.getFieldsValue());
        Service.getMerchantsList({
            name,
            prinName,
            state,
            pageIndex: this.activePage,
            pageSize: 10
        }).then(res => {
            if (res.rspCode == '0000000000') {
                this.list = res.body.list.map(val => {
                    let stateLable = '待审核';
                    switch(+val.state) {
                        case 1:
                            stateLable = '待审核';
                        break; 
                        case 2:
                            stateLable = '审核通过';
                        break; 
                        case 3:
                            stateLable = '拒绝';
                        break; 
                    }
                    val.stateLable = stateLable;
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
