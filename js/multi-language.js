const defaultLocale = "english";
let locale;
let translations = {};
// When the page content is ready...
async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
    await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    // Set <html dir> attribute
    document.documentElement.dir = dir(newLocale);
    // Not necessary for direction flow, but for good measure...
    document.documentElement.lang = newLocale;
    translatePage();
}

function dir(locale) {
    return locale === "arabic" ? "ltr" : "ltr";
}

function translatePage() {
    document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement);
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;
}

document.addEventListener("DOMContentLoaded", () => {
    setLocale(defaultLocale);
    bindLocaleSwitcher(defaultLocale);
});

function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
      // Set the locale to the selected option[value]
      setLocale(e.target.value);
    };
}