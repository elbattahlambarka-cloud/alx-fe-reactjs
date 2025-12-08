// src/components/BlogPost.jsx
import { useParams, Link } from 'react-router-dom';

const posts = {
  1: {
    title: 'Getting Started with React Router',
    content: 'React Router is a powerful routing library for React applications. It enables you to build single-page applications with navigation without the page refreshing as the user navigates.',
    author: 'John Doe',
    date: 'Jan 15, 2024',
    category: 'tech',
  },
  2: {
    title: 'Modern Web Design Patterns',
    content: 'Modern web design focuses on user experience, accessibility, and performance. Key patterns include responsive design, progressive enhancement, and component-based architectures.',
    author: 'Jane Smith',
    date: 'Feb 1, 2024',
    category: 'design',
  },
  3: {
    title: 'Building Scalable Applications',
    content: 'Scalability is crucial for modern applications. This involves designing systems that can handle growth in users, data volume, and transaction frequency while maintaining performance.',
    author: 'Alex Johnson',
    date: 'Mar 10, 2024',
    category: 'tech',
  },
};

function BlogPost() {
  const { postId } = useParams();
  const post = posts[postId];

  if (!post) {
    return (
      <div style={styles.notFound}>
        <h2>Post Not Found</h2>
        <p>The requested blog post does not exist.</p>
        <Link to="/blog" style={styles.backLink}>
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.header}>
        <Link to="/blog" style={styles.backButton}>
          ← Back to Blog
        </Link>
        <span style={styles.category}>{post.category}</span>
      </div>
      
      <article style={styles.article}>
        <h1 style={styles.title}>{post.title}</h1>
        
        <div style={styles.meta}>
          <span style={styles.author}>By {post.author}</span>
          <span style={styles.date}>{post.date}</span>
        </div>
        
        <div style={styles.content}>
          <p>{post.content}</p>
          <p>This is a dynamic route with parameter <code>:postId</code>. The post ID <strong>{postId}</strong> was extracted from the URL.</p>
        </div>
      </article>
      
      <div style={styles.navigation}>
        <Link to={`/blog/category/${post.category}`} style={styles.navLink}>
          View more {post.category} posts
        </Link>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
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
  article: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    color: '#6b7280',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e5e7eb',
  },
  author: {
    fontWeight: '500',
  },
  date: {
    opacity: 0.8,
  },
  content: {
    lineHeight: '1.8',
    color: '#4b5563',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'center',
  },
  navLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#eff6ff',
    borderRadius: '0.5rem',
  },
  notFound: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
};

export default BlogPost;