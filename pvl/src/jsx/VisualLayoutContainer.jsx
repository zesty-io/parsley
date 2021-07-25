
import React, { Component } from 'react'
import DeleteArea from './DeleteArea'
import PVLToolbar from './PVLToolbar'
import DropColumn from './DropColumn'
import CodeOutput from './CodeOutput'
import JSONOutput from './JSONOutput'
import Preview from './Preview'

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
            html: `<div class="pvlRoot">*</div>`,
            children: {}
        }

        this.state = {
            selected: this.props.selected,
            rootColumnName:  rootColumnName,
            tree: tree,
            codeOutput: '',
            loadingState: false
        }
        
    }
    // callback function to change the loading state from JSON file as complete (false)
    loadingComplete = () => {
        this.setState({ 
            loadingState: false
        })
    }

    componentDidUpdate(nextProps) {
        // for loading from the saved JSON file
        let tempTree = nextProps.getNewTree()
        if(tempTree != false){ 
            this.setState({ 
                tree: tempTree,
                loadingState: true // put the initial drop column in loading state to load objects from memory
            })   
        }        
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

        // console.log("--------- buildTree ---------");
        
        // get keypath, an array of keys which chained together accesse
        const keypath = await this.getKeyPath(tree, newParentID);
        
        // build the string which will be the object key path
        let objectPathString = 'tree';
        for (const element of keypath) {
            objectPathString += `['${element}'].children`
        }
        // remove the ending .children because to make eval on the string, we call .children off it (hax)
        objectPathString = objectPathString.slice(0, -9) 
        
        // console.log('objecting adding ', elObj)
        // add the new children
        if(eval(objectPathString).hasOwnProperty('children')){
            eval(objectPathString).children[elObj.fullName] = elObj
        }
       
        // update the state
        this.setState({
            tree: tree
        })

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

    buildJSON = (tree) => {
        return JSON.stringify(tree);
    }
    
    buildHTMLTree = (tree) => {
        //if(this.props.selected != "code") return ''
       
        let html = '' 
        function getTabs(depth){
            let tabs = ``
            for(var i = 0; i < depth; i++) { 
                tabs += `\t` 
            }
            return tabs
        }
        function iter(children, depth){
            for (const [key, obj] of Object.entries(children)) {
                if(obj.hasOwnProperty('children')){
                    let htmlSplit = []
                    let tabs = getTabs(depth)
                    if(obj.hasOwnProperty('html')){
                        htmlSplit = obj.html.split('*')
                        html += `${tabs}${htmlSplit[0]}\n`
                    }
                    iter(obj.children, depth+1)
                    if(obj.hasOwnProperty('html')){
                        html += `${tabs}${htmlSplit[1]}\n`
                    }

                } else if(obj.hasOwnProperty('html')){
                    let tabs = getTabs(depth)
                    html += `${tabs}${obj.html}\n`
                }
            }  
        }
        iter(tree, 0)
        return html

    }
    render() {

        let helpText = `Drag and Drop elements form the Content Bank and Layout Tools below.`
        
        return (
            <div className="pvlVisualLayoutContainer">
                <PVLToolbar title={`${this.props.instance.name} - Visual Layout`} helpText={helpText}></PVLToolbar>
                
                {this.props.model.hasOwnProperty('label') && <div className="pvlUtilityBar">
                    <div>
                    Editing Content Layout for <strong>{this.props.model.label}</strong> ({this.props.model.zuid}) 
                    </div> 
                    <div className="pvlUtilityButtons">  
                        <button className="saveButton" onClick={() => {this.props.save(this.buildHTMLTree(this.state.tree),this.buildJSON(this.state.tree))} }>Save</button>
                        <button className="publishButton" onClick={() => {this.props.publish()} }>Publish</button>
                    </div>
                </div>}
                {!this.props.model.hasOwnProperty('label') && <div className="pvlUtilityBar">
                    <p>Select a Model to save to by clicking the <i className="fa fa-star"></i> icon by the model name in the the content bank.</p>
                </div>}


                <div className="pvlUtilities">
                    <div className="pvlVisualTabBar">
                        <button className={this.props.selected == "visual" ? `tab pvlSelected` : 'tab'} onClick={() => {this.props.setTab('visual')} }>
                            <span className="fa fa-pen"></span><span>Visual Layout</span>
                        </button>
                        <button className={this.props.selected == "code" ? `tab pvlSelected`: 'tab'}  onClick={() => {this.props.setTab('code')} }>
                            <span className="fa fa-code"></span><span>ZHTML Output</span>
                        </button>
                        <button className={this.props.selected == "json" ? `tab pvlSelected`: 'tab'}  onClick={() => {this.props.setTab('json')} }>
                            <span className="fa fa-project-diagram"></span><span>JSON Output</span>
                        </button>
                        <button className={this.props.selected == "preview" ? `tab pvlSelected`: 'tab'}  onClick={() => {this.props.setTab('preview')} }>
                            <span className="fa fa-eye"></span><span>Preview</span>
                        </button>
                    </div> 
                    <DeleteArea></DeleteArea>
                </div>

                <DropColumn  
                    buildTree={this.buildTree} 
                    removeFromTree={this.removeFromTree} 
                    key={this.state.rootColumnName} 
                    id={this.state.rootColumnName}
                    layoutObjects={this.state.tree[this.state.rootColumnName].children ? Object.values(this.state.tree[this.state.rootColumnName].children) : []}
                    loadingState={this.state.loadingState}
                    loadingComplete={this.loadingComplete}
                    droppable="true">
                    </DropColumn>
                <CodeOutput 
                    selected={this.props.selected} 
                    code={this.buildHTMLTree(this.state.tree)}
                    tree={this.state.tree}></CodeOutput>
                <JSONOutput 
                    selected={this.props.selected} 
                    json={this.buildJSON(this.state.tree)}
                    tree={this.state.tree}></JSONOutput>
                <Preview 
                    previewURL={this.props.previewURL}
                    code={this.buildHTMLTree(this.state.tree)}
                    hasRenderedUpdatedHTML={this.props.hasRenderedUpdatedHTML}
                    rendered={this.renderedHTML}
                    selected={this.props.selected} 
                    tree={this.state.tree}></Preview>    
            </div>
        );
    }
}

export default VisualLayoutContainer;




