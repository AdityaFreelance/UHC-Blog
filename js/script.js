
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.blog-tags-search input');
    const suggestionsContainer = document.querySelector('.suggestions-container');
    const tagsList = document.querySelectorAll('.blogs-tabs-list .tab-list-content');
    const clearButton = document.getElementById('clear-tags-btn');
    const blogPosts = document.querySelectorAll('.blog-post-col');

    let allTags = [];
    tagsList.forEach(tag => {
        allTags.push(tag.textContent.trim());
    });
    allTags = [...new Set(allTags)]; // Make unique

    let selectedTags = [];

    // Function to filter and show suggestions
    const showSuggestions = (input) => {
        suggestionsContainer.innerHTML = '';
        if (input.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        const filteredTags = allTags.filter(tag => tag.toLowerCase().startsWith(input.toLowerCase()));
        if (filteredTags.length > 0) {
            filteredTags.forEach(tag => {
                const suggestion = document.createElement('div');
                suggestion.classList.add('suggestion-item');
                suggestion.textContent = tag;
                suggestion.addEventListener('click', () => {
                    selectTag(tag);
                    searchInput.value = '';
                    showSuggestions('');
                });
                suggestionsContainer.appendChild(suggestion);
            });
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    };

    // Function to select a tag
    const selectTag = (tag) => {
        if (!selectedTags.includes(tag)) {
            selectedTags.push(tag);
            updateBlogPosts();
            highlightSelectedTags();
        }
    };

    // Function to deselect a tag
    const deselectTag = (tag) => {
        selectedTags = selectedTags.filter(t => t !== tag);
        updateBlogPosts();
        highlightSelectedTags();
    };

    // Function to update blog posts based on selected tags
    const updateBlogPosts = () => {
        blogPosts.forEach(post => {
            const postTags = Array.from(post.querySelectorAll('.blog-post-tag')).map(t => t.textContent.trim());
            const hasAllTags = selectedTags.every(tag => postTags.includes(tag));
            if (hasAllTags || selectedTags.length === 0) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    };

    // Function to highlight selected tags
    const highlightSelectedTags = () => {
        tagsList.forEach(tagElement => {
            const tag = tagElement.textContent.trim();
            if (selectedTags.includes(tag)) {
                tagElement.classList.add('selected');
            } else {
                tagElement.classList.remove('selected');
            }
        });
    };

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        showSuggestions(searchInput.value);
    });

    // Event listeners for tags
    tagsList.forEach(tagElement => {
        tagElement.addEventListener('click', () => {
            const tag = tagElement.textContent.trim();
            if (selectedTags.includes(tag)) {
                deselectTag(tag);
            } else {
                selectTag(tag);
            }
        });
    });

    // Event listener for clear button
    clearButton.addEventListener('click', () => {
        selectedTags = [];
        searchInput.value = '';
        updateBlogPosts();
        highlightSelectedTags();
    });
});

//add some style for the selected tag
const style = document.createElement('style');
style.innerHTML = `
.blogs-tabs-list .tab-list-content.selected {
    background-color: #0D5C91;
    color: white;
}
.suggestion-item {
    padding: 8px;
    cursor: pointer;
}
.suggestion-item:hover {
    background-color: #f0f0f0;
}
`;
document.head.appendChild(style);





// related blog slider

var swiper = new Swiper(".related-blog-slider", {
    // Distance between slides in px
    spaceBetween: 30,
    // Loop mode (so it restarts after the last slide)
    loop: true,

    // Autoplay configuration
    autoplay: {
        delay: 5000, // Time in ms before next slide (3 seconds)
        disableOnInteraction: false, // Autoplay will not stop after user interacts with slider
    },

    // Responsive breakpoints
    breakpoints: {
        // When window width is >= 320px (Mobile)
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // When window width is >= 768px (Tablet)
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // When window width is >= 1200px (Desktop)
        1200: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});
