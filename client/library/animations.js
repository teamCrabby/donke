import { TimelineMax, Draggable, } from 'gsap'

export const entrance = () => {
  let timeline = new TimelineMax();
  timeline
    .from('#animal', 1, { scale: 0, ease: Bounce.easeOut })
    .yoyo(true);
}

export const sick = () => {
  let timeLine = new TimelineMax();
  timeLine.from('#sad', 1, { zIndex: 1, ease: Power1.easeOut })
}


export const heartBeat = () => {
  let timeLine = new TimelineMax();
  timeLine.to('#heart', 1, { scale: .5, opacity: .5, repeat: -1 })
}

export const bubbleAlert = () => {

  let timeLine = new TimelineMax();
  timeLine.from('#bubble', 1, { scale: 0 })
  timeLine.set('#bubble', { y: 100 })
}

//party hat draggable code

//export const dragHat



