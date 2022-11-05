let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Fetch Andy's Toys
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toys => {
  for (let card in toys){
    renderToys(toys[card])
  }
})

// Add Toy Info
function renderToys(toy) {
  let toyName = document.createElement('h2')
  toyName.innerText = toy.name
  let image = document.createElement('img')
  image.className = "toy-avatar"
  image.src = toy.image
  let likes = document.createElement('p')
  likes.innerText = toy.likes + " likes"
  likes.id = "likesId"
  let button = document.createElement('button')
  button.className = "like-btn"
  button.id = toy.id
  button.innerText = "Like Button <3"
  button.addEventListener('click', (e) =>updateLikeNumber(e))
  let toyCards = document.getElementById("toy-collection")
  let card = document.createElement('div')
  card.className = "card"
  card.append(toyName)
  card.append(image)
  card.append(likes)
  card.append(button)
  toyCards.append(card)
}

// Increase a Toy's Likes
function updateLikeNumber(e) {
  e.preventDefault()
  let buttonId = e.target.id
  fetch(`http://localhost:3000/toys/${buttonId}`, { 
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Accept": "application/json", 
    }
  })
    .then(response => response.json())
    .then(object => {
      let likeAmount = object.likes
      let incrementAmount = likeAmount++
      console.log(likeAmount)
    })
}

  
  

