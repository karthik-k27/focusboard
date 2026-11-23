import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { FOCUS_NOTES_SLIDES } from '../data/focusNotes';

export default function FocusNotes({ activeSlide, onChangeSlide }) {
  const totalSlides = FOCUS_NOTES_SLIDES.length;
  const currentSlide = FOCUS_NOTES_SLIDES[activeSlide] || FOCUS_NOTES_SLIDES[0];

  const handlePrevious = () => {
    onChangeSlide((activeSlide - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    onChangeSlide((activeSlide + 1) % totalSlides);
  };

  return (
    <section
      id="focus-notes-section"
      className={`focus-notes focus-notes--${currentSlide.accent}`}
      aria-roledescription="carousel"
      aria-label="Focus Notes"
    >
      <div className="focus-notes__content" aria-live="polite">
        <div className="focus-notes__meta">
          <span className="focus-notes__eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            {currentSlide.eyebrow}
          </span>
          <span className="focus-notes__badge">{currentSlide.badge}</span>
        </div>
        <h2 className="focus-notes__title">{currentSlide.title}</h2>
        <p className="focus-notes__description">{currentSlide.description}</p>
      </div>

      <div className="focus-notes__controls">
        <div className="focus-notes__dots" role="tablist" aria-label="Focus Notes slides">
          {FOCUS_NOTES_SLIDES.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to Focus Note ${index + 1} of ${totalSlides}: ${slide.title}`}
                className={`focus-notes__dot ${isActive ? 'focus-notes__dot--active' : ''}`}
                onClick={() => onChangeSlide(index)}
              />
            );
          })}
        </div>

        <div className="focus-notes__nav-buttons">
          <button
            type="button"
            className="focus-notes__nav-btn"
            onClick={handlePrevious}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={18} aria-hidden="true" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            className="focus-notes__nav-btn"
            onClick={handleNext}
            aria-label="Next focus note"
          >
            <span>Next</span>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
