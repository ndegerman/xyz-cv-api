'use strict';

var Promise = require('bluebird');
var faker = require('faker');

exports.getSkillAbbreviations = function(requestedNumber) {
    var list = getListOfAllSkillAbbreviations();
    var result = [];

    if (requestedNumber >= list.length) {
        return list;
    }

    if (requestedNumber <= 0) {
        return [];
    }

    var indices = exports.getUniqueIndices(requestedNumber, list.length);

    for (var i = 0; i < indices.length; i++) {
        result.push(list[indices[i]]);
    }

    return result;
};

//return true with probability p and false with probability 1-p
exports.bernoulli = function(p) {
    if (!Math.floor(Math.random() * (1 / p))) {
        return true;
    }

    return false;
};

exports.generateSex = function() {
    if (exports.bernoulli(0.5)) {
        return 'male';
    }

    return 'female';
};

exports.getCustomHeaders = function() {
    var list = [];
    var object1 = {
        title: faker.address.state(),
        body: 'In-state possessions: ' + faker.finance.amount() + ' ' + faker.finance.currencyName()
    };
    var object2 = {
        title: faker.address.county(),
        body: 'In-county possessions: ' + faker.finance.amount() + ' ' + faker.finance.currencyName()
    };

    list.push(object1);
    list.push(object2);

    return list;
};

exports.getPersonalInterests = function() {
    var list = [];
    if (exports.bernoulli(0.9)) {
        list.push(faker.hacker.ingverb());

        if (exports.bernoulli(0.6)) {
            list.push(faker.company.bsNoun());

            if (exports.bernoulli(0.8)) {
                list.push(faker.company.bs());
            }
        }
    }

    return list;
};

exports.getShirtSize = function() {
    var sizes = getShirtSizes();
    return sizes[randomInt(sizes.length - 1)];
};

exports.getSkillLevel = function() {
    return randomInt(4) + 1;
};

exports.getYears = function() {
    return randomInt(20) + 1;
};

exports.getBinomial = function(n, p) {
    var result = 0;
    for (var i = 0; i < n; i++) {
        if (Math.random() < p) {
            result++;
        }
    }

    return result;
};

exports.getUniqueIndices = function(count, total) {
    var list = [];

    for (var i = 0; i < total; i++) {
        list.push(i);
    }

    var max = list.length - 1;
    var result = [];

    for (var q = 0; q < count; q++) {
        var index = randomInt(max);
        result.push(list[index]);
        list[index] = list[max];
        max--;
    }

    return result;
};

exports.getBinomialUniqueList = function(items, p) {
    var n = items.length;
    var count = exports.getBinomial(n, p);
    var uniqueIndices = exports.getUniqueIndices(count, n);
    var result = [];

    for (var i = 0; i < count; i++) {
        result.push(items[uniqueIndices[i]]);
    }

    return result;
};

exports.getBinomailUniqueSkillIds = function(skills, p) {
    return function() {
        var n = skills.length;
        var count = exports.getBinomial(n, p);
        var uniqueIndices = exports.getUniqueIndices(count, n);
        var result = [];

        for (var i = 0; i < count; i++) {
            result.push(skills[uniqueIndices[i]]._id);
        }

        return result;
    };
};

exports.getCertificates = function() {

    var list = [];
    if (exports.bernoulli(0.9)) {
        list.push(getRandomCertificatePrefix() + faker.hacker.ingverb());
        list.push(getRandomCertificatePrefix() + faker.company.catchPhraseNoun());

        if (exports.bernoulli(0.6)) {
            list.push(getRandomCertificatePrefix() + faker.company.catchPhraseNoun());

            if (exports.bernoulli(0.8)) {
                list.push(getRandomCertificatePrefix() + faker.company.bs());
            }
        }
    }

    return list;
};

exports.getIdNumber = function() {
    return 190000000000 + randomInt(9999999999);
};

function getRandomCertificatePrefix() {
    var list = [
        'Bachelor of ',
        'Master of ',
        'Bachelor of Science in Engineering in ',
        'Bachelor of Arts in ',
        'MD in ',
        'JD in '
    ];

    return list[randomInt(list.length) - 1];
}

