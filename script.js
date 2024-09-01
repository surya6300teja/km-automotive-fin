window.addEventListener('load', scrollToTop);
function scrollToTop() {
    window.scrollTo(0, 0);
}
function curser(){
    var body= document.querySelector("body")
    var why=document.querySelector("#why");
    var curser= document.querySelector("#curser")
    body.addEventListener("mousemove",function(dets){
        gsap.to(curser,{
            x:dets.x,
            y:dets.y,
            duration:0.25,
            ease:""
        })
    })
    why.addEventListener("mouseenter",function(){
        curser.innerHTML="scroll gently"
        gsap.to(curser,{
            scale:3,
            backgroundColor:"#ffffff8a"
        })
    })
    why.addEventListener("mouseleave",function(){
        curser.innerHTML=""
        gsap.to(curser,{
            scale:1,
            backgroundColor:"#fff"
        })
    })
}
function showScrollNow() {
    var curser = document.querySelector("#curser");
    var curserText = document.createElement("div");
    curserText.textContent = "Scroll ";
    curserText.style.position = "absolute";
    curserText.style.top = "50%";
    curserText.style.left = "50%";
    curserText.style.transform = "translate(-50%, -50%)";
    curserText.style.color = "black";
    curser.appendChild(curserText);

    gsap.to(curser, {
        scale: 5,
        duration: 0.5,
        onComplete: function() {
            setTimeout(function() {
                gsap.to(curser, {
                    scale: 1,
                    duration: 0.5,
                    onComplete: function() {
                        curser.removeChild(curserText); 
                    }
                });
            }, 2000); 
        }
    });
}

function page2() {
    var page2 = document.querySelector("#page2");
    var frame = document.querySelector(".frame");
    var slides = document.querySelectorAll(".slide");

    // Predefined positions for the slides
    var positions = [0, 460, 960];

    // Add mousemove event listener to #page2
    page2.addEventListener("mousemove", function(dets) {
        var x = dets.clientX; // Use clientX for better accuracy in the viewport
        console.log("mouse move");
        var newSlideIndex;
        if (x <= 460) {
            newSlideIndex = 0;
        } else if (x <= 960) {
            newSlideIndex = 1;
        } else {
            newSlideIndex = 2;
        }

        // Move the frame to the correct position
        gsap.to(frame, {
            left: positions[newSlideIndex],
            duration: 0.5,
        });

        // Fade in the relevant slide and fade out others
        slides.forEach((slide, index) => {
            gsap.to(slide.querySelectorAll("h2, p, img"), {
                opacity: index === newSlideIndex ? 1 : 1,
                duration: index === newSlideIndex ? 0.11 : 0.1,
            });
        });
    });

    // Lazy loading for images using IntersectionObserver
    const lazyImages = document.querySelectorAll('.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Lazy loading for video using IntersectionObserver
    const lazyVideo = document.querySelector('.lazy-video');
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                source.src = source.dataset.src;
                video.load(); // Load the video when it enters the viewport
                video.classList.remove('lazy-video');
                observer.unobserve(video);
            }
        });
    });

    if (lazyVideo) {
        videoObserver.observe(lazyVideo);
    }
}

function page2mob(){
    var page2 = document.getElementById("page2");
    var frame = document.querySelector(".frame");
    var slides = document.querySelectorAll(".slide");
    
    var page2Height = page2.offsetHeight;
    var moveAmount = page2Height/3;
    console.log(moveAmount);


    function handleIntersection(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Determine the slide index
                var index = Array.from(slides).indexOf(entry.target);
    
                // Move the frame up or down by the moveAmount based on the slide index
                gsap.to(frame, {
                    y: moveAmount * index, // Multiply the moveAmount by the index
                    duration: 0.5,
                });
    
                // Fade in the elements of the current slide
                gsap.to(entry.target.querySelectorAll("h2, p, img"), {
                    opacity: 1,
                    duration: 0.5,
                });
    
                // Fade out the elements of other slides
                // slides.forEach((slide, i) => {
                //     if (i !== index) {
                //         gsap.to(slide.querySelectorAll("h2, p, img"), {
                //             opacity: 0,
                //             duration: 0.5,
                //         });
                //     }
                // });
            }
        });
    }

        const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: `-${window.innerHeight / 2}px 0px`, 
        threshold: 0.5, 
      });
      
      // Observe the element you want to trigger the effect on
      const workElements = document.querySelectorAll('.slide');
      workElements.forEach((element) => {
        observer.observe(element);
      });
}

