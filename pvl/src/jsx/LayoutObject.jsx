import React from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes';
import { LayoutObjectTypes } from './LayoutObjectTypes';

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
    console.log(props)
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
    alert('drag ended')
   console.log(item.id, dropResult)
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
      return LayoutObjectTypes[this.props.type] !== undefined ? LayoutObjectTypes[this.props.type] :  LayoutObjectTypes.unknown;
    }



    render() {
        // Your component receives its own props as usual
        const { id } = this.props
        
        let type = this.getType()
        // These props are injected by React DnD,
        // as defined by your `collect` function above:
        const { isDragging, connectDragSource } = this.props
        console.log('no ty[e', type)
        return connectDragSource(
            <div className="pvlObject pvlLayoutObject pvl">
                <div className="pvlTypeTag" title={type.name}> 
                  <span className={`fa fa-${type.icon}`}></span>
                </div>
                <div className="pvlObjectPreview">
                  {this.props.obj !== undefined && this.props.obj.preview !== undefined && 
                    <div className="pvlPreview" dangerouslySetInnerHTML={{
                      __html: this.props.obj.preview
                      }}></div>
                    }

                  {this.props.type}: {this.props.name} <br />
                  {isDragging && ' (being dragged )'}
                </div>
            </div>
        );
    }
}

export default DragSource(ItemTypes.LAYOUTOBJECT, layoutObjectSource, collect)(LayoutObject)



