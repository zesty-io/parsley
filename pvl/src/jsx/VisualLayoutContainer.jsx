
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import VisualToolbar from './VisualToolbar'
import VisualLayout from './VisualLayout'

class VisualLayoutContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
       
        return (
            <div className="pvlVisualLayout">
               <VisualToolbar></VisualToolbar>
               <VisualLayout></VisualLayout>
            </div>
        );
    }
}

export default VisualLayoutContainer;




