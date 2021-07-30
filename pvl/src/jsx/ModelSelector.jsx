
import React, { Component } from 'react'

class ModelSelector extends React.Component {
    constructor(props) {
        super(props);
         this.state = { 
            search: '',
            models: []
         }
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value });
    }

    render() {
        
        return (
            <div className="pvlSelector">
                
                <div>
                    <h1>Select a Content Model to Edit</h1>
                    <input 
                        type="text" 
                        placeholder="Search Content Models" 
                        value={this.state.search}
                        onChange={this.handleChange}
                        />
                    <div>
                    {this.props.models.length == 0 && <p>No Models found. Clear Search</p>}
                    <ul>   
                    {this.props.models.length != 0 && this.props.models.sort(function(a, b){
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
                        }).map((model) => {
                            return (
                                <li key={model.ZUID}>
                                    <a onClick={ () => this.props.setModel(model) } href="#"> 
                                    {model.label} ({model.name})
                                    </a>
                                </li>
                            )
                        })
                        
                    }
                    </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModelSelector;




