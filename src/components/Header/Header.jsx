import React, { Fragment, useEffect, useRef, useState } from 'react';
import HeaderChild from './HeaderChild';

export default function Header({ data }) {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const items = Object.keys(data.allDataJson.edges[0].node.data);
  console.log(Object.keys(items));
  const listBuilder = items.map((headerText) => <HeaderChild>{headerText}</HeaderChild>);
  return (
    <>
      {/* <p>Lorem ipsum...</p> */}
      <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref}>
        {listBuilder}
      </div>
      {/* <p>Dolor sit amet</p> */}
    </>
  );
}
