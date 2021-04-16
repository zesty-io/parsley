
import React, { Component } from 'react'
//import ContentObject from './ContentObject'
import LayoutObject from './LayoutObject'
import PVLToolbar from './PVLToolbar'
/**
 * ContentBank is a component that takes  parsley GQL base link as
 * if objects is undefined or 0 in length, this component renders an empty div
 */
 
class ContentBank extends React.Component {
    constructor(props) {
        super(props);
    }

    sortIndexPlusPlus(){
        setState('sortIndex', this.state.sortIndex + 1)
    }

    getModelFields(i) {
        let fields = this.props.content != undefined ? this.props.content[i].fields : {loading: "loading"}
        let fieldsToReturn = []
        let sortIndex = 1 ;
        Object.keys(fields).map(function(key, position) {
            console.log(key, position)
            fieldsToReturn.push({ 
                name : key, 
                type: fields[key],
                sort: sortIndex,
                value: ""
            })
            sortIndex++
        })
        return fieldsToReturn
    }

    

    render() {
        const fields = this.getModelFields(2)
        let helpText = `Search for content field references and drag and drop them into the Visual Layout canvas`
        if (this.props.content == undefined) {
            return <div></div>
        }
        return (
            <div className="pvlContentBank">
                <PVLToolbar title="Content Bank" helpText={helpText}></PVLToolbar>
                <div className="modelText">
                    {fields.map((field) => {
                        return (
                            <LayoutObject key={field.name} id={field.name} name={field.name} type={field.type}  obj={field}  isReady="true" />
                        )
                    })}
                </div>

            </div> 
        );
    }
}

export default ContentBank;



