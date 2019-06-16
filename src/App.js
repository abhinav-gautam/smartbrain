import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import About from './components/About/About'
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
  isFaceDetected:false,
  isUploading:false,
  selectedImage:null,
  fileName:'',
  faceCount:0,
  url:"",
  progress:0,
  serverResponse:0,
  clearBoundingBox:false,
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

  componentWillMount(){
    if(localStorage.getItem('isSignedIn') && localStorage.getItem('user')){
      this.setState({
        user:JSON.parse(localStorage.getItem('user')),
        route:'home',
        isSignedIn:true
      })
    }
  }
  componentDidUpdate(){
    if (this.state.isSignedIn){
      localStorage.setItem('isSignedIn',true)
      localStorage.setItem('user',JSON.stringify(this.state.user))
    }
    if(this.state.isInputDetected || this.state.isImageUploaded){
      this.setState({clearBoundingBox:true})
    }
    if(this.state.isInputDetected){
      this.setState({imageUrl:this.state.input, isInputDetected:false})
    }
    if(this.state.isImageUploaded){
      this.setState({imageUrl:this.state.url, isUploading:false, isImageUploaded:false})
    }
  }
  imageFileHandler=event=>{
    this.setState({selectedImage:event.target.files[0]})
    if (event.target.files[0]){
      this.setState({fileName:event.target.files[0].name})
    }
 	 }

 	imageUploadHandler = () =>{
    if (this.state.selectedImage) {
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
    this.setState({regions, faceCount:regions.length})

  }

  onInputChange = (event)=>{
    this.setState({input:event.target.value, isInputDetected:true})
  }

  onButtonSubmit = ()=>{
    this.setState({fileName:null, clearBoundingBox:false})
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
        this.setState({serverResponse:200})
        fetch("https://secret-mountain-68931.herokuapp.com/image",{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              id:this.state.user.id
          })  
        })
        .then(response=>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count,isFaceDetected:true,faceCount:0}))
        })
        this.calculateFaceLocation(response)
      }else{
        this.setState(Object.assign(this.state.user,{isFaceDetected:false,serverResponse:404}))
    }
    })
    .catch(err=>console.log(err))
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
      localStorage.removeItem('isSignedIn')
      localStorage.removeItem('user')
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }

    this.setState({route:route})
  }
  render() {
    const {isSignedIn, regions, imageUrl, isFaceDetected, serverResponse}=this.state

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
           <FaceRecognition clearBoundingBox={this.state.clearBoundingBox} regions={regions} faceCount={this.state.faceCount} serverResponse={serverResponse} isFaceDetected={isFaceDetected} imageUrl={imageUrl}/>
        </div>
        :(
          this.state.route==='signin'
          ?<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} setLocalStorage={this.setLocalStorage}/>
          :(
            this.state.route==='about'
            ?<About/>
            :<Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} setLocalStorage={this.setLocalStorage}/>
          )
        )
     }
      </div>
    );
  }
}

export default App;