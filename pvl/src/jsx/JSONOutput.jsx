
import React, { Component } from 'react'

/**
 * LayoutBank is a component that takes an array of layout objects in the property `objects`
 * if objects is undefined or 0 in length, this component renders an empty div. The component outputs
 * that array of objects into LayoutObjects that are draggable objects for the visual layout tool
 */

class JSONOutput extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef()
    } 
    
    render() {
        return ( 
            <div className={this.props.selected == "json" ? `pvlJSON pvlSelected` : 'pvlJSON '}>
                <textarea ref={this.textarea}  id="pvlJSON" readOnly value={this.props.json}></textarea>
            </div>
        );
    }
}

export default JSONOutput;



