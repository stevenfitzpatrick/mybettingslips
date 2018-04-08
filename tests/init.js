import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { init } from '@sfitzpatrick/enzyme-context-helpers';

import { Theme } from '@sfitzpatrick/fitzy';

Enzyme.configure({ adapter: new Adapter() });
init({ theme: Theme });
