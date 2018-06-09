import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from "mobx-react";
import {extendObservable, observable, autorun} from "mobx";
import moment from 'moment';
import {
    Icon,
    Input,
    InputNumber,
    Select,
    Cascader,
    Upload,
    Button,
    Pagination,
    DatePicker,
    message,
    Radio,
    Steps
} from 'antd';
import objectAssign from 'object-assign';
import { Label } from 'react-bootstrap';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import MyActionSheetChoose from '../components/MyActionSheetChoose';
import Service from '../config/service';
import  utils from '../config/utils';
import Cookies from 'js-cookie';
import config from '../config/config';
const RadioGroup = Radio.Group;
const queryString = require('query-string');
const Option = Select.Option;
const Step = Steps.Step;
export default observer(class CourseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            total: 10
        }
        extendObservable(this, {
            id: this.props.match.params.id, 
            corid: JSON.parse(Cookies.get('userInfo')).corid,
            catelist: [],
            detailInfo: {
                rows:  [],
                cstartDate: moment(),
                cendDate: moment(),
                eendDate: moment(),
                settleAmount: 0,
                courseAttr: 1
            },


            list: [],
            activePage: 1,
            initLoading: false,
        });
        this.getCate();
    }

    render() {
        return (
            <div className="base-info">
                {this.detailInfo.state >= 0 && (
                    <div className="state-main">
                        <i className={"state-icon state-icon-" + this.detailInfo.state}></i>
                        <span className={"state-" + this.detailInfo.state}>{config.state[this.detailInfo.state]}</span>
                    </div>
                )}
                <div className="title-box">课程详情</div>
                <div className="box-input m-entry clearfix">
                    <dl className="col-6">
                        <dt>课程名称</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入课程名称（15个字）" readOnly value={this.detailInfo.name}/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>课程品类</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text" readOnly  placeholder="请输入行业分类" value={this.detailInfo.categoryName}/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-4">
                        <dt>课程价格</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="number" placeholder="请输入课程价格" readOnly value={this.detailInfo.price}/>
                                <div className="unit">元</div>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-4">
                        <dt>价格单位</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"   placeholder="请输入价格单位" readOnly value={this.detailInfo.priceUnit}/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-4">
                        <dt>预期结算</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text" readOnly  placeholder="请输入预期结算" readOnly value={this.detailInfo.settleAmount}/>
                                <div className="unit">元/ 订单</div>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-4">
                        <dt>课程开始日期</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text" readOnly  placeholder="YYYY-MM-DD" readOnly value={moment(this.detailInfo.cstartDate).format('YYYY-MM-DD')}/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-4">
                        <dt>课程结束日期</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text" readOnly  placeholder="YYYY-MM-DD" readOnly value={moment(this.detailInfo.cendDate).format('YYYY-MM-DD')}/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-4">
                        <dt>报名截止日期</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text" readOnly  placeholder="YYYY-MM-DD" readOnly value={moment(this.detailInfo.eendDate).format('YYYY-MM-DD')}/>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>课程属性</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <RadioGroup  value={this.detailInfo.courseAttr || 1}>
                                    <Radio key="1" value={'1'}>周末课程</Radio>
                                    <Radio key="2" value={'2'}>寒暑假课程</Radio>
                                    <Radio key="3" value={'3'}>国际课程</Radio>
                                </RadioGroup>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className="title-box">课程照片，最多6张照片</div>
                <div className="user-img">
                    {this.detailInfo.rows.length > 0 ?  this.detailInfo.rows.map((lv, lk) => {
                        return (
                            <div className="col-2" style={{height: 160}} key={lk}>
                                <div className={"ant-upload ant-upload-drag " + (lv.imgLinks && "no-b-all")}>
                                    <div className="img">
                                        <div className="img-container" style={{backgroundImage: `url(${config.HOST_IMG}${lv.imgLinks}?t=${moment()})`}}></div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : (
                        <NoData show={true}/>
                    )}
                </div>
                <div className="title-box">其他信息</div>
                <div className="box-input m-entry clearfix">
                    <dl>
                        <dt>上课地址</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入上课地址" value={this.detailInfo.address} readOnly/>
                            </div>
                        </dd>
                    </dl>  
                    <dl className="col-6">
                        <dt>视频信号有效</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <RadioGroup value={this.detailInfo.videoState || 0}>
                                    <Radio key="0" value={0}>开启直播</Radio>
                                    <Radio key="1" value={1}>关闭直播</Radio>
                                </RadioGroup>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>视频播放地址</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"  placeholder="请输入视频播放地址" value={this.detailInfo.videoPlayLink} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className={this.props.type === 'add' ? 'col-12' : 'col-6'}>
                        <dt>适合年龄</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="比如 18岁-20岁" value={this.detailInfo.properAges} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>已参加人数</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text" readOnly   value={this.detailInfo.cecount || 0}/>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>备注信息</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"  placeholder="请输入备注信息" value={this.detailInfo.description} readOnly/>
                            </div>
                        </dd>
                    </dl>
                </div>
                {this.id && (
                    <div>
                        <div className="title-box">
                            班级管理
                        </div>
                        <div className="review-list-container">
                            <div className="review-table">
                                <div className="ant-row review-border review-head">
                                    <div className="ant-col-2">序号</div>
                                    <div className="ant-col-7">班级名称</div>
                                    <div className="ant-col-7">上课时间说明</div>
                                    <div className="ant-col-2">班级上课人数</div>
                                    <div className="ant-col-2">班级状态</div>
                                    <div className="ant-col-4">更新时间</div>
                                </div>
                                {!this.initLoading && this.list.map((val, key) => {
                                    return (
                                        <div className="ant-row review-content review-border" key={key}>
                                            <div className="ant-col-2 col-height">
                                                <span>{val.id}</span>
                                            </div>
                                            <div className="ant-col-7 col-height">
                                                <span>{val.name}</span>
                                            </div>
                                            <div className="ant-col-7 col-height">
                                                <span>{val.classTime}</span>
                                            </div>
                                            <div className="ant-col-2 col-height">
                                                <span>{val.pcount}</span>
                                            </div>
                                            <div className="ant-col-2 col-height">
                                                <span>{val.classStatus == 0 ? '生效' : '失效'}</span>
                                            </div>
                                            <div className="ant-col-4 col-height">
                                                <span>{val.gmtModified}</span>
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
                )}
                <div className="group-btn" style={{marginTop: 25}}>
                    {this.detailInfo.state == 3 && (
                        <button className="input-btn input-btn-red" onClick={this.updateState.bind(this, 5)}>
                            下线
                        </button>
                    )}
                    {this.detailInfo.state == 5 && (
                        <button className="input-btn btn-primary" onClick={this.updateState.bind(this, 3)}>
                            上线
                        </button>
                    )}
                    {this.detailInfo.state != 4 && (
                        <button className="input-btn input-btn-red" onClick={this.updateState.bind(this, 4)}>
                            拒绝
                        </button>
                    )}
                    <button className="input-btn input-btn-white" onClick={() => {
                        this.props.history.push('/mis/course');
                    }}>返回</button>
                </div>
            </div>
        );
    }
    getCate() {
        Service.getCategory({
            pageIndex: 1,
            pageSize: 10000
        }).then((res)=>{
            let info = {};
            if (res.rspCode == '0000000000' && res.body) {
                this.catelist = res.body.list.map(val => {
                   return {
                       name: val.categoryName,
                       key: val.id
                   }
                });
                if (this.props.type != 'add') {
                    this.getDetail();
                    this.getClassList();
                }
            }
        });
    }
    /**
     * 获取详情
     */
    getDetail() {
        message.loading('信息加载中', 3);
        let info = Cookies.get('userInfo');
        Service.getCourseDetail({
            id: this.id
        }).then((res)=>{
            let info = {};
            if (res.rspCode == '0000000000' && res.body) {
                let categoryName = '';
                this.catelist.forEach(val => {
                    if (val.key == res.body.categoryId) {
                        categoryName = val.name;
                    }
                });
                res.body.settleAmount = 0;
                res.body.categoryName = categoryName;
                this.detailInfo = res.body;
                this.priceCourse(this.detailInfo.price);
            }
            message.destroy();
        });
    }

    priceCourse(price) {
        Service.settleAmount({
            corId: this.corid,
            originalAmount: parseFloat(price).toFixed(2)
        }).then((res)=>{
            if (res.rspCode == '0000000000' && res.body) {
                this.detailInfo.settleAmount = res.body.settleAmount;
            }
        });
    }

    updateState(state) {
        Service.updateCourse({
            id: this.id,
            state
        }).then(res => {
            if (res.rspCode == '0000000000') {
                this.detailInfo.state = state;
                message.success('操作成功');
            }
            else {
                message.error(res.rspMsg || '未知原因导致失败');
            }
        });
    }


    // 获取班级信息
    getClassList() {
        Service.getClassList({
            pageIndex: this.activePage,
            pageSize: 10,
            courseId: this.id
        }).then((res)=>{
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
});
