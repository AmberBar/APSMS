import React, { Component } from 'react';
import styles from './ConfirmButton.less'
import { Button } from 'antd'
import $ from 'jquery';


class ConfirmButton extends Component {

    constructor(props) {
      super(props);
      this.state = {
        
      }
    }

    render() {

        return (
            <div className={styles.confirm_contrainer}>
                <div className={styles.confirm_button}>
                    <Button type="primary">settlement</Button>
                </div>
            </div>
        );
        }
}

export default ConfirmButton;
