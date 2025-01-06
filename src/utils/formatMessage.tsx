// src/utils/formatMessage.tsx
import React from 'react';

export function formatMessage(content: string): React.ReactNode {
  const lines = content.split('\n');

  const cleanMarkdown = (text: string) => {
    return text.replace(/\*\*/g, '').trim();
  };

  return lines.map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return <div key={index} className="h-2" />;
    }

    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      return (
        <h3 key={index} className="font-bold text-lg mb-2">
          {cleanMarkdown(trimmedLine)}
        </h3>
      );
    }

    if (trimmedLine.startsWith('* ')) {
      return (
        <li key={index} className="ml-4 mb-1 list-disc">
          {cleanMarkdown(trimmedLine?.slice(2))}
        </li>
      );
    }

    return <p key={index} className="mb-1">{cleanMarkdown(line)}</p>;
  });
}
