/*navegation----------------*/
(()=>{
const hamburgerBtn =document.querySelector(".hamburger-bnt"),
navMenu=document.querySelector(".nav-menu"),
closeNavBtn =navMenu.querySelector(".close-nav-menu");

hamburgerBtn.addEventListener("click", showNavMenu);
closeNavBtn.addEventListener("click" ,hideNavMenu);

function showNavMenu(){
navMenu.classList.add("open");
bodyScrollingToggle();
}
function hideNavMenu(){
   navMenu.classList.remove("open");
   fadeOutEffect();
   bodyScrollingToggle();
}
function fadeOutEffect(){
document.querySelector(".fade-out-effect").classList.add("active");
setTimeout(()=>{
   document.querySelector(".fade-out-effect").classList.remove("active");
},300)
}
//attach and event
document.addEventListener("click", (event)=>{
if(event.target.classList.contains('link-item')){
  if(event.target.hash !==""){
   event.preventDefault();  
   const hash =event.target.hash;
   //descative
   document.querySelector(".section.active").classList.add("hide");
   document.querySelector(".section.active").classList.remove("active");
   // active
   document.querySelector(hash).classList.add("active");
   document.querySelector(hash).classList.remove("hide");
   //desactive existing active navegation
   navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
   navMenu.querySelector(".active").classList.remove("active","inner-shadow");
   
   if(navMenu.classList.contains("open")){
      //active new navigator menu
   event.target.classList.add("active","inner-shadow");
   event.target.classList.remove("outer-shadow","hover-in-shadow");
   // hide
   hideNavMenu();
   }else{
      let navItems=navMenu.querySelectorAll(".link-item");
      navItems.forEach((item)=>{
         if(hash === item.hash){
            //active
            item.classList.add("active","inner-shadow");
            item.classList.remove("outer-shadow","hover-in-shadow");
            
         }
      })
      fadeOutEffect();
   }
   //add hash
   window.location.hash=hash;
  }
}
})
})();

/*about*/
(() =>{
 const aboutSection=document.querySelector(".about-section"),
 tabsContainer=document.querySelector(".about-tabs");
 
 tabsContainer.addEventListener("click",(event)=>{
    
    if(event.target.classList.contains("tab-item") &&
    !event.target.classList.contains("active")){
        const target =event.target.getAttribute("data-target");
     //desactive existing active
     tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
     //active new 'tab-item'
     event.target.classList.add("active","outer-shadow");
     //desactive exisiting active
     aboutSection.querySelector(".tab-content.active").classList.remove("active");
    //active 'tab -content'
    aboutSection.querySelector(target).classList.add("active");
    }
 })
})();





