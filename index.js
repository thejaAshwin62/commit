import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const date = moment()
    .year(2024) // Set the year explicitly to 2024
    .startOf("year") // Start from January 1st, 2024
    .add(x, "w") // Add weeks
    .add(y, "d") // Add days
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const x = random.int(0, 52); // Maximum 52 weeks in a year
  const y = random.int(0, 6); // Maximum 6 days in a week
  const date = moment()
    .year(2024) // Set the year explicitly to 2024
    .startOf("year") // Start from January 1st, 2024
    .add(x, "w") // Add weeks
    .add(y, "d") // Add days
    .format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(100);
