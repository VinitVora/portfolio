import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundWrapper = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top left, #0a0a0f, #000);
  color: var(--light-100);
  text-align: center;
  padding: var(--spacing-6);

  h1 {
    font-size: 6rem;
    font-weight: 700;
    color: var(--accent-color, #00e0ff);
    margin-bottom: var(--spacing-3);
  }

  h2 {
    font-size: 1.5rem;
    color: var(--dark-100);
    margin-bottom: var(--spacing-5);
  }

  p {
    color: var(--dark-200);
    margin-bottom: var(--spacing-8); /* ⬅️ Increased spacing before button */
  }

  a {
    display: inline-block;
    padding: var(--spacing-3) var(--spacing-6);
    border: 1px solid var(--accent-color, #00e0ff);
    border-radius: var(--radius-lg);
    color: var(--accent-color, #00e0ff);
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      background: var(--accent-color, #00e0ff);
      color: #000;
    }
  }
`;

const NotFound = () => {
  return (
    <NotFoundWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1>404</h1>
      <h2>Oops! You seem to have lost your way</h2>
      <p>We couldn’t find the page you’re looking for.</p>
      <Link to="/">Go Back To Home</Link>
    </NotFoundWrapper>
  );
};

export default NotFound;