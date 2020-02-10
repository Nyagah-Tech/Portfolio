jQuery(document).ready(function(){
	jQuery('.skillbar').each(function(){
		jQuery(this).find('.skillbar-bar').animate({
			width:jQuery(this).attr('data-percent')
		},6000);
    });
});


// -------------------------------------------------
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(func, wait, options) {
    var context, args, result
    var timeout = null
    var previous = 0
    if (!options) options = {}
    var later = function() {
      previous = options.leading === false ? 0 : Date.now()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function() {
      var now = Date.now()
      if (!previous && options.leading === false) previous = now
      var remaining = wait - (now - previous)
      context = this
      args = arguments
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
      return result
    }
  }
  
  
  
  
  const lineBG = document.querySelector(".line-backdrop").getBoundingClientRect()
  
  window.addEventListener(
    "scroll",
    throttle(function(e) {
      const line = document.querySelector(".line")
      const boxes = document.querySelectorAll(".box")
      // const box = document.querySelector(".box")
      
      const lineBottom = line.getBoundingClientRect().bottom
      boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top + (box.getBoundingClientRect().height/2)
        if (boxTop <= lineBottom) {
          box.classList.add('active')
        } else {
          box.classList.remove('active')
        }
      })
      
      const startLine = document.querySelector(".startLine").getBoundingClientRect()
      // the distance between the top of .startLine and top of window
      const scrollPos = startLine.top * -1
      const lineHeight =
        scrollPos < 0
          ? 0
          : scrollPos > lineBG.height
            ? lineBG.height
            : scrollPos
      const lineBGTop = lineBG.top * -1
      
      //////////////////
      // can remove this
      //////////////////
      const percentageComplete = (line.offsetHeight / lineBG.height * 100).toFixed(2)
      document.querySelector('.percentComplete').innerHTML = `${percentageComplete}%`
      
      if (
        line.getBoundingClientRect().bottom <
        lineBG.bottom
      ) {
        line.style.height = `${lineHeight}px`
      }
    }, 50)
  )
  