import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                {/** For navigation links */}
                {/** exact: use this route only when it is exact */}
                {/** activeClassName: will use the class when the navlink matches the current page::: activeClassName="is-active" */}
                <Link className="header__title" to="/dashboard">
                    <h1>Expensify</h1>
                </Link>
                {/* <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink> */}
                <button className="button button--link" onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);
