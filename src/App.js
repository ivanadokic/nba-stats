import React, { Component } from 'react';
import axios from "axios";
import {Button, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName: null,
      playerStats: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId()
    console.log(this.state.playerName)
  }

  handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if (replace.length > 0) {
      this.setState({ playerName: replace })
    } else {
      alert("Please type players name!")
    }
  }

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
      .then(async res => {
        // console.log(res.data.data)
        if (res.data.data[0] === undefined) {
          alert("This player is either injured or hasn't played yet!")
        } else if (res.data.data.length > 1) {
          alert("Pleases specify the name more!")
        } else {
          await this.getPlayerStats(res.data.data[0].id)

        }
      }).catch(err => {
        console.log(err)
      })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=${playerId}`)
      .then(async res => {
        console.log(res.data.data)
        this.setState({ playerStats: res.data.data[0] })
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
   
          <form onSubmit={this.handleSubmit}>
            <h1>NBA Players Statistics</h1>
           
            <label>Player's Name
            
             <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Please enter players name"
            />
            </label>
           <input type="submit" value="Submit" />
        
        </form>
     Games played🏀: {this.state.playerStats["games_played"]}
        <br />
    Points averaged: {this.state.playerStats["pts"]}
        <br />
    Rebounds averaged: {this.state.playerStats["reb"]}
        <br />
    Assists averaged: {this.state.playerStats["ast"]}
      </div >
    );
  }
}
export default App;