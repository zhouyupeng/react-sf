import React from 'react';
import { IndexLink} from 'react-router';
var Back = React.createClass({

	render: function() {
		return (
			<div id="back" javascript>
				<a href="javascript:history.go(-1);" ></a>
    		</div>
		);
	}

});

module.exports = Back;