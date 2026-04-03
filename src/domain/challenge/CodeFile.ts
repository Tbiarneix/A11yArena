export type CodeLanguage = 'html' | 'css' | 'javascript';

export interface CodeFile {
  name: string;
  language: CodeLanguage;
  content: string;
}
