
class ContentBank extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = this.props.styles || {};

        return (
            <div>
                <h2>Content Bank</h2>
                <div className="content">
                    <LayoutObject></LayoutObject>
                    <LayoutObjectText></LayoutObjectText>
                </div>
            </div> 
        );
    }
}




