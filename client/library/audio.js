export const playAudio = soundName => {
  let link 
  if (soundName === 'happy') {
    link = 'http://www.brunover.com/wav_gif/donkey.wav'
  }
    let audio = new Audio(link)
    audio.play()

}