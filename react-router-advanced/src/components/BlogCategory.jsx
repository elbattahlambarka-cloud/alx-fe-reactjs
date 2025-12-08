// src/components/BlogCategory.jsx
import { useParams, Link } from 'react-router-dom';

const postsByCategory = {
  tech: [
    { id: 1, title: 'Getting Started with React Router' },
    { id: 3, title: 'Building Scalable Applications' },
    { id: 6, title: 'Advanced State Management' },
  ],
  design: [
    { id: 2, title: 'Modern Web Design Patterns' },
    { id: 5, title: 'UI/UX Best Practices' },
  ],
  business: [
    { id: 4, title: 'Startup Funding Strategies' },
    { id: 7, title: 'Market Analysis Techniques' },
  ],
};

function BlogCategory() {
  const { categoryId } = useParams();
  const posts = postsByCategory[categoryId] || [];

  return (
    <div>
      <h2 style={styles.title}>
        {categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1)} Posts
      </h2>
      
      {posts.length > 0 ? (
        <div style={styles.postsList}>
          {posts.map(post => (
            <div key={post.id} style={styles.postItem}>
              <h3 style={styles.postTitle}>{post.title}</h3>
              <div style={styles.postActions}>
                <Link to={`/blog/post/${post.id}`} style={styles.readLink}>
                  Read Full Article
                </Link>
                <Link to="/blog" style={styles.backLink}>
                  ← Back to Blog
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noPosts}>No posts found in this category.</p>
      )}
      
      <p style={styles.note}>
        This component uses dynamic routing with the <code>:categoryId</code> parameter.
        The category ID is extracted from the URL using <code>useParams()</code>.
      </p>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  postsList: {
    display: 'grid',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  postItem: {
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.5rem',
    border: '1px solid #e5e7eb',
  },
  postTitle: {
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  postActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
  },
  backLink: {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },
  noPosts: {
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: '1.5rem',
  },
  note: {
    backgroundColor: '#fef3c7',
    padding: '1rem',
    borderRadius: '0.5rem',
    color: '#92400e',
    fontSize: '0.875rem',
  },
};

export default BlogCategory;