
import React, { Component } from 'react'

// VisualLayoutContainer 
// is the working Component that maintains the primary state of the layout and code objects
// it has important tree building functions which it recursively seeds as callback function props in DropColumn(s) and LayoutObject(s) components

class InstanceSelector extends React.Component {
    constructor(props) {
        super(props);
         this.state = { 
            search: '',
            availableInstances: []
         }
    }
    async componentDidMount() {
        let instances = await ZestyAPI.getInstances();
        //console.log(instances.data)
        this.setState({
            'availableInstances' : instances.data
        })
        
    }
    handleChange = (e) => {
        this.setState({ search: e.target.value });
    }

    getInstances() {
        return this.state.availableInstances.filter(instance => {
            if(this.state.search == '') return true;
            return instance.name.toLowerCase().includes(this.state.search.toLowerCase())
        })
    }
   
    render() {
        let instances = this.getInstances()
        return (
            <div className="pvlInstanceSelector">
                Select an Instance
                <input 
                    type="text" 
                    placeholder="search" 
                    value={this.state.search}
                    onChange={this.handleChange}
                    />
                <div>
                    {instances.length == 0 && <p>No Instances found. You may need to login to  
                        <a target="_blank" href="https://accounts.zesty.io"> https://accounts.zesty.io</a>
                        <br /><br />
                        If you do not have an account, you may <a onClick={ () => this.props.toggleDemoMode() } href="#"> start demo mode</a>.
                        </p>}
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




