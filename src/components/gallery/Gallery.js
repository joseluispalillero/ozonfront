import React, { Component } from 'react';
import Zoom from 'react-img-zoom'

import    './Gallery.css';
import {ImageList, ImageListItem} from "@material-ui/core";

export default class Gallery extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            url: ''
        }
    }

    render() {
        return(
            <ImageList
                sx={{ width: 900, height: 450 }}
                variant="quilted"
                cols={4}
                rowHeight={121}>
                {this.props.data.data.map((url, index) => (
                    <ImageListItem key={url}>
                        <Zoom
                            img={`${url}`}
                            zoomScale={3}
                            width={600}
                            height={600}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        )
    }

    openModal = (url) => {
        this.setState({
            showModal: true,
            url: url
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            url: ''
        })
    }
}
