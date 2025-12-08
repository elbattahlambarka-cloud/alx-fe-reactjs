// src/components/Products.jsx
import { Link } from 'react-router-dom';

const products = [
  { id: 'laptop-123', name: 'Gaming Laptop', price: '$1299', category: 'electronics' },
  { id: 'phone-456', name: 'Smartphone Pro', price: '$899', category: 'electronics' },
  { id: 'chair-789', name: 'Ergonomic Chair', price: '$299', category: 'furniture' },
  { id: 'book-101', name: 'React Cookbook', price: '$39', category: 'books' },
  { id: 'headphones-112', name: 'Wireless Headphones', price: '$199', category: 'electronics' },
];

function Products() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Products</h1>
      <p style={styles.subtitle}>
        Dynamic routing example with product IDs in URLs
      </p>
      
      <div style={styles.productsGrid}>
        {products.map(product => (
          <div key={product.id} style={styles.productCard}>
            <h3 style={styles.productName}>{product.name}</h3>
            <div style={styles.productMeta}>
              <span style={styles.productPrice}>{product.price}</span>
              <span style={styles.productCategory}>{product.category}</span>
            </div>
            <p style={styles.productDescription}>
              Click below to view product details using dynamic routing.
            </p>
            <Link to={`/products/${product.id}`} style={styles.viewButton}>
              View Product Details →
            </Link>
          </div>
        ))}
      </div>
      
      <div style={styles.explanation}>
        <h3 style={styles.explanationTitle}>How Dynamic Routing Works:</h3>
        <p style={styles.explanationText}>
          Each product link has a different ID in the URL (<code>/products/:productId</code>).
          The same component (<code>ProductDetail</code>) handles all product pages,
          extracting the ID from the URL using <code>useParams()</code>.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '2rem',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  productCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    transition: 'box-shadow 0.2s',
  },
  productName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  productPrice: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#059669',
  },
  productCategory: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  productDescription: {
    color: '#6b7280',
    marginBottom: '1.5rem',
    fontSize: '0.875rem',
  },
  viewButton: {
    display: 'inline-block',
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '0.875rem',
  },
  explanation: {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
  },
  explanationTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: '0.5rem',
  },
  explanationText: {
    color: '#0c4a6e',
  },
};

export default Products;