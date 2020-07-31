import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import $ from 'jquery';
import shuffle from 'lodash/shuffle';
import sample from 'lodash/sample';
import without from 'lodash/without';
import sampleSize from 'lodash/sampleSize';
import { Cloudinary } from 'cloudinary-core';

import './App.css';

const cl = new Cloudinary({
  cloud_name: 'listentoapril',
  secure: true,
});

const QUOTES = [
  {
    text:
      'what’s the most the most ominous thing we could do in this situation?',
    path: '/shred-everything',
    button: null,
  },
  {
    text:
      '“everyone who chooses to stay out of politics should make a mental note of where they would draw the line and feel it necessary to get involved. then ask yourself, is it possible that point already happened, but it happened too slowly to notice.”',
    path: '/spoiler-alert',
    button: 'noted.',
  },
  {
    text:
      'strange how this fire won’t go out, no matter how much gasoline we pour on it…',
    path: '/perplex',
    button: null,
  },
  {
    text:
      'if you vote for a billionaire and are not one yourself, you are a mouse voting for a cat.',
    path: '/run',
    button: null,
  },
  {
    text: 'ignorance is collaboration',
    path: '/ignorance-is-collaboration',
    button: 'I understand.',
  },
  {
    text:
      '“Leaving Disneyland open is US viking funeral shit. folks begging to get in so they can die twirling on flaming Teacups, desperate workers in big-head costumes keeling over on Main Street USA, stormtroopers dumping bodies on the tiny train, Masque of Red Death hijinks at Club 33”',
    path: '/toon-town-usa',
    button: null,
  },
  {
    text:
      '“when all humanity is gone, retailer’s mailing lists will continue sending "last chance at THE SALE! extra discount!" messages.”',
    path: '/now-more-than-ever',
    button: null,
  },
  {
    text:
      '“futures not achieved are only branches of the past: dead branches.”',
    path: '/invisible-cities',
    button: null,
  },
  {
    text:
      'Consumers, he says, “are like roaches–you spray them and spray them and they get immune after a while.”',
    path: '/herd-immunity',
    button: null,
  },
  {
    text:
      '…and the bells will clang as the angels sing “welcome to the city of saints”',
    path: '/you-ran-the-race',
    button: 'enter in the big white gates',
  },
  {
    text: '“like a boy, in a room, trying to catch a ghost”',
    path: '/thinnest',
    button: 'reach',
  },
  {
    text: '“without an audience, there is no reason for musicians to exist.”',
    path: '/no',
    button: 'but I am here…?',
  },
  {
    text: '“free speech is indeed alive and thriving in this country”',
    path: '/free-speechh',
    button: 'uh huh.',
  },
  {
    text: 'it isnt always perfect, but we are trying.',
    path: '/please-bear-with-us',
    button: 'I understand',
  },
  {
    text: 'planned obsolescences',
    path: '/upgrade',
    button: 'upgrade',
  },
  {
    text: 'low expectations',
    path: '/low-expectations',
    button: 'we have them',
  },
  {
    text: '“you shouldn’t let poets lie to you”',
    path: '/poetry',
    button: null,
  },
];

const ODES = [
  {
    items: ['Holocene', 'The Salk Institute', 'Elsewhere', 'Friends Only'],
    path: '/',
    button: null,
  },
  {
    items: ['Cap 3', 'The Syndicate', 'Tourmaline', 'Backslash (You’re Dead)'],
    path: '/moonraker',
    button: null,
  },
  {
    items: [
      'Hello Destiny',
      '3034 Dwight St.',
      'I’m Still Me',
      'New England Sunrise',
    ],
    path: '/tannhauser-gate',
    button: null,
  },
  {
    items: [
      'Tribute',
      'The Endless Obsession',
      'Hveragerði',
      'What Grown Ups Do',
    ],
    path: '/night-sky',
    button: null,
  },
  {
    items: [
      'Tribute',
      'The Endless Obsession',
      'Hveragerði',
      'What Grown Ups Do',
    ],
    path: '/moon-beam',
    button: null,
  },
  {
    items: [
      'Reykjadalur',
      'Excuses To Carry On',
      'Equilibrium',
      'Reversion to Mediocrity',
    ],
    path: '/graphene',
    button: null,
  },
];

