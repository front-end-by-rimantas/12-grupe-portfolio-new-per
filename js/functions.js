"use strict";


//hero 

function manipulateLetter( list, wordIndex, letterIndex, actionType) {
    //elementai, kurie animuotai keicia teksta
        const target = document.getElementById('hero_line3');
        const timeStep = 80;
        const delayBefore = 600;
        const delayAfter = 600;
        const deleteTimeStep = 80;
        

   if (actionType === 'add') {
       target.classList.add('line2');
      setTimeout (() => {
          
        target.textContent += list[wordIndex][letterIndex] ;

        if (list[wordIndex].length > letterIndex + 1 ) {
            manipulateLetter( list, wordIndex, letterIndex + 1, actionType)
        } else {
            manipulateLetter( list, wordIndex, letterIndex , 'delayAfter')
        }

    }, timeStep);
       
   }
   if (actionType === 'delayAfter') {
    setTimeout (() => {
        const word = list[wordIndex];
        target.textContent = word.slice(0, letterIndex);

        if ( 0 <= letterIndex -1 ){
            manipulateLetter( list, wordIndex, letterIndex - 1, actionType)  
        } else {
            manipulateLetter( list, wordIndex, letterIndex, 'delayBefore')
        }
                 
    }, deleteTimeStep);

   }

   if (actionType === 'delayBefore') {
    
    setTimeout (() => {

        if ( wordIndex +1 === list.length ) {
            manipulateLetter( list, 0, 0, 'add')
        } else {
            manipulateLetter( list, wordIndex+1, 0, 'add')
        }

        }, delayBefore);
    
    }
}
   
    //begalinis ciklas siuo atveju netinka
    //kad cikla galetume prasukti iki begales, reikalinga lygybe prie i elemento saraso ilgio
    // for ( let i=0; i<=list.length; i++ ) {
        //jeigu saraso ilgis lygus, nuresetinam i nuli, geriau nedaryti, kad neuzsukti begalybes
        // if ( i=== list.length ) i=0;
        //tekstas, kuri reikia animuoti
        // const text = list[i];

// gallery

function renderGallery( target, data ) {
    let HTML = '';
    const targetDOM = document.querySelector(target);

    // target vietos validavimas
    if ( typeof(target) !== 'string' ) {
        return console.error('ERROR: vietos selectorius turi buti tekstinio tipo.');
    }
    if ( target.length === 0 ) {
        return console.error('ERROR: vietos selectorius negali buti tuscias tekstas.');
    }
    if ( targetDOM === null ) {
        return console.error('ERROR: pagal pateikta selectoriu norima vieta/elementas nerastas.');
    }

    // pradinis duomenu validavimas
    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Gallery" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Gallery" sekcijos, del tuscio saraso.');
    }

    // viska apjungiame i galutine galerija
    HTML = `<div class="gallery">
                <div class="gallery-filter">
                    ${ generateGalleryFilter( data ) }
                </div>
                <div class="gallery-list">
                    ${ generateGalleryList( data ) }
                </div>
            </div>`;
    
    targetDOM.innerHTML = HTML;

    // sudeti eventListener ant filtravimo elementu
    const filterItems = targetDOM.querySelectorAll('.filter-item');
    const galleryItems = targetDOM.querySelectorAll('.gallery-item');
    
    for ( let i=0; i<filterItems.length; i++ ) {
        // pridedam event listenerius
        filterItems[i].addEventListener('click', (event) => {
            // suzinome kas buvo paspaustas
            const findWhat = event.target.textContent;

            if ( findWhat === 'All categories' ) {
                // ieskome kuriuose gallery-item elementuose yra paminetas findWhat
                for ( let w=0; w<galleryItems.length; w++ ) {
                    const work = galleryItems[w];
                    work.classList.remove('hide');
                }
            } else {
                // ieskome kuriuose gallery-item elementuose yra paminetas findWhat
                for ( let w=0; w<galleryItems.length; w++ ) {
                    const work = galleryItems[w];
                    const categories = work.dataset.categories;


    
                    if ( categories.indexOf(findWhat) >= 0 ) {
                        work.classList.remove('hide');
                    } else {
                        work.classList.add('hide');
                    }
                }
            }
        })
    }

    return;
}

