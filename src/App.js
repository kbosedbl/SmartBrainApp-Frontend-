import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
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
    }
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

  render(){
    return (
      <div className="App">
        <Particles className='particles' 
              params={particlesNature}              
        />
        <Navigation />
        <Logo /> 
        <Rank />       
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>       
        <FaceRecognition  box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
