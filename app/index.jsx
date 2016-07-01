import './public/scss/index.scss';
import './public/css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router';
import Header from './components/header/index.jsx';
import LeftBar from './components/leftbar/index.jsx';
import List from './components/list/index.jsx';
import Tag from './components/tag/index.jsx';
import Question from './components/question/index.jsx';
var Main = React.createClass({

	render: function() {
		return (
			<div id="wrap">
				<Header />
				{this.props.children}
				 
				<LeftBar />
			</div>
		);
	}

});


const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={List}/>
			<Route path="/tag/:id" component={Tag} />
			<Route path="/question/:questionId" component={Question} />
		</Route>		   
		</Router>, app);