function page2intro(){
    var start=window.matchMedia("(min-width: 1024px)").matches ? 60: 90;

    gsap.registerPlugin(ScrollTrigger);
    var tl2=gsap.timeline({
        scrollTrigger: {
            trigger: "#page2intro",
            top: `${start}%`, 
            end: "bottom bottom",
            scrub: 1,
            
        }
    });
    tl2.from("#page2intro h2", {
        opacity: 0,
        x:-300,
        duration: 1,
    });
    tl2.from("#page2intro h3", {
        opacity: 0,
        duration: 0.5,
        
    });

}

function services() {
    // Determine the start position and animation directions based on screen width
    var isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    var start = isLargeScreen ? 70 : 70;

    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#services",
            scroller: "body",
            start: `top ${start}%`, 
            end: "top 0%",
            scrub: 2,
        }
    });

    tl2.from(".title h1", {
        x: -300,
        opacity: 0,
    });

    tl2.from(".services p", {
        opacity: 0,
    });

    // Conditionally apply different animations based on screen size
    if (isLargeScreen) {
        // Animation for screens wider than 1024px
        tl2.from(".ele.left.line1", {
            x: -300,
            opacity: 0,
            duration: 1
        }, "line1");

        tl2.from(".ele.center.line1", {
            scale: 0,
            opacity: 0,
            duration: 1
        }, "line1");

        tl2.from(".ele.right.line1", {
            x: 300,
            opacity: 0,
            duration: 1
        }, "line1");

        tl2.from(".ele.left.line2", {
            x: -300,
            opacity: 0,
            duration: 1
        }, "line2");

        tl2.from(".ele.center.line2", {
            scale: 0,
            opacity: 0,
            duration: 1
        }, "line2");

        tl2.from(".ele.right.line2", {
            x: 300,
            opacity: 0,
            duration: 1
        }, "line2");

    } else {
        // Animation for screens smaller than 1024px
        tl2.from(".ele.left.line1", {
            x: -300,
            opacity: 0,
            duration: 0.5
        }, "line1");

        tl2.from(".ele.center.line1", {
            x: 300,
            opacity: 0,
            duration: 0.5
        }, "line1");

        tl2.from(".ele.right.line1", {
            x: -300,
            opacity: 0,
            duration: 0.5
        }, "line2");

        tl2.from(".ele.left.line2", {
            x: 300,
            opacity: 0,
            duration: 0.5
        }, "line2");

        tl2.from(".ele.center.line2", {
            x: -300,
            opacity: 0,
            duration: 0.5
        }, "line3");

        tl2.from(".ele.right.line2", {
            x: 300,
            opacity: 0,
            duration: 0.5
        }, "line3");
    }
}


