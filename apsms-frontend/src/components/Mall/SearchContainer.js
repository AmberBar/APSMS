import React, { Component } from 'react';
import styles from './SearchContainer.less'
import { Link } from 'react-router-dom'
import { Menu, Icon , Input} from 'antd';

const Search = Input.Search;

class SearchContainer extends Component {

    constructor(props) {
      super(props);

    }

    render() {
      return (
        <div id="search_container">
            <Search placeholder="input search text" enterButton="Search" size="large" />
        </div>
      );
    }
}

export default SearchContainer;
