import React from 'react';
import { Icon } from 'antd';

export default function GuardianIcon() {
  const GuardianSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 64 64">
      <path
        d="M2.533 32.343C2.533 8.493 18.32 0 35.903 0c7.465 0 14.5 1.224 18.44 2.827l.343 16.642H53.01L42.695 3.366c-2.074-.83-4.305-1.188-6.535-1.052-9.35 0-14.134 10.805-13.975 28.512.17 21.182 3.855 30.813 12.433 30.813a13.29 13.29 0 0 0 5.152-.857V38.094l-5.666-3.218v-1.933h27.362v2.03l-5.58 3.12v22.394c-6.64 2.352-13.636 3.54-20.68 3.512-19.983 0-32.673-9.263-32.673-31.657"
        fill="#121212"
      />
    </svg>
  );

  return <Icon component={GuardianSvg} />;
}
