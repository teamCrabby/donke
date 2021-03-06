export const playAudio = soundName => {

 
  let options

  switch(soundName) {
    case 'happy':
      options = ['http://www.nachoua.com/Animaux/ane.wav']
      break;
    // case 'dramatic':
    //   options = ['goosie.cogsci.indiana.edu/.../donkey.wav']
    //   break;
    case 'upset':
      options = ['http://izzyweird.com/soundlib1/donkey2.wav', 'http://www.brunover.com/wav_gif/donkey.wav']
      break;
    case 'short':
      options = ['http://www.davorin.net/d/osel.wav']
      break;
    case 'heehaw':
      options = ['http://www.mountaincharlie1850.org/sounds/hee_haw_04.wav']
      break;
    case 'thunder':
      options = ['http://www.wavsource.com/snds_2018-01-14_3453803176249356/sfx/thunder2.wav']
      break;
    case 'dead':
      options = ['http://www.wavsource.com/snds_2018-01-14_3453803176249356/sfx/ominous.wav']
      break;
    default:
      options = ['http://www.nachoua.com/Animaux/ane.wav']   
  }

  let link = options[Math.floor(Math.random()*(options.length-1+1))]
  
  let audio = new Audio(link)
  audio.play()

}

export const playMusic = () => {
  let audio = new Audio('CD_Guitar_85-02.mp3')
  audio.play()
}

export const playFarm = () => {
  let audio = new Audio('farm.mp3')
  audio.play()
}

export const blop = () => {
  let audio = new Audio('blop.mp3')
  audio.play()
}