//
function bodyScrollingToggle(){
   document.body.classList.toggle("stop-scrolling");
}
// Portafolio
(() =>{
 const filterContainer =document.querySelector(".portafolio-filter"),
 portafolioItemsContainer =document.querySelector(".portafolio-items"),
 portafolioItems=document.querySelectorAll(".portafolio-item"),
 popup=document.querySelector(".portafolio-popup"),
 prevBtn=popup.querySelector(".pp-prev"),
 nextBtn=popup.querySelector(".pp-next"),
 closeBtn= popup.querySelector(".pp-close"),
 porjectDetailsContainer=popup.querySelector(".pp-details"),
 projectDetailsBtn= popup.querySelector(".pp-project-details-btn");
 let itemIndex, slideIndex, screenshots;

 /*filter portafolio items */
filterContainer.addEventListener("click", (event)=>{
   if(event.target.classList.contains("filter-item") &&
   !event.target.classList.contains("active")){
      //desactive
   filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
   //active
event.target.classList.add("active", "outer-shadow");   
const target =event.target.getAttribute("data-target");
portafolioItems.forEach((item)=>{
   if(target == item.getAttribute("data-category") || target ==='all'){
      item.classList.remove("hide");
      item.classList.add("show");
   }else{
      item.classList.remove("show");
      item.classList.add("hide");
   }
})
}
})

portafolioItemsContainer.addEventListener("click",(event)=>{
   if(event.target.closest(".portafolio-item-inner")){
      const portafolioItem =event.target.closest(".portafolio-item-inner").parentElement;
      // get
      itemIndex =Array.from(portafolioItem.parentElement.children).indexOf(
         portafolioItem);
      screenshots=portafolioItems[itemIndex].querySelector(".portafolio-item-img img").getAttribute("data-screenshots");
      //convert
      screenshots=screenshots.split(",");
      if(screenshots.length ===1){
         prevBtn.style.display="none";
         nextBtn.style.display="none";
      }else{
         prevBtn.style.display="block";
         nextBtn.style.display="block";
      }
      slideIndex=0;
      popupToggle();
      popupSlideshow();
      popupDetails();
   }
})
 closeBtn.addEventListener("click", ()=>{
popupToggle(); 
})
function popupToggle(){
   popup.classList.toggle("open");
   bodyScrollingToggle();
}

//////////////////////////////////////

function  popupSlideshow(){
   const imgSrc = screenshots[slideIndex];
   const popupImg =popup.querySelector(".pp-img");
   //Activate
   popup.querySelector(".pp-loader").classList.add("active")
   popupImg.src=imgSrc;
   popupImg.onload =()=>{
      //desactive
      popup.querySelector(".pp-loader").classList.remove("active");
   }
   popup.querySelector(".pp-counter").innerHTML=(slideIndex+1)+ " of " + screenshots.length;
}
//next slide
nextBtn.addEventListener("click", ()=>{
if(slideIndex === screenshots.length-1){
   slideIndex=0;
}else{
   slideIndex++;
}
popupSlideshow();
console.log("slideIndex:"+slideIndex);
})
//prev
prevBtn.addEventListener("click",()=>{
   if(slideIndex ===0){
      slideIndex=screenshots.length-1
   }else{
      slideIndex--;
   }
   popupSlideshow();
   console.log("slideIndex:"+slideIndex);
})

function popupDetails(){
   if(!portafolioItems[itemIndex].querySelector(".portafolio-item-details")){
      projectDetailsBtn.style.display="none";
      return;
   }
   projectDetailsBtn.style.display="block";

   const details =portafolioItems[itemIndex].querySelector(".portafolio-item-details").innerHTML;
   popup.querySelector(".pp-project-details").innerHTML=details;
   const title =portafolioItems[itemIndex].querySelector("portafolio-item-title").innerHTML;
   popup.querySelector(".pp-title h2").innerHTML=title;
   const category = portafolioItems[itemIndex].getAttribute("data-category");
   popup.querySelector(".pp-project-category").innerHTML=category.split("-"
   ).join(" ");
}

projectDetailsBtn.addEventListener("click", ()=>{
   popupDetailsToggle();
})
function popupDetailsToggle(){
if(porjectDetailsContainer.classList.contains("active")){
projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
projectDetailsBtn.querySelector("i").classList.add("fa-plus");
   porjectDetailsContainer.classList.remove("active");
porjectDetailsContainer.style.maxHeight =0 + "px"
}else{
   projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
   projectDetailsBtn.querySelector("i").classList.add("fa-minus");
   porjectDetailsContainer.classList.add("active");
   porjectDetailsContainer.style.maxHeight =porjectDetailsContainer.scrollHeight +"px";
   popup.scrollTo(0,porjectDetailsContainer.offsetTop);
}
}
})(); 

/**testimonial */
(() =>{
const sliderContainer =document.querySelector(".testi-slider-container"),
slides= sliderContainer.querySelectorAll(".testi-item"),
slideWidth =sliderContainer.offsetWidth,
prevBtn=document.querySelector(".testi-slider-nav .prev"),
nextBtn=document.querySelector(".testi-slider-nav .next");
let slideIndex=0;
//set witdh
slides.forEach((slide)=>{
slide.style.width =slideWidth + "px";
})
// ser with container
sliderContainer.style.width=slideWidth*slides.length + "px";
nextBtn.addEventListener("click",()=>{
   if(slideIndex === slides.length-1){
      slideIndex=0
   }else{
      slideIndex++;
   }
   slider();
} )
prevBtn.addEventListener("click",()=>{
   if(slideIndex === 0){
      slideIndex=slides.length-1;
   }else{
      slideIndex--;
   }
   slider();
} )

function slider(){
   sliderContainer.style.marginLeft= - (slideWidth*slideIndex)+ "px";
}


})();

/**------------hide all */
(()=>{
   const sections= document.querySelectorAll(".section");
   sections.forEach((section)=>{
      if(!section.classList.contains("active")){
         section.classList.add("hide");
      }
   })
})();


window.addEventListener("load",()=>{
   //preloader
   document.querySelector(".preloader").classList.add("fade-out");
   setTimeout(()=>{
      document.querySelector(".preloader").style.display="none";
   },600)
})