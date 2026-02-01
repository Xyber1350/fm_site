'use client';

import { useEffect, useRef } from 'react';

const ROTATE_CONFIG = [
  { id: 'path214', clockwise: true },
  { id: 'path224', clockwise: false },
  { id: 'path215', clockwise: true },
  { id: 'path216', clockwise: false },
  { id: 'path228', clockwise: true },
];

const FADE_IDS = ['path223', 'path218', 'path219', 'path220', 'path221', 'path222'];

interface GearsAnimationProps {
  className?: string;
}

export function GearsAnimation({ className }: GearsAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    fetch('/images/gears-original.svg')
      .then((res) => res.text())
      .then((svgText) => {
        container.innerHTML = svgText;

        const svg = container.querySelector('svg');
        if (!svg) return;

        svg.style.width = '100%';
        svg.style.height = 'auto';
        svg.style.maxWidth = '617px';

        // Apply rotation animations
        for (const { id, clockwise } of ROTATE_CONFIG) {
          const path = svg.getElementById(id);
          if (!path) continue;

          const bbox = (path as SVGGraphicsElement).getBBox();
          const cx = bbox.x + bbox.width / 2;
          const cy = bbox.y + bbox.height / 2;

          (path as SVGElement).style.transformOrigin = `${cx}px ${cy}px`;
          path.classList.add(clockwise ? 'gear-rotate-cw' : 'gear-rotate-ccw');
        }

        // Apply fade animations
        FADE_IDS.forEach((id, index) => {
          const path = svg.getElementById(id);
          if (!path) return;

          (path as SVGElement).style.animationDelay = `${index}s`;
          path.classList.add('gear-fade');
        });
      });
  }, []);

  return <div ref={containerRef} className={className} />;
}