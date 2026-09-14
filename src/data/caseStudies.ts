export type CaseStudyCategory =
  | "Web & API Security"
  | "Business Logic Security"
  | "Cloud Security";

export interface CaseStudy {
  slug: string;
  title: string;
  category: CaseStudyCategory;
  summary: string;
  icon: string;
  featured: boolean;
  tags: string[];
  overview: string[];
  objective: { intro: string; bullets: string[] };
  scope: { intro: string; bullets: string[] };
  approach: { intro: string; bullets: string[] };
  finding: string[];
  risk: { intro: string; bullets: string[] };
  evidence: string[];
  remediation: { intro: string; bullets: string[] };
  retest: { intro: string; bullets: string[] };
  takeaway: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "cross-account-api-authorization",
    title: "Cross-Account Authorization Failure in a Production API",
    category: "Web & API Security",
    summary:
      "How manual object-ownership testing exposed a cross-account authorization boundary that ordinary authenticated testing could easily miss.",
    icon: "🔐",
    featured: true,
    tags: ["API Security", "BOLA / IDOR", "Authorization", "Retesting"],
    overview: [
      "During an authorized production application-security assessment, I identified a broken object-level authorization weakness affecting account-owned records exposed through an API (application programming interface).",
      "The application required users to authenticate, but a valid session was being treated as sufficient permission for certain object-level operations. By modifying an object reference inside an otherwise legitimate request, one authenticated account could interact with a record belonging to another account.",
      "This was an authorization failure—not an authentication failure. The user was legitimately signed in, but the server did not consistently verify whether that user was permitted to access the requested object.",
    ],
    objective: {
      intro:
        "The objective was to evaluate whether the application enforced ownership and privilege boundaries across authenticated API workflows. The assessment focused on questions such as:",
      bullets: [
        "Does the server verify ownership every time an object is requested?",
        "Can one authenticated account reference another account’s object?",
        "Are authorization checks applied consistently to read and state-changing operations?",
        "Does the application rely on the frontend to hide unauthorized actions?",
        "Are identifiers being mistaken for proof of permission?",
      ],
    },
    scope: {
      intro:
        "Testing was performed within an approved production-security scope using controlled accounts. The assessment covered:",
      bullets: [
        "Authenticated API requests",
        "Account-owned objects",
        "Read and state-changing operations",
        "Role and ownership boundaries",
        "Related workflow actions",
        "No bulk access, automated enumeration or unnecessary interaction with real customer information",
      ],
    },
    approach: {
      intro:
        "I first captured a legitimate baseline request using an authorized test account. I then repeated the same workflow using a second controlled identity to understand which values represented authentication, account context and object ownership. Instead of changing several parameters simultaneously, I modified one authorization-relevant value at a time. The response status, returned fields and resulting object state were compared across:",
      bullets: [
        "A legitimate same-account request",
        "A cross-account request",
        "Requests using missing or invalid object references",
        "Related operations affecting the same resource",
        "A minimum request set sufficient to isolate and confirm the server-side authorization decision",
      ],
    },
    finding: [
      "The server accepted a valid object identifier without consistently confirming that the referenced object belonged to the authenticated account.",
      "This created a BOLA (broken object-level authorization), commonly associated with IDOR (insecure direct object reference), condition. Possession of or access to an identifier could be treated as sufficient permission to interact with the associated record.",
      "The core issue was missing server-side ownership enforcement at the point where the requested object was retrieved or modified.",
    ],
    risk: {
      intro:
        "Depending on the affected operation, this type of vulnerability can result in:",
      bullets: [
        "Unauthorized access to another customer’s records",
        "Modification of data belonging to another account",
        "Loss of tenant isolation",
        "Privacy and contractual exposure",
        "Damage to customer trust",
        "Integrity problems across connected workflows",
      ],
    },
    evidence: [
      "The proof of concept used controlled identities and the minimum number of requests required to demonstrate the authorization failure.",
      "Evidence was redacted before reporting. Real identifiers, endpoints, request bodies, customer information and exploit-ready reproduction details are excluded from this public case study.",
      "No bulk extraction or unnecessary retention of production data was performed.",
    ],
    remediation: {
      intro:
        "I recommended centralizing object-level authorization on the server. The corrected implementation should:",
      bullets: [
        "Resolve the authenticated identity from the trusted session or token",
        "Retrieve the requested object and verify explicit permission before returning or changing it",
        "Deny the request when ownership or privilege cannot be established",
        "Apply the same control to every related read and state-changing operation",
        "Avoid relying on frontend visibility or identifier unpredictability",
        "Record rejected cross-account attempts where appropriate",
        "Add negative cross-account authorization tests to the automated test suite",
      ],
    },
    retest: {
      intro:
        "The issue should only be considered resolved when:",
      bullets: [
        "Cross-account requests are rejected consistently",
        "Read and state-changing operations enforce the same ownership rules",
        "Related endpoints cannot bypass the corrected control",
        "Legitimate same-account workflows continue functioning",
        "Negative authorization tests cover the affected resource family",
      ],
    },
    takeaway: [
      "Authentication answers: “Who is making this request?” Authorization must separately answer: “Is this identity permitted to act on this specific object?”",
      "That second decision cannot be delegated to the frontend, guessed from an identifier or assumed because the user has a valid session.",
    ],
  },
  {
    slug: "payment-workflow-race-condition",
    title: "Race Condition in a Payment Workflow",
    category: "Business Logic Security",
    summary:
      "How controlled concurrent requests revealed that a sensitive workflow could pass the same eligibility check more than once.",
    icon: "⚙️",
    featured: true,
    tags: ["Business Logic", "TOCTOU", "Concurrency", "Transaction Integrity"],
    overview: [
      "During authorized production application-security testing, I identified a race condition in a payment-related workflow that was expected to execute a sensitive action only once.",
      "Sequential requests behaved correctly. Once the first request completed, later attempts recognized that the action was no longer eligible.",
      "However, carefully synchronized requests could reach the server before the first request completed its state update. Multiple requests could therefore evaluate the same eligibility condition as valid. This created a TOCTOU (time-of-check to time-of-use) weakness affecting transaction integrity.",
    ],
    objective: {
      intro:
        "The objective was to determine whether the workflow enforced single execution under concurrent request conditions—not merely during normal sequential use. The review considered:",
      bullets: [
        "Where eligibility was checked",
        "When the underlying state was updated",
        "Whether those operations were atomic",
        "How duplicate requests were identified",
        "Whether idempotency was implemented",
        "Whether database constraints prevented repeated processing",
        "How repeated attempts appeared in audit records",
      ],
    },
    scope: {
      intro:
        "Testing was limited to one approved payment-related workflow using controlled accounts and a deliberately restricted request volume.",
      bullets: [
        "The approved eligibility check and state-changing operation",
        "Duplicate-request and retry behaviour",
        "A sequential baseline before introducing concurrency",
        "No attempt to produce real financial damage",
        "No testing of unrelated payment operations",
        "No unnecessary load on the production service",
      ],
    },
    approach: {
      intro:
        "I first documented the expected workflow and confirmed that sequential requests behaved correctly. After establishing that baseline, I introduced controlled concurrency:",
      bullets: [
        "Mapped the eligibility check, sensitive operation and final state update",
        "Repeated the workflow sequentially to confirm normal single-execution behaviour",
        "Sent a small number of carefully synchronized requests using a controlled account",
        "Compared the server responses and resulting state",
        "Stopped once repeatable evidence showed that more than one request could pass the same precondition",
      ],
    },
    finding: [
      "The eligibility check and state update were not enforced as one atomic operation.",
      "Multiple concurrent requests could observe the same eligible state before any of them completed the update intended to prevent another execution.",
      "The workflow therefore depended on requests arriving sequentially—an assumption that cannot be guaranteed in a distributed web environment.",
    ],
    risk: {
      intro:
        "Race conditions in payment and entitlement workflows can create:",
      bullets: [
        "Duplicate processing",
        "Incorrect balances or transaction states",
        "Financial loss",
        "Reconciliation failures",
        "Inconsistent records across dependent systems",
        "Customer disputes and operational investigation costs",
      ],
    },
    evidence: [
      "Validation used controlled accounts and the minimum concurrency necessary to establish repeatability.",
      "Testing stopped before deliberately creating financial impact.",
      "This public case study does not disclose timing intervals, internal state values, endpoints, request bodies or implementation-specific exploitation instructions.",
    ],
    remediation: {
      intro:
        "I recommended enforcing the eligibility decision and state change atomically. Depending on the architecture, appropriate controls may include:",
      bullets: [
        "Database transactions",
        "Row-level locking",
        "Conditional updates or compare-and-set operations",
        "Unique database constraints",
        "Server-generated idempotency keys tied to the business action",
        "Distributed locking only where genuinely required",
        "Audit records for competing or duplicate attempts without logging sensitive payment data",
      ],
    },
    retest: {
      intro:
        "The corrected workflow should be tested by:",
      bullets: [
        "Repeating synchronized requests against the same controlled action",
        "Confirming that only one request completes successfully",
        "Confirming that competing requests fail safely and consistently",
        "Verifying that retry behaviour remains usable",
        "Confirming ordinary sequential processing still works",
        "Checking that duplicate attempts generate appropriate audit evidence",
        "Testing related workflows that reuse the same eligibility logic",
      ],
    },
    takeaway: [
      "Sequential functional testing cannot prove that a workflow is safe under concurrency.",
      "If a business action must happen once, the server and data layer must enforce that guarantee atomically.",
    ],
  },
  {
    slug: "unauthenticated-sensitive-data-exposure",
    title: "Unauthenticated Sensitive-Data Exposure",
    category: "Web & API Security",
    summary:
      "A bounded assessment of an API workflow that returned sensitive records without the expected authentication and authorization boundary.",
    icon: "🧩",
    featured: false,
    tags: ["API Security", "Access Control", "Data Exposure", "Abuse Testing"],
    overview: [
      "During an authorized production application-security assessment, I identified an API (application programming interface) workflow that returned sensitive record information without enforcing the expected authentication and authorization boundary.",
      "The issue was more serious than a publicly reachable endpoint. The workflow accepted record references and returned information that should only have been available within an appropriate authenticated context.",
      "The validation was intentionally bounded. The objective was to establish realistic impact—not to collect a large quantity of exposed data.",
    ],
    objective: {
      intro: "The assessment examined:",
      bullets: [
        "Whether authentication was required before record resolution",
        "Whether the server verified authorization after identifying a record",
        "Whether record references could be reused outside their intended context",
        "How much sensitive information was returned",
        "Whether the response exposed more data than the workflow required",
        "Whether rate limits and monitoring restricted repeated access",
        "Whether caching or retention increased the exposure",
      ],
    },
    scope: {
      intro:
        "Testing was restricted to the approved API behaviour and the minimum number of record lookups needed to demonstrate the issue.",
      bullets: [
        "The affected unauthenticated workflow",
        "Authentication and object-authorization decisions",
        "A minimal sample sufficient to confirm repeatability",
        "No bulk extraction or large-scale enumeration",
        "No unnecessary collection of personal information",
        "No disclosure of the real application, affected data categories, identifier format or endpoint structure",
      ],
    },
    approach: {
      intro:
        "I compared the workflow under different access conditions and then traced where the expected security decision was missing:",
      bullets: [
        "A legitimate authenticated request",
        "The same workflow without authentication",
        "A request containing a modified or unrelated record reference",
        "How the application obtained and resolved record references",
        "Whether possession of an identifier was being treated as permission",
        "A limited request set, stopping once repeatability and impact were established",
      ],
    },
    finding: [
      "The API returned sensitive record information without requiring an appropriate authenticated and authorized context.",
      "The server resolved a supplied reference and returned the associated record before establishing whether the requester was permitted to access it.",
      "Where record references can be obtained, reused or predicted, this type of missing control can turn an isolated exposure into a repeatable data-access path.",
    ],
    risk: {
      intro:
        "Unauthenticated sensitive-data exposure can result in:",
      bullets: [
        "Privacy violations",
        "Disclosure of personal or account information",
        "Identity-related abuse",
        "Customer harm",
        "Contractual and regulatory consequences",
        "Reputational damage",
        "Increased exposure when data is retained or cached unnecessarily",
      ],
    },
    evidence: [
      "The proof of concept was deliberately limited and no bulk extraction was performed.",
      "Sensitive values were not retained beyond what was necessary for evidence, and the report used redacted examples.",
      "The public version excludes all real domains, identifiers, endpoints, response structures, screenshots and affected customer information.",
    ],
    remediation: {
      intro:
        "I recommended applying the following control sequence:",
      bullets: [
        "Require authentication before resolving sensitive records",
        "Determine the authenticated identity from a trusted session or token",
        "Verify that the identity is authorized to access the requested record",
        "Return only the fields required by the legitimate workflow",
        "Reject anonymous and cross-account access consistently",
        "Apply appropriate rate limits and abuse monitoring",
        "Review caching, logging and retention for previously exposed information",
        "Treat identifier complexity only as a secondary defence—not authorization",
      ],
    },
    retest: {
      intro:
        "The remediation should be validated by confirming that:",
      bullets: [
        "Anonymous requests are rejected before record retrieval",
        "Authenticated users cannot access records outside their permitted scope",
        "Modified or unrelated references do not bypass authorization",
        "Responses contain only necessary information",
        "Repeated rejected attempts are appropriately limited or monitored",
        "Cached responses do not expose protected data",
        "Related endpoints do not reproduce the same control failure",
      ],
    },
    takeaway: [
      "Sensitive records require both authentication and object-level authorization.",
      "Making an identifier difficult to guess may reduce casual discovery, but it does not replace an explicit server-side permission decision.",
    ],
  },
  {
    slug: "aws-eks-security-review",
    title: "AWS and EKS Security Review",
    category: "Cloud Security",
    summary:
      "A structured review connecting cloud identity, workload permissions, public exposure, secrets and security visibility into realistic attack paths.",
    icon: "☁️",
    featured: false,
    tags: ["AWS IAM", "EKS", "Kubernetes RBAC", "Cloud Security"],
    overview: [
      "I performed a structured security review of a production cloud environment combining AWS (Amazon Web Services) services with EKS (Elastic Kubernetes Service) workloads.",
      "The goal was not to produce a giant configuration checklist. It was to understand how identity permissions, workload access, public exposure, secrets and security visibility connected into realistic attack paths.",
      "Cloud-security issues rarely exist in isolation. A permission that appears only moderately broad can become much more serious when combined with an exposed workload, accessible secret or missing audit coverage.",
    ],
    objective: {
      intro:
        "The objective was to identify reachable security risks and produce prioritized remediation—not inflate the finding count with low-value configuration observations. The review focused on:",
      bullets: [
        "IAM (identity and access management) roles and policies",
        "Kubernetes RBAC (role-based access control)",
        "Workload identity and service-account permissions",
        "Publicly reachable services, ingress and network boundaries",
        "Web application firewall and edge controls",
        "Secrets handling",
        "Audit logging, security monitoring and response visibility",
      ],
    },
    scope: {
      intro:
        "The assessment covered only the AWS accounts, EKS clusters, workloads and supporting services included in the approved scope.",
      bullets: [
        "Configuration review did not automatically authorize active exploitation",
        "Potentially disruptive validation required separate approval",
        "Low-impact checks or supplied configuration evidence were used where production availability could be affected",
        "Real account identifiers, cluster names, policies, network ranges, architecture diagrams, workloads and logs are excluded",
      ],
    },
    approach: {
      intro:
        "I began by mapping how identities and traffic moved through the environment:",
      bullets: [
        "Human and machine identities in AWS",
        "IAM roles available to workloads",
        "Kubernetes service accounts and effective RBAC permissions",
        "Access from public entry points to internal workloads",
        "Permissions available after reaching a workload",
        "Edge controls applied before traffic reached the application",
        "Security events available for detection and investigation",
        "Prioritization by reachable impact and remediation effort rather than checklist count",
      ],
    },
    finding: [
      "The review demonstrated how individually reasonable configurations could combine into excessive access, unnecessary exposure or insufficient detection.",
      "Relevant themes included broad effective permissions, weak workload-identity separation, public exposure, unnecessarily accessible secrets, incomplete audit visibility and edge controls requiring alignment with application behaviour.",
      "The useful output was an attack-path-oriented remediation plan rather than a generic cloud benchmark export.",
    ],
    risk: {
      intro:
        "Combined cloud and Kubernetes weaknesses can increase the impact of:",
      bullets: [
        "Application compromise",
        "Credential or token exposure",
        "Unauthorized access to cloud resources",
        "Lateral movement between workloads",
        "Data exposure",
        "Service disruption",
        "Delayed detection and investigation",
      ],
    },
    evidence: [
      "Configuration evidence was handled within the agreed scope.",
      "The public case study excludes all real policy documents, account identifiers, cluster names, network details, secrets, logs, screenshots and internal architecture.",
      "No credentials or confidential client configuration are included in the portfolio.",
    ],
    remediation: {
      intro:
        "I organized recommendations by reachable risk, ownership and validation requirements. The remediation approach included:",
      bullets: [
        "Reducing IAM permissions to required actions and resources",
        "Reviewing effective permissions inherited through attached policies",
        "Separating workload identities",
        "Restricting Kubernetes service-account and RBAC permissions",
        "Removing unnecessary public exposure",
        "Tightening ingress and network paths",
        "Improving secrets storage, access and rotation",
        "Verifying edge-security controls against real application behaviour",
        "Enabling actionable audit coverage for sensitive events",
        "Assigning an owner and validation method to each remediation item",
      ],
    },
    retest: {
      intro:
        "The review should be considered successfully remediated only after:",
      bullets: [
        "Updated IAM and RBAC permissions are evaluated in their effective context",
        "Workloads retain only the permissions required for their function",
        "Removed public exposure is confirmed unreachable",
        "Legitimate application traffic continues functioning",
        "Secrets are no longer unnecessarily accessible",
        "Expected identity and workload events appear in logs",
        "Important events generate usable alerts",
        "Previously identified attack paths are no longer viable",
      ],
    },
    takeaway: [
      "Cloud security is not a collection of independent configuration checks.",
      "The useful question is how identity, exposure, workload permissions, secrets and visibility connect—and what an attacker could realistically do with that combination.",
    ],
  },
];

export const caseStudyCategories = [
  "All",
  "Web & API Security",
  "Business Logic Security",
  "Cloud Security",
] as const;

export const getCaseStudy = (slug?: string) =>
  caseStudies.find((study) => study.slug === slug);