function generateGalleryFilter( data ) {
    let HTML = '<div class="filter-item active">All categories</div>';
    let list = [];
    let uniqueList = [];

    // surenkame visas kategorijas i viena sarasa
    for ( let i=0; i<data.length; i++ ) {
        const subList = data[i].category;

        // atrenkame ir paliekame tik unikalias kategorijas is surinkto saraso
        for ( let i=0; i<subList.length; i++ ) {
            const category = subList[i].toLowerCase();

            if ( uniqueList.indexOf(category) === -1 ) {
                uniqueList.push(category);
            }
        }
    }

    // for ( let i=0; i<data.length; i++ ) {
    //     list = list.concat(data[i].category);
    // }
    
    // uniqueList = list.filter( (cat, i) => list.indexOf(cat) === i );

    // sukonstruojame HTML
    for ( let i=0; i<uniqueList.length; i++ ) {
        HTML += `<div class="filter-item">${uniqueList[i]}</div>`;
    }
    
    return HTML;
}

function generateGalleryList( data ) {
    let HTML = '';

    for ( let i=0; i<data.length; i++ ) {
        const work = data[i];

        let catHTML = '';
        for ( let c=0; c<work.category.length; c++ ) {
            catHTML += `<span class="cat">${work.category[c]}</span>`;
        }
        
        HTML += `<div class="gallery-item"
                    data-categories="${(''+work.category).toLowerCase()}"
                    data-lightbox="img">
                    <img src="./img/portfolio/${work.img}">
                    <div class="texts">
                        <span class="title">${work.title}</span>
                        <div class="categories">
                            ${catHTML}
                        </div>
                    </div>
                </div>`;
    }

    return HTML;
}



//achievement

function renderAchievements( data ) {
    const maxBlocks = 4;
    let createdBlocks = 0;
    let HTML = '';

    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Achievements" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Achievements" sekcijos, del tuscio saraso.');
    }

    // sugeneruojame HTML
    for ( let i=0; i<data.length; i++ ) {
        if ( createdBlocks === maxBlocks ) {
            break;
        }
        const block = data[i];

        // tikrinu, ar tai objektas
        if ( typeof(block) !== 'object' ||
             block === null ||
             Array.isArray(block) ) {
            continue;
        }

        if ( (block.icon || (typeof(block.icon) === 'string' && block.icon.length > 0)) &&
             (block.number || block.number > 0) &&
             (block.title || (typeof(block.title) === 'string' && block.title.length > 0)) ) {
            HTML += `<div class="col-3 col-sm-6 col-xs-12 block">
                        <i class="fa fa-${block.icon}"></i>
                        <span>${block.number}</span>
                        <h4>${block.title}</h4>
                    </div>`;
            
            createdBlocks++;
        }
    }
    
    // istatome HTML i reikiama vieta
    if ( createdBlocks === 0 ) {
        document.querySelector('#achievements').remove();
    } else {
        document.querySelector('#achievements > .row').innerHTML = HTML;
    }

    return;
}

// My Resume

