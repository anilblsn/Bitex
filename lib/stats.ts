import { promises as fs } from "node:fs";
import path from "node:path";

export const VISITOR_COOKIE_NAME = "bitex_vid";

export type SiteStats = {
  totalVisits: number;
  uniqueVisitors: number;
  updatedAt: string;
};

const statsFilePath = path.join(process.cwd(), "data", "stats.json");
const defaultStats: SiteStats = {
  totalVisits: 0,
  uniqueVisitors: 0,
  updatedAt: "",
};

export async function getSiteStats(): Promise<SiteStats> {
  try {
    const raw = await fs.readFile(statsFilePath, "utf8");
    const parsed = JSON.parse(raw) as SiteStats;
    return {
      totalVisits: Number(parsed.totalVisits) || 0,
      uniqueVisitors: Number(parsed.uniqueVisitors) || 0,
      updatedAt: String(parsed.updatedAt ?? ""),
    };
  } catch {
    return defaultStats;
  }
}

async function writeSiteStats(stats: SiteStats): Promise<void> {
  await fs.mkdir(path.dirname(statsFilePath), { recursive: true });
  await fs.writeFile(statsFilePath, `${JSON.stringify(stats, null, 2)}\n`, "utf8");
}

export async function registerVisit(isNewVisitor: boolean): Promise<SiteStats> {
  const current = await getSiteStats();
  const next: SiteStats = {
    totalVisits: current.totalVisits + 1,
    uniqueVisitors: current.uniqueVisitors + (isNewVisitor ? 1 : 0),
    updatedAt: new Date().toISOString(),
  };
  await writeSiteStats(next);
  return next;
}
