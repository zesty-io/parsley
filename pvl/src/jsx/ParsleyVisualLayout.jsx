
import React, { Component } from 'react'
import VisualLayoutContainer from './VisualLayoutContainer'
import ContentBank from './ContentBank'
import LayoutBank from './LayoutBank'
import PVLToolbar from './PVLToolbar'

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
    return [
      {
        uid: '11',
        name: '2 Columns',
        type: 'columns',
        classes: 'row',
        html: '<div>*</div>',
        droppable: false,
        columns: [
          {
            width: '2',
            html: '<div>*</div>',
            classes: 'column',
            droppable: true
          },
          {
            width: '2',
            html: '<div>*</div>',
            classes: 'column',
            droppable: true
          },
        ]

      },
      {
        uid: '12',
        name: '3 Columns',
        type: 'columns',
        classes: 'row',
        html: '<div style="">*</div>',
        preview: '<div style="display:flex"><div style="flex:1"></div><div style="flex:2"></div><div style="flex:2"></div></div>',
        droppable: false,
        children: [
          {
            width: '1',
            html: '<div style="">*</div>',
            classes: 'column',
            droppable: true
          },
          {
            width: '2',
            html: '<div>*</div>',
            classes: 'column',
            droppable: true
          },
          {
            width: '2',
            html: '<div>*</div>',
            classes: 'column',
            droppable: true
          }
        ]

      },
       {
        uid: '13',
        name: 'Horizontal Rule',
        type: 'design',
        html: '<hr>',
        preview: '<hr>',
        classes: '',
        droppable: false
      }
    ]
  }

  getTree(){
  
  }

  render() {
      return (
        <div className="pvl">
            <DndProvider backend={HTML5Backend}>
              <div className="shell">
                  <VisualLayoutContainer></VisualLayoutContainer>
                  <div class="pvlObjectBanks">
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




