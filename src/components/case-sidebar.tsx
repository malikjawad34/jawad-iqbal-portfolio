'use client';

import { useEffect, useState } from 'react';

type CaseSidebarProps = {
  hasTradeoffs?: boolean;
};

export function CaseSidebar({ hasTradeoffs = false }: CaseSidebarProps) {
  const [activeId, setActiveId] = useState('context');

  useEffect(() => {
    const sectionIds = ['context', 'approach', ...(hasTradeoffs ? ['tradeoffs'] : []), 'outcomes'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hasTradeoffs]);

  return (
    <nav className="case-sidebar" aria-label="Case study sections">
      <a
        href="#context"
        className={activeId === 'context' ? 'active' : ''}
        aria-current={activeId === 'context' ? 'location' : undefined}
      >
        01 · The context
      </a>
      <a
        href="#approach"
        className={activeId === 'approach' ? 'active' : ''}
        aria-current={activeId === 'approach' ? 'location' : undefined}
      >
        02 · The engineering
      </a>
      {hasTradeoffs && (
        <a
          href="#tradeoffs"
          className={activeId === 'tradeoffs' ? 'active' : ''}
          aria-current={activeId === 'tradeoffs' ? 'location' : undefined}
        >
          03 · Key decisions
        </a>
      )}
      <a
        href="#outcomes"
        className={activeId === 'outcomes' ? 'active' : ''}
        aria-current={activeId === 'outcomes' ? 'location' : undefined}
      >
        {hasTradeoffs ? '04 · What was delivered' : '03 · What was delivered'}
      </a>
    </nav>
  );
}
