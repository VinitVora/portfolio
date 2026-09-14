import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  Section,
  Grid,
  Card,
  Button,
  Badge,
} from "../styles/GlobalStyle";
import SEO from "../components/SEO";
import OptimizedImage from "../components/OptimizedImage";
import PageTransition from "../components/PageTransition";
import { SkeletonGrid } from "../components/Skeleton";
import { StaggerContainer, StaggerItem } from "../components/ScrollReveal";

// Import project images
import fintechCaseImg from "../assets/images/1.png";
import edtechCaseImg from "../assets/images/2.png";

const ProjectsHero = styled(Section)`
  padding-top: 140px;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
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
  font-weight: var(--font-extrabold);
  letter-spacing: -0.025em;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: var(--text-xl);
  color: var(--dark-400);
  max-width: 600px;
  margin: 0 auto var(--spacing-16);
  line-height: 1.7;
`;

const FilterSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-16);
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)<{ active: boolean }>`
  padding: var(--spacing-3) var(--spacing-5);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  transition: var(--transition-normal);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.active
      ? `
    background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
    color: var(--dark-950);
    border: 1px solid transparent;
    box-shadow: var(--shadow-accent);
  `
      : `
    background: rgba(30, 41, 59, 0.6);
    color: var(--dark-300);
    border: 1px solid var(--dark-700);
    backdrop-filter: blur(10px);
    
    &:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
      background: rgba(100, 255, 218, 0.1);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  `}
`;

const SearchContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-16);
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-4) var(--spacing-6);
  font-size: var(--text-base);
  border: 1px solid var(--dark-700);
  border-radius: var(--radius-lg);
  background: var(--dark-900);
  color: var(--dark-100);
  transition: var(--transition-normal);

  &:focus {
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 1px var(--accent-primary);
  }

  &::placeholder {
    color: var(--dark-500);
  }
`;

const ProjectsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--spacing-8);
`;

const ProjectCard = styled(Card)`
  position: relative;
  overflow: hidden;
  transition: var(--transition-normal);
  display: flex;
  flex-direction: column;
  height: 600px;

  @media (max-width: 768px) {
    height: auto;
    min-height: 520px;
  }

  @media (max-width: 480px) {
    height: auto;
    min-height: 480px;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: var(--accent-primary);
    box-shadow: 0 30px 60px rgba(100, 255, 218, 0.15);
  }
`;

const ProjectImageContainer = styled.div<{ bgColor: string }>`
  width: 100%;
  height: 240px;
  background: ${(props) => props.bgColor};
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-6);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
    pointer-events: none;
  }
`;

const ProjectIconOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--text-6xl);
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const ProjectBadge = styled(Badge)`
  position: absolute;
  top: var(--spacing-4);
  left: var(--spacing-4);
  z-index: 2;
`;

const FeaturedBadge = styled(Badge)`
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  z-index: 2;
`;

const ProjectContent = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: none;
  }
`;

const ProjectTitle = styled.h3`
  font-size: var(--text-xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-3);
  font-weight: var(--font-semibold);
`;

const ProjectDescription = styled.p`
  color: var(--dark-400);
  line-height: 1.6;
  margin-bottom: var(--spacing-6);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 72px;

  @media (max-width: 768px) {
    height: auto;
    min-height: 72px;
  }
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  height: 32px;
  align-items: flex-start;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: 32px;
  }
`;

const TechTag = styled.span`
  background: rgba(139, 92, 246, 0.1);
  color: var(--accent-secondary);
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border: 1px solid rgba(139, 92, 246, 0.3);
`;

const ProjectActions = styled.div`
  display: flex;
  gap: var(--spacing-3);
  align-items: center;
  margin-top: auto;
`;

const ActionButton = styled(Button)`
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
`;

// Modal Styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-4);
  overflow-y: auto;
`;

