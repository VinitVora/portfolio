import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Vinit Vora | Application Security Engineer',
  description = 'Application security engineer specializing in manual web and API penetration testing, authorization and business-logic testing, AWS and Kubernetes security, remediation guidance, and retesting.',
  keywords = 'Vinit Vora, Application Security Engineer, Web Penetration Testing, API Security Testing, Authorization Testing, BOLA, IDOR, Business Logic Security, AWS Security, Kubernetes Security, EKS Security',
  image = 'https://vinitvora.com/vinit-vora-home.jpg',
  url = 'https://vinitvora.com',
  type = 'website'
}) => {
  const siteName = 'Vinit Vora | Application Security Engineer';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Vinit Vora" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#00ffcc" />

      {/* Structured Data (JSON-LD) - Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Vinit Vora',
          alternateName: 'Vinit Jayesh Vora',
          url: 'https://vinitvora.com',
          image: 'https://vinitvora.com/vinit-vora-home.jpg',
          sameAs: [
            'https://github.com/VinitVora',
            'https://www.linkedin.com/in/VinitVora28/'
          ],
          jobTitle: 'Application Security Engineer',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'India'
          },
          email: 'contact@vinitvora.com',
          knowsAbout: [
            'Application Security',
            'Vulnerability Assessment',
            'Penetration Testing',
            'Cloud Security',
            'AWS Security',
            'Kubernetes Security',
            'DevSecOps',
            'Threat Detection',
            'Security Automation'
          ]
        })}
      </script>

    </Helmet>
  );
};

export default SEO;
