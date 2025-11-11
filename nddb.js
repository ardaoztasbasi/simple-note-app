window.addEventListener("load", function () {
  let yukleniyor = document.getElementById("yukleniyorEkrani");
  setTimeout(() => {
    yukleniyor.style.opacity = "0";
    setTimeout(() => yukleniyor.style.display = "none", 800);
  }, 2200); 
});

let notInput = document.getElementById("notInput");
let notButton = document.getElementById("notButton");
let notListesi = document.getElementById("notListe");

document.addEventListener("DOMContentLoaded", function () {
  let eskiNotlar = JSON.parse(localStorage.getItem("notlar")) || [];
  eskiNotlar = eskiNotlar.filter(n => n && n.trim() !== "");
  localStorage.setItem("notlar", JSON.stringify(eskiNotlar));

  eskiNotlar.forEach(function (n) {
    let newNot = document.createElement("p");
    newNot.innerText = n;
    newNot.classList.add("fade");

    let silBtn = document.createElement("span");
    silBtn.innerText = "DEL";
    silBtn.classList.add("sil-btn");

    silBtn.addEventListener("click", function () {
      newNot.remove();
      let eski = JSON.parse(localStorage.getItem("notlar")) || [];
      eski = eski.filter(x => x !== n);
      localStorage.setItem("notlar", JSON.stringify(eski));
    });

    newNot.appendChild(silBtn);
    notListesi.appendChild(newNot);
  });
});

notButton.addEventListener("click", function () {
  let yeniNotMetni = notInput.value.trim();

  if (yeniNotMetni === "") {
    alert("Cannot add an empty note!");
    return;
  }

  let newNot = document.createElement("p");
  newNot.innerText = yeniNotMetni;
  newNot.classList.add("fade");

  let silBtn = document.createElement("span");
  silBtn.innerText = "DEL";
  silBtn.classList.add("sil-btn");

  silBtn.addEventListener("click", function () {
    newNot.remove();
    let eski = JSON.parse(localStorage.getItem("notlar")) || [];
    eski = eski.filter(x => x !== yeniNotMetni);
    localStorage.setItem("notlar", JSON.stringify(eski));
  });

  newNot.appendChild(silBtn);
  notListesi.appendChild(newNot);

  let eskiNotlar = JSON.parse(localStorage.getItem("notlar")) || [];
  eskiNotlar.push(yeniNotMetni);
  localStorage.setItem("notlar", JSON.stringify(eskiNotlar));

  notInput.value = "";
});

let temizleButton = document.getElementById("temizleButton");

temizleButton.addEventListener("click", function () {
  if (confirm("Are you sure you want to delete all notes?")) {
    notListesi.innerHTML = "";
    localStorage.removeItem("notlar");
  }
});
