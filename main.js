import './styles.css';
import axios from 'axios';

// VARIABLES
const petsContainer = document.getElementById('petsContainer');

const modal = document.getElementById('modal');
const okeyDelete = document.getElementById('okeyDelete');
const cancelDelete = document.getElementById('cancelDelete');
const closeModal = document.getElementById('closeModal');

let petsData = [];
let deleteIndex = null;

// LISTENERS
initApp(); 

function initApp() {

    document.addEventListener('DOMContentLoaded', readPets);
    closeModal.addEventListener('click', closeModalFunction);
    cancelDelete.addEventListener('click', closeModalFunction);
    okeyDelete.addEventListener('click', () => {
        if (deleteIndex !== null) {
            deletePet(deleteIndex);
            closeModalFunction();
        }
    });

}

// FUNCIONES
async function readPets() {
    const { data } = await axios.get('http://localhost:3000/cats');
    petsData = [...data]; 
    pintarPets(petsData); 
}

function pintarPets(pets) {
    petsContainer.innerHTML = '';

    pets.forEach((pet, index) => {
        const petDiv = createPetCard(pet, index);
        petsContainer.appendChild(petDiv); 
    });
}

function createPetCard(pet, index) {
    const petDiv = document.createElement('div');
    petDiv.className = 'petCard';

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const editIcon = document.createElement('button');
    editIcon.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
    editIcon.className = 'editButton';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', () => openModal(index)); 

    buttons.appendChild(editIcon);
    buttons.appendChild(deleteButton);
    petDiv.appendChild(buttons);

    const img = document.createElement('img');
    img.src = pet.img;

    const name = document.createElement('h2');
    name.textContent = pet.name;
    name.className = 'namePets';

    const telefono = document.createElement('p');
    telefono.textContent = `Teléfono | ${pet.telefono}`;

    const pais = document.createElement('p');
    pais.textContent = pet.pais;

    const descripcion = document.createElement('p');
    descripcion.textContent = pet.descripcion;

    petDiv.appendChild(img);
    petDiv.appendChild(name);
    petDiv.appendChild(telefono);
    petDiv.appendChild(pais);
    petDiv.appendChild(descripcion);

    return petDiv;
}

function openModal(index) {
    deleteIndex = index; 
    modal.style.display = 'flex';
}

function closeModalFunction() {
    modal.style.display = 'none';
    deleteIndex = null;
}

function deletePet(index) {
    petsData = petsData.filter((pet, petIndex) => petIndex !== index); 
    pintarPets(petsData); 
}
