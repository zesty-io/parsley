
import React, { Component } from 'react'
import VisualLayoutContainer from './VisualLayoutContainer'
import ContentBank from './ContentBank'
import LayoutBank from './LayoutBank'
import PVLToolbar from './PVLToolbar'
import { LayoutObjects } from './LayoutObjects'
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

  getCodeReferences() {
    return [
      {
        uid : '1234',
        name : 'Page Header',
        reference : 'header',
        parsley: '{{ include header }}',
        type : 'include'
      },
       {
        uid : '1235',
        name : 'Page Footer',
        reference : 'footer',
        parsley: '{{ include footer }}',
        type : 'include'
      },
      {
        uid : '1236',
        name : 'Google Test',
        reference : 'https://www.google.com',
        parsley: '{{ include https://www.google.com }}',
        type : 'include'
      }
    ]
  } 

  getLayoutObjects() {
    return LayoutObjects
  }

  getTree(){
  
  }

  render() {
      return ( 
        <div className="pvl">
            <DndProvider backend={HTML5Backend}>
              <div className="shell">
                  <VisualLayoutContainer></VisualLayoutContainer>
                  <div className="pvlObjectBanks">
                    <LayoutBank objects={this.getLayoutObjects()}></LayoutBank>
                    <ContentBank content={this.getContentBank()}></ContentBank> 
                  </div>
              </div>
            </DndProvider>
        </div>
      )  
  }
}

export default ParsleyVisualLayout;




