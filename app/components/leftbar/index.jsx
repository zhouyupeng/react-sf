import React from 'react';
import { Router, Route, Link,IndexLink , hashHistory, IndexRoute } from 'react-router';
import leftBarConfig from "../config/leftBar.config.js";

var LeftBar = React.createClass({
    getInitialState:function(){
        return {
            leftBarConfig : []
        }
    },
    componentWillMount:function(){
         this.setState({
            leftBarConfig : leftBarConfig
        });
    },
    render: function() {
        var _list = this.state.leftBarConfig.map(function(item,index){
                return ( <li key={index}>
                            <Link to={`/tag/${item}`}>
                                {item}
                            </Link>
                    </li>)
            });
        return (
            <aside className="leftBar">
            <ul>
                <li><IndexLink to="/" key="99999">首页</IndexLink></li>
                {_list}
            </ul>
        </aside>
        );
    }

});

module.exports = LeftBar;