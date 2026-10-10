export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "SaaS" | "Automation" | "R&D";
  tech_stack: string[];
  cover_image: string;
  video_url?: string | null;
  featured: boolean;
  status: "published" | "draft" | "archived";
  metrics?: Record<string, string | number>;
  client?: string;
  live_url?: string;
  github_url?: string;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  pillar: "SaaS" | "Automation" | "R&D";
  features: string[];
  icon: string;
  order_index: number;
}

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "serv-01",
    slug: "saas-engineering",
    title: "Enterprise SaaS Engineering",
    pillar: "SaaS",
    tagline: "Scalable, resilient cloud platforms engineered for zero downtime and multi-tenant isolation.",
    description:
      "We architect mission-critical software systems designed to process petabyte-scale transactions with sub-millisecond execution. From modern micro-frontends to distributed event-driven engines, our SaaS platforms are built to enterprise specifications.",
    features: [
      "Distributed Event-Driven Architecture (Kafka / RabbitMQ)",
      "Multi-Tenant Isolation & Zero-Trust Access Control",
      "Dynamic GraphQL & gRPC Edge Federation",
      "Real-time Synchronized WebSockets / SSE Mesh",
      "Full SOC-2 Type II & ISO-27001 Compliance Patterns",
    ],
    icon: "CloudLightning",
    order_index: 1,
  },
  {
    id: "serv-02",
    slug: "autonomous-automation",
    title: "Autonomous Systems & AI Automation",
    pillar: "Automation",
    tagline: "Cognitive agentic workflows and automated intelligence pipelines replacing manual operations.",
    description:
      "Empower your operations with adaptive multi-agent swarms, self-healing data pipelines, and visual reasoning models. We turn unstructured operational data into real-time deterministic action.",
    features: [
      "Autonomous Multi-Agent Orchestration Swarms",
      "Self-Healing Data & Machine Learning Ingestion Pipelines",
      "High-Precision Vision AI for Quality & Security Inspection",
      "End-to-End Enterprise ERP & CRM Robotic Automation",
      "Deterministic Decision Guardrails & Audit Trails",
    ],
    icon: "Cpu",
    order_index: 2,
  },
  {
    id: "serv-03",
    slug: "deep-tech-rd",
    title: "Applied Deep Tech R&D",
    pillar: "R&D",
    tagline: "Frontier algorithmic exploration in quantum optimization, edge neural synthesis, and cryptography.",
    description:
      "We partner with visionary enterprise leaders and defense contractors to pioneer breakthrough solutions where standard engineering ends. Our R&D division invents custom models, compiles hardware-optimized kernels, and deploys at the planetary edge.",
    features: [
      "Thesis Consultancy & Academic Research (BGC Trust University)",
      "Custom Neural Compression & TensorRT Edge Quantization",
      "Post-Quantum Cryptographic Key Encapsulation",
      "Deep Reinforcement Learning & Simulation (SAC / AE-SAC)",
      "Clinical Machine Learning & Attention Vision Architectures",
    ],
    icon: "Atom",
    order_index: 3,
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "proj-thesis-microgrids",
    slug: "microgrid-autonomous-frequency-control",
    title: "Autonomous Frequency Control in Multi-Source Microgrids",
    tagline: "Deep Reinforcement Learning (SAC & AE-SAC) framework for real-time autonomous frequency regulation in multi-source microgrids.",
    description:
      "Researched and developed an autonomous frequency regulation framework for isolated multi-source microgrids utilizing Soft Actor-Critic (SAC) and AutoEncoder-augmented SAC (AE-SAC). Evaluated on 2,591,674 simulation points within MATLAB/Simulink across solar, wind, battery, and load disturbance profiles. Supervised by Sumiya Tas Noor, Lecturer at BGC Trust University Bangladesh; authored by Sardnnus Mahabub. Achieved settling time of ~5.48s (vs 12.37s PID, 22.82s Droop) with frequency deviation strictly within ±0.15 Hz.",
    category: "R&D",
    tech_stack: ["PyTorch", "MATLAB/Simulink", "Soft Actor-Critic (SAC)", "AutoEncoder (AE-SAC)", "Python", "Microgrid Modeling"],
    cover_image: "/images/thesis/microgrid-drl-frequency-control.jpg",
    featured: true,
    status: "published",
    metrics: {
      "Sim Points": "2.59M",
      "Settling Time": "5.48s",
      "Freq Stability": "±0.15 Hz",
      "IAE Score": "0.136",
    },
    client: "BGC Trust University Bangladesh (Thesis Consultancy)",
    live_url: "/#thesis-consultancy",
    github_url: "https://github.com/quantrix-intel/microgrid-drl-control",
    created_at: "2025-06-15T10:00:00Z",
  },
  {
    id: "proj-thesis-diabetes",
    slug: "type2-diabetes-early-prediction-ml",
    title: "Early Prediction of Type-2 Diabetes on CDC Health Indicators",
    tagline: "Clinical machine learning pipeline utilizing SMOTETomek resampling and Stacking Ensemble architectures to detect pre-diabetes.",
    description:
      "Constructed a predictive medical machine learning pipeline over 229,781 survey records from the CDC BRFSS 2015 dataset. Engineered 6 novel composite risk indicators (including risk_score, age_bmi_interaction, and healthy_score). Deployed SMOTETomek hybrid sampling to address extreme 2.0% pre-diabetes minority class imbalance. Supervised by Rezuana Haque Megha, Lecturer at BGC Trust University Bangladesh; authored by Shahidul Hoque. The resulting Stacking Ensemble achieved 24.2% pre-diabetes recall and 57.9% diabetes recall with a Macro-F1 of 0.437, dramatically outperforming baseline models that suffered 100% pre-diabetes collapse.",
    category: "R&D",
    tech_stack: ["Python", "Scikit-Learn", "SMOTETomek", "Stacking Ensemble", "Random Forest", "MLP Neural Net", "Pandas"],
    cover_image: "/images/thesis/type2-diabetes-prediction-dark.png",
    featured: true,
    status: "published",
    metrics: {
      "BRFSS Records": "229,781",
      "Macro-F1": "0.437",
      "Pre-DM Recall": "24.2%",
      "Diabetes Recall": "57.9%",
    },
    client: "BGC Trust University Bangladesh (Thesis Consultancy)",
    live_url: "/#thesis-consultancy",
    github_url: "https://github.com/quantrix-intel/cdc-diabetes-ml-pipeline",
    created_at: "2026-07-20T10:00:00Z",
  },
  {
    id: "proj-thesis-retinopathy",
    slug: "diabetic-retinopathy-multihead-attention",
    title: "Diabetic Retinopathy Classification with Multi-Head Attention",
    tagline: "Transfer-learning computer vision architecture integrating Multi-Head Self-Attention atop CNN backbones for fundus lesion classification.",
    description:
      "Architected an attention-augmented transfer learning framework for automated diabetic retinopathy (DR) grading from 2,076 retinal fundus images. Integrated Multi-Head Self-Attention layers onto frozen VGG16 and MobileNetV2 feature extractors, enabling the network to focus on diagnostically critical microaneurysms, hemorrhages, and retinal exudates. Supervised by Md. Abdul Wahab, Lecturer at BGC Trust University Bangladesh; authored by Md. Towhidul Islam (Batch 39th). Achieved 95.71% test accuracy, Quadratic Weighted Kappa (QWK) of 0.9143, and an F1-score of 0.96.",
    category: "R&D",
    tech_stack: ["TensorFlow", "Keras", "VGG16", "Multi-Head Attention", "MobileNetV2", "OpenCV", "Python"],
    cover_image: "/images/thesis/diabetic-retinopathy-classification.jpg",
    featured: true,
    status: "published",
    metrics: {
      "Test Accuracy": "95.71%",
      "Kappa (QWK)": "0.9143",
      "Macro F1": "0.96",
      "Fundus Images": "2,076",
    },
    client: "BGC Trust University Bangladesh (Thesis Consultancy)",
    live_url: "/#thesis-consultancy",
    github_url: "https://github.com/quantrix-intel/retinopathy-attention-net",
    created_at: "2025-10-10T10:00:00Z",
  },

  {
    id: "proj-bulletgym",
    slug: "bulletgym-enterprise-saas",
    title: "Bakalia BulletGym Management Suite",
    tagline: "High-throughput athletic facility operating system with biometric check-in, automated subscription lifecycle, and POS telemetry.",
    description:
      "An enterprise-grade gym administration and operational intelligence platform engineered for The Bakalia Bullet Gym. Integrates sub-200ms biometric member verification, automated recurring subscription lifecycle, trainer capacity orchestration, POS inventory accounting, and telemetry dashboards built for continuous high-throughput athletic facilities.",
    category: "SaaS",
    tech_stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "WebSockets"],
    cover_image: "/images/bulletgym-cover.jpg",
    video_url: "/videos/gym-management-theme.mp4",
    featured: true,
    status: "published",
    metrics: {
      "Active Members": "2,000+",
      "Check-in Latency": "<180ms",
      "Payment Auto": "100%",
    },
    client: "The Bakalia Bullet Gym",
    live_url: "https://kolpolok-bulle--mdsaimonnehali3.replit.app/bullet-gym-video/",
    github_url: "https://github.com/quantrix-intel/bakalia-bulletgym",
    created_at: "2026-08-20T10:00:00Z",
  },
  {
    id: "proj-01",
    slug: "aegis-core-telemetry",
    title: "AegisCore Distributed Telemetry",
    tagline: "Sub-millisecond planetary observability engine for high-frequency trading infrastructure.",
    description:
      "Designed and deployed a global streaming telemetry matrix ingesting 14.8 million metrics per second across 12 availability zones. Integrated real-time anomaly detection using online clustering algorithms, reducing incident response latency by 84%.",
    category: "SaaS",
    tech_stack: ["Next.js", "Rust", "Apache Kafka", "ClickHouse", "Tailwind CSS", "eBPF"],
    cover_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    status: "published",
    metrics: {
      "Throughput": "14.8M msg/s",
      "P99 Latency": "1.2ms",
      "False Positives": "-91%",
    },
    client: "Global Tier-1 FinTech Consortium",
    live_url: "https://quantrix.ai/solutions/aegis",
    github_url: "https://github.com/quantrix-intel/aegis-core-spec",
    created_at: "2026-08-14T09:00:00Z",
  },
  {
    id: "proj-02",
    slug: "vanguard-agentic-swarm",
    title: "Vanguard Autonomous Swarm",
    tagline: "Decentralized agent orchestrator resolving enterprise supply chain disruptions autonomously.",
    description:
      "A cognitive mesh of 24 specialized autonomous LLM agents that monitor global supply chains, negotiate procurement reroutes in real-time, and execute compliance workflows without human latency. Deployed with formal cryptographic verification layers.",
    category: "Automation",
    tech_stack: ["Python", "LangGraph", "FastAPI", "PostgreSQL", "Next.js", "Docker"],
    cover_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    status: "published",
    metrics: {
      "Agent Swarm": "24 Nodes",
      "Manual Labor Cut": "73%",
      "Audit Accuracy": "99.98%",
    },
    client: "Aerospace Logistics Corporation",
    live_url: "https://quantrix.ai/solutions/vanguard",
    github_url: "https://github.com/quantrix-intel/vanguard-swarm",
    created_at: "2026-08-01T14:30:00Z",
  },
  {
    id: "proj-03",
    slug: "synapse-quantum-cipher",
    title: "Synapse Post-Quantum Vault",
    tagline: "NIST-compliant lattice-based cryptographic storage for sovereign cloud enclaves.",
    description:
      "Developed a hardware-accelerated lattice cryptography engine supporting Kyber and Dilithium schemes. Provides instant zero-knowledge proofs over distributed encrypted records, shielding strategic enterprise intellectual property from quantum decryption vectors.",
    category: "R&D",
    tech_stack: ["C++20", "CUDA", "Rust", "WebAssembly", "PostgreSQL", "Next.js"],
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    status: "published",
    metrics: {
      "NIST Standard": "FIPS 203/204",
      "Encryption Speed": "4.2 GB/s",
      "Quantum Entropy": "512-bit",
    },
    client: "Defense & Strategic Intelligence Client",
    live_url: "https://quantrix.ai/solutions/synapse-cipher",
    github_url: "https://github.com/quantrix-intel/synapse-cipher-spec",
    created_at: "2026-07-22T11:15:00Z",
  },
  {
    id: "proj-04",
    slug: "hyperion-edge-vision",
    title: "Hyperion Edge Neural Pipeline",
    tagline: "Ultra-low power neural visual inference system for robotic micro-assembly lines.",
    description:
      "Custom quantized Vision Transformer (ViT) architecture running inference on custom edge FPGA acceleration cards. Detects micrometer-level manufacturing defects at 240 frames per second with under 3.5 watts power budget.",
    category: "Automation",
    tech_stack: ["PyTorch", "TensorRT", "C++", "Next.js", "WebRTC", "Tailwind CSS"],
    cover_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    status: "published",
    metrics: {
      "Framerate": "240 FPS",
      "Defect Recall": "99.94%",
      "Power Draw": "3.2 Watts",
    },
    client: "Semiconductor Fabrication Group",
    live_url: "https://quantrix.ai/solutions/hyperion",
    github_url: "https://github.com/quantrix-intel/hyperion-edge",
    created_at: "2026-07-10T16:45:00Z",
  },
  {
    id: "proj-05",
    slug: "nexus-mesh-saas",
    title: "Nexus Multi-Tenant Mesh Platform",
    tagline: "Autonomous microservice orchestration with dynamic zero-trust traffic shaping.",
    description:
      "A next-generation enterprise control plane allowing organizations to spin up isolated compliance enclaves across AWS, GCP, and on-premises datacenters with declarative configuration and instant mTLS identity generation.",
    category: "SaaS",
    tech_stack: ["Go", "Kubernetes", "Next.js", "Envoy", "TypeScript", "Tailwind CSS"],
    cover_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    status: "published",
    metrics: {
      "Enclaves Managed": "1,400+",
      "Provisioning Time": "8.4 sec",
      "Network Overhead": "<0.08%",
    },
    client: "Global FinServ Enterprise",
    live_url: "https://quantrix.ai/solutions/nexus-mesh",
    github_url: "https://github.com/quantrix-intel/nexus-mesh",
    created_at: "2026-06-28T12:00:00Z",
  },
  {
    id: "proj-06",
    slug: "chronos-causal-ai",
    title: "Chronos Causal Forecaster",
    tagline: "Counterfactual predictive analytics for macroscopic commodity markets.",
    description:
      "Pioneered a structural causal inference framework combining graph neural networks with Monte Carlo physics modeling. Outperformed standard transformer predictors in projecting non-linear market shocks during extreme macro volatility.",
    category: "R&D",
    tech_stack: ["Julia", "Python", "Ray", "Next.js", "D3.js", "Tailwind CSS"],
    cover_image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1600&q=80",
    featured: false,
    status: "published",
    metrics: {
      "Sharpe Drift": "-48%",
      "Prediction Horizon": "90 Days",
      "Causal Nodes": "12,000+",
    },
    client: "Energy Sovereignty Fund",
    live_url: "https://quantrix.ai/solutions/chronos-ai",
    github_url: "https://github.com/quantrix-intel/chronos-causal",
    created_at: "2026-06-15T08:20:00Z",
  },
];
