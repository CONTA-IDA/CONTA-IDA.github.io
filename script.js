const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const atomCanvas = document.querySelector("#tool-atom-canvas");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const languageSelect = document.querySelector("[data-lang-select]");

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
    actionDiscord: "Discord로 연락",
    homeEyebrow: "Reverse Engineering / Tooling / Game Revival",
    homeLede:
      "바이너리의 동작을 추적하고, 분석 도구를 만들며, 사라져가는 게임의 조작감과 구조를 깨끗하게 재구현합니다.",
    homeFocusTooling: "Python 자동화",
    homeFocusPrototype: "레거시 게임 프로토타입",
    terminalTitle: "analysis session",
    terminalLine1: "$ ghidraRun ./legacy-client.bin",
    terminalLine2: "trace: 입력 루프, 카메라 상태, 판정 타이밍",
    terminalLine3: "build: 클린룸 프로토타입 에셋 준비 완료",
    aboutKicker: "소개",
    aboutTitle: "분석하고, 만들고, 다시 구현합니다.",
    aboutInterestTitle: "관심사",
    aboutP1:
      "리버스 엔지니어링으로 프로그램의 동작 방식을 추적하고, 분석 과정에서 필요한 스크립트와 작은 도구를 직접 만듭니다.",
    aboutP2:
      "IDA Pro, Ghidra 같은 분석 도구와 Python 기반 자동화, 자체 3D 에셋 제작, 레거시 게임 재구현 실험을 함께 다룹니다.",
    stackKicker: "스택",
    stackTitle: "분석과 제작을 오가는 구조를 선호합니다.",
    stackReverse: "IDA Pro, Ghidra, x64dbg, 바이너리 분석 노트",
    stackDevelop: "Python 자동화, C/C++, JavaScript, Git, 문서화",
    stackModel: "Blender, 에셋 블로킹, 프로토타입 모델, 레거시 게임 재구현",
    workflowKicker: "워크플로우",
    workflowTitle: "분석에서 재구현까지 이어지는 흐름",
    workflowTrace: "동작을 관찰하고 함수 흐름, 문자열, 상태 변화를 기록합니다.",
    workflowAutomate: "반복 분석은 스크립트와 작은 CLI 도구로 줄입니다.",
    workflowRebuild: "핵심 규칙과 조작감을 직접 구현해 프로토타입으로 검증합니다.",
    workflowModel: "원본 리소스 대신 자체 3D 에셋과 추상화된 표현으로 대체합니다.",
    projectsKicker: "Reverse / Tooling / Revival",
    projectsTitle: "프로젝트",
    projectsLede: "분석 노트, 자동화 도구, 사라져가는 게임의 재구현 실험을 중심으로 작업 흐름과 산출물을 정리합니다.",
    projectMetaReverse: "Reverse",
    projectMetaDevelopment: "Development",
    projectMetaTooling: "Tooling",
    projectMetaRevival: "Game Revival",
    projectMetaPrototype: "Prototype",
    projectBinaryTitle: "Binary Analysis Lab",
    projectBinaryText: "바이너리의 함수 흐름과 문자열, 상태 변화를 추적해 의심 지점을 재현 가능한 분석 노트로 정리합니다.",
    projectBinaryMethod: "IDA Pro와 Ghidra로 call graph, xref, decompile view를 대조합니다.",
    projectBinaryArtifact: "함수 메모, 구조 추정, 재현 단계 중심의 sanitized write-up",
    projectToolingTitle: "Reverse Tooling Scripts",
    projectToolingText: "반복되는 분석 작업을 줄이기 위한 Python 스크립트와 작은 CLI 도구를 만들어 분석 시간을 줄입니다.",
    projectToolingMethod: "파일 파싱, 문자열 추출, 패턴 검색, 결과 정리 과정을 자동화합니다.",
    projectToolingArtifact: "재사용 가능한 스크립트, 명령어 예시, 분석 로그 템플릿",
    projectBubbleTitle: "Discontinued Game Revival Lab",
    projectBubbleText:
      "오래된 온라인 게임이나 서비스가 종료된 게임의 동작을 리버싱으로 추정해 되살리는 클린룸 재구현 프로젝트입니다. IDA/Ghidra 같은 분석 도구로 조작감, 규칙, 전투 흐름을 해석하고 원본 리소스 없이 자체 모델과 추상화된 에셋으로 구현합니다.",
    projectBubbleMethod: "IDA/Ghidra 등으로 입력, 판정, 카메라, 네트워크 흐름을 추정해 작은 시스템으로 재구성합니다.",
    projectBubbleArtifact: "클린룸 프로토타입, 자체 모델 에셋, 동작 추정 기록",
    labelMethod: "방식",
    labelArtifact: "산출물",
    setupKicker: "작업 환경",
    setupTitle: "셋업",
    setupLede: "리버스 엔지니어링, 도구 개발, 프로토타입 제작에 쓰는 메인 데스크톱과 보조 Mac 장비들을 정리했습니다.",
    setupMain: "메인 PC",
    setupSubMac: "보조 Mac PC",
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
      "리버스 엔지니어링, 분석 자동화, 레거시 게임 재구현 프로젝트에 대한 의견이나 제안이 있다면 GitHub 또는 Discord로 연락해 주세요.",
    blogKicker: "Work Log",
    blogTitle: "작업 로그",
    blogLede:
      "CONTA가 직접 업로드한 글, 이미지, 영상 중심의 개인 작업 기록입니다. 공개된 작업 로그는 누구나 볼 수 있습니다.",
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
    actionDiscord: "Contact on Discord",
    homeEyebrow: "Reverse Engineering / Tooling / Game Revival",
    homeLede:
      "I trace how binaries behave, build tools for analysis, and recreate the feel and structure of fading games through clean prototypes.",
    homeFocusTooling: "Python automation",
    homeFocusPrototype: "Legacy game prototype",
    terminalTitle: "analysis session",
    terminalLine1: "$ ghidraRun ./legacy-client.bin",
    terminalLine2: "trace: input loop, camera state, hit timing",
    terminalLine3: "build: clean-room prototype assets ready",
    aboutKicker: "About",
    aboutTitle: "Analyze, build, and recreate.",
    aboutInterestTitle: "Focus",
    aboutP1:
      "I use reverse engineering to trace how software behaves, then build the scripts and small tools needed to make analysis repeatable.",
    aboutP2:
      "My work connects IDA Pro, Ghidra, Python automation, custom 3D assets, and experiments in recreating legacy game mechanics.",
    stackKicker: "Stack",
    stackTitle: "I like workflows that move between analysis and making.",
    stackReverse: "IDA Pro, Ghidra, x64dbg, binary analysis notes",
    stackDevelop: "Python automation, C/C++, JavaScript, Git, documentation",
    stackModel: "Blender, asset blocking, prototype models, legacy game recreation",
    workflowKicker: "Workflow",
    workflowTitle: "From analysis to reconstruction",
    workflowTrace: "Observe behavior and document function flow, strings, and state changes.",
    workflowAutomate: "Reduce repeated analysis with scripts and small CLI tools.",
    workflowRebuild: "Implement core rules and game feel as testable prototypes.",
    workflowModel: "Replace original resources with custom 3D assets and abstract visuals.",
    projectsKicker: "Reverse / Tooling / Revival",
    projectsTitle: "Projects",
    projectsLede: "A focused set of analysis notes, automation tools, and experiments that recreate fading game systems.",
    projectMetaReverse: "Reverse",
    projectMetaDevelopment: "Development",
    projectMetaTooling: "Tooling",
    projectMetaRevival: "Game Revival",
    projectMetaPrototype: "Prototype",
    projectBinaryTitle: "Binary Analysis Lab",
    projectBinaryText: "I trace function flow, strings, and state changes in binaries, then turn suspicious points into reproducible notes.",
    projectBinaryMethod: "Compare call graphs, xrefs, and decompiled views in IDA Pro and Ghidra.",
    projectBinaryArtifact: "Function notes, structure guesses, and sanitized write-ups built around reproduction steps",
    projectToolingTitle: "Reverse Tooling Scripts",
    projectToolingText: "Small Python scripts and CLI tools that remove repetitive work from analysis sessions.",
    projectToolingMethod: "Automate file parsing, string extraction, pattern searches, and result formatting.",
    projectToolingArtifact: "Reusable scripts, command examples, and analysis log templates",
    projectBubbleTitle: "Discontinued Game Revival Lab",
    projectBubbleText:
      "A clean-room recreation project for older online games and discontinued services. I infer behavior through reverse engineering, study controls, rules, and combat flow with tools such as IDA/Ghidra, then rebuild them with custom models and abstract assets instead of original resources.",
    projectBubbleMethod: "Infer input handling, hit detection, camera behavior, and network flow with IDA/Ghidra, then rebuild them as small systems.",
    projectBubbleArtifact: "Clean-room prototypes, custom model assets, and behavior notes",
    labelMethod: "Method",
    labelArtifact: "Artifact",
    setupKicker: "Workspace",
    setupTitle: "Setup",
    setupLede: "A quick look at the main desktop and Mac machines I use for reverse engineering, tooling, and prototype work.",
    setupMain: "Main PC",
    setupSubMac: "Sub Mac PC",
    setupSubLaptop: "Sub Laptop",
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
      "If you have feedback or suggestions about reverse engineering, analysis automation, or legacy game recreation projects, reach out through GitHub or Discord.",
    blogKicker: "Work Log",
    blogTitle: "Work log",
    blogLede:
      "A public work log uploaded by CONTA, centered on writing, images, and videos.",
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
    actionDiscord: "通过 Discord 联系",
    homeEyebrow: "逆向工程 / 工具开发 / 游戏复现",
    homeLede: "我追踪二进制程序的行为，编写分析工具，并用干净的原型复现逐渐消失的游戏手感和结构。",
    homeFocusTooling: "Python 自动化",
    homeFocusPrototype: "老游戏原型",
    terminalTitle: "分析会话",
    terminalLine1: "$ ghidraRun ./legacy-client.bin",
    terminalLine2: "trace: 输入循环、相机状态、命中时机",
    terminalLine3: "build: clean-room 原型资源已准备",
    aboutKicker: "介绍",
    aboutTitle: "分析，构建，再复现。",
    aboutInterestTitle: "关注方向",
    aboutP1: "我通过逆向工程追踪软件的运行方式，并把分析过程中需要的脚本和小工具做成可复用的流程。",
    aboutP2: "我的工作连接 IDA Pro、Ghidra、Python 自动化、自制 3D 资源，以及老游戏机制复现实验。",
    stackKicker: "技术栈",
    stackTitle: "我喜欢在分析和制作之间来回推进的工作方式。",
    stackReverse: "IDA Pro、Ghidra、x64dbg、二进制分析笔记",
    stackDevelop: "Python 自动化、C/C++、JavaScript、Git、文档整理",
    stackModel: "Blender、资源 blocking、原型模型、老游戏复现",
    workflowKicker: "流程",
    workflowTitle: "从分析到复现",
    workflowTrace: "观察行为，并记录函数流、字符串和状态变化。",
    workflowAutomate: "用脚本和小型 CLI 工具减少重复分析。",
    workflowRebuild: "把核心规则和操作手感做成可验证的原型。",
    workflowModel: "不用原始资源，改用自制 3D 资源和抽象化表现。",
    projectsKicker: "Reverse / Tooling / Revival",
    projectsTitle: "项目",
    projectsLede: "这里整理分析笔记、自动化工具，以及复现逐渐消失的游戏系统的实验。",
    projectMetaReverse: "逆向",
    projectMetaDevelopment: "开发",
    projectMetaTooling: "工具",
    projectMetaRevival: "游戏复现",
    projectMetaPrototype: "原型",
    projectBinaryTitle: "二进制分析实验室",
    projectBinaryText: "追踪二进制中的函数流、字符串和状态变化，并把可疑点整理成可复现的分析笔记。",
    projectBinaryMethod: "在 IDA Pro 和 Ghidra 中对照 call graph、xref 和反编译视图。",
    projectBinaryArtifact: "函数笔记、结构推测、以复现步骤为中心的脱敏 write-up",
    projectToolingTitle: "逆向分析脚本",
    projectToolingText: "用 Python 脚本和小型 CLI 工具减少分析会话中的重复工作。",
    projectToolingMethod: "自动化文件解析、字符串提取、模式搜索和结果整理。",
    projectToolingArtifact: "可复用脚本、命令示例和分析日志模板",
    projectBubbleTitle: "停服游戏复现实验室",
    projectBubbleText:
      "这是一个面向老在线游戏和已停服游戏的 clean-room 复现项目。通过逆向工程推测行为，使用 IDA/Ghidra 等工具研究操作手感、规则和战斗流程，并用自制模型与抽象资源实现，不使用原始资源。",
    projectBubbleMethod: "使用 IDA/Ghidra 推测输入、判定、相机和网络流程，再拆成小系统重建。",
    projectBubbleArtifact: "clean-room 原型、自制模型资源和行为推测记录",
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
    contactLede: "如果你对逆向工程、分析自动化或老游戏复现项目有意见或建议，可以通过 GitHub 或 Discord 联系我。",
    blogKicker: "Work Log",
    blogTitle: "工作日志",
    blogLede: "这是 CONTA 上传的公开工作日志，以文字、图片和视频为中心整理个人项目记录。",
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
      description: "CONTA가 직접 남기는 리버스 엔지니어링, 자체 에셋, 프로토타입 작업 로그입니다.",
    },
    contact: {
      title: "연락 | CONTA",
      description: "CONTA와 연결할 수 있는 GitHub와 Discord 연락 페이지입니다.",
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
      description: "CONTA's personal work log for reverse engineering, custom assets, and prototypes.",
    },
    contact: {
      title: "Contact | CONTA",
      description: "GitHub and Discord contact direction for CONTA.",
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
      description: "CONTA 的逆向工程、自制资源和原型制作工作日志。",
    },
    contact: {
      title: "联系 | CONTA",
      description: "CONTA 的 GitHub 与 Discord 联系页面。",
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

const initToolAtom = async () => {
  if (!atomCanvas) return;

  const stage = atomCanvas.closest(".atom-stage");

  try {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");

    const renderer = new THREE.WebGLRenderer({
      canvas: atomCanvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.25, 8.6);

    const group = new THREE.Group();
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xf4efe5, 1.9);
    const key = new THREE.PointLight(0x8ee36d, 2.2, 12);
    key.position.set(-3, 3, 5);
    const rim = new THREE.PointLight(0x34d1bf, 1.6, 10);
    rim.position.set(4, -2, 4);
    scene.add(ambient, key, rim);

    const textureLoader = new THREE.TextureLoader();
    const loadTexture = async (src) => {
      const texture = await textureLoader.loadAsync(src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      return texture;
    };

    const [profileTexture, idaTexture, ghidraTexture, blenderTexture] = await Promise.all([
      loadTexture(atomCanvas.dataset.profileSrc),
      loadTexture(atomCanvas.dataset.idaSrc),
      loadTexture(atomCanvas.dataset.ghidraSrc),
      loadTexture(atomCanvas.dataset.blenderSrc),
    ]);

    const nucleus = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: profileTexture,
        transparent: true,
        depthTest: false,
      }),
    );
    nucleus.renderOrder = 2;
    nucleus.scale.set(1.9, 1.9, 1);
    group.add(nucleus);

    const tools = [
      {
        name: "IDA Pro",
        phase: 0,
        speed: 0.72,
        radius: 2.34,
        rotation: [1.18, 0.18, 0.22],
        texture: idaTexture,
        scale: 0.78,
      },
      {
        name: "Ghidra",
        phase: 2.15,
        speed: 0.62,
        radius: 2.28,
        rotation: [0.42, 1.05, -0.36],
        texture: ghidraTexture,
        scale: 0.86,
      },
      {
        name: "Blender",
        phase: 4.18,
        speed: 0.66,
        radius: 2.34,
        rotation: [1.46, -0.62, 0.78],
        texture: blenderTexture,
        scale: 0.76,
      },
    ].map((tool) => {
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.set(...tool.rotation);
      group.add(orbitGroup);

      const icon = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: tool.texture,
          transparent: true,
          depthTest: false,
        }),
      );
      icon.renderOrder = 4;
      icon.scale.set(tool.scale, tool.scale, 1);
      orbitGroup.add(icon);

      return { ...tool, orbitGroup, icon };
    });

    const resize = () => {
      const width = Math.max(stage.clientWidth, 1);
      const height = Math.max(stage.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    let frame = 0;
    let cleaned = false;
    const clock = new THREE.Clock();
    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(() => {
            resize();
          })
        : null;

    const animate = () => {
      const time = clock.getElapsedTime();
      group.rotation.y = Math.sin(time * 0.22) * 0.12;
      group.rotation.x = Math.sin(time * 0.18) * 0.06;

      tools.forEach((tool) => {
        const t = time * tool.speed + tool.phase;
        const point = new THREE.Vector3(Math.cos(t) * tool.radius, Math.sin(t) * tool.radius, 0);
        tool.icon.position.copy(point);

        const worldPoint = new THREE.Vector3();
        tool.icon.getWorldPosition(worldPoint);
        const depthScale = THREE.MathUtils.mapLinear(worldPoint.z, -2.2, 2.2, 0.76, 1);
        const scale = THREE.MathUtils.clamp(depthScale, 0.72, 1);
        tool.icon.scale.set(tool.scale * scale, tool.scale * scale, 1);
        tool.icon.renderOrder = worldPoint.z < 0 ? 1 : 4;
      });

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      resizeObserver?.disconnect();
      renderer.dispose();
    };

    resize();
    resizeObserver?.observe(stage);
    window.addEventListener("resize", resize);
    requestAnimationFrame(resize);
    animate();
    stage.dataset.rendered = "true";
    window.addEventListener("pagehide", cleanup, { once: true });
    stage.addEventListener("remove", cleanup, { once: true });
  } catch (error) {
    stage.classList.add("is-fallback");
    stage.dataset.rendered = "false";
    console.warn("3D atom scene could not load", error);
  }
};

initToolAtom();
