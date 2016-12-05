var dataKey = 'santa-blocker';

var blockerOn = {                   
            "16": "assets/blocker_on_16.png",           
            "48": "assets/blocker_on_48.png",           
            "128": "assets/blocker_on_128.png"            
          };

var blockerOff = {                   
            "16": "assets/blocker_off_16.png",           
            "48": "assets/blocker_off_48.png",           
            "128": "assets/blocker_off_128.png"            
          };

var christmasList = [
    'artificial tree',
    'bells',
    'bough',
    'candy cane',
    'carolers',
    'carols',
    'chestnuts',
    'christmas',
    'december 25',
    'eggnog',
    'elves',
    'feliz navidad',
    'festive',
    'frosty',
    'gift-giving',
    'ice skates',
    'joyeux noel',
    'kris kringle',
    'manger',
    'mince pie',
    'merry',
    'mistletoe',
    'nativity',
    'reindeer',
    'santa',
    'sled',
    'sleigh',
    'snow',
    'xmas',
    'yule'
]

var christmasListRegex = new RegExp(christmasList.join('|'), 'i')

//cynical, swearlist
var naughtyList = [
    'real',
    'the'
]

var naughtyListRegex = new RegExp(naughtyList.join('|'), 'i')