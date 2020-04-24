import React, { Component } from 'react';
import Axios from 'axios';

export default class PortfolioDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      portfolioItem: {}
    };
  }


  componentWillMount() {
    this.getPortfolioItem();
  }


  getPortfolioItem() {
    Axios.get(`https://jyothiturpu.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,{ withCredentials: true })
    .then(response =>  {
      console.log('Portfolio Item Received in getPortfolioItem  ', response.data.portfolio_item);
      this.setState({
        portfolioItem: response.data.portfolio_item
      });
    })
    .catch(error => {
      console.log('Error in fetching portfolio item inside getPortfolioItem  ',error);
    });
  }

  render() {
    const { name, description, url, category, logo_url, banner_image_url, thumb_image_url } = this.state.portfolioItem;

    const bannerStyles = {
      backgroundImage: 'url('+banner_image_url+')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    };

    const logoStyles ={
      width: '200px'
    };

    return (
      <div className='portfolio-detail-wrapper'>
        <div className="banner" style={bannerStyles}>
          <img src={logo_url} alt="" style={logoStyles}/>
        </div>

        <div className="portfolio-detail-description-wrapper">
            <div className="description">
              {description}
            </div>
        </div>

        <div className="bottom-content-wrapper">
          <a href={url} className='site-link' target='_blank'>
            Visit {name}
          </a>
        </div>
      </div>
    );
  }
  
}
