
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
        this.state = {
            collapsed: false
        }
    } 

    getLayoutObjects() {
        return this.props.objects;
    }

    getTotalLO(){
        var size = 0, key;
        for (key in this.getLayoutObjects()) {
            if (this.getLayoutObjects().hasOwnProperty(key)) size++;
        }

        return size;
    }
    collapse() { 
        let toggle = this.state.collapsed == false ? true : false; 
        this.setState({
            collapsed: toggle
        });
        
    }

    render() {
        let helpText = `Column, hairlines and other things to build a page`
        return this.getTotalLO() > 0 ? (
            <div className="pvlBank pvlLayoutBank">
                <PVLToolbar title="Layout Design Tools" helpText={helpText} collapse={() => {this.collapse()} } collapsed={this.state.collapsed}></PVLToolbar>
                {!this.state.collapsed && 
                    <div className="pvlObjectBank">
                        {Object.keys(this.getLayoutObjects()).map((key,index) => {
                            let lo = this.getLayoutObjects()[key]
                            return (
                                <LayoutObject 
                                    key={lo.uid} 
                                    id={`design:${lo.type}:${key}`} 
                                    name={lo.name} 
                                    primarytype="design" 
                                    type={lo.type} 
                                    obj={lo} 
                                    mode="bank"
                                    isReady="true" 
                                    />
                            ) 
                        })} 
                    </div>
                }

            </div> 
        ) : (<div></div>);
    }
}

export default LayoutBank;



