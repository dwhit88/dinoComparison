// Dino Data
const dinoData = {
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
};

// Create Dino Object
class Dino {
    constructor(species, weight, heightInInches, diet, location, timePeriod, fact) {
        this.species = species;
        this.weight = weight;
        this.height = heightInInches;
        this.diet = diet;
        this.location = location;
        this.timePeriod = timePeriod;
        this.fact = fact;
    }
}

// Create Dino Objects
function createDinoObjects() {
    let dinoArray = new Array();
    for (dino of dinoData["Dinos"]) {
        let dinoObject = new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact);
        dinoObject.imagePath = "'images/" + dino.species.toLowerCase() + ".png'";
        dinoArray.push(dinoObject);
    }
    return dinoArray;
}

// Create Human Object
function Human() {
    this.name = document.getElementById("name").value;
    this.height = Number(document.getElementById("feet").value * 12) + Number(document.getElementById("inches").value);
    this.weight = Number(document.getElementById("weight").value);
    this.diet = document.getElementById("diet").value;
    this.location = document.getElementById("continent").value;
}

// Create Tile Object
function Tile(species, imagePath, fact) {
    this.species = species;
    this.imagePath = imagePath;
    this.fact = fact;
}

let factStrings = {
    weightFact: function (humanData, dinoData) {
        return humanData.name + " weighs " + humanData.weight + " lbs and a " + dinoData.species + " weights " + dinoData.weight 
        + " lbs - a difference of " + Math.abs(humanData.weight - dinoData.weight) + " pounds!";
    },
    heightFact: function (humanData, dinoData) {
        return humanData.name + " is " + humanData.height + " in. tall and a " + dinoData.species + " is " + dinoData.height 
            + " in. tall - a difference of " + Math.abs(humanData.height - dinoData.height) + " inches!";
    },
    dietFact: function (humanData, dinoData) {
        let fact
        if (humanData.diet.toLowerCase() == dinoData.diet) {
            fact = humanData.name + " and a " + dinoData.species + " are both " + humanData.diet + "s!";
        } else {
            fact = humanData.name + " is a " + humanData.diet + " while a " + dinoData.species + " is a " + dinoData.diet + "!";
        }
    
        return fact
    },
    continentFact: function (humanData, dinoData) {
        let fact
        if (humanData.location == dinoData.location) {
            fact = humanData.name + " and a " + dinoData.species + " can both be found in " + dinoData.location + "!";
        } else {
            fact = humanData.name + " can be found in " + humanData.location + " while a " + dinoData.species + " can be found ";
            fact += (dinoData.location == "Worldwide" ? "worldwide" : "in " + dinoData.location) + "!";
        }
    
        return fact
    },
    timePeriodFact: function (humanData, dinoData) {
        return humanData.name + " missed seeing a " + dinoData.species + " during the " + dinoData.timePeriod + " period!";
    }
}

// Generate Fact for each tile
function generateFact(humanData, dinoData) {
    if (dinoData.species == "Pigeon") {
        return dinoData.fact;
    } else {
        let factOptions = ["weight", "height", "diet", "continent", "fact", "when"];
        let factTopic = factOptions[Math.floor(Math.random() * factOptions.length)];
        let fact;
        switch (factTopic) {
            case 'weight':
                fact = factStrings.weightFact(humanData, dinoData)
                break;
            case 'height':
                fact = factStrings.heightFact(humanData, dinoData)
                break;
            case 'diet':
                fact = factStrings.dietFact(humanData, dinoData)
                break;
            case 'continent':
                fact = factStrings.continentFact(humanData, dinoData)
                break;
            case 'fact':
                fact = dinoData.fact;
                break;
            case 'when':
                fact = factStrings.timePeriodFact(humanData, dinoData)
                break;
        };
        return fact;
    }
}

// Generate Tiles for each Dino in Array
function generateTileData() {
    let human = new Human();
    let allTiles = new Array();
    let dinoObjects = createDinoObjects();

    for (dino of dinoObjects) {
        allTiles.push(new Tile(dino.species, dino.imagePath, generateFact(human, dino)));
    }

    allTiles
        .sort(function(a, b){return 0.5 - Math.random()})           // From https://www.w3schools.com/js/js_array_sort.asp
        .splice(4, 0, new Tile(human.name, "images/human.png", ""));

    return allTiles;
}

// Render the tiles in html
function renderTiles(allTilesData) {
    let testDivItems = "";
    for (data of allTilesData) {
        testDivItems += "<div class='grid-item'><h3>" + data.species + "</h3><img src=" + data.imagePath 
            + " alt='dino name' /><p>" + data.fact + "</p></div>"
    };

    document.getElementById("grid").innerHTML += testDivItems;
}

// Initiate comparison
function clickCompareMe() {
    let allTilesData = generateTileData()
    renderTiles(allTilesData)

    var dinoCompareElement = document.getElementById("dino-compare");
    if (dinoCompareElement.style.display === "none") {              // From https://www.w3schools.com/jsref/prop_style_display.asp
        dinoCompareElement.style.display = "block";
    } else {
        dinoCompareElement.style.display = "none";
    }
}
