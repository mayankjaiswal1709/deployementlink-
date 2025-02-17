import { mockProducts } from './mockData';

export async function getProducts(params: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  if (params.category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === params.category?.toLowerCase()
    );
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  const page = params.page || 1;
  const limit = params.limit || 9;
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    products: filteredProducts.slice(start, end),
    currentPage: page,
    totalPages: Math.ceil(filteredProducts.length / limit),
    totalProducts: filteredProducts.length,
  };
}

export async function getProduct(id: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const product = mockProducts.find(p => p.id === id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
}