const YOUTUBES = [
  {
    id: '-RaU7dXv5e8',
    path: '/somebody-more-like-myself',
    button: 'nothing to say',
  },
  { id: 'p46nOuCVnYc', path: '/nobody-is-home', button: 'interesting' },
  {
    id: 'vIdlYzbugT8',
    path: '/engineered',
    button: 'how does this make me any different than you?',
  },
  {
    id: 'V01oQ_BsX00',
    path: '/the-other-side-of-midnight',
    button: 'i think i just saw god in the window',
  },
  { id: '5QIYHIy28Do', path: '/unflinching', button: null }, // morricone
  { id: 't0KzLo0-6Ro', path: '/throw-pretty-slow-shade', button: null }, // bloodstone soul
  {
    id: 'TaNYhHpBUR0',
    path: '/how-are-you-so-sure',
    button: 'i see what you did there',
  }, // coniff
  { id: '1M-spyfmxEo', path: '/event-horizon', button: 'surely' },
  { id: 'vXtF9wg9Q1k', path: '/a-new-chance', button: null }, // gilmour french
  { id: 'Q1qMEPYv_P0', path: '/give-and-get', button: 'get through' },
  { id: 'LaZJeVJ8CwU', path: '/through-the-wired', button: null }, // matrix
  { id: 'WnuyXsS902k', path: '/get-it', button: null }, // fisheye
  { id: '9Y-0nWVdBH4', path: '/coffee-lights-city-3', button: null }, //dont-worry-baby
  { id: 'gFm46jfLm94', path: '/syndicate', button: null },
  { id: 'ZWWM-_Ff2Po', path: '/youth-brigade', button: null }, // aliens
  { id: 'XZGiVzIr8Qg', path: '/mtv', button: null }, // bowie mtv
  { id: 'IG79CHK1oFQ', path: '/nothing-to-prove', button: 'remember?' },
  {
    id: '1LDgfdU-RLg',
    path: '/deaf-dumb-blind',
    button: 'if i could be for only an hour',
  },
];

const HD_IMAGES = [
  {
    id: '/maze/hd/chris-studio-giggle-_1.jpg',
    path: '/nightshade',
    button: null,
  },
  { id: '/maze/hd/studio-bois-_1.jpg', path: '/slow-pretty', button: null },
  { id: '/maze/hd/IMG_1077.jpg', path: '/im-still-me', button: null },
  {
    id: '/maze/hd/IMG_1441.jpg',
    path: '/life-in-a-google-glass-house',
    button: null,
  },
  { id: '/maze/hd/IMG_1722.jpg', path: '/expect-delays', button: null },
  {
    id: '/maze/hd/IMG_3298.jpg',
    path: '/one-for-the-tape-recorder',
    button: null,
  },
  { id: '/maze/hd/IMG_0448.heic', path: '/shade-no-tree', button: null },
  { id: '/maze/hd/IMG_0523.heic', path: '/waves-of-grief', button: null },
  {
    id: '/maze/hd/iceland-coffee_2.jpg',
    path: '/coffee-in-the-evening',
    button: null,
  },
  {
    id: '/maze/hd/chris-sit-studio_1.jpg',
    path: '/shire-bock-rock',
    button: null,
  },
  {
    id: '/maze/hd/P1070415_1.jpg',
    path: '/all-children-left-behind',
    button: null,
  },
  { id: '/maze/hd/62972865_0111df0cfd_o.jpg', path: '/for-paul', button: null },
  {
    id: '/maze/hd/62972767_5567f71fd2_o.jpg',
    path: '/april-fear-abawe',
    button: null,
  },
  {
    id: '/maze/hd/79715559_3a695eea8a_o.jpg',
    path: '/this-is-enough',
    button: null,
  },

  {
    id: '/maze/hd/Screen_Shot_2017-08-14_at_1.33.10_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/hd/Screen_Shot_2017-08-14_at_1.37.43_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/hd/Screen_Shot_2017-08-14_at_1.38.39_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/hd/Screen_Shot_2017-07-09_at_12.57.35_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/hd/Screen_Shot_2017-07-09_at_12.57.35_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/hd/Screen_Shot_2016-07-23_at_10.59.27_PM.png',
    path: null,
    button: null,
  },
  { id: '/maze/hd/Picture_021-1.jpg', path: null, button: null },

  { id: '/maze/hd/full_3.jpg', path: null, button: null },
  { id: '/maze/hd/full_6.jpg', path: null, button: null },
  {
    id: '/maze/hd/Screen_Shot_2016-01-25_at_8.15.50_PM.png',
    path: null,
    button: null,
  },
  { id: '/maze/hd/Photo_May_26_12_36_02_PM.jpg', path: null, button: null },
  { id: '/maze/hd/Photo_Jan_18_3_04_28_PM.jpg', path: null, button: null },
  { id: '/maze/hd/Photo_Jul_30_9_47_28_PM.jpg', path: null, button: null },
];

