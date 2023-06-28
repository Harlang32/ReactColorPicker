// This line allows us to bring in the data object from our data.js file
const data = window.data;

const bigCoffee = document.getElementById('big_coffee')
const producerContainer = document.getElementById('producer_container')

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
   const coffeeCounter = document.getElementById('coffee_counter')
//  let convertedCounter = parseInt(coffeeCounter)
   coffeeCounter.innerText =coffeeQty
  // convertedCounter+=coffeeQty

  // coffeeCounter.innerText = convertedCounter
}

function clickCoffee(data) {

  // let coffee = data.coffee
  data.coffee++;

  updateCoffeeView(data.coffee)
     
  renderProducers(data)
}

  // Increment the data object's (passed into this function) coffee property by one
  // call the updateCoffeeView function and pass it the newly updated data.coffee property
  // call the renderProducers function and pass it the data object


/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
for (let i = 0; i < producers.length; i++){
 let currentProducer = producers[i]
 if (coffeeCount >= currentProducer.price/2){
  currentProducer.unlocked = true
    }
}

// return producers
}
function getUnlockedProducers(data) {
const allProducers = data.producers

const newArray = allProducers.filter(item=>(item.unlocked==true))
return newArray
//   const result = data.filter(function(product){
//     return product.unlocked == true
// });
// return result
}

// You do not need to edit this function
function makeDisplayNameFromId(id) {
  return id
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// You do not need to edit this function
function makeProducerDiv(producer) {
  const containerDiv = document.createElement("div");
  containerDiv.className = "producer";
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
    <div class="producer-column">
      <div class="producer-title">${displayName}</div>
      <button type="button" id="buy_${producer.id}">Buy</button>
    </div>
    <div class="producer-column">
      <div>Quantity: ${producer.qty}</div>
      <div>Points/second: ${producer.cps}</div>
      <div>Cost: ${currentCost} Points</div>
    </div>
    `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

// You do not need to edit this function
function deleteAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderProducers(data) {
  unlockProducers(data.producers, data.coffee)


  // call the unlockProducers function and pass it data.producers and data.coffee
unlockProducers(data.producers, data.coffee)
  // make a reference to the DOM element whose ID is producer_container
const producer_container = document.getElementById('producer_container')
  // call the deleteAllChildNodes function and pass it the above producerContainer element
deleteAllChildNodes(producerContainer);
  // you do not need to edit the following code, but for understanding, this gets the unlocked producers,
  // and for each producer makes a little html div with that producer's info
  getUnlockedProducers(data).forEach((producer) => {
    producerContainer.appendChild(makeProducerDiv(producer));
  });
}

/**************
 *   SLICE 3
 **************/

// You do not need to edit this function
function getProducerById(data, producerId) {
  return data.producers.find((producer) => producerId === producer.id);
}

// You do not need to edit this function
function canAffordProducer(data, producerId) {
  return getProducerById(data, producerId).price <= data.coffee;
}

// You do not need to edit this function
function updateCPSView(cps) {
  const cpsDiv = document.getElementById("cps");
  cpsDiv.innerText = cps;
}

// You do not need to edit this function
function updatePrice(oldPrice) {
  return Math.floor(oldPrice * 1.25);
}

// You do not need to edit this function
function attemptToBuyProducer(data, producerId) {
  if (canAffordProducer(data, producerId)) {
    const producer = getProducerById(data, producerId);
    data.coffee -= producer.price;
    producer.qty += 1;
    producer.price = updatePrice(producer.price);
    data.totalCPS += producer.cps;
    return true;
  } else {
    return false;
  }
}

// You do not need to edit this function
function buyButtonClick(event, data) {

  if (event.target.tagName === "BUTTON") {
    const producerId = event.target.id.slice(4);
    const result = attemptToBuyProducer(data, producerId);
    if (!result) {
      window.alert("Not enough points!");
    } else {
      renderProducers(data);
      updateCoffeeView(data.coffee);
      updateCPSView(data.totalCPS);
    }
  }
}

function tick(data) {
// let coffeeCount = data.coffee
data.coffee += data.totalCPS;

updateCoffeeView(data.coffee) 
//change to data.coffee inside function ^ maybe?

  // call the updateCoffeeView function and pass it the data.coffee property
  // call the renderProducers function and pass it the newly updated data object
  renderProducers(data);
}

// Event Listeners

// add a 'click' event listener to the bigCoffee element (that you referenced above)
// the event listener should call the clickCoffee function, and pass in the global data object
// bigCoffee.addEventListener('click', clickCoffee(data));

bigCoffee.addEventListener("click", (event) =>
{
  clickCoffee(data)
});

// add a 'click' event listener to the element (referenced at the top of the file)
// the event listener should call the buyButtonClick function and pass it the event, and the global data object


producerContainer.addEventListener("click", (event) =>
{
  buyButtonClick(event, data)
});




// You do not need to edit this last line. This simple runs your tick function every 1000ms, or 1s
setInterval(() => tick(data), 1000);
