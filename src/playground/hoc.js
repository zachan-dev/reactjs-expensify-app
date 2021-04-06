// Higher Order Component (HOC) - A component that renders another component
// Goal 1: Reuse code
// Goal 2: Render hijacking
// Goal 3: Prop manipulation
// Goal 4: Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

/** Normal React Component */
const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

/** Higher Order Components, HOCs */
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    ); // HOC
};
const requireAuthentication = (WrappedComponent) => { // very useful -> only show info when authenticated
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
             ) : (
                <p>Please login to view the info</p>
            )}
        </div>
    );
}


const AdminInfo = withAdminWarning(Info); // HOC
const AuthInfo = requireAuthentication(Info);

// const renderApp = () => ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'));
const renderApp = () => ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById('app'));
renderApp();