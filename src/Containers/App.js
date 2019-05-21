import React, { Component } from 'react';
import './App.css';

const bankOne = [{
  keyCode: 81, 
  keyTrigger: 'Q', 
  id: 'Heater-1', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87, 
  keyTrigger: 'W',
  id: 'Heater-2', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' 
}, {
  keyCode: 69, 
  keyTrigger: 'E',
  id: 'Heater-3', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' 
}, {
  keyCode: 65, 
  keyTrigger: 'A',
  id: 'Heater-4', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' 
}, {
  keyCode: 83, 
  keyTrigger: 'S',
  id: 'Clap', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' 
}, {
  keyCode: 68, 
  keyTrigger: 'D',
  id: 'Open-HH', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' 
}, {
  keyCode: 90, 
  keyTrigger: 'Z',
  id: "Kick-n'-Hat", 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' 
}, {
  keyCode: 88, 
  keyTrigger: 'X',
  id: 'Kick', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' 
}, {
  keyCode: 67, 
  keyTrigger: 'C',
  id: 'Closed-HH', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' 
}]; 

const bankTwo = [{
  keyCode: 81, 
  keyTrigger: 'Q', 
  id: 'Chord-1', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87, 
  keyTrigger: 'W',
  id: 'Chord-2', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' 
}, {
  keyCode: 69, 
  keyTrigger: 'E',
  id: 'Chord-3', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' 
}, {
  keyCode: 65, 
  keyTrigger: 'A',
  id: 'Shaker', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' 
}, {
  keyCode: 83, 
  keyTrigger: 'S',
  id: 'Dry-Ohh', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' 
}, {
  keyCode: 68, 
  keyTrigger: 'D',
  id: 'Open-HH2', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' 
}, {
  keyCode: 90, 
  keyTrigger: 'Z',
  id: "Punchy-Kick", 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' 
}, {
  keyCode: 88, 
  keyTrigger: 'X',
  id: 'Side-Stick', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' 
}, {
  keyCode: 67, 
  keyTrigger: 'C',
  id: 'Snare', 
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' 
}];


class App extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        power: true,  
        bank: 'bankOne',
        volume: 0.3,
        display: '',
      };

      this.powerControl = this.powerControl.bind(this); 
      this.selectBank = this.selectBank.bind(this); 
      this.adjustVolume = this.adjustVolume.bind(this); 
      this.clearDisplay = this.clearDisplay.bind(this); 
      this.playSound = this.playSound.bind(this); 
      this.musicButtonClick = this.musicButtonClick.bind(this); 
    }
  
  powerControl() {
    this.setState({
      power: !this.state.power, 
      display: '',
    }); 
  }

  selectBank() {
    if(this.state.power === true) { 
      if(this.state.bank === 'bankOne') { 
        this.setState({
          bank: 'bankTwo', 
          display: 'Smooth Piano Kit', 
        })
      } else {
        this.setState({
          bank: 'bankOne', 
          display: 'Heater Kit'
        }); 
      } 
    } 
  }

  adjustVolume(event) {
    if(this.state.power === true) {
      this.setState({
        volume: event.target.value, 
        display: 'Volume: ' + Math.round(event.target.value * 100), 
      }); 
      setTimeout(()=> this.clearDisplay(), 1000)
    }
  }

  clearDisplay(){
    this.setState({
      display: ''
    }); 
  }

  playSound(button, volume) {
    const sound = document.getElementById(button.id); 
    sound.volume = volume; 
    sound.currentTime = 0; 
    sound.play();
  }

  musicButtonClick(button, volume) {
    if(this.state.power === true) {
      this.playSound(button, volume); 
      this.setState({
        display: button.id
      })
    }
  }

  getExtendedState(state) { 
    return {
      buttons: state.bank === 'bankOne' ? bankOne : (state.bank === 'bankTwo' ? bankTwo : null),
    };
  }

  renderButtons(buttons) {
    const musicButtonClick = this.musicButtonClick; 
    const volume = this.state.volume; 
    return buttons.map((button,i) => {
      return (
        <div> 
          <button className='music-buttons' onClick={()=>musicButtonClick(button, volume)}>{button.keyTrigger}</button>
          <audio id={button.id} src={button.url}> </audio>
        </div> 
      )
    })
  }

  render() {
    const extendedState = this.getExtendedState(this.state);
    const powerButtonClasses = this.state.power ? 'toggleButton show-left green-button' : 'toggleButton show-right red-button'; 
    const bankButtonClasses = this.state.bank === 'bankOne' ? 'toggleButton show-left' : 'toggleButton show-right'; 

    return (
      <div>
        <div className='empty'></div>
        <div id='drum-container'>
          <div id='drum-control'>
            <div>
              <h3 id='power-title'> Power </h3>
              <div className = {powerButtonClasses} onClick = {this.powerControl}> 
                <div className='item item-left'> </div>
                <div className='item item-right'> </div>
              </div>
            </div>
            <div className='display-box'>
              <p className='display-text' > {this.state.display} </p>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={this.state.volume} 
              onChange={this.adjustVolume} 
              />
            <h3 id='bank-title'> Bank </h3> 
            <div className={bankButtonClasses} onClick = {this.selectBank}>
              <div className='item item-left'> </div>
              <div className='item item-right'> </div> 
            </div>
          </div>
          <div id = 'music-keys'>
            {this.renderButtons(extendedState.buttons)}
          </div>
        </div>
        <div className='empty'></div>
      </div>
    )
  }
}; 

export default App;
