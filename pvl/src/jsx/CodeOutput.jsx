
import React, { Component } from 'react'

/**
 * LayoutBank is a component that takes an array of layout objects in the property `objects`
 * if objects is undefined or 0 in length, this component renders an empty div. The component outputs
 * that array of objects into LayoutObjects that are draggable objects for the visual layout tool
 */

class CodeOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: ''
        }
        this.textarea = React.createRef()
        console.log(this.props.previewURL)
    } 
    buildHTMLTree = (tree) => {
        //if(this.props.selected != "code") return ''
        console.log('CODE building tree', tree)
        let html = '' 
        function getTabs(depth){
            let tabs = ``
            for(var i = 0; i < depth; i++) { 
                tabs += `\t` 
            }
            return tabs
        }
        function iter(children, depth){
            for (const [key, obj] of Object.entries(children)) {
                if(obj.hasOwnProperty('children')){
                    let htmlSplit = []
                    let tabs = getTabs(depth)
                    if(obj.hasOwnProperty('html')){
                        htmlSplit = obj.html.split('*')
                        html += `${tabs}${htmlSplit[0]}\n`
                    }
                    iter(obj.children, depth+1)
                    if(obj.hasOwnProperty('html')){
                        html += `${tabs}${htmlSplit[1]}\n`
                    }

                } else if(obj.hasOwnProperty('html')){
                    let tabs = getTabs(depth)
                    html += `${tabs}${obj.html}\n`
                }
            }  
        }
        iter(tree, 0)
        return html

    }
    getCodeOutput(){
        return this.buildHTMLTree(this.props.tree);
    }
    getPreviewOutput() {
           
        var formdata = new FormData();
        formdata.append("parsley", this.getCodeOutput())

      
        fetch("https://kfg6bckb-dev.preview.zesty.io/ajax/parsley-visual-layout/",{
            method: 'POST',
            body: formdata,
        }).then((response) => response.text())
        .then(text => {
            console.log(text)
        })

        return 'text'
    }

    render() {
        this.getPreviewOutput()
        return ( 
            <div className={this.props.selected == "code" ? `pvlCode pvlSelected` : 'pvlCode '}>
                <textarea ref={this.textarea}  id="pvlCode" readOnly value={this.getCodeOutput()}></textarea>
                <div className="pvlPreview"></div>
            </div>
        );
    }
}

export default CodeOutput;



