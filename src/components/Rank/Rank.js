import React from 'react';
//import './ImageLinkForm.css';

const Rank = ({name,entries}) =>{
	console.log(name);
	console.log(entries);
	return (
		<div>
      		<div className='white f3'>
        		{`Your current entry count is...`}
      		</div>
      		<div className='white f1'>
        		{entries}
      		</div>
    	</div>
	);
}

export default Rank;