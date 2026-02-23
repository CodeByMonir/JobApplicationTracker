let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allBtn = document.getElementById('all-toggle-btn');
const interviewBtn = document.getElementById('interview-toggle-btn');
const rejectedBtn = document.getElementById('rejected-toggle-btn');

let filteredCard = document.getElementById('filtered-card');

let list = document.querySelector('#interview-list');

const interview = [];
const rejected = [];

function calculator() {
    totalCount.innerText = list.children.length;
    interviewCount.innerText = interview.length;
    rejectedCount.innerText = rejected.length;
}

calculator();

function toggle(id) {
    allBtn.classList.remove('bg-primary', 'text-white');
    interviewBtn.classList.remove('bg-primary', 'text-white');
    rejectedBtn.classList.remove('bg-primary', 'text-white');

    allBtn.classList.add('bg-gray-100', 'text-gray-600');
    interviewBtn.classList.add('bg-gray-100', 'text-gray-600');
    rejectedBtn.classList.add('bg-gray-100', 'text-gray-600');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-100', 'text-gray-600');
    selected.classList.add('bg-primary', 'text-white');

    if (id == 'interview-toggle-btn') {
        list.classList.add('hidden');
        filteredCard.classList.remove('hidden');
        renderInterview();
    } else if (id == 'all-toggle-btn') {
        list.classList.remove('hidden');
        filteredCard.classList.add('hidden');
    } else if (id == 'rejected-toggle-btn') {
        list.classList.add('hidden');
        filteredCard.classList.remove('hidden');
        renderRejected();
    }
}

function handleButtonClick(event) {
    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.closest('.mb-6');
        
        const actDisplay = parentNode.querySelector('.act-display');
        actDisplay.innerText = 'INTERVIEW';
        actDisplay.classList.remove('bg-gray-200', 'text-gray-800', 'bg-red-100', 'text-red-800');
        actDisplay.classList.add('bg-green-100', 'text-green-800');
        
        const cardTitle = parentNode.querySelector('.card-title').innerText;
        const cardCat = parentNode.querySelector('.card-cat').innerText;
        const cardAdd = parentNode.querySelector('.card-add').innerText;
        const cardDis = parentNode.querySelector('.card-dis').innerText;

        const cardInfo = {
            cardTitle,
            cardCat,
            cardAdd,
            cardDis,
            display: 'INTERVIEW'
        };

        const cardExist = interview.find(item => item.cardTitle === cardInfo.cardTitle);
        
        if (!cardExist) {
            interview.push(cardInfo);
        }
        
        const rejectedIndex = rejected.findIndex(item => item.cardTitle === cardInfo.cardTitle);
        if (rejectedIndex !== -1) {
            rejected.splice(rejectedIndex, 1);
        }
        
        if (!filteredCard.classList.contains('hidden')) {
            if (document.getElementById('interview-toggle-btn').classList.contains('bg-primary')) {
                renderInterview();
            } else if (document.getElementById('rejected-toggle-btn').classList.contains('bg-primary')) {
                renderRejected();
            }
        }
        
        calculator();
    } else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.closest('.mb-6');
        
        const actDisplay = parentNode.querySelector('.act-display');
        actDisplay.innerText = 'REJECTED';
        actDisplay.classList.remove('bg-gray-200', 'text-gray-800', 'bg-green-100', 'text-green-800');
        actDisplay.classList.add('bg-red-100', 'text-red-800');
        
        const cardTitle = parentNode.querySelector('.card-title').innerText;
        const cardCat = parentNode.querySelector('.card-cat').innerText;
        const cardAdd = parentNode.querySelector('.card-add').innerText;
        const cardDis = parentNode.querySelector('.card-dis').innerText;

        const cardInfo = {
            cardTitle,
            cardCat,
            cardAdd,
            cardDis,
            display: 'REJECTED'
        };

        const cardExist = rejected.find(item => item.cardTitle === cardInfo.cardTitle);
        
        if (!cardExist) {
            rejected.push(cardInfo);
        }
        
        const interviewIndex = interview.findIndex(item => item.cardTitle === cardInfo.cardTitle);
        if (interviewIndex !== -1) {
            interview.splice(interviewIndex, 1);
        }
        
        if (!filteredCard.classList.contains('hidden')) {
            if (document.getElementById('interview-toggle-btn').classList.contains('bg-primary')) {
                renderInterview();
            } else if (document.getElementById('rejected-toggle-btn').classList.contains('bg-primary')) {
                renderRejected();
            }
        }
        
        calculator();
    }
}

list.addEventListener('click', handleButtonClick);

filteredCard.addEventListener('click', handleButtonClick);

function renderInterview() {
    filteredCard.innerHTML = "";

    for (let inter of interview) {
        let div = document.createElement('div');
        div.className = 'mb-6 border border-gray-200 rounded-2xl p-5 bg-white shadow-sm max-w-3xl';

        div.innerHTML = `
            <div class="flex justify-between">
                <div class="mb-2">
                    <h3 class="card-title text-xl font-bold text-gray-800">${inter.cardTitle}</h3>
                    <p class="card-cat mb-2 text-base text-gray-700 font-medium">${inter.cardCat}</p>
                    <p class="card-add text-sm text-gray-500 mt-0.5">${inter.cardAdd}</p>
                </div>
                <div>
                    <span class="p-1 border border-red-100 rounded-full items-center">
                        <i class="fa-regular fa-trash-can"></i>
                    </span>
                </div>
            </div>
            <span class="act-display mb-2 bg-green-100 text-green-800 text-xs font-semibold px-4 py-1.5 rounded-full">${inter.display}</span>
            <p class="card-dis text-sm text-gray-600 leading-relaxed max-w-xl">${inter.cardDis}</p>
            <div class="flex flex-wrap items-center gap-3 mt-3 mb-3">
                <button class="interview-btn btn bg-gray-100 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full">INTERVIEW</button>
                <button class="rejected-btn btn bg-gray-100 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full">REJECTED</button>
            </div>
        `;

        filteredCard.appendChild(div);
    }
}

function renderRejected() {
    filteredCard.innerHTML = "";

    for (let rej of rejected) {
        let div = document.createElement('div');
        div.className = 'mb-6 border border-gray-200 rounded-2xl p-5 bg-white shadow-sm max-w-3xl';

        div.innerHTML = `
            <div class="flex justify-between">
                <div class="mb-2">
                    <h3 class="card-title text-xl font-bold text-gray-800">${rej.cardTitle}</h3>
                    <p class="card-cat mb-2 text-base text-gray-700 font-medium">${rej.cardCat}</p>
                    <p class="card-add text-sm text-gray-500 mt-0.5">${rej.cardAdd}</p>
                </div>
                <div>
                    <span class="p-1 border border-red-100 rounded-full items-center">
                        <i class="fa-regular fa-trash-can"></i>
                    </span>
                </div>
            </div>
            <span class="act-display mb-2 bg-red-100 text-red-800 text-xs font-semibold px-4 py-1.5 rounded-full">${rej.display}</span>
            <p class="card-dis text-sm text-gray-600 leading-relaxed max-w-xl">${rej.cardDis}</p>
            <div class="flex flex-wrap items-center gap-3 mt-3 mb-3">
                <button class="interview-btn btn bg-gray-100 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full">INTERVIEW</button>
                <button class="rejected-btn btn bg-gray-100 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full">REJECTED</button>
            </div>
        `;

        filteredCard.appendChild(div);
    }
}