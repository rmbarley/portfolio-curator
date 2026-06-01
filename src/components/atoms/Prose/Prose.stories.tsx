import { expect } from "storybook/test";
import Prose from "./Prose.astro";

export default {
  title: "Atoms/Prose",
  component: Prose,
};

const ARTICLE_HTML = `
<p>The first hundred traces I read by hand had a pattern I couldn't have predicted from the dashboards. The pass rate was 82% — fine, by ML eval standards — and the failures were concentrated in one shape of query, on one feed source, at one hour of the day. None of that survives aggregation.</p>
<p>Most aggregate metrics are dangerous without error analysis. This is the boring version of an argument Husain has been making for two years.</p>
<h2>The Monday morning ritual</h2>
<p>Every Monday in Module 3, I open the annotation UI I built in one Saturday and read five real Curator traces.</p>
<ul>
  <li>Hand-grading traces toward Husain's 500-trace milestone</li>
  <li>Replacing single-vector retrieval with hybrid + reranker</li>
  <li>Wiring OpenTelemetry to Grafana Tempo</li>
</ul>
`.trim();

const BLOCKQUOTE_HTML = `
<p>Context for the blockquote below.</p>
<blockquote>"Start with error analysis, not infrastructure. Spend 30 minutes manually reviewing 20–50 LLM outputs whenever you make significant changes."</blockquote>
<p>That rule is the only LLM-eval advice that costs more than it saves on the surface and pays back severalfold in the second month.</p>
`.trim();

const CODE_BLOCK_HTML = `
<p>The failure taxonomy after six weeks of hand-grading:</p>
<pre><code>category               count   share
hallucinated_source       18    18%
stale_summary             14    14%
wrong_module_tag          11    11%</code></pre>
<p>The "hallucinated source" pattern was the one that scared me.</p>
`.trim();

const INLINE_CODE_HTML =
  `<p>The retrieval pipeline uses <code>tantivy</code> for BM25 and a dense encoder for the semantic leg. The hybrid score is <code>alpha * dense + (1 - alpha) * bm25</code> where <code>alpha</code> defaults to <code>0.6</code>.</p>`.trim();

const NESTED_LIST_HTML = `
<p>The failure modes group into three clusters:</p>
<ul>
  <li>Retrieval failures
    <ul>
      <li>Wrong chunk selected</li>
      <li>Stale source returned</li>
    </ul>
  </li>
  <li>Generation failures
    <ul>
      <li>Hallucinated citation</li>
      <li>Truncated at max_tokens</li>
    </ul>
  </li>
</ul>
`.trim();

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default_LongArticle = {
  name: "Default · Long article",
  args: { size: "default", children: ARTICLE_HTML },
};

// ─── Small ────────────────────────────────────────────────────────────────────

export const Small_Sidebar = {
  name: "Small · Sidebar",
  args: {
    size: "small",
    children:
      "<p>A sidebar note in smaller type. The measure is tighter and the line-height slightly compressed to suit reading in a narrow column.</p>",
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const prose = canvasElement.querySelector(".prose");
    expect(prose?.classList.contains("prose--small")).toBe(true);
  },
};

// ─── With blockquote ──────────────────────────────────────────────────────────

export const WithBlockquote = {
  name: "With blockquote",
  args: { size: "default", children: BLOCKQUOTE_HTML },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    expect(canvasElement.querySelector("blockquote")).toBeTruthy();
  },
};

// ─── With code block ──────────────────────────────────────────────────────────

export const WithCodeBlock = {
  name: "With code block",
  args: { size: "default", children: CODE_BLOCK_HTML },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    expect(canvasElement.querySelector("pre")).toBeTruthy();
  },
};

// ─── With inline code ─────────────────────────────────────────────────────────

export const WithInlineCode = {
  name: "With inline code",
  args: { size: "default", children: INLINE_CODE_HTML },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const codes = canvasElement.querySelectorAll("p code");
    expect(codes.length).toBeGreaterThan(0);
  },
};

// ─── With nested list ─────────────────────────────────────────────────────────

export const WithNestedList = {
  name: "With nested list",
  args: { size: "default", children: NESTED_LIST_HTML },
};