function whyintro() {
    var isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    var start1 = isLargeScreen ? 20 : 50;
    var tl2 = gsap.timeline({
        scrollTrigger:{
        trigger:"#whyintro",
        scroller:"body",
        start:`top ${start1}%`,
        end:"top 0%",
        scrub:2,
        pin:true
    }
    });

    tl2.from("#whyintro h1", {
        opacity: 0,
        y: 300,
        duration: 1,
    });

    tl2.to("#whyintro h1", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 2, // Delay before the h1 starts moving up
    });

    tl2.to("#whyintro h1", {
        opacity: 0,
        y: -300,
        duration: 1,
    });
}
function why() {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    const frames = {
        currentIndex: 0,
        maxIndex: 550
    };

    let imagesLoaded = 0;
    
    const images = [];
    const textData = [
        { text: "Expert Technicians", startFrame: 50, endFrame: 120 },
        { text: "Genuine spare parts", startFrame: 120, endFrame: 190 },
        { text: "Transparent Pricing", startFrame: 190, endFrame: 260 },
        { text: "Fast and Reliable Service", startFrame: 260, endFrame: 330 },
        { text: "customer satisfaction", startFrame: 330, endFrame: 400 },
        { text: "KM AUTOMOTIVE", startFrame: 400, endFrame: 600 }
    ];

    function preloadImages() {
        for (var i = 1; i <= frames.maxIndex; i++) {
            const imgUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpg`;
            const img = new Image();
            img.src = imgUrl;
            img.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === frames.maxIndex) {
                    loadImage(frames.currentIndex);
                    startAnimation();
                }
            };
            images.push(img);
        }
    }

    function loadImage(index, scaleMultiplier = 1) {
        if (index >= 0 && index <= frames.maxIndex) {
            const img = images[index];
            
            // Set canvas dimensions to full window size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Calculate scale to maintain the aspect ratio
            const scaleX = canvas.width / img.width;
            const scaleY = canvas.height / img.height;
            const scale = Math.max(scaleX, scaleY) * scaleMultiplier; // Apply zoom factor

            // Calculate the new image dimensions
            const newWidth = img.width * scale;
            const newHeight = img.height * scale;

            // Center the image on the canvas
            const offsetX = (canvas.width - newWidth) / 2;
            const offsetY = (canvas.height - newHeight) / 2;

            // Clear the canvas and draw the image with smoothing
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

            // Draw text on the canvas if within the defined frame range
            textData.forEach((data, idx) => {
                if (index >= data.startFrame && index <= data.endFrame) {
                    const progress = (index - data.startFrame) / (data.endFrame - data.startFrame);
                    const yPosition = canvas.height / 2 + 100 - progress * 200; // Adjust for vertical movement
                    const opacity = Math.min(1, progress * 2); // Fade in effect

                    drawText(data.text, yPosition, opacity);
                }
            });

            frames.currentIndex = index;
        }
    }

    function drawText(text, yPosition, opacity) {
        context.save(); // Save the current state
        context.font = "7vw Orbitron"; // Set font size and family
        if (text === "KM AUTOMOTIVE") {
            context.fillStyle = `rgba(255, 0, 0, ${opacity})`; // Set text color to red with opacity
        } else {
            context.fillStyle = `rgba(255, 255, 255, ${opacity})`; // Set text color to white with opacity
        } // Set text color with opacity
        context.textAlign = "center"; // Center the text
        context.fillText(text, canvas.width / 2, yPosition); // Draw text at the specified Y position
        context.restore(); // Restore the state
    }

    function startAnimation() {
        var isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
        var start2 = isLargeScreen ? 40 : 40;
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".parent",
                start: `top ${start2}%`,
                end: "bottom bottom",
                scrub: 2,
                pin: false
            }
        });

        // Zoom effect
        tl.to(frames, {
            currentIndex: frames.maxIndex,
            onUpdate: function () {
                const progress = frames.currentIndex / frames.maxIndex;
                const zoomScale = 1 + (progress * 0.5); // Increase up to 50% zoom
                loadImage(Math.floor(frames.currentIndex), zoomScale);
            },
            onComplete: function() {
                document.body.style.overflow = "visible";
            }
        });
    }

    preloadImages();
}
function testimonialintro(){
    
    gsap.from("#testimonialsintro h1",{
        x:-600,
        duration:1,
        scrollTrigger: {
            trigger: "#testimonialsintro h1",
            start: "top 60%", 
            end: "bottom bottom",
            scrub: 1,
            
        }

    })
}

function initializeAnimations() {
    
    intro_animation();
    page2intro();
    services();
    whyintro();
    // why();
    testimonialintro();
    // contact();
    if (window.matchMedia("(min-width: 1024px)").matches) {
        // spinny();
        curser();
        page2();
    }else{
        menumob();
        page2mob();
    }
    // lazyLoadWhySection();
    
}

// function lazyLoadWhySection() {
//     const whySection = document.querySelector('#page2intro'); // Replace with your actual section selector

//     if ('IntersectionObserver' in window) {
//         const observer = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     why();
//                     observer.unobserve(whySection); // Stop observing once `why()` has been triggered
//                 }
//             });
//         });

//         observer.observe(whySection);
//     } else {
//         // Fallback if Intersection Observer is not supported
//         window.addEventListener('scroll', function onScroll() {
//             const rect = whySection.getBoundingClientRect();
//             if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
//                 why();
//                 window.removeEventListener('scroll', onScroll); // Stop listening after `why()` is triggered
//             }
//         });
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
   initializeAnimations();
   
});

document.addEventListener('DOMContentLoaded', function() {
    const lazyWidget = document.querySelector('.lazy-widget');
    
    const widgetObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const script = document.createElement('script');
                script.src = "//widget.tagembed.com/embed.min.js";
                script.type = "text/javascript";
                document.body.appendChild(script);
                
                observer.unobserve(entry.target);
            }
        });
    });

    if (lazyWidget) {
        widgetObserver.observe(lazyWidget);
    }
});




const rcbtn = document.querySelector(".intro button");
const rcbtn1 = document.querySelector("#rcb .rcbtn");
const rcbform = document.querySelector("#rcbform");
const rcbformcls = document.querySelector("#rcbform i");
const closebt = document.querySelector(".success i");
const success = document.querySelector(".success");
rcbtn.addEventListener('click', function(event) {
    event.preventDefault(); 

    if (window.matchMedia("(min-width: 1024px)").matches) {
        // For large screens, show the form
        console.log("dt clicked");
        rcbform.style.visibility = "visible"; 
    } else {
        // For mobile screens, scroll down to the #rcb div and position it higher on the screen
        const rcb = document.getElementById("rcb");
        const scrollOffset = -400; // Adjust this value to scroll further up
        const scrollPosition = rcb.offsetTop - (window.innerHeight / 2) + (rcb.clientHeight / 2) - scrollOffset;
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }
});
rcbtn1.addEventListener('click', showForm);
function showForm(event) {
    event.preventDefault(); 
    rcbform.style.visibility = "visible"; 
}


rcbformcls.addEventListener('click', function(event) {
    event.preventDefault(); 
    rcbform.style.visibility = "hidden"; 
});
closebt.addEventListener('click', function(event) {
    event.preventDefault(); 
    rcbform.style.visibility = "hidden"; 
    success.style.visibility="hidden";
});


function contact(){
    var isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    var start1 = isLargeScreen ? 0 : 30;
    var tl3=gsap.timeline({
        scrollTrigger: {
            trigger: "#contact",
            start: `top ${start1}%`, 
            end: "bottom bottom",
            scrub: 1,
            pin:true
            
        }
    })
    tl3.from(".owner",{
        x:-350,
        duration:2,
        delay:1
    })
    tl3.from(".info ",{
        x:-700,
        duration:1
    })
    
}



function intro_animation(){
    var move=window.matchMedia("(min-width: 1024px)").matches ? 200: 90;
    
    var tl = gsap.timeline({
        onComplete: function() {
            
            document.body.style.overflow = "visible";
            showScrollNow();
        }
    });

    var logoscale=window.matchMedia("(min-width: 1024px)").matches ? 3: 2;
   
    document.body.style.overflow = "hidden";
    

    gsap.to("body", { visibility: "visible" });

    tl.from(".logo h1",{
        opacity:0,
        delay:1,
    },"a");

    tl.from(".engine",{
        opacity:0,
        duration:1
    },"a");

    
    gsap.set(".bar", {
        transform:"scaleX(0)"
    });

    
    gsap.to(".bar", {
        scaleX: 1,
        duration: 3, 
        ease: "slow(0.7, 0.7, false)"
    });

    window.addEventListener("load", function() {
        document.getElementById("page1").classList.remove("opacity-0");
        
        tl.from(".logo h1",{
            y:350,
            scale:logoscale,
            duration:2,
            delay:1,
            onStart: function() {
                why(); // Trigger why() right as the first animation starts
            }
        });

        tl.from("nav i",{
            rotate:720,
            opacity:0,
            duration:1
        });

        tl.to(".engine",{
            opacity:0,
            duration:0.5
        });

        tl.from(".quote h2",{
            opacity:0,
            duration:1,
            y:30
        });

        tl.to(".quote h2",{
            opacity:0,
            duration:1,
            delay:0.5,
            y:-30
        });

        tl.from(".intro p",{
            opacity:0,
            x:-200,
            duration:1.2,
        });

        tl.to(".intro p",{
            color:"#f21515",
            duration:1,
        });
        
        

        tl.from(".intro h3",{
            opacity:0,
            duration:1,
        },"line1");

        tl.from(".banner img",{
            opacity:0,
            x:300,
            duration:1
        },"line1");

        tl.from(".intro button",{
            opacity:0,
            duration:0.5
        });

        if (window.matchMedia("(min-width: 1024px)").matches) {
            let logomove=-(screen.width/2.7)
            console.log(logomove);
            tl.to("nav i", { rotate: -180, duration: 0.5 },"line1");
            tl.to(".logo h1", { x: logomove, duration: 0.5 },"line1");
            tl.to(".menu", { right: move, duration: 0.5 },"line1");
        }
    });
}


function sendMail(event){
    event.preventDefault();
    console.log("clicked");
    document.querySelector("form button").disabled = true;
    let parms={
        name:document.getElementById("name").value,
        car:document.getElementById("car").value,
        phone:document.getElementById("phone").value
    }
    emailjs.send("service_9xbla4o","template_af5itw4",parms).then(function(res){
        success.style.visibility = "visible"; 
        document.querySelector("form button").disabled = false;
    });
}




const logo = document.querySelector('.logo h1');
const menuIcon = document.querySelector('nav i');
const menu = document.querySelector('.menu');
let menuVisible = false;

menuIcon.addEventListener('click', function() {
    console.log("geared");
    var move=window.matchMedia("(min-width: 1024px)").matches ? 200: 90;
    if (!menuVisible) {
        gsap.to(menuIcon, { rotate:-180, duration: 0.5 },); 
        gsap.to(logo, { x: -520, duration: 0.5 },); 
        gsap.to(menu, { right: move, duration: 0.5 },); 
        
    } else {
        gsap.to(logo, { x: 0, duration: 0.5 }); 
        gsap.to(menu, { right: '-100%', duration: 0.5 ,}); 
        gsap.to(menuIcon, { rotate:0, duration: 0.5 });
    }
    
    menuVisible = !menuVisible;
});
let lastScrollTop = 0;
const nav = document.querySelector('nav');
function menumob(){
    const logo = document.querySelector('.logo h1');
    const menuIcon = document.querySelector('nav i');
    const menu = document.querySelector('.menu');
    gsap.to([menuIcon, logo, menu], {
        scrollTrigger: {
          trigger: 'nav', 
          start: 'top top', 
          end: 'bottom top', 
          scrub: 1, 
          onEnter: () => {
              gsap.to(menuIcon, { rotate:-180, duration: 0.5 },); 
              gsap.to(logo, { x: -520, duration: 0.5 },); 
              gsap.to(menu, { right: 90, duration: 0.5 },); 
          }
        } 
      });
}

// function spinny(){
//     var tl5=gsap.timeline({
//         scrollTrigger: {
//             trigger: "#spinny",
//             start: "top 0%", 
//             end: "bottom bottom",
//             scrub: 1,
//             pin:true
            
//         }
//     })
//     tl5.from(".images i",{
//         rotate:180,
//         scale:0,
//         duration:1
//     })
//     tl5.from(".kmlogo",{
//         x:-200,
//         opacity:0,
//         duration:1
//     },"sam")
//     tl5.from(".spnlogo",{
//         x:200,
//         opacity:0,
//         duration:1
//     },"sam")
//     tl5.from("#spinny p",{
//         opacity:0,
//         duration:1
//     })

// }