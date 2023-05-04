import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonPizzaBlock = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={248}
    height={500}
    viewBox="0 0 248 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="115" cy="117" r="115" />
    <circle cx="124" cy="139" r="7" />
    <rect x="1" y="261" rx="10" ry="10" width="248" height="35" />
    <rect x="0" y="323" rx="10" ry="10" width="248" height="94" />
    <rect x="0" y="443" rx="10" ry="10" width="86" height="28" />
    <rect x="115" y="437" rx="25" ry="25" width="132" height="42" />
  </ContentLoader>
);

export default SkeletonPizzaBlock;
