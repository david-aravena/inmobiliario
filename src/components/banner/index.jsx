'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import styles from './banner.module.css';

export default function Banner({ notices }) {
  const [noticeNumber, setNoticeNumber] = useState(0);
  const intervalRef = useRef(null);

  const nextImage = () => {
    setNoticeNumber((prev) => (prev < notices.length - 1 ? prev + 1 : 0));
  };

  const previousImage = () => {
    setNoticeNumber((prev) => (prev > 0 ? prev - 1 : notices.length - 1));
  };

  const startAutoChange = () => {
    intervalRef.current = setInterval(nextImage, 2000);
  };

  const stopAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoChange();

    return () => {
      stopAutoChange();
    };
  }, []);

  return (
    <div className={styles.banner} onClick={stopAutoChange}>
      <button onClick={previousImage} className={styles.buttonBanner}>
        {'<'}
      </button>

      <Image
        src={notices[noticeNumber]}
        alt="Banner error"
        width={500}
        height={500}
        className={styles.imageBanner}
      />

      <button onClick={nextImage} className={styles.buttonBanner}>
        {'>'}
      </button>
    </div>
  );
}
