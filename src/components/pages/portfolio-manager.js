import React, { Component } from 'react';
import axios from 'axios';
import PortfolioForm from '../portfolio/portfolio-form';
import PortfolioSideBarList from '../portfolio/portfolio-sidebar-list';


export default class PortfolioManager extends Component{
  constructor(props) {
    super(props);

    this.state = {
      portfolioItems: []
    }
    this.handleSuccessfulformSubmission = this.handleSuccessfulformSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }

  handleSuccessfulformSubmission(portfolioItem) {
    console.log('handleSuccessfulformSubmission', portfolioItem);
    this.setState({portfolioItems: [portfolioItem].concat(this.state.portfolioItems)});
  }


  handleFormSubmissionError(error) {
    console.log('Error in handleFormSubmissionError',error);
  }


  getPortfolioItems() {
    axios.get('https://jyothiturpu.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc', { withCredentials: true })
    .then(response => {
      console.log('Response from PortfolioManager ',response);
      this.setState({portfolioItems: [...response.data.portfolio_items]});
    })
    .catch(error => {
      console.log('Error in PortfolioManager',error);
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    return(
      <div className='portfolio-manager-wrapper'>
          <div className='left-column'>
              <PortfolioForm 
              handleSuccessfulformSubmission = {this.handleSuccessfulformSubmission} 
              handleFormSubmissionError = {this.handleFormSubmissionError}/>
          </div>

          <div className='right-column'>
              <PortfolioSideBarList data={this.state.portfolioItems}/>
          </div>
        
      </div>
    );
  }
}