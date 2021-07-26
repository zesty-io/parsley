
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import { DesignObjects } from './DesignObjects';
import { ContentTypes } from './ContentTypes';
import  LayoutObject  from './LayoutObject';

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const layoutObjectTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem()
    return true
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can use componentDidUpdate() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset()
    const componentRect = findDOMNode(component).getBoundingClientRect()

    // You can check whether we're over a nested drop target
    const isOnlyThisOne = monitor.isOver({ shallow: true })

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop()
  },
 
  drop(props, monitor, component) {
    //   console.log('drop function in layoutObjecttarget')
    //   console.log('component',component)
    if (monitor.didDrop()) {
      // this handles multi level nesting, stops from adding on below layers
      return
    }

    // Obtain the dragged item
    const item = monitor.getItem()

    // console.log("item detection from drop column on drop", item)
    // console.log("current drop component props", props)
    // console.log("id compared", item.fromLocation, props.id)
    component.addToLayout(item, item.fromLocation, {...props.getTree()});
    
    if(typeof(item.component.props.removeMe) === 'function' && item.fromLocation != props.id){
        item.component.props.removeMe()
    }

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { 
        moved: true,
        objName: item.id,
        fromLocation: item.fromLocation,
        item: item
        }
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

class DropColumn extends React.Component {
    constructor(props) {
        super(props);
       
        // the terinary is for loading state (switching to a new models PVL saved code)
        this.state = {
            layoutObjects: props.layoutObjects ? props.layoutObjects : []
        };

    }
    
    componentDidUpdate(prevProps) { 
        // check if in loading state to load existing data
        if(prevProps.loadingState == true){
            this.setState({
                layoutObjects: prevProps.layoutObjects ? prevProps.layoutObjects : []
            },this.props.loadingComplete())
        }

        if (!prevProps.isOver && this.props.isOver) {
        // You can use this as enter handler
            //alert('entered')
        }

        if (prevProps.isOver && !this.props.isOver) {
        // You can use this as leave handler
        }

        if (prevProps.isOverCurrent && !this.props.isOverCurrent) {
        // You can be more specific and track enter/leave
        // shallowly, not including nested targets
        }

    }
    
    /**
    addToLayout is where we add the object to the visual layout. Here we build out the object
    from the Keyed Object references (ContentTypes and Design Objects)

    */
    addToLayout = async (item, fromLocation, tree, position=false) => {
        
        let itemString = item.id
        
        // ignore the if location is the same
        if(this.props.id == fromLocation) {
            return
        }
        
        // split the string up to determine the oject type
        var deciphered = this.decipherItem(itemString)
        var obj = {}
        let endPosition = this.state.layoutObjects.length // set to add to the end    

        // design objects have 3 items split from key primarytype:type:name in the array
        if(deciphered[0] == 'design'){
            obj = {...DesignObjects[deciphered[2]]};
            obj.name = deciphered[2];
            obj.position = (position != false) ? position : endPosition;
            // check if it already has a number
            obj.fullName = itemString.match(/\d+$/) ? itemString :  `${itemString}:${obj.position}`;
            
            // setup the children if type of obj is columns
            if(obj.type == 'columns'){
                //if(fromLocation != 'bank'){
                    let pathToItem = await this.props.getObjectFromKeyPath(itemString, tree)
                    console.log("path to item from columns addToLayout",itemString, pathToItem)
                //}
                // get the original object, to access the children, pass the children to the obj
                // use the getKeyPath (needs to be passes as a prop) to get access to the 
                obj.children = {}
                obj.columns.map( (column,index) => {
                    let tempColumn = {...column}
                    let columnID = `${obj.fullName}-${column.width}:${obj.name}:${index}`
                    tempColumn.children = {}
                    obj.children[columnID] = tempColumn
                })
            }
    
        } else {
            // content objects have 4 items split from key primarytype:type:model:field_name in the array
            obj = {...ContentTypes[deciphered[1]]};
            obj.html = item.html // overwrite HTML with one passed in that was made when content bank was build from PVL main component
            obj.model = deciphered[2]; 
            obj.name = deciphered[3];
            obj.position = (position != false) ? position : endPosition;
            // check if it already has a number
            obj.fullName = itemString.match(/\d+$/) ? itemString :  `${itemString}:${obj.position}`;
        }
        obj.type = deciphered[1];
        obj.primarytype = deciphered[0];
        
        this.props.buildTree(this.props.id, fromLocation, obj)
        
        this.addLayoutObject(obj,position);
    }


    addLayoutObject(obj, pos=false){

        // add to master tree, if columns, need to split each here

        // default add
        //console.log('Before:addLayoutObject',obj.fullName,obj)
        if(pos == false){
            this.setState({
                layoutObjects: [...this.state.layoutObjects, obj] 
            }); 
        // for inserting before an element, not tested yet
        } else {
            pos = pos - 1
            this.setState({
                layoutObjects: [...this.state.layoutObjects].splice(pos, 0, obj) 
            });
        }
        
        //console.log('After:addLayoutObject', this.state.layoutObjects)
       
    }

    removeLayoutObject(objectID){
        
        var newObjArr = []
        //console.log('removeLayoutObject',objectID, this.state.layoutObjects)
        this.state.layoutObjects.map(lo => {
            if(lo.fullName != objectID){
                newObjArr.push(lo)
            }
        })
        this.props.removeFromTree(this.props.id,objectID)
        this.setState({
            layoutObjects: newObjArr
        })
    }

    isBaseDropColumn(){
        return this.props.id == 'layout:root:column:0'
    }

    decipherItem(itemString){ 
        return itemString.split(':')
    }

    render() {

        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        const { isOver, canDrop, connectDropTarget } = this.props
        let dropclass = ''
        if(!isOver && canDrop) {
            dropclass = 'pvlTargetHere'
        } else if(isOver && canDrop) {
            dropclass = 'pvlDropReady'
        }
        let locationID = this.props.id

        return connectDropTarget(
            <div className={`pvlDropColumn pvlLayoutColumn ${dropclass}`} style={this.props.style}>
                    
                {this.state.layoutObjects.map((lo,index) => {
                    return (
                        // index in the ID and KEY is used as position, but all for uniqueness
                        <LayoutObject 
                            key={`layout:${lo.fullName}:${index}`} 
                            removeMe={() => this.removeLayoutObject(lo.fullName)} 
                            buildTree={this.props.buildTree}
                            getTree={this.props.getTree}
                            getObjectFromKeyPath={this.props.getObjectFromKeyPath}
                            removeFromTree={this.props.removeFromTree}
                            layoutObjects={lo.hasOwnProperty('children') ? Object.values(lo.children) : []} // terinary is for saved state loading
                            mode="layout" 
                            location={locationID}
                            id={lo.fullName} 
                            name={lo.name} 
                            primarytype={lo.primarytype} 
                            type={lo.type} 
                            obj={lo} 
                            isReady="true" />
                    )
                })}
            </div>
        );
    }
}

export default DropTarget(ItemTypes.LAYOUTOBJECT, layoutObjectTarget, collect)(DropColumn);




