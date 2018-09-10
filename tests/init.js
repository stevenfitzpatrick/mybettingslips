const Adapter = require('enzyme-adapter-react-16');
import Enzyme from 'enzyme';
import { init } from '@sfitzpatrick/enzyme-context-helpers';
import { Theme } from '@sfitzpatrick/fitzy';

import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';

Enzyme.configure({ adapter: new Adapter() });
init({ theme: Theme });

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  });
}
