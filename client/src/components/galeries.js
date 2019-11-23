import React, { Component } from 'react'
import './galeries.css'

class Galeries extends Component {

    constructor() {
        super();
        this.state = {
            families : []
        }
    }

    componentDidMount() {
        fetch('/api/getFamilies')
        .then(res => res.json())
        .then( families => this.setState({families}, () => console.log('families fetched', families) ) )
    }
    render() {
        return (
            <div>
                galleries new
            </div>
        )
    }
}

export default Galeries;
