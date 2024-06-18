// pages/chatgpt/api/gpt.js

import React, { useEffect, useState } from 'react';

const CallGPT = ({ promptApiEndpoint }) => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    async function fetchPrompt() {
      try {
        const response = await fetch(promptApiEndpoint);
        const data = await response.json();
        setPrompt(data.prompt);
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
    }
    fetchPrompt();
  }, [promptApiEndpoint]);

  return prompt;
};

export default CallGPT;
