export type Theme = "light" | "dark";

function resolveThemePreference(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll<HTMLButtonElement>(".theme-toggle").forEach((btn) => {
    btn.dataset.theme = theme;
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
  });
}

export function initThemeToggle() {
  const theme = resolveThemePreference();
  applyTheme(theme);

  document.querySelectorAll<HTMLButtonElement>(".theme-toggle").forEach((btn) => {
    if (btn.dataset.themeToggleBound === "true") return;

    btn.dataset.themeToggleBound = "true";
    btn.addEventListener("click", () => {
      const current = (document.documentElement.dataset.theme ?? "dark") as Theme;
      const next: Theme = current === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
    });
  });
}
