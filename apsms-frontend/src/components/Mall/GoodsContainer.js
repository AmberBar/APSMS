import React, { Component } from 'react';
import styles from './GoodsContainer.less'
import { Link } from 'react-router-dom'
import { Menu, Icon , Input} from 'antd';

const Search = Input.Search;

class GoodsContainer extends Component {

    constructor(props) {
      super(props);

    }

    render() {
      return (
        <div id="goods_container">
            hello
        </div>
      );
    }
}

export default GoodsContainer;