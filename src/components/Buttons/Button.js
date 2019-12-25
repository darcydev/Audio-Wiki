import React from 'react';
import { Button as AntButton } from 'antd';

import './Button.css';

export default function Button({ shape, icon, theme, size }) {
  return <AntButton shape={shape} icon={icon} theme={theme} size={size} />;
}
