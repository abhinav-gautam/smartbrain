import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import {storage} from './components/Firebase'
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
  regions:[],
  route:'signin',
  isSignedIn:false,
  isImageUploaded:false,
  isInputDetected:false,
  isFaceDetected:true,
  isUploading:false,
  selectedImage:null,
  fileName:'',
  url:"",
  progress:0,
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

  imageFileHandler=event=>{
    this.setState({selectedImage:event.target.files[0]})
    this.setState({fileName:event.target.files[0].name})
    console.log("imageFileHandler done")
 	 }

 	imageUploadHandler = () =>{
	    const uploadTask = storage.ref(`images/${this.state.selectedImage.name}`).put(this.state.selectedImage)
      console.log("imageUploadHandler done")
      this.setState({isUploading:true})
	    uploadTask.on('state_changed',
	      (snapshot)=>{
	        //progress
	        const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
	        this.setState({progress})
	      },
	      (error)=>{
	        //error
	        console.log(error)
	      },
	      ()=>{
	        //complete
	        storage.ref('images').child(this.state.selectedImage.name).getDownloadURL()
	        .then(url=>{
	          console.log(url)
	          this.setState({url, isImageUploaded:true})
	        })
	        .catch(console.log)
	      }
	      );
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
    const regions = data.outputs[0].data.regions
    this.setState({regions})
  }

  onInputChange = (event)=>{
    this.setState({input:event.target.value})
    this.setState({isInputDetected:true})
  }

  onButtonSubmit = ()=>{
    this.setState({fileName:null})
    fetch("https://secret-mountain-68931.herokuapp.com/imageurl",{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          input:this.state.imageUrl
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
        this.calculateFaceLocation(response)
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
    const {isSignedIn, regions, imageUrl, isFaceDetected}=this.state
    if(this.state.isInputDetected){
      this.setState({imageUrl:this.state.input, isInputDetected:false})
    }
    if(this.state.isImageUploaded){
      this.setState({imageUrl:this.state.url, isUploading:false, isImageUploaded:false})
    }
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
           <ImageLinkForm onInputChange={this.onInputChange} fileName={this.state.fileName} isUploading={this.state.isUploading} progress={this.state.progress} imageUploadHandler={this.imageUploadHandler} imageFileHandler={this.imageFileHandler} onButtonSubmit={this.onButtonSubmit}/>
           <FaceRecognition regions={regions} isFaceDetected={isFaceDetected} imageUrl={imageUrl}/>
        </div>
        :(
          this.state.route==='signin'
          ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )
     }
      </div>
    );
  }
}

export default App;