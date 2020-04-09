import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Blog extends Component{

  constructor(props){
    super(props);

    this.state = {
      blogItems: []
    }

    this.getBlogItems = this.getBlogItems.bind(this);
  }

  getBlogItems() {
    axios.get('https://jyothiturpu.devcamp.space/portfolio/portfolio_blogs', { withCredentials: true }).
    then(response => {
      console.log('Response received in getBlogItems', response);
      this.setState({
        blogItems: response.data.portfolio_blogs
      })
    }).
    catch(error => {
      console.log('Error in getBlogItems', error);
    });
  }

  componentWillMount() {
    this.getBlogItems();
  }

  render() {
    return (
      <div>
        <h2>Blog</h2>
  
        <div>
          <Link to='/about-me'>Read more about myself</Link>
        </div>
        
      </div>
    )
  }
}
