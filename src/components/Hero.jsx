import React, { useEffect, useRef, useState } from 'react';
import { heroSlides, heroStats } from '../data.js';

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const sliderRef = useRef(null);

  const show = (i) => {
    const next = (i + heroSlides.length) % heroSlides.length;
    setIndex(next);
  };

  const startAutoPlay = () => {
    clearInterval(timerRef.current);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      timerRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrev = () => { show(index - 1); startAutoPlay(); };
  const handleNext = () => { show(index + 1); startAutoPlay(); };
  const handleDot = (i) => { show(i); startAutoPlay(); };

  return (
    <section
      className="hero hero-slider"
      id="home"
      ref={sliderRef}
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={startAutoPlay}
      onFocus={() => clearInterval(timerRef.current)}
      onBlur={startAutoPlay}
    >
      <div className="hero-slides" aria-label="Rise Financial Services featured services">
        {heroSlides.map((slide, i) => (
          <div className={`hero-slide${i === index ? ' active' : ''}`} key={slide.img}>
            <img src={`/${slide.img}`} alt={slide.alt} />
            <div className="hero-slide-overlay"></div>
            <div className="hero-caption">
              <div className="eyebrow">{slide.eyebrow}</div>
              <h1>{slide.title}<em>{slide.em}</em></h1>
              <p className="lead">{slide.lead}</p>
              <div className="hero-cta">
                <a className="btn btn-gold" href="#apply">{slide.cta}</a>
                <a className="btn btn-outline-light" href="tel:+918688242655">☎ Talk to an expert</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-stats hero-stats-overlay">
        {heroStats.map((s) => (
          <div key={s.lbl}><div className="num">{s.num}</div><div className="lbl">{s.lbl}</div></div>
        ))}
      </div>

      <button className="hero-arrow hero-prev" type="button" aria-label="Previous slide" onClick={handlePrev}>‹</button>
      <button className="hero-arrow hero-next" type="button" aria-label="Next slide" onClick={handleNext}>›</button>
      <div className="hero-dots" role="tablist" aria-label="Choose a featured service">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.img}
            className={`hero-dot${i === index ? ' active' : ''}`}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-selected={i === index}
            onClick={() => handleDot(i)}
          />
        ))}
      </div>
    </section>
  );
}
