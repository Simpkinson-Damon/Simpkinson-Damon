function clearTarget(target){
    let targetNode = document.getElementById(target);
    while(targetNode.hasChildNodes()) {
        targetNode.removeChild(targetNode.firstChild);
    }
}

function findSite(color){
    switch(color){
        case "white":
            return "https://www.youtube.com/embed/hOr1LEuI5aQ";
        case "yellow":
            return "https://www.youtube.com/embed/DCruPj9ms4s";
        case "orange":
            return "https://www.youtube.com/embed/mIHOYsZjdzk";
        case "green":
            return "https://www.youtube.com/embed/0W-8nMzMJ-M";
        case "blue":
            return "https://www.youtube.com/embed/AS3IyeAIYqA";
        case "purple":
            return "https://www.youtube.com/embed/XyspPhJuMaI";
        default:
            break;
    }
}


function vidPicker(target, color){
    clearTarget(target);
    document.getElementById('vidBackground').style.backgroundColor = color;
    let vidSite = findSite(color);
    let iframe = document.createElement('iframe');
    iframe.width = 560;
    iframe.height = 315;
    iframe.src = vidSite;
    console.log(vidSite);
    let destination = document.getElementById(target);
    destination.appendChild(iframe);
}

