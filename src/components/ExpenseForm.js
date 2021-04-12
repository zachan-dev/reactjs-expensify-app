import React from 'react';
import moment from 'moment';
/** datepicker */
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

// const date = new Date(); // too bad, use moment as always
// const now = moment();
// console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: '',
        };
    }
    onDescriptionChange = (e) => {
        // Method 1
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        // Method 2
        e.persist();
        this.setState(() => ({ note: e.target.value }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { // https://regex101.com/
            this.setState(() => ({ amount }));
        }
    };
    onDateChange = (createdAt) => { // react-dates SingleDatePicker
        if (createdAt) { // prevent user from clearing the datepicker's value
            this.setState(() => ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) => { // react-dates SingleDatePicker
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault(); // prevent page refresh

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: 'Please provide description and amount.' }));
        }
        else {
            // Clear the error
            this.setState(() => ({ error: '' }));
            // Submission
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note,
            });
        }
    };
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input 
                    type="text"
                    placeholder="description"
                    autoFocus
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input 
                    type="number"
                    placeholder="amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt} // takes a moment
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    block //Add this to extend the field.
                />
                <textarea
                    placeholder="Add a note for your expense (optional)"
                    className="textarea"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        );
    }
};