const ModalContent = styled(motion.div)`
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid var(--dark-700);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-8);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-xl);

  @media (max-width: 1024px) {
    max-width: 95vw;
    padding: var(--spacing-6);
  }

  @media (max-width: 768px) {
    max-width: 90vw;
    padding: var(--spacing-5);
    max-height: 85vh;
  }

  @media (max-height: 600px) {
    max-height: 95vh;
    padding: var(--spacing-4);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--dark-200);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-normal);
  font-size: 20px;
  font-weight: normal;
  z-index: 10;
  backdrop-filter: blur(10px);

  /* Refined mobile design */
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
    top: var(--spacing-4);
    right: var(--spacing-4);
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: var(--accent-primary);
    border-color: var(--accent-primary);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.2);
  }

  /* Touch-friendly on mobile */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      background: rgba(255, 255, 255, 0.2);
      color: var(--accent-primary);
    }
  }
`;

const ModalTitle = styled.h2`
  font-size: var(--text-2xl);
  color: var(--dark-100);
  margin-bottom: var(--spacing-4);
`;

const ModalDescription = styled.p`
  color: var(--dark-400);
  line-height: 1.7;
  margin-bottom: var(--spacing-6);
`;

const ModalTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-8);
`;

const ModalActions = styled.div`
  display: flex;
  gap: var(--spacing-4);
  flex-wrap: wrap;
