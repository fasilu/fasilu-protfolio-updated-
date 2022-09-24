       /*===== Resize Navbar on Scroll =====*/
       var navbar = document.querySelector(".navbar");
       // when the scroll is higher than 20 viewport height, add the sticky classs to the tag with a class navbar 
       window.onscroll = () =>{
       this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
     }
     // strting off the text typing
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};   
// end of the typing animation
      /*===== Nav Toggler =====*/
      const navMenu = document.querySelector(".menu");
      navToggle = document.querySelector(".menu-btn");
      if(navToggle)
      {
          navToggle.addEventListener("click", () =>
          {
              navMenu.classList.toggle("active");
          })
      }
      // closing menu when link is clicked
      const navLink = document.querySelectorAll(".nav-link");
      function linkAction()
      {
          const navMenu = document.querySelector(".menu");
          navMenu.classList.remove("active")
      }
      navLink.forEach(n => n.addEventListener("click", linkAction))
      /*===== Scroll Section Active Link =====*/

      const Section=document.querySelectorAll('section[id]')
      function scrollActive()
      {
          const scrollY = window.pageYOffset
          Section.forEach(current => {
              const sectionHeight = current.offsetHeight
              const sectionTop = current.offsetTop - 50;
              sectionId = current.getAttribute('id')
              if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
              {
                  document.querySelector('.links a[href*=' + sectionId + ']').classList.add('active')
              }
              else
              {
                document.querySelector('.links a[href*=' + sectionId + ']').classList.remove('active')
              }
          })
      }
      window.addEventListener('scroll', scrollActive)
      /*===== Skills Animation =====*/
      const skills_wrap = document.querySelector(".about-skills"),
      skills_bar = document.querySelectorAll(".progress-line");
      window.addEventListener("scroll", () => {
          skillsEffect();
      })
      // every time we scroll checking, we exceeded the about-skills or not
      function checkScroll(el)
      {
          //getting the top position of about-skills relative to view port, in other words we need to get
          // amount of pixels between about-skills and the top edge of the window.
          let rect = el.getBoundingClientRect();
          // after knowing the amount of pixels between the top edge of about skills and the top edge of window
          // now we will check we exceeded the bottom edge of about skills or not
          if(window.innerHeight >= rect.top + el.offsetHeight) return true;
          return false;
      }
      function skillsEffect()
      {
          if(!checkScroll(skills_wrap)) return;
          skills_bar.forEach((skill) => (skill.style.width = skill.dataset.progress));
      }
      /*===== Portfolio Item Filter =====*/
      const FilterContainer = document.querySelector(".portfolio-filter"),
            filterBtns = FilterContainer.children;
            totalFilterBtn = filterBtns.length;
            PortfolioItems = document.querySelectorAll(".portfolio-item"),
            totalportfolioItem = PortfolioItems.length;
            for(let i=0; i < totalFilterBtn; i++)
            {
                filterBtns[i].addEventListener("click", function()
                {
                    FilterContainer.querySelector(".active").classList.remove("active");
                    this.classList.add("active");
                    const filterValue = this.getAttribute("data-filter")
                    for( let k=0; k<totalportfolioItem; k++)
                    {
                        if(filterValue === PortfolioItems[k].getAttribute("data-category"))
                        {
                            PortfolioItems[k].classList.remove("hide");
                            PortfolioItems[k].classList.add("show");
                        }
                        else
                        {
                            PortfolioItems[k].classList.remove("show");
                            PortfolioItems[k].classList.add("hide");
                        }
                        if(filterValue === "all")
                        {
                            PortfolioItems[k].classList.remove("hide");
                            PortfolioItems[k].classList.add("show");
                        }
                    }
                })
            }
        /*===== Lightbox =====*/
        const lightbox = document.querySelector(".lightbox"),
                  lightboxImg = lightbox.querySelector(".lightbox-img"),
                  lightboxClose = lightbox.querySelector(".lightbox-close"),
                  lightboxText = lightbox.querySelector(".caption-text"),
                  lightboxCounter = lightbox.querySelector(".caption-counter");
                  let itemIndex = 0;
                  for(let i=0; i<totalportfolioItem; i++)
                  {
                     PortfolioItems[i].addEventListener("click", function()
                     {
                         itemIndex=i;
                         changeItem();
                         toggleLightbox();
                     })
                  }
                  function nextItem()
                  {
                      if(itemIndex == totalportfolioItem-1)
                      {
                          itemIndex=0;
                      }
                      else
                      {
                          itemIndex++
                      }
                      changeItem();
                  }
                  function prevItem()
                  {
                      if(itemIndex == 0)
                      {
                          itemIndex=totalportfolioItem-1;
                      }
                      else
                      {
                          itemIndex--
                      }
                      changeItem();
                  }
                  function toggleLightbox()
                  {
                      lightbox.classList.toggle("open");
                  }
                  function changeItem()
                  {
                      imgSrc = PortfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
                      lightboxImg.src=imgSrc;
                      lightboxText.innerHTML=PortfolioItems[itemIndex].querySelector("h4").innerHTML;
                      lightboxCounter.innerHTML=(itemIndex+1) + " of " + totalportfolioItem;
                  }
                  // close lightbox
                  lightbox.addEventListener("click",function(event)
                  {
                     if(event.target === lightboxClose || event.target === lightbox)
                     {
                        toggleLightbox()
                     }
                  })