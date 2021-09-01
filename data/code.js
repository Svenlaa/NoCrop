{
  const script = document.currentScript;
  const prefs = script.dataset;

  if(prefs.logs == true) {console.log("NoCrop has booted")};
  setInterval(function() {
    let maxPixel = prefs.maxHeight * window.innerHeight;
    let images = document.getElementsByTagName("img")
    for (i=0;i<images.length;i++) {
      let element = images[i];
      if (element.currentSrc.includes("twimg.com/media/")) {
        let height = element.height;
        if (prefs.noLimit == false && height > maxPixel) {height = maxPixel}
        let strHeight = height + "px";
        try {element.parentElement.parentElement.nextElementSibling.style.paddingBottom = strHeight}
        catch(err){}
        try{element.parentElement.parentElement.previousElementSibling.style.paddingBottom = strHeight}
        catch(err){}
      };
    };
  }, prefs.updateSpeed);
}