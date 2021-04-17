
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
        this.state = {
            currentModel: 'clippings',
            searchFilter: ''
        };
    }

    handleSearchFilterChange(event){
        
        this.setState({
            searchFilter: event.target.value
        });
        console.log(this.state.searchFilter, event)
    }

    sortIndexPlusPlus(){
        setState('sortIndex', this.state.sortIndex + 1)
    }

    getContentModels(){
        return this.props.content
    }

    render() {
        const content = this.getContentModels()
        let helpText = `Search for content field references and drag and drop them into the Visual Layout canvas`
        if (this.props.content == undefined || content.length == 0) {
            return <div></div>
        }
        return (
            <div className="pvlContentBank">
                <PVLToolbar title="Content Bank" helpText={helpText}></PVLToolbar>
                <input value={this.state.searchFilter} onChange={this.handleSearchFilterChange.bind(this)} />
                <div className="modelText">
                    {content.map((model) => {
                        return (
                            <div key={model.zuid}>
                            <h5>{model.name}</h5>
                            {/* filter for search */}
                            {model.fields.filter(function (field) {
                                return field.name.includes(this.state.searchFilter);
                            }.bind(this)).map((field) => {
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



