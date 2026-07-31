import { LocaleText } from "./portfolio/LocaleText";
import { ProjectGrid } from "./portfolio/ProjectGrid";
import { SiteControls } from "./portfolio/SiteControls";

const projects = [
  {
    number: "01",
    title: "Image2Studio",
    type: { en: "Live product", zh: "在线产品" },
    summary: {
      en: "A workspace for shaping GPT Image 2 prompts into reusable visual scenes.",
      zh: "面向 GPT Image 2 的提示词与视觉场景工作区。",
    },
    detail: {
      en: "It brings practical prompt patterns and production-oriented image direction into one evolving library.",
      zh: "它把可复用的提示词模式和面向实际创作的画面方向沉淀为持续更新的素材库。",
    },
    focus: { en: "GPT Image 2 · Scene design · Prompt library", zh: "GPT Image 2 · 场景设计 · 提示词库" },
    href: "https://image2studio.com/",
    details: {
      overview: {
        en: "The product runs a complete image-generation path, from account access and credits to asynchronous jobs and stored results.",
        zh: "产品覆盖从账户与点数，到异步图像任务与结果存储的一整条生成链路。",
      },
      highlights: [
        {
          en: "A separate Control app keeps operational workflows distinct from the customer-facing product.",
          zh: "独立的 Control 应用承载运营流程，与面向用户的产品界面分开管理。",
        },
        {
          en: "Image jobs reserve credits, run through a queue, and commit or refund that reservation when processing ends.",
          zh: "图像任务会预留点数、经由队列处理，并在结束后完成扣减或退款。",
        },
        {
          en: "The production stack combines Cloudflare Workers, D1, R2, Queues, Hono, and a React web app.",
          zh: "生产技术栈结合 Cloudflare Workers、D1、R2、Queues、Hono 与 React Web 应用。",
        },
      ],
      resource: {
        href: "https://image2studio.com/",
        label: { en: "Open Image2Studio", zh: "打开 Image2Studio" },
      },
    },
  },
  {
    number: "02",
    title: "ChatLLM-Web",
    type: { en: "Open source", zh: "开源项目" },
    summary: {
      en: "A private LLM chat experience that runs directly in the browser with WebGPU.",
      zh: "一个基于 WebGPU、直接运行在浏览器中的私有 LLM 对话体验。",
    },
    detail: {
      en: "It explores a simpler path for working with language models on personal devices.",
      zh: "它探索了在个人设备上使用语言模型的更轻量路径。",
    },
    focus: { en: "WebGPU · In-browser inference · JavaScript", zh: "WebGPU · 浏览器推理 · JavaScript" },
    href: "https://github.com/Ryan-yang125/ChatLLM-Web",
    details: {
      overview: {
        en: "A private chat experience powered by WebGPU and web-llm, with inference and conversation data kept in the browser.",
        zh: "由 WebGPU 与 web-llm 驱动的私有聊天体验，推理与会话数据都留在浏览器中。",
      },
      highlights: [
        {
          en: "The model runs in a Web Worker so chat interactions can remain responsive.",
          zh: "模型运行在 Web Worker 中，让聊天交互保持流畅。",
        },
        {
          en: "Models are cached after their first download, while multi-conversation data stays in browser storage.",
          zh: "模型首次下载后会被缓存，多会话数据则保存在浏览器存储中。",
        },
        {
          en: "Streaming Markdown, responsive dark UI, and an offline PWA make it usable as a self-contained app.",
          zh: "流式 Markdown、响应式深色界面与离线 PWA 让它成为完整的独立应用。",
        },
      ],
      resource: {
        href: "https://github.com/Ryan-yang125/ChatLLM-Web#readme",
        label: { en: "Read the README", zh: "查看 README" },
      },
    },
  },
  {
    number: "03",
    title: "DropHere",
    type: { en: "Developer tool", zh: "开发者工具" },
    summary: {
      en: "A small publishing tool for turning static output from an agent session into a public site.",
      zh: "将 Agent 会话中的静态产物发布为公开网站的小型工具。",
    },
    detail: {
      en: "It keeps the handoff from local work to a shareable URL direct and deliberate.",
      zh: "它让本地工作交付到可分享链接的过程更直接、更清晰。",
    },
    focus: { en: "Agent workflow · Static publishing · TypeScript", zh: "Agent 工作流 · 静态发布 · TypeScript" },
    href: "https://github.com/Ryan-yang125/drophere",
    details: {
      overview: {
        en: "A free Agent Skill and CLI for publishing the static output that comes out of an AI coding-agent session.",
        zh: "面向 AI 编程 Agent 会话静态产物的免费发布 Skill 与 CLI。",
      },
      highlights: [
        {
          en: "It detects generated static output, scans the public upload boundary, and can return a temporary URL without account credentials.",
          zh: "它识别生成后的静态产物、检查公开上传边界，并可在无账号凭据时返回临时 URL。",
        },
        {
          en: "After sign-in, a temporary project can be claimed and moved to a permanent subdomain.",
          zh: "登录后，临时项目可以被认领并迁移到永久子域名。",
        },
        {
          en: "React, Vue, Svelte, Astro, Vite, static Next exports, and plain index.html folders are all supported.",
          zh: "支持 React、Vue、Svelte、Astro、Vite、Next 静态导出以及含 index.html 的纯前端目录。",
        },
      ],
      resource: {
        href: "https://github.com/Ryan-yang125/drophere#readme",
        label: { en: "Read the README", zh: "查看 README" },
      },
    },
  },
  {
    number: "04",
    title: "CheckHere",
    type: { en: "Release workflow", zh: "发布检查" },
    summary: {
      en: "A focused browser-check workflow for AI-built websites.",
      zh: "面向 AI 构建网站的聚焦式浏览器检查工作流。",
    },
    detail: {
      en: "It turns a target URL into concrete feedback and a shareable review record before release.",
      zh: "它将目标 URL 转化为具体反馈与可分享的评审记录，支持发布前核对。",
    },
    focus: { en: "Browser checks · Website review · Release readiness", zh: "浏览器检查 · 网站评审 · 发布准备" },
    href: "https://github.com/Ryan-yang125/checkhere",
    details: {
      overview: {
        en: "A local-first release check that opens a local or deployed site in Playwright Chromium and keeps every report on the machine.",
        zh: "本地优先的发布检查工具，使用 Playwright Chromium 打开本地或线上站点，并将全部报告保留在本机。",
      },
      highlights: [
        {
          en: "It captures desktop and mobile evidence while checking HTTP, page, console, asset, and overflow failures.",
          zh: "它保留桌面与移动端证据，同时检查 HTTP、页面、控制台、静态资源与横向溢出问题。",
        },
        {
          en: "SEO metadata, structured data, and Lighthouse performance, accessibility, and UX metrics are included in the audit.",
          zh: "审计覆盖 SEO 元数据、结构化数据，以及 Lighthouse 的性能、无障碍与体验指标。",
        },
        {
          en: "A single report object renders HTML, Markdown, and JSON, while the CI command can act as a release gate.",
          zh: "同一份报告对象可输出 HTML、Markdown 与 JSON，CI 命令还能充当发布门禁。",
        },
      ],
      resource: {
        href: "https://github.com/Ryan-yang125/checkhere#readme",
        label: { en: "Read the README", zh: "查看 README" },
      },
    },
  },
  {
    number: "05",
    title: "Skill Manager",
    type: { en: "Open source", zh: "开源项目" },
    summary: {
      en: "A utility for inspecting and organizing Agent Skills across local environments.",
      zh: "用于检查和整理本地多个环境中 Agent Skills 的工具。",
    },
    detail: {
      en: "It makes reusable instructions easier to maintain, discover, and share with confidence.",
      zh: "它让可复用的指令更易维护、发现与分享。",
    },
    focus: { en: "Skill inventory · Local sync · Safe maintenance", zh: "技能清单 · 本地同步 · 安全维护" },
    href: "https://github.com/Ryan-yang125/skill-manager",
    details: {
      overview: {
        en: "An evidence-backed local inventory for Agent Skills, designed to make inspection and cleanup safe to review.",
        zh: "基于本地证据的 Agent Skills 清单工具，让检查与整理都能被清晰复核。",
      },
      highlights: [
        {
          en: "It records each skill’s source, root, catalog-context estimate, and local Codex or Claude usage evidence.",
          zh: "它记录每个 Skill 的来源、路径、目录上下文估算，以及本地 Codex 或 Claude 使用证据。",
        },
        {
          en: "Evidence is surfaced as observed, no_evidence, or unknown so a recommendation carries its uncertainty with it.",
          zh: "证据会以 observed、no_evidence 与 unknown 呈现，让每个建议都附带清晰的确定性。",
        },
        {
          en: "Archive and restore preserve a durable ledger and guard the original path; the audit itself is read-only.",
          zh: "归档与还原保留持久账本并保护原始路径，审计操作本身保持只读。",
        },
      ],
      resource: {
        href: "https://github.com/Ryan-yang125/skill-manager#readme",
        label: { en: "Read the README", zh: "查看 README" },
      },
    },
  },
  {
    number: "06",
    title: "Motion Lexicon",
    type: { en: "Design reference", zh: "设计参考" },
    summary: {
      en: "A visual reference for recurring interaction and motion patterns.",
      zh: "一个汇集常见交互与动效模式的视觉参考库。",
    },
    detail: {
      en: "Bilingual recipes connect a movement’s visual language with its product intent and implementation cues.",
      zh: "双语条目将动效的视觉语言、产品意图与实现线索连接起来。",
    },
    focus: { en: "Interaction motion · Bilingual recipes · UI patterns", zh: "交互动效 · 双语配方 · UI 模式" },
    href: "https://github.com/Ryan-yang125/motion-lexicon",
    details: {
      overview: {
        en: "A visual motion finder that turns a loose interaction feeling into a precise, copy-ready recipe.",
        zh: "将模糊交互感觉转化为精确、可复制动效方案的可视化工具。",
      },
      highlights: [
        {
          en: "Describe the motion in Chinese or English, choose from three ranked candidates, then tune and replay the selected result.",
          zh: "用中文或英文描述动效，从三个排序候选中选择，再调整并重播最终方案。",
        },
        {
          en: "Each recipe connects a live preview with parameters, agent-ready prompts, and portable HTML, CSS, and JavaScript.",
          zh: "每个方案把实时预览、参数、适合 Agent 的 Prompt 与可移植 HTML、CSS、JavaScript 连接在一起。",
        },
        {
          en: "The library includes 44 curated workspaces, 91 bilingual terms, stable URLs, a CLI, and versioned data for agents.",
          zh: "动效库包含 44 张精选工作台、91 个双语术语、稳定 URL、CLI 与供 Agent 使用的版本化数据。",
        },
      ],
      resource: {
        href: "https://github.com/Ryan-yang125/motion-lexicon#readme",
        label: { en: "Read the README", zh: "查看 README" },
      },
    },
  },
] as const;

