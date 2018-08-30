const Adapter = require('enzyme-adapter-react-16');
import Enzyme from 'enzyme';
import { init } from '@sfitzpatrick/enzyme-context-helpers';
import { Theme } from '@sfitzpatrick/fitzy';
import 'jest-dom/extend-expect';

Enzyme.configure({ adapter: new Adapter() });
init({ theme: Theme });
