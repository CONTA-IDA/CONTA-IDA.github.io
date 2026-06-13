const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const languageSelect = document.querySelector("[data-lang-select]");
const terminalBootElements = [...document.querySelectorAll(".boot-ready, .boot-log, .boot-greeting")];
const orbitNodes = [...document.querySelectorAll(".orbit-node")];

const storage = {
  get(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Preferences are optional for static hosting. */
    }
  },
};

const translations = {
  ko: {
    navAbout: "소개",
    navProjects: "프로젝트",
    navSetup: "셋업",
    navBlog: "로그",
    navContact: "연락",
    themeDark: "다크",
    themeLight: "라이트",
    footerContact: "연락",
    footerHome: "홈",
    actionProjects: "프로젝트 보기",
    actionAbout: "소개 보기",
    actionSetup: "셋업 보기",
    actionGithub: "GitHub로 연락",
    actionProton: "Proton Mail로 연락",
    homeEyebrow: "Reverse Engineering / Tooling / Game Revival",
    homeLede:
      "바이너리 동작을 추적하고, 분석 도구를 만들며, 사라진 게임의 조작감과 구조를 클린룸 방식으로 재구현합니다.",
    homeFocusTooling: "Python 자동화",
    homeFocusPrototype: "레거시 게임 프로토타입",
    terminalTitle: "analysis session",
    aboutKicker: "소개",
    aboutTitle: "분석하고, 만들고, 다시 구현합니다.",
    aboutInterestTitle: "관심사",
    aboutP1:
      "리버스 엔지니어링으로 프로그램의 동작 방식을 추적하고, 분석 과정에서 필요한 스크립트와 작은 도구를 직접 만듭니다.",
    aboutP2:
      "IDA Pro, Ghidra 같은 분석 도구와 Python 자동화, 시각화 프로토타입, 레거시 게임 재구현 실험을 함께 다룹니다.",
    stackKicker: "스택",
    stackTitle: "분석과 제작을 오가는 구조를 선호합니다.",
    stackReverse: "IDA Pro, Ghidra, x64dbg, 바이너리 분석 노트",
    stackDevelop: "Python 자동화, C/C++, JavaScript, Git, 문서화",
    stackModel: "Blender, 대체 에셋 제작, 프로토타입 모델링, 레거시 게임 재구현",
    workflowKicker: "워크플로우",
    workflowTitle: "분석에서 재구현까지 이어지는 흐름",
    workflowTrace: "동작을 관찰하고 함수 흐름, 문자열, 상태 변화를 기록합니다.",
    workflowAutomate: "반복 분석은 스크립트와 작은 CLI 도구로 줄입니다.",
    workflowRebuild: "핵심 규칙과 조작감을 직접 구현해 프로토타입으로 검증합니다.",
    workflowModel:
      "원본 리소스에 의존하지 않고 클라이언트 기반 프로토타입에 필요한 대체 에셋과 표현을 설계합니다.",
    projectsKicker: "Reverse / Tooling / Revival",
    projectsTitle: "프로젝트",
    projectsLede: "분석 노트, 자동화 도구, 레거시 게임 재구현 실험의 흐름과 결과를 정리합니다.",
    projectMetaReverse: "Reverse",
    projectMetaDevelopment: "Development",
    projectMetaTooling: "Tooling",
    projectMetaRevival: "Game Revival",
    projectMetaPrototype: "Prototype",
    projectBinaryTitle: "Binary Analysis Lab",
    projectBinaryText: "바이너리의 함수 흐름, 문자열, 상태 변화를 추적해 핵심 지점을 재현 가능한 분석 노트로 정리합니다.",
    projectBinaryMethod: "IDA Pro와 Ghidra로 call graph, xref, decompile view를 대조합니다.",
    projectBinaryArtifact: "함수 메모, 구조 추정, 민감 정보를 제거한 재현 기록",
    projectToolingTitle: "Reverse Tooling Scripts",
    projectToolingText: "반복되는 분석 작업을 줄이기 위해 Python 스크립트와 작은 CLI 도구를 만듭니다.",
    projectToolingMethod: "파일 파싱, 문자열 추출, 패턴 검색, 결과 정리 과정을 자동화합니다.",
    projectToolingArtifact: "재사용 가능한 스크립트, 명령어 예시, 분석 로그 템플릿",
    projectBubbleTitle: "Client-Side Game Revival Lab",
    projectBubbleText:
      "서비스가 종료된 게임의 클라이언트 동작을 분석해 서버 데이터와 원본 리소스 없이 조작감, 규칙, 전투 흐름을 클린룸 방식으로 재구현합니다.",
    projectBubbleMethod:
      "IDA/Ghidra로 클라이언트의 입력, 판정, 카메라, 통신 흐름을 추적해 작은 시스템으로 옮깁니다.",
    projectBubbleArtifact: "클라이언트 기반 프로토타입, 대체 에셋, 동작 추정 노트",
    labelMethod: "방식",
    labelArtifact: "산출물",
    setupKicker: "작업 환경",
    setupTitle: "셋업",
    setupLede: "리버스 엔지니어링, 도구 개발, 프로토타입 제작에 쓰는 메인 데스크톱과 보조 Mac 장비들을 정리했습니다.",
    setupMain: "메인 PC",
    setupSubMac: "보조 Mac",
    setupSubLaptop: "보조 노트북",
    setupDesktop: "데스크톱",
    setupMobile: "휴대용",
    labelMemory: "메모리",
    labelStorage: "저장공간",
    labelChip: "칩",
    labelUse: "용도",
    setupMainUse: "Windows RE 랩, IDA/Ghidra/x64dbg, Blender 프로토타입 작업",
    setupMiniUse: "macOS 테스트, 문서화, 가벼운 도구 개발",
    setupLaptopUse: "이동 중 분석 노트, 빌드 확인, 리서치 작업공간",
    contactKicker: "연락",
    contactTitle: "의견을 보내주세요",
    contactLede:
      "리버스 엔지니어링, 분석 자동화, 레거시 게임 재구현에 대한 의견은 GitHub 또는 Proton Mail로 보내 주세요.",
    blogKicker: "Work Log",
    blogTitle: "작업 로그",
    blogLede:
      "CONTA가 남기는 개인 작업 기록입니다. 리버싱 과정, 대체 에셋 제작, 프로토타입 진행 상황을 글과 이미지, 영상으로 정리합니다.",
    blogLoading: "작업 로그를 불러오는 중입니다.",
    blogEmpty: "아직 공개된 작업 로그가 없습니다.",
    blogLoadError: "작업 로그를 불러오지 못했습니다.",
  },
  en: {
    navAbout: "About",
    navProjects: "Projects",
    navSetup: "Setup",
    navBlog: "Log",
    navContact: "Contact",
    themeDark: "Dark",
    themeLight: "Light",
    footerContact: "Contact",
    footerHome: "Home",
    actionProjects: "View projects",
    actionAbout: "About",
    actionSetup: "Setup",
    actionGithub: "Contact on GitHub",
    actionProton: "Contact by Proton Mail",
    homeEyebrow: "Reverse Engineering / Tooling / Game Revival",
    homeLede:
      "I trace binary behavior, build analysis tools, and recreate discontinued game systems through clean-room prototypes.",
    homeFocusTooling: "Python automation",
    homeFocusPrototype: "Legacy game prototype",
    terminalTitle: "analysis session",
    aboutKicker: "About",
    aboutTitle: "Analyze, build, and recreate.",
    aboutInterestTitle: "Focus",
    aboutP1:
      "I use reverse engineering to trace how software behaves, then build the scripts and small tools needed to make analysis repeatable.",
    aboutP2:
      "My work connects IDA Pro, Ghidra, Python automation, visual prototypes, and experiments in recreating legacy game systems.",
    stackKicker: "Stack",
    stackTitle: "I like workflows that move between analysis and making.",
    stackReverse: "IDA Pro, Ghidra, x64dbg, binary analysis notes",
    stackDevelop: "Python automation, C/C++, JavaScript, Git, documentation",
    stackModel: "Blender, replacement assets, prototype modeling, legacy game recreation",
    workflowKicker: "Workflow",
    workflowTitle: "From analysis to reconstruction",
    workflowTrace: "Observe behavior and document function flow, strings, and state changes.",
    workflowAutomate: "Reduce repeated analysis with scripts and small CLI tools.",
    workflowRebuild: "Implement core rules and game feel as testable prototypes.",
    workflowModel:
      "Design replacement assets and presentation for client-based prototypes without relying on original resources.",
    projectsKicker: "Reverse / Tooling / Revival",
    projectsTitle: "Projects",
    projectsLede: "Analysis notes, automation tools, and clean-room experiments for legacy game systems.",
    projectMetaReverse: "Reverse",
    projectMetaDevelopment: "Development",
    projectMetaTooling: "Tooling",
    projectMetaRevival: "Game Revival",
    projectMetaPrototype: "Prototype",
    projectBinaryTitle: "Binary Analysis Lab",
    projectBinaryText: "I trace function flow, strings, and state changes in binaries, then turn key findings into reproducible notes.",
    projectBinaryMethod: "Compare call graphs, xrefs, and decompiled views in IDA Pro and Ghidra.",
    projectBinaryArtifact: "Function notes, structure guesses, and sanitized reproduction notes",
    projectToolingTitle: "Reverse Tooling Scripts",
    projectToolingText: "Small Python scripts and CLI tools for reducing repetitive analysis work.",
    projectToolingMethod: "Automate file parsing, string extraction, pattern searches, and result formatting.",
    projectToolingArtifact: "Reusable scripts, command examples, and analysis log templates",
    projectBubbleTitle: "Client-Side Game Revival Lab",
    projectBubbleText:
      "A clean-room recreation project that studies discontinued game clients and rebuilds controls, rules, and combat flow without server data or original resources.",
    projectBubbleMethod:
      "Trace client-side input, hit detection, camera, and network flow with IDA/Ghidra, then rebuild the behavior as small systems.",
    projectBubbleArtifact: "Client-based prototypes, replacement assets, and behavior notes",
    labelMethod: "Method",
    labelArtifact: "Artifact",
    setupKicker: "Workspace",
    setupTitle: "Setup",
    setupLede: "A quick look at the main desktop and Mac machines I use for reverse engineering, tooling, and prototype work.",
    setupMain: "Main PC",
    setupSubMac: "Secondary Mac",
    setupSubLaptop: "Secondary Laptop",
    setupDesktop: "Desktop",
    setupMobile: "Mobile",
    labelMemory: "Memory",
    labelStorage: "Storage",
    labelChip: "Chip",
    labelUse: "Use",
    setupMainUse: "Windows RE lab, IDA/Ghidra/x64dbg, Blender prototype work",
    setupMiniUse: "macOS testing, documentation, lightweight tooling",
    setupLaptopUse: "Portable analysis notes, build checks, and research workspace",
    contactKicker: "Contact",
    contactTitle: "Send feedback",
    contactLede:
      "For feedback on reverse engineering, analysis automation, or legacy game recreation, contact me on GitHub or Proton Mail.",
    blogKicker: "Work Log",
    blogTitle: "Work log",
    blogLede:
      "A public work log by CONTA, covering reverse engineering, asset work, and prototype progress through writing, images, and videos.",
    blogLoading: "Loading work logs.",
    blogEmpty: "No public work logs yet.",
    blogLoadError: "Could not load work logs.",
  },
  zh: {
    navAbout: "介绍",
    navProjects: "项目",
    navSetup: "设备",
    navBlog: "日志",
    navContact: "联系",
    themeDark: "深色",
    themeLight: "浅色",
    footerContact: "联系",
    footerHome: "首页",
    actionProjects: "查看项目",
    actionAbout: "查看介绍",
    actionSetup: "查看设备",
    actionGithub: "通过 GitHub 联系",
    actionProton: "通过 Proton Mail 联系",
    homeEyebrow: "逆向工程 / 工具开发 / 游戏复现",
    homeLede: "我追踪二进制行为，编写分析工具，并用净室原型复现停服游戏的手感和结构。",
    homeFocusTooling: "Python 自动化",
    homeFocusPrototype: "老游戏原型",
    terminalTitle: "分析会话",
    aboutKicker: "介绍",
    aboutTitle: "分析，构建，再复现。",
    aboutInterestTitle: "关注方向",
    aboutP1: "我通过逆向工程追踪软件的运行方式，并把分析过程中需要的脚本和小工具做成可复用的流程。",
    aboutP2: "我的工作涵盖 IDA Pro、Ghidra、Python 自动化、可视化原型，以及老游戏系统复现实验。",
    stackKicker: "技术栈",
    stackTitle: "我喜欢在分析和制作之间来回推进的工作方式。",
    stackReverse: "IDA Pro、Ghidra、x64dbg、二进制分析笔记",
    stackDevelop: "Python 自动化、C/C++、JavaScript、Git、文档整理",
    stackModel: "Blender、替代资源制作、原型建模、老游戏复现",
    workflowKicker: "流程",
    workflowTitle: "从分析到复现",
    workflowTrace: "观察行为，并记录函数流、字符串和状态变化。",
    workflowAutomate: "用脚本和小型 CLI 工具减少重复分析。",
    workflowRebuild: "把核心规则和操作手感做成可验证的原型。",
    workflowModel: "不依赖原始资源，为基于客户端的原型设计替代资源和表现方式。",
    projectsKicker: "Reverse / Tooling / Revival",
    projectsTitle: "项目",
    projectsLede: "这里整理分析笔记、自动化工具，以及老游戏系统的净室复现实验。",
    projectMetaReverse: "逆向",
    projectMetaDevelopment: "开发",
    projectMetaTooling: "工具",
    projectMetaRevival: "游戏复现",
    projectMetaPrototype: "原型",
    projectBinaryTitle: "二进制分析实验室",
    projectBinaryText: "追踪二进制中的函数流程、字符串和状态变化，并把关键点整理成可复现的分析笔记。",
    projectBinaryMethod: "在 IDA Pro 和 Ghidra 中对照 call graph、xref 和反编译视图。",
    projectBinaryArtifact: "函数笔记、结构推测、脱敏复现记录",
    projectToolingTitle: "逆向分析脚本",
    projectToolingText: "用 Python 脚本和小型 CLI 工具减少重复分析工作。",
    projectToolingMethod: "自动化文件解析、字符串提取、模式搜索和结果整理。",
    projectToolingArtifact: "可复用脚本、命令示例和分析日志模板",
    projectBubbleTitle: "客户端游戏复现实验室",
    projectBubbleText:
      "通过分析已停服游戏的客户端行为，在没有服务器数据和原始资源的情况下，以净室方式复现操作手感、规则和战斗流程。",
    projectBubbleMethod:
      "用 IDA/Ghidra 跟踪客户端的输入、判定、相机和通信流程，再拆成小系统重建。",
    projectBubbleArtifact: "客户端原型、替代资源、行为推测记录",
    labelMethod: "方法",
    labelArtifact: "产出",
    setupKicker: "工作环境",
    setupTitle: "设备",
    setupLede: "这里整理用于逆向工程、工具开发和原型制作的主力台式机与 Mac 设备。",
    setupMain: "主力 PC",
    setupSubMac: "备用 Mac",
    setupSubLaptop: "备用笔记本",
    setupDesktop: "台式机",
    setupMobile: "移动设备",
    labelMemory: "内存",
    labelStorage: "存储",
    labelChip: "芯片",
    labelUse: "用途",
    setupMainUse: "Windows 逆向实验室、IDA/Ghidra/x64dbg、Blender 原型制作",
    setupMiniUse: "macOS 测试、文档整理、轻量工具开发",
    setupLaptopUse: "移动分析笔记、构建检查和研究工作区",
    contactKicker: "联系",
    contactTitle: "发送你的想法",
    contactLede: "如果你对逆向工程、分析自动化或老游戏复现有建议，可以通过 GitHub 或 Proton Mail 联系我。",
    blogKicker: "Work Log",
    blogTitle: "工作日志",
    blogLede: "CONTA 的个人工作日志，用文字、图片和视频记录逆向过程、资源制作和原型进展。",
    blogLoading: "正在加载工作日志。",
    blogEmpty: "还没有公开工作日志。",
    blogLoadError: "无法加载工作日志。",
  },
};

