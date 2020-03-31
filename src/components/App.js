import React from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';


class App extends React.Component {
    state = { results: [], loading: true };

    componentDidMount(term = 'pikachu') {
        this.onTermSubmit(term);
    };
    
    onTermSubmit = async (term) => {

        const getLoading = () => {this.setState({ loading: false })};

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`);

        this.setState({
            results: response.data,
        });

        getLoading();

    };

    render() {
        if(this.state.loading){
            return <div>Loading...</div>;
        }  else{
            return (
                <div className="ui container">
                    <SearchBar onFormSubmit={this.onTermSubmit} />
                    <div className="field">
                       
                        <img className="ui small image" src={this.state.results.sprites.front_default} alt=""/>
                     
                        <div className="ui bulleted list">
                            <div className="item">Name: {this.state.results.forms[0].name.toUpperCase()}</div>
                            <div className="item">HP: {this.state.results.stats[5].base_stat}</div>
                            <div className="item">Height: {this.state.results.height}</div>
                            <div className="item">Weight: {this.state.results.weight}</div>
                            <div className="item">Attack: {this.state.results.abilities[0].ability.name.toUpperCase()}</div>
                        </div>
                    </div>
                </div>
            );
        }
    };
}

export default App;