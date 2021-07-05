
import React, { Component } from 'react'

/**
 * LayoutBank is a component that takes an array of layout objects in the property `objects`
 * if objects is undefined or 0 in length, this component renders an empty div. The component outputs
 * that array of objects into LayoutObjects that are draggable objects for the visual layout tool
 */

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.previewDiv = React.createRef()
        this.state = {
            preview: ''
        }
    } 

    

    componentDidUpdate() {
        if(this.props.selected == "preview" && this.props.hasRenderedUpdatedHTML == false){
            
            var formdata = new FormData();  
            formdata.append("parsley", this.props.code)

            fetch(this.props.previewURL,{
                method: 'POST', 
                body: formdata  
            }).then(response => response.text())
            .then(text => {
                this.setState({
                    preview: text
                })
            })
        }
        
    }

    render() {
        return ( 
            <div className={this.props.selected == "preview" ? `pvlPreview pvlSelected` : 'pvPreview '}>
                <div ref={this.previewDiv} className="pvlRenderedOutput" dangerouslySetInnerHTML={{__html: this.state.preview}}></div>
            </div>
        );
    }
}

export default Preview;



