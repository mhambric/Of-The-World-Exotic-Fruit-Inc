async function loadFruitDetails() {
  const params = new URLSearchParams(window.location.search);
  const fruitName = params.get("name");

  const response = await fetch("/api/fruits");
  const fruits = await response.json();
  const fruit = fruits.find(f => f.name === fruitName);

  if (fruit) {
    document.getElementById("fruit-title").textContent = fruit.name;
    document.getElementById("fruit-img").src = fruit.image;
    document.getElementById("fruit-img").alt = fruit.name;
    document.getElementById("fruit-price").textContent = `Price: $${fruit.price.toFixed(2)}`;
    document.getElementById("fruit-desc").textContent =
      `Our ${fruit.name} is fresh, organic, and hand-picked from sustainable farms.`;
  } else {
    document.body.innerHTML = "<h2>Fruit not found.</h2>";
  }
}

loadFruitDetails();
