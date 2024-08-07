// for average rating 
document.addEventListener("DOMContentLoaded", function() {
    // Function to update stars based on rating
    function updateStars(rating, stars) {
        // Round the average rating to the nearest 0.5
        var roundedRating = Math.round(rating * 2) / 2;

        // Loop through the stars and set them based on the rounded rating
        stars.forEach(function(star, index) {
            star.classList.remove('fa-solid', 'fa-star-half-stroke');
            star.classList.add('fa-regular');
            
            if (index < Math.floor(roundedRating)) {
                star.classList.add('fa-solid');
                star.classList.remove('fa-regular');
            } else if (index == Math.floor(roundedRating) && roundedRating % 1 !== 0) {
                // Display half star if roundedRating is not an integer
                star.classList.add('fa-solid', 'fa-star-half-stroke');
                star.classList.remove('fa-regular');
            }
        });
    }

    // Get the average rating from .average-review
    var averageReviewElement = document.querySelector('.average-review');
    if (averageReviewElement) {
        var averageRating = parseFloat(averageReviewElement.textContent);
        var stars = document.querySelectorAll('.fa-star.average-review-star');
        updateStars(averageRating, stars);
    }

    // Get the average rating from .featured-rating
    var featuredRatingElement = document.querySelector('.featured-rating');
    if (featuredRatingElement) {
        var featuredRating = parseFloat(featuredRatingElement.textContent);
        var stars = document.querySelectorAll('.fa-star.featured-rating-star');
        updateStars(featuredRating, stars);
    }

    var popularRatingElements = document.querySelectorAll('.popular-ratings');
    if (popularRatingElements.length > 0) {
        popularRatingElements.forEach(function(popularRatingElement) {
            var popularRating = parseFloat(popularRatingElement.querySelector('.popular-review').textContent);
            var stars = popularRatingElement.querySelectorAll('.fa-star.popular-review-star');
            updateStars(popularRating, stars);
        });
    }

    // for individual rating on recipe reviews
    const reviewRatingElements = document.querySelectorAll(".review-rating");
    reviewRatingElements.forEach(function(element) {
        const rating = parseFloat(element.getAttribute("data-rating"));
        const stars = element.querySelectorAll(".review-star");
        updateStars(rating, stars);
    });
});
function toggleViewMoreButtons() {
    const reviewCards = document.querySelectorAll('.review-card');

    reviewCards.forEach(card => {
        const description = card.querySelector('.review-description');
        const viewMoreBtn = card.querySelector('.view-more-btn');

        if (description.scrollWidth > description.clientWidth) {
            viewMoreBtn.style.display = 'block';
        } else {
            viewMoreBtn.style.display = 'none';
        }
        viewMoreBtn.addEventListener('click', function() {
            dataId = this.dataset.id
            console.log(dataId)
        })
    });
}

// Call the function to toggle view more buttons
toggleViewMoreButtons();

function updateRatingBars(ratingDistribution) {
    for (const [star, percentage] of Object.entries(ratingDistribution)) {
        const filledBar = document.querySelector(`#star-${star} .filled-bar`);
        const percentageSpan = document.querySelector(`#percentage-${star}`);
        
        if (filledBar && percentageSpan) {
            filledBar.style.width = `${percentage}%`;
            percentageSpan.textContent = `${percentage.toFixed(1)}%`;
        }
    }
}

// Function to fetch rating distribution data via AJAX
function fetchRatingDistribution(recipeId) {
    fetch(`/api/rating-distribution/${recipeId}/`)
        .then(response => response.json())
        .then(data => {
            updateRatingBars(data);  // Update rating bars on success
        })
        .catch(error => console.error('Error fetching rating distribution:', error));
}

