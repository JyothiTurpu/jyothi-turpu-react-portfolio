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


    getPortfolioItems(filter = null) {
        // const axios = require('axios');
 
        // Make a request for a user with a given ID
        axios.get('https://jyothiturpu.devcamp.space/portfolio/portfolio_items')
        // axios.get('https://jordan.devcamp.space/portfolio/portfolio_items')
        .then(response => {
            // handle success
            console.log("Response DATA", response);
            if(filter) {
                this.setState({
                    data: response.data.portfolio_items.filter((item) => {
                        return item.category === filter;
                    })
                });    
            } else {
                this.setState({
                    data: response.data.portfolio_items
                });
            }
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
        if(filter === 'CLEAR_FILTERS') {
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        }
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if(this.state.isLoading){
            return <div>Loading...</div>
        }
        
        return ( 
            <div className="homepage-wrapper">
                <div className="filter-links">
                    <button className='btn' onClick = {() => this.handleFilter('eCommerce')}>eCommerce</button>
                    <button className='btn' onClick = {() => this.handleFilter('Scheduling')}>Scheduling</button>
                    <button className='btn' onClick = {() => this.handleFilter('Enterprise')}>Enterprise</button> 
                    <button className='btn' onClick = {() => this.handleFilter('CLEAR_FILTERS')}>All</button> 
                </div>
                <div className='portfolio-items-wrapper'>
                    { this.portfolioItems() }
                </div>
            </div>
        );
    }
}