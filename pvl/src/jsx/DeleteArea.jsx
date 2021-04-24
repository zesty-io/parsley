
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import { DesignObjects } from './DesignObjects';
import { ContentTypes } from './ContentTypes';

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const deleteTarget = {
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
    if (monitor.didDrop()) {
      // this handles multi level nesting, stops from adding on below layers
      return
    }

    // Obtain the dragged item
    const item = monitor.getItem()
    
    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { 
        moved: true,
        objName: item.id
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

class DeleteArea extends React.Component {
    constructor(props) {
        super(props);

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
        
        return connectDropTarget(
            <div className={`pvlDeleteArea ${dropclass}`} >
                <div className="message">
                    {isOver && canDrop && <div>Release to Delete</div>}
                    {!isOver && canDrop && <div>Drop here to Delete</div>}
                    {!isOver && !canDrop && <div>Drop here to Delete</div>}
                    {isOver && !canDrop && <div>Can't Delete that Object drop</div>}
                </div>
            </div>
        );
    }
}

export default DropTarget(ItemTypes.LAYOUTOBJECT, deleteTarget, collect)(DeleteArea);




