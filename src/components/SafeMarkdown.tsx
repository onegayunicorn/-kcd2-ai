import ReactMarkdown from 'react-markdown';

interface SafeMarkdownProps {
  content: string;
}

export default function SafeMarkdown({ content }: SafeMarkdownProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
