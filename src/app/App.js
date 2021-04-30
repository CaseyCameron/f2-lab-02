import { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
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
    perPage: ''
  }

  componentDidMount() { //this updates DOM w/ pokemon api from fetchPokemon
    this.fetchPokemon();
  }

  async fetchPokemon(search, sortFilter, sortOrder, perPage) {
    const response = await request
      .get(POKEMON_API_URL) //get our pokemon api
      .query({ pokemon: search, sort: sortFilter, direction: sortOrder, perPage: perPage });
    this.setState({ pokemonData: response.body.results }); //write the api data into state
  }

  handleSearch = ({ search, sortField, sortOrder, perPage }) => {
    this.setState({ search: search, sortFilter: sortField, sortOder: sortOrder, perPage: perPage },
      () => this.fetchPokemon(search, sortField, sortOrder, perPage)); //anon callback refetches data after setting state
  }

  render() {
    const { pokemonData } = this.state; //get the pokemonData from our state (read from state)
    
    // or const pokemonData = this.state.pokemonData
    return (
      <div className="App">
        <Header/>
        <section className="search-options">
          <Search onSearch={this.handleSearch}/> {/* on search, call handleSearch */}
        </section>
        {/*<Paging/>*/}
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