// Function to fetch rating distribution on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const recipeIdElement = document.getElementById('recipe-id');
    if (recipeIdElement) {
        const recipeId = recipeIdElement.textContent.trim();
        fetchRatingDistribution(recipeId);  
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const recipeSettingsIcon = document.querySelector('#settings i');
    const recipeSettingsDropdown = document.querySelector('#settings ul');
    const deleteRecipeTab = document.querySelector('.delete-recipe-btn')

    const deleteForm = document.querySelector('.delete-form-container')
    const cancelDeleteButton = document.querySelector('.cancel-delete-button');


    recipeSettingsIcon.addEventListener('click', function(event) {
        event.stopPropagation()
        if (recipeSettingsDropdown.style.display === 'none') {
            recipeSettingsDropdown.style.display = 'block'
        } else {
            recipeSettingsDropdown.style.display = 'none'
        }
    })

    deleteRecipeTab.addEventListener('click', function() {
        deleteForm.classList.add('visible')
    })

    cancelDeleteButton.addEventListener('click', function() {
        deleteForm.classList.remove('visible');
    });

    deleteForm.addEventListener('click', function(event) {
        if (event.target === deleteForm) {
            deleteForm.classList.remove('visible');
        }
    });

    window.addEventListener('click', function(event) {
        if (recipeSettingsDropdown.style.display === 'block') {
            recipeSettingsDropdown.style.display = 'none'
        }
    })
})

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

var swiper2 = new Swiper(".thumbnail-slider", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
});

const swiper = new Swiper('.main-swiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 4200,
        disableOnInteraction: false
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    thumbs: {
        swiper: swiper2,
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    }
})

// for recipe recommendation buttons
document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.test-container input[type="radio"]');
    const submitBtn = document.querySelector('.test-container button[type="submit"]');
    const form = document.getElementById('test-form');
    const recommendedRecipe = document.querySelector('.recommended-recipe');

    // Hide submit button initially
    submitBtn.style.display = 'none';

    function handleRadioClick(event) {
        const clickedInput = event.target;
        const container = clickedInput.closest('div[id^="choices"]');
        
        if (clickedInput.name === 'category' && clickedInput.checked) {
            addActiveClass(clickedInput);
            hideAllContainers();
            showNextContainer(container);
        } else if (clickedInput.name === 'include_allergens' && clickedInput.checked) {
            addActiveClass(clickedInput);
            hideAllContainers();
            showNextContainer(container);
        } else if (clickedInput.name === 'duration' && clickedInput.checked) {
            addActiveClass(clickedInput);
            hideAllContainers();
            showNextContainer(container);
        } else if (clickedInput.name === 'difficulty' && clickedInput.checked) {
            addActiveClass(clickedInput);
            hideAllContainers();
            showNextContainer(container);
        } else if (clickedInput.name === 'cost' && clickedInput.checked) {
            addActiveClass(clickedInput);
            showSubmitButton();
        }
    }

    function addActiveClass(input) {
        const allLabels = document.querySelectorAll('.test-label');
        allLabels.forEach(label => label.classList.remove('active'));
        
        const labelId = `test-${input.name}-label-${input.value}`;
        const label = document.getElementById(labelId);
        if (label) {
            label.classList.add('active');
            console.log(labelId)
        }
    }

    function hideAllContainers() {
        const containers = document.querySelectorAll('div[id^="choices"]');
        containers.forEach(container => {
            container.style.display = 'none';
        });
    }

    function showNextContainer(currentContainer) {
        const nextContainer = currentContainer.nextElementSibling;
        if (nextContainer) {
            nextContainer.style.display = 'grid';
        }
    }

    function showSubmitButton() {
        submitBtn.style.display = 'block';
    }

    choices.forEach(input => {
        input.addEventListener('click', handleRadioClick);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        hideAllContainers();

        const xhr = new XMLHttpRequest();
        const formData = new FormData(form);
        xhr.open('GET', form.action + '?' + new URLSearchParams(formData).toString(), true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.onload = function() {
            if (xhr.status === 200) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(xhr.responseText, 'text/html');
                const newContent = doc.querySelector('.recommended-recipe').innerHTML;
                const animationHeader = document.querySelector('.animation-header');
                animationHeader.style.display = 'block'
                recommendedRecipe.innerHTML = newContent;
                recommendedRecipe.style.display = 'flex';
                submitBtn.style.display = 'none';

                showMatchingFilters();
            }
        };

        xhr.send();
    });

    function showMatchingFilters() {
        const matchedFilters = Array.from(form.querySelectorAll('input[type="radio"]:checked')).map(input => input.name);
        const details = document.querySelectorAll('.detail');
        details.forEach(detail => {
            const filterName = detail.getAttribute('data-filter');
            if (!matchedFilters.includes(filterName)) {
                detail.style.display = 'none';
            }
        });
    }
})

