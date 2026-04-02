'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import type { ChallengeType } from '@/domain/challenge/ChallengeType';
import type { Difficulty } from '@/domain/challenge/Difficulty';
import styles from './ChallengeFilters.module.scss';

const TYPES: { value: ChallengeType | ''; label: string }[] = [
  { value: '', label: 'Tous les types' },
  { value: 'fix', label: 'Fix' },
  { value: 'build', label: 'Build' },
  { value: 'audit', label: 'Audit' },
];

const DIFFICULTIES: { value: Difficulty | ''; label: string }[] = [
  { value: '', label: 'Toutes les difficultés' },
  { value: 'easy', label: 'Facile' },
  { value: 'medium', label: 'Intermédiaire' },
  { value: 'hard', label: 'Difficile' },
];

export function ChallengeFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const currentType = searchParams.get('type') ?? '';
  const currentDifficulty = searchParams.get('difficulty') ?? '';

  return (
    <div className={styles['filters']} role="search" aria-label="Filtrer les challenges">
      <div className={styles['filters__group']}>
        <label htmlFor="filter-type" className={styles['filters__label']}>
          Type
        </label>
        <select
          id="filter-type"
          className={styles['filters__select']}
          value={currentType}
          onChange={(e) => updateFilter('type', e.target.value)}
        >
          {TYPES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles['filters__group']}>
        <label htmlFor="filter-difficulty" className={styles['filters__label']}>
          Difficulté
        </label>
        <select
          id="filter-difficulty"
          className={styles['filters__select']}
          value={currentDifficulty}
          onChange={(e) => updateFilter('difficulty', e.target.value)}
        >
          {DIFFICULTIES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {(currentType || currentDifficulty) && (
        <button
          type="button"
          className={styles['filters__reset']}
          onClick={() => {
            router.push(pathname);
          }}
        >
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}
