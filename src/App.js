import React, { Component } from 'react';
import ToggleButton from 'react-toggle-button'
import './App.css';


class App extends Component {

  state = {
    user_input: "",
    isPrime: false,
    sequence: [],
    isHover: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleHover = (event) => {
    this.setState({
      isHover: !this.state.isHover
    })
  }

  handleSubmit = (event) => {
    this.setState({sequence: ""})
    event.preventDefault()
    fetch(`http://localhost:3001/fibs/fib_result/${this.state.user_input}/${this.state.isPrime}`)
      .then((r) => {
      return r.json();
    })
    .then((data) => {
      this.setState({
        sequence: data.result,
        user_input: ""
      })

    });
  }

  render() {
    console.log(this.state.sequence)
    return (
      <div className={this.state.isPrime ? "prime-mode" : "regular-fib"}>
        <div className="form-input">
          <form>
            <h1>Fibonacci Calculator</h1>
            <p>Enter a number!</p>
            <div className="toggle-button">
            <h4 className="prime-title" onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}> Prime Mode! </h4>
            {this.state.isHover ? <h6> if toggeled on, it will return only prime numbers! </h6> : null}
            <ToggleButton
            value={ this.state.isPrime || false }
            onToggle={(value) => {
              this.setState({
                isPrime: !value,
              })
            }} />
            </div>
            <input type="number" name="user_input" value={this.state.user_input} onChange={this.handleChange}/>
            <button onClick={this.handleSubmit}> Submit </button>
          </form>
        </div>

        <p className="results"> Fibonacci Sequence: {this.state.sequence.length > 0 ? this.state.sequence.join(", ") : this.state.sequence}  </p>
      </div>
    );
  }

}

export default App;
