import React, { Component } from 'react'
import './familyGallery.css'
import Gallery from "react-photo-gallery";

class FamilyGallery extends Component {

    constructor() {
        super();

        this.state = {

            familyName:'',
            paintings:[],
            photos : []
        }
    }


    componentDidMount() {
      
    this.setState({familyName: this.props.family});
    //http://localhost:5000/api/getPaintingsByFamily/abstrait
    fetch('/api/getPaintingsByFamily/' + this.props.family)
    .then(res => res.json())
    .then( paintings => this.setState({paintings}) );
  
    }

    render() {

        let photos = [];
        const pictServer = 'http://localhost:5000/';

        this.state.paintings.forEach(painting => {
            photos.push({
                src: pictServer +  painting.dir + '/' + painting.image,
                width: 3,
                height: 4
            })
        });

        // console.log(photos);

        return (
            <React.Fragment>
                <h2>{this.state.familyName}</h2>
                <Gallery photos={photos} />
            </React.Fragment>
        )
    }
}

export default FamilyGallery;
