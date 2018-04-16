import React, { Component } from 'react';
import styles from './SearchContainer.less'
import { Link } from 'react-router-dom'
import { Menu, Icon , Input} from 'antd';

const Search = Input.Search;

class SearchContainer extends Component {

    constructor(props) {
      super(props);

    }

    search = (event) => {
      this.props.search(event);
    }
    
    render() {
      return (
        <div id="search_container">
            <Search placeholder="input search text" enterButton="Search" size="large" onSearch={this.search}/>
        </div>
      );
    }
}

export default SearchContainer;
