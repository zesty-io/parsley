
class LayoutObject extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        alert(e.target.value);
    } 
    
    render() {
        const styles = this.props.styles || {};

        return (
            <div>
                <label >hello</label>
                <input type="text" onChange={this.handleChange} value="world" />
            </div>
        );
    }
}