const FILM_IMAGES = [
  {
    id: '/maze/film/12428928065_b887ebea12_o.jpg',
    path: '/watershed',
    button: null,
  },
  { id: '/maze/film/5996310721_fcff8e76ff_o.jpg', path: '/cap3', button: null },
  {
    id: '/maze/film/4494473973_95eedfd594_o.jpg',
    path: '/city-lights',
    button: null,
  },
  { id: '/maze/film/IMG_1492.jpg', path: '/condominium-one', button: null },
  {
    id: '/maze/film/chris-and-brian.jpg',
    path: '/slow-children',
    button: null,
  },
  { id: '/maze/film/church-far.jpg', path: '/starbick', button: null },
  {
    id: '/maze/film/the-guys-2.jpg',
    path: '/april-party-program',
    button: null,
  },
  { id: '/maze/film/april-joe-chris.jpg', path: '/escapement', button: null },
  { id: '/maze/film/joe-cut.jpg', path: '/slip-control', button: null },
  {
    id: '/maze/film/chris-cp-small.jpg',
    path: '/autotune-is-mind-control',
    button: null,
  },

  {
    id: '/maze/film/Screen_Shot_2019-01-20_at_10.40.59_PM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2019-02-20_at_11.49.15_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2019-03-18_at_4.29.43_PM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2019-05-29_at_7.02.29_PM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2019-06-14_at_12.02.14_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2019-06-14_at_1.54.36_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2019-06-19_at_1.02.44_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2019-08-19_at_6.43.19_PM.png',
    path: null,
    button: null,
  },
  /*{
    id: '/maze/film/Screen_Shot_2019-09-16_at_6.18.39_PM.png',
    path: null,
    button: null,
  },*/
  {
    id: '/maze/film/Screen_Shot_2019-09-18_at_7.51.09_PM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2019-11-09_at_2.44.56_PM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2020-01-14_at_12.16.29_PM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2020-02-16_at_11.44.18_PM.png',
    path: null,
    button: null,
  },
  { id: '/maze/film/ana-2.jpg', path: null, button: null },
  {
    id: '/maze/film/Screen_Shot_2020-04-07_at_11.34.43_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2020-05-14_at_7.05.01_PM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2020-07-11_at_5.44.44_PM.png',
    path: null,
    button: null,
  },
  { id: '/maze/film/Screenshot1.png', path: null, button: null },
  { id: '/maze/film/Scan_7.png', path: null, button: null },
  { id: '/maze/film/Scan_5.png', path: null, button: null },
  { id: '/maze/film/Scan_6.png', path: null, button: null },
  { id: '/maze/film/Scan_4.png', path: null, button: null },
  { id: '/maze/film/Scan_3.png', path: null, button: null },
  { id: '/maze/film/FRIENDS_ONLY.png', path: null, button: null },
  { id: '/maze/film/download.png', path: null, button: null },
  { id: '/maze/film/download-5.png', path: null, button: null },
  { id: '/maze/film/download-4.png', path: null, button: null },
  { id: '/maze/film/download-1.png', path: null, button: null },
  { id: '/maze/film/breakable.png', path: null, button: null },
  { id: '/maze/film/Emmanuelle_800_7.jpg', path: null, button: null },
  { id: '/maze/film/DSCF0980.jpg', path: null, button: null },
  { id: '/maze/film/carrie-fisher-empire-parka.jpg', path: null, button: null },
  {
    id:
      '/maze/film/Agregation_of_neutrophils_around_spontaneously_activated_netosis_observed_in_Alzheimers__Desease_patients_blood.jpg',
    path: null,
    button: null,
  },
  { id: '/maze/film/97035166_65eb93c1cc_o.jpg', path: null, button: null },
  {
    id: '/maze/film/97028803_678294593004616_1437539783904359778_n.jpg',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/80745629_481353402513837_5568959826987319296_n.jpg',
    path: null,
    button: null,
  },
  { id: '/maze/film/000017990004.jpg', path: '/future-days', button: null },
  {
    id: '/maze/film/17127248_1862931393980951_6573220680844705792_n.jpg',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/16908208_1438353029557067_5064627587221815296_n.jpg',
    path: null,
    button: null,
  },
  { id: '/maze/film/000015880021.jpg', path: null, button: null },
  {
    id: '/maze/film/47654f6e0f84ffd51ccb0fc7eac8dcda.jpg',
    path: null,
    button: null,
  },
  { id: '/maze/film/giphy-2.gif', path: null, button: null },
  { id: '/maze/film/IMG_5834.jpg', path: null, button: null },
  { id: '/maze/film/ZYyBvGB.jpg', path: null, button: null },
  { id: '/maze/film/Serial-2.jpg', path: null, button: null },
  { id: '/maze/film/Scan_46.jpg', path: null, button: null },
  { id: '/maze/film/Scan_40.jpg', path: null, button: null },
  { id: '/maze/film/Scan_32.jpg', path: null, button: null },
  { id: '/maze/film/Scan_2.jpg', path: null, button: null },
  { id: '/maze/film/Scan_1.jpg', path: null, button: null },
  {
    id: '/maze/film/R-51275-1400096257-9608.jpeg.jpg',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/personal_photo-333-1000x600.jpg',
    path: null,
    button: null,
  },
  { id: '/maze/film/P1070201.jpg', path: null, button: null },
  { id: '/maze/film/P1070190.jpg', path: null, button: null },
  { id: '/maze/film/New-India-ad-320.jpg', path: null, button: null },
  { id: '/maze/film/IMG_5762.jpg', path: null, button: null },
  { id: '/maze/film/IMG_5673.jpg', path: null, button: null },
  { id: '/maze/film/IMG_4367.jpg', path: null, button: null },
  { id: '/maze/film/Image_from_iOS_2.jpg', path: null, button: null },
  { id: '/maze/film/EZVUT8ZUcAAFIhr.jpg', path: null, button: null },
  { id: '/maze/film/IMG_1445.jpg', path: null, button: null },
  { id: '/maze/film/IMG_1444.jpg', path: null, button: null },
  { id: '/maze/film/IMG_1446.jpg', path: null, button: null },
  { id: '/maze/film/IMG_1447.jpg', path: null, button: null },
  { id: '/maze/film/IMG_4052.jpg', path: null, button: null },
  { id: '/maze/film/IMG_3563.png', path: null, button: null },
  { id: '/maze/film/IMG_3618.jpg', path: null, button: null },
  { id: '/maze/film/IMG_3564.png', path: null, button: null },
  { id: '/maze/film/IMG_4003.jpg', path: null, button: null },
  {
    id: '/maze/film/april_spqr_vhs_art_2_square_bend_4.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/april_spqr_vhs_art_2_square_bend.png',
    path: null,
    button: null,
  },
  { id: '/maze/film/mark_and_chris.png', path: null, button: null },
  {
    id: '/maze/film/H-1923_-_Max_and_Allison_start_to_kiss.jpg',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/8ca0fd9e-e409-4f69-a7f2-d902e94d077a.webp',
    path: null,
    button: null,
  },
  { id: '/maze/film/it-follows-2.webp', path: null, button: null },
  { id: '/maze/film/trin21-600x492.jpg', path: null, button: null },
  { id: '/maze/film/6873_01.jpg', path: null, button: null },
  { id: '/maze/film/6872_01.jpg', path: null, button: null },
  { id: '/maze/film/8138_03.jpg', path: null, button: null },
  { id: '/maze/film/8130_07.jpg', path: null, button: null },
  { id: '/maze/film/6868_10.jpg', path: null, button: null },
  { id: '/maze/film/5990_31.jpg', path: null, button: null },
  { id: '/maze/film/5988_06.jpg', path: null, button: null },
  {
    id: '/maze/film/11707828_1003122089728546_1662221270607128660_o.jpg',
    path: null,
    button: null,
  },

  {
    id: '/maze/film/Screen_Shot_2017-08-14_at_1.38.39_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2017-08-14_at_1.37.43_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2017-08-14_at_1.33.10_AM.png',
    path: null,
    button: null,
  },
  {
    id: '/maze/film/Screen_Shot_2017-07-09_at_12.57.35_AM.png',
    path: null,
    button: null,
  },
  { id: '/maze/film/Capture2.png', path: null, button: null },
  { id: '/maze/film/Capture.png', path: null, button: null },
];

