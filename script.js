//Predefiniowana lista produktów
var listOfProducts = [
	{productName: "Zegarek PRL", price: 10},
	{productName: "Quartz", price: 560},
	{productName: "Expensive Wood", price: 666},
	{productName: "Devinoo", price: 177},
	{productName: "Pathek Philippe", price: 1870},	
	{productName: "Dziszok", price: 360},	
	{productName: "Casio", price: 720},	
	{productName: "Rolex", price: 925},	
	{productName: "Bugatti", price: 1600},	
	{productName: "BMW", price: 1210},			
];

function loadProducts(){
	let basketHTML = document.querySelector("#products");

	for(let x = 0; x < listOfProducts.length; x++) {
		basketHTML.innerHTML += getProductTileHTML(listOfProducts[x].productName, listOfProducts[x].price);
	}
}

var basket=[]; //Lista w której będą produkty

function purchaseProducts(){
	if(basket.length > 0) {
		let message = "Zakupiono produkty za: " + getTotalPrice() + " PLN"; 
	
		alert(message);
		alert("Przedmioty zostały zakupione!");
		
		clearBasket();
	} else {
		alert("Twój koszyk jest pusty!");
	}
}

function clearBasket() {
	if(basket.length > 0) {
		basket = [];
		refreshBasketHTML();
		refreshBasketCurrentPrice();
	} else {
		alert("Nie można wyczyścić pustego koszyka :)");
	}
}

function addToBasket(productName, price)
{
    let product = { id: getNextUniqueId(), product : productName, cena: price};
    
	if(basket.length >= 8) {
		alert("Nie można dodać do koszyka więcej niż 8 produktów.")
	} else {
		basket.push(product);
	}
    
	refreshBasketHTML();
	refreshBasketCurrentPrice();
}

function getTotalPrice(){
	let sum = 0;
	
	for(let x = 0; x < basket.length; x++){
		sum = sum + basket[x].cena;
	}
	
	return sum;
}

function refreshBasketCurrentPrice(){
	let currentBasketPrice = document.querySelector("#currentBasketPrice");
	currentBasketPrice.innerHTML = "Cena koszyka: " + getTotalPrice() + " PLN";
}

function removeFromBasket(id){
	for(let x = 0; x < basket.length; x++) {
		if(basket[x].id === id){
			basket.splice(x,1);
		}
	}

	refreshBasketHTML();
	refreshBasketCurrentPrice();
}

function refreshBasketHTML(){
	let basketHTML = document.querySelector("#basket");
	basketHTML.innerHTML = "";
    for(let x=0; x < basket.length; x++){
        basketHTML.innerHTML += getProductBasketEntryHTML(basket[x].product, basket[x].cena, basket[x].id);
    }
}

function getProductBasketEntryHTML(productName, productPrice, productId){
	let tile =  "<div style='margin-top: 5%; display: flex; flex-flow: row wrap;'>" +
				"	<div class = 'productLabel' style = 'width: 58%;'>" +
				productName +
				"	</div>" +
				"	<div class = 'productLabel' style = 'width: 26%;' onclick = 'removeFromBasket(" + productId + ");'>" +
				"Usuń" +
				"	</div>" +
				"	<div class = 'productLabel'>" +
				"Cena: " + productPrice + " PLN" +
				"	</div>" +
				"</div>";
				
	return tile;			
}   

function getProductTileHTML(productName, price){
	let tile =  "<div class='card-block'>"+
				"	<div>"+
				"		<img src='https://i.ytimg.com/vi/quybRmrhZ1g/mqdefault.jpg' alt='" + productName + "'>"+
				"		<h3><b>" + productName + "</b></h3>"+
				"	</div>"+
				"   <div style = 'display: flex;flex-flow: row wrap;justify-content: space-between;'>"+
				"		<div style = 'padding-top: 10px; width: 50%;'>"+
				"Cena: " + price + " PLN"+
				"		</div>"+
				"	<div style = 'width: 50%;'>"+
				"		<button style = 'width: 100%; height: 40px;' onclick=\"addToBasket('" + productName + "'," + price + ");\">"+
				"Dodaj"+
				"		</button>"+
				"	</div>"+
				"   </div>"+
				"</div>";
	return tile;			
}

var currentUniqueId=0;
function getNextUniqueId(){
	return currentUniqueId++; 
}