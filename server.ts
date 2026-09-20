import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client if API key is present
  const ai = process.env.GEMINI_API_KEY
    ? new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : null;

  // Comprehensive Market Roles Dataset (Relational mockup)
  interface RoleRecord {
    id: string;
    title: string;
    industry: string;
    description: string;
    minimumExperience: string;
    minExpYears: number;
    salaryBaseINR: [number, number]; // min, max in LPA (Lakhs Per Annum)
    salaryBaseUSD: [number, number]; // min, max in $K
    salaryBaseEUR: [number, number]; // min, max in €K
    salaryBaseGBP: [number, number]; // min, max in £K
    requiredSkills: { name: string; importance: 'High' | 'Medium' | 'Foundational'; frequency: string; why: string; learning: string }[];
    careerPath: string[];
    sourceName: string;
    sourceUrl: string;
  }

  const MARKET_ROLES: RoleRecord[] = [
    {
      id: "sr-software-engineer",
      title: "Senior Software Engineer",
      industry: "Technology",
      description: "Design, build, and scale core backend and distributed systems while mentoring engineers and driving technical architecture.",
      minimumExperience: "3–5 years",
      minExpYears: 3,
      salaryBaseINR: [14, 24],
      salaryBaseUSD: [130, 185],
      salaryBaseEUR: [90, 130],
      salaryBaseGBP: [80, 115],
      requiredSkills: [
        { name: "Python", importance: "High", frequency: "88%", why: "Powers high-throughput microservices and data pipelines.", learning: "Advanced asynchronous programming, design patterns." },
        { name: "JavaScript", importance: "High", frequency: "85%", why: "Essential for full-stack tooling and API integration.", learning: "TypeScript, Node.js internals, event loops." },
        { name: "SQL", importance: "High", frequency: "92%", why: "Complex relational queries and database query tuning.", learning: "Indexing strategies, query execution plans." },
        { name: "System Design", importance: "High", frequency: "90%", why: "Architecting fault-tolerant, scalable distributed systems.", learning: "CAP theorem, load balancing, caching layers." },
        { name: "AWS", importance: "High", frequency: "84%", why: "Cloud infrastructure provisioning and serverless orchestration.", learning: "ECS, Lambda, RDS, IAM security best practices." },
        { name: "Docker", importance: "Medium", frequency: "78%", why: "Containerization and reproducible deployment artifacts.", learning: "Multi-stage builds, docker-compose orchestration." }
      ],
      careerPath: ["Software Developer", "Backend Developer", "Senior Software Engineer"],
      sourceName: "Aggregated Global Tech Salary Index & State of Engineering 2026",
      sourceUrl: "https://github.com/engineers-salary-data"
    },
    {
      id: "lead-fullstack-engineer",
      title: "Lead Full-Stack Engineer",
      industry: "Technology",
      description: "Own end-to-end product delivery, architecture decisions, and frontend/backend performance across high-growth products.",
      minimumExperience: "5–8 years",
      minExpYears: 5,
      salaryBaseINR: [22, 36],
      salaryBaseUSD: [170, 240],
      salaryBaseEUR: [115, 160],
      salaryBaseGBP: [95, 140],
      requiredSkills: [
        { name: "React", importance: "High", frequency: "94%", why: "Building responsive, reactive component architecture.", learning: "Custom hooks, state management patterns, SSR." },
        { name: "TypeScript", importance: "High", frequency: "91%", why: "Ensuring type safety across client and server boundaries.", learning: "Advanced generics, conditional types." },
        { name: "Node.js", importance: "High", frequency: "86%", why: "High-performance API gateways and microservices.", learning: "Streams, clustering, Express/Fastify optimization." },
        { name: "System Design", importance: "High", frequency: "95%", why: "Guiding system-wide scalability and security standards.", learning: "Distributed transactions, event-driven architecture." },
        { name: "AWS", importance: "High", frequency: "82%", why: "Managing cloud infrastructure and CI/CD pipelines.", learning: "Terraform, Kubernetes, CloudFront caching." },
        { name: "GraphQL", importance: "Medium", frequency: "65%", why: "Efficient client-server data fetching and schema stitching.", learning: "Resolvers, DataLoader batching." }
      ],
      careerPath: ["Software Developer", "Full-Stack Developer", "Lead Full-Stack Engineer"],
      sourceName: "Global Engineering Compensation Report",
      sourceUrl: "https://github.com/tech-comp-benchmark"
    },
    {
      id: "product-manager",
      title: "Product Manager",
      industry: "Product",
      description: "Define product vision, roadmap, and user metrics by collaborating closely with engineering, design, and executive leadership.",
      minimumExperience: "2–5 years",
      minExpYears: 2,
      salaryBaseINR: [15, 28],
      salaryBaseUSD: [120, 175],
      salaryBaseEUR: [85, 125],
      salaryBaseGBP: [75, 110],
      requiredSkills: [
        { name: "SQL", importance: "Medium", frequency: "72%", why: "Self-serve product usage analysis and cohort retention tracking.", learning: "Aggregation functions, cohort retention queries." },
        { name: "Agile", importance: "High", frequency: "96%", why: "Sprint planning, backlog prioritization, and cross-functional syncs.", learning: "User story mapping, velocity metrics." },
        { name: "Roadmapping", importance: "High", frequency: "90%", why: "Structuring long-term strategic initiatives and milestones.", learning: "RICE scoring framework, OKRs formulation." },
        { name: "User Research", importance: "High", frequency: "85%", why: "Conducting customer interviews and usability testing.", learning: "Thematic analysis, survey design." },
        { name: "Wireframing", importance: "Medium", frequency: "68%", why: "Communicating product concepts clearly to designers and developers.", learning: "Figma wireframing principles, user journey flows." }
      ],
      careerPath: ["Product Analyst", "Associate Product Manager", "Product Manager"],
      sourceName: "Product Management Salary Benchmarks & Insights",
      sourceUrl: "https://github.com/pm-salary-data"
    },
    {
      id: "senior-data-scientist",
      title: "Senior Data Scientist",
      industry: "Data & AI",
      description: "Develop predictive models, machine learning pipelines, and advanced statistical analyses to optimize core business levers.",
      minimumExperience: "3–6 years",
      minExpYears: 3,
      salaryBaseINR: [18, 32],
      salaryBaseUSD: [150, 210],
      salaryBaseEUR: [100, 150],
      salaryBaseGBP: [85, 130],
      requiredSkills: [
        { name: "Python", importance: "High", frequency: "98%", why: "Primary language for data manipulation and modeling.", learning: "Pandas, NumPy, scikit-learn optimization." },
        { name: "Machine Learning", importance: "High", frequency: "92%", why: "Training classification, regression, and deep learning models.", learning: "Gradient boosting, feature engineering, model evaluation." },
        { name: "SQL", importance: "High", frequency: "95%", why: "Extracting large-scale datasets from data warehouses.", learning: "Window functions, CTEs, performance tuning." },
        { name: "Statistics", importance: "High", frequency: "88%", why: "A/B testing design, hypothesis testing, and Bayesian inference.", learning: "Power calculation, p-values, confidence intervals." },
        { name: "Pandas", importance: "High", frequency: "90%", why: "Data cleaning, transformation, and exploratory data analysis.", learning: "Vectorized operations, groupby optimizations." }
      ],
      careerPath: ["Data Analyst", "Data Scientist", "Senior Data Scientist"],
      sourceName: "Global AI & Data Science Compensation Survey",
      sourceUrl: "https://github.com/datascience-benchmarks"
    },
    {
      id: "devops-cloud-architect",
      title: "DevOps & Cloud Architect",
      industry: "Infrastructure",
      description: "Architect secure, highly available cloud infrastructure, CI/CD pipelines, and automated monitoring systems.",
      minimumExperience: "4–7 years",
      minExpYears: 4,
      salaryBaseINR: [20, 35],
      salaryBaseUSD: [160, 220],
      salaryBaseEUR: [110, 155],
      salaryBaseGBP: [90, 135],
      requiredSkills: [
        { name: "AWS", importance: "High", frequency: "97%", why: "Primary cloud provider infrastructure management.", learning: "VPC networking, IAM, EKS, CloudFormation." },
        { name: "Docker", importance: "High", frequency: "92%", why: "Container packaging and microservice isolation.", learning: "Image optimization, security scanning." },
        { name: "Kubernetes", importance: "High", frequency: "88%", why: "Container orchestration at scale across clusters.", learning: "Helm charts, ingress controllers, persistent volumes." },
        { name: "Terraform", importance: "High", frequency: "85%", why: "Infrastructure as Code (IaC) version control and provisioning.", learning: "State management, modules, provider configuration." },
        { name: "CI/CD", importance: "High", frequency: "94%", why: "Automated build, test, and zero-downtime deployment pipelines.", learning: "GitHub Actions workflows, ArgoCD." }
      ],
      careerPath: ["Software Developer", "SysAdmin", "DevOps & Cloud Architect"],
      sourceName: "Cloud Infrastructure Salary Benchmark",
      sourceUrl: "https://github.com/devops-salary-index"
    },
    {
      id: "senior-frontend-engineer",
      title: "Senior Frontend Engineer",
      industry: "Technology",
      description: "Build blazing-fast, accessible, and sophisticated web user interfaces with modern React ecosystem tools.",
      minimumExperience: "3–5 years",
      minExpYears: 3,
      salaryBaseINR: [13, 22],
      salaryBaseUSD: [125, 175],
      salaryBaseEUR: [85, 120],
      salaryBaseGBP: [75, 110],
      requiredSkills: [
        { name: "React", importance: "High", frequency: "96%", why: "Core component-driven user interface development.", learning: "Concurrent rendering, custom hooks, performance profiling." },
        { name: "JavaScript", importance: "High", frequency: "94%", why: "Advanced DOM manipulation and browser execution mechanics.", learning: "Closures, prototypes, event delegation." },
        { name: "TypeScript", importance: "High", frequency: "90%", why: "Robust static typing for large React codebases.", learning: "Utility types, type guards, module augmentation." },
        { name: "Tailwind CSS", importance: "Medium", frequency: "78%", why: "Rapid, maintainable utility-first styling systems.", learning: "Design tokens, responsive modifiers, JIT engine." },
        { name: "GraphQL", importance: "Medium", frequency: "60%", why: "Declarative data fetching in modern web apps.", learning: "Apollo client caching, fragment colocation." }
      ],
      careerPath: ["Frontend Developer", "UI Engineer", "Senior Frontend Engineer"],
      sourceName: "Frontend Developer Salary Index",
      sourceUrl: "https://github.com/frontend-salary-data"
    },
    {
      id: "analytics-engineering-lead",
      title: "Analytics Engineering Lead",
      industry: "Data & Analytics",
      description: "Transform raw data lakes into clean, tested, and high-performance analytical models for business intelligence.",
      minimumExperience: "3–6 years",
      minExpYears: 3,
      salaryBaseINR: [16, 28],
      salaryBaseUSD: [135, 190],
      salaryBaseEUR: [90, 135],
      salaryBaseGBP: [80, 120],
      requiredSkills: [
        { name: "SQL", importance: "High", frequency: "99%", why: "Core transformation logic for data warehouses.", learning: "Advanced CTEs, window functions, query performance tuning." },
        { name: "Python", importance: "Medium", frequency: "75%", why: "Scripting custom data ingestion and validation checks.", learning: "Airflow DAGs, pandas data cleansing." },
        { name: "AWS", importance: "Medium", frequency: "65%", why: "Cloud data warehouse administration.", learning: "Redshift, S3 bucket optimization." },
        { name: "Excel", importance: "Medium", frequency: "70%", why: "Financial and operational metric modeling.", learning: "Advanced pivot tables, power query." }
      ],
      careerPath: ["Data Analyst", "Analytics Engineer", "Analytics Engineering Lead"],
      sourceName: "Data Analytics & Engineering Compensation Index",
      sourceUrl: "https://github.com/analytics-eng-salaries"
    }
  ];

  function convertUSDToCurrency(usd: number, currency: string): number {
    switch (currency) {
      case 'INR': return Math.round(usd * 83);
      case 'EUR': return Math.round(usd / 1.08);
      case 'GBP': return Math.round(usd / 1.28);
      case 'USD': default: return Math.round(usd);
    }
  }

  function formatSalary(amount: number, currency: string): string {
    if (currency === 'INR') {
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)} LPA`;
      }
      return `₹${amount.toLocaleString()} LPA`;
    }
    if (currency === 'USD') return `$${amount.toLocaleString()}k/yr`;
    if (currency === 'EUR') return `€${amount.toLocaleString()}k/yr`;
    if (currency === 'GBP') return `£${amount.toLocaleString()}k/yr`;
    return `${amount}`;
  }

  app.post("/api/career/analyze", async (req, res) => {
    try {
      const { currentRole, industry, yearsExperience, currentSalary, currency = 'INR', country, city, remotePreference, skills = [] } = req.body;

      if (!currentRole || currentSalary === undefined) {
        return res.status(400).json({ error: "Missing required profile parameters (currentRole, currentSalary)" });
      }

      const numSalary = Number(currentSalary);
      const userSkillsLower = skills.map((s: string) => s.toLowerCase().trim());

      let expYears = 2;
      if (yearsExperience === '<1') expYears = 0.5;
      else if (yearsExperience === '1–2') expYears = 1.5;
      else if (yearsExperience === '2–4') expYears = 3;
      else if (yearsExperience === '4–7') expYears = 5.5;
      else if (yearsExperience === '7–10') expYears = 8.5;
      else if (yearsExperience === '10+') expYears = 12;
      else if (!isNaN(Number(yearsExperience))) expYears = Number(yearsExperience);

      const evaluatedRoles = MARKET_ROLES.map((role) => {
        let minSalRaw = role.salaryBaseUSD[0] * 1000;
        let maxSalRaw = role.salaryBaseUSD[1] * 1000;
        if (currency === 'INR') {
          minSalRaw = role.salaryBaseINR[0] * 100000;
          maxSalRaw = role.salaryBaseINR[1] * 100000;
        } else {
          minSalRaw = convertUSDToCurrency(role.salaryBaseUSD[0] * 1000, currency);
          maxSalRaw = convertUSDToCurrency(role.salaryBaseUSD[1] * 1000, currency);
        }

        const roleSkills = role.requiredSkills;
        let matchingCount = 0;
        const matchedSkillNames: string[] = [];
        const missingSkillItems: any[] = [];

        roleSkills.forEach((rs) => {
          const hasSkill = userSkillsLower.some((us: string) => us === rs.name.toLowerCase() || us.includes(rs.name.toLowerCase()));
          if (hasSkill) {
            matchingCount++;
            matchedSkillNames.push(rs.name);
          } else {
            missingSkillItems.push({
              skill: rs.name,
              importance: rs.importance,
              status: rs.importance === 'High' ? 'missing' : 'strengthen',
              whyItMatters: rs.why,
              frequency: rs.frequency,
              learningDirection: rs.learning
            });
          }
        });

        const skillScore = roleSkills.length > 0 ? (matchingCount / roleSkills.length) * 60 : 30;
        const expDiff = Math.abs(expYears - role.minExpYears);
        let expScore = 25;
        if (expDiff > 2) expScore = 15;
        else if (expDiff > 4) expScore = 8;

        let transitionScore = 12;
        const roleTitleLower = role.title.toLowerCase();
        const currRoleLower = currentRole.toLowerCase();
        if (currRoleLower.includes('developer') && roleTitleLower.includes('engineer')) transitionScore = 15;
        else if (currRoleLower.includes('analyst') && roleTitleLower.includes('manager')) transitionScore = 13;
        else if (currRoleLower.includes('data') && roleTitleLower.includes('scientist')) transitionScore = 15;
        else if (currRoleLower.includes(role.industry.toLowerCase())) transitionScore = 14;

        const finalMatch = Math.min(96, Math.max(45, Math.round(skillScore + expScore + transitionScore)));
        const diffMin = Math.max(0, minSalRaw - numSalary);
        const diffMax = Math.max(0, maxSalRaw - numSalary);

        return {
          id: role.id,
          title: role.title,
          industry: role.industry,
          description: role.description,
          minimumExperience: role.minimumExperience,
          typicalSalaryMin: minSalRaw,
          typicalSalaryMax: maxSalRaw,
          currency: currency,
          matchPercentage: finalMatch,
          salaryDifferenceMin: diffMin,
          salaryDifferenceMax: diffMax,
          matchingSkills: matchedSkillNames,
          missingSkills: missingSkillItems,
          experienceCompatibility: expDiff <= 2 ? 'Highly Compatible' : 'Moderate Gap',
          explanation: `With your background in ${currentRole} and ${yearsExperience} experience, transitioning to ${role.title} leverages your foundation in ${matchedSkillNames.slice(0, 2).join(', ') || 'core fundamentals'} while unlocking higher market compensation.`,
          careerPath: role.careerPath,
          dataSource: {
            sourceName: role.sourceName,
            sourceUrl: role.sourceUrl,
            collectedAt: "2026-03-01",
            isEstimate: true
          }
        };
      });

      evaluatedRoles.sort((a, b) => b.matchPercentage - a.matchPercentage);
      const recommendedRoles = evaluatedRoles.slice(0, 4);

      const avgMatch = recommendedRoles.length > 0
        ? Math.round(recommendedRoles.reduce((acc, r) => acc + r.matchPercentage, 0) / recommendedRoles.length)
        : 72;

      let overallSummary = `You already have a strong foundation in ${skills.slice(0, 3).join(', ') || 'your core stack'}. CareerOS identified ${recommendedRoles.length} realistic higher-paying roles matching your trajectory with high transition compatibility.`;

      if (ai) {
        try {
          const geminiRes = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `Provide a 2-sentence encouraging professional career insight for a professional currently working as a ${currentRole} with ${yearsExperience} experience, earning ${numSalary} ${currency}, skilled in ${skills.join(', ')}. Target roles include ${recommendedRoles.map(r => r.title).join(', ')}. Keep it concise, intelligent, and motivating.`,
            config: {
              systemInstruction: "You are CareerOS career intelligence AI. Provide concise, professional, data-backed career progression insights.",
            }
          });
          if (geminiRes.text) {
            overallSummary = geminiRes.text.trim();
          }
        } catch (e) {
          console.error("Gemini enhancement fallback used:", e);
        }
      }

      const responsePayload = {
        userSummary: {
          currentRole,
          industry,
          experience: yearsExperience,
          salaryFormatted: formatSalary(numSalary, currency),
          currency,
        },
        overallDistanceScore: avgMatch,
        overallSummary,
        recommendedRoles,
        analyzedAt: new Date().toISOString()
      };

      res.json(responsePayload);
    } catch (error: any) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: error.message || "Internal server error during career analysis." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CareerOS Server running on http://localhost:${PORT}`);
  });
}

startServer();
