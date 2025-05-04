const API_BASE = "https://restaurant-app-backend-s5yi.onrender.com";

document.addEventListener('DOMContentLoaded', () => {
  loadPopularItems();
  loadAddels();
});

function loadPopularItems() {
  fetch(`${API_BASE}/items/popular`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('popular-list');
      container.innerHTML = '';
      data.forEach(item => {
        container.innerHTML += `
          <div class="card">
            <h4>${item.name}</h4>
            <p>${item.description || ''}</p>
            <p><strong>${item.price || 0}€</strong></p>
          </div>
        `;
      });
    });
}

function loadAddels() {
  fetch(`${API_BASE}/addels`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('addel-list');
      container.innerHTML = '';
      data.forEach(addel => {
        container.innerHTML += `
          <div class="card" onclick="loadCategories('${addel._id}', '${addel.name}')">
            <h4>${addel.name}</h4>
            <p>${addel.description || ''}</p>
          </div>
        `;
      });
    });
}

function loadCategories(addelId, addelName) {
  document.getElementById('categories-section').style.display = 'block';
  document.getElementById('items-section').style.display = 'none';
  document.getElementById('categories-title').textContent = `الفئات - ${addelName}`;
  fetch(`${API_BASE}/categories/addel/${addelId}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('category-list');
      container.innerHTML = '';
      data.forEach(cat => {
        container.innerHTML += `
          <div class="card" onclick="loadItems('${cat._id}', '${cat.name}')">
            <img src="${cat.image}" alt="${cat.name}" style="width:100%; border-radius:8px">
            <h4>${cat.name}</h4>
          </div>
        `;
      });
    });
}

function loadItems(categoryId, categoryName) {
  document.getElementById('items-section').style.display = 'block';
  document.getElementById('items-title').textContent = `العناصر - ${categoryName}`;
  fetch(`${API_BASE}/items/category/${categoryId}`)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('item-list');
      container.innerHTML = '';
      data.forEach(item => {
        container.innerHTML += `
          <div class="card">
           <img src="${item.image}" alt="${item.name}" style="width:100%; border-radius:8px">
            <h4>${item.name}</h4>
            <p>${item.description || ''}</p>
            <p><strong>${item.price || 0}€</strong></p>
          </div>
        `;
      });
    });
}

