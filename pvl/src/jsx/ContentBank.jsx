
import React, { Component } from 'react'
import LayoutObjectText from './LayoutObjectText'

class ContentBank extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="pvlContentBank">
                <h2>Content Bank</h2>
                <div className="content">
                    <LayoutObjectText></LayoutObjectText>
                    <LayoutObjectText></LayoutObjectText>
                </div>
            </div> 
        );
    }
}

export default ContentBank;



