import moment from "moment";

// getVisibleExpenses

export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        // startDate < createdAt < endDate; startDate and endDate can be undefined
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch & endDateMatch & textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; // 1: b come first; -1: a come first
        }
        else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1; 
        }
    });
};