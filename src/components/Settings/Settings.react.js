import React from 'react';

class Settings extends React.Component {
    static propTypes = {
        children: React.PropTypes.object,
        config: React.PropTypes.object
    };

    render() {
        return (
            <div className="settings">
                <div className="settings-header">
                    <h1 className="title">Settings</h1>
                    <p>tweak your stuff, in a way that pleases you...</p>
                </div>
                <div className="settings-content">
                    {
                        React.cloneElement(this.props.children, {
                            config: this.props.config
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Settings;