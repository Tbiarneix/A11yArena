/**
 * axe-bridge — injected into the preview iframe.
 * Runs axe-core on the iframe's document and posts results back to the parent.
 * This file is loaded as a <script> tag inside the sandbox iframe, NOT via Next.js bundler.
 */

// Defined as a string to be injected — NOT a real module
export const AXE_BRIDGE_SCRIPT = `
(function() {
  function runAxe(tests) {
    if (typeof axe === 'undefined') {
      window.parent.postMessage({ type: 'axe-error', error: 'axe-core not loaded' }, '*');
      return;
    }
    axe.run(document, { runOnly: { type: 'rule', values: tests.map(t => t.ruleKey) } })
      .then(function(results) {
        var testResults = tests.map(function(t) {
          var pass = results.passes.find(p => p.id === t.ruleKey);
          var violation = results.violations.find(v => v.id === t.ruleKey);
          if (pass) return { testId: t.id, status: 'pass' };
          if (violation) return {
            testId: t.id,
            status: 'fail',
            message: violation.nodes[0]?.failureSummary || violation.description,
            impact: violation.impact
          };
          return { testId: t.id, status: 'pending' };
        });
        window.parent.postMessage({ type: 'axe-results', results: testResults }, '*');
      })
      .catch(function(err) {
        window.parent.postMessage({ type: 'axe-error', error: err.message }, '*');
      });
  }

  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'run-tests') {
      runAxe(e.data.tests);
    }
  });

  window.parent.postMessage({ type: 'iframe-ready' }, '*');
})();
`;
