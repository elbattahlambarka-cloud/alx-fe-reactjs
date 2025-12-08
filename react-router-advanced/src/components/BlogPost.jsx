// src/components/BlogPost.jsx
import { useParams, Link } from 'react-router-dom';

const posts = {
  '1': {
    title: 'Getting Started with React Router',
    content: 'React Router is a powerful routing library for React applications. It enables you to build single-page applications with navigation without the page refreshing as the user navigates.',
    author: 'John Doe',
    date: 'Jan 15, 2024',
    category: 'tech',
  },
  '2': {
    title: 'Modern Web Design Patterns',
    content: 'Modern web design focuses on user experience, accessibility, and performance. Key patterns include responsive design, progressive enhancement, and component-based architectures.',
    author: 'Jane Smith',
    date: 'Feb 1, 2024',
    category: 'design',
  },
  '3': {
    title: 'Building Scalable Applications',
    content: 'Scalability is crucial for modern applications. This involves designing systems that can handle growth in users, data volume, and transaction frequency while maintaining performance.',
    author: 'Alex Johnson',
    date: 'Mar 10, 2024',
    category: 'tech',
  },
  '4': {
    title: 'Advanced React Patterns',
    content: 'Learn advanced React patterns including render props, higher-order components, and custom hooks for building reusable and maintainable components.',
    author: 'Sarah Wilson',
    date: 'Apr 5, 2024',
    category: 'tech',
  },
  '5': {
    title: 'State Management in 2024',
    content: 'Exploring modern state management solutions including Context API, Zustand, and Redux Toolkit for different use cases.',
    author: 'Mike Brown',
    date: 'May 20, 2024',
    category: 'tech',
  },
};

function BlogPost() {
  // This uses the :id parameter from the route "/blog/:id"
  const { id } = useParams();
  const post = posts[id];

  if (!post) {
    return (
      <div style={styles.notFound}>
        <h2>Blog Post Not Found</h2>
        <p>No blog post found with ID: {id}</p>
        <p>This demonstrates dynamic routing with the "/blog/:id" pattern.</p>
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
          
          <div style={styles.dynamicRoutingInfo}>
            <h3>Dynamic Routing Demonstration</h3>
            <p>
              This page uses dynamic routing with the pattern <code>/blog/:id</code>.
              The ID parameter extracted from the URL is: <strong>{id}</strong>
            </p>
            <p>
              Try changing the URL to:
            </p>
            <ul>
              <li><code>/blog/1</code> - Post about React Router</li>
              <li><code>/blog/2</code> - Post about Web Design</li>
              <li><code>/blog/3</code> - Post about Scalability</li>
              <li><code>/blog/999</code> - Non-existent post (shows 404)</li>
            </ul>
          </div>
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
  dynamicRoutingInfo: {
    backgroundColor: '#f0f9ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    marginTop: '2rem',
    border: '1px solid #bae6fd',
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
  backLink: {
    display: 'inline-block',
    marginTop: '1rem',
    color: '#3b82f6',
    textDecoration: 'none',
    backgroundColor: '#eff6ff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
  },
};

export default BlogPost;