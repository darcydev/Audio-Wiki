import React from 'react';
import { Button as AntButton } from 'antd';

import HeartIcon from '../Icons/HeartIcon';
import WikipediaIcon from '../Icons/WikipediaIcon';

import './Button.css';

export default function Button({ shape, icon, type, theme, size, reactIcon }) {
  const MARKUP = reactIcon ? (
    <AntButton shape={shape} type={type} theme={theme} size={size}>
      <WikipediaIcon />
    </AntButton>
  ) : (
    <AntButton
      shape={shape}
      icon={icon}
      type={type}
      theme={theme}
      size={size}
    />
  );

  return <>{MARKUP}</>;
}