function renderMyresume( data ) {
    const maxLines = 6;
    let createdLines = 0;
    let HTMLright = '';
    let HTMLleft = '';


   for ( let i=0; i<data.length; i++ ) {
        if ( createdLines === maxLines ) {
            break;
        }
        const line = data[i];
        if ( line.occupation === 'edu') {

              HTMLright +=`
                    <ul class="left col-6 resume-content resolution">
                        <li >
                        <span>${line.line1}</span>
                        <h5>${line.line2}</h5>
                        <h6>${line.line3}</h6>
                        </li>
                    </ul>`;
        }
                else   {         
                HTMLleft += `
                    <ul class="right col-6 resume-content">
                        <li >
                        <span>${line.line1}</span>
                        <h5>${line.line2}</h5>
                        <h6>${line.line3}</h6>
                        </li>
                    </ul>`;
      
        }  
            createdLines++;
    }
    
        document.querySelector('#myresume').innerHTML = HTMLright;       
        document.querySelector('#myresume-left').innerHTML = HTMLleft;
 
    return;
}
function renderSkills( data ) {
    let HTML = '';
    let HTML1 = '';

    if ( !Array.isArray(data) ) {
        return console.error('ERROR: negaliu sugeneruoti "Skills" sekcijos, del blogo formato duomenu.');
    }
    if ( data.length === 0 ) {
        return console.error('ERROR: negaliu sugeneruoti "Skills" sekcijos, del tuscio saraso.');
    }

    for ( let i=0; i< data.length/2; i++ ) {
        const skills = data[i];
       
        HTML += `<div class="progress-bar">
        <div class="texts">
            <div class="title">${skills.title}</div>
            <div class="value">${skills.value}%</div>
        </div>
        <div class="bar">
            <div class="value" style="width: ${skills.value}%;">
                <div class="loading"></div>
        </div>
        </div>
    </div>`;
    }
        document.querySelector(`#skills_progress_bars_left`).innerHTML = HTML; 
        
        for ( let i=data.length/2; i< data.length; i++ ) {
            const skills = data[i];
           
            HTML1 += `<div class="progress-bar">
            <div class="texts">
                <div class="title">${skills.title}</div>
                <div class="value">${skills.value}%</div>
            </div>
            <div class="bar">
                <div class="value" style="width: ${skills.value}%;">
                    <div class="loading"></div>
            </div>
            </div>
        </div>`;
        }
       document.querySelector(`#skills_progress_bars_right`).innerHTML = HTML1; 

     
       
    return;
}
//latest blog 


function renderBlog( list ) {
     let HTML = '';
     if ( !Array.isArray(list) ) {
        return console.error('ERROR: blogo formato duomenys.');
    }
    if ( list.length === 0 ) {
        return console.error('ERROR:negali buti tuscias sarasas.');
    }

    for ( let i=0; i<list.length; i++ ) {
        const art = list[i];


        HTML += `<div class="blog row">
        <img src="./img/blog/${art.photo.src}" alt="${art.photo.alt}">
        <a class="category" href="#/art-by-category/${art.category}">${art.category}</a>
        <a class="titlee" href="${art.link}">${art.title}</a>
        <p>${art.description}</p>
        <div class="separator"></div>
        <div class="user">
        <img src="./img/testimonel/${art.user.src}" alt="${art.photo.alt}"> 
        <span class="creator"  
        class="date">BY: ${art.creator.name} ${art.creator.surname} | ${art.date.day} ${art.date.month} ${art.date.year}</span> 
        </div>
     </div>`
    }
return document.querySelector('#blog > .blog-list').innerHTML = HTML;
 }
    

//MY SERVICES

function renderServices( myServicesList ) {
    let HTML = '';

    for ( let i=0; i<myServicesList.length; i++ ) {
        const myServices = myServicesList[i];
        HTML += `<div class="service row col-4 col-md-6 col-xs-12">
                    <i class="zmdi zmdi-${myServices.icon}"></i>
                    <h4>${myServices.title}</h4>
                    <p>${myServices.description}</p>
                </div>`;
                if (i === 2) { HTML += `<div class="separator"></div>` }
    }
    
    return document.querySelector('#services_list').innerHTML = HTML;
}

//LIGHTBOX


function lightbox () {
    const elements = document.querySelectorAll('[data-lightbox]');
    
    elements.forEach( elem => {
        elem.addEventListener('click', updateLightbox) 
    })
}

function updateLightbox() {    
    const lightboxDOM = document.querySelector('.lightbox');
    console.log(lightboxDOM);  

    // Jei lightbox'o dar nera - sukuriame
    
    if ( !lightboxDOM) {
        const HTML = `
            <div class="lightbox">
                <div class="background"></div>
                <div class="content">
                    <img src="#">
                    <i class="fa fa-times"></i>
                </div>
            </div>`;
            document.querySelector('body')
                .insertAdjacentHTML('beforeend', HTML);
    }
}

// Testimonials