function randomInt(high) {
    return Math.floor(Math.random() * (high + 1));
}

function getShirtSizes() {
    return [
        'XXS',
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        '3XL',
        '4XL'
    ];
}

function getListOfAllSkillAbbreviations() {
    return exports.getListOfDefaultSkillAbbreviations().concat(getListOfSkillAbbreviationsNoIcons());
}

exports.getListOfCustomers = function() {
    return [
    {name: 'Telenor'},
    {name: 'Ericsson'},
    {name: 'Blekingetrafiken'},
    {name: 'Försäkringskassan'},
    {name: 'Orange'}
    ];
}

exports.getListOfDefaultSkillAbbreviations = function() {
    return [
    {name: 'Angularjs', icon: 'devicon-angularjs-plain'},
    {name: 'ACNE', icon: null},
    {name: 'Apache', icon: 'devicon-apache-plain'},
    {name: 'Android', icon: null},
    {name: 'iPhone', icon: null},
    {name: 'PhoneGap', icon: null},
    {name: 'Xamarin', icon: null},
    {name: 'Bluetooth', icon: null},
    {name: 'wifi', icon: null},
    {name: 'Salesforce', icon: null},
    {name: 'Qlik', icon: null},
    {name: 'Cognos', icon: null},
    {name: 'Btom', icon: 'devicon-atom-original'},
    {name: 'Backbonejs', icon: 'devicon-backbonejs-plain'},
    {name: 'Assembler', icon: null},
    {name: 'ARM', icon: null},
    {name: 'AVR', icon: null},
    {name: 'Azure', icon: null},
    {name: 'JUnit', icon: null},
    {name: 'NUnit', icon: null},
    {name: 'Selenium', icon: null},
    {name: 'Jenkins', icon: null},
    {name: 'Hudson', icon: null},
    {name: 'Bamboo', icon: null},
    {name: 'Chef', icon: null},
    {name: 'Make', icon: null},
    {name: 'Ant', icon: null},
    {name: 'Gradle', icon: null},
    {name: 'Maven', icon: null},
    {name: 'git', icon: null},
    {name: 'ClearCase', icon: null},
    {name: 'Subversion', icon: null},
    {name: 'JIRA', icon: null},
    {name: 'ClearQuest', icon: null},
    {name: 'Tracker', icon: null},
    {name: 'RTC', icon: null},
    {name: 'TFS', icon: null},
    {name: 'Promo', icon: null},
    {name: 'PROPS', icon: null},
    {name: 'RUP', icon: null},
    {name: 'Prince2', icon: null},
    {name: 'WBS', icon: null},
    {name: 'PERT estimation', icon: null},
    {name: 'MS Project', icon: null},
    {name: 'Excel', icon: null},
    {name: 'Physical Boards', icon: null},
    {name: 'Line management', icon: null},
    {name: 'Product vision', icon: null},
    {name: 'road map', icon: null},
    {name: 'impact mapping', icon: null},
    {name: 'backlog prioritization', icon: null},
    {name: 'kano analysis', icon: null},
    {name: 'Lean startup', icon: null},
    {name: 'SAFE', icon: null},
    {name: 'DAD', icon: null},
    {name: 'DropWizard', icon: null},
    {name: 'Less', icon: null},
    {name: 'Bootstrap', icon: 'devicon-bootstrap-plain'},
    {name: 'C', icon: 'devicon-c-plain'},
    {name: 'Coffeescript', icon: 'devicon-coffeescript-plain'},
    {name: 'C++', icon: 'devicon-cplusplus-plain'},
    {name: 'C#', icon: 'devicon-csharp-plain'},
    {name: 'Debian', icon: 'devicon-debian-plain'},
    {name: 'Django', icon: 'devicon-django-plain'},
    {name: 'Docker', icon: 'devicon-docker-plain'},
    {name: 'Doctrine', icon: 'devicon-doctrine-plain'},
    {name: '.NET', icon: 'devicon-dot-net-plain'},
    {name: 'Expressjs', icon: null},
    {name: 'Drupal', icon: 'devicon-drupal-plain'},
    {name: 'FPGA', icon: null},
    {name: 'Glassfish', icon: null},
    {name: 'Git', icon: 'devicon-git-plain'},
    {name: 'Grunt', icon: 'devicon-grunt-plain'},
    {name: 'Gulp', icon: 'devicon-gulp-plain'},
    {name: 'IIS', icon: null},
    {name: 'Heroku', icon: 'devicon-heroku-plain'},
    {name: 'HTML5', icon: 'devicon-html5-plain'},
    {name: 'Java', icon: 'devicon-java-plain'},
    {name: 'JavaFX', icon: null},
    {name: 'Javascript', icon: 'devicon-javascript-plain'},
    {name: 'JQuery', icon: 'devicon-jquery-plain'},
    {name: 'JBoss', icon: null},
    {name: 'Krakenjs', icon: 'devicon-krakenjs-plain'},
    {name: 'Linux', icon: 'devicon-linux-plain'},
    {name: 'Meteor', icon: 'devicon-meteor-plain'},
    {name: 'Mongodb', icon: 'devicon-mongodb-plain'},
    {name: 'MEAN', icon: null},
    {name: 'MySQL', icon: 'devicon-mysql-plain'},
    {name: 'Nginx', icon: 'devicon-nginx-plain'},
    {name: 'Nodejs', icon: 'devicon-nodejs-plain'},
    {name: 'Objective-C', icon: null},
    {name: 'Photoshop', icon: 'devicon-photoshop-plain'},
    {name: 'PHP', icon: 'devicon-php-plain'},
    {name: 'Python', icon: 'devicon-python-plain'},
    {name: 'Rails', icon: 'devicon-rails-plain'},
    {name: 'Redis', icon: 'devicon-redis-plain'},
    {name: 'Ruby', icon: 'devicon-ruby-plain'},
    {name: 'Sass', icon: 'devicon-sass-plain'},
    {name: 'Swing', icon: null},
    {name: 'Swift', icon: null},
    {name: 'Travis', icon: 'devicon-travis-plain'},
    {name: 'Trello', icon: 'devicon-trello-plain'},
    {name: 'Ubuntu', icon: 'devicon-ubuntu-plain'},
    {name: 'Vim', icon: 'devicon-vim-plain'},
    {name: 'Wordpress', icon: 'devicon-wordpress-plain'},
    {name: 'Yii', icon: 'devicon-yii-plain'},
    {name: 'Zend', icon: 'devicon-zend-plain'},
    {name: 'MS SQL', icon: null},
    {name: 'Oracle', icon: null},
    {name: 'Cassandra', icon: null},
    {name: 'Web Frontend', icon: null},
    {name: 'Web Backend', icon: null},
    {name: 'Fullstack', icon: null},
    {name: 'Embedded', icon: null},
    {name: 'Desktop apps', icon: null},
    {name: 'Enterprise Server', icon: null},
    {name: 'Mobile apps', icon: null},
    {name: 'Radio and Telecom', icon: null},
    {name: 'BI/CRM', icon: null},
    {name: 'Tester', icon: null},
    {name: 'Testautomation', icon: null},
    {name: 'Continuous Delivery', icon: null},
    {name: 'Test Manager', icon: null},
    {name: 'Release Manager', icon: null},
    {name: 'Business Analyst', icon: null},
    {name: 'Configuration Manager', icon: null},
    {name: 'Project Manager', icon: null},
    {name: 'Scrum Master', icon: null},
    {name: 'Product Owner', icon: null},
    {name: 'Agile Coach', icon: null},
    {name: 'Management Coach', icon: null},
    {name: 'Business Innovation', icon: null},
    {name: 'Scaling Agile', icon: null}
    ];
};

