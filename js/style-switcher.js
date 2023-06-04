const styleSwitcherToggler=document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", ()=>{
document.querySelector(".style-switcher").classList.toggle("open");
})
//hide style
window.addEventListener("scroll", ()=>{
    if(document.querySelector("style-switcher").classList.contains("open")){
        document.querySelector(".style-swicher").classList.remove("open");
    }
})

//theme color

const alternateStyles = document.querySelectorAll(".alternative-style");
function setActivesStyle(color){
    alternateStyles.forEach((style)=>{
        if(color === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }else{
            style.setAttribute("disabled", "true");
        }
    })
}
///function changeColor(){
///    alternateStyles.forEach((style)=>{
///        if(localStorage.getItem("color")=== style.getAttribute(""))
///    })
///}
///////////////////////////
const dayNight =document.querySelector(".day-night");
dayNight.addEventListener("click",()=>{
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
})
window.addEventListener("load", ()=>{
if(document.body.classList.contains("dark")){
dayNight.querySelector("i").classList.add("fa-sun");
}else{
dayNight.querySelector("i").classList.add("fa-moon");
}
})