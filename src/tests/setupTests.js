import Enzyme from 'enzyme';
import Adaptar from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-enzyme';

Enzyme.configure({
    adapter: new Adaptar()
});
