
import React, { Component } from 'react'

/**
 * LayoutBank is a component that takes an array of layout objects in the property `objects`
 * if objects is undefined or 0 in length, this component renders an empty div. The component outputs
 * that array of objects into LayoutObjects that are draggable objects for the visual layout tool
 */

class CodeOutput extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef()
    } 

    getCodeOutput(){
        return 'code'
    }

    render() {
        return ( 
            <div className={this.props.selected == "code" ? `pvlCode pvlSelected` : 'pvlCode '}>
                <textarea ref={this.textarea}  id="pvlCode" readOnly value={this.getCodeOutput()}></textarea>
            </div>
        );
    }
}

export default CodeOutput;



