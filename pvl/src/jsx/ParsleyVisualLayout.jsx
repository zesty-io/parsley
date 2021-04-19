
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

 // converts given content object (which is Zesty.io /-/gql/ output) to 
    // a react iterable array/object build, also modifies data to work 
    // with the layout tool
    getIterableObject(models) {
        // bail if we dont have the array yet
        if(models == undefined) return []
        // restructure the data
        let structuredDataArray = []
        models.map( (model,index) => {
            
            model.key =model.zuid
            model.dataRef =model.gqlUrl
            // remove GQL references not used
            delete(model.gqlUrl)
            delete(model.gqlGetAllMethodName)
            delete(model.gqlGetMethodName)
            delete(model.gqlModelName)
            // setup fields for reading
            let fields = this.mutateFieldsForPVL(model)
            delete(model.fields)
            model.fields = fields
          
            structuredDataArray.push(model)
        })

        return structuredDataArray
    }

    mutateFieldsForPVL(model) {
        
        const fields = model.fields != undefined ? model.fields : {loading: "Empty Fields"}
        let fieldsToReturn = []
        let sortIndex = 1 ;

        Object.keys(fields).map(function(key, position) {
             
          let data_type = fields[key]
          let html = data_type != 'image' ? `{{this.${key}}}` : `{{this.${key}.getImage()}}`
          
          fieldsToReturn.push({ 
              key: `${model.zuid}-${key}`,
              name : key, 
              searchIndex: `${model.name}:${key}`.toLowerCase(),
              type: data_type,
              model: {
                  name: model.name,
                  zuid: model.zuid
              },
              sort: sortIndex,
              value: "",
              html: html
          })
          sortIndex++
        })    
        return fieldsToReturn
    }

  getContentBank() {
    return this.getIterableObject(this.state.data.models)
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




