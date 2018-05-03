import { TimelineMax } from 'gsap'

export const entrance = () => {
      var timeline = new TimelineMax();
      timeline
        .from('#animal', 1, { scale: 0, ease: Bounce.easeOut })
       //.yoyo(true);
  }