import React from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import { ContentTypes } from './ContentTypes';
import DropColumn from './DropColumn'

let dynamicType = ''

const layoutObjectSource = {
  canDrag(props) {
    //console.log(props)
    // You can disallow drag based on props
    return props.isReady
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    //console.log(props)
    const item = { id: props.id }
    
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

    // This is a good place to call some Flux action
   console.log('endDrag from layout object')
   console.log(item.id, dropResult)
   console.log('component',component)
   
   // look to remove if we are in layout mode and have the removeMe function
   if(typeof(component.props.removeMe) === 'function'){
    component.props.removeMe()
   }
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
      return ContentTypes[this.props.type] !== undefined ? ContentTypes[this.props.type] :  ContentTypes.unknown;
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
        
        let type = this.getType() 
        let ptype = this.getPrimaryType()
        let mode = this.getMode()
        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        const { isDragging, connectDragSource } = this.props
        let draggingClass = isDragging ? 'pvlDragging' : '';

        // show different outputs based on the mode

        // this is the mode for th left side bank, or for content
        if (mode == 'bank' || ptype == "content") {
          return connectDragSource(
              <div className={`pvlObject pvlLayoutObject pvl${this.capitalizeFirst(ptype)} pvl${this.capitalizeFirst(type.type)} ${draggingClass}`}>
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
              <div className={`pvlObject pvlVisualLayout pvlDropTarget pvlLayoutRow pvl${this.capitalizeFirst(ptype)} pvl${this.capitalizeFirst(type.type)} ${draggingClass}`}>
                {this.props.obj.columns.map( (column,index) => {
                  
                  let styles = {
                    flex: column.width
                  }
                  return (
                      <DropColumn key={`column:${column.width}:${this.props.obj.name}:${index}`} droppable={column.droppable} style={styles}></DropColumn>
                  )
                })}
                
              </div>
            )
          // else we are dealing with a design object
          } else {
            return connectDragSource(
              <div className={`pvlObject pvlVisualLayout pvlLayoutObject pvl${this.capitalizeFirst(ptype)} pvl${this.capitalizeFirst(type.type)} pvlDesignObject`}>
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



