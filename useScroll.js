import React, { useState, useEffect, useRef } from 'react';

/**
 *
 * Hook that allows you to make changes when a components top or bottom
 * reaches the top of the page.
 *
 * Returns
 * height: ( int ) the height of the target in pixles
 * offset: ( int ) the distance from top of page to target in pixles
 * top: ( bool ) whether or not the top of target has reached the top of page
 * bottom: ( bool ) whether or not the top of target has reached the top of page
 */
const useScroll = ({ targetId, offset = 0 }) => {
  const targetRef = useRef();

  const [state, setState] = useState({
    top: false,
    bottom: false,
    height: 0,
    offset: 0,
  });

  const handleScroll = () => {
    // bottom: when the bottom of target hits top of frame
    // top: when top of target hits top of frame
    // height: Offset height is the height of the component
    // offset: OffsetTop is the distance to the top of target
    const pageOffset = window.pageYOffset;
    const target = targetRef.current || document.getElementById(targetId);
    if (target) {
      setState({
        top: pageOffset >= target.offsetTop + offset,
        bottom: pageOffset >= target.offsetTop + target.offsetHeight + offset,
        height: target.offsetHeight,
        offset: target.offsetTop,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //   console.log(JSON.stringify(state, null, 2));
  return { targetRef, ...state };
};

export default useScroll;

