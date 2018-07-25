import { initialState, results } from '../CreateBet.state';

describe('CreateBet State', () => {
  test('should contain all correct Result options', () => {
    expect(results).toMatchInlineSnapshot(`
Object {
  "LOSS": "Loss",
  "OPEN": "Open",
  "VOID": "Void",
  "WIN": "Win",
}
`);
  });

  test('should have correct initial state for creating a bet', () => {
    expect(initialState).toMatchInlineSnapshot(`
Object {
  "awayId": "",
  "homeId": "",
  "odds": "",
  "result": "Open",
  "sportId": "",
  "stake": "",
  "typeId": "",
}
`);
  });
});
