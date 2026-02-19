import { useEffect, useRef, useState } from 'react';

export function Copy({
  children,
  textToCopy,
}: {
  textToCopy: string;
  children: (props: {
    onClick: () => void;
    isCopied: boolean;
  }) => React.ReactNode;
}) {
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);

      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <>{children({ onClick: handleCopy, isCopied })}</>;
}
