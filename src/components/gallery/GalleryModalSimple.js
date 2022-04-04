import React, { Component } from 'react'
import {button} from "@material-ui/core";

export default class GalleryModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            src: ''
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.src !== '') {
            this.setState({
                src: nextProps.src
            })
        }
    }

    render() {
        if(this.props.isOpen === false) {
            return null
        }

        return(
            <div className="modal-overlay" >
                <div className="modal-body" >
                    <button className="modal-close" onClick={this.props.closeModal} >
                        <span className='fa fa-times' />
                    </button>
                    <img src={this.state.src} alt="" />
                </div>
                <button className='card-arrow-left' onClick={() => this.changeImage(this.props.data.data[this.props.data.data.indexOf(this.state.src)-1])} >
                    <span className='fa fa-arrow-left' />
                </button>

                <button className='card-arrow-right' onClick={() => this.changeImage(this.props.data.data[this.props.data.data.indexOf(this.state.src)+1])} >
                    <span className='fa fa-arrow-right' />
                </button>
            </div>
        )
    }

    changeImage = (url) => {
        if(url !== undefined){
            this.setState({
                src: url
            })
        }
    }
}
