import React from 'react';


const SignIn = ({onRouteChange}) => {
return(
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
			<main className="pa4 black-80">
			  <form className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
			      </div>			      
			    </fieldset>
			    <div className="">
			      <input className="br1 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" value="Sign in" onClick={ () => onRouteChange('home')}/>
			    </div>
			    <br/>
			    <div className="">
			      <input className="br1 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      	type="submit" value="Register" onClick={ () => onRouteChange('register')}/>
			    </div>
			  </form>
			</main>
		</article>
	);
}

export default SignIn;