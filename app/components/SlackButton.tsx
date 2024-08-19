import React from 'react';

interface SlackButtonProps {
  onClick: () => void;
}

const SlackButton: React.FC<SlackButtonProps> = ({ onClick }) => (
  <button onClick={onClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
    Send Slack Message
  </button>
);

export default SlackButton;
