import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, InputGroup } from "react-bootstrap";
import Profile from "./Profile";
import Gallery from "./Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: []
    };
  }
  search() {
    console.log("this.state", this.state);
    // const CLIENT_ID = "f6b86c36bb964945bac4018bd89aa99f";
    // const CLIENT_SECRET = "eca6c31c38544ca7a941c08b8a2b730c";
    // const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    // const ACCESS_TOKEN_URL = "https://accounts.spotify.com/api/token";

    // fetch(PROXY_URL + ACCESS_TOKEN_URL, {
    //   method: "POST",
    //   headers: {
    //     Authorization:
    //       "Basic" +
    //       new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: new FormData({ grant_type: "client_credentials" })
    // }).then(response => console.log(response));

    const BASE_URL = "https://api.spotify.com/v1/search?";
    const TOKEN =
      "BQCZ_5oCrSr_Ia-IlH_XXDZb0lX7-9PMzfhWzzEeSBwAA2HN0BwYzcQMRvvjRuEKH70qHWVBBsc0BpmvJcZWh9tvojHI-8Qk0gBRW_3sl4AhTN2MWkAuvwMEF4Gv2DNk26uoQ_raA4SgXA";
    let FETCH_URL = BASE_URL + "q=" + this.state.query + "&type=artist&limit=1";
    //const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1'`;
    const ALBUM_URL = "https://api.spotify.com/v1/artists/";

    fetch(FETCH_URL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN
      }
    })
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
        fetch(FETCH_URL, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + TOKEN
          }
        })
          .then(response => response.json())
          .then(json => {
            const tracks = json.tracks;
            // const { tracks } = json;
            this.setState({ tracks });
          });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="App-title">Music master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist..."
              query={this.state.query}
              onChange={event => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Append onClick={() => this.search()}>
              <InputGroup.Text>Search</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </FormGroup>
        {this.state.artist !== null ? (
          <div>
            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks} />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;
