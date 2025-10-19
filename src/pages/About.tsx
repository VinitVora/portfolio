import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
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
  align-items: center;
  justify-content: ${props => props.index % 2 === 0 ? 'flex-start' : 'flex-end'};

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 80px;
    padding-top: var(--spacing-8);
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
  top: 15px;
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

const SkillProgressContainer = styled.div`
  position: relative;
  background: var(--dark-800);
  border-radius: var(--radius-sm);
  height: 10px;
  margin-bottom: var(--spacing-4);
  overflow: hidden;
  border: 1px solid var(--dark-700);
`;

const SkillProgressBar = styled(motion.div)<{ percentage: number }>`
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  border-radius: var(--radius-sm);
  position: relative;
  box-shadow: inset 0 1px 2px rgba(100, 255, 218, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 30px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
    animation: shimmer 3s ease-in-out infinite;
    border-radius: var(--radius-sm);
  }

  @keyframes shimmer {
    0% { transform: translateX(-150%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateX(150%); opacity: 0; }
  }
`;

const SkillPercentage = styled.div`
  text-align: right;
  color: var(--accent-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
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
    year: '2024 - Present',
    title: 'Hands-on industry experience, and the journey continues.',
    description: 'I worked in cybersecurity, where I conducted vulnerability assessments, strengthened infrastructure defenses, and learned how real-world systems respond under attack.',
    category: 'Work Experience'
  },
  {
    year: '2023 - 2024',
    title: 'Security internships, sharpening the craft.',
    description: 'During my internships, I performed real-world penetration testing, analyzed vulnerabilities across live systems, and built the discipline to think like both attacker and defender.',
    category: 'Internships'
  },
  {
    year: '2020 - 2025',
    title: 'Pursuing my degree, the foundation behind it all.',
    description: 'With a degree in Cybersecurity and a strong base in practical networking skills, I began diving deep into ethical hacking, vulnerability analysis, and system defense fundamentals.',
    category: 'Education'
  },
  {
    year: '2018',
    title: 'Started my journey, this is where it begins.',
    description: 'Every journey starts somewhere — I began mine by experimenting with vulnerable labs, breaking insecure code, and understanding the mindset of attackers.',
    category: 'Career Beginning'
  }
];

const skillsData = [
  { name: 'Web Application Security', percentage: 92, description: 'Manual and automated VAPT testing' },
  { name: 'Network & API Testing', percentage: 88, description: 'Scanning and exploiting endpoints safely' },
  { name: 'Burp Suite Pro', percentage: 90, description: 'Advanced interception and fuzzing workflows' },
  { name: 'OWASP ZAP', percentage: 85, description: 'Automated scanning and spidering' },
  { name: 'Python & Scripting', percentage: 90, description: 'Automation, tooling, and payload creation' },
  { name: 'Cloud Security (AWS)', percentage: 80, description: 'IAM, WAF, and resource hardening' },
  { name: 'DevSecOps', percentage: 82, description: 'Integrating security into CI/CD pipelines' },
  { name: 'Open Source Intelligence (OSINT)', percentage: 88, description: 'Reconnaissance and data gathering' },
  { name: 'Vulnerability Management', percentage: 82, description: 'Reporting, tracking, and remediation' },
  { name: 'Linux & System Hardening', percentage: 80, description: 'Server configuration and privilege control' },
  { name: 'Version Control (Git)', percentage: 85, description: 'Secure code management practices' },
  { name: 'Problem Solving', percentage: 90, description: 'Analytical thinking and exploit debugging' }
];

const servicesData = [
  {
    icon: '🛡️',
    title: 'Vulnerability Assessment & Penetration Testing',
    description: 'Manual and automated assessments for web, API, and cloud applications.',
    features: [
      'OWASP Top 10 coverage',
      'Custom payload & fuzzing-based testing',
      'Detailed reporting with CVSS scoring',
      'Retesting after remediation'
    ]
  },
  {
    icon: '☁️',
    title: 'Cloud Security Audit',
    description: 'Comprehensive review of AWS security, IAM roles, and cloud configurations.',
    features: [
      'AWS WAF & GuardDuty tuning',
      'IAM least privilege enforcement',
      'CloudWatch & alert optimization',
      'S3 bucket and EKS cluster audits'
    ]
  },
  {
    icon: '🔍',
    title: 'Secure Code Review & CI/CD Security',
    description: 'Integrating security checks directly into development workflows.',
    features: [
      'SonarQube, Semgrep, and Jenkins pipelines',
      'Secret scanning and dependency checks',
      'Custom rule creation for security linting',
      'Automated report generation'
    ]
  },
  {
    icon: '🚀',
    title: 'DevSecOps Implementation',
    description: 'Security embedded across build, deploy, and runtime stages.',
    features: [
      'Infrastructure as Code (Terraform, Helm)',
      'Container image scanning',
      'Cluster-level admission policies',
      'Secure GitHub Actions & Jenkins workflows'
    ]
  },
  {
    icon: '📊',
    title: 'Security Reporting & Consultancy',
    description: 'Detailed assessments with actionable insights for tech and business teams.',
    features: [
      'Executive summary with visual dashboards',
      'Risk-based prioritization',
      'Compliance mapping (ISO, GDPR)',
      'Training & awareness sessions'
    ]
  }
];

const About: React.FC = () => {
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: '-100px' });

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
        title="Vinit Vora - Cybersecurity Consultant & VAPT Engineer | AI-Powered Recon & Security Automation"
        description="Cybersecurity consultant and VAPT engineer from India specializing in vulnerability assessment, automated reconnaissance, and AI-driven security tooling. Creator of the  CyberCLI — a powerful suite integrating nmap, Amass, ZAP, and more. Helping businesses secure their web apps and APIs with precision and automation."
        keywords="Vinit Vora, Cybersecurity Consultant, VAPT Engineer, Vulnerability Assessment, Penetration Testing, Security Automation, Recon Tools, AI Security, Bug Bounty, Web Application Security, API Security, OWASP ZAP, nmap, amass, sublist3r, Python Security Tools, Hire Security Consultant, India"
        image="https://vinitvora.com/vinit-vora-home.jpg"
        url="https://vinitvora.com"
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
            I'm Vinit Vora, a Security Engineer & VAPT Consultant from Mumbai, India. I help businesses protect their web applications, APIs, and cloud infrastructure by finding vulnerabilities before attackers do saving reputation and revenue.
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
      <SkillsSection ref={skillsRef}>
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
                <SkillProgressContainer>
                  <SkillProgressBar
                    percentage={skill.percentage}
                    initial={{ width: 0 }}
                    animate={skillsInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                  />
                </SkillProgressContainer>
                <SkillPercentage>{skill.percentage}%</SkillPercentage>
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