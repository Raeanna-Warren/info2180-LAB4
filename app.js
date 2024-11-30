document.addEventListener('DOMContentLoaded', function () {
    const  searchButton = document.querySelector("button");
    const queryInput = document.querySelector("input");
    const resultDiv = document.getElementById("result");

    searchButton.addEventListener('click', function(event) {
        fetchSuperheroes();
    });


    function fetchSuperheroes() {
        const query = encodeURIComponent(queryInput.value.trim());
        const url = query ? `superheroes.php?query=${query}` : 'superheroes.php?';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                //alertSuperheroes(data);
                displaySuperheroes(data);
            })
            .catch(error => {
                console.error('Error fetching superheroes:', error);
                resultDiv.innerHTML = '<p>Superhero not found</p>';
            });
    }

    function displaySuperheroes(superheroes) {
        resultDiv.innerHTML = '';

        if (superheroes.length === 0){
            resultDiv.innerHTML = '<p>Superhero not found</p>';
            return;
        }

        superheroes.forEach(hero => {
            const heroDiv = document.createElement('div');
            heroDiv.innerHTML = `
                <h2>${hero.alias}</h2>
                <h3>${hero.name}</h3>
                <p>${hero.biography}</p>
                `;
            resultDiv.appendChild(heroDiv);
        });
    }


});

