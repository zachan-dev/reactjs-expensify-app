import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        {/** For navigation links */}
        {/** exact: use this route only when it is exact */}
        {/** activeClassName: will use the class when the navlink matches the current page */}
        <NavLink exact to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
        <NavLink exact to="/create" activeClassName="is-active">Create Expense</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);