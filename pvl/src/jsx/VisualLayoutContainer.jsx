
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
        let rootColumnName = `layout:root:column:0`
        let tree = {}
        tree[rootColumnName] = {
                            name: rootColumnName,
                            children: {}
                            }
        this.state = {
            selected: 'visual',
            rootColumnName:  rootColumnName,
            tree: tree
        }
        this.baseColumn = React.createRef();
    }
    changeTab(name){
        this.setState({
            selected: name
        })
    }

    removeFromTree = (parentID, childID) => {
        let tree = {...this.state.tree}
        console.log('removing from tree')
        // search tree to remove the reference
        // find parent
        // delete child
    }
    /**     
        buildTree gets pass around to child elements as a prop, it gets a 
        newParentID (string) used to look up its insert position 
        oldParent (string) used to look up where it was so we can delete that reference (bank is new)
        elObj (object) full object of the elment to inject, this should include instrcution for build

    */
    buildTree = (newParentID, oldParent, elObj, position) => {
        
        console.log(newParentID,oldParent,elObj,position)

        // if its not from the bank, search to remove it form somewhere else
        if(oldParent != 'bank'){
            //search and remove from tree
        }
        let tree = {...this.state.tree}
        
        console.log('buildtree', elObj)

        tree[newParentID].children[elObj.fullName] = elObj
        this.setState({
            tree: tree
        })

        console.log(this.state.tree)
    }
    codeValue() { 
        
        return 'Code here'; 
    }

    render() {

        let helpText = `Drag and Drop elements form the Content Bank and Layout Tools below.`
        
        
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
                
                <DropColumn buildTree={this.buildTree} removeFromTree={this.removeFromTree} ref={this.baseColumn} key={this.state.rootColumnName} id={this.state.rootColumnName} droppable="true"></DropColumn>
                <textarea className={this.state.selected == "code" ? `pvlCode pvlSelected` : 'pvlCode '} id="pvlCode" defaultValue={this.codeValue()}></textarea>

            </div>
        );
    }
}

export default VisualLayoutContainer;




