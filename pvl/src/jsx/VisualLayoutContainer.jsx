
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import DeleteArea from './DeleteArea'
import PVLToolbar from './PVLToolbar'
import DropColumn from './DropColumn'
import CodeOutput from './CodeOutput'

// VisualLayoutContainer 
// is the working Component that maintains the primary state of the layout and code objects
// it has important tree building functions which it recursively seeds as callback function props in DropColumn(s) and LayoutObject(s) components

class VisualLayoutContainer extends React.Component {
    constructor(props) {
        super(props);
        // sets up the first child object (root) in our tree
        // tree is fed to the CodeOutput component for creating HTML output
        let rootColumnName = `layout:root:column:0`
        let tree = {}
        tree[rootColumnName] = {
            name: rootColumnName,
            html: `<div class="root"></div>`,
            children: {}
        }

        this.state = {
            selected: 'visual',
            rootColumnName:  rootColumnName,
            tree: tree
        }
        
    }

    // state switcher for "selected" which dtermines CSS class output for layering logic
    changeTab(name){
        this.setState({
            selected: name
        })
    }

    /**
        removeFromTree 
        Finds a direct path to the parent and child to delete it from the states tree object
        and upates the 

        @parentID (string) ID of parent key 
        @childID (string) ID of child key
     */

    removeFromTree = async (parentID, childID) => {
        // this ends up being referenced dyanmically in a string which is EVAL'd
        let tree = {...this.state.tree}
        console.log(`------- remove ${childID} from tree ---------`);
        // gets each key needed to access the parent (doesnt return parent as a key)
        const keypath = await this.getKeyPath(tree, parentID);
        // build out the target path for the object
        let objectPathString = 'tree';
        for (const element of keypath) {
           objectPathString += `['${element}'].children`
        }
        // different from buildTree, we appened the parent and child to the end
        // becaue we want the absolute path to delete
        objectPathString += `['${childID}']`
        // using EVAL so we can turn out string into an object path
        eval(`delete(${objectPathString})`);

        // update the state with new tree
        this.setState({
            tree: tree
        })

    }
    /**     
        buildTree gets passed around to DropColumn and LayoutObject components to call up VisualLayout
        its called only in DropColumns add/remove object, which also is a call back. Those functions contain
        the correct elements to populated needed data to build a tree that mimics the ui output

        @newParentID (string) used to look up its insert position 
        @oldParent (string) used to look up where it was so we can delete that reference (bank is new)
        @elObj (object) full object of the elment to inject, this should include instrcution for build
        
        note position is handled in the object, and dealt with after by the code output component

    */
     buildTree = async (newParentID, oldParent, elObj) =>  {
        
        // access tree in a temp derefered object
        let tree = {...this.state.tree}
       
        if(oldParent != 'bank'){ 
            // handle if is from bank...?
        }

        console.log("--------- buildTree ---------");
        
        // get keypath, an array of keys which chained together accesse
        const keypath = await this.getKeyPath(tree, newParentID);
        
        // build the string which will be the object key path
        let objectPathString = 'tree';
        for (const element of keypath) {
            objectPathString += `['${element}'].children`
        }
        // remove the ending .children because to make eval on the string, we call .children off it (hax)
        objectPathString = objectPathString.slice(0, -9) 
        
        console.log('objecting adding ', elObj)
        // add the new children
        if(eval(objectPathString).hasOwnProperty('children')){
            eval(objectPathString).children[elObj.fullName] = elObj
        }
       
        // update the state
        this.setState({
            tree: tree
        })
        console.log('updated tree:',tree)

    }

    /** 
        getKeyPath 
        recursively searches through the tree object's keys with .children, return an array of the path to get there
        This is used to build a deep reference to set 

        @tree (object) the tree object from state.tree
        @keyToSearch (string) the key of the object to find
        @keyMapArr (Array) an array param that is used recursively, and is ultimately returned

        @return Array 
    
    */
     getKeyPath = async (childTree, keyToSearch) => {
        var finalArray = []
        // this checks each child (1 or 100) for a hit
        function iter(childTree, keyToSearch, keyMapArr=[]){
            if(childTree.hasOwnProperty(keyToSearch) && childTree[keyToSearch].hasOwnProperty('children')){ //
                 // the last key push isnt needed because deepTreeAddRecursion() already returns it
                finalArray = [...keyMapArr, keyToSearch]
            } 
            if(Object.keys(childTree).length > 0){
                // if not hit, loop through each child and recurse
                for (const [key, obj] of Object.entries(childTree)) {
                    //console.log('keypathiterating', key, obj)
                    if(obj.hasOwnProperty('children')){
                        iter(obj.children, keyToSearch, [...keyMapArr, key]) // we add the key to the array here instead of pushing on the main one
                    }
                } 
            }
        }
        
        iter(childTree, keyToSearch, [])
        return finalArray;
      
    }

    render() {

        let helpText = `Drag and Drop elements form the Content Bank and Layout Tools below.`
        
        return (
            <div className="pvlVisualLayoutContainer">
                <PVLToolbar title="Parsley Visual Layout" helpText={helpText}></PVLToolbar>
                <div className="pvlUtilities">
                    <div className="pvlVisualTabBar">
                        <button className={this.state.selected == "visual" ? `pvlSelected` : ''} onClick={() => {this.changeTab('visual')} }>
                            <span className="fa fa-pen"></span><span>Visual Layout</span>
                        </button>
                        <button className={this.state.selected == "code" ? `pvlSelected`: ''}  onClick={() => {this.changeTab('code')} }>
                            <span className="fa fa-code"></span><span>Code Output</span>
                        </button>
                    </div> 
                    <DeleteArea></DeleteArea>
                </div>
                
                <DropColumn buildTree={this.buildTree} removeFromTree={this.removeFromTree} key={this.state.rootColumnName} id={this.state.rootColumnName} droppable="true"></DropColumn>
                <CodeOutput selected={this.state.selected} tree={this.state.tree}></CodeOutput>
            </div>
        );
    }
}

export default VisualLayoutContainer;