document.addEventListener('DOMContentLoaded', function() {
    // for sort type
    const sortDropdown = document.querySelector('.sort-dropdown');
    const sortContent = document.querySelector('.sort-content');
    const form = document.querySelector('.sort-form');
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    const sortTypeText = document.querySelector('.sort-type'); 

    const filterForm = document.getElementById('filter-form');
    const filterButtons = document.querySelectorAll('#filter-form input[type="radio"]');

    filterButtons.forEach(button => {
        button.addEventListener('click', ()=> {
            filterForm.submit();
        })
    })

    // for ratings
    const ratingDropdown = document.querySelector('.filter-rating'); 
    const ratingContent = document.querySelector('.rating-content');

    // Toggle dropdown visibility when the dropdown is clicked
    sortDropdown.addEventListener('click', function(event) {
        sortContent.style.display = sortContent.style.display === 'block' ? 'none' : 'block';
        event.stopPropagation(); // Prevent the click event from bubbling up to the window
    });    

    const filterRatingForm = document.getElementById('filter-rating-form');
    const ratingButtons = filterRatingForm.querySelectorAll('input[type="radio"]');

    ratingButtons.forEach(ratingButton => {
        ratingButton.addEventListener('change', function() {
            filterRatingForm.submit();
        });
    });

    const submitForm = () => {
        form.submit(); 
    };

    // Function to update the "Sort By" text based on sort_type
    const updateSortByText = (sortType) => {
        if (sortType === 'name') {
            sortTypeText.textContent = 'Sort by: Default';
        } else if (sortType === '-name') {
            sortTypeText.textContent = 'Sort by: Z-A';
        } else if (sortType === 'date') {
            sortTypeText.textContent = 'Sort by: Oldest-Newest';
        } else if (sortType === '-date') {
            sortTypeText.textContent = 'Sort by: Newest-Oldest';
        }
    };

    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('change', function() {
            submitForm(); 
            updateSortByText(this.value); // Call the function to update the "Sort By" text
        }); 
    });

    ratingDropdown.addEventListener('click', function(event) {
        ratingContent.style.display = ratingContent.style.display === 'block' ? 'none' : 'block';

        // Close sort dropdown if open
        if (sortContent.style.display === 'block') {
            sortContent.style.display = 'none';
        }

        event.stopPropagation(); // Prevent the click event from bubbling up to the window
    });

    window.addEventListener('click', function(event) {
        // Close sort dropdown if open
        if (sortContent.style.display === 'block') {
            sortContent.style.display = 'none';
        }

        // Close rating dropdown if open
        if (ratingContent.style.display === 'block') {
            ratingContent.style.display = 'none';
        }
    });

    // Call the function to initially update the "Sort By" text based on the current sort type
    const initialSortType = document.querySelector('input[name="sort"]:checked').value;
    updateSortByText(initialSortType);
});

