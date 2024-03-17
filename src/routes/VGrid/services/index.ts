export const getAllCategory = async () => {
  const res = await fetch('/api/products/categories');
  const data: string[] = await res.json();
  return data.map((item: string) => ({
    title: item,
    type: 'show',
  }));
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
