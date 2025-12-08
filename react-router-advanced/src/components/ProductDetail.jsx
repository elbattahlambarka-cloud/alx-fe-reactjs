// src/components/ProductDetail.jsx
import { useParams, Link } from 'react-router-dom';

const productDetails = {
  'laptop-123': {
    name: 'Gaming Laptop',
    price: '$1299',
    category: 'electronics',
    description: 'High-performance gaming laptop with RTX 4070 and 32GB RAM.',
    specs: ['15.6" 240Hz Display', 'Intel Core i9', '1TB SSD', 'Windows 11'],
  },
  'phone-456': {
    name: 'Smartphone Pro',
    price: '$899',
    category: 'electronics',
    description: 'Flagship smartphone with advanced camera system and 5G.',
    specs: ['6.7" OLED Display', 'Triple Camera', '256GB Storage', 'IP68 Waterproof'],
  },
  'chair-789': {
    name: 'Ergonomic Chair',
    price: '$299',
    category: 'furniture',
    description: 'Comfortable ergonomic chair with lumbar support and adjustable height.',
    specs: ['Mesh Back', 'Adjustable Armrests', 'Swivel Base', '5-year Warranty'],
  },
  'book-101': {
    name: 'React Cookbook',
    price: '$39',
    category: 'books',
    description: 'Practical recipes for building modern React applications.',
    specs: ['300 Pages', 'Paperback', 'Updated for React 18', 'Code Examples'],
  },
  'headphones-112': {
    name: 'Wireless Headphones',
    price: '$199',
    category: 'electronics',
    description: 'Noise-cancelling wireless headphones with 30-hour battery life.',
    specs: ['Bluetooth 5.3', 'Active Noise Cancellation', 'Foldable Design', 'Carrying Case'],
  },
};

function ProductDetail() {
  const { productId } = useParams();
  const product = productDetails[productId];

  if (!product) {
    return (
      <div style={styles.notFound}>
        <h2>Product Not Found</h2>
        <p>No product found with ID: {productId}</p>
        <Link to="/products" style={styles.backLink}>
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link to="/products" style={styles.backButton}>
          ← Back to Products
        </Link>
        <span style={styles.category}>{product.category}</span>
      </div>
      
      <div style={styles.productInfo}>
        <h1 style={styles.productName}>{product.name}</h1>
        <div style={styles.priceTag}>{product.price}</div>
        
        <div style={styles.description}>
          <h3 style={styles.sectionTitle}>Description</h3>
          <p>{product.description}</p>
        </div>
        
        <div style={styles.specs}>
          <h3 style={styles.sectionTitle}>Specifications</h3>
          <ul style={styles.specsList}>
            {product.specs.map((spec, index) => (
              <li key={index} style={styles.specItem}>{spec}</li>
            ))}
          </ul>
        </div>
        
        <div style={styles.routingInfo}>
          <h3 style={styles.routingTitle}>Dynamic Routing in Action:</h3>
          <p style={styles.routingText}>
            This page uses the product ID <code>{productId}</code> from the URL.
            The same component handles all product detail pages, dynamically
            displaying content based on the URL parameter.
          </p>
        </div>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  backButton: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
  },
  category: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  productInfo: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  productName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  priceTag: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: '2rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#d1fae5',
    borderRadius: '0.5rem',
    display: 'inline-block',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  description: {
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
  },
  specs: {
    marginBottom: '2rem',
  },
  specsList: {
    listStyleType: 'none',
    padding: 0,
  },
  specItem: {
    padding: '0.5rem 0',
    color: '#4b5563',
    borderBottom: '1px solid #e5e7eb',
  },
  routingInfo: {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
  },
  routingTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#0369a1',
    marginBottom: '0.5rem',
  },
  routingText: {
    color: '#0c4a6e',
  },
  notFound: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  backLink: {
    display: 'inline-block',
    marginTop: '1rem',
    color: '#3b82f6',
    textDecoration: 'none',
  },
};

export default ProductDetail;