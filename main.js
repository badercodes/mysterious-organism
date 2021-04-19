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
      return result;
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
    complementStrand() {
      const complementDNA = [];
      for (element of this.dna) {
        switch (element) {
          case "A":
            complementDNA.push("T");
            break;

          case "T":
            complementDNA.push("A");
            break;

          case "C":
            complementDNA.push("G");
            break;

          case "G":
            complementDNA.push("C");
            break;

          default:
            complementDNA.push(element);
            break;
        }
      }
      return complementDNA;
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
// let ex1 = pAequorFactory(1, ["A", "C", "T", "G"]);
// let ex2 = pAequorFactory(2, ["A", "QC", "QT", "QT"]);
// ex1.compareDNA(ex2);
// ex2.compareDNA(ex1);

// testing #6
// console.log(ex1.willLikelySurvive());

// implemetning #7
let i = 0;
let temp;
const strongPAqueor = [];
while (i < 30) {
  temp = pAequorFactory(i, mockUpStrand());
  if (temp.willLikelySurvive()) {
    strongPAqueor.push(temp);
    i++;
  }
  // testing
  // console.log(temp);
}
// testing #7
// console.log(strongPAqueor);

// testing #9 complement DNA
// let a = pAequorFactory(1, [
//   "T",
//   "A",
//   "C",
//   "A",
//   "G",
//   "A",
//   "T",
//   "A",
//   "C",
//   "G",
//   "A",
//   "C",
//   "G",
//   "A",
//   "T",
// ]);
// console.log(a.complementStrand());

// implementation of challenge finding 2 most related strands
let related = 0;
let first;
let second;
let check;
for (let i = 0; i < 30; i++) {
  for (let j = i + 1; j < 30; j++) {
    check = strongPAqueor[i].compareDNA(strongPAqueor[j]);
    console.log(check);
    if (check >= related) {
      first = i;
      second = j;
      related = check;
    }
  }
}
console.log(related);
console.log(first);
console.log(second);
