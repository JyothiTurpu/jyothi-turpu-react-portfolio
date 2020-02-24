import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from './portfolio-item';


export default class PortfolioContainer extends Component {
    constructor() {
        super();
        this.state = {
            "pageTitle": "Welcome to my portfolio",
            "data": [
                // { title: 'NMS', category: 'e-commerce', slug: 'nms' },
                // { title: 'Reflexis', category: 'Scheduling', slug: 'reflexis' },
                // { title: 'MicroSoft', category: 'Enterprise', slug: 'microsoft' },
                // { title: 'Amazon', category: 'e-commerce', slug:'amazon' }
            ],
            isLoading: false
        };
        // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        // this.getPortfolioItems = this.getPortfolioItems.bind(this);
    }


    getPortfolioItems() {
        // const axios = require('axios');
 
        // Make a request for a user with a given ID
        axios.get('https://jyothiturpu.devcamp.space/portfolio/portfolio_items')
        .then(response => {
            // handle success
            console.log("Response DATA", response);
            this.setState({
                data: response.data.portfolio_items
            })
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
        .finally(() => {
            // always executed
        });
    }

    portfolioItems() {
        return (this.state.data.map((item) => {
            console.log(item);
            return <PortfolioItem key = {item.id} title = {item.name}
            url = {item.url}  slug = {item.id} />
        }));
    }

    // handlePageTitleUpdate() {
    //     this.setState({
    //         pageTitle: 'Something Else'
    //     });
    // }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter((item) => {
                return item.category === filter;
            })
        });
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if(this.state.isLoading){
            return <div>Loading...</div>
        }
        
        return ( 
            <div>
            <h2 > { this.state.pageTitle } </h2> 
            { this.portfolioItems() } 
            <hr />
            {/* <button onClick={this.handlePageTitleUpdate}>Change Title</button> */}
            <button onClick = {() => this.handleFilter('e-commerce')}>e-commerce</button>
            <button onClick = {() => this.handleFilter('Scheduling')}>Scheduling</button>
            <button onClick = {() => this.handleFilter('Enterprise')}>Enterprise</button>
            </div>
        );
    }
}