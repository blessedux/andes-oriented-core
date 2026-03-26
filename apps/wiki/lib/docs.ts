import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const docsDir = path.join(process.cwd(), "docs");

export type DocItem = {
  slug: string;
  title: string;
  section:
    | "Why This Technology"
    | "Architecture"
    | "User Flow"
    | "Licenses"
    | "Implementing Our Tech";
  order: number;
  description?: string;
  content: string;
};

type DocMeta = {
  section: DocItem["section"];
  order: number;
};

const DOC_META_BY_SLUG: Record<string, DocMeta> = {
  technology_value_vs_traditional_logging: { section: "Why This Technology", order: 1 },
  geometry_unified: { section: "Architecture", order: 1 },
  cylinder_frame_truth: { section: "Architecture", order: 2 },
  plane_builder_measurement_normalization: { section: "Architecture", order: 3 },
  plane_measurement_truth: { section: "Architecture", order: 4 },
  medicion_servicios_edicion: { section: "User Flow", order: 1 },
  trio_edit_recalculation: { section: "User Flow", order: 2 },
  prognosis_tables: { section: "User Flow", order: 3 },
  proprietary_tech_and_licensing: { section: "Licenses", order: 1 },
  cylinder_image_mapper: { section: "Implementing Our Tech", order: 1 },
};

const SECTION_ORDER: DocItem["section"][] = [
  "Why This Technology",
  "Architecture",
  "User Flow",
  "Licenses",
  "Implementing Our Tech",
];

function fileNameToSlug(fileName: string) {
  return fileName.replace(/\.md$/i, "").toLowerCase();
}

function fileNameToTitle(fileName: string) {
  return fileName
    .replace(/\.md$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getAllDocs(): DocItem[] {
  if (!fs.existsSync(docsDir)) return [];

  const files = fs.readdirSync(docsDir).filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const fullPath = path.join(docsDir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = matter(raw);
      const titleLine = parsed.content
        .split("\n")
        .find((line) => line.trim().startsWith("# "));
      const titleFromHeading = titleLine?.replace(/^#\s+/, "").trim();

      return {
        slug: fileNameToSlug(file),
        title:
          typeof parsed.data.title === "string"
            ? parsed.data.title
            : titleFromHeading || fileNameToTitle(file),
        section: DOC_META_BY_SLUG[fileNameToSlug(file)]?.section ?? "Implementing Our Tech",
        order: DOC_META_BY_SLUG[fileNameToSlug(file)]?.order ?? 999,
        description:
          typeof parsed.data.description === "string" ? parsed.data.description : undefined,
        content: parsed.content,
      };
    })
    .sort((a, b) => {
      const sectionDelta = SECTION_ORDER.indexOf(a.section) - SECTION_ORDER.indexOf(b.section);
      if (sectionDelta !== 0) return sectionDelta;
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
}

export function getDocBySlug(slug: string): DocItem | null {
  const docs = getAllDocs();
  return docs.find((doc) => doc.slug === slug) ?? null;
}

export function getDocsBySection(docs: DocItem[]) {
  return SECTION_ORDER.map((section) => ({
    section,
    docs: docs.filter((doc) => doc.section === section),
  })).filter((group) => group.docs.length > 0);
}
