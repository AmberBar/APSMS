

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import styles from './Alipay';

class Alipay extends Component {

    constructor(props) {
        super(props);
	}
	
	
	componentWillReceiveProps() {
		if  (document.forms[0]) {
			document.forms[0].submit()
		}
	}

	componentDidMount() {
		if (document.forms[0]) {
			document.forms[0].submit()
		}
	}

    render() {

		let { fromData } = this.props
		const data = () => {
			return {
				__html: fromData
			}
		}
		
      	return (
        	<div id="login_container"
				dangerouslySetInnerHTML={data()}
			>
			</div>	
		  );
	}
}

export default Alipay;