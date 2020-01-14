"use strict";

function renderGallery (target,data) {
    let HTML = '';
    const targetDOM = document.querySelector(target);

    //target vietos validavimas
    if (typeof(target) !== 'string') {
        return console.error('ERROR: vietos selektorius turi buti tekstinio tipo.')
    }
    if (target.length ===0 ) {
        return console.error('ERROR: vietos selektorius negali buti tuscias.')
    }
    if ( targetDOM === null ) {
        return console.error('ERROR: npagal pateikta selektoriu norima vieta/elementas nerastas.')
    }

    //pradinis duomenu validavimas
    if (!Array.isArray(data)) {
        return console.error('ERROR: negaliu sugeneruoti "GALLERY" sekcijos del blogo formato.')
    }
    if (data.length === 0) {
        return console.error('ERROR: negaliu sugeneruoti "GALLERY" sekcijos del tuscio saraso.')
    }

    // Viska apjungiame i galutine galeryja
    HTML = `<div class="gallery">
                <div class="gallery-filter">
                    ${generateGalleryFilter( data )}
                </div>
                <div class="gallery-list">
                    ${generateGalleryList( data )}
                </div>
            </div>`;

    targetDOM.innerHTML = HTML;

    // Sudeti eventlistener ant filtravimo elementu

    return; 
}
function generateGalleryFilter( data ) {
    console.log(data);
    
    return 'GALLERY FILTER';
}
function generateGalleryList( data ) {
    let HTML = '';
    for ( let i=0; i<data.length; i++) {
        const work = data[i];

        let catHTML = '';
        for (let c=0; c<work.category.length; c++) {
            catHTML += `<span class="cat">${work.category[c]}</span>`;
        }

        HTML += `<div class="gallery-item">
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