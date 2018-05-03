import { TimelineMax } from 'gsap'

export const entrance = () => {
  let timeline = new TimelineMax();
  timeline
    .from('#animal', 1, { scale: 0, ease: Bounce.easeOut })
    .yoyo(true);
}

export const sick = () => {
  let timeLine = new TimelineMax();
  timeLine.from('#sadEars', 3, { zIndex: 0, scale: 0, ease: Power1.easeOut })
  // timeLine.from('#sadEars', .5, { zIndex: 0, scale: 0 })
}

//need to figure out the z-index



