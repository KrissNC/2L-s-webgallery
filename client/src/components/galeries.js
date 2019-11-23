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
        .then( families => this.setState({families}) );
//        .then( families => this.setState({families}, ()=>console.log('fetched families..', families); ))
    }
//                {this.state.families.map(family => {<li>afficher la famille {family.label}</li>})}

    render() {
        return (
            <ul>
            {this.state.families.map(family => <li>afficher la famille {family.label}</li>)}
            </ul>
        )
    }
}

export default Galeries;
