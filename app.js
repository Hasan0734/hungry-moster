const searchMeal = () => {
  const inputMealName = document.getElementById("meal-name").value;
  if (inputMealName.length == 0) {
    document.querySelector(".alert").style.display = "block";
  } else {
    document.querySelector(".alert").style.display = "none";
    getMealData(inputMealName);
  }
  document.getElementById("meal-name").value = "";
  document.getElementById("meal-section").innerHTML = "";
};

const getMealData = (mealName) => {
  const api = "https://www.themealdb.com/api/json/v1/1/filter.php?";
  fetch(`${api}i=${mealName}`)
    .then((res) => res.json())
    .then((data) => createUI(data));
};

const createUI = (data) => {
  const mealData = data.meals.slice(0, 8);
  console.log(mealData);
  const mealArea = document.getElementById("meal-section");
  for (let i = 0; i < mealData.length; i++) {
    const meal = mealData[i];
    const createBox = document.createElement("div");
    createBox.classList.add("col-3");
    createBox.innerHTML = `
                            <div onclick="mealDetails(${meal.idMeal})" class="card food-area mb-4">
                            <img src="${meal.strMealThumb}" />
                            <h3 class="card-footer p-3">${meal.strMeal}</h3> 
                            </div>
                            `;
    mealArea.appendChild(createBox);
  }
};
const mealDetails = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => creatMealDetailUI(data.meals[0]));
};
const creatMealDetailUI = (data) => {
  document.getElementById("show-search-meal").style.display = "none";
  const meal = document.getElementById("meal");
  meal.innerHTML = `
                  <div class="mt-5 d-flex justify-content-center">
                  <div>
                  <img class="detail-img" src="${data.strMealThumb}"/>
                  <h2 class="fs-1 py-4">${data.strMeal}</h2>
                  <div>
                  <h4>Ingredients</h4>
                  <ul class="list-unstyled">
                  <li><i class="fas fa-check-square text-danger me-2"></i> ${data.strIngredient1}</li>
                  <li><i class="fas fa-check-square text-danger me-2"></i> ${data.strIngredient2}</li>
                  <li><i class="fas fa-check-square text-danger me-2"></i> ${data.strIngredient3}</li>
                  <li><i class="fas fa-check-square text-danger me-2"></i> ${data.strIngredient4}</li>
                  <li><i class="fas fa-check-square text-danger me-2"></i> ${data.strIngredient6}</li>
                  <li><i class="fas fa-check-square text-danger me-2"></i> ${data.strIngredient7}</li>
                  </ul>
                  </div>
                  </div>
                  </div>
 `;
};
