
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import PVLToolbar from './PVLToolbar'
import VisualLayout from './VisualLayout'

class VisualLayoutContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let helpText = `Drag and Drop elements form the Content Bank and Layout Tools below.`
        return (
            <div className="pvlVisualLayoutContainer">
               <PVLToolbar title="Visual Layout" helpText={helpText}></PVLToolbar>
               <VisualLayout></VisualLayout>
            </div>
        );
    }
}

export default VisualLayoutContainer;




