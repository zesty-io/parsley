
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
            searchFilter: '',
            collapsed: {}
        };
    }

    handleSearchFilterChange(event){
        this.setState({
            searchFilter: event.target.value
        });
    }
    clearSearch(){
        this.setState({
            searchFilter: ''
        });
    }

    collapseModel(modelName){
        let temp = this.state.collapsed
        if(temp[modelName] == undefined){
            temp[modelName] = true
        } else {
            delete(temp[modelName])
        }
         this.setState({
            collapsed: temp
        });
    }

    modelHasFieldsInFilter(model) {
        let hit = false
        model.fields.filter(function (field) {
            if (field.searchIndex.includes(this.state.searchFilter.toLowerCase())) hit = true; 
        }.bind(this))
        return hit;
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
        let searchOn = this.state.searchFilter == '' ? false : true;
        let missedModels = 0 // used for seeing if there is empty search
        return (
            <div className="pvlBank pvlContentBank">
                <div className="pvlContentBankHeader">
                    <PVLToolbar title="Content References" helpText={helpText}></PVLToolbar>
                    <div className="pvlInputWrapper">
                        <span className="fa fa-search"></span>
                        <input placeholder="Search Model or Field Name" value={this.state.searchFilter} onChange={this.handleSearchFilterChange.bind(this)} />
                        {searchOn && <button onClick={() => {this.clearSearch()} } class="fa fa-times"></button>}
                    </div>
                </div>
                <div className="pvlContentModels">
                    {/* sort models by name alphabetically */}
                    {content.sort(function(a, b){
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                        // output models here
                    }).map((model) => {
                        // handle collapse logic
                        let collapsed = this.state.collapsed[model.name] == undefined || searchOn ? '' : 'pvlCollapsed';
                        // test for any fields in search filter, if so render model else render an empty div
                        if( this.modelHasFieldsInFilter(model) ){
                            return (                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                <div className="pvlContentModel" key={model.zuid}> 
                                    <div className="pvlModelHeader">
                                        {!searchOn && 
                                            <button onClick={() => {this.collapseModel(model.name)} }>
                                                {collapsed == '' && <span className="fa fa-caret-down"></span>}
                                                {collapsed != '' && <span className="fa fa-caret-right"></span>}
                                            </button>
                                        }
                                        <h3> 
                                            <strong>{model.label}</strong> 
                                            {collapsed == '' && <span>[{model.zuid}]</span>}
                                            {collapsed != '' && <span>(collapsed)</span>}
                                        
                                            <a href={`/schema/${model.zuid}`}>
                                                <em className="fa fa-pen"></em> {model.name}
                                            </a>
                                        </h3>
                                        {/* collapse is off during search, this render output if not on */}
                                        <div className="pvlModelTag"><span className="fa fa-list"></span></div>
                                    </div>
                                    <div className={`pvlModelFields ${collapsed}`}>
                                        {/* filter for search */}
                                        {model.fields.filter(function (field) {
                                            return field.searchIndex.includes(this.state.searchFilter.toLowerCase());
                                        }.bind(this)).map((field) => {
                                            return (<LayoutObject key={field.name} id={`content:${field.type}:${model.name}:${field.name}`} name={field.name} primarytype="content" type={field.type}  obj={field}  isReady="true" />)
                                        })}
                                    </div>
                                </div>
                                
                            )
                        } else {
                            missedModels++;
                            if(content.length == missedModels) {
                                return (
                                <div className="pvlEmptySearch" key={model.zuid}>
                                    <p><span class="fa fa-warning"></span> No Search Results for <strong>"{this.state.searchFilter}"</strong></p>
                                    <button onClick={() => {this.clearSearch()} } >Clear Search</button>
                                </div>
                                )
                            } else {
                                // empty model return when search for fieldnames fail
                                return (<div key={model.zuid}></div>)
                            }

                        }
                    })}
                </div>

            </div> 
        );
    }
}

export default ContentBank;



