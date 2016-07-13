import React from 'react';
import $ from 'jquery';
export default class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            title:"segmentfault"
        }
    }
    componentDidMount(){
         $(".leftBarBtn").on("click", function() {
            $(".leftBar").fadeIn();
            $(".leftBar ul").addClass("leftBarActive");
            return false;
        });
        $(document).on("click",function(){
            if($(".leftBar ul").hasClass("leftBarActive")){
            $(".leftBar").fadeOut();
            $(".leftBar ul").removeClass("leftBarActive");
            }
        })
    }
    render(){
        return (
            <header className="header">
            <div className="leftBarBtn">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <h2>{this.state.title}</h2>
        </header>
        );
    }
}