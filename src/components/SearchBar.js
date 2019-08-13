import React, { Component } from "react";

export default class SearchBar extends Component {
  state = {
    term: ""
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.term);

    this.setState({
      term: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="form-group">
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control"
            onChange={(e) => this.setState({ term: e.target.value })}
            value={this.state.term}
            placeholder="Enter search term..."
          />
          <button className="btn btn-lg btn-primary">Search Wikipedia</button>
        </div>
      </form>
    );
  }
}
