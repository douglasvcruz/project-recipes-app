import { useState } from 'react';

const copy = require('clipboard-copy');

function useCopy() {
  const [copie, setCopie] = useState('');

  const copyButton = (url) => {
    copy(`http://localhost:3000/${url}`);
    setCopie('Link copied!');
  };

  return { copie, copyButton };
}

export default useCopy;
