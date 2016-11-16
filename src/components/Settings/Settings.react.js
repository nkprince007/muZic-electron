import React from 'react';

class Settings extends React.Component {
    static propTypes = {
        children: React.PropTypes.object,
        config: React.PropTypes.object,
        refreshProgress: React.PropTypes.number
    };

    render() {
        return (
            <div className="settings">
                <div className="settings-header">
                    <h1 className="title">Settings</h1>
                    <p>tweak <b>your</b> stuff, in a way that pleases <b>you</b>...</p>
                </div>
                <div className="settings-content">
                    {
                        React.cloneElement(this.props.children, {
                            config: this.props.config,
                            refreshProgress: this.props.refreshProgress
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Settings;