function renderTestimonials(target, data) {
    const DOM = document.querySelector(target);
    let testimonialsHTML = '';

    // Atnaujiname duomenis: klonai pirmas gale, paskutinis priekyje
    // data.push(data[0]);
    // data.unshift(data[data.length-2])
    data = [ data[data.length-1], ...data, data[0] ];
    const middleIndex = Math.floor(data.length / 2 );

    for ( let i=0; i<data.length; i++) {
        testimonialsHTML += generateTestimonial(data[i]);
    }

    const HTML = `<div class="testimonials" data-index="${middleIndex}">
                    <div class="list"
                        style="width: ${data.length}00%;
                        margin-left: -${middleIndex}00%;">${testimonialsHTML}</div>
                    <div class="controls">
                        <i class="fa fa-angle-left"></i>
                        <div class="line">
                            <div class="bar"
                                style="margin-left: ${(middleIndex - 1) * 100 / (data.length - 2)}%;
                                    width: ${100 / (data.length - 2)}%;"></div>
                        </div>
                        <i class="fa fa-angle-right"></i>
                    </div>
                </div>`;

    DOM.innerHTML = HTML;

    const arrows = DOM.querySelectorAll('.controls > .fa')

    arrows.forEach( arrow => arrow.addEventListener('click', updateTestimonials));

    // for (let i=0; i<arrows.length; i++ ) {
    //     const arrow = arrows[i];
    //     arrow.addEventListener('click', updateTestimonials)
    // }  // Менее красивыйб но более эффективный способ записи
    
    return;
}

function generateTestimonial(data) {
    const fullStars = Math.round(data.stars * 2) / 2;
    const fullHTML = '<i class="fa fa-star"></i>'.repeat(Math.floor(fullStars));
    const halfHTML = '<i class="fa fa-star-half-o"></i>'.repeat(fullStars%1 === 0 ? 0 : 1);
    const emptyHTML = '<i class="fa fa-star-o"></i>'.repeat(5 - Math.ceil(fullStars));

    return `<div class="testimonial" style="width: 20%">
                <div class="quote">awwwesome work</div>
                <div class="stars">${fullHTML + halfHTML + emptyHTML}</div>
                <div class="text">${data.text}</div>
                <div class="author">${data.author}</div>
                <div class="profession">${data.profession}</div>
            </div>`;
}

function updateTestimonials( event ) {
    if ( testimonialsAnimationInProgress === true ) {
        return;
    }
    testimonialsAnimationInProgress = true;
    const elem = event.target;
    const parent = elem.closest('.testimonials');
    const list = parent.querySelector('.list');
    const bar = parent.querySelector('.bar');
    const currentIndex = parseInt(parent.dataset.index);

    let direction = 1;
    if ( elem.classList.contains('fa-angle-left') ) {
        direction = -1;
    }
    let nextIndex = currentIndex + direction;
    
    parent.setAttribute('data-index', nextIndex);
    list.style.marginLeft = nextIndex * -100 + '%';

    // jei i ekrana ivaziuoja "klonai", tai juos "teleportuojame"
    if ( nextIndex === 0 ) {
        setTimeout(() => {
            list.classList.add('no-animation');
            nextIndex = testimonials.length;
            parent.setAttribute('data-index', nextIndex);
            list.style.marginLeft = testimonials.length * -100 + '%';
        }, 1000);
        setTimeout(() => {
            list.classList.remove('no-animation');
        }, 1100)
    }
    if ( nextIndex === testimonials.length + 1 ) {
        setTimeout(() => {
            list.classList.add('no-animation');
            nextIndex = 1;
            parent.setAttribute('data-index', nextIndex);
            list.style.marginLeft = -100 + '%';
        }, 1000);
        setTimeout(() => {
            list.classList.remove('no-animation');
        }, 1100)
    }

    let barIndex = nextIndex;
    if ( nextIndex === 0 ) {
        barIndex = testimonials.length;
    }
    if ( nextIndex === testimonials.length + 1 ) {
        barIndex = 1;
    }
    bar.style.marginLeft = (barIndex - 1) * (100 / testimonials.length) + '%';
    

    setTimeout(() => {
        testimonialsAnimationInProgress = false;
    }, 1100);
}
