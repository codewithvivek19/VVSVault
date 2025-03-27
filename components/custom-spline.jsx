"use client";

import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline/next';

const CustomSpline = ({ scene, onLoad, className, style }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to hide the Spline watermark
    const hideWatermark = () => {
      if (containerRef.current) {
        // Add a small delay to ensure the Spline component has fully loaded
        setTimeout(() => {
          // Find the watermark element (usually an anchor tag at the bottom)
          const splineWatermark = containerRef.current.querySelector('a[href*="spline"]');
          if (splineWatermark) {
            splineWatermark.style.display = 'none';
          }
        }, 1000);
      }
    };

    // Set up a mutation observer to detect when the watermark is added to the DOM
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          hideWatermark();
        }
      }
    });

    // Start observing the container
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true
      });
    }

    // Initial attempt to hide watermark
    hideWatermark();

    // Clean up observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={style}>
      <Spline scene={scene} onLoad={onLoad} />
      <style jsx global>{`
        /* Hide Spline watermark using CSS */
        a[href*="spline"], a[href*="app.spline.design"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
};

export default CustomSpline; 