import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container, Button, Badge } from '../styles/GlobalStyle';
import { getAnimationConfig, getDeviceInfo } from '../utils/performance';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';
import profileImage from '../assets/images/Home_dp.jpg';
import { easeOut } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 120px;
  padding-bottom: var(--spacing-8);
  overflow: hidden;

  @media (max-width: 968px) {
    min-height: auto;
    padding-top: 100px;
    padding-bottom: var(--spacing-12);
  }

  @media (max-width: 768px) {
    padding-top: 80px;
    padding-bottom: var(--spacing-8);
  }

  @media (max-width: 480px) {
    padding-top: 70px;
    padding-bottom: var(--spacing-6);
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-16);
  align-items: center;
  width: 100%;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-12);
    text-align: center;
  }
`;

const TextContent = styled(motion.div)`
  z-index: 2;
`;

const ProfileSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Greeting = styled(motion.p)`
  font-size: var(--text-base);
  color: var(--accent-primary);
  font-weight: var(--font-normal);
  margin-bottom: var(--spacing-3);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  opacity: 0.9;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: var(--font-extrabold);
  line-height: 0.9;
  margin-bottom: var(--spacing-4);
  background: linear-gradient(135deg, var(--dark-50) 0%, var(--accent-primary) 50%, var(--accent-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.05em;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
    opacity: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 0.3;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: var(--font-normal);
  color: var(--dark-400);
  margin-bottom: var(--spacing-8);
  line-height: 1.4;
  opacity: 0.8;
`;

const Description = styled(motion.p)`
  font-size: var(--text-base);
  color: var(--dark-500);
  line-height: 1.7;
  margin-bottom: var(--spacing-8);
  max-width: 480px;

  @media (max-width: 968px) {
    max-width: 100%;
    margin-bottom: var(--spacing-6);
  }

  @media (max-width: 480px) {
    font-size: var(--text-sm);
    margin-bottom: var(--spacing-5);
    line-height: 1.6;
  }
`;

const StatusBadges = styled(motion.div)`
  display: flex;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-6);
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const LocationInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--dark-500);
  font-size: var(--text-xs);
  margin-bottom: var(--spacing-4);
  opacity: 0.8;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const LiveTimeDisplay = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  color: var(--accent-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-normal);
  margin-bottom: var(--spacing-6);
  opacity: 0.9;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-12);
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
    margin-bottom: var(--spacing-8);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-6);
  }
`;

const TechStack = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 968px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: var(--spacing-3);
  }
`;

const TechStackTitle = styled.h3`
  font-size: var(--text-xs);
  color: var(--dark-500);
  font-weight: var(--font-medium);
  margin-bottom: var(--spacing-3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;

  @media (max-width: 968px) {
    text-align: center;
    width: 100%;
  }
`;

const TechItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid var(--dark-700);
  border-radius: var(--radius-lg);
  transition: var(--transition-normal);
  cursor: pointer;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: var(--accent-primary);
    background: rgba(100, 255, 218, 0.1);
    transform: translateY(-3px);
    box-shadow: var(--shadow-accent);
  }

  span:first-child {
    font-size: var(--text-base);
    opacity: 0.9;
  }

  span:last-child {
    font-size: var(--text-xs);
    color: var(--dark-400);
    font-weight: var(--font-normal);
  }
`;

const ProfileImageContainer = styled(motion.div)`
  position: relative;
  width: 450px;
  height: 450px;
  margin: 0 auto;
  top: -55px;

  @media (max-width: 968px) {
    width: 300px;
    height: 300px;
    top: 0;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
    top: 0;
  }
`;

const ProfileImage = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  overflow: hidden;
  box-shadow: var(--shadow-lg);

  img {
    position: absolute;
    inset: 8px;
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    object-fit: cover;
    object-position: top center;
    border-radius: 50%;
    z-index: 2;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FloatingIcon = styled(motion.div)<{ top: string; left: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: 60px;
  height: 60px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid var(--dark-700);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  color: var(--accent-primary);
  font-size: var(--text-xl);
  transition: var(--transition-normal);
  box-shadow: var(--shadow-md);

  &:hover {
    border-color: var(--accent-primary);
    background: rgba(100, 255, 218, 0.15);
    transform: translateY(-5px);
    box-shadow: var(--shadow-glow);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: var(--text-base);
  }
`;

