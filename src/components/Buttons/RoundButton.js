import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

export default function RoundButton({ shape, icon, theme, size }) {
  return <Button shape="round" icon={icon} theme={theme} size={size} />;
}

const Container = styled.button`
  color: ${props => (props.primary ? 'red' : 'blue')};
`;
