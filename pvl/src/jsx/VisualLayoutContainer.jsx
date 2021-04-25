
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
        console.log('removing',childID, 'from tree',tree)
        let keypath = this.getKeyPath(tree, parentID);
        console.log(keypath)
        let objectPathString = 'tree';
        for (const element of keypath) {
           objectPathString += `['${element}'].children`
        }
        objectPathString += `['${parentID}'].children['${childID}']`

        console.log('remove path', objectPathString)

        eval(`delete(${objectPathString})`);
        
        // search tree to remove the reference
        // find parent
        // delete child
    }
    /**     
        buildTree gets passed around to DropColumn and LayoutObject components to call up VisualLayout
        its called only in DropColumns add/remove object, which also is a call back. Those functions contain
        the correct elements to populated needed data to build a tree that mimics the ui output

        newParentID (string) used to look up its insert position 
        oldParent (string) used to look up where it was so we can delete that reference (bank is new)
        elObj (object) full object of the elment to inject, this should include instrcution for build
        note position is handled in the object, and dealth with after

    */
    buildTree = (newParentID, oldParent, elObj) => {
        
        //console.log(newParentID,oldParent,elObj)
        let tree = {...this.state.tree}

        // if its not from the bank, search to remove it form somewhere else
        if(oldParent != 'bank'){ 
            //search and remove from tree
        }
        console.log('searching for',newParentID)
        let keypath = this.getKeyPath(tree, newParentID);
        console.log(keypath)
        let objectPathString = 'tree';
        for (const element of keypath) {
           objectPathString += `['${element}'].children`
        }
        // need to clean up this path and cast the object successfully
        objectPathString = objectPathString.slice(0, -9) // remove the ending .children
        console.log(objectPathString)
        
        if(keypath.length > 1){
            eval(objectPathString).children = this.deepTreeAddRecursion(tree, newParentID, elObj)
        } else {
            tree = this.deepTreeAddRecursion(tree, newParentID, elObj)
        }
        //eval(objectPathString) = this.deepTreeAddRecursion(tree, newParentID, elObj)
        

        this.setState({
            tree: tree
        })

        console.log("updated tree", this.state.tree)
        return  true
    }

    /*
    * getKeyPath recursively searches through the tree object's keys with .children, return an array of the path to get there
    * This is used to build a deep reference to set the
    */
    getKeyPath(tree, keyToSearch, keyMapArr=[]){
        if(tree[keyToSearch] != undefined && tree[keyToSearch].children != undefined){
            //keyMapArr.push(keyToSearch) the last key push isnt needed because deepTreeAddRecursion() already returns it
            return keyMapArr
        } else {
            for (const [key, obj] of Object.entries(tree)) {
                if(tree[key].children != undefined){
                    keyMapArr.push(key)
                    return this.getKeyPath(tree[key].children, keyToSearch, keyMapArr)
                }
            }
        }
    }

    /*
    * deepTreeAddRecursion 
    * digs through the key to where to add the item, returns the children of the key it was added
    * for anything beyond the root, getKeyPath is needed to dynamically find the child which the returned
    * tree will be assigned to
    */

    deepTreeAddRecursion(tree, keyToSearch, objectToAdd){
        if(tree[keyToSearch] != undefined && tree[keyToSearch].children != undefined){
            tree[keyToSearch].children[objectToAdd.fullName] = objectToAdd
            //console.log('hit')
            return tree
        } else {
            for (const [key, obj] of Object.entries(tree)) {
                if(tree[key].children != undefined){
                    //console.log('inside')
                    return this.deepTreeAddRecursion(tree[key].children, keyToSearch, objectToAdd)
                }
            }
        }

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