const pageMeta = {
  ko: {
    home: {
      title: "CONTA | Reverse Engineering & Development",
      description: "CONTA의 리버스 엔지니어링, 도구 개발, 레거시 게임 재구현 포트폴리오입니다.",
    },
    about: {
      title: "소개 | CONTA",
      description: "CONTA의 소개. 리버스 엔지니어링, 개발, 레거시 게임 재구현에 관심을 둔 포트폴리오입니다.",
    },
    projects: {
      title: "프로젝트 | CONTA",
      description: "CONTA의 리버스 엔지니어링, 도구 개발, 레거시 게임 재구현 프로젝트 목록입니다.",
    },
    setup: {
      title: "셋업 | CONTA",
      description: "CONTA의 작업 환경과 컴퓨터 사양. Main PC, Mac mini, MacBook Pro 구성을 정리합니다.",
    },
    blog: {
      title: "작업 로그 | CONTA",
      description: "CONTA가 직접 남기는 리버스 엔지니어링, 대체 에셋, 프로토타입 작업 로그입니다.",
    },
    contact: {
      title: "연락 | CONTA",
      description: "CONTA와 연결할 수 있는 GitHub와 Proton Mail 연락 페이지입니다.",
    },
  },
  en: {
    home: {
      title: "CONTA | Reverse Engineering & Development",
      description: "CONTA's portfolio for reverse engineering, tooling, and legacy game recreation.",
    },
    about: {
      title: "About | CONTA",
      description: "About CONTA's reverse engineering, development, and legacy game recreation work.",
    },
    projects: {
      title: "Projects | CONTA",
      description: "Reverse engineering, tooling, and legacy game recreation projects by CONTA.",
    },
    setup: {
      title: "Setup | CONTA",
      description: "CONTA's workstation and Mac setup for analysis, tooling, and prototypes.",
    },
    blog: {
      title: "Work Log | CONTA",
      description: "CONTA's personal work log for reverse engineering, asset work, and prototypes.",
    },
    contact: {
      title: "Contact | CONTA",
      description: "GitHub and Proton Mail contact direction for CONTA.",
    },
  },
  zh: {
    home: {
      title: "CONTA | 逆向工程与开发",
      description: "CONTA 的逆向工程、工具开发和老游戏复现作品集。",
    },
    about: {
      title: "介绍 | CONTA",
      description: "CONTA 的逆向工程、开发和老游戏复现方向介绍。",
    },
    projects: {
      title: "项目 | CONTA",
      description: "CONTA 的逆向工程、工具开发和老游戏复现项目。",
    },
    setup: {
      title: "设备 | CONTA",
      description: "CONTA 用于分析、工具开发和原型制作的工作环境。",
    },
    blog: {
      title: "工作日志 | CONTA",
      description: "CONTA 的逆向工程、替代资源和原型制作工作日志。",
    },
    contact: {
      title: "联系 | CONTA",
      description: "CONTA 的 GitHub 与 Proton Mail 联系页面。",
    },
  },
};

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navLinks.forEach((link) => {
  link.classList.toggle("is-active", link.dataset.nav === document.body.dataset.page);
});

