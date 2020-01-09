import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import TVShow from './TVShow.js'

class TVShowList extends Component {


  mapAllShows = () => {
    if (this.props.searchTerm){
      return this.props.shows.filter(s => (s.name.toLowerCase().includes(this.props.searchTerm)))
               .map(s =><TVShow show={s} key={s.id} selectShow={this.props.selectShow} image = {s.image} id = {s.id}/>) 
    }
    return this.props.shows.map( (s)=> <TVShow show={s} key={s.id} selectShow={this.props.selectShow} image = {s.image} id = {s.id}/>)
  }

  render() {
    return (
      <div className="TVShowList">
        <Grid>
          {this.mapAllShows()}
        </Grid>
      </div>
    )
  }

}

export default TVShowList;
