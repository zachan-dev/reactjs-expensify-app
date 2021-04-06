import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        {/** For navigation links */}
        {/** exact: use this route only when it is exact */}
        {/** activeClassName: will use the class when the navlink matches the current page */}
        <NavLink exact to="/" activeClassName="is-active">Dashboard</NavLink>
        <NavLink exact to="/create" activeClassName="is-active">Create Expense</NavLink>
        <NavLink exact to="/help" activeClassName="is-active">Help</NavLink>
    </header>
);

export default Header;