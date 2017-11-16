import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Radio, FormGroup, Table, Grid, Button, Row, Col, ControlLabel, FormControl } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super()
    this.state = {
      health: "",
      fur_length: "",
      family_friendly: "",
      breed: "",
      link: "",
      catbreed: [],
      cathealth: [],
      catfur: [],
      catfam: [],
      query: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.displayCats = this.displayCats.bind(this)
    this.displayAllCats = this.displayAllCats.bind(this)
    this.displayHealthyLongFurCats = this.displayHealthyLongFurCats.bind(this)
    this.displayFriendlyCats = this.displayFriendlyCats.bind(this)
  }
  displayFriendlyCats() {
    const promise = axios.get("/felines")
    promise.then((result) => {
      console.log(result.data)
      let catbreed = []
      let cathealth = []
      let catfur = []
      let catfam = []
      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].family_friendly === "friendly") {
          catbreed.push(result.data[i].breed)
          cathealth.push(result.data[i].health)
          catfur.push(result.data[i].fur_length)
          catfam.push(result.data[i].family_friendly)
        }
      }
      this.setState({
        catbreed: catbreed,
        cathealth: cathealth,
        catfur: catfur,
        catfam: catfam
      }, () => console.log(this.state.catbreed))
    })
  }
  displayHealthyLongFurCats() {
    const promise = axios.get("/felines")
    promise.then((result) => {
      console.log(result.data)
      let catbreed = []
      let cathealth = []
      let catfur = []
      let catfam = []
      for (var i = 0; i < result.data.length; i++) {
        if ((result.data[i].health === "healthy") && (result.data[i].fur_length === "long")) {
          catbreed.push(result.data[i].breed)
          cathealth.push(result.data[i].health)
          catfur.push(result.data[i].fur_length)
          catfam.push(result.data[i].family_friendly)
        }
      }
      this.setState({
        catbreed: catbreed,
        cathealth: cathealth,
        catfur: catfur,
        catfam: catfam
      }, () => console.log(this.state.catbreed))
    })
  }
  componentDidMount() {
    const promise = axios.get("/felines")
    promise.then((result) => {
      console.log(result.data)
      let catbreed = []
      let cathealth = []
      let catfur = []
      let catfam = []
      for (var i = 0; i < result.data.length; i++) {
        catbreed.push(result.data[i].breed)
        cathealth.push(result.data[i].health)
        catfur.push(result.data[i].fur_length)
        catfam.push(result.data[i].family_friendly)
      }
      this.setState({
        catbreed: catbreed,
        cathealth: cathealth,
        catfur: catfur,
        catfam: catfam
      }, () => console.log(this.state.catbreed))
    })
  }

  displayAllCats() {
    const promise = axios.get("/felines")
    promise.then((result) => {
      console.log(result.data)
      let catbreed = []
      let cathealth = []
      let catfur = []
      let catfam = []
      for (var i = 0; i < result.data.length; i++) {
        catbreed.push(result.data[i].breed)
        cathealth.push(result.data[i].health)
        catfur.push(result.data[i].fur_length)
        catfam.push(result.data[i].family_friendly)
      }
      this.setState({
        catbreed: catbreed,
        cathealth: cathealth,
        catfur: catfur,
        catfam: catfam
      }, () => console.log(this.state.catbreed))
    })
  }

  displayCats() {
    const promise = axios.get("/felines")
    promise.then((result) => {
      console.log(result.data)
      let catbreed = []
      let cathealth = []
      let catfur = []
      let catfam = []
      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].health === "healthy") {
          catbreed.push(result.data[i].breed)
          cathealth.push(result.data[i].health)
          catfur.push(result.data[i].fur_length)
          catfam.push(result.data[i].family_friendly)
        }
      }

      this.setState({
        catbreed: catbreed,
        cathealth: cathealth,
        catfur: catfur,
        catfam: catfam
      }, () => console.log(this.state.catbreed))
    })
  }

  handleChange(e) {
    const target = e.target
    const value = target.value
    const name = target.id
    this.setState({
      [name]: value
    }, () => console.log(this.state))
  }
  submit(e) {
    e.preventDefault()
    const promise = axios.post(
      "/felines",
      {
        "breed": this.state.breed,
        "health": this.state.health,
        "fur_length": this.state.fur_length,
        "family_friendly": this.state.family_friendly
      }
    );
    promise.then((result) => {
      console.log(result)
      this.setState({
        breed: ""
      })
    });
    promise.catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <Form
          handleChange={this.handleChange}
          breed={this.state.breed}
          fur_length={this.state.fur_length}
          family_friendly={this.state.family_friendly}
          submit={this.submit}
          health={this.state.health} />
        <Search
          displayAllCats={this.displayAllCats}
          displayCats={this.displayCats}
          displayHealthyLongFurCats={this.displayHealthyLongFurCats}
          displayFriendlyCats={this.displayFriendlyCats} />
        <Display
          catbreed={this.state.catbreed}
          cathealth={this.state.cathealth}
          catfur={this.state.catfur}
          catfam={this.state.catfam} />
      </div>
    );
  }
}

