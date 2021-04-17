
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
                <div className="pvlContentModel">
                    {/* sort models by name alphabetically */}
                    {content.sort(function(a, b){
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                        // output models here
                    }).map((model) => {
                        // handle collapse logic
                        let searchOn = this.state.searchFilter == '' ? false : true;
                        let collapsed = this.state.collapsed[model.name] == undefined && !searchOn ? '' : 'pvlCollapsed';
                        
                        return (
                            <div key={model.zuid}> 
                                <div className="pvlModelHeader">
                                    <h3>{model.name} {collapsed != '' && <span>(collapsed)</span>}</h3>
                                    {/* collapse is off during search, this render output if not on */}
                                    {!searchOn && 
                                        <button onClick={() => {this.collapseModel(model.name)} }>
                                            {collapsed == '' && <span className="fa fa-caret-down"></span>}
                                            {collapsed != '' && <span className="fa fa-caret-left"></span>}
                                        </button>
                                    }
                                </div>
                                <div className={`pvlModelFields ${collapsed}`}>
                                    {/* filter for search */}
                                    {model.fields.filter(function (field) {
                                        return field.name.includes(this.state.searchFilter);
                                    }.bind(this)).map((field) => {
                                        return (<LayoutObject key={field.name} id={field.name} name={field.name} type={field.type}  obj={field}  isReady="true" />)
                                    })}
                                </div>
                            </div>
                            
                        )
                    })}
                </div>

            </div> 
        );
    }
}

export default ContentBank;



