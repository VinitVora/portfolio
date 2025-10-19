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
import saasWafCaseImg from "../assets/images/3.png";
import cloudAuditCaseImg from "../assets/images/4.png";
import eksAuditCaseImg from "../assets/images/5.png";
import cspmCaseImg from "../assets/images/6.png";
import vulnAutomationCaseImg from "../assets/images/7.png";
import cicdCaseImg from "../assets/images/8.png";
import incidentResponseCaseImg from "../assets/images/9.png";
import researchPaperImg from "../assets/images/10.png";

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
    title: "Full-Scope API Security Assessment: Fintech Platform (Anonymised)",
    category: "Web & API Security",
    description:
      "Conducted a comprehensive VAPT across authentication, authorization, and input validation layers for a fintech API stack serving 100K+ monthly users.",
    longDescription:
      "Performed a full-scope vulnerability assessment and penetration test on a high-traffic fintech payment API that handled sensitive KYC and transaction data. The engagement covered authentication flows, JWT handling, rate limiting, and business logic flaws. Identified 8 high-risk vulnerabilities including broken object-level authorization (IDOR) and weak JWT validation. Delivered a CVSS-based risk matrix and guided dev teams through remediation validation. Integrated post-fix traffic monitoring via AWS WAF and ELK dashboards to ensure ongoing visibility.",
    technologies: [
      "Burp Suite",
      "OWASP ZAP",
      "Postman",
      "CyberCLI",
      "SQLMap",
      "AWS Stack",
    ],
    report: "/reports/Fintech-Platform-Report.pdf",
    featured: true,
    icon: "💳",
    image: fintechCaseImg,
    bgColor: "#000000",
  },
  {
    id: 2,
    title: "Web Application VAPT: EdTech Platform (Anonymised)",
    category: "Web & API Security",
    description:
      "Performed black-box and gray-box penetration testing on a large EdTech portal handling student records and payment processing.",
    longDescription:
      "Executed a hybrid black-box and authenticated penetration test for an EdTech SaaS platform with 500K+ active users. The scope included multiple subdomains, REST APIs, and third-party integrations. Discovered major access control weaknesses and insecure direct object references (IDOR) that allowed data exposure between accounts. Delivered a 60-page report with PoC payloads, CVSS scoring, and prioritized fixes. Post-remediation, integrated automated nightly scans via CyberCLI for continuous coverage.",
    technologies: [
      "OWASP ZAP",
      "Burp Suite Pro",
      "Nmap",
      "Amass",
      "CyberCLI",
      "Python",
    ],
    report: "/reports/EdTech-Platform-Report.pdf",
    featured: false,
    icon: "🎓",
    image: edtechCaseImg,
    bgColor: "#000000",
  },
  {
    id: 3,
    title: "Web VAPT & WAF Rule Optimization: SaaS Platform \n \n (Anonymised)",
    category: "Web & API Security",
    description:
      "Performed full-stack web penetration testing and optimized AWS WAF rules to reduce false positives while maintaining strong protection.",
    longDescription:
      "Engaged with a SaaS product team to identify OWASP Top 10 vulnerabilities and tune their AWS WAF configuration. Found multiple XSS vectors in legacy frontend modules and refined regex-based rules to eliminate false positives on legitimate API calls. Delivered actionable recommendations and implemented custom bypass whitelists for business-critical endpoints. Verified mitigation through regression testing and traffic simulation in staging environments. The engagement resulted in a 40% reduction in WAF noise and zero production false blocks post-launch.",
    technologies: [
      "AWS WAF",
      "Burp Suite",
      "Regex RuleSets",
      "ElastAlert2",
      "CloudWatch",
      "Fluent Bit",
    ],
    report: "/reports/SaaS-Platform-Report.pdf",
    featured: false,
    icon: "🧠",
    image: saasWafCaseImg,
    bgColor: "#000000",
  },

  // ☁️ Cloud & Infrastructure
  {
    id: 4,
    title: "AWS Multi-Account Security Audit & IAM Hardening (Anonymised)",
    category: "Cloud & Infrastructure",
    description:
      "Performed a cross-account AWS audit focusing on IAM roles, policies, and WAF configurations for multi-environment setups.",
    longDescription:
      "Conducted a detailed multi-account AWS security audit spanning development, staging, and production environments. Mapped all IAM roles, policies, and trust relationships to uncover privilege escalations and misconfigurations. Hardened access by implementing least privilege, session MFA enforcement, and cross-account role boundaries. Analyzed WAF rules and ALB configurations for misalignments. Delivered a detailed remediation plan and Terraform-ready IAM templates to standardize secure provisioning across all accounts.",
    technologies: [
      "AWS IAM",
      "AWS WAF",
      "Terraform",
      "CloudTrail",
      "AWS Config",
      "ScoutSuite",
    ],
    report: "/reports/AWS-Audit-Report.pdf",
    featured: true,
    icon: "☁️",
    image: cloudAuditCaseImg,
    bgColor: "#000000",
  },
  {
    id: 5,
    title: "EKS Cluster Security Audit & Runtime Defense (Anonymised)",
    category: "Cloud & Infrastructure",
    description:
      "Audited Kubernetes (EKS) clusters for misconfigurations, privilege escalation risks, and runtime vulnerabilities.",
    longDescription:
      "Performed a full-scale security review of Amazon EKS clusters running production workloads. Audited Kubernetes RBAC, Pod Security Policies, and service account bindings for excessive permissions. Integrated Falco and Kube-Bench to detect runtime anomalies and CIS benchmark deviations. Hardened cluster configuration by enforcing namespace-level isolation, image signature verification, and secrets encryption via KMS. Post-audit, delivered a cluster hardening playbook and live threat detection setup integrated with CloudWatch alerts.",
    technologies: [
      "Amazon EKS",
      "Falco",
      "Kube-Bench",
      "KMS",
      "RBAC",
      "CloudWatch",
    ],
    report: "/reports/EKS-Cluster-Audit-Report.pdf",
    featured: false,
    icon: "🔐",
    image: eksAuditCaseImg,
    bgColor: "#000000",
  },
  {
    id: 6,
    title: "Cloud Security Posture Management Automation (Anonymised)",
    category: "Cloud & Infrastructure",
    description:
      "Developed an automated CSPM workflow using AWS Lambda, Config, and Slack alerts for real-time compliance checks.",
    longDescription:
      "Designed and deployed an automated Cloud Security Posture Management (CSPM) system across multiple AWS accounts. Combined AWS Config rules with custom Lambda functions to monitor compliance against CIS benchmarks. Configured automated remediation triggers for S3 public access, security group violations, and unencrypted EBS volumes. Integrated SNS and Slack for instant alerting and periodic compliance summaries. Resulted in a 75% reduction in manual security review efforts and continuous compliance visibility.",
    technologies: [
      "AWS Lambda",
      "AWS Config",
      "SNS",
      "Slack API",
      "Python",
      "CloudFormation",
    ],
    report: "/report/AWS-WAF&CloudFront-Audit-Report.pdf",
    featured: false,
    icon: "🧭",
    image: cspmCaseImg,
    bgColor: "#000000",
  },

  // 🤖 Automation & Tooling
  {
    id: 7,
    title:
      "Security Automation Framework for Continuous Vulnerability Management (Anonymised)",
    category: "Automation & Tooling",
    description:
      "Built a serverless framework for continuous recon, scanning, and reporting using AWS Lambda and open-source tools.",
    longDescription:
      "Developed a fully automated, serverless vulnerability management framework to continuously scan and monitor assets across AWS environments. Integrated tools like Amass, Nmap, and OWASP ZAP with AWS Lambda and EventBridge for periodic scanning. Created aggregation logic to parse and correlate results, generate CVSS-based summaries, and push contextual alerts to Slack. The system now runs daily scans autonomously, providing near real-time vulnerability detection and continuous security visibility.",
    technologies: [
      "AWS Lambda",
      "Python",
      "OWASP ZAP",
      "Nmap",
      "Amass",
      "Slack API",
    ],
    report: "/reports/Security-Automation-Framework-Report.pdf",
    featured: true,
    icon: "⚙️",
    image: vulnAutomationCaseImg,
    bgColor: "#000000",
  },
  {
    id: 8,
    title:
      "CI/CD Secure Code Review Automation (Jenkins + SonarQube + Semgrep)",
    category: "Automation & Tooling",
    description:
      "Integrated security scanning into Jenkins pipelines to automate static analysis and dependency checks pre-deployment.",
    longDescription:
      "Implemented CI/CD security automation by integrating SonarQube and Semgrep into Jenkins pipelines. Configured quality gates to block insecure merges, added custom Semgrep rules for Python and Node.js codebases, and automated dependency and secret scans. Results were consolidated into structured JSON/PDF reports sent via Slack and stored in S3 for audit readiness. Reduced manual review efforts by 85% and improved release security across all microservices.",
    technologies: [
      "Jenkins",
      "SonarQube",
      "Semgrep",
      "truffleHog",
      "Python",
      "Slack API",
    ],
    report: "/reports/CI_CD-Secure-Code-Review-Automation-Report.pdf",
    featured: false,
    icon: "🚀",
    image: cicdCaseImg,
    bgColor: "#000000",
  },
  {
    id: 9,
    title:
      "Security Observability & Incident Response Automation (ElastAlert2 + CloudWatch + Slack)",
    category: "Automation & Tooling",
    description:
      "Engineered a unified alerting pipeline combining OpenSearch, CloudWatch, and Slack for real-time security event detection.",
    longDescription:
      "Deployed a complete observability and incident response automation pipeline across multiple AWS accounts. Integrated ElastAlert2 with OpenSearch to detect anomalies, CloudWatch to monitor WAF metrics, and Slack for real-time triage workflows. Built correlation logic for deduplication and context enrichment, reducing alert fatigue by 80% and average response time by over 85%. Delivered actionable visibility and automated escalation for critical production incidents.",
    technologies: [
      "OpenSearch",
      "ElastAlert2",
      "CloudWatch",
      "AWS Lambda",
      "Slack API",
      "Python",
    ],
    report: "/reports/Security-Observability&Incident-Response-Automation-Report.pdf",
    featured: false,
    icon: "📊",
    image: incidentResponseCaseImg,
    bgColor: "#000000",
  },
  {
    id: 10,
    title:
      "Research Paper: Machine Learning–Based Intrusion Detection for IoT Networks (IEEE Published)",
    category: "Research & Publications",
    description:
      "First-author IEEE paper presenting a lightweight IDS for IoT devices using AdaBoost and Random Forest algorithms.",
    longDescription:
      "As the first author, I designed and implemented a machine learning–based intrusion detection system (IDS) optimized for IoT networks running on Contiki-OS. The system leverages AdaBoost and Random Forest classifiers to detect attacks such as DDoS, sinkhole, and MITM with high accuracy. Trained on the Edge-IIoTset dataset and validated through the Cooja simulator and real IoT hardware, the model achieved 91.08% accuracy, 93.0% precision, and 92.0% recall while maintaining minimal resource usage. Published in IEEE Xplore, the paper demonstrates a practical approach to securing constrained IoT environments through intelligent automation.",
    technologies: [
      "Python",
      "Scikit-learn",
      "AdaBoost",
      "Random Forest",
      "Contiki-OS",
      "Cooja Simulator",
      "Edge-IIoTset Dataset",
    ],
    paper: "https://doi.org/10.1109/ICACRS62842.2024.10841743",
    featured: true,
    icon: "📘",
    image: researchPaperImg,
    bgColor: "#000000",
  },
];

