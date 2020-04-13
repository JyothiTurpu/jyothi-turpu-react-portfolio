import React, { Component } from 'react';
import axios from 'axios';
import BlogItem from '../blog/blog-item';

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
    const blogRecords = this.state.blogItems.map(blogItem => 
    {return <BlogItem key={blogItem.id} blogItem={blogItem}/>});
  
    return (
      <div className="blog-container">
        <div className="content-container">
          {blogRecords}
        </div>
      </div>
    );
  }
}
