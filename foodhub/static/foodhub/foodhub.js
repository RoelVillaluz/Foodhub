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

    // Loop through all elements with class 'profile-popular-card' and update their stars
    document.querySelectorAll('.profile-popular-card').forEach(function(card) {
        var averageReviewElement = card.querySelector('.popular-review');
        if (averageReviewElement) {
            var averageRating = parseFloat(averageReviewElement.textContent);
            var stars = card.querySelectorAll('.fa-star.popular-review-star');
            updateStars(averageRating, stars);
        }
    });
});

const stars = document.querySelectorAll('.rating input[type="radio"]');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                stars.forEach(s => {
                    if (s.id <= star.id) {
                        s.parentNode.classList.add('selected');
                    } else {
                        s.parentNode.classList.remove('selected');
                    }
                });
            });
        });

const radioButtons = document.querySelectorAll('#filter-form input[type="radio"]');
radioButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Submit the form when a radio button is clicked
        document.getElementById('filter-form').submit();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // for sort type
    const sortDropdown = document.querySelector('.sort-dropdown');
    const sortContent = document.querySelector('.sort-content');
    const form = document.querySelector('.sort-form');
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    const sortTypeText = document.querySelector('.sort-type'); // Updated selector

    // for ratings
    const ratingDropdown = document.querySelector('.filter-rating'); 
    const ratingContent = document.querySelector('.rating-content');

    // Toggle dropdown visibility when the dropdown is clicked
    sortDropdown.addEventListener('click', function(event) {
        sortContent.style.display = sortContent.style.display === 'block' ? 'none' : 'block';
        event.stopPropagation(); // Prevent the click event from bubbling up to the window
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

    const prevButton = document.querySelector('.calendar-header .prev');
    const nextButton = document.querySelector('.calendar-header .next');
    const dateDisplay = document.querySelector('#date');
    const daysContainer = document.querySelector('.calendar-container .days');
    const monthListDiv = document.querySelector('.month-list');
    const yearSlider = document.querySelector('.current-year');
    const eventDateDisplay = document.querySelector('.event-date');
    const addMealPlanBtn = document.querySelector('.add-mealplan-btn');
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
                eventDateDisplay.textContent = `${months[currentMonth]} ${i}, ${currentYear}`;
                addMealPlanBtn.style.display = 'inline-block';
    
                // Fetch and display meal plan for the selected date
                fetchMealplanForDate(currentYear, currentMonth + 1, i);
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
                        listItemElement.textContent = recipe.name;
                        recipeListElement.appendChild(listItemElement);
                    });
                    mealplanSidebar.appendChild(recipeListElement);
    
                    data.recipes.forEach(recipe => {
                        const recipeElement = document.createElement('div');
                        recipeElement.classList.add('mealplan-recipe');
                        recipeElement.innerHTML = `
                            ${recipe.image ? `<img src="${recipe.image}" class="mealplan-recipe-image">` : ''}
                            <h3>${recipe.name}</h3>
                        `;
                        mealplanRecipes.appendChild(recipeElement);
                    });
    
                } else {
                    mealplanDetails.innerHTML = `<span class="empty-meal-date">No meal plan for ${date}</span>`;
                    viewMealplanBtn.style.display = 'none';
                    addMealPlanBtn.style.display = 'inline-block';
                }
            })
            .catch(error => {
                mealplanDetails.innerHTML = `<p>Error fetching meal plan for ${date}</p>`;
                console.error('Error fetching meal plan:', error);
            });
    }

    const mealplanContainer = document.querySelector('.mealplan-container');

    viewMealplanBtn.addEventListener('click', function() {
        mealplanContainer.classList.add('visible');
        document.body.classList.add('blurred');
    });
    
    window.addEventListener('click', function(event) {
        if (!mealplanContainer.contains(event.target) && !viewMealplanBtn.contains(event.target)) {
            mealplanContainer.classList.remove('visible');
            document.body.classList.remove('blurred');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var reviewCountLink = document.querySelector('.review-count a');

    if(reviewCountLink) {
        reviewCountLink.addEventListener('click', function(event) {
            event.preventDefault();
            var reviewsSection = document.querySelector('.review-list');
            reviewsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const recipeCardContainer = document.querySelector(".recipe-card-container");
    const communitySection = document.querySelector(".community");

    function checkScroll() {
        const windowHeight = window.innerHeight;
        const recipeCardContainerTop = recipeCardContainer.getBoundingClientRect().top;
        const communitySectionTop = communitySection.getBoundingClientRect().top;

        if (recipeCardContainerTop < windowHeight * 0.75) {
            recipeCardContainer.classList.add("visible");
        }

        if (communitySectionTop < windowHeight * 0.80) {
            communitySection.classList.add("visible-community");
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


var selectedCategory = "{{ selected_category }}";
var selectedDuration = "{{ selected_duration }}";
var selectedCost = "{{ selected_cost }}";
var selectedDifficulty = "{{ selected_difficulty }}";

function updateSelectedOptions(fieldName, value) {
    if (fieldName === "category") {
        selectedCategory = value;
    } else if (fieldName === "duration") {
        selectedDuration = value;
    } else if (fieldName === "cost") {
        selectedCost = value;
    } else if (fieldName === "difficulty") {
        selectedDifficulty = value;
    }
}

// editing profile featured recipe 
document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('.edit-featured');
    const editContainer = document.querySelector('.edit-recipes-container');

    // Function to toggle the visibility of the edit container
    function toggleEditContainer() {
        if (editContainer.style.bottom === '0px') {
            editContainer.style.bottom = '-600px';
            document.body.classList.remove('blurred'); // Remove blur when hiding edit container
        } else {
            editContainer.style.bottom = '0px';
            document.body.classList.add('blurred'); // Add blur when showing edit container
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

// allergen checkbox function
document.addEventListener("DOMContentLoaded", function() {
    const allergens = document.querySelectorAll('.allergen-choice');
    allergens.forEach(allergen => {
        allergen.addEventListener('change', function() {
            document.getElementById('allergen-form').submit();
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