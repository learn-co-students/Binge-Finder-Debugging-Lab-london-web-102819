import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
    pageNumber: 0
  }

  componentDidMount = () => {
    Adapter.getShows(this.state.pageNumber).then(shows => this.setState({ shows }))
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0)
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {
    e.target.value === "No Filter" ? this.setState({ filterRating: "" }) : this.setState({ filterByRating: e.target.value })
  }

  selectShow = (id) => {
    Adapter.getShowEpisodes(id)
      .then((episodes) => this.setState({
        selectedShow: this.state.shows.find(s => s.id === id),
        episodes
      }))
  }

  displayShows = () => {
    if (this.state.filterByRating) {
      return this.state.shows.filter((s) => {
        return s.rating.average >= this.state.filterByRating
      })
    } else {
      return this.state.shows
    }
  }



  render() {
    return (
      <div >
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm} />
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} episodes={this.state.episodes} /> : <div />}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
