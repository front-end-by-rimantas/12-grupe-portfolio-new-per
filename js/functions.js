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

// my-skills

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
        console.log(HTML);
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

     // // document.getElementById("skills_progress_bars_right").innerHTML=HTML;
       


    return;
}