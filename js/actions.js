"use strict";

//hero
 manipulateLetter( spec, 0, 0, 'add');  

// GALLERY
renderGallery('#latest_works_gallery', works);


//achievements
renderAchievements( achievements );

//Myresume
renderMyresume( linesResume);

// my-skills
renderSkills( skills );

// MY SERVICES

renderServices( myServices );

//lightbox
lightbox();


renderTestimonials('#testimonials_block', testimonials);
