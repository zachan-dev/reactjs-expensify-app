import Enzyme from 'enzyme';
import Adaptar from '@wojtekmaj/enzyme-adapter-react-17';
import 'jest-enzyme';
import DotEnv from 'dotenv';

Enzyme.configure({
    adapter: new Adaptar()
});

DotEnv.config({ path: '.env.test' });