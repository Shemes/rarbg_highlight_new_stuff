const dateQuerySelector = 'td:nth-child(3)';
const rowClassName = 'lista2';
const removeTaggedNewButtonText = chrome.i18n.getMessage("extensionButton")
const buttonHtml = `<div style="margin-top: 20px;" id="ext_new_styling"><a href="#">${removeTaggedNewButtonText}</a></div>`;

let rows = document.getElementsByClassName(rowClassName);
var lastVisit;

function setLastVisit() {
    let topmostRowDate = rows[0].querySelector(dateQuerySelector);
    let lastVisitDate = Date.parse(topmostRowDate.innerHTML);
    
    chrome.storage.sync.set({ rarbgLastVisit: lastVisitDate });

    for (let row of rows) row.style.border = '';
}

function highlight() {
    for (let row of rows) {
        let rowDate = Date.parse(row.querySelector(dateQuerySelector).innerHTML);
        if (rowDate > lastVisit) row.style.border = '2px solid red';
    }
}

function addCleanButton() {
    let pager = document.getElementById("pager_links")

    pager.insertAdjacentHTML('beforeend', buttonHtml);
    document.getElementById('ext_new_styling').addEventListener('click', () => setLastVisit());
}

window.addEventListener('load', () => chrome.storage.sync.get(['rarbgLastVisit'], result => {
    lastVisit = result.rarbgLastVisit
    addCleanButton();
    highlight();
}));


chrome.storage.onChanged.addListener((changes, namespace) => {
    lastVisit = changes["rarbgLastVisit"].newValue;
    highlight();
});