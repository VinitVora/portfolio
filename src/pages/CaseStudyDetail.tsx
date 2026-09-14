import React from "react";
import styled from "styled-components";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge, Button, Card, Container, Section } from "../styles/GlobalStyle";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import { getCaseStudy } from "../data/caseStudies";

const Hero = styled(Section)`
  padding-top: 140px;
  padding-bottom: var(--spacing-12);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  margin-bottom: var(--spacing-8);
  color: var(--dark-400);

  &:hover {
    color: var(--accent-primary);
  }
`;

const Header = styled.div`
  max-width: 900px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.3rem, 6vw, 4rem);
  line-height: 1.08;
  margin: var(--spacing-4) 0 var(--spacing-6);
  background: linear-gradient(
    135deg,
    var(--dark-50) 0%,
    var(--accent-primary) 55%,
    var(--accent-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Summary = styled.p`
  max-width: 780px;
  font-size: var(--text-xl);
  color: var(--dark-300);
`;

const Disclosure = styled(Card)`
  max-width: 900px;
  margin-top: var(--spacing-8);
  padding: var(--spacing-5);
  border-color: rgba(245, 158, 11, 0.45);
  background: rgba(245, 158, 11, 0.07);
  color: var(--dark-300);
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: var(--spacing-12);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Article = styled.article`
  min-width: 0;
`;

const ContentSection = styled.section`
  margin-bottom: var(--spacing-12);

  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--text-2xl);
    color: var(--dark-100);
  }

  p {
    margin-bottom: var(--spacing-4);
    color: var(--dark-300);
    line-height: 1.8;
  }

  ul {
    padding-left: var(--spacing-6);
    color: var(--dark-300);
  }

  li {
    margin-bottom: var(--spacing-3);
    line-height: 1.7;
  }

  li::marker {
    color: var(--accent-primary);
  }
`;

const Takeaway = styled(Card)`
  border-left: 4px solid var(--accent-primary);

  p:last-child {
    margin-bottom: 0;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 110px;

  @media (max-width: 900px) {
    position: static;
  }
`;

const SidebarCard = styled(Card)`
  padding: var(--spacing-6);

  h2 {
    font-size: var(--text-lg);
    margin-bottom: var(--spacing-4);
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
`;

const Tag = styled.span`
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(139, 92, 246, 0.35);
  background: rgba(139, 92, 246, 0.1);
  color: var(--accent-secondary);
  font-size: var(--text-xs);
`;

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <PageTransition>
      <SEO
        title={`${study.title} | Vinit Vora`}
        description={study.summary}
        keywords={`Vinit Vora, ${study.tags.join(", ")}, security case study`}
        url={`https://vinitvora.com/case-studies/${study.slug}`}
      />

      <Hero>
        <Container>
          <BackLink to="/case-studies">← All case studies</BackLink>
          <Header>
            <Badge variant="info">{study.category}</Badge>
            <Title
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {study.title}
            </Title>
            <Summary>{study.summary}</Summary>
          </Header>
          <Disclosure>
            <strong>Disclosure:</strong> This anonymized case study is derived
            from authorized professional security work. It is not presented as
            a freelance-client engagement. Employer identities, systems,
            endpoints, customer information, infrastructure identifiers,
            screenshots and exploit-ready details have been removed.
          </Disclosure>
        </Container>
      </Hero>

      <Section padding="20px 0 96px">
        <Container>
          <Layout>
            <Article>
              <ContentSection>
                <h2>Overview</h2>
                {study.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </ContentSection>

              <ContentSection>
                <h2>Assessment objective</h2>
                <p>{study.objective.intro}</p>
                <ul>
                  {study.objective.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ContentSection>

              <ContentSection>
                <h2>Scope and constraints</h2>
                <p>{study.scope.intro}</p>
                <ul>
                  {study.scope.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ContentSection>

              <ContentSection>
                <h2>Manual assessment approach</h2>
                <p>{study.approach.intro}</p>
                <ul>
                  {study.approach.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ContentSection>

              <ContentSection>
                <h2>Confirmed weakness</h2>
                {study.finding.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </ContentSection>

              <ContentSection>
                <h2>Business risk</h2>
                <p>{study.risk.intro}</p>
                <ul>
                  {study.risk.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ContentSection>

              <ContentSection>
                <h2>Evidence handling</h2>
                {study.evidence.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </ContentSection>

              <ContentSection>
                <h2>Remediation guidance</h2>
                <p>{study.remediation.intro}</p>
                <ul>
                  {study.remediation.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ContentSection>

              <ContentSection>
                <h2>Retest criteria</h2>
                <p>{study.retest.intro}</p>
                <ul>
                  {study.retest.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </ContentSection>

              <ContentSection>
                <Takeaway>
                  <h2>Key takeaway</h2>
                  {study.takeaway.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Takeaway>
              </ContentSection>
            </Article>

            <Sidebar>
              <SidebarCard>
                <h2>Assessment themes</h2>
                <Tags>
                  {study.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Tags>
                <Button as="a" href="/contact" variant="primary" style={{ width: "100%" }}>
                  Request an Assessment
                </Button>
              </SidebarCard>
            </Sidebar>
          </Layout>
        </Container>
      </Section>
    </PageTransition>
  );
};

export default CaseStudyDetail;
