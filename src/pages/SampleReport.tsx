import React from "react";
import styled from "styled-components";
import { Container, Section, Card, Badge, Button } from "../styles/GlobalStyle";
import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";

const Hero = styled(Section)`
  padding-top: 140px;
  text-align: center;
`;

const Kicker = styled.p`
  color: var(--accent-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--spacing-3);
`;

const Lead = styled.p`
  max-width: 760px;
  margin: 0 auto;
  color: var(--dark-300);
`;

const DownloadAction = styled.div`
  margin-top: var(--spacing-6);
`;

const Notice = styled(Card)`
  border-color: rgba(245, 158, 11, 0.5);
  background: rgba(245, 158, 11, 0.08);
  margin-bottom: var(--spacing-8);
`;

const Report = styled.article`
  max-width: 920px;
  margin: 0 auto;
`;

const ReportSection = styled.section`
  margin-bottom: var(--spacing-10);

  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--text-2xl);
  }

  h3 {
    margin-bottom: var(--spacing-2);
    font-size: var(--text-xl);
  }

  p, li {
    color: var(--dark-300);
  }

  ul {
    padding-left: var(--spacing-6);
  }

  li + li {
    margin-top: var(--spacing-2);
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-4);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const MetaItem = styled(Card)`
  padding: var(--spacing-5);

  strong {
    color: var(--dark-100);
    display: block;
    margin-bottom: var(--spacing-1);
  }

  span {
    color: var(--dark-400);
  }
`;

const Finding = styled(Card)`
  margin-bottom: var(--spacing-5);
  border-left: 4px solid var(--accent-tertiary);

  h3 {
    margin-top: var(--spacing-3);
  }
`;

const SampleReport: React.FC = () => (
  <PageTransition>
    <SEO
      title="Sample Penetration Test Report | Vinit Vora"
      description="A fictional, sanitized example of the structure and level of detail used in a web application and API penetration-test report."
      keywords="sample penetration test report, API security report, web application security assessment"
      url="https://vinitvora.com/sample-report"
    />
    <Hero>
      <Container>
        <Kicker>Sample deliverable</Kicker>
        <h1>Sanitized Penetration-Test Report</h1>
        <Lead>
          A fictional example showing the structure, evidence standard, risk
          framing, and remediation guidance a client can expect from a focused
          web application and API (application programming interface) security assessment.
        </Lead>
        <DownloadAction>
          <Button
            as="a"
            href="/reports/Sample_Penetration_Test_Report.pdf"
            download
            variant="primary"
          >
            Download a Sample Pentest Report
          </Button>
        </DownloadAction>
      </Container>
    </Hero>

    <Section padding="0 0 80px">
      <Container>
        <Report>
          <Notice>
            <strong>Important:</strong> This is a fictional demonstration, not a
            client report and not a reproduction of a production finding. The
            downloadable PDF uses fictional names, reserved example domains,
            synthetic evidence, and redacted values throughout.
          </Notice>

          <ReportSection>
            <h2>Executive summary</h2>
            <p>
              The assessed fictional SaaS application showed a sound baseline
              in several areas, but the review identified an authorization gap
              that could allow one authenticated user to access another user's
              record under certain conditions. The report prioritizes practical
              remediation, clear ownership, and a defined retest rather than a
              scanner dump.
            </p>
          </ReportSection>

          <ReportSection>
            <h2>Engagement at a glance</h2>
            <MetaGrid>
              <MetaItem><strong>Assessment type</strong><span>Web application and API security review</span></MetaItem>
              <MetaItem><strong>Testing model</strong><span>Authorized, scoped, manual validation</span></MetaItem>
              <MetaItem><strong>Environment</strong><span>Client-approved test environment</span></MetaItem>
              <MetaItem><strong>Deliverables</strong><span>Executive summary, technical findings, remediation guidance, retest</span></MetaItem>
            </MetaGrid>
          </ReportSection>

          <ReportSection>
            <h2>Scope and methodology</h2>
            <ul>
              <li>Review authentication, session handling, authorization, input handling, and selected workflows within the agreed scope.</li>
              <li>Manually test object ownership, privilege boundaries, workflow state changes, and rate-limit behavior using client-provided test accounts.</li>
              <li>Validate findings safely, capture only the minimum evidence required, and avoid retaining client data.</li>
              <li>Map each confirmed issue to a clear remediation recommendation and retest condition.</li>
            </ul>
          </ReportSection>

          <ReportSection>
            <h2>Illustrative finding format</h2>
            <Finding>
              <Badge variant="warning">High</Badge>
              <h3>Missing object-ownership validation</h3>
              <p><strong>Risk:</strong> An authenticated user may be able to retrieve or change a record outside their permitted ownership boundary.</p>
              <p><strong>Validation:</strong> The finding would include a minimal, redacted request/response pair and a concise explanation of the affected authorization decision. No customer data or reusable exploit material would be included.</p>
              <p><strong>Recommendation:</strong> Enforce server-side ownership checks at a centralized authorization layer; add negative tests for cross-account access; retest the corrected flow with separate test accounts.</p>
            </Finding>
            <Finding>
              <Badge variant="info">Medium</Badge>
              <h3>Insufficient abuse controls on a sensitive workflow</h3>
              <p><strong>Risk:</strong> Repeated requests may permit workflow abuse or operational strain where limits are absent or inconsistent.</p>
              <p><strong>Recommendation:</strong> Apply endpoint-appropriate rate limits, preserve audit visibility, and define alert thresholds that distinguish normal use from sustained abuse.</p>
            </Finding>
          </ReportSection>

          <ReportSection>
            <h2>Remediation and retest</h2>
            <p>
              A final delivery includes remediation priorities, ownership
              suggestions, and a narrow retest of agreed findings after fixes
              are available. A retest verifies whether the reported weakness is
              resolved; it is not a second full assessment.
            </p>
          </ReportSection>

          <Card>
            <h2>What a real client receives</h2>
            <ul>
              <li>Executive summary for technical and non-technical stakeholders.</li>
              <li>Confirmed findings with severity rationale and minimal evidence.</li>
              <li>Developer-ready remediation guidance and validation notes.</li>
              <li>Defined retest results and final status.</li>
            </ul>
            <div style={{ marginTop: "var(--spacing-6)" }}>
              <Button
                as="a"
                href="/reports/Sample_Penetration_Test_Report.pdf"
                download
                variant="secondary"
                style={{ marginRight: "var(--spacing-3)" }}
              >
                Download a Sample Pentest Report
              </Button>
              <Button as="a" href="/contact" variant="primary">Request a Security Assessment</Button>
            </div>
          </Card>
        </Report>
      </Container>
    </Section>
  </PageTransition>
);

export default SampleReport;
