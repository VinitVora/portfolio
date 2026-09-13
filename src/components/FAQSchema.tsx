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
          text: 'I offer bounded web application and API security assessments, SaaS web and API assessments, and AWS and EKS security reviews. Each engagement includes actionable reporting and defined retest terms.'
        }
      },
      {
        '@type': 'Question',
        name: 'What does Vinit specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I specialize in manual web and API testing, authorization and business-logic vulnerabilities, AWS and Kubernetes security, and developer-focused remediation support.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is Vinit available for freelance projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Security testing is accepted only with verifiable written authorization and an agreed scope. Use the contact form or email contact@vinitvora.com to discuss an assessment.'
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
