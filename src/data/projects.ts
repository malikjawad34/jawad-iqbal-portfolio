export type Category = 'SaaS & platforms' | 'AI & integrations' | 'Business systems';
export type Project = {
  slug: string;
  name: string;
  eyebrow: string;
  category: Category;
  headline: string;
  description: string;
  role: string;
  context: string;
  theme: 'blue' | 'green' | 'violet' | 'slate';
  technologies: string[];
  proof: string;
  problem: string;
  approach: { title: string; text: string }[];
  outcomes: string[];
  architecture: { label: string; detail: string }[];
  architectureNote: string;
  scope: string;
  links: { label: string; href: string }[];
  statusBadge?: {
    label: string;
    type: 'live' | 'published' | 'enterprise';
    href?: string;
  };
  tradeoffs?: {
    title: string;
    rationale: string;
  }[];
  dataFlow?: {
    step: string;
    from: string;
    to: string;
    detail: string;
  }[];
};
export const projects: Project[] = [
  {
    slug: 'chatclb',
    name: 'ChatCLB',
    eyebrow: 'SECURE SAAS PLATFORM',
    category: 'SaaS & platforms',
    headline: 'Connecting local businesses with the people who need them.',
    description:
      'A cloud-hosted business platform bringing discovery, secure identity, messaging, and integrated services together.',
    role: 'Lead full-stack development',
    context: 'Enterprise work · Applivity',
    theme: 'blue',
    technologies: [
      'ASP.NET Core',
      'React',
      'PostgreSQL',
      'IdentityServer',
      'AWS Kubernetes',
      'Twilio',
      'Firebase',
      'NHibernate',
    ],
    proof: 'Full-stack ownership · AWS deployment',
    problem:
      'Business discovery is only useful when people can act on it. ChatCLB brings customer-facing experiences together with identity, communications, and backend services in an ongoing SaaS product.',
    approach: [
      {
        title: 'One product, across the stack',
        text: 'Led development across the React frontend, ASP.NET Core services, and PostgreSQL persistence. Responsibilities span new features, integrations, architecture improvements, and production support.',
      },
      {
        title: 'Identity as a product foundation',
        text: 'Integrated IdentityServer into the application, alongside messaging and notifications through Twilio and Firebase, to support connected user journeys.',
      },
      {
        title: 'Delivery continues in production',
        text: 'Deployed and supported the platform on AWS Kubernetes. Release work and operational troubleshooting remain part of ongoing engineering ownership.',
      },
    ],
    outcomes: [
      'Delivered a cloud-hosted platform with connected frontend and backend services.',
      'Brought authentication, messaging, and notifications into the product.',
      'Continue to develop features and support production operations.',
    ],
    architecture: [
      { label: 'React', detail: 'Customer experience' },
      { label: 'ASP.NET Core', detail: 'Application services' },
      { label: 'PostgreSQL', detail: 'Persistent data' },
    ],
    architectureNote:
      'Supporting services: IdentityServer, Twilio, Firebase. Hosted on AWS Kubernetes. Simplified overview based on documented project technologies.',
    scope:
      'My role covers engineering delivery and ongoing support. ChatCLB is an enterprise project, not a solely owned personal product.',
    links: [
      {
        label: 'Project on Contra',
        href: 'https://contra.com/community/J0mhheVH-chat-clb-secure-saa-s-platform-built',
      },
    ],
    statusBadge: {
      label: 'Production SaaS',
      type: 'enterprise',
    },
    tradeoffs: [
      {
        title: 'Relational vs. Document Persistence',
        rationale:
          'PostgreSQL was chosen over document stores to enforce ACID transaction guarantees across tenant records, service bookings, and operational audit trails.',
      },
      {
        title: 'Centralized Identity via IdentityServer',
        rationale:
          'Decoupled identity from core application services, enabling standardized OAuth 2.0 / OIDC tokens across web clients, background jobs, and third-party integrations.',
      },
    ],
    dataFlow: [
      { step: '01', from: 'React Web Client', to: 'IdentityServer', detail: 'User authentication & PKCE token issuance' },
      { step: '02', from: 'Authorized Client', to: 'ASP.NET Core API', detail: 'Validated REST requests with scoped claims' },
      { step: '03', from: 'Application Layer', to: 'PostgreSQL & AWS EKS', detail: 'Transactional state persistence and containerized tasks' },
      { step: '04', from: 'Service Events', to: 'Twilio & Firebase', detail: 'Customer SMS notifications and real-time push updates' },
    ],
  },
  {
    slug: 'al-zayed',
    name: 'Al Zayed',
    eyebrow: 'LUGGAGE & DELIVERY OPERATIONS',
    category: 'Business systems',
    headline: 'A clearer journey, from dispatch to delivery.',
    description:
      'A full-stack logistics platform connecting customer tracking with the people and processes behind every delivery.',
    role: 'Independent full-stack engineer',
    context: 'Independent client project',
    theme: 'green',
    technologies: [
      'React',
      'Node.js',
      'TypeORM',
      'PostgreSQL',
      'REST APIs',
      'DigitalOcean',
      'RBAC',
    ],
    proof: 'Customer tracking + operations portal',
    problem:
      'Customers need to follow their luggage, while the operations team needs to coordinate assignments, people, and reporting. The platform brings both sides of that workflow into a single delivery system.',
    approach: [
      {
        title: 'Two audiences, one delivery workflow',
        text: 'Designed and delivered customer-facing tracking and an administrative portal. The operations tools cover delivery assignment, customer records, drivers, employees, analytics, and reports.',
      },
      {
        title: 'Access matched to responsibility',
        text: 'Implemented role-based access for the platform, with a React interface, Node.js REST APIs, and a PostgreSQL data layer using TypeORM.',
      },
      {
        title: 'Ownership through deployment',
        text: 'Deployed the production solution on DigitalOcean and configured the custom domain, taking the independent engagement through to a live application.',
      },
    ],
    outcomes: [
      'Delivered customer-facing luggage tracking.',
      'Provided an administrative portal for assignments, people management, and reporting.',
      'Deployed the complete platform with its custom domain.',
    ],
    architecture: [
      { label: 'React', detail: 'Tracking + admin' },
      { label: 'Node.js API', detail: 'Roles + workflows' },
      { label: 'PostgreSQL', detail: 'TypeORM persistence' },
    ],
    architectureNote:
      'Hosted on DigitalOcean with a custom domain. Diagram summarizes the documented application layers; it does not imply a specific network topology.',
    scope:
      'An independently delivered client project spanning application design, implementation, and deployment.',
    links: [
      { label: 'Visit live platform', href: 'https://zayedluggagetracker.com/' },
      {
        label: 'Project on Contra',
        href: 'https://contra.com/community/sAupIAjh-al-zayed-luggage-tracking-platform-full-stack',
      },
    ],
    statusBadge: {
      label: 'Live Platform ↗',
      type: 'live',
      href: 'https://zayedluggagetracker.com/',
    },
    tradeoffs: [
      {
        title: 'Full-Stack TypeScript & TypeORM',
        rationale:
          'Utilized TypeScript models with TypeORM across the Node.js API to share domain interfaces, eliminate schema drift, and speed up independent end-to-end delivery.',
      },
      {
        title: 'Dual-Audience Portal with RBAC',
        rationale:
          'Engineered discrete access boundaries separating public, unauthenticated tracking queries from sensitive operations dashboards (dispatchers, drivers, reports).',
      },
    ],
    dataFlow: [
      { step: '01', from: 'Public User', to: 'React Tracking View', detail: 'Submits tracking reference number' },
      { step: '02', from: 'Operations Team', to: 'Admin Portal', detail: 'Authenticated RBAC access for dispatch and fleet management' },
      { step: '03', from: 'Client Requests', to: 'Node.js REST API', detail: 'Executes luggage checkpoint updates and route assignments' },
      { step: '04', from: 'Data Layer', to: 'PostgreSQL (DigitalOcean)', detail: 'Persists status changes, driver logs, and delivery timestamps' },
    ],
  },
  {
    slug: 'chatclb-gpt',
    name: 'ChatCLB × GPT',
    eyebrow: 'AI CONNECTED TO REAL WORKFLOWS',
    category: 'AI & integrations',
    headline: 'From a conversation to a real business action.',
    description:
      'A published Custom GPT connected to ChatCLB through 21 focused API operations and personalized OAuth access.',
    role: 'API & AI integration engineer',
    context: 'Custom GPT integration project',
    theme: 'violet',
    technologies: [
      'Custom GPTs',
      'GPT Actions',
      'OpenAPI 3.1.1',
      'OAuth 2.0',
      'OpenID Connect',
      'REST APIs',
    ],
    proof: '21 API operations · OAuth access',
    problem:
      'A conversational interface needs more than fluent answers to be useful. It needs a clear contract with the application, access tied to the right person, and deliberate handling of actions that change business data.',
    approach: [
      {
        title: 'A focused contract for each action',
        text: 'Designed 21 operations through an OpenAPI 3.1.1 Actions API. They cover business discovery, services and availability, appointments, messaging, reviews, favourites, live menus, and POS orders.',
      },
      {
        title: 'Personalized access through OAuth',
        text: 'Connected the published Custom GPT to ChatCLB with OAuth-based access, supporting workflows that depend on the signed-in user.',
      },
      {
        title: 'Confirmation-aware workflows',
        text: 'Designed the integration around user confirmation and an authoritative backend. The conversational layer works through the application API rather than becoming the source of business truth.',
      },
    ],
    outcomes: [
      'Built and published a Custom GPT connected to the ChatCLB platform.',
      'Defined 21 focused operations in an OpenAPI Actions contract.',
      'Connected personalized OAuth access with confirmation-aware business workflows.',
    ],
    architecture: [
      { label: 'Custom GPT', detail: 'Conversation' },
      { label: 'GPT Actions', detail: 'OpenAPI contract' },
      { label: 'ChatCLB API', detail: 'Business authority' },
    ],
    architectureNote:
      'OAuth provides personalized access. This is a conceptual request flow, not a complete security or deployment diagram.',
    scope:
      'An integration with ChatCLB, presented separately to explain the API contract and conversational workflow design. It is not counted as an unrelated SaaS product.',
    links: [
      {
        label: 'Project on Contra',
        href: 'https://contra.com/community/K4Qg5jZ6-custom-gpt-with-o-auth-and-21',
      },
    ],
    statusBadge: {
      label: 'Published GPT Actions',
      type: 'published',
      href: 'https://contra.com/community/K4Qg5jZ6-custom-gpt-with-o-auth-and-21',
    },
    tradeoffs: [
      {
        title: 'Confirmation-Aware Mutating Operations',
        rationale:
          'Structured critical operations (e.g. appointment booking, order placement) with explicit two-step user confirmation in OpenAPI schemas to eliminate accidental state mutation via model hallucination.',
      },
      {
        title: 'Granular OpenAPI 3.1.1 Operation Decomposition',
        rationale:
          'Segmented 21 business capabilities into modular operation definitions with strict parameter schemas, minimizing prompt context tokens while ensuring deterministic model tool-calling accuracy.',
      },
    ],
    dataFlow: [
      { step: '01', from: 'User Prompt', to: 'Custom GPT Agent', detail: 'Natural language intent parsing & parameter extraction' },
      { step: '02', from: 'GPT Engine', to: 'OpenAPI 3.1.1 Contract', detail: 'Action schema selection & input constraint validation' },
      { step: '03', from: 'OpenAI Gateway', to: 'OAuth 2.0 Auth', detail: 'User-scoped bearer token attachment via OIDC' },
      { step: '04', from: 'API Layer', to: 'ChatCLB Core Services', detail: 'Authoritative backend execution & structured status response' },
    ],
  },
  {
    slug: 'sserp',
    name: 'SSERP',
    eyebrow: 'ENTERPRISE RESOURCE PLANNING',
    category: 'Business systems',
    headline: 'Custom software around the way an organization works.',
    description:
      'A custom enterprise resource planning system for a national organization, with secure workflows and AWS delivery.',
    role: 'Full-stack delivery',
    context: 'Enterprise work · Applivity',
    theme: 'slate',
    technologies: ['ASP.NET Core', 'React', 'SQL Server', 'JWT', 'AWS ECS'],
    proof: 'Custom ERP · Secure application workflows',
    problem:
      'An organization needed an ERP solution aligned with its own operations. The engineering scope combined application workflows, secure access, data persistence, and production deployment.',
    approach: [
      {
        title: 'Workflows tailored to the organization',
        text: 'Delivered a custom ERP application with a React frontend and ASP.NET Core services, backed by Microsoft SQL Server.',
      },
      {
        title: 'Secure application access',
        text: 'Used JWT authentication as part of the platform’s secure application workflows.',
      },
      {
        title: 'A production deployment on AWS',
        text: 'Delivered the solution into an AWS ECS environment as part of the full-stack implementation.',
      },
    ],
    outcomes: [
      'Delivered a custom ERP solution for a national organization.',
      'Implemented secure application workflows.',
      'Deployed the application on AWS ECS.',
    ],
    architecture: [
      { label: 'React', detail: 'ERP interface' },
      { label: 'ASP.NET Core', detail: 'JWT + services' },
      { label: 'SQL Server', detail: 'Operational data' },
    ],
    architectureNote:
      'Hosted on AWS ECS. Simplified stack overview based on the CV; internal modules and deployment topology are not disclosed.',
    scope:
      'Enterprise delivery at Applivity. Internal organizational data, user counts, and confidential workflows are not included in this overview.',
    links: [
      {
        label: 'Project on Contra',
        href: 'https://contra.com/community/OQgiGp6w-sserp-enterprise-resource-planning-system',
      },
      { label: 'Visit platform sign-in', href: 'https://app.dhtr.org/' },
    ],
    statusBadge: {
      label: 'Enterprise ERP',
      type: 'enterprise',
      href: 'https://app.dhtr.org/',
    },
    tradeoffs: [
      {
        title: 'Stateless JWT Claims vs. Session State',
        rationale:
          'Adopted cryptographically signed JWT authorization tokens to enable stateless horizontal scaling across AWS ECS task containers without Redis session clustering overhead.',
      },
      {
        title: 'Relational Schema Design in SQL Server',
        rationale:
          'Engineered normalized relational models with foreign-key constraints and targeted indexation to support rigorous institutional accounting and audit transparency.',
      },
    ],
    dataFlow: [
      { step: '01', from: 'Authorized User', to: 'React ERP Interface', detail: 'Authenticates via enterprise single-page portal' },
      { step: '02', from: 'Web Client', to: 'ASP.NET Core Gateway', detail: 'Sends cryptographically verified JWT authorization header' },
      { step: '03', from: 'Services', to: 'SQL Server', detail: 'Executes transactional accounting workflows & inventory records' },
      { step: '04', from: 'Container Host', to: 'AWS ECS & CloudWatch', detail: 'Runs containerized service replicas with performance monitoring' },
    ],
  },
  {
    slug: 'academic-management',
    name: 'Academic Management',
    eyebrow: 'INSTITUTIONAL OPERATIONS',
    category: 'Business systems',
    headline: 'Supporting the everyday work behind education.',
    description:
      'Enhancements to an institutional platform for attendance, fees, academic sessions, and operational reporting.',
    role: 'Application enhancement & delivery',
    context: 'Enterprise work · Applivity',
    theme: 'slate',
    technologies: ['ASP.NET MVC 5', 'C#', 'SQL Server', 'Entity Framework', 'AWS'],
    proof: 'Attendance · Fees · Academic reporting',
    problem:
      'Academic programs rely on reliable administrative software as well as good teaching. This institutional platform supports the recurring work around attendance, fee management, sessions, and reporting.',
    approach: [
      {
        title: 'Extend the system in place',
        text: 'Enhanced an existing academic-management platform for Quranic education programs, working within its ASP.NET MVC 5 and C# application.',
      },
      {
        title: 'Support recurring academic workflows',
        text: 'Contributed to functionality spanning attendance, fees, academic sessions, and operational reporting.',
      },
      {
        title: 'Work within an established stack',
        text: 'Used Entity Framework and Microsoft SQL Server in an application hosted on AWS.',
      },
    ],
    outcomes: [
      'Enhanced an institutional academic-management platform.',
      'Supported operational workflows for attendance, fees, and academic sessions.',
      'Contributed to reporting within the existing application.',
    ],
    architecture: [
      { label: 'ASP.NET MVC 5', detail: 'Application + views' },
      { label: 'Entity Framework', detail: 'Data access' },
      { label: 'SQL Server', detail: 'Institutional records' },
    ],
    architectureNote:
      'Hosted on AWS. The diagram is a simplified stack overview, not a reconstruction of internal infrastructure.',
    scope:
      'This was enhancement work on an existing platform. It is presented as a contribution, not a claim of building the entire system from scratch.',
    links: [],
    statusBadge: {
      label: 'Institutional Platform',
      type: 'enterprise',
    },
    tradeoffs: [
      {
        title: 'Query Optimization with Entity Framework',
        rationale:
          'Refactored data access paths using projection queries (`Select`) and eager loading (`Include`) to resolve N+1 latency issues on high-volume student attendance lookups.',
      },
      {
        title: 'Non-Breaking Modular Extension',
        rationale:
          'Structured new fee voucher generation and session management modules to integrate cleanly into the legacy MVC 5 pipeline without interrupting active academic cycles.',
      },
    ],
    dataFlow: [
      { step: '01', from: 'Administrative Staff', to: 'MVC 5 Razor Views', detail: 'Manages student cohorts, attendance grids, and fee records' },
      { step: '02', from: 'Controllers', to: 'Entity Framework Layer', detail: 'Executes optimized queries with relational tracking' },
      { step: '03', from: 'Data Layer', to: 'SQL Server', detail: 'Maintains historical institutional data and billing transactions' },
      { step: '04', from: 'Report Generator', to: 'AWS Production Host', detail: 'Dispatches printable fee vouchers and academic transcripts' },
    ],
  },
];
export const categories = [
  'All work',
  'SaaS & platforms',
  'AI & integrations',
  'Business systems',
] as const;
