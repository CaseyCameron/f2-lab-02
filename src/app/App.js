import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Paging from './Paging';
import PokemonList from '../pokemon/PokemonList';
import Search from './Search';
import request from 'superagent';
import './App.css';

const POKEMON_API_URL = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';

class App extends Component{
  state = {
    pokemonData: [], //initializing a value for state
    search: '',
    sortFilter: 'pokemon',
    sortOrder: 'asc',
    perPage: '',
    page: 1
  }

  componentDidMount() { //this updates DOM w/ pokemon api from fetchPokemon
    this.fetchPokemon();
  }

  async fetchPokemon() {
    const { search, sortFilter, sortOrder, perPage, page } = this.state;
    console.log('fetch fn:' + page);
    const response = await request
      .get(POKEMON_API_URL) //get our pokemon api
      .query({ 
        pokemon: search, 
        sort: sortFilter, 
        direction: sortOrder, 
        perPage: perPage, 
        page: page });
    console.log(response.body);
    this.setState({ pokemonData: response.body.results }); //write the api data into state
  }

  handleSearch = ({ search, sortField, sortOrder, perPage }) => {
    this.setState({ 
      search: search, 
      sortFilter: sortField, 
      sortOrder: sortOrder, 
      perPage: perPage, page: 1 },
    () => this.fetchPokemon()); //anon callback refetches data after setting state
  }

  handlePrevPage = () => {
    this.setState(
      { page: Math.max(this.state.page - 1, 1) },
      () => this.fetchPokemon() //when you change the page, give me the new pokemon
    );
  }
  
  handleNextPage = () => {
    console.log(this.state.page);
    this.setState(
      { page: this.state.page + 1 },
      () => this.fetchPokemon(this.state.page) //when you change the page, give me the new pokemon
    );
  }

  render() {
    const { pokemonData, page } = this.state; //get the pokemonData from our state (read from state)
    console.log('renderzone ' + pokemonData[0]?.pokemon);
    // or const pokemonData = this.state.pokemonData
    return (
      <div className="App">
        <Header/>
        <section className="search-options">
          <Search onSearch={this.handleSearch}/> {/* on search, call handleSearch */}
        </section>
        <Paging
          onSubmit={this.handleSearch}
          page = {page}
          onPrev={this.handlePrevPage}
          onNext={this.handleNextPage}
        />
        <main>
          <PokemonList 
            pokemonProp={pokemonData}
            onPaging={this.handleSearch}
          /> 
        </main>

        <Footer/>

      </div>
    );
  }
}

export default App;