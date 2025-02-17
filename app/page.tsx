'use client';
import Link from 'next/link';
import { ShoppingCart, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleShopNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      router.push('/products');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            EcoShop
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/products" className="text-muted-foreground hover:text-foreground">
              Products
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome to EcoShop</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our amazing products at great prices
            </p>
            <button
              onClick={handleShopNow}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Shop Now
            </button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Electronics', 'Fashion', 'Home & Living'].map((category) => (
                <div key={category} className="bg-card rounded-lg p-6 text-center shadow-sm">
                  <Package className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{category}</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore our {category.toLowerCase()} collection
                  </p>
                  <Link
                    href={`/products?category=${category.toLowerCase()}`}
                    className="text-primary hover:underline"
                  >
                    View Products
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted mt-20 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 EcoShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}