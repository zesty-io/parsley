
import React, { Component } from 'react'
import LayoutObject from './LayoutObject'
import PVLToolbar from './PVLToolbar'

/**
 * LayoutBank is a component that takes an array of layout objects in the property `objects`
 * if objects is undefined or 0 in length, this component renders an empty div. The component outputs
 * that array of objects into LayoutObjects that are draggable objects for the visual layout tool
 */

class LayoutBank extends React.Component {
    constructor(props) {
        super(props);
    }

    getLayoutObjects() {
        return this.props.objects;
    }

    getTotalLO(){
        return this.getLayoutObjects() !== undefined ? this.getLayoutObjects().length : 0;
    }
    collapse() {
        alert('collapse')
    }

    render() {
        let helpText = `Column, hairlines and other things to build a page`
        return this.getTotalLO() > 0 ? (
            <div className="pvlLayoutBank">
                <PVLToolbar title="Layout Tools" helpText={helpText} collapse={this.collapse}></PVLToolbar>
                <div className="modelText">
                    {this.getLayoutObjects().map((lo) => {
                        return (
                            <LayoutObject key={lo.uid} id={lo.uid} name={lo.name} type={lo.type} obj={lo} isReady="true" />
                        ) 
                    })} 
                </div>

            </div> 
        ) : (<div></div>);
    }
}

export default LayoutBank;



