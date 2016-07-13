import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import $ from "jquery";
import Back from '../back/index.jsx';
export default class Question extends React.Component{
    constructor(){
        super();
        this.state = { 
            loading:true,
            Qdata:{
                question: {
                title: "",
                question: "",
                count: "",
                authorTime: ""
                },
                comment: []
            }
        }
    }
    componentWillMount(){
        var id = this.props.params.questionId;
        $.ajax({
            url: 'http://127.0.0.1:3000/question',
            type: 'GET',
            data: {
                id: id
            },
            success: function(datas) {
                // if (this.isMounted()) {
                if(datas){
                    this.setState({
                        Qdata:datas,
                        loading:false
                    })
                    }
                // }
            }.bind(this)
        })
    }
    render(){
        var data = this.state.Qdata;
        var author = data;
        var _list = data.comment.map(function(item,index){
            return (<div className="com-list fmt" key={index}>
                <div className="com-content" dangerouslySetInnerHTML={{__html:item.answer}}>
                </div>
                <div className="comUser">
                    <div className="comUserLeft">
                        {item.time}
                    </div>
                    <div className="comUserRight">
                        <img src={item.avatar} />
                        <div>
                            <span className="comNmae">{item.name}</span>
                            <span>{item.rank}</span>
                        </div>
                    </div>
                </div>
            </div>)
        });
        var isNone = !!this.state.loading ? "block" : "none";
        return (
              <div className="main question">
            <div className="questionTop">
                <p className="question-title">
                    {data.question.title}
                </p>
                <p className="question-user">
                    {data.question.authorTime}
                </p>
            </div>
            <div className="question-main fmt" dangerouslySetInnerHTML={{__html:data.question.question}}>
            </div>
            <h2 className="com-title">评论列表</h2>
            {_list}
            <div style={{display:isNone}} className='loading'> loading</div>
            <Back />
        </div>
        )
    }
}