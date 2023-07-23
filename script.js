document.addEventListener('DOMContentLoaded', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            updateRecipeCard(meal);
        })
        .catch(err => console.error(err));
});

function updateRecipeCard(meal) {
    
    // Set page data
    document.getElementById('recipe-name').innerText = meal.strMeal;
    document.getElementById('recipe-category').innerText += meal.strCategory;
    document.getElementById('recipe-area').innerText += meal.strArea;
    document.getElementById('recipe-image').src = meal.strMealThumb;
    document.getElementById('recipe-image').alt = meal.strMeal;
    document.getElementById('recipe-instructions').innerText = meal.strInstructions;
    document.getElementById('recipe-instructions').innerText = meal.strInstructions;
    document.getElementById('recipe-link').href = meal.strSource;
   
    // Populate tags
    var tags = meal.strTags ? meal.strTags.split(",") : [];
    var tagElement = document.getElementById('recipe-tags');
    if(tags.length > 0)
    {
        // Clear the current list of tags
        tagElement.innerHTML = '';
        tags.forEach(tag => {
            tagElement.innerHTML += `<div class="tag"> ${tag} </div>`;
        });
    }
    else {
      document.getElementById('tags-title').hidden = true;
    }
    
    // Populate ingredients
    const ingredientList = document.getElementById('recipe-ingredient-list');
    ingredientList.innerHTML = ''; // Clear the current list of ingredients
    for(let i = 1; i <= 20; i++) {
        if(meal['strIngredient' + i]) {
            var ingredientName = meal['strIngredient' + i];
            var ingredientMeasure = meal['strMeasure' + i];
            ingredientList.innerHTML += `<li class="ingredient"> <strong> ${ingredientName}: </strong> ${ingredientMeasure} </li>`;
        }
    }
}
