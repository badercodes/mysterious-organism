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
    compareDNA: function (obj) {
      // compare this.dna with obj.dna
      let common = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === obj.dna[i]) common++;
      }
      let result = (common / dna.length) * 100;
      console.log(
        `specimen #${this.specimenNum} and specimen #${this.specimenNum} have ${result}% DNA in common`
      );
    },
    willLikelySurvive() {
      let count = 0;
      let total = this.dna.length;
      this.dna.forEach((element) => {
        if (element === "G" || element === "C") count++;
      });
      // for testing
      // console.log(count);
      return count / total >= 0.6 ? true : false;
    },
  };
};

// testing first implementation of pAequorFactor
// console.log(pAequorFactory(100, ["A", "C"]));

// testing #4
// let specimen = pAequorFactory(100, ["A", "T", "C"]);
// specimen.mutate();
// console.log(specimen);

// testing #5
let ex1 = pAequorFactory(1, ["A", "C", "T", "G"]);
let ex2 = pAequorFactory(2, ["A", "QC", "QT", "QT"]);
ex1.compareDNA(ex2);
ex2.compareDNA(ex1);

// testing #6
console.log(ex1.willLikelySurvive());
