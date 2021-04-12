
import React, { Component } from 'react'
import  VisualLayout from './VisualLayout'
import  ContentBank from './ContentBank'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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

export default function ParsleyVisualLayout() {
    return (
        <div className="pvl">
            
            <DndProvider backend={HTML5Backend}>
            <div className="shell">
                <VisualLayout></VisualLayout>
                <ContentBank></ContentBank>
            </div>
            </DndProvider>
        </div>
        
    )
}