export default function Portfolio() {
  return (
    <main className="site-shell">
      <div className="site-panel">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Ryan Yang home">
            RYAN YANG<span aria-hidden="true">.</span>
          </a>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#work"><LocaleText copy={{ en: "Work", zh: "项目" }} /></a>
            <a href="https://github.com/Ryan-yang125" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
          <SiteControls />
        </header>

        <section className="hero" id="top" aria-labelledby="site-title">
          <p className="eyebrow"><LocaleText copy={{ en: "Independent developer · Shanghai", zh: "独立开发者 · 上海" }} /></p>
          <h1 id="site-title">
            <LocaleText copy={{
              en: <>Building useful tools<br />for intelligent work.</>,
              zh: <>为智能工作<br />打造有用的工具。</>,
            }} />
          </h1>
          <div className="hero-lower">
            <p>
              <LocaleText copy={{
                en: "Ryan Yang creates focused AI products, developer tools, and experiments that make new capabilities easier to use.",
                zh: "Ryan Yang 专注于构建 AI 产品、开发者工具与实验项目，让新能力更容易被真正使用。",
              }} />
            </p>
            <a className="text-link" href="#work">
              <LocaleText copy={{ en: "Selected work", zh: "查看项目" }} /> <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><LocaleText copy={{ en: "Selected work", zh: "精选作品" }} /></p>
              <h2 id="work-title"><LocaleText copy={{ en: "Selected projects.", zh: "项目一览。" }} /></h2>
            </div>
            <p className="project-count" aria-label={`${projects.length} projects`}>
              0{projects.length}
            </p>
          </div>

          <ProjectGrid projects={projects} />
        </section>

        <footer className="site-footer">
          <p><LocaleText copy={{ en: "© 2026 Ryan Yang", zh: "© 2026 Ryan Yang" }} /></p>
          <div>
            <a href="mailto:ruiyang0012@gmail.com">Email</a>
            <a href="https://github.com/Ryan-yang125" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
