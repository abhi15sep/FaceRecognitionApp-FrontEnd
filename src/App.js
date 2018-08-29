import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '2cf6c1c55abe40f2a1d11c8180f1a7ca'
});

const particleParams = {
    particles: {
      number: {
        value:30,
        density:{
          enable: true,
          value_area:800,
        }
      }
  }
}

class App extends Component {
  state = {
    input:'',
    imageUrl:'',
    box:{},
    route:'signIn',
    isSignedIn: false,
  }

  calculateFaceLocation = (response) => {
    const clariafaiFace = response.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clariafaiFace.left_col * width,
      topRow: clariafaiFace.top_row * height,
      rightCol: width - (clariafaiFace.right_col * width),
      bottomRow: height - (clariafaiFace.bottom_row * height)
    }
 }

 displayFaceBox = (box) => {
  this.setState({box:box});
 }

  onInputChange =  (e) => {
    this.setState({input:e.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation (response)))
    .catch(err => console.log(err))  
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn:false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
         <Particles params={particleParams}
         className='particles'/> 
         <Navigation isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}/>
         { route === 'home' 
            ? <React.Fragment>
                   <Logo />
                   <Rank />
                   <ImageLinkForm 
                   onInputChange={this.onInputChange} 
                   onSubmit={this.onSubmit}/>
                  <FaceRecognition 
                  box={this.state.box} 
                  imageUrl={imageUrl}/>
                </React.Fragment>
            : (route === 'signIn' 
             ?
                 <SignIn onRouteChange={this.onRouteChange}/> 
              :
                 <Register onRouteChange={this.onRouteChange}/>      
            )     
        }
      </div>
    );
  }
}

export default App;


// Clarifai.FACE_DETECT_MODEL

