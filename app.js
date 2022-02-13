var total = [];
var taxtotal = [];
var addBtn = document.getElementById('add');
var input = document.getElementById('userInput');
var input1 = document.getElementById('userInput1');
var imported = document.getElementById('imported');

var ul = document.getElementsByTagName('ul')[0];
var ul1 = document.getElementById('total');
var ul2 = document.getElementById('taxtotal');
var delBtn = document.getElementById('clear');


// Check length of input field
function addItemLength() {

    return document.getElementById('userInput').value.length;
}



// Check how many li elements exist
function checkLis() {
    return document.getElementsByTagName('li').length;
}


//create new list item
function createListItem() {

    // rounding rules

    function roundNumber(number_to_round) {
        return Math.ceil(number_to_round * 20) / 20
    }

    // calculating all the taxes, for import and normal taxes

    function sumAll(x, i) {
        if (imported.checked == true) {
            if (x == 'bottle of perfume' || x == 'music CD') {
                var tax = (15 * i) / 100;
                tax = roundNumber(tax) + i;
                return tax.toFixed(2);
            } else {
                var itax = (5 * i) / 100;
                itax = roundNumber(itax) + i;
                return itax.toFixed(2);
            }
        } else {
            if (x == 'bottle of perfume' || x == 'music CD') {
                var math = (10 * i) / 100;
                math = roundNumber(math) + i
                return math.toFixed(2);
            } else {
                return i;
            }
        }
    }

    // calculates just the added taxes
    function taxT(x, i) {
        if (imported.checked == true) {
            if (x == 'bottle of perfume' || x == 'music CD') {
                var tax = (15 * i) / 100;
                tax = roundNumber(tax)
                return tax.toFixed(2);
            } else {
                var itax = (5 * i) / 100;
                itax = roundNumber(itax)
                return itax.toFixed(2);
            }
        } else {
            if (x == 'bottle of perfume' || x == 'music CD') {
                var math = (10 * i) / 100;
                math = roundNumber(math);
                return math.toFixed(2);
            } else {
                return 0;
            }
        }
    }

    console.log(sumAll("music CD", 12.99) * (5 / 100) + 12.99)


    // Create li element, style it and append it to ul
    var li = document.createElement('li');
    li.classList.add('listItem');
    if (imported.checked == true) {
        li.append(document.createTextNode("imported "));
    }
    li.append(document.createTextNode(input.value));
    li.append(document.createTextNode(" "));
    li.append(document.createTextNode(sumAll(input.value, parseFloat(input1.value))));

    li.addEventListener('click', toggleDone);
    ul.appendChild(li);

    //console.log(sumAll('music CD', 21))

    // Array to save the price
    total.push(sumAll(input.value, parseFloat(input1.value)));
    console.log(total)
    // Array to save the taxes
    taxtotal.push(taxT(input.value, parseFloat(input1.value)));
    console.log(taxtotal)
    // calculatin Total
    var sum = total.reduce(function (pv, cv) { var tot = parseFloat(pv) + parseFloat(cv); return tot.toFixed(2) });
    //calculation total taxes
    var sumtax = taxtotal.reduce(function (pv, cv) { var taxs = parseFloat(pv) + parseFloat(cv); return taxs.toFixed(2) });

    console.log(sum)
    console.log(sumtax)

    var node = document.createTextNode(sum);
    var node1 = document.createTextNode(sumtax);

    var li2 = document.createElement('li');
    li2.append(document.createTextNode("Sales Taxes "));
    li2.append(node1);

    ul2.appendChild(li2);


    if (ul2.hasChildNodes()) {
        ul2.removeChild(ul2.childNodes[0]);
    }

    var li1 = document.createElement('li');

    li1.append(document.createTextNode("Total "));
    li1.append(node);
    ul1.appendChild(li1);


    if (ul1.hasChildNodes()) {
        ul1.removeChild(ul1.childNodes[0]);
    }

    input.value = "";

    // Toggle line-through on click
    function toggleDone() {
        li.classList.toggle('done');
  

    }

}

// On click
function addClick() {
    if (addItemLength() > 0) {
        createListItem();

    }
}

// On keypress enter
function addKey(event) {
    if (addItemLength() > 0 && event.keyCode == 13) {
        createListItem();
    }
}

// On Clear the page refresh and new list can be started
function refreshPage() {
    imported.checked = false;
    window.location.reload();
}

delBtn.addEventListener('click', refreshPage);
addBtn.addEventListener('click', addClick);
input1.addEventListener('keypress', addKey);
