import React, { Component } from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {observer} from "mobx-react";
import {extendObservable,observable,autorun} from "mobx";
import {Icon, Tooltip} from 'antd';
const queryString = require('query-string');

const LeftNav = observer(class LeftNavCompent extends Component {
    constructor(props){
        super(props);
        extendObservable(this,{
            className: "",
            isHomeRoute: false,
            loginClassName: 'login-group'
        });
    }

    render() {
        return (
            <div className={ "app-sidebar " + this.className }>
                <div className="main-nav-main">
                    <div className="main-nav-header">
                        <div className="main-nav-logo">
                            <a  href="/" className="active">
                                <img src={require('../images/logo.png')} alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className="main-nav-personal">
                        <ul>
                            <li className="zx-nav__item">
                                <NavLink className="zx-link"  activeClassName="zx-nav__item--active" to="/mis/merchants"><Icon type="inbox" />商户管理</NavLink>
                            </li>
                            <li className="zx-nav__item">
                                <NavLink className="zx-link"  activeClassName="zx-nav__item--active" to="/mis/page"><Icon type="appstore" />课程管理</NavLink>
                            </li>
                            <li className="zx-nav__item">
                                <NavLink className="zx-link"  activeClassName="zx-nav__item--active" to="/mis/course"><Icon type="setting" />订单管理</NavLink>
                            </li>
                            <li className="zx-nav__item">
                                <NavLink className="zx-link"  activeClassName="zx-nav__item--active" to="/mis/course"><Icon type="pay-circle" />优惠券管理</NavLink>
                            </li>
                            <li className="zx-nav__item">
                                <NavLink className="zx-link"  activeClassName="zx-nav__item--active" to="/mis/user"><Icon type="team" />人员管理</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

});
export default LeftNav;
