import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section, Grid, Card } from '../styles/GlobalStyle';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import aboutImage from '../assets/images/Aboutme.jpg';
import { StaggerContainer, StaggerItem } from '../components/ScrollReveal';

const AboutHero = styled(Section)`
  padding-top: 140px;
  text-align: center;
  
  @media (max-width: 768px) {
    padding-top: 120px;
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
  }
  
  @media (max-width: 480px) {
    padding-top: 100px;
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  margin-bottom: var(--spacing-6);
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: var(--font-extrabold);
  letter-spacing: -0.025em;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: var(--text-xl);
  color: var(--dark-400);
  max-width: 600px;
  margin: 0 auto var(--spacing-8);
  line-height: 1.7;
`;

const AboutImageSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-16);
`;

const AboutImageContainer = styled.div`
  position: relative;
  width: 450px;
  height: 450px;
  border-radius: var(--radius-xl);
  padding: 2px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin: 0 auto;
  transition: var(--transition-normal);

  &:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-glow);
  }

  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 280px;
  }
`;

const AboutImage = styled.img`
  position: absolute;
  inset: 4px;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  object-fit: cover;
  object-position: top center;
  border-radius: var(--radius-xl);
`;

const TimelineSection = styled(Section)`
  position: relative;
  
  @media (max-width: 768px) {
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
  }
  
  @media (max-width: 480px) {
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: var(--text-4xl);
  text-align: center;
  margin-bottom: var(--spacing-16);
  color: var(--dark-100);
`;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--dark-700);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ index: number }>`
  position: relative;
  margin-bottom: var(--spacing-12);
  display: flex;
  align-items: flex-start;
  justify-content: ${props => props.index % 2 === 0 ? 'flex-start' : 'flex-end'};
  padding-top: 64px;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 80px;
    padding-top: var(--spacing-12);
  }
`;

const TimelineContent = styled(Card)<{ direction: 'left' | 'right' }>`
  width: 45%;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.direction === 'left' ? 'right: -15px;' : 'left: -15px;'}
    width: 0;
    height: 0;
    border: 15px solid transparent;
    ${props => props.direction === 'left' ? 
      'border-left-color: var(--dark-700);' : 
      'border-right-color: var(--dark-700);'
    }

    @media (max-width: 768px) {
      left: -15px;
      border-right-color: var(--dark-700);
      border-left-color: transparent;
    }
  }

  @media (max-width: 768px) {
    width: calc(100% - 60px);
  }
`;

const TimelineDate = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: var(--dark-950);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  border: 1px solid transparent;
  white-space: nowrap;
  z-index: 2;
  box-shadow: var(--shadow-accent);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    left: 10px;
    top: 10px;
    transform: none;
    font-size: var(--text-xs);
    padding: var(--spacing-1) var(--spacing-3);
    border-radius: var(--radius-md);
  }
`;

const TimelineTitle = styled.h3`
  font-size: var(--text-xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-3);
`;

const TimelineDescription = styled.p`
  color: var(--dark-400);
  line-height: 1.6;
  margin-bottom: var(--spacing-3);
`;

const TimelineCategory = styled.span`
  background: rgba(100, 255, 218, 0.1);
  color: var(--accent-primary);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border: 1px solid rgba(100, 255, 218, 0.3);
`;

const SkillsSection = styled(Section)`
  background: rgba(30, 41, 59, 0.3);
  
  @media (max-width: 768px) {
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
  }
  
  @media (max-width: 480px) {
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
  }
`;

const SkillsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-8);
`;

const SkillCard = styled(Card)`
  text-align: center;
`;

const SkillName = styled.h3`
  font-size: var(--text-lg);
  color: var(--dark-100);
  margin-bottom: var(--spacing-4);
`;

const SkillDescription = styled.p`
  color: var(--dark-400);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-6);
`;

const ServicesSection = styled(Section)`
  @media (max-width: 768px) {
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
  }
  
  @media (max-width: 480px) {
    padding-left: var(--spacing-3);
    padding-right: var(--spacing-3);
  }
`;

const ServicesGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`;

const ServiceCard = styled(Card)`
  text-align: center;
  transition: var(--transition-normal);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 450px;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--accent-primary);
    box-shadow: 0 20px 40px rgba(100, 255, 218, 0.1);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--secondary-500) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-3xl);
  margin: 0 auto var(--spacing-6);
  color: var(--dark-900);
`;

const ServiceTitle = styled.h3`
  font-size: var(--text-xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-4);
`;

const ServiceDescription = styled.p`
  color: var(--dark-400);
  line-height: 1.6;
  margin-bottom: var(--spacing-4);
  min-height: 50px;
`;

const ServiceFeatures = styled.ul`
  text-align: left;
  list-style: none;
  padding: 0;
  flex: 1;
  
  li {
    color: var(--dark-400);
    margin-bottom: var(--spacing-3);
    position: relative;
    padding-left: var(--spacing-6);
    line-height: 1.5;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--accent-primary);
      font-weight: bold;
    }
  }
`;

