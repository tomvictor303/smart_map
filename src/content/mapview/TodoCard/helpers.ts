// a little function to help us with reordering the result
export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getSampleItems = (): Array<any> => {
  return [
    {
      "id": "Item 2",
      "primary": "Fantastic Fresh Shirt"
    },
    {
      "id": "Item 3",
      "primary": "Ergonomic Steel Towels"
    },
    {
      "id": "Item 1",
      "primary": "Gorgeous Fresh Soap"
    },
    {
      "id": "Item 9",
      "primary": "Refined Fresh Sausages"
    },
    {
      "id": "Item 5",
      "primary": "Handcrafted Rubber Car"
    },
    {
      "id": "Item 4",
      "primary": "Handmade Plastic Chips"
    },
    {
      "id": "Item 6",
      "primary": "Tasty Metal Pizza"
    },
    {
      "id": "Item 7",
      "primary": "Sleek Granite Computer"
    },
    {
      "id": "Item 8",
      "primary": "Intelligent Fresh Table"
    },
    {
      "id": "Item 10",
      "primary": "Rustic Frozen Car"
    }
  ];
};
