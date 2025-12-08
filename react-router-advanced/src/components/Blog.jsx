// src/components/Blog.jsx
import { Link, useParams } from 'react-router-dom';

const categories = [
  { id: 'tech', name: 'Technology', postCount: 5 },
  { id: 'design', name: 'Design', postCount: 3 },
  { id: 'business', name: 'Business', postCount: 4 },
];

const posts = [
  { id: 1, title: 'Getting Started with React Router', category: 'tech' },
  { id: 2, title: 'Modern Web Design Patterns', category: 'design' },
  { id: 3, title: 'Building Scalable Applications', category: 'tech' },
  { id: 4, title: 'Startup Funding Strategies', category: 'business' },
  { id: 5, title: 'UI/UX Best Practices', category: 'design' },
];

function Blog() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Blog</h1>
      <p style={styles.subtitle}>
        Dynamic routing example with URL parameters
      </p>
      
      <div style={styles.explanation}>
        <h3 style={styles.explanationTitle}>Dynamic Routing Demonstration:</h3>
        <p style={styles.explanationText}>
          This page demonstrates dynamic routing using URL parameters. 
          Click on a post to see dynamic routing in action with <code>:postId</code> parameter.
          Click on a category to see dynamic routing with <code>:categoryId</code> parameter.
        </p>
      </div>
      
      <div style={styles.layout}>
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Categories</h3>
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/blog/category/${category.id}`}
              style={styles.categoryLink}
            >
              {category.name} ({category.postCount})
            </Link>
          ))}
        </div>
        
        <div style={styles.content}>
          <h3 style={styles.postsTitle}>Latest Posts</h3>
          <div style={styles.postsList}>
            {posts.map(post => (
              <div key={post.id} style={styles.postItem}>
                <h4 style={styles.postTitle}>{post.title}</h4>
                <div style={styles.postMeta}>
                  <span style={styles.postCategory}>{post.category}</span>
                  <Link to={`/blog/post/${post.id}`} style={styles.readMore}>
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
  explanation: {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginBottom: '2rem',
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
  layout: {
    display: 'flex',
    gap: '2rem',
  },
  sidebar: {
    width: '250px',
    flexShrink: 0,
  },
  sidebarTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  categoryLink: {
    display: 'block',
    padding: '0.75rem 1rem',
    backgroundColor: '#f3f4f6',
    color: '#4b5563',
    textDecoration: 'none',
    borderRadius: '0.375rem',
    marginBottom: '0.5rem',
    transition: 'all 0.2s',
  },
  content: {
    flex: 1,
  },
  postsTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  postsList: {
    display: 'grid',
    gap: '1rem',
  },
  postItem: {
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.5rem',
  },
  postTitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  postMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postCategory: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  readMore: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },
};

export default Blog;