const form = document.getElementById("demo-form");
const success = document.getElementById("form-success");

if (form && success) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    success.hidden = false;
    form.reset();
  });
}

const tabs = Array.from(document.querySelectorAll("[data-tab]"));
const copyPanels = Array.from(document.querySelectorAll("[data-panel]"));
const previewPanels = Array.from(document.querySelectorAll("[data-preview]"));

function setActiveTab(nextTab) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === nextTab;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  copyPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === nextTab);
  });

  previewPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.preview === nextTab);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tab);
  });
});

const diligenceTabs = Array.from(
  document.querySelectorAll("[data-diligence-tab]")
);
const diligencePanels = Array.from(
  document.querySelectorAll("[data-diligence-panel]")
);

function setDiligenceTab(nextTab) {
  diligenceTabs.forEach((tab) => {
    const isActive = tab.dataset.diligenceTab === nextTab;
    tab.classList.toggle("is-active", isActive);
  });

  diligencePanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.diligencePanel === nextTab);
  });
}

diligenceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setDiligenceTab(tab.dataset.diligenceTab);
  });
});

const documentFilters = Array.from(
  document.querySelectorAll("[data-doc-filter]")
);
const documentRows = Array.from(
  document.querySelectorAll("[data-doc-category]")
);
const documentChip = document.getElementById("document-chip");
const documentCoverage = document.getElementById("document-coverage");
const documentMissing = document.getElementById("document-missing");

const documentConfig = {
  customers: {
    chip: "842 indexed",
    coverage: "91%",
    missing: "14",
  },
  vendors: {
    chip: "1,250 indexed",
    coverage: "88%",
    missing: "21",
  },
  employees: {
    chip: "412 indexed",
    coverage: "94%",
    missing: "6",
  },
  governance: {
    chip: "124 indexed",
    coverage: "97%",
    missing: "2",
  },
};

function setDocumentFilter(nextFilter) {
  documentFilters.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.docFilter === nextFilter);
  });

  documentRows.forEach((row) => {
    row.hidden = row.dataset.docCategory !== nextFilter;
  });

  const config = documentConfig[nextFilter];

  if (config && documentChip && documentCoverage && documentMissing) {
    documentChip.textContent = config.chip;
    documentCoverage.textContent = config.coverage;
    documentMissing.textContent = config.missing;
  }
}

documentFilters.forEach((button) => {
  button.addEventListener("click", () => {
    setDocumentFilter(button.dataset.docFilter);
  });
});

const timelineFilters = Array.from(
  document.querySelectorAll("[data-timeline-filter]")
);
const timelineRows = Array.from(
  document.querySelectorAll("[data-timeline-category]")
);
const timelineChip = document.getElementById("timeline-chip");
const timelineTitle = document.getElementById("timeline-title");
const timelineSummary = document.getElementById("timeline-summary");

const timelineConfig = {
  all: {
    chip: "12 events",
    title: "Next 30 days",
    summary:
      "Two contract events and one accounting event are likely to affect pricing, cash timing, and diligence questions.",
  },
  contract: {
    chip: "6 contract events",
    title: "Contract pressure points",
    summary:
      "Renewals and pricing escalators are the fastest route from contract detail to revenue and margin questions.",
  },
  accounting: {
    chip: "3 accounting events",
    title: "Accounting visibility",
    summary:
      "Cash timing and revenue-recognition moments are already mapped before they show up as surprises in the model.",
  },
  people: {
    chip: "3 people events",
    title: "People-related obligations",
    summary:
      "Compensation and employment events stay visible alongside commercial and financial commitments.",
  },
};

function setTimelineFilter(nextFilter) {
  timelineFilters.forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.timelineFilter === nextFilter
    );
  });

  timelineRows.forEach((row) => {
    const isVisible =
      nextFilter === "all" || row.dataset.timelineCategory === nextFilter;
    row.hidden = !isVisible;
  });

  const config = timelineConfig[nextFilter];

  if (config && timelineChip && timelineTitle && timelineSummary) {
    timelineChip.textContent = config.chip;
    timelineTitle.textContent = config.title;
    timelineSummary.textContent = config.summary;
  }
}

timelineFilters.forEach((button) => {
  button.addEventListener("click", () => {
    setTimelineFilter(button.dataset.timelineFilter);
  });
});

const agentTabs = Array.from(document.querySelectorAll("[data-agent-tab]"));
const agentPanels = Array.from(document.querySelectorAll("[data-agent-panel]"));

function setAgentTab(nextTab) {
  agentTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.agentTab === nextTab);
  });

  agentPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.agentPanel === nextTab);
  });
}

agentTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setAgentTab(tab.dataset.agentTab);
  });
});

setActiveTab("agent");
setDiligenceTab("issues");
setDocumentFilter("customers");
setTimelineFilter("all");
setAgentTab("docs");

const hero = document.querySelector(".hero");
const parallaxItems = Array.from(
  document.querySelectorAll(".hero-orbit[data-parallax]")
);
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const canUseHeroParallax = window.matchMedia(
  "(min-width: 921px) and (hover: hover) and (pointer: fine)"
).matches;

if (hero && parallaxItems.length && !prefersReducedMotion && canUseHeroParallax) {
  let pointerX = 0;
  let pointerY = 0;
  let frame = null;

  function renderParallax() {
    const rect = hero.getBoundingClientRect();
    const relativeX = rect.width ? (pointerX - rect.left) / rect.width - 0.5 : 0;
    const relativeY = rect.height ? (pointerY - rect.top) / rect.height - 0.5 : 0;
    const scrollFactor = (window.scrollY - hero.offsetTop) * -0.015;

    parallaxItems.forEach((item) => {
      const depth = Number(item.dataset.parallax || 0);
      const moveX = relativeX * depth * 1.6;
      const moveY = relativeY * depth * 1.25 + scrollFactor * depth;
      item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    frame = null;
  }

  function scheduleParallax() {
    if (!frame) {
      frame = window.requestAnimationFrame(renderParallax);
    }
  }

  const initialRect = hero.getBoundingClientRect();
  pointerX = initialRect.left + initialRect.width / 2;
  pointerY = initialRect.top + initialRect.height / 2;

  hero.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    scheduleParallax();
  });

  window.addEventListener("scroll", scheduleParallax, { passive: true });
  window.addEventListener("resize", scheduleParallax);
  scheduleParallax();
}
