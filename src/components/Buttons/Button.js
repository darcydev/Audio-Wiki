import React from 'react';
import { Button as AntButton } from 'antd';

import HeartIcon from '../Icons/HeartIcon';
import WikipediaIcon from '../Icons/WikipediaIcon';

import './Button.css';

export default function Button({
  shape,
  icon,
  type,
  theme,
  size,
  reactIcon,
  text
}) {
  let MARKUP;

  if (reactIcon)
    MARKUP = (
      <AntButton shape={shape} type={type} theme={theme} size={size}>
        {reactIcon}
      </AntButton>
    );
  else if (icon)
    MARKUP = (
      <AntButton
        shape={shape}
        icon={icon}
        type={type}
        theme={theme}
        size={size}
      />
    );
  else if (text)
    MARKUP = (
      <AntButton shape={shape} type={type} theme={theme} size={size}>
        {text}
      </AntButton>
    );

  return <>{MARKUP}</>;
}