// Data
const timelineData = [
  {
    year: 'Nov 2024 - Present',
    title: 'Application security in production',
    description: 'Progressed from a cybersecurity internship into a full-time security engineering role, with work spanning web and API testing, AWS and EKS reviews, security automation, incident response, and developer remediation support.',
    category: 'Professional Experience'
  },
  {
    year: 'May 2024 - Jul 2024',
    title: 'Cybersecurity internship',
    description: 'Practical security testing and analysis experience supporting the transition from laboratory work to professional security engineering.',
    category: 'Internships'
  },
  {
    year: '2021 - 2025',
    title: 'Bachelor’s degree in cybersecurity',
    description: 'Built foundations in networking, application security, secure development, vulnerability analysis, and system defense.',
    category: 'Education'
  }
];

const skillsData = [
  { name: 'Web Application Security', description: 'Manual testing of authentication, sessions, access control, input handling, configuration, and business logic.' },
  { name: 'API Security', description: 'Authorization, BOLA/IDOR, object ownership, mass assignment, replay, rate limits, and workflow abuse.' },
  { name: 'AWS & EKS Security', description: 'Bounded reviews of IAM, RBAC, workload permissions, exposure, logging, secrets, and monitoring gaps.' },
  { name: 'Secure Code Review', description: 'Targeted review of security-critical code paths with developer-ready remediation guidance.' },
  { name: 'DevSecOps Security', description: 'Practical CI/CD controls, security automation, custom checks, and findings triage.' },
  { name: 'Reporting & Retesting', description: 'Clear technical evidence, executive context, prioritization, remediation discussion, and defined verification.' }
];

const servicesData = [
  {
    icon: '🛡️',
    title: 'API Authorization & Business-Logic Review',
    description: 'Manual testing focused on access boundaries and abuse paths that scanners commonly miss.',
    features: [
      'Authentication and authorization flows',
      'BOLA/IDOR and object ownership',
      'Workflow manipulation and replay',
      'Actionable report and defined retest'
    ]
  },
  {
    icon: '☁️',
    title: 'Web Application Penetration Test',
    description: 'A bounded manual assessment of a web application and its agreed attack surface.',
    features: [
      'Authentication and session security',
      'Access control and input handling',
      'Business-logic validation',
      'Technical findings and remediation guidance'
    ]
  },
  {
    icon: '🔍',
    title: 'SaaS Web & API Security Assessment',
    description: 'Combined application and API coverage for a clearly limited SaaS scope.',
    features: [
      'Manual web and API testing',
      'Authorization and business logic',
      'Executive and technical reporting',
      'Remediation meeting and one defined retest'
    ]
  }
];

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PageTransition>
      <SEO
        title="About Vinit Vora | Application Security Engineer"
        description="Production application security experience across manual web and API testing, AWS and EKS reviews, security automation, incident response, remediation support, and retesting."
        keywords="Vinit Vora, Application Security Engineer, API Security, Web Penetration Testing, AWS Security, EKS Security, DevSecOps, Remediation"
        image="https://vinitvora.com/vinit-vora-home.jpg"
        url="https://vinitvora.com/about"
      />
      {/* Hero Section */}
      <AboutHero>
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle variants={itemVariants}>
              About Me
            </HeroTitle>
            <HeroSubtitle variants={itemVariants}>
            I’m Vinit Vora, an application security engineer in Mumbai. My work focuses on manual web and API testing, authorization and business-logic flaws, AWS and EKS security, and helping developers verify effective fixes.
            </HeroSubtitle>
            
            <AboutImageSection variants={itemVariants}>
              <AboutImageContainer>
                <AboutImage 
                  src={aboutImage} 
                  alt="About Vinit Vora" 
                />
              </AboutImageContainer>
            </AboutImageSection>
          </motion.div>
        </Container>
      </AboutHero>

      {/* Timeline Section */}
      <TimelineSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            My Journey
          </SectionTitle>
          
          <TimelineContainer>
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                index={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TimelineContent 
                  direction={index % 2 === 0 ? 'right' : 'left'}
                  hover
                >
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.description}</TimelineDescription>
                  <TimelineCategory>{item.category}</TimelineCategory>
                </TimelineContent>
                <TimelineDate>{item.year}</TimelineDate>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </Container>
      </TimelineSection>

      {/* Skills Section */}
      <SkillsSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </SectionTitle>
          
          <SkillsGrid>
            {skillsData.map((skill, index) => (
              <SkillCard
                key={skill.name}
                as={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                hover
              >
                <SkillName>{skill.name}</SkillName>
                <SkillDescription>{skill.description}</SkillDescription>
              </SkillCard>
            ))}
          </SkillsGrid>
        </Container>
      </SkillsSection>

      {/* Services Section */}
      <ServicesSection>
        <Container>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Services Offered
          </SectionTitle>
          
          <StaggerContainer staggerDelay={0.15}>
            <ServicesGrid>
              {servicesData.map((service, index) => (
                <StaggerItem key={service.title} variant="scaleUp">
                  <ServiceCard
                    as={motion.div}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ServiceIcon>{service.icon}</ServiceIcon>
                    </motion.div>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                    <ServiceFeatures>
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ServiceFeatures>
                  </ServiceCard>
                </StaggerItem>
              ))}
            </ServicesGrid>
          </StaggerContainer>
        </Container>
      </ServicesSection>
    </PageTransition>
  );
};

export default About;
