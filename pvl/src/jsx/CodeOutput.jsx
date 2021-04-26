
import React, { Component } from 'react'

/**
 * LayoutBank is a component that takes an array of layout objects in the property `objects`
 * if objects is undefined or 0 in length, this component renders an empty div. The component outputs
 * that array of objects into LayoutObjects that are draggable objects for the visual layout tool
 */

class CodeOutput extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef()
    } 
    buildHTMLTree = (tree) => {
        let html = ''
        function iter(children){
            for (const [key, obj] of Object.entries(children)) {
                console.log(key,obj);
                if(obj.hasOwnProperty('html')){
                    html += `\n${obj.html}`
                }
                if(obj.hasOwnProperty('children')){
                    iter(obj.children)
                }
            } 
        }
        iter(tree)
        return html

    }
    getCodeOutput(){
        return this.buildHTMLTree(this.props.tree);
    }

    render() {
        return ( 
            <div className={this.props.selected == "code" ? `pvlCode pvlSelected` : 'pvlCode '}>
                <textarea ref={this.textarea}  id="pvlCode" readOnly value={this.getCodeOutput()}></textarea>
            </div>
        );
    }
}

export default CodeOutput;



