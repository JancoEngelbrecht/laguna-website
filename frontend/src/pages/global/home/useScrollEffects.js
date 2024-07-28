import { useEffect } from 'react';

const useScrollEffects = () => {
  useEffect(() => {
    const handleScroll = () => {
      const rosemary1Element = document.getElementById('rosemary1');
      const steakSection = document.getElementById('steak-section');
      const swingImages = document.querySelectorAll('.swing');
      const moveDownImage = document.querySelector('.moveDown');

      // STEAK SECTION
      if (steakSection) {
        const sectionTop = steakSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight) {
          rosemary1Element.classList.add('animate-slide-out');
        } else {
          rosemary1Element.classList.remove('animate-slide-out');
        }
      }

      // HANGED MEAT SECTION
      swingImages.forEach(image => {
        const rect = image.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom >= 0) {
          if (image.classList.contains('z-40')) {
            image.classList.add('animate-swing');
          } else if (image.classList.contains('z-30')) {
            image.classList.add('animate-swingReverse');
          } else if (image.classList.contains('z-20')) {
            image.classList.add('animate-swingFast');
          }
        } else {
          image.classList.remove('animate-swing', 'animate-swingReverse', 'animate-swingFast');
        }
      });

      // MOVE DOWN IMAGE
      if (moveDownImage) {
        const rect = moveDownImage.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom >= 0) {
          moveDownImage.classList.add('animate-moveDown');
        } else {
          moveDownImage.classList.remove('animate-moveDown');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useScrollEffects;