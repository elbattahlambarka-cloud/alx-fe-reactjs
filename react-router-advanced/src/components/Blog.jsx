// src/components/Blog.jsx
import { Link } from 'react-router-dom';

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
        Dynamic routing demonstration with URL parameters
      </p>
      
      <div style={styles.explanation}>
        <h3 style={styles.explanationTitle}>Dynamic Routing with "/blog/:id" Pattern:</h3>
        <p style={styles.explanationText}>
          This section demonstrates dynamic routing using the <code>/blog/:id</code> pattern.
          Click on any post below to navigate to a dynamic route where the ID is extracted from the URL.
          The same <code>BlogPost</code> component handles all posts, displaying different content based on the ID parameter.
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
          <h3 style={styles.postsTitle}>Latest Posts (Dynamic Routes)</h3>
          <p style={styles.postsSubtitle}>
            Each post links to a dynamic route using the <code>/blog/:id</code> pattern
          </p>
          <div style={styles.postsList}>
            {posts.map(post => (
              <div key={post.id} style={styles.postItem}>
                <h4 style={styles.postTitle}>{post.title}</h4>
                <div style={styles.postMeta}>
                  <span style={styles.postCategory}>{post.category}</span>
                  {/* This link uses the /blog/:id pattern */}
                  <Link to={`/blog/${post.id}`} style={styles.readMore}>
                    Read Post (ID: {post.id}) →
                  </Link>
                </div>
                <p style={styles.postDescription}>
                  This post uses the dynamic route: <code>/blog/{post.id}</code>
                </p>
              </div>
            ))}
          </div>
          
          <div style={styles.testInstructions}>
            <h4>Test Dynamic Routing:</h4>
            <p>Try navigating to these URLs manually:</p>
            <ul style={styles.urlList}>
              <li><code>/blog/1</code> - First blog post</li>
              <li><code>/blog/2</code> - Second blog post</li>
              <li><code>/blog/3</code> - Third blog post</li>
              <li><code>/blog/999</code> - Non-existent post (shows error)</li>
            </ul>
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
    border: '1px solid #bae6fd',
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
    marginBottom: '0.5rem',
  },
  postsSubtitle: {
    color: '#6b7280',
    marginBottom: '1.5rem',
    fontSize: '0.875rem',
  },
  postsList: {
    display: 'grid',
    gap: '1rem',
    marginBottom: '2rem',
  },
  postItem: {
    padding: '1.5rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
  },
  postTitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '0.75rem',
  },
  postMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
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
    fontWeight: '500',
  },
  postDescription: {
    color: '#6b7280',
    fontSize: '0.875rem',
    fontStyle: 'italic',
    marginTop: '0.5rem',
  },
  testInstructions: {
    backgroundColor: '#fef3c7',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #fde68a',
  },
  urlList: {
    color: '#92400e',
    marginTop: '0.5rem',
    paddingLeft: '1.5rem',
  },
};

export default Blog;