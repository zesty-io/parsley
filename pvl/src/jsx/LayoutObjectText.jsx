
class LayoutObjectText extends LayoutObject {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: event.target.value});
    } 

    render() {
        const styles = this.props.styles || {};

        return (
            <div>
                <label >me again </label>
                <input type="text" onChange={this.handleChange} value={this.state.value} />
            </div>
        );
    }
}




