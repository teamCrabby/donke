import { TimelineMax, TweenMax } from 'gsap'
import Draggable from 'gsap/Draggable'

//initial creature enterance
export const entrance = () => {
  let timeline = new TimelineMax();
  timeline
    .from('#animal', 1, { scale: 0, ease: Bounce.easeOut })
    .yoyo(true);
}

//sad/sick donke
export const sick = () => {
  let timeLine = new TimelineMax();
  timeLine.from('#sad', 1, { zIndex: 1, ease: Power1.easeOut })
}

//heart beat animation
export const heartBeat = () => {
  let timeLine = new TimelineMax();
  timeLine.to('#heart', 1, { scale: .5, opacity: .5, repeat: -1 })
}

//speech bubble
export const bubbleAlert = () => {
  let timeLine = new TimelineMax();
  timeLine.from('#bubble', 1, { scale: 0 })
  timeLine.set('#bubble', { y: 100 })
}

//party hat draggable code
export const dragHat = () => {
  Draggable.create('#hat')
}


//health bar

//export const healthBarStatus = () => {}


