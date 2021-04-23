
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import PVLToolbar from './PVLToolbar'
import DropColumn from './DropColumn'

class VisualLayoutContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let helpText = `Drag and Drop elements form the Content Bank and Layout Tools below.`
        return (
            <div className="pvlVisualLayoutContainer">
               <PVLToolbar title="Parlsey Visual Layout" helpText={helpText}></PVLToolbar>
               <DropColumn key="column:00"></DropColumn>
            </div>
        );
    }
}

export default VisualLayoutContainer;




