export default function initiateLocalStorage() {
  if (!localStorage.getItem("all")) {
    // these are some sensible defaults :)
    localStorage.setItem("all", "");
    localStorage.setItem("single", "");
  }
}

function appendToAll(itm) {
  initiateLocalStorage(); // this is a super weird bug
  // we are doing this as an automatic way of filtering the bad
  // obviously there's a better way to do this.
  const data = localStorage.getItem("all")
    .split(/\s*,\s*/)
    .filter(e => e != ''); // can't be too careful

  data.push(itm);
  localStorage.setItem("all", data.join(','));

  potentialSingle(itm);
}

function getAverage() {
  initiateLocalStorage();

  const data = localStorage.getItem("all")
    .split(/\s*,\s*/)
    .filter(e => e != '');

  if (data.length == 0) return 'N/A';

  const sum = data.reduce((sum, curr) => sum + parseInt(curr), 0);

  return (sum / data.length).toFixed(2);
}

function getSingle() {
  initiateLocalStorage();

  return localStorage.getItem("single") == '' ? 'N/A' : localStorage.getItem("single");
}

function getAll() {
  initiateLocalStorage();

  return localStorage.getItem("all");
}

function potentialSingle(itm) {
  let hs = localStorage.getItem("single");
  hs = hs == '' ? Infinity : parseInt(hs);
  if (itm < hs) localStorage.setItem("single", itm);
}

export { appendToAll, getAverage, getSingle, getAll };