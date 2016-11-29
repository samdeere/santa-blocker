var dataKey = 'santa-blocker';

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
    'elf',
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
    'santa claus',
    'sled',
    'sleigh',
    'snow',
    'xmas',
    'yule'
]

var christmasListRegex = new RegExp(christmasList.join('|'), 'i')

var naughtyList = [
    'the',
    'and'
]

var naughtListRegex = new RegExp(naughtyList.join('|'), 'i')