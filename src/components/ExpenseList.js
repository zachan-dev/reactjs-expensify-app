import React from 'react';
import { connect } from 'react-redux'; // Component can connect to the store

import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => ( // real component, re-rendered reactively with store state changes
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <p>No expenses</p>
                    </div>
                ) : (
                    props.expenses.map(expense => 
                        <ExpenseListItem key={expense.id} {...expense}/>
                    )
                )
            }
            {/* {props.expenses.length} */}
        </div>
        
    </div>
);

const mapStateToProps = (state) => { // map the store state to component props
    return {
        expenses: selectExpenses(state.expenses, state.filters),
    };
};

export default connect(mapStateToProps)(ExpenseList); // Component to connect ExpenseList to the store