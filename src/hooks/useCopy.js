import { useState } from 'react';

const copy = require('clipboard-copy');

function useCopy() {
  const [copied, setCopied] = useState('');

  const copyButton = (url) => {
    copy(`http://localhost:3000${url}`);
    setCopied('Link copied!');
  };

  return { copied, copyButton };
}

export default useCopy;