`;

//Project Data
const projectsData = [
  // 🌐 Web & API Security
  {
    id: 1,
    title: "Cross-Account Authorization Failure in a Production API",
    category: "Web & API Security",
    description:
      "An anonymized production security case study involving missing object-ownership enforcement across authenticated API requests.",
    longDescription:
      "During authorized production application-security work, I found that authenticated requests could reference objects belonging to another account because authorization checks did not consistently validate ownership. I reproduced the behavior with controlled test accounts, documented the affected permission boundary without retaining real customer data, and worked with developers on centralized server-side ownership checks and negative authorization tests. This is anonymized professional experience, not a freelance-client engagement.",
    technologies: [
      "Burp Suite",
      "Authorization Testing",
      "BOLA / IDOR",
      "Business Logic",
      "Remediation Validation",
    ],
    featured: true,
    icon: "🔐",
    image: fintechCaseImg,
    bgColor: "#000000",
  },
  {
    id: 2,
    title: "Concurrency Flaw in a Payment Workflow",
    category: "Business Logic Security",
    description:
      "An anonymized production case study showing how concurrent requests could bypass an intended single-execution control.",
    longDescription:
      "During authorized production application-security work, I identified a time-of-check to time-of-use weakness in a payment-related workflow. Carefully synchronized requests could pass the same precondition before state was updated. I validated the issue with controlled accounts and a minimal request set, stopped before causing financial impact, and recommended an atomic server-side control with idempotency and concurrency-focused regression tests. This is anonymized professional experience, not a freelance-client engagement.",
    technologies: [
      "Burp Suite Pro",
      "Concurrency Testing",
      "TOCTOU",
      "Workflow Integrity",
      "Retesting",
    ],
    featured: true,
    icon: "⚙️",
    image: edtechCaseImg,
    bgColor: "#000000",
  },
];

const categories = [
  "All",
  "Web & API Security",
  "Business Logic Security",
];

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>×</CloseButton>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-4)",
              marginBottom: "var(--spacing-6)",
            }}
          >
            <div
              style={{
                fontSize: "var(--text-3xl)",
                background: project.bgColor,
                padding: "var(--spacing-4)",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {project.icon}
            </div>
            <div>
              <ModalTitle>{project.title}</ModalTitle>
              <div
                style={{
                  display: "flex",
                  gap: "var(--spacing-2)",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Badge variant="info">{project.category}</Badge>
                {project.featured && (
                  <Badge variant="success">⭐ Featured</Badge>
                )}
              </div>
            </div>
          </div>

          <ModalDescription>{project.longDescription}</ModalDescription>

          <div style={{ marginBottom: "var(--spacing-6)" }}>
            <h4
              style={{
                color: "var(--dark-100)",
                marginBottom: "var(--spacing-3)",
              }}
            >
              Technologies Used:
            </h4>
            <ModalTech>
              {project.technologies.map((tech: string, index: number) => (
                <TechTag key={index}>{tech}</TechTag>
              ))}
            </ModalTech>
          </div>

          <ModalActions>
            <ActionButton as="a" href="/contact" variant="primary">
              Request an Assessment
            </ActionButton>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Prevent body scroll but don't change scroll position
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <SEO
        title="Security Case Studies | Vinit Vora"
        description="Anonymized production application-security case studies covering API authorization and business-logic testing. These are professional-experience examples, not freelance-client engagements."
        keywords="Vinit Vora, API Authorization Testing, BOLA, IDOR, Business Logic Security, TOCTOU, Application Security Case Studies"
        image="https://vinitvora.com/vinit-vora-home.jpg"
        url="https://vinitvora.com/case-studies"
      />
      <ProjectsHero>
        <Container>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle variants={itemVariants}>Case Studies</HeroTitle>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--dark-500)",
                maxWidth: "700px",
                margin: "0 auto var(--spacing-6)",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              These anonymized production security case studies are derived
              from professional experience. They are not presented as
              freelance-client engagements. Sensitive systems, identities,
              data, and exploit-ready details have been removed.
            </motion.p>

            <HeroSubtitle variants={itemVariants}>
              Examples of manual authorization and business-logic testing,
              evidence handling, developer remediation support, and retesting.
            </HeroSubtitle>

            <motion.div
              variants={itemVariants}
              style={{ marginBottom: "var(--spacing-10)" }}
            >
              <Button as="a" href="/sample-report" variant="outline">
                View a Sanitized Sample Report
              </Button>
            </motion.div>

            <FilterSection variants={itemVariants}>
              {categories.map((category) => (
                <FilterButton
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </FilterButton>
              ))}
            </FilterSection>

            <SearchContainer variants={itemVariants}>
              <SearchInput
                type="text"
                placeholder="🔍   Search Case Studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </motion.div>
        </Container>
      </ProjectsHero>

      <Section>
        <Container>
          {isLoading ? (
            <ProjectsGrid>
              <SkeletonGrid count={6} />
            </ProjectsGrid>
          ) : (
            <StaggerContainer staggerDelay={0.15}>
              <ProjectsGrid>
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <StaggerItem key={project.id} variant="scaleUp">
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => openModal(project)}
                      >
                        <ProjectCard>
                          <ProjectImageContainer
                            bgColor={project.bgColor || "#000000"}
                          >
                            {project.image && (
                              <OptimizedImage
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                style={{
                                  width: "85%",
                                  height: "85%",
                                  maxWidth: "300px",
                                  maxHeight: "180px",
                                  objectFit: "contain",
                                  objectPosition: "center",
                                  borderRadius: "var(--radius-md)",
                                  position: "relative",
                                  zIndex: 0,
                                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                                  padding: "var(--spacing-2)",
                                }}
                              />
                            )}
                            {!project.image && (
                              <ProjectIconOverlay>
                                {project.icon}
                              </ProjectIconOverlay>
                            )}
                            <ProjectBadge variant="info">
                              {project.category}
                            </ProjectBadge>
                            {project.featured && (
                              <FeaturedBadge variant="success">
                                ⭐ Featured
                              </FeaturedBadge>
                            )}
                          </ProjectImageContainer>

                          <ProjectContent>
                            <ProjectTitle>{project.title}</ProjectTitle>
                            <ProjectDescription>
                              {project.description}
                            </ProjectDescription>
                            <ProjectTech>
                              {project.technologies
                                .slice(0, 3)
                                .map((tech, techIndex) => (
                                  <TechTag key={techIndex}>{tech}</TechTag>
                                ))}
                              {project.technologies.length > 3 && (
                                <TechTag>
                                  +{project.technologies.length - 3} more
                                </TechTag>
                              )}
                            </ProjectTech>
                            <ProjectActions>
                              <ActionButton variant="primary" size="sm">
                                View Summary
                              </ActionButton>
                            </ProjectActions>
                          </ProjectContent>
                        </ProjectCard>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </AnimatePresence>
              </ProjectsGrid>
            </StaggerContainer>
          )}

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: "center",
                padding: "var(--spacing-16)",
                color: "var(--dark-400)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--text-2xl)",
                  marginBottom: "var(--spacing-4)",
                }}
              >
                No projects found
              </h3>
              <p>Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </Container>
      </Section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </PageTransition>
  );
};

export default Projects;