const HD_VIDEOS = [
  {
    id: '/maze/videos/P1070344_1.mp4',
    path: '/take-it-down',
    button: null,
  },
  { id: '/maze/videos/IMG_5560_1.mp4', path: '/club-night', button: null },
  {
    id: '/maze/videos/P1070349_1.mp4',
    path: '/no-laugh-never-enough',
    button: null,
  },
  { id: '/maze/videos/IMG_5561_1.mov', path: '/pretty-devil', button: null },
  {
    id: '/maze/videos/IMG_4359_1.mp4',
    path: '/mega-mega-white-thing',
    button: null,
  },
  { id: '/maze/videos/IMG_3206.mov', path: '/glass-city', button: null },
  { id: '/maze/videos/IMG_5557.mp4', path: '/evidence', button: null },
  { id: '/maze/videos/P1070360_1.mp4', path: '/reconsider', button: null },
  { id: '/maze/videos/IMG_5083.mov', path: '/what-grown-ups-do', button: null },
  {
    id: '/maze/videos/IMG_2498.mov',
    path: '/they-got-us-on-the-ropes',
    button: null,
  },
  { id: '/maze/videos/IMG_5722_1.mov', path: '/your-truth', button: null },
  { id: '/maze/videos/IMG_3897.mov', path: '/receeding-chimera', button: null },
  { id: '/maze/videos/IMG_5549.mov', path: '/one-of-them', button: null },
  { id: '/maze/videos/IMG_5733_1.mov', path: '/shooting-star', button: null },
  { id: '/maze/videos/P1070327.mp4', path: '/banshee', button: null },
  { id: '/maze/videos/P1070385.mp4', path: null, button: null },
  { id: '/maze/videos/P1070370.mp4', path: null, button: null },
  { id: '/maze/videos/P1070379.mp4', path: null, button: null },
  { id: '/maze/videos/MVI_8100.mov', path: null, button: null },
  { id: '/maze/videos/MVI_8089.mov', path: null, button: null },
  { id: '/maze/videos/MVI_8085.mov', path: null, button: null },
  { id: '/maze/videos/MVI_8148.mov', path: null, button: null },
  { id: '/maze/videos/MVI_8149.mov', path: null, button: null },
  { id: '/maze/videos/MVI_8146.mov', path: null, button: null },
  { id: '/maze/videos/april_drone.mp4', path: null, button: null },
  { id: '/maze/videos/youtubes_1_2_h264.mp4', path: null, button: null },
  {
    id: '/maze/videos/youtube_3_Copy_no_blur_mid.mp4',
    path: null,
    button: null,
  },
  { id: '/maze/videos/tape_nofilter.mp4', path: '/hblc', button: null },
  { id: '/maze/videos/butterfly_3.mov', path: null, button: null },
  { id: '/maze/videos/briana_teaser_2.mp4', path: null, button: null },
  { id: '/maze/videos/briana_teaser_3.mp4', path: null, button: null },
  { id: '/maze/videos/1.mov', ppath: null, button: null },
  { id: '/maze/videos/drone_vhs_5.mov', ppath: null, button: null },
  { id: '/maze/videos/2.mov', ppath: null, button: null },
  { id: '/maze/videos/drone_vhs_6.mov', ppath: null, button: null },
  { id: '/maze/videos/3.mov', ppath: null, button: null },
  { id: '/maze/videos/4.mov', ppath: null, button: null },
  { id: '/maze/videos/drone_vhs_7.mov', ppath: null, button: null },
  { id: '/maze/videos/lead_1_bw.mov', ppath: null, button: null },
  { id: '/maze/videos/lead_2_bw.mov', ppath: null, button: null },
  { id: '/maze/videos/MVI_3105.mov', ppath: null, button: null },
];

