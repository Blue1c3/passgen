const output = document.getElementById("password");
const lengthInput = document.getElementById("length");

const lower = document.getElementById("lower");
const upper = document.getElementById("upper");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generate = document.getElementById("generate");
const copy = document.getElementById("copy");

const options = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+{}[]"
};

function generatePassword() {
  let chars = "";
  if (lower.checked) chars += options.lower;
  if (upper.checked) chars += options.upper;
  if (numbers.checked) chars += options.numbers;
  if (symbols.checked) chars += options.symbols;

  if (!chars) {
    output.value = "select options";
    return;
  }

  let password = "";
  for (let i = 0; i < lengthInput.value; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  output.value = password;
}

generate.addEventListener("click", generatePassword);

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(output.value);
});

document.querySelectorAll("input").forEach(el => {
  el.addEventListener("change", generatePassword);
});
