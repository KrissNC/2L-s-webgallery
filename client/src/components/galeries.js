import React, { Component } from 'react'
import './galeries.css'

import FamilyGallery from './familyGallery'


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

    render() {
        return (
            this.state.families.map(family => <FamilyGallery key={family.family} family={family.family} label={family.label}></FamilyGallery>)
        )
    }
}

export default Galeries;
