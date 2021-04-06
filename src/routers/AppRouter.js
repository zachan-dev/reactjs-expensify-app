import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/** Components */
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch> {/** Stops when found a match, checks line by line */}
                {/** exact: use this route only when it is exact */}
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} /> {/** :id: for dynamic routing, can access using props.match.params.id */}
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} /> {/** default page, no path */}
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;