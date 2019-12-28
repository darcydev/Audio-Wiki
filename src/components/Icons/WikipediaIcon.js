import React from 'react';
import { Icon } from 'antd';

export default function WikipediaIcon() {
  const WikipediaIcon = () => (
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 458.72 458.72"
    >
      <path
        d="m455.72 93.489h-91.404v15.613h9.143c7.145 0 13.588 3.667 17.237 9.81 3.648 6.143 3.786 13.555 0.368 19.829l-98.3 180.43-44.769-106.73 42.169-77.382c8.727-16.014 25.477-25.962 43.714-25.962h4.992v-15.613h-94.404v15.613h9.143c7.145 0 13.588 3.667 17.237 9.81 3.648 6.143 3.786 13.555 0.368 19.829l-30.587 56.143-27.259-64.984c-1.976-4.71-1.487-9.852 1.341-14.105s7.38-6.693 12.488-6.693h9.988v-15.613h-111.73v15.613h4.454c20.857 0 39.546 12.428 47.615 31.661l40.277 96.018-44.887 82.392-79.396-189.27c-1.976-4.71-1.487-9.852 1.341-14.105s7.38-6.693 12.488-6.693h13.737v-15.613h-121.09v15.613h10.064c20.857 0 39.547 12.428 47.615 31.661l91.526 218.19c1.601 3.816 5.313 6.282 9.458 6.282 3.804 0 7.163-1.998 8.986-5.344l11.939-21.91 45.582-83.646 43.884 104.62c1.601 3.816 5.313 6.282 9.458 6.282 3.804 0 7.163-1.998 8.986-5.344l11.939-21.91 110.58-202.92c8.727-16.014 25.477-25.962 43.714-25.962h4.992v-15.613h-2.999v2e-3z"
        fill="#222A30"
      />
    </svg>
  );

  return <Icon component={WikipediaIcon} />;
}
