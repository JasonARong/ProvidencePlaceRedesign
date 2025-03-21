const images = document.getElementsByClassName('image');
const imageShowcase = document.getElementById('imageShowcase');

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
    image.style.left = `${x}px`;
    image.style.top = `${y + window.scrollY}px`;
    image.style.zIndex = globalIndex;

    image.dataset.status = 'active';

    last = { x: x, y: y + window.scrollY };
}

const distanceFromLast = (x, y) => {
    return Math.hypot(x - last.x, y - last.y);
}

const handleOnMove = e => {
    const rect = imageShowcase.getBoundingClientRect(); // Get div position
    const x = e.clientX - rect.left; // Adjust X within the div
    const y = e.clientY - rect.top; // Adjust Y within the div
    
    if((x >= 0 && x <= rect.width && y >= 0 && y <= rect.height)){
        if(distanceFromLast(e.clientX, (e.clientY+window.scrollY)) > (window.innerWidth / 20)) {
            const lead = images[globalIndex % images.length],
                tail = images[(globalIndex - 5) % images.length];

            activate(lead, e.clientX, e.clientY);

            if(tail) {
                tail.dataset.status = 'inactive';
            }
            
            globalIndex++;
        }
    }else{ // set images to inactive when it is outside the image showcase
        for(let i=0; i<images.length; i++){            
            images[i].dataset.status = 'inactive';
        }
    }
}

window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);