const VIDEOS = [
  { id: '/maze/videos/IMG_0891.mp4', path: '/be-someone', button: null },
  {
    id: '/maze/videos/IMG_2343.mp4',
    path: '/caught-in-the-cross-fire',
    button: null,
  },
  {
    id: '/maze/videos/April_I_Never_Said_I_Was_Frightened_of_Dying_part_1.mp4',
    path: '/is-the-flag-still-there',
    button: null,
  },
  {
    id: '/maze/videos/April_I_Never_Said_I_Was_Frightened_of_Dying_part_2.mp4',
    path: '/i-cant-see-it',
    button: null,
  },
  {
    id: '/maze/videos/IMG_0892.mp4',
    path: '/dont-give-them-a-chance',
    button: null,
  },
  {
    id: '/maze/videos/April_I_Never_Said_I_Was_Frightened_of_Dying_part_5.mp4',
    path: '/is-it-still-there',
    button: null,
  },
  {
    id: '/maze/videos/April_I_Never_Said_I_Was_Frightened_of_Dying_part_4.mp4',
    path: '/i-never-said',
    button: null,
  },
  {
    id: '/maze/videos/April_I_Never_Said_I_Was_Frightened_of_Dying_part_6.mp4',
    path: '/i-was-frightened',
    button: null,
  },
  {
    id: '/maze/videos/joined_video_82f02d2a0422474fad037f3618b9fb3d.mp4',
    path: '/welsh-witch-music',
    button: null,
  },
  { id: '/maze/videos/new_trance.mp4', path: '/the-new-trance', button: null },
  { id: '/maze/videos/dj_1.mp4', path: null, button: null },
  { id: '/maze/videos/dj_2.mp4', path: null, button: null },
  { id: '/maze/videos/dj_3.mp4', path: null, button: null },
  { id: '/maze/videos/dj_9.mp4', path: null, button: null },
  { id: '/maze/videos/dj_5.mp4', path: null, button: null },
  { id: '/maze/videos/dj_10.mp4', path: null, button: null },
  { id: '/maze/videos/dj_7.mp4', path: null, button: null },
  { id: '/maze/videos/dj_11.mp4', path: null, button: null },
  { id: '/maze/videos/dj_8.mp4', path: null, button: null },
  { id: '/maze/videos/kate_1_2.mp4', path: null, button: null },
  { id: '/maze/videos/P1070284.mp4', path: null, button: null },
  { id: '/maze/videos/Untitled_Project.mp4', path: null, button: null },
  { id: '/maze/videos/P1070276.mp4', path: null, button: null },
  { id: '/maze/videos/MVI_3105.mp4', path: null, button: null },
  { id: '/maze/videos/swell_jammin_3.mp4', path: null, button: null },
  { id: '/maze/videos/lights.mov', path: null, button: null },
  { id: '/maze/videos/joe_piano_2.mov', path: null, button: null },
  { id: '/maze/videos/lava.mov', path: null, button: null },
  { id: '/maze/videos/chris_jeff_focus.mov', path: null, button: null },
  { id: '/maze/videos/P1070282.mp4', path: null, button: null },
  { id: '/maze/videos/P1070282.mp4', path: null, button: null },
  { id: '/maze/videos/My_Movie_2_fade_harder.mp4', path: null, button: null },
  { id: '/maze/videos/watershed_1_small.mp4', path: null, button: null },
  { id: '/maze/videos/lights_2.mov', path: null, button: null },
  { id: '/maze/videos/joe_bass_talk.mov', path: null, button: null },
  { id: '/maze/videos/MVI_3119.mov', path: null, button: null },
  { id: '/maze/videos/IMG_7654.mp4', path: null, button: null },
  { id: '/maze/videos/IMG_8135.mp4', path: null, button: null },
  { id: '/maze/videos/IMG_5503.mov', path: null, button: null },
  { id: '/maze/videos/IMG_8991.mp4', path: null, button: null },
  { id: '/maze/videos/IMG_2684.mov', path: null, button: null },
  { id: '/maze/videos/IMG_1708.mov', path: null, button: null },
  { id: '/maze/videos/Video_Jul_28_5_41_24_PM.mov', path: null, button: null },
  { id: '/maze/videos/IMG_7439.mov', path: null, button: null },
  { id: '/maze/videos/Video_Nov_21_3_57_26_PM.mov', path: null, button: null },
  { id: '/maze/videos/Video_Oct_29_2_54_10_PM.mov', path: null, button: null },
  { id: '/maze/videos/Video_Nov_21_1_06_45_PM.mov', path: null, button: null },
  { id: '/maze/videos/Video_Oct_29_2_55_33_PM.mov', path: null, button: null },
  { id: '/maze/videos/clip_2_720_100.mp4', path: null, button: null },
  { id: '/maze/videos/swell_jammin_3.mp4', path: null, button: null },
  { id: '/maze/videos/clip_1_720_565_100.mp4', path: null, button: null },
];

