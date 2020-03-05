import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from './portfolio-item';


export default class PortfolioContainer extends Component {
    constructor() {
        super();
        this.state = {
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
        // axios.get('https://jordan.devcamp.space/portfolio/portfolio_items')
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
            // console.log("Portfolio Item",item);
            // debugger;
            // Using React Developer Tools

            return <PortfolioItem key={item.id} item={item} />
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
            <div className='portfolio-items-wrapper'>
                <button className='btn' onClick = {() => this.handleFilter('e-commerce')}>eCommerce</button>
                <button className='btn' onClick = {() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button className='btn' onClick = {() => this.handleFilter('Enterprise')}>Enterprise</button>
                { this.portfolioItems() } 
            </div>
        );
    }
}