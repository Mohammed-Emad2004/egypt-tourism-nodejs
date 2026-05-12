
let destinationsData = [];
let galleryData = [];

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            alert(result.message);
            contactForm.reset();
        }
    });
}

const destinationscontainer = document.getElementById('destinations-container');
const gallerycontainer = document.getElementById('gallery-container');
const searchInput = document.getElementById('search-input');
const cityFilter = document.getElementById('city-filter');
const categoryFilter = document.getElementById('category-filter');

function renderDestinations(data) {
    if (!destinationscontainer) return;
    destinationscontainer.innerHTML = '';

    if (data.length === 0) {
        destinationscontainer.innerHTML = '<div style="text-align:center; padding: 50px 0; grid-column: 1 / -1;"><h5 style="color:#6c757d;">لا توجد مزارات مطابقة لبحثك.</h5></div>';
        return;
    }

    data.forEach(place => {
        destinationscontainer.innerHTML += `
            <div class="custom-card">
                <img src="${place.image}" alt="${place.name}">
                    <div class="custom-card-body">
                        <h3 class="custom-card-title">${place.name}</h3>
                        <p class="custom-card-text">${place.description.substring(0, 80)}...</p>
                        <a href="destination-details.html?id=${place.id}" class="btn-custom">التفاصيل</a>
                    </div>
            </div>
            `;
    });
}

function filterData() {
    if (!destinationscontainer) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const cityValue = cityFilter ? cityFilter.value : 'all';
    const categoryValue = categoryFilter ? categoryFilter.value : 'all';

    const filtered = destinationsData.filter(place => {
        const matchSearch = place.name.toLowerCase().includes(searchTerm) || place.description.toLowerCase().includes(searchTerm);
        const matchCity = (cityValue === 'all') || (place.city === cityValue);
        const matchCategory = (categoryValue === 'all') || (place.category === categoryValue);

        return matchSearch && matchCity && matchCategory;
    });

    renderDestinations(filtered);
}

function renderGallery(data) {
    if (!gallerycontainer) return;
    gallerycontainer.innerHTML = '';

    if (data.length === 0) {
        gallerycontainer.innerHTML = '<div style="text-align:center; padding: 50px 0; grid-column: 1 / -1;"><h5 style="color:#6c757d;">لا توجد مزارات.</h5></div>';
        return;
    }

    data.forEach(place => {
        gallerycontainer.innerHTML += `
            <div class="gallery-item">
                <img src="${place.image}" alt="${place.name}">
            </div>
            `;
    });
}

async function fetchGallery() {
    try {
        const response = await fetch('http://localhost:3000/api/gallery');
        galleryData = await response.json();
        renderGallery(galleryData);
    } catch (error) {
        console.error(" خطأ في جلب البيانات:", error);
        gallerycontainer.innerHTML = '<div style="text-align:center; padding: 50px 0; grid-column: 1 / -1; color: red;"><h5>حدث خطأ في الاتصال بقاعدة البيانات.</h5></div>';
    }
}

async function fetchDestinations() {
    try {
        const response = await fetch('http://localhost:3000/api/destinations');
        destinationsData = await response.json();
        renderDestinations(destinationsData);
    } catch (error) {
        console.error(" خطأ في جلب البيانات:", error);
        destinationscontainer.innerHTML = '<div style="text-align:center; padding: 50px 0; grid-column: 1 / -1; color: red;"><h5>حدث خطأ في الاتصال بقاعدة البيانات.</h5></div>';
    }
}

if (destinationscontainer) {
    if (searchInput) searchInput.addEventListener('input', filterData);
    if (cityFilter) cityFilter.addEventListener('change', filterData);
    if (categoryFilter) categoryFilter.addEventListener('change', filterData);

    fetchDestinations();
}

if (gallerycontainer) {
    fetchGallery();
}

const placeTitle = document.getElementById('place-title');
if (placeTitle) {
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = parseInt(urlParams.get('id'));

    async function fetchSingleDestination() {
        try {
            const response = await fetch(`http://localhost:3000/api/destinations/${placeId}`); if (response.ok) {
                const selectedPlace = await response.json();

                document.getElementById('place-title').innerText = selectedPlace.name;
                document.getElementById('main-image').src = selectedPlace.image;
                document.getElementById('place-description').innerText = selectedPlace.description;

                const metaContainer = document.querySelector('.place-meta');
                if (metaContainer) {
                    metaContainer.innerHTML = `
                        <p><strong>المدينة:</strong> ${selectedPlace.city}</p>
                        <p><strong>التصنيف:</strong> ${selectedPlace.category}</p>
                        <p><strong>أفضل وقت للزيارة:</strong> ${selectedPlace.bestTime}</p>
                    `;
                }
            } else {
                document.querySelector('.place-details').innerHTML =
                    `<div style="text-align:center; padding: 50px 0;">
                        <h3>عذراً، المزار غير موجود!</h3>
                        <a href="destinations.html" class="btn-custom" style="margin-top: 20px;">العودة للمزارات</a>
                    </div>
                    `;
            }
        } catch (error) {
            console.error(" خطأ في جلب التفاصيل:", error);
        }
    }

    fetchSingleDestination();
}