export const playAudio = soundName => {

 
  let options

  switch(soundName) {
    case 'happy':
      options = ['http://www.brunover.com/wav_gif/donkey.wav','http://www.nachoua.com/Animaux/ane.wav']
      break;
    case 'dramatic':
      options = ['goosie.cogsci.indiana.edu/.../donkey.wav']
      break;
    case 'upset':
      options = ['images.tonebytone.com/.../donkey2.wav','http://izzyweird.com/soundlib1/donkey2.wav','www.egyptiancastle.com/.../DONKEY_1.WAV']
      break;
    case 'short':
      options = ['schaeffer.ludo.free.fr/.../HOLYDONKEYIMPACT.WAV','www.presepioelettronico.it/.../asino.wav','http://www.davorin.net/d/osel.wav','www.egyptiancastle.com/.../DONKEY.WAV']
      break;
    case 'shriek':
      options =['www.sounds.beachware.com/.../DONKEYB.mp3']
      break;
    case 'gasp':
      options = ['www.cs.unc.edu/.../donkey.wav']
      break;
    case 'heehaw':
      options = ['http://www.mountaincharlie1850.org/sounds/hee_haw_04.wav']
      break;
    default:
      options = ['http://www.brunover.com/wav_gif/donkey.wav']   
  }

  let link = options[Math.floor(Math.random()*(options.length-1+1))]
  
  let audio = new Audio(link)
  audio.play()

}