import fs from 'fs';
import path from 'path';
import type { Region } from '@/types/regions';

function loadRegions(): Region[] {
  const filePath = path.join(process.cwd(), 'content', 'data', 'regions.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Region[];
}

let cachedRegions: Region[] | null = null;

function getRegionsData(): Region[] {
  if (!cachedRegions) {
    cachedRegions = loadRegions();
  }
  return cachedRegions;
}

export function getRegions(): Region[] {
  return getRegionsData();
}

export function getRegionBySlug(slug: string): Region | undefined {
  return getRegionsData().find((r) => r.slug === slug);
}

export function getKeyRegions(): Region[] {
  return getRegionsData().filter((r) => r.isKeyCity);
}
