
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import DeleteArea from './DeleteArea'
import PVLToolbar from './PVLToolbar'
import DropColumn from './DropColumn'

class VisualLayoutContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'visual'
        }
    }
    changeTab(name){
        this.setState({
            selected: name
        })
    }
    render() {
        let helpText = `Drag and Drop elements form the Content Bank and Layout Tools below.`
        return (
            <div className="pvlVisualLayoutContainer">
                <PVLToolbar title="Parsley Visual Layout" helpText={helpText}></PVLToolbar>
                <div className="pvlUtilities">
                    <div className="pvlVisualTabBar">
                        <button className={this.state.selected == "visual" ? `pvlSelected` : ''} onClick={() => {this.changeTab('visual')} }>Visual Layout</button>
                        <button className={this.state.selected == "code" ? `pvlSelected`: ''}  onClick={() => {this.changeTab('code')} }>Parsley HTML Code</button>
                    </div>
                    <DeleteArea></DeleteArea>
                </div>
                
                <DropColumn key="column:00" id="column:00" droppable="true"></DropColumn>
                <textarea className={this.state.selected == "code" ? `pvlCode pvlSelected` : 'pvlCode '} id="pvlCode" defaultValue="HTML"></textarea>

            </div>
        );
    }
}

export default VisualLayoutContainer;




