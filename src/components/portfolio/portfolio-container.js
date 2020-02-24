import React, { Component } from "react";
import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() {
        super();
        this.state = {
            "pageTitle": "Welcome to my portfolio",
            "data": [
                { title: 'NMS', category: 'e-commerce' },
                { title: 'Reflexis', category: 'Scheduling' },
                { title: 'MicroSoft', category: 'Enterprise' },
                { title: 'Amazon', category: 'e-commerce' }
            ],
            isLoading: false
        };
        // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    portfolioItems() {
        return (this.state.data.map((item) => {
            return <PortfolioItem title = { item.title }
            url = "google.com" />
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