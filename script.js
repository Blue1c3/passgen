const output = document.getElementById("password");
const lengthInput = document.getElementById("length");

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
    output.textContent = "select options";
    return;
  }

  let password = "";
  for (let i = 0; i < lengthInput.value; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  output.textContent = password;
}

generate.addEventListener("click", generatePassword);
copy.addEventListener("click", () => {
  navigator.clipboard.writeText(output.textContent);
});

document.querySelectorAll("input").forEach(el =>
  el.addEventListener("change", generatePassword)
);
