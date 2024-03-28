const items = new Array(100).fill(null).map((i, index) => {
  return {
    title: `Item ${index + 1}`,
  };
});

export const getItemByIndex = (start: number, size: number) => {
  return {
    data: items.slice(start, start + size),
    total: items.length,
    start: start,
    end: start + size,
  };
};
