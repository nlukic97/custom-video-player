
import * as Time from './time.js';


// defining variables
let videoContainer = document.querySelector('.player')
let video = document.querySelector('video')
// let controls = document.querySelector('.controls')

let controls = document.querySelector('.controls')
let speedControls = document.querySelector('.speed-controls')
let currVolume //which will be used to return the volume to the previous state upon unmuting



/** ------ Interval which checks if the user has hovered over the video, which will show the menu and progress bar until the user stops moving the mouse ------ */
let mouseMoveInt; //the interval which will be used
let i_count = 0;
let intervalStarted = false;

function startMouseMoveInterval(){
    mouseMoveInt = setInterval(function(){
        i_count++
        if(i_count >= 2){
            controls.classList.remove('visible')
            clearInterval(mouseMoveInt)
            intervalStarted = false;
        }
    },1000)
}


videoContainer.addEventListener('mousemove',function(){
    i_count = 0;

    // only start the interval once, it can only be restarted if it manages to end without 'i_count' being reset
    if(intervalStarted === false){
        intervalStarted = true;
        controls.classList.add('visible')
        startMouseMoveInterval()
    }
})





// loading meta data to be shown (video duration) once loaded
video.addEventListener('loadedmetadata',function(){
    setVideoTime()
})

// eventListener 'loadedmetadata' does not fire when there is network throttle, but this line fixes that
if(video.readyState >=2) setVideoTime();

function setVideoTime(){
    document.querySelector('#current-time').innerText = Time.getTotalTime(Math.round(video.currentTime)) //need to include the 00 for hours if we have hours
    document.querySelector('#video-duration').innerText = '/ ' + Time.getTotalTime(Math.round(video.duration))
}




// uppdate when the time of the video changes (either manually or automatically while the video is playing)
video.addEventListener('timeupdate',function(){
    document.querySelector('#current-time').innerText = Time.getTotalTime(Math.round(video.currentTime))
    document.querySelector('#progress-bar').value =  video.currentTime * 100 / video.duration
    document.querySelector('.progress-curr').style.width =  Math.ceil(video.currentTime * 100 / video.duration) + '%'
})

document.querySelector('#progress-bar').addEventListener('input',function(){
    video.currentTime = this.value * video.duration / 100
})





// Playing and pausing the video
document.querySelector('button.play-pause').addEventListener('click',function(){
    
    if(this.classList.contains('playing')){
        video.pause()
        this.firstChild.classList = 'fas fa-play'
    } else {
        video.play()
        this.firstChild.classList = 'fas fa-pause'
    }
    this.classList.toggle('playing')
})

// listener for when video ends playback
video.addEventListener('ended',function(){
    document.querySelector('button.play-pause').firstChild.classList = 'fas fa-play'
    document.querySelector('button.play-pause').classList.remove('playing')
})



// handling the mute
document.querySelector('button.mute').addEventListener('click',function(){
    if(video.classList.contains('muted')){
        // video.volume = currVolume
        changeVolume(video,currVolume * 100)
        document.querySelector('#volume-bar').value = currVolume * 100;
        this.firstChild.classList = 'fas fa-volume-up'
        
    } else {
        currVolume = video.volume
        
        // video.volume = 0;
        changeVolume(video,0)
        document.querySelector('#volume-bar').value = 0;
        this.firstChild.classList = 'fas fa-volume-mute'
    }
    video.classList.toggle('muted')
})


//video speed playback listeners
let speeds = [
    {
        identifyer:'050',
        speed:0.5
    },
    {
        identifyer:'075',
        speed:0.75
    },
    {
        identifyer:'100',
        speed:1.0
    },
    {
        identifyer:'150',
        speed:1.5
    },
    {
        identifyer:'200',
        speed:2
    },
]

speeds.forEach(speed=>{
    document.querySelector(`button.speed-${speed.identifyer}`).addEventListener('click',function(){
        video.playbackRate = speed.speed
        speedControls.classList.remove('visible')
    })
})



// Speed toggler
// document.querySelector('.speed-toggler').addEventListener('click',function(){
//     speedControls.classList.toggle('visible')
// })


// fullscreen button
document.querySelector('button.fullscreen').addEventListener('click',function(){
    if(document.fullscreenElement){
        document.exitFullscreen()
        this.firstChild.classList = 'fas fa-expand'
    } else {
        openFullScreen(videoContainer)
        this.firstChild.classList = 'fas fa-compress'
    }
})

function openFullScreen(item){
    if (item.requestFullscreen) {
        item.requestFullscreen();
    } else if (item.webkitRequestFullscreen) { /* Safari */
        item.webkitRequestFullscreen();
    } else if (item.msRequestFullscreen) { /* IE11 */
        item.msRequestFullscreen();
    }
}


document.querySelector('#volume-bar').addEventListener('input',function(){
    changeVolume(video,this.value)
})

function changeVolume(video, volume){
    document.querySelector('.volume-curr').style.width = volume +'%';
    video.volume = volume / 100
}


