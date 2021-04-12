
import React, { Component } from 'react'
import  VisualLayout from './VisualLayout'
import  ContentBank from './ContentBank'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


class ParsleyVisualLayout extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { data: [] };
     
  }
  getContentBankURL() {
    let url
    if(this.props.instanceZUID){
       url = `https://${this.props.instanceZUID}-dev.preview.zesty.io/-/gql/`
    } else {
       url = `https://www.zesty.io/-/gql/`
    }
    return url; 

  }


  async componentDidMount(){
    const response = await fetch(this.getContentBankURL());
    const json = await response.json();
    this.setState({ data: json });
  }


  getContentBank() {
    return this.state.data.models

  }

  getTree(){
  
  }

  render() {
      return (
        <div className="pvl">
            <DndProvider backend={HTML5Backend}>
            <div className="shell">
                <VisualLayout></VisualLayout>
                <ContentBank models={this.getContentBank()}></ContentBank> 
            </div>
            </DndProvider>
        </div>
      )
      
  }
}

export default ParsleyVisualLayout;




