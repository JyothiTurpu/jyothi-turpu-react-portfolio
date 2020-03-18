import React from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';

const NavigationContainer = (props) => {

  const dynamicLink = (route, linkText) => {  
    return (
      <div className='nav-link-wrapper'>
                  <NavLink to={route} activeClassName='nav-link-active'>{linkText}</NavLink>
      </div>
    );
  }

  const handleSignOut = () => {
    axios.delete('https://api.devcamp.space/logout', {withCredentials: true})
    .then(response => {
      if(response.status === 200){
        props.history.push('/');
        props.handleSuccessfulLogout();
      }
      return response.data;
    })
    .catch(error => {
      console.log('Error Signing Out', error);
    });
  }
  
    return (
      <div className='nav-wrapper'>
          <div className='left-side'>
              <div className='nav-link-wrapper'>
                   <NavLink exact to='/' activeClassName='nav-link-active'>Home</NavLink>
              </div>

              <div className='nav-link-wrapper'>
                  <NavLink to='/about-me' activeClassName='nav-link-active'>About</NavLink>
              </div>

              <div className='nav-link-wrapper'>
                  <NavLink to='/contact' activeClassName='nav-link-active'>Contact</NavLink>
              </div>

              <div className='nav-link-wrapper'>
                  <NavLink to='/blog' activeClassName='nav-link-active'>Blog</NavLink>
              </div>

              {props.loggedInStatus === 'LOGGED_IN' ? ( dynamicLink('/portfolio-manager', "PortfolioManager") ) : null}
              {/* {false ? <NavLink to='/addBlog' activeClassName='nav-link-active'>Add Blog</NavLink> : null } */}
          </div>
          
          <div className='right-side'>
                JYOTHI TURPUS
                {props.loggedInStatus === 'LOGGED_IN' ? 
                <a onClick={handleSignOut}>Sign Out</a> : null}
          </div>
      </div>
    );
}

export default withRouter(NavigationContainer);