import React from 'react';
import { Button as AntButton } from 'antd';

export default function SimpleButton({
  shape = 'round',
  type = undefined,
  icon = undefined,
  customTextIcon = undefined,
  theme = 'filled',
  size = 'large',
  text = undefined
}) {
  return (
    <AntButton shape={shape} icon={icon} type={type} theme={theme} size={size}>
      {customTextIcon}
      {text}
    </AntButton>
  );
}
