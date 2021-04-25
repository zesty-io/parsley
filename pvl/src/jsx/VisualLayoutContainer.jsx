
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import DeleteArea from './DeleteArea'
import PVLToolbar from './PVLToolbar'
import DropColumn from './DropColumn'

class VisualLayoutContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'visual', 
            tree:{}

            
        }
        this.baseColumn = React.createRef();
    }
    changeTab(name){
        this.setState({
            selected: name
        })
    }
    buildTree(element){
        let tree = {...this.state.tree}
        console.log('buildtree', element)
    }
    codeValue() { 
        console.log('inner',this.baseColumn)
        if(this.baseColumn.current !== null){
            const el = this.baseColumn.current.decoratedRef.current;
            console.log('el', el);
            console.log('el_inner', el.innerHTML);
            console.log(this.baseColumn.current.props.children)
        }
        return (this.baseColumn.current !== null) ? this.baseColumn.current.innerHTML : ''; 
    }

    render() {
        let helpText = `Drag and Drop elements form the Content Bank and Layout Tools below.`
        let rootColumnName = `layout:root:column:0`
        return (
            <div className="pvlVisualLayoutContainer">
                <PVLToolbar title="Parsley Visual Layout" helpText={helpText}></PVLToolbar>
                <div className="pvlUtilities">
                    <div className="pvlVisualTabBar">
                        <button className={this.state.selected == "visual" ? `pvlSelected` : ''} onClick={() => {this.changeTab('visual')} }>Visual Layout</button>
                        <button className={this.state.selected == "code" ? `pvlSelected`: ''}  onClick={() => {this.changeTab('code')} }>Code Output</button>
                    </div> 
                    <DeleteArea></DeleteArea>
                </div>
                
                <DropColumn buildTree={() => this.buildTree(rootColumnName,{} )} ref={this.baseColumn} key={rootColumnName} id={rootColumnName} droppable="true"></DropColumn>
                <textarea className={this.state.selected == "code" ? `pvlCode pvlSelected` : 'pvlCode '} id="pvlCode" defaultValue={this.codeValue()}></textarea>

            </div>
        );
    }
}

export default VisualLayoutContainer;




