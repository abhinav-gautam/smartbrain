import React from 'react';
import './FaceRecognition.css'


const FaceRecognition =({clearBoundingBox, regions, isFaceDetected, imageUrl, faceCount, serverResponse})=>{


	let boundingBox=[]
	if(faceCount===0){
		boundingBox=[]
	}
	if (regions){
		faceCount = regions.length
		if (faceCount!==0){
			for (var i = 0; i < regions.length; i++) {
				const imageLocation=regions[i].region_info.bounding_box
				const image=document.getElementById('inputImage');
				const width=Number(image.width);
				const height= Number(image.height);
				const topRow=imageLocation.top_row*height
				const leftCol=imageLocation.left_col*width
				const bottomRow=height-(imageLocation.bottom_row*height)
				const rightCol=width-(imageLocation.right_col*width)
				boundingBox.push(<div key={i} className="bounding-box" style={{top:topRow, bottom:bottomRow, left:leftCol, right:rightCol}}></div>) 
			}
		}
	}
	if(clearBoundingBox){
		boundingBox=null
	}
	return(
	<div className="center ma">
		{
			serverResponse===404
			?(
				isFaceDetected===false
				?<p className="db fw6 lh-copy f6 red">*Bad Image or Image URL</p>
				:null
			)
			:null
		}
		<div className="absolute mt3">
			<div id="parent">
				<img id='inputImage' alt="" src={imageUrl} style={{width:'500px',height:'auto'}}/>
				{
					faceCount!==0
					?boundingBox
					:null
				}
			</div>
		</div>
	</div>
	)
}

export default FaceRecognition;