import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js';
import './App.css';


const particleParams={
    particles:{
      number:{
        value:200,
        density:{
          enable:true,
          value_area:800,
        }
      },
      color:{
        value: '#000000'
      }
    },
}
const initialState={
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn:'false',
  isFaceDetected:'true',
  user:{
    id:"",
    name:'',
    email:"",
    entries:0,
    joined:''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }
  calculateFaceLocation=(data)=>{
    const imageLocation=data.outputs[0].data.regions[0].region_info.bounding_box
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height= Number(image.height);
    return{
      topRow:imageLocation.top_row*height,
      leftCol:imageLocation.left_col*width,
      bottomRow:height-(imageLocation.bottom_row*height),
      rightCol:width-(imageLocation.right_col*width)
    }
  }

  displayFaceBox =(box)=>{
    this.setState({box:box})
  }

   onInputChange = (event)=>{
    this.setState({input:event.target.value})
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl:this.state.input})
    
    fetch("https://secret-mountain-68931.herokuapp.com/imageurl",{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          input:this.state.input
      })  
    })
    .then(response=>response.json())
    .then(response=>{
      if(response!=="error in api"){
        fetch("https://secret-mountain-68931.herokuapp.com/image",{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              id:this.state.user.id
          })  
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count,isFaceDetected:true}))
        })
        this.displayFaceBox(this.calculateFaceLocation(response))
      }else{
        this.setState(Object.assign(this.state.user,{isFaceDetected:false}))
    }
    })
    .catch(err=>console.log(err))
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }
  render() {
    const {isSignedIn,box, imageUrl, isFaceDetected}=this.state
    return (
       <div className="App">
       <Particles className="particles"
        params={particleParams} />
       
       <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
       {
        this.state.route==='home'
        ?<div>
           <Logo/>
           <Rank name={this.state.user.name} entries={this.state.user.entries}/>
           <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
           <FaceRecognition box={box} isFaceDetected={isFaceDetected} imageUrl={imageUrl}/>
        </div>
        :(
          this.state.route==='signin'
          ?<SignIn onRouteChange={this.onRouteChange}  loadUser={this.loadUser}/>
          :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
     }
      </div>
    );
  }
}

export default App;