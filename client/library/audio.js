
console.log('PATH', __dirname+'..'+'/wav/'+'annoyed'+'.wav')
export const annoyed = (soundName) => {
  console.log('__dirname is', __dirname)
  let audio = new Audio(__dirname+'..'+'wav/'+soundName+'.wav')
  audio.currentTime = 0;
  audio.play()
}