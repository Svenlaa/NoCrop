{
  const script = document.currentScript;
  const prefs = script.dataset;
  log("NoCrop has booted")
  log("Your max height is " + prefs.maxHeight + "% of the browser")
  log("The images update every " + prefs.updateSpeed + "ms")
  setInterval(function() {
    let maxPixel = prefs.maxHeight / 100 * window.innerHeight;
    let images = document.getElementsByTagName("img")
    for (i=0;i<images.length;i++) {
      let element = images[i];
      if (element.currentSrc.includes("twimg.com/media/")) {
        let aspect = element.naturalHeight / element.naturalWidth
        let height = aspect * element.width
        if (height > maxPixel) {height = maxPixel}
        let strHeight = height + "px";
        try {element.parentElement.parentElement.nextElementSibling.style.paddingBottom = strHeight}
        catch(err){}
        try{element.parentElement.parentElement.previousElementSibling.style.paddingBottom = strHeight}
        catch(err){}
      };
    };
  }, prefs.updateSpeed);
  function log(msg) {
    if (prefs.logs) {console.log(msg)}
  }
}