function Form(props) {
  return (
    <div>
      <form
        onSubmit={(e) => { props.submit(e) }}>

        <FormGroup
          controlId="formValidationSuccess1"
          validationState="success">
          <ControlLabel>Breed</ControlLabel>
          <FormControl
            type="text"
            id="breed"
            onChange={props.handleChange}
            value={props.breed} />
        </FormGroup>

        <FormGroup id="health" value={props.health}>
          <p><ControlLabel>Health:</ControlLabel></p>
          <Radio validationState="success" name="health" id="health" value="healthy" onChange={(e) => { props.handleChange(e) }}>
            Relatively Healthy
          </Radio>
          <Radio validationState="success" name="health" id="health" value="issues" onChange={(e) => { props.handleChange(e) }}>
            Some Health Issues
          </Radio>
        </FormGroup>

        <FormGroup id="fur_length" value={props.fur_length}>
          <p><ControlLabel>Fur Length</ControlLabel></p>
          <Radio validationState="success" name="fur_length" id="fur_length" value="long" onChange={(e) => { props.handleChange(e) }}>
            Long
          </Radio>
          <Radio validationState="success" name="fur_length" id="fur_length" value="short" onChange={(e) => { props.handleChange(e) }}>
            Short
          </Radio>
        </FormGroup>

        <FormGroup id="family_friendly" value={props.family_friendly}>
          <p><ControlLabel>Family Friendly</ControlLabel></p>
          <Radio validationState="success" name="family" id="family_friendly" value="family_friendly" onChange={(e) => { props.handleChange(e) }}>
            Very Friendly
            </Radio>
          <Radio validationState="success" name="family" id="family_friendly" value="independent" onChange={(e) => { props.handleChange(e) }}>
            Not suitable for families
            </Radio>
        </FormGroup>
        <Button bsStyle="success" type="submit">SUBMIT</Button>
      </form>

    </div>
  )
}

function Search(props) {
  return (
    <div>
      Search Cats:
      <Button validationState="success" onClick={props.displayAllCats}>All Cats</Button>
      <Button validationState="success" onClick={props.displayCats}>Healthy</Button>
      <Button validationState="success" onClick={props.displayHealthyLongFurCats}>Healthy & Long Fur</Button>
      <Button validationState="success" onClick={props.displayFriendlyCats}>Family Friendly</Button>
    </div>
  )
}

function Display(props) {
  return (
    <div>
      <Grid>
        <Row>
          <Col xs={3} sm={3} md={3}>
            <h4>Breed</h4>
            {props.catbreed.map((cat, i) => {
              return (
                <p>{cat}</p>
              )
            })}
          </Col>
          <Col xs={3} sm={3} md={3}>
            <h4>Health</h4>
            {props.cathealth.map((health, i) => {
              return (
                <p>{health}</p>
              )
            })}
          </Col>
          <Col xs={3} sm={3} md={3}>
            <h4>Fur Length</h4>
            {props.catfur.map((fur, i) => {
              return (
                <p>{fur}</p>
              )
            })}
          </Col>
          <Col xs={3} sm={3} md={3}>
            <h4>Family Friendly</h4>
            {props.catfam.map((fam, i) => {
              return (
                <p>{fam} </p>
              )
            })}
          </Col>
        </Row>
      </Grid>
    </div>
  )
}



export default App;
