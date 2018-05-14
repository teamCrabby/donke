export const timeConvert = (time) => {
    return time * 60000
}

export const workTimer = () => {
    "in worktimer"
    console.log("breakCountFun", breakCountFunc)
    console.log("healthFunc", healthFunc)
    console.log('timerFunc', timerFunc)
    clearInterval(breakCountFunc);
    clearInterval(healthFunc);
    clearTimeout(timerFunc);
    this.setState({ start: false })
    const workInterval = this.props.workInterval * 1000
    //start the work timer for the specified interval
    timerFunc = setTimeout(() => {
      //send the 'need a break' message when the timer runs out
      this.setState({ needBreakMessage: true })
      //play donkey sound
      playAudio();
      this.props.setStoreStatus('needBreak')
      //start need break timer
      this.needBreak()
    }, workInterval)
  }
