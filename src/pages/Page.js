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
    Upload
} from 'antd';
import objectAssign from 'object-assign';
const queryString = require('query-string');
const FormItem = Form.Item;
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
  

let Info = observer(class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            total: 0
        }
        extendObservable(this, {
           baseInfo: {
               name: ''
           }
        });
        
    }

    render() {
        let {form: {getFieldDecorator}} = this.props;
        return (
            <div className="base-info">
                <div className="title-box">机构介绍、历史、荣誉、业务、资质，最多6张照片</div>
                <div className="user-img">
                    <div className="col-2" style={{height: 160}}>
                        <div className="ant-upload ant-upload-drag">
                            <div className="ant-upload ant-upload-btn">
                                <div className="ant-upload-drag-container"><Icon type="upload" /><span>请上传照片</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2" style={{height: 160}}>
                        <div className="ant-upload ant-upload-drag">
                            <div className="ant-upload ant-upload-btn">
                                <div className="ant-upload-drag-container"><Icon type="upload" /><span>请上传照片</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2" style={{height: 160}}>
                        <div className="ant-upload ant-upload-drag">
                            <div className="ant-upload ant-upload-btn">
                                <div className="ant-upload-drag-container"><Icon type="upload" /><span>请上传照片</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2" style={{height: 160}}>
                        <div className="ant-upload ant-upload-drag">
                            <div className="ant-upload ant-upload-btn">
                                <div className="ant-upload-drag-container"><Icon type="upload" /><span>请上传照片</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2" style={{height: 160}}>
                        <div className="ant-upload ant-upload-drag">
                            <div className="ant-upload ant-upload-btn">
                                <div className="ant-upload-drag-container"><Icon type="upload" /><span>请上传照片</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="title-box">培训校区场地，课程展示，最多6张照片</div>
                <div className="user-img">
                    <div className="col-2" style={{height: 160}}>
                        <div className="ant-upload ant-upload-drag">
                            <div className="ant-upload ant-upload-btn">
                                <div className="ant-upload-drag-container"><Icon type="upload" /><span>请上传照片</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="title-box">教练展示，最多6张照片</div>
                <div className="user-img">
                    <div className="col-2" style={{height: 160}}>
                        <div className="ant-upload ant-upload-drag">
                            <div className="ant-upload ant-upload-btn">
                                <div className="ant-upload-drag-container"><Icon type="upload" /><span>请上传照片</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="title-box">学员风采，最多6张照片</div>
                <div className="user-img">
                    <div className="col-2" style={{height: 160}}>
                        <div className="ant-upload ant-upload-drag">
                            <div className="ant-upload ant-upload-btn">
                                <div className="ant-upload-drag-container"><Icon type="upload" /><span>请上传照片</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="login-group-btn" style={{marginTop: 25}}>
                    <button className="input-btn btn-primary">
                        保存
                    </button>
                </div>
            </div>
        );
    }
});

Info = Form.create()(Info);
export default Info;
