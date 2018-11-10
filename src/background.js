const dateQuerySelector = 'td:nth-child(3)';
const rowClassName = 'lista2';

let rows = document.getElementsByClassName(rowClassName);

var lastVisit = localStorage.lastVisit;

function setLastVisit() {
    let topmostRowDate = rows[0].querySelector(dateQuerySelector);
    localStorage.lastVisit = lastVisit = Date.parse(topmostRowDate.innerHTML);
    
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
    let buttonHtml = `<div style="margin-top: 20px;" id="ext_new_styling"><a href="#">Remove tagged as new</a></div>`;
    
    pager.insertAdjacentHTML('beforeend', buttonHtml);
    document.getElementById('ext_new_styling').addEventListener('click', () => setLastVisit());
}

window.addEventListener('load', () => {
    addCleanButton();
    highlight();
});

// don't really know how to make it work:
// if we go to the "page 2", we are deleting the date, and updating it
// so this is useless.
// window.addEventListener('unload', (e) => setLastVisit()); 
