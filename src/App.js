import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesNature = {
                particles: {
                  number:{
                    value:80
                  },
                  line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }};

const app = new Clarifai.App({
 apiKey: '3bf762d6c5f047aabb7ce511dd648632'
});

class App extends Component{

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignedIn : false,
      user: {
        id: '',
        name: '',
        email: '',              
        entries: 0,
        joined: ''
      }      
    }
  }

  loadUser = (data) => {
    this.setState({user : {
        id: data.id,
        name: data.name,
        email: data.email,              
        entries: data.entries,
        joined: data.joined
    }})
  }
  
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.width);
    return{    
      leftCol : clarifaiFace.left_col * width ,
      topRow : clarifaiFace.top_row * height ,
      rightCol : width - (clarifaiFace.right_col * width) ,
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box : box})
    console.log(box);
  }

  onInputChange = (event) =>
  {
    this.setState({input : event.target.value});
  }

  onButtonSubmit = (event) =>{
    this.setState({imageUrl : this.state.input});
    console.log('Click!!!');
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.imageUrl)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));    
  }
  

  onRouteChange = (route) =>
  {    
      if (route === 'signout') {
          this.setState({isSignedIn: false});
          this.setState({user : {
          id: '',
          name: '',
          email: '',              
          entries: '',
          joined: ''
        }})
      }
      else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      else{
        this.setState({isSignedIn: false})
      }      
      this.setState({route: route});
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' 
              params={particlesNature}              
        /> 
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>       
        {this.state.route === 'home' ?
          <div>            
            <Logo /> 
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>       
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>       
            <FaceRecognition  box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div> :
            (
              (this.state.route === 'signin')?
              <div>             
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>
                :
              <div>               
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              </div>              
            )                    
        }
      </div>
    );
  }
}

export default App;
