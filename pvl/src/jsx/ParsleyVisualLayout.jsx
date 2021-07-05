
import React, { Component } from 'react'
import VisualLayoutContainer from './VisualLayoutContainer'
import ContentBank from './ContentBank'
import LayoutBank from './LayoutBank'
import InstanceSelector from './InstanceSelector'
import { DesignObjects } from './DesignObjects'
import { ContentTypes } from './ContentTypes'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


class ParsleyVisualLayout extends React.Component {
  constructor(props) {
    super(props);  
    let instanceZUID = (this.props.instanceZUID != undefined) ? this.props.instanceZUID : '';
    let modelZUID = (this.props.modelZUID != undefined) ? this.props.modelZUID : '';
    let demo = (this.props.demo != undefined && this.props.demo == "true") ? true : false;
    this.state = { 
      data: [],
      selected: 'visual' ,
      models: [],
      views: [],
      modelZUID: modelZUID,
      model: {},
      instanceZUID: instanceZUID,
      instance : {
        name: 'Select'
      }, 
      demo: demo,
      demoData: {
        'name': 'Demo Mode',
        'contentBankURL' : `https://www.zesty.io/-/gql/`,
        'previewURL': `https://www.zesty.io/-/pvl/`
      } 
    };
     
  }
  getContentBankURL() {
    let url
    if(this.state.instanceZUID != '' && this.state.demo == false){
       url = `https://${this.state.instance.randomHashID}-dev.webengine.zesty.io/-/gql/`
    } else {
       url = this.state.demoData.contentBankURL
    }
    return url; 

  } 

  getPreviewTestingURL() {
    let url
    if(this.state.instanceZUID != '' && this.state.demo == false){
       url = `https://${this.state.instance.randomHashID}-dev.webengine.zesty.io/-/pvl/`
    } else {
       url = this.state.demoData.previewURL
    }
    return url; 
  } 
  async loadData(){
    // get models
    const response = await fetch(this.getContentBankURL());
    const json = await response.json(); 
    
    let cleanedViewsObject = {} 
    if(ZestyAPI.instanceZUID){
      // get views
      const views = await ZestyAPI.getViews();
      views.data.forEach(view => {
        cleanedViewsObject[view.fileName] = view.ZUID
      }) 
    }
    console.log(cleanedViewsObject)
    this.setState({
      models: this.getIterableObject(json.models),
      views: cleanedViewsObject
    }) 
  }

  async componentDidMount(){
    if(this.state.instanceZUID == '' && this.state.demo == false && typeof ZestyAPI !== 'undefined'){
        let authed = await ZestyAPI.verify()
        console.log(authed)
        if(authed.status != "OK"){
          console.log("authed")
        }
        
    } else {
      this.toggleDemo()
    }
    await this.loadData()
   
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

  setInstance = async (object) => {
    console.log(object)
     this.setState({
        instanceZUID: object.ZUID,
        instance: object
      },async () => {
        ZestyAPI.setInstanceZUID(object.ZUID)
      await this.loadData()
    })
  }

  setModel = async (modelObject) => {
    
    modelObject.fileJSON = `/z/pvl/${modelObject.zuid}.json`
    modelObject.fileHTML = `/z/pvl/${modelObject.zuid}.zhtml`
    console.log(modelObject) 
    this.setState({
      model: modelObject,
      modelZUID: modelObject.zuid
    }, async () => {
      alert(`Model '${modelObject.label}' Selected`)
    }) 
  }

  toggleDemo = async () => {
    let toggle = this.state.demo ? false : true;
    this.setState({demo: toggle}, async () => {
      await this.loadData()
    })
    
  }

  save = (code) =>{
    const fileName = this.state.model.fileHTML
    
    if(this.state.views.hasOwnProperty(fileName)){
      ZestyAPI.updateView(this.state.views[fileName], code)
    } else {
      ZestyAPI.createView(fileName,code)
    }
    
  }
  publish = () => {
    alert('pub')
  }

  getInstanceData() {
    return this.state.demo ? this.state.demoData : this.state.instance
  }

  getModelData() {
    return this.state.model
  }
  resetModelData() {
    this.setState({
      model : {},
      modelZUID : ''
    })
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
            {this.state.instanceZUID == '' && this.state.demo == false && <InstanceSelector
              setInstance={this.setInstance}
              toggleDemoMode={this.toggleDemo}
            ></InstanceSelector>}
            <DndProvider backend={HTML5Backend}>
              <div className="shell">
                  <VisualLayoutContainer
                    setTab={this.setSelectedTab} 
                    selected={this.state.selected}
                    hasRenderedUpdatedHTML={this.state.hasRenderedUpdatedHTML}
                    previewURL={this.getPreviewTestingURL()}
                    instance={this.getInstanceData()}
                    model={this.getModelData()}
                    save={this.save}
                    publish={this.publish}
                    ></VisualLayoutContainer>
                  <div className="pvlObjectBanks">
                    
                    <LayoutBank 
                      setTab={this.setSelectedTab}
                      objects={this.getLayoutObjects()}
                      ></LayoutBank>
                    <ContentBank 
                      setTab={this.setSelectedTab} 
                      content={this.getContentBank()}
                      setModel={this.setModel}
                      ></ContentBank> 
                  </div>
              </div>
            </DndProvider>
        </div>
      )  
  }
}

export default ParsleyVisualLayout;