const AUDIO = [
  {
    id: '/maze/audiio/rain.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/strnglp.mp3',
    path: null,
    button: null,
    image: '/maze/film/joe-cut.jpg',
    text: null,
  },
  /*{
    id: '/maze/audiio/faca_rock_n_roll.aiff',
    path: null,
    button: null,
    image: null,
    text: null,
  },*/
  {
    id: '/maze/audiio/damo.wav',
    path: null,
    button: null,
    image: '/maze/film/Screen_Shot_2020-05-14_at_7.05.01_PM.png',
    text: null,
  },
  {
    id: '/maze/audiio/april.wav',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/PUMPuUP.aiff',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/stars.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/winston.mp3',
    path: null,
    button: null,
    image: '/maze/film/IMG_3564.png',
    text: null,
  },
  {
    id: '/maze/audiio/piano_interlude.mp3',
    path: null,
    button: null,
    image: '/maze/film/trin21-600x492.jpg',
    text: null,
  },
  {
    id: '/maze/audiio/polaroids.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/low_bells.mp3',
    path: null,
    button: null,
    image: '/maze/film/Scan_32.jpg',
    text: null,
  },
  {
    id: '/maze/audiio/peer.mp3',
    path: null,
    button: null,
    image: '/maze/film/Screen_Shot_2020-04-07_at_11.34.43_AM.png',
    text: null,
  },
  {
    id: '/maze/audiio/outside_1.mp3',
    path: null,
    button: null,
    image: '/maze/film/000017990004.jpg',
    text: null,
  },
  {
    id: '/maze/audiio/faca_low_pizza_3.wav',
    path: null,
    button: null,
    image: '/maze/film/april_spqr_vhs_art_2_square_bend.png',
    text: null,
  },
  {
    id: '/maze/audiio/organ.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/faca_joni.wav',
    path: null,
    button: null,
    image: '/maze/film/IMG_3618.jpg',
    text: null,
  },
  {
    id: '/maze/audiio/horn.mp3',
    path: null,
    button: null,
    image: '/maze/film/6872_01.jpg',
    text: null,
  },
  {
    id: '/maze/audiio/faca_goodnight.aiff',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/4PianoAttack.aiff',
    path: null,
    button: null,
    image: '/maze/film/8ca0fd9e-e409-4f69-a7f2-d902e94d077a.webp',
    text: null,
  },
  {
    id: '/maze/audiio/faca_0001_3-Audio-2.aiff',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/drone_guitar.wav',
    path: null,
    button: null,
    image: '/maze/film/6873_01.jpg',
    text: null,
  },
  {
    id: '/maze/audiio/faca_3.aiff',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/faca_0003_3-Audio.aiff',
    path: null,
    button: null,
    image: '/maze/film/000015880021.jpg',
    text: null,
  },
  {
    id: '/maze/audiio/alright.mp3',
    path: null,
    button: null,
    image: '/maze/film/17127248_1862931393980951_6573220680844705792_n.jpg',
    text: null,
  },

  {
    id: '/maze/audiio/Study_in_Amaj_v2.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/let_it_be_me_live_loop.m4a',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/CP_Song.m4a',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/spy_song_3.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/holynight_loop.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/french_cuts_3.wav',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/song_in_e.wav',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/ideas4_ninna.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/samples_april_2017_2.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/Joe_s_song.m4a',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/samples_april_2017_2_piano.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/samples_march_2017_2_apres.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/Moody5.m4a',
    path: null,
    button: null,
    image: null,
    text: null,
  },
  {
    id: '/maze/audiio/bucky_hall_3.mp3',
    path: null,
    button: null,
    image: null,
    text: null,
  },

  {
    id: '/maze/audiio/jeff_guitar_2_tuned..._a_little.aiff',
    path: null,
    button: null,
    image: null,
    text: null,
  },
];

