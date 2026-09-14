import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge, Card, Container, Grid, Section } from "../styles/GlobalStyle";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import {
  caseStudies,
  caseStudyCategories,
  CaseStudyCategory,
} from "../data/caseStudies";

const Hero = styled(Section)`
  padding-top: 140px;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  margin-bottom: var(--spacing-6);
  background: linear-gradient(
    135deg,
    var(--accent-primary) 0%,
    var(--accent-secondary) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Intro = styled.p`
  max-width: 760px;
  margin: 0 auto var(--spacing-6);
  color: var(--dark-300);
  font-size: var(--text-lg);
  line-height: 1.75;
`;

const Disclosure = styled.p`
  max-width: 760px;
  margin: 0 auto var(--spacing-10);
  color: var(--dark-500);
  font-size: var(--text-sm);
  font-style: italic;
  line-height: 1.65;
`;

const ReportLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3) var(--spacing-6);
  margin-bottom: var(--spacing-12);
  border: 1px solid var(--accent-primary);
  border-radius: var(--radius-md);
  color: var(--accent-primary);
  transition: var(--transition-normal);

  &:hover {
    color: var(--dark-950);
    background: var(--accent-primary);
    transform: translateY(-2px);
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-8);
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  border: 1px solid
    ${({ active }) => (active ? "var(--accent-primary)" : "var(--dark-700)")};
  color: ${({ active }) =>
    active ? "var(--dark-950)" : "var(--dark-300)"};
  background: ${({ active }) =>
    active ? "var(--accent-primary)" : "rgba(30, 41, 59, 0.6)"};

  &:hover {
    border-color: var(--accent-primary);
    color: ${({ active }) =>
      active ? "var(--dark-950)" : "var(--accent-primary)"};
  }
`;

const SearchInput = styled.input`
  display: block;
  width: min(100%, 480px);
  margin: 0 auto var(--spacing-12);
  padding: var(--spacing-4) var(--spacing-5);
  background: var(--dark-900);
  border: 1px solid var(--dark-700);
  border-radius: var(--radius-lg);
  color: var(--dark-100);
`;

const CaseGrid = styled(Grid)`
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-8);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const CaseCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: var(--transition-normal);

  &:hover {
    transform: translateY(-6px);
    border-color: var(--accent-primary);
    box-shadow: var(--shadow-accent);
  }
`;

const Icon = styled.div`
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-5);
  background: linear-gradient(
    135deg,
    rgba(100, 255, 218, 0.15),
    rgba(139, 92, 246, 0.18)
  );
  font-size: var(--text-2xl);
`;

const CardTitle = styled.h2`
  margin: var(--spacing-4) 0;
  font-size: var(--text-2xl);
`;

const Summary = styled.p`
  color: var(--dark-400);
  margin-bottom: var(--spacing-6);
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-6);
`;

const Tag = styled.span`
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-sm);
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: var(--accent-secondary);
  font-size: var(--text-xs);
`;

const ReadLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: var(--accent-primary);
  font-weight: var(--font-semibold);

  &:hover {
    color: var(--dark-100);
  }
`;

const Empty = styled.div`
  text-align: center;
  padding: var(--spacing-16);
  color: var(--dark-400);
`;

const Projects: React.FC = () => {
  const [category, setCategory] = useState<
    "All" | CaseStudyCategory
  >("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return caseStudies.filter((study) => {
      const categoryMatches = category === "All" || study.category === category;
      const searchMatches =
        !normalized ||
        study.title.toLowerCase().includes(normalized) ||
        study.summary.toLowerCase().includes(normalized) ||
        study.tags.some((tag) => tag.toLowerCase().includes(normalized));

      return categoryMatches && searchMatches;
    });
  }, [category, query]);

  return (
    <PageTransition>
      <SEO
        title="Security Case Studies | Vinit Vora"
        description="Detailed anonymized production-security case studies covering API authorization, business logic, sensitive-data exposure, AWS and EKS security."
        keywords="Vinit Vora, application security case studies, API authorization, BOLA, IDOR, TOCTOU, AWS security, EKS security"
        url="https://vinitvora.com/case-studies"
      />

      <Hero>
        <Container>
          <Title
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Security Case Studies
          </Title>
          <Intro>
            Detailed examples of how I approach authorization, business-logic,
            web, API and cloud-security problems—from defining the test
            objective through evidence handling, remediation and retesting.
          </Intro>
          <Disclosure>
            These anonymized case studies are derived from authorized
            professional security work. They are not presented as
            freelance-client engagements. Sensitive identities, systems,
            customer information and exploit-ready details have been removed.
          </Disclosure>
          <ReportLink to="/sample-report">
            View a Sample Pentest Report
          </ReportLink>

          <Controls>
            {caseStudyCategories.map((item) => (
              <FilterButton
                key={item}
                active={category === item}
                onClick={() =>
                  setCategory(item as "All" | CaseStudyCategory)
                }
              >
                {item}
              </FilterButton>
            ))}
          </Controls>

          <SearchInput
            aria-label="Search case studies"
            placeholder="Search by topic or security area"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Container>
      </Hero>

      <Section padding="0 0 96px">
        <Container>
          {filtered.length > 0 ? (
            <CaseGrid>
              {filtered.map((study, index) => (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <CaseCard>
                    <Icon aria-hidden="true">{study.icon}</Icon>
                    <div>
                      <Badge variant="info">{study.category}</Badge>
                      {study.featured && (
                        <Badge
                          variant="success"
                          style={{ marginLeft: "var(--spacing-2)" }}
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle>{study.title}</CardTitle>
                    <Summary>{study.summary}</Summary>
                    <Tags>
                      {study.tags.slice(0, 4).map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </Tags>
                    <ReadLink to={`/case-studies/${study.slug}`}>
                      Read Case Study →
                    </ReadLink>
                  </CaseCard>
                </motion.div>
              ))}
            </CaseGrid>
          ) : (
            <Empty>No matching case studies found.</Empty>
          )}
        </Container>
      </Section>
    </PageTransition>
  );
};

export default Projects;
