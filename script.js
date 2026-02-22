// top counts 

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');


// catch toggle button 

const allBtn = document.getElementById('all-toggle-btn');
const interviewBtn = document.getElementById('interview-toggle-btn');
const rejectedBtn = document.getElementById('rejected-toggle-btn');


// total Count on top 

let list = document.querySelector('#interview-list');


// interview and rejected count 

const interview = [];
const rejected = [];

// counts done here 

function calculator(id) {
    totalCount.innerText = list.children.length;
    interviewCount.innerText = interview.length;
    rejectedCount.innerText = rejected.length;
}


// toggle style controls here 

function toggle(id){
    allBtn.classList.remove('bg-primary', 'text-white');
    interviewBtn.classList.remove('bg-primary', 'text-white');
    rejectedBtn.classList.remove('bg-primary', 'text-white');


    allBtn.classList.add('bg-gray-100', 'text-gray-600');
    interviewBtn.classList.add('bg-gray-100', 'text-gray-600');
    rejectedBtn.classList.add('bg-gray-100', 'text-gray-600');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-100', 'text-gray-600');
    selected.classList.add('bg-primary', 'text-white');
}