/*const PATHS = [
  //"/milliseconds",
];*/

const BUTTON_TEXTS = [
  'yes yes, okay.',
  'everybody hates a tourist',
  "I don't think I understand",
  'please something else',
  'I understand.',
  'roger that.',
  'this way to the exit',
  '->',
  'whats next?',
  'witch',
  'why are you doing this?',
  'a written testimony',
  'I did my part',
  'this way',
  'this is enough',
  'I will never understand',
  'why?',
  'what does it all mean?',
  "I've seen a shooting star",
];

AUDIO.forEach(
  audio =>
    (audio.componentGenerator = link => (
      <div>
        <img
          src={cl.url(audio.image || sample(FILM_IMAGES).id, {
            fetchFormat: 'auto',
            quality: 'auto',
            height: 700,
            width: 1200,
            crop: 'limit',
          })}
        />
        <audio
          controls
          autoPlay
          loop
          src={`https://res.cloudinary.com/listentoapril/video/upload${audio.id.substr(
            0,
            audio.id.lastIndexOf('.'),
          ) + '.mp3'}`}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>

        <Link to={link} className="button">
          {audio.button || sample(BUTTON_TEXTS)}
        </Link>
      </div>
    )),
);

YOUTUBES.forEach(
  youtube =>
    (youtube.componentGenerator = link => (
      <div>
        <iframe
          title={youtube.id}
          width="700"
          height="700"
          src={`https://www.youtube.com/embed/${youtube.id}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <Link to={link} className="button">
          {youtube.button || sample(BUTTON_TEXTS)}
        </Link>
      </div>
    )),
);

HD_IMAGES.forEach(
  image =>
    (image.componentGenerator = link => (
      <div>
        <img
          src={cl.url(image.id, {
            fetchFormat: 'auto',
            quality: 'auto',
            height: 700,
            width: 1200,
            crop: 'limit',
          })}
        />
        <Link to={link} className="button">
          {image.button || sample(BUTTON_TEXTS)}
        </Link>
      </div>
    )),
);

FILM_IMAGES.forEach(
  image =>
    (image.componentGenerator = link => (
      <div>
        <img
          src={cl.url(image.id, {
            fetchFormat: 'auto',
            quality: 'auto',
            height: 700,
            width: 1200,
            crop: 'limit',
          })}
        />
        <Link to={link} className="button">
          {image.button || sample(BUTTON_TEXTS)}
        </Link>
      </div>
    )),
);

VIDEOS.forEach(
  video =>
    (video.componentGenerator = link => (
      <div>
        <video
          autoPlay
          controls
          loop
          playsInline
          src={cl.video_url(video.id, {
            fetchFormat: 'mp4',
            quality: 'auto',
            height: 700,
            crop: 'crop',
          })}
        />
        <Link to={link} className="button">
          {video.button || sample(BUTTON_TEXTS)}
        </Link>
      </div>
    )),
);

HD_VIDEOS.forEach(
  video =>
    (video.componentGenerator = link => (
      <div>
        <video
          autoPlay
          controls
          loop
          playsInline
          src={cl.video_url(video.id, {
            fetchFormat: 'mp4',
            quality: 'auto',
            height: 700,
            crop: 'crop',
          })}
        />
        <Link to={link} className="button">
          {video.button || sample(BUTTON_TEXTS)}
        </Link>
      </div>
    )),
);

ODES.forEach(
  ode =>
    (ode.componentGenerator = link => {
      const links = [link, ...sampleSize(allPaths, ode.items.length - 1)];
      return (
        <ul className="ode">
          {ode.items.map((item, index) => (
            <li>
              <Link to={links[index]}>{item}</Link>
            </li>
          ))}
        </ul>
      );
    }),
);

QUOTES.forEach(
  quote =>
    (quote.componentGenerator = link => {
      return (
        <Fragment>
          <blockquote className="quote">{quote.text}</blockquote>

          <Link to={link} className="button">
            {quote.button || sample(BUTTON_TEXTS)}
          </Link>
        </Fragment>
      );
    }),
);

const pages = [
  ...ODES,
  ...YOUTUBES,
  ...HD_IMAGES,
  ...FILM_IMAGES,
  ...VIDEOS,
  ...HD_VIDEOS,
  ...QUOTES,
  ...AUDIO,
];

const allPaths = pages.map(
  page =>
    page.path ||
    page.id
      .split('/')
      .pop()
      .split('.')[0],
);

console.log(allPaths.length);

const possibleLinks = shuffle(allPaths);

const routes = pages.map(page => {
  const link = without(possibleLinks, page.path)[0];

  possibleLinks.splice(possibleLinks.indexOf(link), 1);

  return (
    <Route
      exact
      path={
        page.path ||
        '/' +
          page.id
            .split('/')
            .pop()
            .split('.')[0]
      }
    >
      {page.componentGenerator(link)}
    </Route>
  );
});

export default class App extends Component {
  componentDidMount() {
    const allImages = [...FILM_IMAGES, ...HD_IMAGES];
    setInterval(function() {
      const images = sampleSize(allImages, 5).map(image =>
        //cl.url(image.id, { quality: 40, fetchFormat: 'auto', width: 300 }),
        cl.url(image.id, {
          fetchFormat: 'auto',
          quality: 'auto',
          height: 700,
          width: 1200,
          crop: 'limit',
        }),
      );

      images.map(url =>
        setTimeout(function() {
          const img = document.createElement('img');
          $(img).css({
            position: 'absolute',
            top: (Math.random() * 100) / 2 + '%',
            left: (Math.random() * 100) / 2 + '%',
          });
          img.src = url;
          img.className += 'flicker';
          document.body.appendChild(img);
          //const el = $('<img />').attr('src').addClass('bick');
          //$(document).append(el);
          setTimeout(() => {
            img.remove();
          }, Math.random() * Math.random() * 1000);
        }, Math.random() * 500),
      );
    }, 70000);

    setInterval(function() {
      var allImagesToBick = $('img, video');
      var imageToBick = allImagesToBick.eq(
        Math.floor(Math.random() * allImagesToBick.length),
      );
      var flipCount = 0;
      console.log('in interval', imageToBick);

      var flipInterval = setInterval(function() {
        if (flipCount >= 10) {
          imageToBick.css({ filter: '', opacity: 1 });
          clearInterval(flipInterval);
        } else {
          var filter = `saturate(${Math.random().toFixed(2) *
            Math.random() *
            Math.random() *
            10}) opacity(${Math.random().toFixed(2)})`;

          imageToBick.css({
            filter: filter,
            opacity: 1,
          });
          flipCount++;
        }
      }, 42);
    }, 50000);

    setInterval(function() {
      var allImagesToBick = $('img, video');
      var imageToBick = allImagesToBick.eq(
        Math.floor(Math.random() * allImagesToBick.length),
      );
      var flipCount = 0;

      var flipInterval = setInterval(function() {
        if (flipCount >= 5) {
          imageToBick.css({ opacity: 1 });
          clearInterval(flipInterval);
        } else {
          imageToBick.css({
            opacity: Math.round(Math.random()),
          });
          flipCount++;
        }
      }, 30);
    }, 30000);
  }

  render() {
    return (
      <Router>
        <Switch>{routes}</Switch>
      </Router>
    );
  }
}
