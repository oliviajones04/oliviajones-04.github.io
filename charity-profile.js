 // Function to show the contact form when a "Volunteer Now" button is clicked
 function showVolunteerForm(event) {
    // Prevent page redirection
    event.preventDefault();

    // Show the hidden form
    const form = document.getElementById('volunteer-form');
    form.style.display = 'block';
}

// Add event listeners to all "Volunteer Now" buttons
const volunteerButtons = document.querySelectorAll('.volunteer-btn');
volunteerButtons.forEach(button => {
    button.addEventListener('click', showVolunteerForm);
});

// Hover effect to show charity details dynamically
function showAdditionalDetails(event) {
    const charitySection = event.target.closest('section');
    const description = charitySection.querySelector('.charity-description');
    const location = charitySection.querySelector('.charity-location');
    const contact = charitySection.querySelector('.charity-contact');

    // Show the description, location, and contact details on hover
    description.style.display = 'block';
    location.style.display = 'block';
    contact.style.display = 'block';
}

function hideAdditionalDetails(event) {
    const charitySection = event.target.closest('section');
    const description = charitySection.querySelector('.charity-description');
    const location = charitySection.querySelector('.charity-location');
    const contact = charitySection.querySelector('.charity-contact');

    // Hide the description, location, and contact details when hover ends
    description.style.display = 'none';
    location.style.display = 'none';
    contact.style.display = 'none';
}

// Add hover listeners to all charity names
const charityNames = document.querySelectorAll('h2');
charityNames.forEach(name => {
    name.addEventListener('mouseover', showAdditionalDetails);
    name.addEventListener('mouseout', hideAdditionalDetails);
});
// Function to show the volunteer form and overlay
function showVolunteerForm(event) {
    event.preventDefault(); // Prevent page redirection

    // Show the hidden form and overlay
    const form = document.getElementById('volunteer-form');
    const overlay = document.getElementById('volunteer-form-overlay');
    
    form.style.display = 'block';
    overlay.style.display = 'block';
}

// Function to close the volunteer form and overlay
function closeVolunteerForm() {
    const form = document.getElementById('volunteer-form');
    const overlay = document.getElementById('volunteer-form-overlay');
    
    form.style.display = 'none';
    overlay.style.display = 'none';
}



// Add event listener to the overlay to close the form when clicked outside
const overlay = document.getElementById('volunteer-form-overlay');
overlay.addEventListener('click', closeVolunteerForm);

// Close the form if the user clicks the 'x' button or anywhere outside the form.
const form = document.getElementById('volunteer-form');
form.addEventListener('click', function (event) {
    event.stopPropagation();  // Prevent click event from bubbling up to overlay
});

// Optionally, if you want to allow closing by clicking the "Submit" button in the form, you could do the following (optional):
const submitButton = form.querySelector('button[type="submit"]');
submitButton.addEventListener('click', closeVolunteerForm);

// Example JavaScript code to fetch volunteer data from the VolunteerMatch API
const apiUrl = 'https://volunteerhub.com'; 
const apiKey = 'FPPek7t4ovnKMs040jigmVoVfrRIocCG9SMUD7dHPYZuRagdxuQOZ3KTZYAq0XIsPBqLku4uTAALHtW'; // 



// Function to display volunteer opportunities
function displayVolunteerOpportunities(data) {
    const container = document.getElementById('volunteer-list'); // Assuming there's a container element to display the data
    container.innerHTML = ''; // Clear previous content

    data.opportunities.forEach(opportunity => {
        const opportunityElement = document.createElement('div');
        opportunityElement.classList.add('volunteer-opportunity');
        opportunityElement.innerHTML = `
            <h3>${opportunity.title}</h3>
            <p><strong>Organization:</strong> ${opportunity.organization_name}</p>
            <p><strong>Description:</strong> ${opportunity.description}</p>
            <p><strong>Location:</strong> ${opportunity.city}, ${opportunity.state}</p>
            <button class="cta-button">Apply Now</button>
        `;
        container.appendChild(opportunityElement);
    });
}

// Function to show an error message if the data fetch fails
function showErrorMessage(message) {
    const container = document.getElementById('volunteer-list');
    container.innerHTML = `<p class="error">${message}</p>`;
}

// Call the fetch function when the page loads
fetchVolunteerData();

async function fetchVolunteerData() {
    try {
        // Make the API request
        const response = await fetch(`${apiUrl}?api_key=${apiKey}&city=Chicago&state=IL`);

        // If the response is not OK, throw an error
        if (!response.ok) {
            throw new Error('Data fetch failed');
        }

        // Parse the JSON response
        const data = await response.json();

        // Call the function to display the data
        displayVolunteerOpportunities(data);
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error fetching volunteer data:', error);

        // Call the function to display a user-friendly error message
        showErrorMessage('There was an issue fetching volunteer opportunities. Please try again later.');
    }
}
function displayVolunteerOpportunities(data) {
    const container = document.getElementById('volunteer-list');
    container.innerHTML = ''; // Clear previous content

    // Check if 'opportunities' exists and is an array
    if (!data.opportunities || data.opportunities.length === 0) {
        showErrorMessage('No volunteer opportunities found.');
        return;
    }

    data.opportunities.forEach(opportunity => {
        const opportunityElement = document.createElement('div');
        opportunityElement.classList.add('volunteer-opportunity');
        opportunityElement.innerHTML = `
            <h3>${opportunity.title}</h3>
            <p><strong>Organization:</strong> ${opportunity.organization_name}</p>
            <p><strong>Description:</strong> ${opportunity.description}</p>
            <p><strong>Location:</strong> ${opportunity.city}, ${opportunity.state}</p>
            <button class="cta-button">Apply Now</button>
        `;
        container.appendChild(opportunityElement);
    });
}
