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
export const dead = () => {
	let timeLine = new TimelineLite();
	timeLine.to('#halo', 2.5, {x: 0, y: 130, ease:Power1.easeInOut})
	//to('#animal', 2, {x: 0, y: 100, ease:Power1.easeInOut})
			// .addPause()
	timeLine.to('#animal', 3, {rotation: 90, transformOrigin: '100% 100%', ease: Power2.easeInOut})		
}


