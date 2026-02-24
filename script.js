//top counts

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');



//catch toggle btns

const allBtn = document.getElementById('all-toggle-btn');
const interviewBtn = document.getElementById('interview-toggle-btn');
const rejectedBtn = document.getElementById('rejected-toggle-btn');


// catch job coutns

const jobCounts = document.getElementById('job-count');


//added empty card

let filteredCard = document.getElementById('filtered-card');


//added card list

let list = document.querySelector('#interview-list');


//added empty status

const empty = document.getElementById('empty-status');

const interview = [];
const rejected = [];



// function for calculate counts

function calculator() {
    totalCount.innerText = list.children.length;
    interviewCount.innerText = interview.length;
    rejectedCount.innerText = rejected.length;
    
    if (allBtn.classList.contains('bg-primary')) {
        jobCounts.innerText = list.children.length;
    } else if (interviewBtn.classList.contains('bg-primary')) {
        jobCounts.innerText = interview.length;
    } else if (rejectedBtn.classList.contains('bg-primary')) {
        jobCounts.innerText = rejected.length;
    }
    
    updateEmptyState();
};



//added empty status in toggles

function updateEmptyState() {
    if (allBtn.classList.contains('bg-primary')) {
        if (list.children.length === 0) {
            empty.classList.remove('hidden');
            list.classList.add('hidden');
        } else {
            empty.classList.add('hidden');
            list.classList.remove('hidden');
        }
    } else if (interviewBtn.classList.contains('bg-primary')) {
        if (interview.length === 0) {
            empty.classList.remove('hidden');
            filteredCard.classList.add('hidden');
        } else {
            empty.classList.add('hidden');
            filteredCard.classList.remove('hidden');
        }
    } else if (rejectedBtn.classList.contains('bg-primary')) {
        if (rejected.length === 0) {
            empty.classList.remove('hidden');
            filteredCard.classList.add('hidden');
        } else {
            empty.classList.add('hidden');
            filteredCard.classList.remove('hidden');
        }
    }
};

calculator();





//toggling pong

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
        jobCounts.innerText = interview.length;
    } else if (id == 'all-toggle-btn') {
        list.classList.remove('hidden');
        filteredCard.classList.add('hidden');
        empty.classList.add('hidden');
        jobCounts.innerText = list.children.length;
    } else if (id == 'rejected-toggle-btn') {
        list.classList.add('hidden');
        filteredCard.classList.remove('hidden');
        renderRejected();
        jobCounts.innerText = rejected.length;
    }
    
    updateEmptyState();
};




// delete button

function handleDeleteClick(event) {
    const trashIcon = event.target.closest('.trash');
    if (!trashIcon) return;
    
    const parentNode = event.target.closest('.mb-6');
    if (!parentNode) return;
    
    const cardTitle = parentNode.querySelector('.card-title').innerText;
    
    const mainCards = Array.from(list.children);
    for (let card of mainCards) {
        if (card.querySelector('.card-title')?.innerText === cardTitle) {
            card.remove();
            break;
        }
    }
    
    const interviewIndex = interview.findIndex(item => item.cardTitle === cardTitle);
    if (interviewIndex !== -1) {
        interview.splice(interviewIndex, 1);
    }
    
    const rejectedIndex = rejected.findIndex(item => item.cardTitle === cardTitle);
    if (rejectedIndex !== -1) {
        rejected.splice(rejectedIndex, 1);
    }
    
    calculator();
    
    if (!filteredCard.classList.contains('hidden')) {
        if (interviewBtn.classList.contains('bg-primary')) {
            renderInterview();
            jobCounts.innerText = interview.length;
        } else if (rejectedBtn.classList.contains('bg-primary')) {
            renderRejected();
            jobCounts.innerText = rejected.length;
        }
    }
};



// button funct created

function handleButtonClick(event) {
    if (event.target.classList.contains('fa-trash-can') || event.target.closest('.fa-trash-can')) {
        handleDeleteClick(event);
        return;
    }
    
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
        
        calculator();
        
        if (!filteredCard.classList.contains('hidden')) {
            if (interviewBtn.classList.contains('bg-primary')) {
                renderInterview();
                jobCounts.innerText = interview.length;
            } else if (rejectedBtn.classList.contains('bg-primary')) {
                renderRejected();
                jobCounts.innerText = rejected.length;
            }
        }
        
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
        
        calculator();
        
        if (!filteredCard.classList.contains('hidden')) {
            if (interviewBtn.classList.contains('bg-primary')) {
                renderInterview();
                jobCounts.innerText = interview.length;
            } else if (rejectedBtn.classList.contains('bg-primary')) {
                renderRejected();
                jobCounts.innerText = rejected.length;
            }
        }
    }
};

//add function in eventlisteners 

list.addEventListener('click', handleButtonClick);
filteredCard.addEventListener('click', handleButtonClick);



//render for inter

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
                    <span class="trash p-1 border border-red-100 rounded-full items-center cursor-pointer">
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
    
    updateEmptyState();
};


// render for reject

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
                    <span class="trash p-1 border border-red-100 rounded-full items-center cursor-pointer">
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
    
    updateEmptyState();
};

calculator();