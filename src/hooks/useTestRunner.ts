'use client';

import { useState, useCallback, useRef } from 'react';
import type { ChallengeTest } from '@/domain/challenge/ChallengeTest';
import type { TestResult } from '@/domain/attempt/TestResult';
import type { CodeFile } from '@/domain/challenge/CodeFile';

type RunnerStatus = 'idle' | 'running' | 'done' | 'error';

export function useTestRunner(tests: ChallengeTest[]) {
  const [results, setResults] = useState<TestResult[]>(
    tests.map((t) => ({ testId: t.id, status: 'pending' as const })),
  );
  const [status, setStatus] = useState<RunnerStatus>('idle');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const buildHtml = useCallback((files: CodeFile[]): string => {
    const html = files.find((f) => f.language === 'html')?.content ?? '<body></body>';
    const css = files.find((f) => f.language === 'css')?.content ?? '';
    const js = files.find((f) => f.language === 'javascript')?.content ?? '';

    const axeTests = tests.filter((t) => t.type === 'axe');

    return html.replace(
      '</head>',
      `<style>${css}</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js"></script>
</head>`,
    ).replace(
      '</body>',
      `<script>${js}</script>
<script>
(function() {
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'run-tests') {
      if (typeof axe === 'undefined') {
        window.parent.postMessage({ type: 'axe-error', error: 'axe-core not loaded' }, '*');
        return;
      }
      var axeRuleKeys = ${JSON.stringify(axeTests.map((t) => t.ruleKey))};
      axe.run(document, axeRuleKeys.length ? { runOnly: { type: 'rule', values: axeRuleKeys } } : {})
        .then(function(res) {
          var testResults = ${JSON.stringify(axeTests)}.map(function(t) {
            var pass = res.passes.find(function(p) { return p.id === t.ruleKey; });
            var violation = res.violations.find(function(v) { return v.id === t.ruleKey; });
            if (pass) return { testId: t.id, status: 'pass' };
            if (violation) return {
              testId: t.id, status: 'fail',
              message: (violation.nodes[0] && violation.nodes[0].failureSummary) || violation.description,
              impact: violation.impact
            };
            return { testId: t.id, status: 'pending' };
          });
          // keyboard tests kept as pending client-side for now
          var kbResults = ${JSON.stringify(tests.filter((t) => t.type !== 'axe').map((t) => ({ testId: t.id, status: 'pending' })))};
          window.parent.postMessage({ type: 'axe-results', results: testResults.concat(kbResults) }, '*');
        })
        .catch(function(err) {
          window.parent.postMessage({ type: 'axe-error', error: err.message }, '*');
        });
    }
  });
  window.parent.postMessage({ type: 'iframe-ready' }, '*');
})();
</script>
</body>`,
    );
  }, [tests]);

  const runTests = useCallback(
    (files: CodeFile[]) => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      setStatus('running');
      setResults(tests.map((t) => ({ testId: t.id, status: 'pending' as const })));

      const html = buildHtml(files);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      const handleMessage = (e: MessageEvent) => {
        if (e.data?.type === 'iframe-ready') {
          iframe.contentWindow?.postMessage({ type: 'run-tests', tests }, '*');
        } else if (e.data?.type === 'axe-results') {
          setResults(e.data.results);
          setStatus('done');
          window.removeEventListener('message', handleMessage);
          URL.revokeObjectURL(url);
        } else if (e.data?.type === 'axe-error') {
          setStatus('error');
          window.removeEventListener('message', handleMessage);
          URL.revokeObjectURL(url);
        }
      };

      window.addEventListener('message', handleMessage);
      iframe.src = url;
    },
    [tests, buildHtml],
  );

  return { results, status, runTests, iframeRef };
}
