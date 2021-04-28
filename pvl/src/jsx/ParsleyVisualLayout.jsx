
import React, { Component } from 'react'
import VisualLayoutContainer from './VisualLayoutContainer'
import ContentBank from './ContentBank'
import LayoutBank from './LayoutBank'
import { DesignObjects } from './DesignObjects'
import { ContentTypes } from './ContentTypes'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


class ParsleyVisualLayout extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { 
      data: [],
      selected: 'visual' ,
      models: []
    };
     
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

  getPreviewTestingURL() {
    let url
    if(this.props.instanceZUID){
       url = `https://${this.props.instanceZUID}-dev.preview.zesty.io/ajax/parsley-visual-layout/`
    } else {
       url = `https://www.zesty.io/ajax/parsley-visual-layout/`
    }
    return url; 
  } 

  async componentDidMount(){
    const response = await fetch(this.getContentBankURL());
    const json = await response.json(); 
    this.setState({
      models: this.getIterableObject(json.models)
    }) 
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
          let html = data_type != 'images' ? `{{${model.name}.first().${key}}}` : `{{${model.name}.first().${key}.getImage()}}`
         // this is used to buidl the HTML
          let typeObj = {...ContentTypes[data_type]}
          let baseHTML = typeObj.hasOwnProperty('html') ? typeObj.html : '*'

          fieldsToReturn.push({ 
              key: `${model.zuid}-${key}`,
              name : key, 
              searchIndex: `${model.name} ${key}`.toLowerCase(),
              type: data_type,
              obj: typeObj,
              model: {
                  name: model.name,
                  zuid: model.zuid
              },
              sort: sortIndex,
              value: "",
              html: baseHTML.replace('*',html)
          })
          sortIndex++
        })    
        return fieldsToReturn
    }
  getContentBank() {
    return this.state.models
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
    return DesignObjects
  }

  setSelectedTab = (tab) => {
    if(this.state.selected != tab){
      this.setState({ 
          selected: tab,
          hasRenderedUpdatedHTML: false
         });
    }

  }
  getSelectedTab() {
    return this.state.selected
  }

  render() {
      return ( 
        <div className="pvl">
            <DndProvider backend={HTML5Backend}>
              <div className="shell">
                  <VisualLayoutContainer
                    setTab={this.setSelectedTab} 
                    selected={this.state.selected}
                    hasRenderedUpdatedHTML={this.state.hasRenderedUpdatedHTML}
                    previewURL={this.getPreviewTestingURL()}
                    ></VisualLayoutContainer>
                  <div className="pvlObjectBanks">
                    
                    <LayoutBank 
                      setTab={this.setSelectedTab}
                      objects={this.getLayoutObjects()}
                      ></LayoutBank>
                    <ContentBank 
                      setTab={this.setSelectedTab} 
                      content={this.getContentBank()}
                      ></ContentBank> 
                  </div>
              </div>
            </DndProvider>
        </div>
      )  
  }
}

export default ParsleyVisualLayout;




