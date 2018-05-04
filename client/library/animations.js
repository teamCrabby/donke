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

//need to figure out the z-index
export const dead = () => {
  let timeLine = new TimelineLite();
  // timeline.to('#animal', 2, {x: 0, y: 100, ease:Power1.easeInOut})
  timeLine.to('#halo', 2.5, { x: 0, y: 140, ease: Power1.easeInOut })
  timeLine.to('#halo', 1, { x: 0, y: 130, yoyo: true, repeat: -1, ease: Power1.easeInOut })
  // addPause()
  // timeLine.to('#animal', 2.5, {x: 0, y: 0, ease:Power1.easeInOut})
  // timeLine.to('#halo', 1, {x: 0, y: 130, ease: Power1.easeInOut})

  // .addPause()
  // timeLine.to('#animal', 3, {rotation: 90, transformOrigin: '100% 100%', ease: Power2.easeInOut})		
}

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


