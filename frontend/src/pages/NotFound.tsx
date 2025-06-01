import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Error Icon */}
        <div className="error-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="error-number">404</h1>
        
        <h2 className="error-title">
          Oops! Page Not Found
        </h2>
        
        <p className="error-description">
          The page you're looking for might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div>
          <Link to="/" className="home-button">
            Back to Home
          </Link>
          
          <div className="support-link">
            <p>
              Need help?{' '}
              <Link to="/contact">
                Contact Support
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Dots */}
        <div className="decorative-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 