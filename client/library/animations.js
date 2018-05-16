import { TimelineMax, TweenMax } from 'gsap'
import Draggable from 'gsap/Draggable'
import {playMusic} from './audio'

//initial creature entrance
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

export const dead = () => {
  let timeLine = new TimelineLite();
  timeLine.to('#halo', 2.5, { x: 0, y: 140, ease: Power1.easeInOut })
  timeLine.to('#halo', 1, { x: 0, y: 130, yoyo: true, repeat: -1, ease: Power1.easeInOut })
}

export const heartBeat = () => {
  let timeLine = new TimelineMax();
  timeLine.to('#heart', 1, { scale: .5, opacity: .5, repeat: -1 })

}


//sleeping donke breathing
export const breathing = () => {
  let timeLine = new TimelineMax();
  timeLine.to('#belly', 2, { x: 0, y: 20, yoyo: true, repeat: -1, ease: Power1.easeInOut })
}

// speech bubble

export const bubbleAlert = () => {
  let timeLine = new TimelineMax();
  timeLine.from('#speech', 1, { scale: 0 })
}

//party hat draggable code
export const dragHat = () => {
  Draggable.create('#hat')
}

export const dragToys = () => {
  Draggable.create('#icecream')
  Draggable.create('#crown')
  Draggable.create('#musicbox')
  Draggable.create('#stash')
  Draggable.create('#glasses')
  Draggable.create('#mask')
  Draggable.create('#hair')
  Draggable.create('#guitar')

}

// export const musicBox = () => {
//   let timeLine = new TimelineMax()
//   timeLine.to('#musicbox', 1, { left: 100})
// }

export const hatLeave = () => {
  let timeLine = new TimelineMax();
  timeLine
    .to('#hat', 2, { x: -500, y: -200, rotation: 360 })
}

//sun
export const sunRotate = () => {
  let timeLine = new TimelineMax();
  timeLine.to('#sunRays', 20, { rotation: "360", ease: Linear.easeNone, repeat: -1 })
}

export const sunLeave = () => {
  let timeLine = new TimelineMax();
  timeLine
    .to('#sun', 5, { x: 700, y: -200, ease: Power1.easeOut }, "sunOut")
}

//grass
export const grassLeave = () => {
  let timeLine = new TimelineMax();
  timeLine
    .to('#grass', 8, { y: 1000 })
}

//clouds
export const cloudEnter = (cloud) => {
  let timeLine = new TimelineMax();
  timeLine
    .from(cloud, 2, { x: 500, y: -100 })
    .to(cloud, 3, { scale: 1.1, yoyo: true, opacity: .7, ease: Power1.easeInOut, repeat: -1 })
}

export const clouds = () => {
  let timeLine = new TimelineMax();
  timeLine.to('#cloud1', 3, { scale: 1.1, yoyo: true, opacity: .7, ease: Power1.easeInOut, repeat: -1 })
  timeLine.to('#cloud2', 2.8, { scale: 1.1, yoyo: true, opacity: .7, ease: Power1.easeInOut, repeat: -1 })
  timeLine.to('#cloud3', 3.2, { scale: 1.1, yoyo: true, opacity: .7, ease: Power1.easeInOut, repeat: -1 })
  timeLine.to('#cloud4', 2.9, { scale: 1.1, yoyo: true, opacity: .7, ease: Power1.easeInOut, repeat: -1 })
  timeLine.to('#cloud5', 3.1, { scale: 1.1, yoyo: true, opacity: .7, ease: Power1.easeInOut, repeat: -1 })
}

//lightning
export const lightningEnter = (lightning) => {
  let timeLine = new TimelineMax();
  timeLine
    .from(lightning, 2, { x: 0, y: -60 })
}

//playpen donkeys --  need to figure out how to make these guys draggable

export const dragDonke = () => {
  Draggable.create('#donke')
}

export const bouncingDonke = (donkey) => {
  let count = 0,
    tween

  // tween = TweenMax.to(donkey, 2, {left:"700px", repeat:10, yoyo:true, onRepeat:onRepeat, repeatDelay:0.5, ease:Linear.easeNone});

  tween = TweenMax.to(donkey, 4, { rotation: 360, transformOrigin: "40px -100px", repeat: 10, ease: Linear.easeNone });

  // function onRepeat() {
  //   count++;
  //   // box.innerHTML = count;
  //   TweenLite.set(donkey, {backgroundColor:"hsl(" + Math.random() * 255 + ", 90%, 60%)"});
  // }				
}


