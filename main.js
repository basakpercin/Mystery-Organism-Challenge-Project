// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNumber, dna) {
  return {
    specimenNumber: specimenNumber,
    dna: dna,
    mutate() {
      console.log(`original dna strand ${dna} of specimen ${specimenNumber}`);
      let randomBaseIndex = Math.floor(Math.random() * this.dna.length);
      console.log(`random index selected is ${randomBaseIndex}`);
      let currentBase = this.dna[randomBaseIndex];
      console.log(`random base selected from dna ${currentBase}`);
      let differentBase = returnRandBase();
      console.log(`random base selected ${differentBase}`);
      while(currentBase ===  differentBase){
        console.log('Bases are the same picking new base');
        differentBase = returnRandBase();
      }
      dna.splice(randomBaseIndex, 1, differentBase);
      console.log(`mutated dna strand is ${this.dna}`);
    },

    //compares this.dna and pAequor object, returns nothing but console.logs 
    compareDNA(pAequor) {
      let counter = 0;
       console.log(`Strands being compared are specimen1: ${this.specimenNumber} and its strand: ${this.dna} & specimen2: ${pAequor.specimenNumber} and its strand: ${pAequor.dna}`);
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === pAequor.dna[i]){
          console.log(`Bases at index ${i} are the same: ${this.dna[i]} and ${pAequor.dna[i]}`);
          counter++;
          console.log(`counter is at ${counter}`);
        }
      }
      let percentage = ((counter / this.dna.length) * 100).toFixed(2);
      console.log(`Specimens have ${percentage}% DNA in common`);
    },

    willLikelySurvive() {
      let checker = 0;
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === 'C' || this.dna[i] === 'G'){
          checker++;
        }
      }

      let survivalPercentage = ((checker / this.dna.length) * 100).toFixed(2);
      if(survivalPercentage >= 60){
        return true;
      } else {
        return false;
      }
    },

    complementStrand(){
      let complementaryStrand = [];
      console.log(this.dna)
      for(let i = 0; i < this.dna.length; i++){
        switch (this.dna[i]){
          case 'A':
            complementaryStrand.push('T');
            break;
          case 'T':
            complementaryStrand.push('A');
            break;
          case 'G':
            complementaryStrand.push('C');
            break;
          case 'C':
            complementaryStrand.push('G');
            break;
        }
      }
      return complementaryStrand;
    }
  }
};

let survivorSpecies = [];
let specimenCount = 0;

while(survivorSpecies.length < 30){
  let newSpecimen = pAequorFactory(specimenCount, mockUpStrand());
  if(newSpecimen.willLikelySurvive()){
    survivorSpecies.push(newSpecimen);
  }
  specimenCount++;
}

// pAequorFactory(1, mockUpStrand()).compareDNA(pAequorFactory(2, mockUpStrand()));
// console.log(survivorSpecies);

//console.log(pAequorFactory(1, mockUpStrand()).complementStrand());

const myStrand = ['G','C','C','G','G'];
const myBacteria = pAequorFactory(15,myStrand);
console.log(`Complemantry strand of my bactera ${myBacteria.complementStrand()}`)

for (let i=0; i< myStrand.length; i++) {
  myStrand[i]='A';
}
console.log(`Complemantry strand of my bactera ${myBacteria.complementStrand()}`)
