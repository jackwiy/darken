!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.darken=t()}(this,function(){var e=function(e,t){var r=this;"function"==typeof e&&(t=e,e={}),e=Object.assign({container:null,default:"light",toggle:null,remember:"darken-mode",usePrefersColorScheme:!0,class:"darken",variables:{}},e),this.dark=!1,e.remember?localStorage.getItem(e.remember)?e.default=localStorage.getItem(e.remember):e.usePrefersColorScheme&&(e.default=this.__checkMatchMedia()||e.default):e.usePrefersColorScheme&&(e.default=this.__checkMatchMedia()||e.default,window.matchMedia("(prefers-color-scheme: dark)").addListener(function(e){e.matches&&r.on()}),window.matchMedia("(prefers-color-scheme: light)").addListener(function(e){e.matches&&r.off()})),e.toggle&&document.querySelector(e.toggle).addEventListener("click",this.__handleClick),document.addEventListener("darken-dark",function(){e.container?document.querySelector(e.container).classList.add(e.class):document.body.classList.add(e.class);for(var n=e.container?document.querySelector(e.container):document.documentElement,o=0,a=Object.entries(e.variables);o<a.length;o+=1){var c=a[o],d=c[0],i=c[1];i&&"object"==typeof i&&(Array.isArray(i)?n.style.setProperty(d,i[1]):n.style.setProperty(d,i.dark))}e.remember&&localStorage.setItem(e.remember,r.dark?"dark":"light"),"function"==typeof t&&t(r.dark)},!1),document.addEventListener("darken-light",function(){e.container?document.querySelector(e.container).classList.remove(e.class):document.body.classList.remove(e.class);for(var n=e.container?document.querySelector(e.container):document.documentElement,o=0,a=Object.entries(e.variables);o<a.length;o+=1){var c=a[o],d=c[0],i=c[1];i&&"object"==typeof i&&(Array.isArray(i)?n.style.setProperty(d,i[0]):n.style.setProperty(d,i.light))}e.remember&&localStorage.setItem(e.remember,r.dark?"dark":"light"),"function"==typeof t&&t(r.dark)},!1),"light"===e.default?this.off():"dark"===e.default&&this.on()};return e.prototype.__handleClick=function(e){e.preventDefault(),this.toggle()},e.prototype.__checkMatchMedia=function(){return window.matchMedia("(prefers-color-scheme: dark)")?"dark":window.matchMedia("(prefers-color-scheme: light)")?"light":void 0},e.prototype.toggle=function(){this.dark=!this.dark,this.dark?document.dispatchEvent(new Event("darken-dark")):document.dispatchEvent(new Event("darken-light"))},e.prototype.on=function(){this.dark=!0,document.dispatchEvent(new Event("darken-dark"))},e.prototype.off=function(){this.dark=!1,document.dispatchEvent(new Event("darken-light"))},e});
