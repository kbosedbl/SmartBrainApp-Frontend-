import React from 'react';


class SignIn extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}	

	onSubmitSignIn = () => {
		var flag = 1 ;
	    fetch('http://localhost:3000/signin', {
	      method: 'post',
	      headers: {'Content-Type': 'application/json'},
	      body: JSON.stringify({
	        		email: this.state.signInEmail,
	        		password: this.state.signInPassword
	      		})
		  })	     
		.then(response => response.json())
	    .then(user => {
		    	if(user.id){
          			this.props.loadUser(user);
          			this.props.onRouteChange('home');
        		}
	        	else
	        	{
	        		this.props.onRouteChange('signout');
	        	}
	      })
	    		
	   			 	
	    this.props.onRouteChange('home');
	    				//this.props.loadUser( data );
	   			 	
	    		
  	}

	render(){
		return(
				<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
					<main className="pa4 black-80">
					  <form className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address"
					        onChange = {this.onEmailChange}/>
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
					         type="password"
					         name="password"
					         id="password"
					         onChange = {this.onPasswordChange}/>
					      </div>			      
					    </fieldset>
					    <div className="">
					      <input className="br1 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" value="Sign in" onClick={ () => this.onSubmitSignIn()} />
					    </div>
					    <br/>
					    <div className="">
					      <input className="br1 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" value="Register" onClick={ () =>this.props.onRouteChange('register')}/>
					    </div>
					  </form>
					</main>
				</article>
			);
	}
}

export default SignIn;