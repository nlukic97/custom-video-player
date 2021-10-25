
let videoContainer = document.querySelector('.player')
let video = document.querySelector('video')
let controls = document.querySelector('.controls')

video.removeAttribute('controls');
controls.style.visibility = 'visible';

let currVolume


// Playing and pausing the video
document.querySelector('button.play-pause').addEventListener('click',function(){
    console.log(this);
    
    if(this.classList.contains('playing')){
        video.pause()
    } else {
        video.play()
    }
    
    this.classList.toggle('playing')
})


document.querySelector('button.mute').addEventListener('click',function(){
    if(video.classList.contains('muted')){
        video.volume = currVolume
    } else {
        currVolume = video.volume
        console.log(currVolume);
        video.volume = 0;
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
    })
})

// fullscreen button
document.querySelector('button.fullscreen').addEventListener('click',function(){
    if(document.fullscreenElement){
        document.exitFullscreen()
    } else {
        openFullScreen(videoContainer)
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

