let units = JSON.parse(localStorage.getItem("units") || "[]");
const list = document.getElementById("list");

function save() {
  localStorage.setItem("units", JSON.stringify(units));
}

function render() {
  list.innerHTML = "";
  units.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = `${u.unit} - ${u.tenant}: rent ${u.rent}, paid ${u.paid}, balance ${u.rent - u.paid} `;
    const btn = document.createElement("button");
    btn.textContent = "Record payment";
    btn.onclick = () => {
      const amount = Number(prompt("Amount received?"));
      if (amount > 0) { u.paid += amount; save(); render(); }
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

document.getElementById("unitForm").addEventListener("submit", (e) => {
  e.preventDefault();
  units.push({
    unit: document.getElementById("unit").value,
    tenant: document.getElementById("tenant").value,
    rent: Number(document.getElementById("rent").value),
    paid: 0,
  });
  e.target.reset();
  save();
  render();
});

render();