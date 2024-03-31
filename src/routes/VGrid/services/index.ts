export const getCarousels = async (start = 0, pageSize = 10) => {
  const res = await fetch(`/api/configuration.json?start=${start}&pageSize=${pageSize}`);
  const data = await res.json();
  return data;
};

export const getProductByCategory = async (start = 0, pageSize = 10) => {
  const res = await fetch(`/api/item.json?start=${start}&pageSize=${pageSize}`);
  const data = await res.json();
  return data;
};
