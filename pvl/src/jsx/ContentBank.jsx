
import React, { Component } from 'react'
import LayoutObjectText from './LayoutObjectText'

class ContentBank extends React.Component {
    constructor(props) {
        
        super(props);
        console.log(this.props.fetchURL)
    }

    getModel() {

    }

    render() {

        return (
            <div className="pvlContentBank">
                <h2>Content Bank</h2>
                <div className="content">
                    <LayoutObjectText isReady="true" id="1"></LayoutObjectText>
                    <LayoutObjectText isReady="true" id="2"></LayoutObjectText>
                </div>
            </div> 
        );
    }
}

export default ContentBank;



