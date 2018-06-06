import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {observer} from "mobx-react";
import {extendObservable, observable, autorun} from "mobx";
import {Icon, Tooltip, Input, InputNumber, Select, Cascader, Upload, message} from 'antd';
import objectAssign from 'object-assign';
import Service from '../config/service';
import config from '../config/config';
const queryString = require('query-string');
const Option = Select.Option;
const Dragger = Upload.Dragger;
const areaData = [{
    value: 'shanghai',
    label: '上海',
    children: [{
      value: 'shanghaishi',
      label: '上海市',
      children: [{
        value: 'pudongxinqu',
        label: '浦东新区',
      }],
    }],
  }];
  
export default observer(class MerchantsInfo extends Component {
    constructor(props) {
        super(props);
        extendObservable(this, {
            id: this.props.match.params.id, 
            detailInfo: {
                coachs: [],
                cityDes: ''
            }
        });
        this.getDetail();
    }

    render() {
        return (
            <div className="base-info">
                <div className="title-box">机构信息</div>
                <div className="box-input m-entry clearfix">
                    <dl>
                        <dt>机构名称</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text"  placeholder="请输入机构名称" value={this.detailInfo.name} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>机构地址</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"   placeholder="请输入机构地址" value={(this.detailInfo.cityDes.split(':').join('-') || '') + ' ' + this.detailInfo.address} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>机构电话</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"   placeholder="请输入机构电话" value={this.detailInfo.contractNumber} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>负责人姓名</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入负责人姓名" value={this.detailInfo.prinName} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>身份证号</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入身份证号" value={this.detailInfo.idCardNo} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>手机号</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="number" placeholder="请输入手机号" value={this.detailInfo.mobileNo} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>电子邮件</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入电子邮件" value={this.detailInfo.email} readOnly/>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className="title-box">身份证信息</div>
                <div className="user-img">
                    {this.detailInfo.coachs[0] && (
                        <div className="fl pr " style={{ width: 258, height: 160, marginRight: 12}}>
                            <div className="ant-upload ant-upload-drag no-b-all">         
                                <div className="img">
                                    <img  src={config.HOST_IMG + this.detailInfo.coachs[0].imgLinks}/>
                                    <span className="tag">身份证正面</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {this.detailInfo.coachs[1] && (
                        <div className="fl pr " style={{ width: 258, height: 160, marginRight: 12}}>
                            <div className="ant-upload ant-upload-drag no-b-all">
                                <div className="img">
                                    <img  src={config.HOST_IMG + this.detailInfo.coachs[1].imgLinks}/>
                                    <span className="tag">身份证反面</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {this.detailInfo.coachs[2] && (
                        <div className="fl pr " style={{ width: 258, height: 160}}>
                            <div className="ant-upload ant-upload-drag no-b-all">
                                <div className="img">
                                    <img  src={config.HOST_IMG + this.detailInfo.coachs[2].imgLinks}/>
                                    <span className="tag">手持身份证照片</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="title-box">银行信息</div>
                <div className="box-input m-entry clearfix">
                    <dl className="col-6">
                        <dt>开户银行</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入银行卡号" value={this.detailInfo.bankName} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>开户支行</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"   placeholder="请输入开户银行"  value={this.detailInfo.branchBankName} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>开户行省份</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"  placeholder="请输入开户行省份" value={this.detailInfo.bankProvinceName + '-' + this.detailInfo.bankCityName} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>开户行城市</dt>
                        <dd className="wrap-sug"  onClick={() => {
                            this.settingModal = !this.settingModal;
                        }}>
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"  placeholder="请输入开户行城市" value={this.detailInfo.bankCity} readOnly/>
                            </div>
                        </dd>
                        <i className="select-shixin-arrow"></i>
                    </dl>
                    <dl className="col-6">
                        <dt>开户名称</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入负责人姓名" value={this.detailInfo.accountName} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>账号</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入身份证号" value={this.detailInfo.account} readOnly/>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className="title-box">轧差配置</div>
                <div className="box-input m-entry clearfix">
                    <dl className="col-6">
                        <dt>轧差配置方式</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text" readOnly  placeholder="请输入轧差配置方式" value={this.detailInfo.rollDiffWay == 1 ? '按比例折扣' : '金额扣减'} readOnly/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>轧差配置数值</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="number" placeholder="请输入银行卡号" value={this.detailInfo.rollDiffVal} readOnly/>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className="title-box">登录账号配置</div>
                <div className="box-input m-entry clearfix">
                    <dl className="col-6">
                        <dt>登记账户名称</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput" type="text"   placeholder="请输入登记账户名称" value={this.detailInfo.userAccount}/>
                            </div>
                        </dd>
                    </dl>
                    <dl className="col-6">
                        <dt>登记账户密码</dt>
                        <dd className="wrap-sug">
                            <div className="u-sug" id="u-sug">
                                <input className="sugInput"  type="text" placeholder="请输入登记账户密码" value={this.detailInfo.password} onChange={(v) => {
                                    this.detailInfo.password = v.target.value;
                                }}/>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className="group-btn" style={{marginTop: 25}}>
                    {this.detailInfo.state != 2 && (
                        <button className="input-btn btn-primary" onClick={this.handle.bind(this, 2)}>审核通过</button>
                    )}
                    {this.detailInfo.state != 2 && (
                        <button className="input-btn input-btn-red"  onClick={this.handle.bind(this, 3)}>审核拒绝</button>
                    )}
                    <button className="input-btn input-btn-white" onClick={() => {
                        this.props.history.push('/mis/merchants/list');
                    }}>返回</button>
                </div>
            </div>
        );
    }

    /**
     * 获取详情
     */
    getDetail() {
        message.loading('信息加载中', 3);
        Service.getMerchantsInfo({
            id: this.id
        }).then((res)=>{
            if (res.rspCode == '0000000000') {
                this.detailInfo = res.body;
            }
            else {
                message.error(res.rspMsg || '操作失败');
            }
            message.destroy();
        });
    }
    handle(state) {
        message.loading('信息修改中', 3);
        this.detailInfo.state = state;
        Service.updateMerchantsInfo(this.detailInfo).then((res)=>{
            message.destroy();
            if (res.rspCode == '0000000000') {
                message.success('操作成功');
            }
            else {
                message.error(res.rspMsg || '未知原因导致失败');
            }
        });
    }
});
