const fs = require('fs');
const content = fs.readFileSync('/Users/robertosteiner/Desktop/Webseite/components/translations.ts', 'utf8');
const languages = ['de', 'fr', 'it', 'en', 'es', 'pt', 'nl', 'pl', 'tr', 'ru'];
const results = {};
languages.forEach(lang => {
    const langStart = content.indexOf('    ' + lang + ': {');
    if (langStart === -1) return;
    const nextLangIndex = languages.indexOf(lang) + 1;
    let langEnd = content.length;
    if (nextLangIndex < languages.length) {
        const nextLangStart = content.indexOf('    ' + languages[nextLangIndex] + ': {');
        if (nextLangStart !== -1) langEnd = nextLangStart;
    }
    const langSection = content.slice(langStart, langEnd);
    const keys = [];
    const regex = /^        ([a-zA-Z0-9]+): {/gm;
    let match;
    while ((match = regex.exec(langSection)) !== null) {
        keys.push(match[1]);
    }
    results[lang] = keys;
});
console.log(JSON.stringify(results, null, 2));
