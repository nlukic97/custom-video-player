export function getTotalTime(seconds){
    let formatHours = 0;
    let formatMinutes = 0;
    let formatSeconds = 0

    //getting formatHours
    while(seconds / 3600 >= 1){
        formatHours += 1
        seconds -= 3600
    }
    
    
    // gettings formatMinutes
    while(seconds / 60 >= 1) {
        formatMinutes += 1
        seconds -= 60
    }


    formatHours = (formatHours < 10) ? '0' + formatHours.toString() : formatHours.toString();
    formatMinutes = (formatMinutes < 10) ? '0' + formatMinutes.toString() : formatMinutes.toString(); 
    formatSeconds = (seconds < 10) ? '0' + seconds.toString() : seconds.toString();

    return (formatHours == 0) ? formatMinutes + ':'+ formatSeconds : formatHours + ':' + formatMinutes + ':'+ formatSeconds
}