const categories = [
  "All",
  "Web & API Security",
  "Cloud & Infrastructure",
  "Automation & Tooling",
  "Research & Publications",
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
            {/* If the project has a paper link, show "View Paper" */}
            {project.paper ? (
              <ActionButton
                as="a"
                href={project.paper}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                📄 View Paper
              </ActionButton>
            ) : (
              /* Otherwise, show "Download Report" */
              <ActionButton
                as="a"
                href={project.report}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                📂 Download Report
              </ActionButton>
            )}
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
        title="Vinit Vora - Cybersecurity Consultant & VAPT Engineer | AI-Powered Recon & Security Automation"
        description="Cybersecurity consultant and VAPT engineer from India specializing in vulnerability assessment, automated reconnaissance, and AI-driven security tooling. Creator of the  CyberCLI — a powerful suite integrating nmap, Amass, ZAP, and more. Helping businesses secure their web apps and APIs with precision and automation."
        keywords="Vinit Vora, Cybersecurity Consultant, VAPT Engineer, Vulnerability Assessment, Penetration Testing, Security Automation, Recon Tools, AI Security, Bug Bounty, Web Application Security, API Security, OWASP ZAP, nmap, amass, sublist3r, Python Security Tools, Hire Security Consultant, India"
        image="https://vinitvora.com/vinit-vora-home.jpg"
        url="https://vinitvora.com"
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
              All case studies are anonymized and sanitized to protect client
              confidentiality. Reports and data are illustrative of real
              security engagements.
            </motion.p>

            <HeroSubtitle variants={itemVariants}>
              A curated collection of real-world security engagements and audits
              covering Web & API Security, Cloud Infrastructure Hardening, and
              Security Automation.
            </HeroSubtitle>

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
                placeholder="🔍 Search projects..."
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
                              {project.paper ? (
                                <ActionButton
                                  as="a"
                                  href={project.paper}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="outline"
                                  size="sm"
                                  onClick={(e: React.MouseEvent) =>
                                    e.stopPropagation()
                                  }
                                >
                                  📄 View Paper
                                </ActionButton>
                              ) : (
                                <ActionButton
                                  as="a"
                                  href={project.report}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="outline"
                                  size="sm"
                                  onClick={(e: React.MouseEvent) =>
                                    e.stopPropagation()
                                  }
                                >
                                  📂 View Report
                                </ActionButton>
                              )}
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
