import React, { Component } from 'react';
import axios from 'axios';
import BlogItem from '../blog/blog-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlogModal from '../modals/blog-modal';

export default class Blog extends Component{

  constructor(props){
    super(props);

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false
    }

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll',this.onScroll, false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }


  handleSuccessfulNewBlogSubmission(blog) {
    this.setState({
      blogModalIsOpen: false,
      blogItems: [blog].concat(this.state.blogItems)
    });
  }


  handleModalClose() {
    this.setState({
      blogModalIsOpen: false
    })
  }


  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true
    })
  }


  onScroll() {
      if(this.state.isLoading || this.state.blogItems.length === this.state.totalCount)
        return;

      if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        console.log("End of Document Reached, Fetch more POSTS!");
        this.getBlogItems();
      }
  }

  getBlogItems() {
    this.setState({currentPage: this.state.currentPage + 1});
    axios.get(`https://jyothiturpu.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, { withCredentials: true }).
    then(response => {
      console.log('Response received in getBlogItems', response.data);
      this.setState({
        blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
        totalCount: response.data.meta.total_records,
        isLoading: false
      });
      console.log(this.state);
    }).
    catch(error => {
      console.log('Error in getBlogItems', error);
    });
  }

  componentWillMount() {
    this.getBlogItems();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  handleDeleteClick(blog) {
    axios.delete(`https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`,{ withCredentials: true })
    .then(response => {
      this.setState({
        blogItems: this.state.blogItems.filter(blogItem => {
          return (blog.id !== blogItem.id)})
      });

      return response.data;
    })
    .catch(error => {
      console.log('Error in DeleteBlog ',error);
    });
  }


  render() {
    const blogRecords = this.state.blogItems.map(blogItem => 
    {
      if(this.props.loggedInStatus === 'LOGGED_IN') {
        return (
          <div key={blogItem.id} className="admin-blog-wrapper">
            <BlogItem blogItem={blogItem}/>
            <a onClick={() => {this.handleDeleteClick(blogItem)}}>
                <FontAwesomeIcon icon='trash' />
            </a>
          </div>
        )
      } else {
        return <BlogItem key={blogItem.id} blogItem={blogItem}/>
      }
    });
  
    return (
      <div className="blog-container">
        
        <BlogModal handleModalClose={this.handleModalClose}
        modalIsOpen={this.state.blogModalIsOpen}
        handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}/>
        
        {(
        this.props.loggedInStatus === 'LOGGED_IN' ? 
                              <div className="new-blog-link">
                              <a onClick={this.handleNewBlogClick}>
                                  <FontAwesomeIcon icon='plus-circle'/>
                              </a>
                              </div>
          : 
                              null
        )}
        
        
        <div className="content-container">
          {blogRecords}
        </div>
        
        {
          this.state.isLoading ? 
                            (<div className='content-loader'>
                              <FontAwesomeIcon icon='spinner' spin />
                            </div>) 
                            : null
        }
      </div>
    );
  }
}
