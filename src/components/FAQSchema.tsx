import React from 'react';
import { Helmet } from 'react-helmet-async';

const FAQSchema: React.FC = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does Vinit Vora offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I offer VAPT, Cloud Security Audit, UI/UX design, Secure Code Review & CI/CD Security, DevSecOps Implementaion, and Security Reporting & Consultancy'
        }
      },
      {
        '@type': 'Question',
        name: 'What does Vinit specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I specialize in API Testing, Network Security Testing, DevSecOps Implementation and Cloud Security testing.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Vinit available for freelance projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, I am currently available for freelance projects. You can contact me through the contact form on my portfolio website or email me at contact@vinitvora.com'
        }
      },
      {
        '@type': 'Question',
        name: 'Where is Vinit Vora located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I am based in Mumbai, Maharashtra, India (IST timezone - UTC +5:30). I work remotely and collaborate with clients worldwide.'
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default FAQSchema;
