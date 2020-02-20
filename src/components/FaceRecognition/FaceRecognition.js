import React from 'react';
import './FaceRecognition.css';

const FaceRecognition =({imageUrl , box}) =>{
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' src={imageUrl} alt='' width='500px' height='auto'/>
				<div style={{top : box.leftCol, right : box.topRow, bottom : box.rightCol, left :box.bottomRow}} className='bounding-box'>
				</div>
			</div>
		</div>
	);
}

export default FaceRecognition;