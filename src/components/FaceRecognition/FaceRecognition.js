import React from 'react';
import './FaceRecognition.css'


const FaceRecognition =({regions, isFaceDetected, imageUrl})=>{

	let faceCount=0;
	let boundingBox=[]
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
	return(
	<div className="center ma">
		{
			isFaceDetected===false
				?<p className="db fw6 lh-copy f6 red">*Bad Image or Image URL</p>
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