import { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  state = {
    search: '',
    sortField: '',
    sortOrder: 'asc',
    perPage: ''
  }

  handleSearchChange = ({ target }) => { //search tracks search input by getting the target value from handleSubmit's (e)
    this.setState({ search: target.value });
  }
  
  handleSortField = ({ target }) => {
    this.setState({ sortField: target.value });
  }

  handleSortOrder = (e) => {
    this.setState({ sortOrder: e.target.value });
  }

  handleSubmit = (e) => { //e is the form (like our old new formData component)
    e.preventDefault();
    this.props.onSearch(this.state); //const onSearch = this.props.onSearch;
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState !== this.state) {
      this.props.onSearch(this.state);
    }
  }

  handlePaging = ({ target }) => {
    this.setState({ perPage: target.value });
  }


  render() {
    const { search, sortField, sortOrder, perPage } = this.state;
    
    return (
      <form className="Search" onSubmit={this.handleSubmit}>
        
        <input 
          name="search" 
          value={search}
          onChange={this.handleSearchChange}
        />

        <select name="sortField" value={sortField} onChange={this.handleSortField}>
          <option value="">sort...</option>
          <option value="pokemon">by name</option>
          <option value="type_1">by type</option>
          <option value="shape">by shape</option>
          <option value="ability_1">by ability</option>
          <option value="hp">by hp</option>
          <option value="attack">by attack</option>
          <option value="defense">by defense</option>
        </select>

        <select name="sortOrder" value={sortOrder} onChange={this.handleSortOrder}>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>

        <select name="perPage" value={perPage} onChange={this.handlePaging}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value ="75">75</option>
        </select>

        <button>Search</button>
      
      </form>
    );
  }

}