"use strict";

function renderGallery (data) {
    console.log(data);
    
    return;
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