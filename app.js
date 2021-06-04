const api = "https://www.themealdb.com/api/json/v1/1/filter.php?";

document.getElementById("serach-meal").addEventListener("click", () => {
  const inputMealName = document.getElementById("meal-name").value;
  if (inputMealName.length == 0) {
    document.querySelector(".alert").style.display = "block";
  } else {
    document.querySelector(".alert").style.display = "none";
    getMealData(inputMealName);
  }
  document.getElementById("meal-name").value = "";
  document.getElementById("meal-section").innerHTML = "";
});

const getMealData = (mealName) => {
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
                            <div class="card food-area mb-4">
                            <img src="${meal.strMealThumb}" />
                            <h3 class="card-footer p-3">${meal.strMeal}</h3> 
                            </div>
                            `;
    mealArea.appendChild(createBox);
  }
};
document.getElementsByClassName("food-area").addEventListener("click", () => {
  console.log("click hocche");
});