// for dynamically populating calendar as well as adding functionality for the mealplan date selection
document.addEventListener('DOMContentLoaded', function() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];

    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let currentDay = currentDate.getDate();

    const prevButton = document.querySelector('.calendar-header .prev');
    const nextButton = document.querySelector('.calendar-header .next');
    const dateDisplay = document.querySelector('#date');
    const daysContainer = document.querySelector('.calendar-container .days');
    const monthListDiv = document.querySelector('.month-list');
    const yearSlider = document.querySelector('.current-year');
    const eventDateDisplay = document.querySelector('.event-date');
    const addMealPlanBtn = document.querySelector('.add-mealplan-btn');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    yearSlider.textContent = currentYear;

    function updateCalendar() {
        daysContainer.innerHTML = '';
        dateDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
    
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 2).getDay();
        const lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();
    
        const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const daysFromNextMonth = lastDayOfMonth === 6 ? 0 : 6 - lastDayOfMonth;
    
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
        for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'prev-month');
            dayElement.textContent = i;
            daysContainer.appendChild(dayElement);
        }
    
        addMealPlanBtn.style.display = 'none';
    
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'current-month');
            dayElement.textContent = i;
    
            // Check if there is a meal plan for this day
            const date = new Date(currentYear, currentMonth, i);
            const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    
            fetch(`/api/mealplan/${formattedDate}/`)
                .then(response => response.json())
                .then(data => {
                    if (data.mealplan) {
                        dayElement.classList.add('booked');
                        dayElement.classList.remove('current-month');

                        const today = new Date();
                        const selectedDate = new Date(currentYear, currentMonth, i);

                        if (selectedDate < today) {
                            dayElement.classList.remove('booked');
                            dayElement.classList.add('past');
                        }
                    }
                })
                .catch(error => {
                    console.error('Error checking meal plan:', error);
                });
    
            dayElement.addEventListener('click', function() {
                const activeDay = document.querySelector('.day.active');
                if (activeDay) {
                    activeDay.classList.remove('active');
                }
                dayElement.classList.add('active');
    
                // Display the selected date
                eventDateDisplay.style.display = 'block'
                eventDateDisplay.innerHTML = `
                <i class="fa-solid fa-chevron-left"></i>
                ${months[currentMonth]} ${i}, ${currentYear}
                `;
                addMealPlanBtn.style.display = 'inline-block';
    
                // Fetch and display meal plan for the selected date
                fetchMealplanForDate(currentYear, currentMonth + 1, i);
                addMealPlanDetails(new Date(currentYear, currentMonth, i));
            });
            daysContainer.appendChild(dayElement);
        }
    
        for (let i = 1; i <= daysFromNextMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'next-month');
            dayElement.textContent = i;
            daysContainer.appendChild(dayElement);
        }
    
        const currentActive = document.querySelector('.month-item.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        const monthItems = document.querySelectorAll('.month-item');
        monthItems[currentMonth].classList.add('active');
    
        yearSlider.textContent = currentYear;
    }

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const searchValue = searchInput.value.trim();
        const [month, year] = searchValue.split('/').map(Number);

        if (month >= 1 && month <= 12 && year) {
            currentMonth = month - 1;
            currentYear = year;
            updateCalendar();
        } else {
            alert('Please enter a valid date in mm/yyyy format.');
        }
    });

    months.forEach((month, index) => {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month-item');
        monthDiv.textContent = month;
        monthDiv.addEventListener('click', () => {
            currentMonth = index;
            updateCalendar();
        });
        monthListDiv.appendChild(monthDiv);
    });

    updateCalendar();

    prevButton.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    nextButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    const prevYearBtn = document.querySelector('.year-prev');
    const nextYearBtn = document.querySelector('.year-next');

    prevYearBtn.addEventListener('click', function() {
        currentYear--;
        updateCalendar();
    });

    nextYearBtn.addEventListener('click', function() {
        currentYear++;
        updateCalendar();
    });

    const mealplanDetails = document.querySelector('.mealplan-details');
    const viewMealplanBtn = document.querySelector('.view-mealplan-btn');

    
    function fetchMealplanForDate(year, month, day) {
        const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        fetch(`/api/mealplan/${date}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.mealplan) {
                    displayMealplanDetails(data);
                } else {
                    mealplanDetails.innerHTML = `<span class="empty-meal-date">No meal plan</span>`;
                    viewMealplanBtn.style.display = 'none';
                    addMealPlanBtn.style.display = 'inline-block';
                }
            })
            .catch(error => {
                mealplanDetails.innerHTML = `<p>Error fetching meal plan for ${date}</p>`;
                console.error('Error fetching meal plan:', error);
            });
    
        // Back button for returning to upcoming recipes section again
        const backBtn = eventDateDisplay.querySelector('.fa-chevron-left');
        backBtn.addEventListener('click', function() {
            eventDateDisplay.style.display = 'none';
            upcomingMealplans(currentMonth, currentDay, currentYear);
            viewMealplanBtn.style.display = 'none';
        });
    }

    function displayMealplanDetails(data) {
        mealplanDetails.innerHTML = `
            <h1 class="mealplan-name">${data.mealplan.name}</h1>
            <p class="mealplan-info">${data.mealplan.description}</p>
            <ul class="meal-list">
                ${data.recipes.map(recipe =>
            `<li class="meal-item">${recipe.name}</li>`).join('')}
            </ul>
        `;
        viewMealplanBtn.style.display = 'inline-block';
        addMealPlanBtn.style.display = 'none';
    
        const mealplanSidebar = document.querySelector('.mealplan-sidebar');
        const mealplanRecipes = document.querySelector('.mealplan-recipes');
    
        if (!mealplanSidebar || !mealplanRecipes) {
            throw new Error("Required elements not found in the DOM");
        }
    
        mealplanSidebar.innerHTML = '';
        mealplanRecipes.innerHTML = '';
    
        const mealplanNameElement = document.createElement('h1');
        mealplanNameElement.textContent = data.mealplan.name;
        mealplanSidebar.appendChild(mealplanNameElement);
    
        const recipeListElement = document.createElement('ul');
        data.recipes.forEach(recipe => {
            const listItemElement = document.createElement('li');
            listItemElement.classList.add('mealplan-list-item');
            listItemElement.textContent = recipe.name;
            recipeListElement.appendChild(listItemElement);
        });
        mealplanSidebar.appendChild(recipeListElement);
    
        // Edit mealplan button
        const editMealplanBtn = document.createElement('div');
        editMealplanBtn.classList.add('edit-mealplan-btn');
        editMealplanBtn.textContent = `Edit Mealplan`;
        mealplanSidebar.appendChild(editMealplanBtn);
    
        editMealplanBtn.addEventListener('click', function() {
            const date = data.mealplan.date; 
            window.location.href = `/edit_mealplan/${date}/`;
        });
    
        data.recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('mealplan-recipe');
    
            recipeElement.innerHTML = `
                ${recipe.image ? `<img src="${recipe.image}" class="mealplan-recipe-image">` : ''}
                <h3>${recipe.name}</h3>
            `;
    
            mealplanRecipes.appendChild(recipeElement);
    
            // Function for displaying recipe details inside mealplan
            const recipeView = document.querySelector('.mealplan-recipe-view');
    
            // Call function to view recipe details in mealplan
            recipeElement.addEventListener('click', function() {
                viewRecipe(recipe, mealplanRecipes, recipeView)
            });
        });
    }

    function viewRecipe(recipe, mealplanRecipes, recipeView) {
        // Hide mealplanRecipes and show recipeView with the recipe details
        mealplanRecipes.style.display = 'none';
        recipeView.style.display = 'block';

        recipeView.innerHTML = `
            <div class="meal-image">
                ${recipe.image ? `<a href="/recipe/${recipe.name}"><img src="${recipe.image}" alt="${recipe.name}"></a>` : ''}
                <div class="image-overlay">
                    <p>View full recipe</p>
                </div>
            </div>
            <div class="meal-header">
                <h1>${recipe.name}</h1>
                <h2>${recipe.category}</h2>
            </div>
            <div class="meal-ingredients">
                <h3>Ingredients:</h3>
                <ul class="checklist">
                    ${recipe.ingredients.map((ingredient, index) => `
                        <li>
                            <input type="checkbox" id="ingredient${index}" name="ingredient${index}">
                            <label for="ingredient${index}">
                                ${ingredient.unit === 'none' ? `${ingredient.quantity} ${ingredient.name}` : `${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}`}
                            </label>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="meal-steps">
                <h3>Steps:</h3>
                <ol>
                    ${recipe.steps.map((step, index) => `
                        <li>
                            <p>${step.description}</p>
                            ${step.image ? `<img src="${step.image}">` : ''}
                            ${step.video ? `<video src="${step.video}" controls></video>` : ''}
                        </li>
                    `).join('')}
                </ol>
            </div>
            <button class="back-btn"><i class="fa-solid fa-caret-left"></i></button>
        `;

        // Add event listener to the back button to show mealplanRecipes again
        const backBtn = recipeView.querySelector('.back-btn');
        backBtn.addEventListener('click', function() {
            mealplanRecipes.style.display = 'grid';
            recipeView.style.display = 'none';
        });
    }
    
    function upcomingMealplans() {
        const currentDate = new Date(); 
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; 
        const currentDay = currentDate.getDate();

        const date = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;
        fetch(`/api/upcoming_mealplans/${date}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                let mealplanDetailsContent = "";
                if (data.length > 0) {
                    data.forEach(mealplan => {
                        const mealplanDate = new Date(mealplan.date);
                        const options = { month: 'long', day: 'numeric', year: 'numeric' };
                        const formattedDate = mealplanDate.toLocaleDateString('en-US', options);
                        mealplanDetailsContent += `
                            <li class="upcoming-mealplan-item" data-year="${mealplanDate.getFullYear()}" data-month="${mealplanDate.getMonth() + 1}" data-day="${mealplanDate.getDate()}">
                                <h3>${mealplan.name}</h3>
                                <h4>${formattedDate}</h4>
                            </li>
                        `;
                    });
                } else {
                    mealplanDetailsContent = "No mealplans";
                }
                mealplanDetails.innerHTML = `
                    <h2>Upcoming Mealplans</h2>
                    <ul>
                        ${mealplanDetailsContent}
                    </ul>
                `;
    
                document.querySelectorAll('.upcoming-mealplan-item').forEach(item => {
                    item.addEventListener('click', function() {
                        const year = this.dataset.year;
                        const month = this.dataset.month;
                        const day = this.dataset.day;
    
                        const monthName = months[parseInt(month, 10) - 1];
                        eventDateDisplay.style.display = 'block';
                        eventDateDisplay.innerHTML = `
                            <i class="fa-solid fa-chevron-left"></i>
                            ${monthName} ${day}, ${year}
                        `;
    
                        fetchMealplanForDate(year, month, day);
                    });
                });
            })
            .catch(error => {
                mealplanDetails.innerHTML = `<p>Error fetching upcoming mealplans</p>`;
                console.error('Error fetching upcoming mealplans:', error);
            });
    }
    
    
    const mealplanContainer = document.querySelector('.mealplan-container');
    const addMealForm = document.querySelector('.add-meal-form');

    viewMealplanBtn.addEventListener('click', function() {
        mealplanContainer.classList.add('visible');
        document.body.classList.add('blurred');
    });

    addMealPlanBtn.addEventListener('click', function() {
        addMealForm.classList.add('visible');
        document.body.classList.add('blurred');
    });

    const nextBtn = document.querySelector('.add-meal-form .next-form');
    const mainFormLeft = document.querySelector('.add-meal-form .left');
    const mainForm = document.querySelector('.main-form');
    const addRecipesForm = document.querySelector('.add-recipes-form');

    nextBtn.addEventListener('click', function() {
        mainFormLeft.style.display = 'none';
        mainForm.style.display = 'none';
        addRecipesForm.style.display = 'block';
    });
    
    function hideElements(event) {
        if (!mealplanContainer.contains(event.target) && !viewMealplanBtn.contains(event.target)) {
            mealplanContainer.classList.remove('visible');
        }
    
        if (!addMealForm.contains(event.target) && !addMealPlanBtn.contains(event.target)) {
            addMealForm.classList.remove('visible');
        }
    
        if (!addRecipesForm.contains(event.target) && event.target !== nextBtn) {
            addRecipesForm.style.display = 'none';
            mainForm.style.display = 'block';
            mainFormLeft.style.display = 'block';
        }
    
        if (!mealplanContainer.classList.contains('visible') &&
            !addMealForm.classList.contains('visible')) {
            document.body.classList.remove('blurred');
        }
    }
    
    function addMealPlanDetails(date) {
        const header = document.querySelector('.add-meal-form h1');
        const dateText = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        header.textContent = `Mealplan for ${dateText}`;
    
        const recipeChoice = document.querySelectorAll('.recipe-image');
        recipeChoice.forEach(choice => {
            choice.onclick = function() {
                console.log(choice.dataset.value);
                console.log(dateText);
            };
        });
    
        // Automatically fill the date input field with the selected date
        const dateInput = document.querySelector('.add-meal-form input[name="date"]');
        if (dateInput) {
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2); 
            const day = ('0' + date.getDate()).slice(-2); 
            dateInput.value = `${year}-${month}-${day}`; 
        }
    }

    function updateRecipeCount() {
        const countHeader = document.querySelector('.add-recipes-form .header h1');
        const selectedCount = document.querySelectorAll('.recipe-checkbox-input:checked').length;

        countHeader.textContent = `Selected Recipes (${selectedCount})`
    }

    const checkboxes = document.querySelectorAll('.recipe-checkbox-input');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            const recipeBox = checkbox.closest('.recipe-checkbox');
            if (this.checked) {
                recipeBox.classList.add('selected');
                console.log(`${checkbox.value} is selected`)
            } else {
                recipeBox.classList.remove('selected');
                console.log(`${checkbox.value} deselected`)
            }
            updateRecipeCount();
        });
    });

    upcomingMealplans(currentMonth, currentDay, currentYear);
    window.addEventListener('click', hideElements);
});

document.addEventListener("DOMContentLoaded", function() {
    const recipeCardContainer = document.querySelector(".recipe-card-container");
    const communitySection = document.querySelector(".community");

    function checkScroll() {
        const windowHeight = window.innerHeight;
        const recipeCardContainerTop = recipeCardContainer.getBoundingClientRect().top;
        const communitySectionTop = communitySection.getBoundingClientRect().top;

        if (recipeCardContainerTop < windowHeight * 0.75) {
            recipeCardContainer.classList.add("show-recipes");
        }

        if (communitySectionTop < windowHeight * 0.80) {
            communitySection.classList.add("show-community");
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Check initially in case the elements are already visible on page load
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleSidebarButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    toggleSidebarButton.addEventListener('click', function() {
        sidebar.classList.add('show'); // Toggle the 'show' class on the sidebar
    });

    window.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !toggleSidebarButton.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });
});

document.querySelectorAll('.like-btn').forEach(btn => {
    btn.onclick = function() {
        like(btn);
    }
});

function like(element) {
    fetch(`/like_recipe/${element.dataset.id}`)
    .then(response => response.json())
    .then(data => {
        if (data.liked) {
            element.classList.add('liked');
            showNotification("Recipe liked!");
        } else {
            element.classList.remove('liked');
            showNotification("Like removed.");
        }
    })
    .catch(error => console.error("Error:", error));
}

document.querySelectorAll('.follow-btn').forEach(btn => {
    btn.onclick = function() {
        follow(btn);
    }
});

function follow(element) {
    fetch(`/follow/${element.dataset.id}`)
    .then(response => response.json())
    .then(data => {
        if (data.followed) {
            element.classList.add('followed');
            element.innerHTML = "Unfollow";
            showNotification("Profile followed!");
        } else {
            element.classList.remove('followed');
            element.innerHTML = "Follow";
            showNotification("Profile Unfollowed.");
        }
        document.querySelector('#followers').innerHTML = "Followers: " + data.followers_count
    })
    .catch(error => console.error("Error:", error));
}

// delete icon for ingredients
document.querySelectorAll('.ingredients-list .delete-icon').forEach(function(icon) {
    icon.addEventListener('click', function() {
        const ingredientId = this.getAttribute('data-ingredient-id');
        document.getElementById('delete-ingredient-id').value = ingredientId;
        document.getElementById('delete-ingredient-form').submit();
    });
});

// delete icon for directions
document.querySelectorAll('.directions-list .delete-icon').forEach(function(icon) {
    icon.addEventListener('click', function() {
        const stepId = this.closest('li').getAttribute('data-step-id');
        document.getElementById('delete-step-id').value = stepId;
        document.getElementById('delete-step-form').submit();
    })
})


function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
    }

    // Set the notification message
    notification.textContent = message;

    // Display the notification
    notification.style.display = 'block';

    // Hide the notification after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const messageElement = document.getElementById('login-message');
    if (messageElement) {
        const message = messageElement.value;
        if (message) {
            showNotification(message);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleAllergensBtn = document.getElementById('toggle-allergens-btn');
    toggleAllergensBtn.addEventListener('change', function () {
        this.form.submit();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleLikesBtn = document.getElementById('toggle-likes-btn');
    toggleLikesBtn.addEventListener('change', function () {
        this.form.submit();
    });
});

// editing profile featured recipe 
document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('.edit-featured');
    const editContainer = document.querySelector('.edit-recipes-container');

    function toggleEditContainer() {
        if (editContainer.classList.contains('visible')) {
            editContainer.classList.remove('visible');
            document.body.classList.remove('blurred'); 
        } else {
            editContainer.classList.add('visible');
            document.body.classList.add('blurred'); 
        }
    }

    // Click event listener for the "Edit" button
    editButton.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the document body
        toggleEditContainer();
    });

    // Click event listener for the document body to close the container when clicking outside of it
    document.body.addEventListener('click', function(event) {
        // Check if the clicked element is not within the edit container
        if (!editContainer.contains(event.target) && event.target !== editButton) {
            editContainer.style.bottom = '-600px';
            document.body.classList.remove('blurred');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const recipeChoices = document.querySelectorAll('.recipe-choice');

    // Click event listener for recipe choices
    recipeChoices.forEach(function(choice) {
        choice.addEventListener('click', function() {
            const recipeId = choice.dataset.recipeId;
            document.getElementById('new-featured-recipe-input').value = recipeId;
            document.getElementById('edit-featured-recipe-form').submit();
        });
    });
});

// choosing recipe image for create form
document.getElementById('image-container').addEventListener('click', function() {
    document.querySelector('.create-recipe-image input[type="file"]').click();
});

document.querySelector('.create-recipe-image input[type="file"]').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var selectedImage = document.getElementById('selected-image');
            var imageContainer = document.querySelector('.create-recipe-image');
            
            selectedImage.src = e.target.result;
            selectedImage.style.display = 'block';
            selectedImage.style.width = '100%';
            selectedImage.style.height = '100%';

            document.getElementById('image-placeholder').style.display = 'none';

            // Change border to solid
            imageContainer.style.border = 'solid 1px black';
        }
        reader.readAsDataURL(file);
    }
});

// adding media for recipe directions
document.getElementById('add-step-image').addEventListener('click', function() {
    document.getElementById('image-upload').click();
});

// Function to trigger video upload when video icon is clicked
document.getElementById('add-step-video').addEventListener('click', function() {
    document.getElementById('video-upload').click();
});


// profile image editing
document.getElementById('profile-image').addEventListener('click', function() {
    document.getElementById('profile-image-input').click();
});

document.getElementById('profile-image-input').addEventListener('change', function() {
    document.getElementById('submit-profile-image').click();
});


// profile bio editing
function showEditForm() {
    document.getElementById('bio-text').style.display = 'none';
    document.querySelector('.edit-bio').style.display = 'none';
    document.getElementById('edit-bio-form').style.display = 'block';
}

function hideEditForm() {
    document.getElementById('bio-text').style.display = 'block';
    document.querySelector('.edit-bio').style.display = 'block';
    document.getElementById('edit-bio-form').style.display = 'none';
}