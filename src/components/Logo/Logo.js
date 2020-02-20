import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import 'tachyons';
import './Logo.css';

const Logo = () =>{
	return (
		<div className = 'ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 125, width: 125 }} >
 				<div className="Tilt-inner pa2"><span> <img src={brain} alt='HEHE'/> </span></div>
			</Tilt>		           
		</div>
	);
}

export default Logo;