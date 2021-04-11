
import React, { Component } from 'react'
import  VisualLayout from './VisualLayout'
import  ContentBank from './ContentBank'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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




