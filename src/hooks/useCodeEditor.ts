'use client';

import { useState, useCallback } from 'react';
import type { CodeFile } from '@/domain/challenge/CodeFile';

export function useCodeEditor(initialFiles: CodeFile[]) {
  const [files, setFiles] = useState<CodeFile[]>(initialFiles);
  const [activeFile, setActiveFile] = useState<string>(initialFiles[0]?.name ?? '');

  const updateFile = useCallback((name: string, content: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.name === name ? { ...f, content } : f)),
    );
  }, []);

  const currentFile = files.find((f) => f.name === activeFile) ?? files[0];

  return { files, activeFile, setActiveFile, updateFile, currentFile };
}
