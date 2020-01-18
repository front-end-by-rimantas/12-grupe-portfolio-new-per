"use strict";

//hero 

function manipulateLetter( list, wordIndex, letterIndex, actionType) {
    //elementai, kurie animuotai keicia teksta
        const target = document.getElementById('hero_line3');
        const timeStep = 100;
        const delayBefore = 1000;
        const delayAfter = 1000;
        const deleteTimeStep = 100;
        

   if (actionType === 'add') {
       target.classList.add('line');
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
    target.classList.add('line2');
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
       target.classList.remove ('line');
       
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

function renderGallery (data) {
    
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