const getCurrentLanguage = () => storage.get("conta-language", "ko");
const getCurrentTheme = () => storage.get("conta-theme", "dark");

const applyLanguage = (language) => {
  const nextLanguage = translations[language] ? language : "ko";
  const dictionary = translations[nextLanguage];

  document.documentElement.lang = nextLanguage === "zh" ? "zh-Hans" : nextLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dictionary[key]) {
      element.setAttribute("placeholder", dictionary[key]);
    }
  });

  const page = document.body.dataset.page || "home";
  const meta = pageMeta[nextLanguage]?.[page];
  if (meta) {
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", meta.description);
    }
  }

  if (languageSelect) {
    languageSelect.value = nextLanguage;
  }

  storage.set("conta-language", nextLanguage);
  updateThemeLabel();
};

const applyTheme = (theme) => {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(nextTheme === "light"));
  }

  storage.set("conta-theme", nextTheme);
  updateThemeLabel();
};

function updateThemeLabel() {
  if (!themeLabel) return;
  const dictionary = translations[getCurrentLanguage()] || translations.ko;
  const theme = document.documentElement.dataset.theme || getCurrentTheme();
  themeLabel.textContent = theme === "light" ? dictionary.themeLight : dictionary.themeDark;
}

applyTheme(getCurrentTheme());
applyLanguage(getCurrentLanguage());

