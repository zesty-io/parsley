
import React, { Component } from 'react'

// VisualLayoutContainer 
// is the working Component that maintains the primary state of the layout and code objects
// it has important tree building functions which it recursively seeds as callback function props in DropColumn(s) and LayoutObject(s) components

class InstanceSelector extends React.Component {
    constructor(props) {
        super(props);
         this.state = { 
            availableInstances: [],
         }
    }
    async componentDidMount() {
        let instances = await ZestyAPI.getInstances();
        //console.log(instances.data)
        this.setState({
            'availableInstances' : instances.data
        })
        
    }
   
    render() {
        let instances = this.state.availableInstances
        return (
            <div className="pvlInstanceSelector">
                Select an Instance
                <input type="text" placeholder="search" />
                <div>
                    
                    {instances.length != 0 && instances.sort(function(a, b){
                            if(a.name == null) a.name = ''
                            if(b.name == null) b.name = ''

                            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }

                            // names must be equal
                            return 0;
                        }).map((instance) => {
                            console.log(instance)
                            return (
                            <div key={instance.ZUID}>
                                <h1>{instance.name}</h1>
                                <a onClick={ () => this.props.setInstanceZUID(instance.ZUID) } href="#"> set zuid </a>
                            </div>
                            )
                        })
                        
                    }
                </div>
            </div>
        );
    }
}

export default InstanceSelector;




