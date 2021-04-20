import React, { Component } from 'react'

class PVLToolbar extends React.Component {
    constructor(props) {
        super(props);
        
    }

    getCustomCSSClass(){
        return 'pvl' + this.props.title.replace(/[ ]/i,'')+ 'Toolbar ' + 'pvlToolbar';
    }
    hasCollapse() {
        return this.props.collapse !== undefined
    }

    render() {
        
        return (
            <div className={this.getCustomCSSClass()}>
                <h1>
                   
                    <strong>{this.props.title}</strong>
                     <span className="fa fa-question-circle pvlHelp">
                        <div className="pvlHelpText">{this.props.helpText}</div>
                    </span>
                </h1>
                {this.hasCollapse() &&
                    <button onClick={this.props.collapse}> 
                        {this.props.collapsed && <span className="fa fa-caret-left"></span>}
                        {!this.props.collapsed && <span className="fa fa-caret-down"></span>}
                    </button>
                }
            </div> 
        );
    }
}

export default PVLToolbar;



