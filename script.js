const input = document.querySelector('.input');
const autocomplit = document.querySelector('.autocomplit');
const listAcc = document.querySelector('.repositpries');
const wrap = document.getElementsByClassName('wrap');
const cross = document.getElementsByClassName('repositories-cross') 
let storageOfRep = []; 

input.addEventListener('input',debounce((event) =>{
    const query = event.target.value;

    if(input.value === '' || input.value.trim()){
        autocomplit.innerHTML = '';
    }
    console.log(event);
    if (query && input.value.trim()){
        getRepositories(`${query}`)
            .then(acc => showAutocomplete(...acc))
            .catch(error => error)
    }
}));

autocomplit.addEventListener('click', (elem)=> {
    addRepository(storageOfRep, elem);
    autocomplit.innerHTML = '';
    input.value = '';
});

async function getRepositories(query) {
    const controler = new AbortController();
    controler.abort();

    const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
    const data = await response.json();
    return data.items;
}

function debounce(func) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), 280);
    }
}

function showAutocomplete(...repositories) {
    const data = repositories.slice(0, 5);
    storageOfRep = data; 
    autocomplit.innerHTML = '';
    console.log(data);
    data.map((person)=>{
        const li = document.createElement('li');
        li.id = person.id;
        li.innerHTML = person.name;
        li.classList.add('autocomplit-item');
        autocomplit.prepend(li);
    });
}

function addRepository(arr, event){
    arr.forEach((rep)=>{
        if (rep.id == event.target.id){
            let wrapper = document.createElement('div');
            wrapper.classList.add('wrap');

            let ulInfoRep = document.createElement('ul');
            const cross = document.createElement('div');
            cross.classList.add('repositories-cross');

            let liIndoRepName = document.createElement('li');
            let liIndoRepOwner = document.createElement('li');
            let liIndoRepStars = document.createElement('li');
            
            liIndoRepName.innerHTML = `Name : ${rep.name}`;
            liIndoRepOwner.innerHTML = `Owner: ${rep.owner.login}`;
            liIndoRepStars.innerHTML = `Stars : ${rep.stargazers_count}`;

            ulInfoRep.append(liIndoRepName);
            ulInfoRep.append(liIndoRepOwner);
            ulInfoRep.append(liIndoRepStars);

            wrapper.append(ulInfoRep);
            wrapper.append(cross);
            listAcc.prepend(wrapper);
            removeRepositories(cross);
        }
    })}

function removeRepositories (cross){
    cross.addEventListener('click', (event)=>{
        event.target.parentElement.remove();
    })
}





  
