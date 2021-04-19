// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
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

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let random = Math.floor(Math.random() * this.dna.length);
      let originalBase = this.dna[random];
      let newBase = this.dna[random];
      while (originalBase === newBase) {
        newBase = returnRandBase();
      }
      this.dna[random] = newBase;
    },
  };
};

// testing first implementation of pAequorFactor
// console.log(pAequorFactory(100, ["A", "C"]));

// testing #4
let specimen = pAequorFactory(100, ["A", "T", "C"]);
specimen.mutate();
console.log(specimen);