function getListOfSkillAbbreviationsNoIcons() {
    return [
        {name: 'TCP', icon: null},
        {name: 'HTTP', icon: null},
        {name: 'SDD', icon: null},
        {name: 'RAM', icon: null},
        {name: 'GB', icon: null},
        {name: 'CSS', icon: null},
        {name: 'SSL', icon: null},
        {name: 'AGP', icon: null},
        {name: 'SQL', icon: null},
        {name: 'FTP', icon: null},
        {name: 'PCI', icon: null},
        {name: 'AI', icon: null},
        {name: 'ADP', icon: null},
        {name: 'RSS', icon: null},
        {name: 'XML', icon: null},
        {name: 'EXE', icon: null},
        {name: 'COM', icon: null},
        {name: 'HDD', icon: null},
        {name: 'THX', icon: null},
        {name: 'SMTP', icon: null},
        {name: 'SMS', icon: null},
        {name: 'USB', icon: null},
        {name: 'PNG', icon: null},
        {name: 'IB', icon: null},
        {name: 'SCSI', icon: null},
        {name: 'JSON', icon: null},
        {name: 'XSS', icon: null},
        {name: 'JBOD', icon: null},
        {name: 'Haskell', icon: null},
        {name: 'Javascript', icon: null},
        {name: 'ActionScript', icon: null},
        {name: 'ALGOL 58', icon: null},
        {name: 'AMOS', icon: null},
        {name: 'AppleScript', icon: null},
        {name: 'Argus', icon: null},
        {name: 'B', icon: null},
        {name: 'Babbage', icon: null},
        {name: 'BASIC', icon: null},
        {name: 'BeanShell', icon: null},
        {name: 'Bigwig', icon: null},
        {name: 'Blue', icon: null},
        {name: 'Boomerang', icon: null},
        {name: 'BPEL', icon: null},
        {name: 'Caml', icon: null},
        {name: 'Cayenne', icon: null},
        {name: 'Cel', icon: null},
        {name: 'CHAIN', icon: null},
        {name: 'Chapel', icon: null},
        {name: 'Charity', icon: null},
        {name: 'Charm', icon: null},
        {name: 'CHILL', icon: null},
        {name: 'Chuck', icon: null},
        {name: 'Chomski', icon: null},
        {name: 'CICS', icon: null},
        {name: 'CL', icon: null},
        {name: 'Claire', icon: null},
        {name: 'CLIST', icon: null},
        {name: 'CLU', icon: null},
        {name: 'COMAL', icon: null},
        {name: 'CPL', icon: null},
        {name: 'COMIT', icon: null},
        {name: 'COMPASS', icon: null},
        {name: 'Coral 66', icon: null},
        {name: 'Corn', icon: null},
        {name: 'COWSEL', icon: null},
        {name: 'Curry', icon: null},
        {name: 'DASL', icon: null},
        {name: 'DataFlex', icon: null},
        {name: 'Dart', icon: null},
        {name: 'dBase', icon: null},
        {name: 'Deesel', icon: null},
        {name: 'Delphi', icon: null},
        {name: 'DIBOL', icon: null},
        {name: 'Dog', icon: null},
        {name: 'DYNAMO', icon: null},
        {name: 'Ease', icon: null},
        {name: 'Eiffel', icon: null},
        {name: 'Elixir', icon: null},
        {name: 'Elm', icon: null},
        {name: 'Emacs Lisp', icon: null},
        {name: 'Emerald', icon: null},
        {name: 'EPL', icon: null},
        {name: 'Erlang', icon: null},
        {name: 'ESPOL', icon: null},
        {name: 'Esterel', icon: null},
        {name: 'Etoys', icon: null},
        {name: 'Euclid', icon: null},
        {name: 'Euler', icon: null},
        {name: 'Euphoria', icon: null},
        {name: 'EXEC 2', icon: null},
        {name: 'Falcon', icon: null},
        {name: 'Fancy', icon: null},
        {name: 'Fantom', icon: null},
        {name: 'Fjölnir', icon: null},
        {name: 'FAUST', icon: null},
        {name: 'Flex', icon: null},
        {name: 'FOCUS', icon: null},
        {name: 'FOIL', icon: null},
        {name: 'Forth', icon: null},
        {name: 'Fortan', icon: null},
        {name: 'FoxBase', icon: null},
        {name: 'FP', icon: null},
        {name: 'G', icon: null},
        {name: 'GAMS', icon: null},
        {name: 'GAP', icon: null},
        {name: 'G-Code', icon: null},
        {name: 'Genie', icon: null},
        {name: 'GDL', icon: null},
        {name: 'GEORGE', icon: null},
        {name: 'GNU E', icon: null},
        {name: 'Go', icon: null},
        {name: 'GOAL', icon: null},
        {name: 'Godiva', icon: null},
        {name: 'GOM', icon: null},
        {name: 'Gosu', icon: null},
        {name: 'GPSS', icon: null},
        {name: 'GraphTalk', icon: null},
        {name: 'GRASS', icon: null},
        {name: 'Groovy', icon: null},
        {name: 'Harbour', icon: null},
        {name: 'HAL/S', icon: null},
        {name: 'Haxe', icon: null},
        {name: 'Hugo', icon: null},
        {name: 'Hume', icon: null},
        {name: 'HyperTalk', icon: null},
        {name: 'IBM Basic Assemble Language', icon: null},
        {name: 'ICI', icon: null},
        {name: 'Icon', icon: null},
        {name: 'IDL', icon: null},
        {name: 'Idris', icon: null},
        {name: 'IMP', icon: null},
        {name: 'Inform', icon: null},
        {name: 'loke', icon: null},
        {name: 'IPL', icon: null},
        {name: 'ISPF', icon: null},
        {name: 'JADE', icon: null},
        {name: 'Jako', icon: null},
        {name: 'JAL', icon: null},
        {name: 'Janus', icon: null},
        {name: 'JASS', icon: null},
        {name: 'JCL', icon: null},
        {name: 'JEAN', icon: null},
        {name: 'JOSS', icon: null},
        {name: 'Joule', icon: null},
        {name: 'JOVIAL', icon: null},
        {name: 'Joy', icon: null},
        {name: 'Julia', icon: null},
        {name: 'Jython', icon: null},
        {name: 'K', icon: null},
        {name: 'Karel', icon: null},
        {name: 'KEE', icon: null},
        {name: 'KIF', icon: null},
        {name: 'Kojo', icon: null},
        {name: 'Kotlin', icon: null},
        {name: 'KRL', icon: null},
        {name: 'KRYPTON', icon: null},
        {name: 'Ladder', icon: null},
        {name: 'LANSA', icon: null},
        {name: 'Lagoona', icon: null},
        {name: 'Lasso', icon: null},
        {name: 'LaTeX', icon: null},
        {name: 'Lava', icon: null},
        {name: 'Leda', icon: null},
        {name: 'LegoScript', icon: null},
        {name: 'LIL', icon: null},
        {name: 'Limbo', icon: null},
        {name: 'Limnor', icon: null},
        {name: 'Lingo', icon: null},
        {name: 'LINC', icon: null},
        {name: 'LIS', icon: null},
        {name: 'lithe', icon: null},
        {name: 'Logo', icon: null},
        {name: 'Logtalk', icon: null},
        {name: 'LPC', icon: null},
        {name: 'LSL', icon: null},
        {name: 'Lucid', icon: null},
        {name: 'Lustre', icon: null},
        {name: 'M4', icon: null},
        {name: 'MAD', icon: null},
        {name: 'Magik', icon: null},
        {name: 'Magma', icon: null},
        {name: 'Maple', icon: null},
        {name: 'Mary', icon: null},
        {name: 'MATLAB', icon: null},
        {name: 'Maxima', icon: null},
        {name: 'MDL', icon: null},
        {name: 'Mercury', icon: null},
        {name: 'Mesa', icon: null},
        {name: 'Metacard', icon: null},
        {name: 'Microcode', icon: null},
        {name: 'MIIS', icon: null},
        {name: 'MillScript', icon: null},
        {name: 'Miranda', icon: null},
        {name: 'MIVA Script', icon: null},
        {name: 'ML', icon: null},
        {name: 'Moby', icon: null},
        {name: 'Modelica', icon: null},
        {name: 'Mohol', icon: null},
        {name: 'Mortran', icon: null},
        {name: 'MSL', icon: null},
        {name: 'MPL', icon: null},
        {name: 'NASM', icon: null},
        {name: 'NATURAL', icon: null},
        {name: 'Neko', icon: null},
        {name: 'NESL', icon: null},
        {name: 'Nial', icon: null},
        {name: 'NGL', icon: null},
        {name: 'Nice', icon: null},
        {name: 'Nim', icon: null},
        {name: 'NSIS', icon: null},
        {name: 'NXT-G', icon: null},
        {name: 'o:XML', icon: null},
        {name: 'Oak', icon: null},
        {name: 'OBJ2', icon: null},
        {name: 'Object Lisp', icon: null},
        {name: 'Objective-C', icon: null},
        {name: 'OCaml', icon: null},
        {name: 'occam', icon: null},
        {name: 'Octave', icon: null},
        {name: 'OpenCL', icon: null},
        {name: 'OPL', icon: null},
        {name: 'Orc', icon: null},
        {name: 'Oriel', icon: null},
        {name: 'Oxygene', icon: null},
        {name: 'OptimJ', icon: null},
        {name: 'Pascal', icon: null},
        {name: 'PCF', icon: null},
        {name: 'PEARL', icon: null},
        {name: 'Perl', icon: null},
        {name: 'Pico', icon: null},
        {name: 'Picolisp', icon: null},
        {name: 'Pict', icon: null},
        {name: 'PIKT', icon: null},
        {name: 'PILOT', icon: null},
        {name: 'Pizza', icon: null},
        {name: 'POP-11', icon: null},
        {name: 'Powerhouse', icon: null},
        {name: 'PowerShell', icon: null},
        {name: 'PPL', icon: null},
        {name: 'PROIV', icon: null},
        {name: 'PROMAL', icon: null},
        {name: 'Promela', icon: null},
        {name: 'R', icon: null},
        {name: 'RAPID', icon: null},
        {name: 'Ratfor', icon: null},
        {name: 'REBOL', icon: null},
        {name: 'Red', icon: null},
        {name: 'Reia', icon: null},
        {name: 'rex', icon: null},
        {name: 'Rlab', icon: null},
        {name: 'ROOP', icon: null},
        {name: 'RPG', icon: null},
        {name: 'Rust', icon: null},
        {name: 'S', icon: null},
        {name: 'S-Lang', icon: null},
        {name: 'SAIL', icon: null},
        {name: 'Sawzall', icon: null},
        {name: 'Script.NET', icon: null},
        {name: 'Sed', icon: null},
        {name: 'Self', icon: null},
        {name: 'SETL', icon: null},
        {name: 'Snowball', icon: null},
        {name: 'SISAL', icon: null},
        {name: 'Speedcode', icon: null},
        {name: 'SR', icon: null},
        {name: 'Starlogo', icon: null},
        {name: 'Strand', icon: null},
        {name: 'Subtext', icon: null},
        {name: 'SYMPL', icon: null},
        {name: 'TACL', icon: null},
        {name: 'TADS', icon: null},
        {name: 'Tea', icon: null},
        {name: 'TeX', icon: null},
        {name: 'TIE', icon: null},
        {name: 'Timber', icon: null},
        {name: 'Tom', icon: null},
        {name: 'TPU', icon: null},
        {name: 'TTM', icon: null},
        {name: 'Turbo C++', icon: null},
        {name: 'Ubercode', icon: null},
        {name: 'Umple', icon: null},
        {name: 'Unicon', icon: null},
        {name: 'UNITY', icon: null},
        {name: 'Vala', icon: null},
        {name: 'VBScript', icon: null},
        {name: 'Visual Basic', icon: null},
        {name: 'Visual Basic .NET', icon: null},
        {name: 'Vvvv', icon: null},
        {name: 'WATFIV', icon: null},
        {name: 'Winbatch', icon: null},
        {name: 'XQuery', icon: null},
        {name: 'Yorick', icon: null},
        {name: 'YQL', icon: null},
        {name: 'ZOPL', icon: null},
        {name: 'Zeno', icon: null}
    ];
}

