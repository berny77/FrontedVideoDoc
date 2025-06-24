import React, { useRef, useEffect } from 'react';

interface TextDisplayProps {
  title: string;
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ title, text }) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="video-text-container">
      <h2>{title}</h2>
      <textarea
        ref={ref}
        value={text}
        readOnly
        className="video-text"
      />
    </div>
  );
};

export default TextDisplay;
