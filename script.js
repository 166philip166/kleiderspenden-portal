document.addEventListener("DOMContentLoaded", function () {
  // Mobile-Menü
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
  }

  // Formular-Logik nur auf der Startseite
  const formular = document.getElementById("spendenForm");
  if (!formular) {
    return;
  }

  const radioUebergabe = document.querySelector('input[name="art"][value="uebergabe"]');
  const radioAbholung = document.querySelector('input[name="art"][value="abholung"]');
  const adresseBereich = document.getElementById("adresseBereich");

  const kleidungsartSelect = document.getElementById("kleidungsart");
  const krisengebietSelect = document.getElementById("krisengebiet");

  const strasseInput = document.getElementById("strasse");
  const plzInput = document.getElementById("plz");
  const ortInput = document.getElementById("ort");

  const absendenBtn = document.getElementById("absendenBtn");
  const bestaetigungDiv = document.getElementById("bestaetigung");

  // Liste aller echten Wiener Bezirks-Postleitzahlen
  const echteWienPLZ = [
    "1010","1020","1030","1040","1050","1060","1070","1080","1090",
    "1100","1110","1120","1130","1140","1150","1160","1170","1180","1190",
    "1200","1210","1220","1230"
  ];

  function aktualisiereAdresseBereich() {
    if (radioAbholung.checked) {
      adresseBereich.style.display = "block";
    } else {
      adresseBereich.style.display = "none";
    }
  }

  radioUebergabe.addEventListener("change", aktualisiereAdresseBereich);
  radioAbholung.addEventListener("change", aktualisiereAdresseBereich);

  aktualisiereAdresseBereich();

  absendenBtn.addEventListener("click", function () {
    if (absendenBtn.disabled) {
      return;
    }

    const originalText = absendenBtn.textContent;
    absendenBtn.disabled = true;
    absendenBtn.textContent = "Wird verarbeitet...";

    function resetButton() {
      absendenBtn.disabled = false;
      absendenBtn.textContent = originalText;
    }

    const art = radioAbholung.checked ? "Abholung" : "Übergabe an der Geschäftsstelle";
    const kleidungsart = kleidungsartSelect.value;
    const krisengebiet = krisengebietSelect.value;

    let ortAnzeige = "Geschäftsstelle des Vereins";

    // Abholung: Adresse prüfen
    if (radioAbholung.checked) {
      const strasse = strasseInput.value.trim();
      const plz = plzInput.value.trim();
      const ort = ortInput.value.trim();

      if (!strasse || !plz || !ort) {
        alert("Bitte Straße, PLZ und Ort für die Abholung ausfüllen.");
        resetButton();
        return;
      }

      // NEUE PLZ-VALIDIERUNG: nur echte Wiener Bezirke
      if (!echteWienPLZ.includes(plz)) {
        alert("Bitte eine gültige Wiener Postleitzahl eingeben (1010–1230).");
        resetButton();
        return;
      }

      ortAnzeige = plz + " " + ort + ", " + strasse;
    }

    const jetzt = new Date();
    const datum = jetzt.toLocaleDateString("de-DE");
    const uhrzeit = jetzt.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

    bestaetigungDiv.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = "Spende erfolgreich registriert";

    const pArt = document.createElement("p");
    pArt.textContent = "Art der Spende: " + art;

    const pKleidung = document.createElement("p");
    pKleidung.textContent = "Art der Kleidung: " + kleidungsart;

    const pKrisen = document.createElement("p");
    pKrisen.textContent = "Krisengebiet: " + krisengebiet;

    const pOrt = document.createElement("p");
    pOrt.textContent = "Ort: " + ortAnzeige;

    const pDatum = document.createElement("p");
    pDatum.textContent = "Datum: " + datum;

    const pUhrzeit = document.createElement("p");
    pUhrzeit.textContent = "Uhrzeit: " + uhrzeit;

    bestaetigungDiv.appendChild(title);
    bestaetigungDiv.appendChild(pArt);
    bestaetigungDiv.appendChild(pKleidung);
    bestaetigungDiv.appendChild(pKrisen);
    bestaetigungDiv.appendChild(pOrt);
    bestaetigungDiv.appendChild(pDatum);
    bestaetigungDiv.appendChild(pUhrzeit);

    formular.style.display = "none";
    bestaetigungDiv.style.display = "block";
  });
});
