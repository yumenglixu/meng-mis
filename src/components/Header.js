import React, { Component } from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {observer} from "mobx-react";
import {extendObservable,observable,autorun} from "mobx";
import {Icon, Tooltip, Breadcrumb, Dropdown, Menu} from 'antd';
import Service from '../config/service';
import Cookies from 'js-cookie';
const queryString = require('query-string');
const menu = (
    <Menu onClick={(e) => {
        if(e.key == '/logout'){
            Cookies.remove('access_token');
            Service.logout().then((res)=>{
                window.location.href = '/login';
            }); 
        }
    }}>
        {/* <Menu.Item  key="/me">
            <a>个人中心</a>
        </Menu.Item>
        <Menu.Divider/> */}
        <Menu.Item  key="/logout">
            <a>退出系统</a>
        </Menu.Item>
    </Menu>
  );

  
const Header = observer(class LeftNavCompent extends Component {
    constructor(props){
        super(props);
        extendObservable(this,{
            className: "",
            breadCrumb: '',
            info: ''
        });
    }
    componentWillReceiveProps(props){
        this.checkHomeRoute();
    }
    componentWillMount() {
        this.checkHomeRoute();
    }
    checkHomeRoute() {
        let path  = this.props.history.location.pathname;
        if (this.props.history.location.pathname.indexOf('/mis/merchants/list') > -1) {
            this.breadCrumb = [
                <Breadcrumb.Item>商户管理</Breadcrumb.Item>
            ];
        }
        if (this.props.history.location.pathname.indexOf('/mis/merchants/info') > -1) {
            this.breadCrumb = [
                <Breadcrumb.Item href="/mis/merchants/list">商户管理</Breadcrumb.Item>,
                <Breadcrumb.Item>详情</Breadcrumb.Item>
            ];
        }
    }
    render() {
        return (
            <div className="top-nav-main">
                <div className="top-nav-bread-crumb">
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>后台管理系统MIS</Breadcrumb.Item>
                        {this.breadCrumb}
                    </Breadcrumb>
                </div>
                <li className="hidden-xs">
                    <a href="http://amis.baidu.com/" target="_blank">Mis</a>
                </li>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link top-nav-more">
                        <div className="avatar-main top-nav-avatar">
                            <img className="avatar-image" src={this.info.avatar || require('../images/avatar.png')} title={this.info.username} alt={this.info.username}/>
                        </div>
                        <Icon type="down" />
                    </a>
                </Dropdown>
            </div>
        );
    }
    componentDidMount() {
        //检查登录状态
        // Service.getUserInfo().then((res)=>{
        //     if (res.status_code === 200) {
        //         this.info = res.data;
        //     }
        // });
    }
});
export default Header;