const restartTerminalBoot = () => {
  terminalBootElements.forEach((element) => {
    element.style.animation = "none";
  });

  void document.body.offsetHeight;

  terminalBootElements.forEach((element) => {
    element.style.animation = "";
  });
};

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    restartTerminalBoot();
  }
});

const startSyncedOrbit = () => {
  if (!orbitNodes.length) return;

  const duration = 16000;
  const fullCircle = Math.PI * 2;
  const spacing = fullCircle / orbitNodes.length;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const getRadius = () => Math.min(214, Math.max(160, window.innerWidth * 0.26));

  const render = (time = 0) => {
    const radius = getRadius();
    const baseAngle = prefersReducedMotion.matches ? -Math.PI / 2 : (time % duration) / duration * fullCircle;

    orbitNodes.forEach((node, index) => {
      const angle = baseAngle + spacing * index;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      node.style.transform = `translate(-50%, -50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
      node.style.zIndex = y >= 0 ? "5" : "1";
    });

    if (!prefersReducedMotion.matches) {
      requestAnimationFrame(render);
    }
  };

  render(0);
};

startSyncedOrbit();

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme || "dark";
  applyTheme(currentTheme === "light" ? "dark" : "light");
});

languageSelect?.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
  updateBlogEmptyText();
});

const postFeed = document.querySelector("[data-post-feed]");

function getDictionary() {
  return translations[getCurrentLanguage()] || translations.ko;
}

function updateBlogEmptyText(key = "blogEmpty") {
  const empty = postFeed?.querySelector("[data-blog-empty]");
  if (!empty) return;
  empty.textContent = getDictionary()[key] || translations.ko[key] || "";
}

function createBlogMeta(post) {
  const meta = document.createElement("p");
  meta.className = "project-meta blog-meta";

  const tag = document.createElement("span");
  tag.textContent = post.tag || "Work Log";

  const date = document.createElement("span");
  date.textContent = post.date || "";

  meta.append(tag, date);
  return meta;
}

function createTextBlock(text) {
  const container = document.createElement("div");
  container.className = "blog-copy";
  String(text || "")
    .split(/\n{2,}/)
    .filter(Boolean)
    .forEach((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph.trim();
      container.append(element);
    });
  return container;
}

function createTerminalMedia(media) {
  const figure = document.createElement("figure");
  figure.className = "blog-media blog-media-terminal";

  const terminal = document.createElement("div");
  terminal.className = "terminal-card blog-terminal";
  terminal.setAttribute("aria-hidden", "true");

  const titlebar = document.createElement("div");
  titlebar.className = "terminal-titlebar";
  ["terminal-red", "terminal-yellow", "terminal-green"].forEach((className) => {
    const light = document.createElement("span");
    light.className = `terminal-light ${className}`;
    titlebar.append(light);
  });

  const title = document.createElement("span");
  title.className = "terminal-title";
  title.textContent = media.title || "work-note";
  titlebar.append(title);

  const pre = document.createElement("pre");
  const code = document.createElement("code");
  code.textContent = (media.lines || []).join("\n");
  pre.append(code);

  terminal.append(titlebar, pre);
  figure.append(terminal);
  appendCaption(figure, media.caption);
  return figure;
}

function appendCaption(figure, captionText) {
  if (!captionText) return;
  const caption = document.createElement("figcaption");
  caption.textContent = captionText;
  figure.append(caption);
}

function createFileMedia(media) {
  const figure = document.createElement("figure");
  figure.className = "blog-media blog-media-file";

  if (media.type === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.src = media.src;
    figure.append(video);
  } else {
    const image = document.createElement("img");
    image.src = media.src;
    image.alt = media.alt || media.caption || "";
    figure.append(image);
  }

  appendCaption(figure, media.caption);
  return figure;
}

function createGalleryMedia(media) {
  const figure = document.createElement("figure");
  figure.className = "blog-media blog-media-gallery";

  (media.items || []).forEach((item) => {
    if (!item.src) return;

    const tile = document.createElement("div");
    tile.className = "gallery-item";

    if (item.type === "video") {
      const video = document.createElement("video");
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.src = item.src;
      tile.append(video);
    } else {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt || media.caption || "";
      tile.append(image);
    }

    if (item.caption) {
      const caption = document.createElement("span");
      caption.textContent = item.caption;
      tile.append(caption);
    }

    figure.append(tile);
  });

  appendCaption(figure, media.caption);
  return figure;
}

function createTileMedia(media) {
  const figure = document.createElement("figure");
  figure.className = "blog-media blog-media-split";

  (media.items || []).forEach((item) => {
    const tile = document.createElement("div");
    tile.className = item.type === "video-placeholder" ? "media-tile media-tile-video" : "media-tile media-tile-image";

    if (item.type === "image" && item.src) {
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt || "";
      tile.append(image);
    } else {
      const play = document.createElement("span");
      play.className = "play-mark";
      play.setAttribute("aria-hidden", "true");
      tile.append(play);
    }

    const label = document.createElement("span");
    label.textContent = item.label || "";
    tile.append(label);
    figure.append(tile);
  });

  appendCaption(figure, media.caption);
  return figure;
}

function createBlogMedia(media) {
  if (!media) return null;
  if (media.type === "terminal") return createTerminalMedia(media);
  if (media.type === "tiles") return createTileMedia(media);
  if (media.type === "gallery") return createGalleryMedia(media);
  if ((media.type === "image" || media.type === "video") && media.src) return createFileMedia(media);
  return null;
}

function createPostCard(post) {
  const article = document.createElement("article");
  article.className = "blog-post";

  const header = document.createElement("header");
  header.className = "blog-post-header";

  const titleGroup = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = post.title || "Untitled";
  titleGroup.append(createBlogMeta(post), title);

  const author = document.createElement("img");
  author.className = "blog-author";
  author.src = "assets/conta.png";
  author.alt = "";

  header.append(titleGroup, author);
  article.append(header, createTextBlock(post.body));

  const media = createBlogMedia(post.media);
  if (media) {
    article.append(media);
  }

  return article;
}

function renderBlogPosts(posts) {
  if (!postFeed) return;
  postFeed.replaceChildren();

  if (!posts.length) {
    const empty = document.createElement("p");
    empty.className = "blog-empty";
    empty.dataset.blogEmpty = "";
    empty.textContent = getDictionary().blogEmpty;
    postFeed.append(empty);
    return;
  }

  posts.forEach((post) => postFeed.append(createPostCard(post)));
}

async function loadBlogPosts() {
  if (!postFeed) return;

  try {
    const response = await fetch("data/posts.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Could not load posts");
    const posts = await response.json();
    renderBlogPosts(Array.isArray(posts) ? posts : []);
  } catch {
    postFeed.replaceChildren();
    const empty = document.createElement("p");
    empty.className = "blog-empty";
    empty.dataset.blogEmpty = "";
    empty.textContent = getDictionary().blogLoadError;
    postFeed.append(empty);
  }
}

loadBlogPosts();
