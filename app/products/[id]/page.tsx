import { mockProducts } from '@/app/lib/mockData';
import ProductClient from './ProductClient';

// Generate static params for all product IDs
export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductClient params={params} />;
}