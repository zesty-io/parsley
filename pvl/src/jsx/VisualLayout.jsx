
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import  LayoutObjectText  from './LayoutObjectText';

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
      alert('dropped')
      console.log('dropped')
      console.log('component',component)
      
      component.addToLayout();
    if (monitor.didDrop()) {
       
      // If you want, you can check whether some nested
      // target already handled drop
      return
    }

    
    // Obtain the dragged item
    const item = monitor.getItem()
    
    console.log('item',monitor.getItem())
    component.addToLayout(component);
    // You can do something with it
    //ChessActions.movePiece(item.fromPosition, props.position)

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true }
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

class VisualLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layoutObjects: [
                {id: 1, type: 'LayoutObjectText'},
                { id: 2, type: 'LayoutObjectText'},
            ],
            currentPic: null
        };

    }
    

    getChildren(){


    }
    componentDidUpdate(prevProps) { 
        console.log(prevProps)
        console.log('comp did update')
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

    addToLayout() {
        console.log('add to layout', this.props)
        console.log('connect to drop',this.props.connectDropTarget())
        alert('added')
    }

    render() {
        // Your component receives its own props as usual
        const { position } = this.props

        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        const { isOver, canDrop, connectDropTarget } = this.props

        return connectDropTarget(
            <div className="pvlVisualLayout">
                <h2>Visual Layout</h2>
                <div className="pvlCanvas">
                    {this.state.layoutObjects.map((lo) => {
                        return (
                            <LayoutObjectText key={lo.id} id={lo.id} isReady="true" />
                        )
                    })}
                </div>
                <div className="message">
                    {isOver && canDrop && <div>omg u there</div>}
                    {!isOver && canDrop && <div>drop on me</div>}
                    {isOver && !canDrop && <div>invalid drop</div>}
                </div>
            </div>
        );
    }
}

export default DropTarget(ItemTypes.LAYOUTOBJECT, layoutObjectTarget, collect)(VisualLayout);




