/** Mocking Libraries - called only when testing */
// solving snapshot dynamic 3rd party library function problem
const moment = jest.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};