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
  title = 'Vinit Vora - Security Engineer & VAPT Consultant | Cybersecurity & Cloud Security Specialist',
  description = 'Vinit Vora is a Security Engineer and VAPT Consultant from Mumbai, India. He helps businesses secure their web applications, APIs, and cloud infrastructure through vulnerability assessments, penetration testing, and automated security solutions. Expertise in AWS Security, Kubernetes, ELK, and DevSecOps.',
  keywords = 'Vinit Vora, Security Engineer, VAPT Consultant, Penetration Testing, Vulnerability Assessment, Application Security, API Security, Cloud Security, DevSecOps, Cybersecurity Consultant, AWS Security, Kubernetes Security, Web App Pentesting, Hire Security Consultant India',
  image = 'https://vinitvora.com/vinit-vora-home.jpg',
  url = 'https://vinitvora.com',
  type = 'website'
}) => {
  const siteName = 'Vinit Vora | Security Engineer & VAPT Consultant';
  const twitterHandle = '@vinitvora'; // optional if you make a Twitter/X profile

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
      <meta property="twitter:creator" content={twitterHandle} />

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
          jobTitle: 'Security Engineer & VAPT Consultant',
          worksFor: {
            '@type': 'Organization',
            name: 'UniAcco'
          },
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

      {/* Structured Data (JSON-LD) - Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': 'https://vinitvora.com/#organization',
          name: 'Vinit Vora Security Consultancy',
          alternateName: 'VinitVora.com',
          url: 'https://vinitvora.com/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://vinitvora.com/logo512.png',
            width: 512,
            height: 512
          },
          description:
            'Independent cybersecurity consultancy by Vinit Vora offering VAPT, web app security audits, and cloud infrastructure assessments for businesses of all sizes.',
          foundingDate: '2025',
          founder: {
            '@type': 'Person',
            name: 'Vinit Vora'
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Mumbai',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'contact@vinitvora.com',
            contactType: 'Security Consulting',
            availableLanguage: ['English', 'Hindi']
          },
          sameAs: [
            'https://github.com/VinitVora',
            'https://www.linkedin.com/in/VinitVora28/'
          ],
          areaServed: {
            '@type': 'Place',
            name: 'Worldwide'
          },
          serviceType: [
            'Vulnerability Assessment',
            'Penetration Testing (VAPT)',
            'Web Application Security',
            'API Security Testing',
            'Cloud Security Review',
            'Kubernetes Security Audit',
            'DevSecOps Integration'
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;