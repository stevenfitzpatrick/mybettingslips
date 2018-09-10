import { update } from '../';

describe('GraphQL Helpers', () => {
  const list = [
    { name: 'Football', icon: 'soccer' },
    { name: 'American Football', icon: 'football' }
  ];

  test('should return same list if no new item added', () => {
    expect(update.addItem({ list })).toEqual(list);
  });

  test('should add item to top of list if sort not applied', () => {
    expect(
      update.addItem({ list, item: { name: 'Polo', icon: '' } })
    ).toContainEqual(expect.objectContaining({ name: 'Polo', icon: '' }));
  });

  test('should sort alphabetically by name', () => {
    expect(
      update.addItem({ list, item: { name: 'Polo', icon: '' }, sort: true })
    ).toContainEqual(expect.objectContaining({ name: 'Polo', icon: '' }));

    const names = update
      .addItem({
        list,
        item: { name: 'Polo', icon: '' },
        sort: true
      })
      .map(item => item.name);

    expect(names).toEqual(['American Football', 'Football', 'Polo']);
  });
});
