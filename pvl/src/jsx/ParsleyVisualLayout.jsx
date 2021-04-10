
class ParsleyVisualLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = this.props.styles || {};

        return (
            <div className="pvl">
                <div className="shell">
                      <VisualLayout></VisualLayout>
                <ContentBank></ContentBank>
                </div>
            </div>
        );
    }
}




