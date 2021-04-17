
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

    // converts given content object (which is Zesty.io /-/gql/ output) to 
    // a react iterable array/object build, also modifies data to work 
    // with the layout tool
    getIterableObject() {
        // bail if we dont have the array yet
        if(this.props.content == undefined) return []
        // restructure the data
        let structuredDataArray = []
        this.props.content.map( (model,index) => {
             model.key = model.zuid
             delete(model.gqlGetAllMethodName)
             delete(model.gqlGetMethodName)
             delete(model.gqlModelName)
             let fields = this.mutateFieldsForPVL(model)
             delete(model.fields)
             model.fields = fields
             structuredDataArray.push(model)
        })
        return structuredDataArray
    }

    mutateFieldsForPVL(model) {
        
        const fields = model.fields != undefined ? model.fields : {loading: "Empty Fields"}
        let fieldsToReturn = []
        let sortIndex = 1 ;
        Object.keys(fields).map(function(key, position) {
            
            let data_type = fields[key]
            //console.log(field)
            let html = data_type != 'image' ? `{{this.${key}}}` : `{{this.${key}.getImage()}}`
            fieldsToReturn.push({ 
                key: `${model.zuid}-${key}`,
                name : key, 
                type: data_type,
                model: {
                            name: model.name,
                            zuid: model.zuid
                },
                sort: sortIndex,
                value: "",
                html: html
            })
            sortIndex++
        })
        return fieldsToReturn
    }

    render() {
        const content = this.getIterableObject()
        console.log(content)
        let helpText = `Search for content field references and drag and drop them into the Visual Layout canvas`
        if (this.props.content == undefined || content.length == 0) {
            return <div></div>
        }
        return (
            <div className="pvlContentBank">
                <PVLToolbar title="Content Bank" helpText={helpText}></PVLToolbar>
                <div className="modelText">
                    {content.map((model) => {
                        return (
                            <div key={model.zuid}>
                            <h5>{model.name}</h5>
                            {model.fields.map((field) => {
                                return (<LayoutObject key={field.name} id={field.name} name={field.name} type={field.type}  obj={field}  isReady="true" />)
                            })}
                            </div>
                            
                        )
                    })}
                </div>

            </div> 
        );
    }
}

export default ContentBank;