const WaveHand = styled(motion.span)`
  display: inline-block;
  font-size: 1.2em;
`;

const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const animConfig = getAnimationConfig();
  const deviceInfo = getDeviceInfo();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animConfig.stagger,
        delayChildren: 0.1,
        duration: animConfig.duration
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: deviceInfo.isMobile ? 10 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: animConfig.duration }
    }
  };

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: animConfig.reducedMotion ? 0 : -3 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: animConfig.duration * 1.5,
        ease: easeOut, 
        delay: 0.5
      }
    }
  };
  
  

  const floatingIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: animConfig.duration, delay: 0.8 }
    },
    hover: {
      y: animConfig.reducedMotion ? 0 : -8,
      transition: { duration: animConfig.duration * 0.5 }
    }
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
      <HeroSection>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroContent>
            <TextContent>
              <Greeting variants={itemVariants}>
                <WaveHand
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  👋
                </WaveHand>
                Hello, I'm
              </Greeting>

              <MainTitle variants={itemVariants}>
                Vinit Vora
              </MainTitle>

              <Subtitle variants={itemVariants}>
                Security Engineer & VAPT Consultant
              </Subtitle>

              <StatusBadges variants={itemVariants}>
                <Badge variant="success">✅ Available for projects</Badge>
                <Badge variant="info">🚀 Freelancer</Badge>
              </StatusBadges>

              <LocationInfo variants={itemVariants}>
                <span>📍</span>
                <span>Mumbai, Maharashtra, India</span>
                <span>•</span>
                <span>IST Timezone</span>
              </LocationInfo>

              <LiveTimeDisplay variants={itemVariants}>
                <span>🕐</span>
                <span>Local Time: {formatTime(currentTime)}</span>
              </LiveTimeDisplay>

              <Description variants={itemVariants}>
                I help businesses secure their web apps, APIs, and cloud infrastructure through deep manual testing, security automation, and scalable VAPT solutions.
              </Description>

              <ActionButtons variants={itemVariants}>
                <Button as={Link} to="/projects" variant="primary" size="lg">
                  View Case Studies
                </Button>
                <Button as={Link} to="/contact" variant="outline" size="lg">
                  Get In Touch
                </Button>
              </ActionButtons>

              <motion.div variants={itemVariants}>
                <TechStackTitle>Preferred Tech Stack</TechStackTitle>
                <TechStack>
                  <TechItem
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🔹</span>
                    <span>Burp Suite Pro</span>
                  </TechItem>
                  <TechItem
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🔹</span>
                    <span>OWASP ZAP</span>
                  </TechItem>

                
                  <TechItem
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🔹</span>
                    <span>Postman</span>
                  </TechItem>
                  <TechItem
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🔹</span>
                    <span>AWS Security Stack</span>
                  </TechItem>
                  <TechItem
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🔹</span>
                    <span>ELK Stack</span>
                  </TechItem>
                </TechStack>
              </motion.div>
            </TextContent>

            <ProfileSection>
              <ProfileImageContainer variants={profileVariants}>
                <ProfileImage
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={profileImage} alt="Profile" />
                </ProfileImage>
                {!deviceInfo.isMobile && (
                  <FloatingElements>                    
                    <FloatingIcon
                      top="70%"
                      left="85%"
                      variants={floatingIconVariants}
                      whileHover="hover"
                      animate={animConfig.reducedMotion ? {} : {
                        y: [0, -15, 0],
                        transition: { duration: 4, repeat: Infinity, delay: 1 }
                      }}
                    >
                      🐍
                    </FloatingIcon>
                    
                    <FloatingIcon
                      top="75%"
                      left="-5%"
                      variants={floatingIconVariants}
                      whileHover="hover"
                      animate={animConfig.reducedMotion ? {} : {
                        y: [0, -8, 0],
                        transition: { duration: 4.5, repeat: Infinity, delay: 2 }
                      }}
                    >
                      🎨
                    </FloatingIcon>
                  </FloatingElements>
                )}
              </ProfileImageContainer>
            </ProfileSection>
          </HeroContent>
        </motion.div>
      </Container>
    </HeroSection>
    </PageTransition>
  );
};

export default Home;
