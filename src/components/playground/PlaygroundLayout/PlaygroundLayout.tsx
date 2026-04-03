'use client';

import { useCallback } from 'react';
import type { Challenge } from '@/domain/challenge/Challenge';
import type { StarterCode } from '@/domain/challenge/StarterCode';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import { useCodeEditor } from '@/hooks/useCodeEditor';
import { useTestRunner } from '@/hooks/useTestRunner';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import { Preview } from '../Preview/Preview';
import { TestRunner } from '../TestRunner/TestRunner';
import { InstructionsPanel } from '../InstructionsPanel/InstructionsPanel';
import styles from './PlaygroundLayout.module.scss';

interface PlaygroundLayoutProps {
  challenge: Challenge;
  starterCode: StarterCode;
  tests: ChallengeTest[];
}

export function PlaygroundLayout({ challenge, starterCode, tests }: PlaygroundLayoutProps) {
  const { files, activeFile, setActiveFile, updateFile, currentFile } = useCodeEditor(
    starterCode.files,
  );
  const { results, status, runTests, iframeRef } = useTestRunner(tests);

  const handleRun = useCallback(() => {
    runTests(files);
  }, [files, runTests]);

  const handlePreview = useCallback(() => {
    const html = files.find((f) => f.language === 'html')?.content ?? '';
    const css = files.find((f) => f.language === 'css')?.content ?? '';
    const js = files.find((f) => f.language === 'javascript')?.content ?? '';
    const combined = html
      .replace('</head>', `<style>${css}</style></head>`)
      .replace('</body>', `<script>${js}</script></body>`);
    const blob = new Blob([combined], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }, [files, iframeRef]);

  const passed = results.filter((r) => r.status === 'pass').length;
  const total = tests.length;
  const scorePercent = total > 0 ? Math.round((passed / total) * 100) : 0;

  return (
    <div className={styles['playground']}>
      {/* ── Tab bar (file switcher + actions) ─────────────────────────── */}
      <div className={styles['playground__topbar']}>
        <div className={styles['playground__tabs']} role="tablist" aria-label="Fichiers du projet">
          {files.map((f) => (
            <button
              key={f.name}
              role="tab"
              aria-selected={activeFile === f.name}
              aria-controls="code-editor-panel"
              className={`${styles['playground__tab']} ${
                activeFile === f.name ? styles['playground__tab--active'] : ''
              }`}
              onClick={() => setActiveFile(f.name)}
            >
              {f.name}
            </button>
          ))}
        </div>
        <div className={styles['playground__actions']}>
          <button className={styles['playground__action-btn']} onClick={handlePreview}>
            Aperçu
          </button>
          <button
            className={`${styles['playground__action-btn']} ${styles['playground__action-btn--primary']}`}
            onClick={handleRun}
            disabled={status === 'running'}
          >
            {status === 'running' ? 'Exécution…' : 'Tester'}
          </button>
        </div>
      </div>

      {/* ── 3-panel layout ─────────────────────────────────────────────── */}
      <div className={styles['playground__panels']}>
        {/* Panel 1 — Instructions */}
        <div className={styles['playground__panel']} id="instructions-panel">
          <InstructionsPanel challenge={challenge} tests={tests} />
        </div>

        {/* Panel 2 — Code Editor */}
        <div
          className={styles['playground__panel']}
          id="code-editor-panel"
          role="tabpanel"
          aria-label={`Éditeur — ${currentFile?.name}`}
        >
          {currentFile && (
            <CodeEditor
              file={currentFile}
              onChange={(content) => updateFile(currentFile.name, content)}
            />
          )}
        </div>

        {/* Panel 3 — Preview + Tests */}
        <div className={styles['playground__panel']} id="preview-tests-panel">
          <div className={styles['playground__preview-pane']}>
            <Preview ref={iframeRef} title={`Aperçu — ${challenge.title}`} />
          </div>
          <div className={styles['playground__tests-pane']}>
            <TestRunner
              tests={tests}
              results={results}
              status={status}
              onRun={handleRun}
            />
          </div>
        </div>
      </div>

      {/* ── Score footer ───────────────────────────────────────────────── */}
      <footer className={styles['playground__footer']} aria-label="Progression">
        <span className={styles['playground__footer-label']}>
          {passed}/{total} tests réussis
        </span>
        <div
          className={styles['playground__progress']}
          role="progressbar"
          aria-valuenow={scorePercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Score : ${scorePercent}%`}
        >
          <div
            className={styles['playground__progress-fill']}
            style={{ width: `${scorePercent}%` }}
          />
        </div>
        <span className={styles['playground__footer-score']}>{scorePercent}%</span>
      </footer>
    </div>
  );
}
