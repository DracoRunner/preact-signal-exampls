export const getCarousels = async (start = 0, pageSize = 10) => {
  const res = await fetch(`/api/configuration.json?start=${start}&pageSize=${pageSize}`);
  const data = await res.json();
  return data;
};

export const getProductByCategory = async (category: string, start = 0, end = 10) => {
  const res = await fetch(`/api/products/category/${category}?skip=${start}&limit=${end}`);
  const data = await res.json();
  return {
    ...data,
    products: [...data.products, ...data.products, ...data.products, ...data.products],
    total: data.total * 2,
  };
};
