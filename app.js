const modal = document.querySelector(".modal");
const btns = document.querySelectorAll(".buyBtn");
const closeBtn = document.querySelector(".close");
const productNameContainer = document.querySelector(".productName");
const imgContainer = document.querySelectorAll(".imgContainer");

function toggleModal() {
  if (modal.style.display === "none") {
    modal.style.display = "flex";
    const productName = this.parentElement.parentElement.querySelector(
      ".detailsDiv > div:nth-child(1)"
    ).textContent;
    const productPrice = this.parentElement.parentElement.querySelector(
      ".detailsDiv > div:nth-child(2)"
    ).textContent;
    console.log(productPrice);
    productNameContainer.innerText = productName + " " + productPrice;
  } else {
    modal.style.display = "none";
  }
}

btns.forEach((button) => button.addEventListener("click", toggleModal));
closeBtn.addEventListener("click", toggleModal);

// Function to fetch reviews
function fetchReviews() {
  return fetch("reviews.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Function to display random review in modal
function displayRandomReview(reviews) {
  // Get a random review from the reviews array
  const randomReview = reviews[Math.floor(Math.random() * reviews.length)];

  // Create modal content with random review
  const modalContent = `
        <div class="review">
            <h2>User: ${randomReview.user}</h2>
            <p>Rating: ${randomReview.rating} ⭐</p>
            <p>Comment: ${randomReview.comment}</p>
        </div>
    `;

  // Display modal with random review content
  document.querySelector(".reviewsModal .review-content").innerHTML =
    modalContent;
}

const reviewsModal = document.querySelector(".reviewsModal");

function toggleReviewsModal() {
  if (reviewsModal.style.display === "none") {
    reviewsModal.style.display = "flex";
  } else {
    reviewsModal.style.display = "none";
  }
  fetchReviews().then((data) => {
    displayRandomReview(data.reviews);
  });
}

// Click event listener to each imgContainer
const imgContainers = document.querySelectorAll(".imgContainer");
imgContainers.forEach((imgContainer) => {
  imgContainer.addEventListener("click", toggleReviewsModal);
});

const closeReviewsBtn = document.querySelector(".closeBtn");
closeReviewsBtn.addEventListener("click", toggleReviewsModal);
