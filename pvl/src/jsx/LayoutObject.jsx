import React from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import { ContentTypes } from './ContentTypes';
import DropColumn from './DropColumn'

const layoutObjectSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.isReady
  },

  isDragging(props, monitor) {
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id
  },

  beginDrag(props, monitor, component) {

    // change the tab if applicable, this is used when someone drag while
    // having code or preview open
    if(component.props.hasOwnProperty('setTab') && typeof component.props.setTab === 'function'){
      console.log('setting')
      component.props.setTab('visual')
    }

    // Return the data describing the dragged item
    // this is used to pass information to the DropColumn\
    var item = { 
      id: props.id,
      mode: props.mode,
      fromLocation: props.location,
      html: props.obj.html,
      component: component
    }

    // add the model to it, this will be used more later as we build out the code tree
    if(props.obj.model != undefined){
      item.model = props.obj.model
    }

    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem()

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult()

  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}


class LayoutObject extends React.Component {
    constructor(props) {
        super(props);
    }

    getType() {
      return ContentTypes[this.props.type] !== undefined ? {...ContentTypes[this.props.type]} :  {...ContentTypes.unknown};
    }
    getMode() {
      return this.props.mode != undefined ? this.props.mode : 'bank';
    }

    getPrimaryType() {
      return this.props.primarytype !== undefined ? this.props.primarytype :  'content';
    }

    capitalizeFirst(s){
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }

    // check the passed in object HAS a specific key
    has(key){
      return (this.props.obj !== undefined && this.props.obj[key] !== undefined)
    }
    
    // check if the object IS of a primary type
    is(primaryType){
      return (this.getPrimaryType() == primaryType)
    }

    render() {
        // Your component receives its own props as usual
        const { id } = this.props
        
        var type = this.getType() 
        var ptype = this.getPrimaryType()
        var mode = this.getMode()
        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        const { isDragging, connectDragSource } = this.props
        var draggingClass = isDragging ? 'pvlDragging' : '';

        // show different outputs based on the mode

        // this is the mode for th left side bank, or for content
        if (mode == 'bank' || ptype == "content") {
          return connectDragSource(
              <div className={`pvlObject pvlLayoutObject pvl${this.capitalizeFirst(mode)} pvl${this.capitalizeFirst(ptype)} pvl${this.capitalizeFirst(this.props.type)} ${draggingClass}`}>
                <div className="pvlObjectHeader">  
                  <div className="pvlTypeTag" title={type.name}> 
                    <span className={`fa fa-${type.icon}`}></span>
                  </div>
                  <div className="pvlDescription">
                    {this.props.mode == 'layout' && <span>{this.props.obj.model}</span>}
                    <span>{this.props.name}</span>
                    {this.has('html') && this.is('content') && <em>{this.props.obj.html}</em>}
                    
                  </div>
                </div>
                {this.has('preview') && 
                  <div className="pvlPreview" dangerouslySetInnerHTML={{
                    __html: this.props.obj.preview
                    }}></div> 
                  }
                  
              </div>
          );
        
        // below is for the dropcolumn or layout mode
        } else {

          // here we are dealing with design objects or columns
          // for columns we have drop targets
          if(this.props.obj.type == 'columns'){
         
            return connectDragSource(
              <div className={`pvlObject pvlVisualLayout pvlDropTarget pvlLayoutRow pvl${this.capitalizeFirst(mode)}  pvl${this.capitalizeFirst(ptype)} pvl${this.capitalizeFirst(this.props.type)} ${draggingClass}`}>
                {this.props.obj.columns.map( (column,index) => {
                  
                  let styles = {
                    flex: column.width
                  }
                  let columnID = `${this.props.obj.fullName}-${column.width}:${this.props.obj.name}:${index}`
                  return (
                      <DropColumn 
                        removeFromTree={this.props.removeFromTree} 
                        buildTree={this.props.buildTree} 
                        key={columnID} 
                        id={columnID} 
                        droppable={column.droppable} 
                        style={styles}>
                        </DropColumn>
                  )
                })}
                
              </div>
            )
          // else we are dealing with a design object
          } else {
            return connectDragSource(
              <div className={`pvlObject pvlVisualLayout pvlLayoutObject pvl${this.capitalizeFirst(mode)}  pvl${this.capitalizeFirst(ptype)} pvl${this.capitalizeFirst(this.props.type)} pvlDesignObject`}>
                  <div className="pvlPreview" dangerouslySetInnerHTML={{
                    __html: this.props.obj.html
                    }}></div> 
              </div>
            )
          }
        }
    }
}

export default DragSource(ItemTypes.LAYOUTOBJECT, layoutObjectSource, collect)(LayoutObject)



