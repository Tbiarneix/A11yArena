'use client';

import { useEffect, useRef } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { indentOnInput, bracketMatching } from '@codemirror/language';
import type { CodeFile } from '@/domain/challenge/CodeFile';
import styles from './CodeEditor.module.scss';

interface CodeEditorProps {
  file: CodeFile;
  onChange: (content: string) => void;
}

function getLanguageExtension(lang: CodeFile['language']) {
  switch (lang) {
    case 'html': return html();
    case 'css': return css();
    case 'javascript': return javascript();
  }
}

export function CodeEditor({ file, onChange }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: file.content,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          history(),
          indentOnInput(),
          bracketMatching(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          getLanguageExtension(file.language),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChange(update.state.doc.toString());
            }
          }),
          EditorView.theme({
            '&': {
              height: '100%',
              fontSize: '13px',
              fontFamily: 'JetBrains Mono, monospace',
            },
            '.cm-scroller': { overflow: 'auto' },
            '.cm-content': { padding: '8px 0' },
            '.cm-gutters': {
              backgroundColor: '#1e2330',
              color: '#6b7280',
              border: 'none',
            },
            '.cm-activeLineGutter': { backgroundColor: '#2a3148' },
            '.cm-activeLine': { backgroundColor: '#2a3148' },
            '&.cm-focused': { outline: 'none' },
            '&.cm-focused .cm-cursor': { borderLeftColor: '#86a0cd' },
          }),
          EditorView.baseTheme({
            '&dark .cm-gutters': { backgroundColor: '#1e2330' },
          }),
        ],
      }),
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file.name, file.language]);

  // Sync external content changes (file switching)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== file.content) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: file.content },
      });
    }
  }, [file.content, file.name]);

  return (
    <div
      ref={containerRef}
      className={styles['code-editor']}
      role="region"
      aria-label={`Éditeur de code — ${file.name}`}
    />
  );
}
