import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ 
    isAuthenticated, 
    component: Component, // rename
    ...rest // everything other than the above two props
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to='/dashboard' />
        ) : (
            <Component {...props}/>
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid, /// turn undefined to false
});

export default connect(mapStateToProps)(PublicRoute);