
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
    //   console.log('props',props)
    //   console.log('component',component)
      
     
    if (monitor.didDrop()) {
      // this handles multi level nesting, stops from adding on below layers
      return
    }

    // Obtain the dragged item
    const item = monitor.getItem()
    
    component.addToLayout(item.id);
    // You can do something with it
    //ChessActions.movePiece(item.fromPosition, props.position)

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { 
        moved: true,
        objName: item.id, 
        column: component
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
        this.state = {
            layoutObjects: [],
            currentPic: null
        };

    }
    
    componentDidUpdate(prevProps) { 
       
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

    addToLayout(itemString) {
        
        let deciphered = this.decipherItem(itemString)
        //console.log(deciphered)
        let obj = {}

        // design objects have 3 items split from key primarytype:type:name in the array
        if(deciphered[0] == 'design'){
            obj = DesignObjects[deciphered[2]];
            obj.name = deciphered[2];
        } else {
            // content objects have 4 items split from key primarytype:type:model:field_name in the array
            obj = ContentTypes[deciphered[1]];
            obj.model = deciphered[2]; 
            obj.name = deciphered[3];
        }
        obj.type = deciphered[1];
        obj.primarytype = deciphered[0];
        
        obj.fullName = itemString
        //console.log(obj)
        this.addLayoutObject(obj);
    }


    // where we control order
    addLayoutObject(obj, pos=1){
        let los = this.state.layoutObjects
        los.push(obj);


        this.setState({
            layoutObjects: los
        })
    }

    removeLayoutObject(fullName){
        let newObjArr = []
        
        this.state.layoutObjects.map(lo => {
            if(lo.fullName != fullName){
                newObjArr.push(lo)
            }
        })
        this.setState({
            layoutObjects: newObjArr
        })
    }

    decipherItem(itemString){
        
        return itemString.split(':')
    }

    render() {
        // Your component receives its own props as usual
        const { position } = this.props

        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        const { isOver, canDrop, connectDropTarget } = this.props
        let dropclass = ''
        if(!isOver && canDrop) {
            dropclass = 'pvlTargetHere'
        } else if(isOver && canDrop) {
            dropclass = 'pvlDropReady'
        }
        return connectDropTarget(
            <div className={`pvlDropColumn pvlLayoutColumn ${dropclass}`} style={this.props.style}>

                    {this.state.layoutObjects.map((lo) => {
                        return (
                            //key={`layout:${lo.fullName}`} 
                            <LayoutObject removeMe={() => this.removeLayoutObject(lo.fullName)} mode="layout" id={`${lo.fullName}`} name={lo.name} primarytype={lo.primarytype} type={lo.type} obj={lo} isReady="true" />
                        )
                    })}
                
                {/*<div className="message">
                    {isOver && canDrop && <div>omg u there</div>}
                    {!isOver && canDrop && <div>drop on me</div>}
                    {isOver && !canDrop && <div>invalid drop</div>}
                </div>*/}
            </div>
        );
    }
}

export default DropTarget(ItemTypes.LAYOUTOBJECT, layoutObjectTarget, collect)(DropColumn);




