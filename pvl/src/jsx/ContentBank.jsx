
import React, { Component } from 'react'
import LayoutObjectText from './LayoutObjectText'

class ContentBank extends React.Component {
    constructor(props) {
        super(props);
        
        console.log(this.props)
    }

    sortIndexPlusPlus(){
        setState('sortIndex', this.state.sortIndex + 1)
    }

    getModelFields(i) {
        let fields = this.props.models != undefined ? this.props.models[i].fields : {loading: "loading"}
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
        console.log(fields)
        return (
            <div className="pvlContentBank">
                <h2>Content Bank</h2>
                <div className="content">
                    <LayoutObjectText isReady="true" id="1"></LayoutObjectText>
                    <LayoutObjectText isReady="true" id="2"></LayoutObjectText>
                </div>
                <div className="modelText">
                    {fields.map((field) => {
                        return (
                            <LayoutObjectText key={field.name} id={field.name} name={field.name} type={field.type} isReady="true" />
                        )
                    })}
                </div>

            </div> 
        );
    }
}

export default ContentBank;



