import React, { Component, useRef, useEffect, useState } from 'react';
import axios from "axios";
import { Button, Navbar, Alert, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Carousel from 'react-bootstrap/Carousel'
import { color } from 'd3-color';


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
      <Jumbotron style={{
        backgroundColor: '#c8102e', color: '#1d428a'
      }
      }>

        <>

          <Navbar bg="light" variant="#1d428a">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="https://i.imgur.com/df5A01ss.jpg"
                width="30"

                height="30"
                className="d-inline-block align-top"
              />{' '}
  NBA Players Statistics
    </Navbar.Brand>
          </Navbar>
        </>


        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.imgur.com/W9l0690.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Brooklyn Nets</h3>
              <a href="https://www.nba.com/nets/roster/">Brooklyn Nets Roster</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.imgur.com/WwDlvA3.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Los Angeles Lakers</h3>
              <a href="https://www.nba.com/lakers/roster">Los Angeles Lakers Roster</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.imgur.com/ogC0Ljt.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>

              <a href="https://www.nba.com/teams">NBA Teams</a>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="App">


          <Card style={{
            backgroundColor: '#1d428a', color: '#ffffff  '
          }
          }>
            <Card.Title>

              <h1>Search for the Player to learn more</h1>



              <form onSubmit={this.handleSubmit}>


                <label>Player's Name

                  <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Please enter player's name"
                  />
                </label>
                <input type="submit" variant="primary" value="Submit" />


              </form>

              {/* <Card.Img src="https://i.imgur.com/1zPdd1v.jpg" /> */}

              <br />
                Games played🏀: {this.state.playerStats["games_played"]}

              <br />

                Averaged Points per Game: {this.state.playerStats["pts"]}
              <br />


                Rebounds averaged: {this.state.playerStats["reb"]}
              <br />

                Averaged Assists per Game: {this.state.playerStats["ast"]}

            </Card.Title>
          </Card>



        </div >
        <Alert variant="light">The data in the reference API, can be found <a href="https://www.balldontlie.io/#stats">here</a></Alert>
      </Jumbotron >

    );
  }
}
export default App;