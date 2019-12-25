import React, { Component } from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default class SearchBar extends Component {
  state = {
    term: ''
  };

  onFormSubmit = e => {
    this.props.onSubmit(this.state.term);

    this.setState({
      term: ''
    });
  };

  render() {
    return (
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onChange={e => this.setState({ term: e.target.value })}
        onSearch={e => this.onFormSubmit(e)}
      />
    );
  }
}
