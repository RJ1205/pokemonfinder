document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("submitButton");
    button.addEventListener("click", getPokemon);
});

async function getPokemon() {
    try {
        const pokemonName = document.getElementById("textbox").value.trim().toLowerCase();
        const img = document.getElementById("sprite");
        const list = document.querySelector("ol");

        if (!pokemonName) {
            alert("Please enter a Pokémon name.");
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            list.innerHTML = "<li>ERROR: Pokémon not found</li>";
            img.src = "";
            img.alt = "No image available";
            return;
        }

        const data = await response.json();
        console.log(data);

        
        img.src = data.sprites.front_default || "placeholder.png";
        img.alt = data.name;
        img.style.display = "block";
        
        list.innerHTML = data.abilities
            .map(ability => `<li>${ability.ability.name}</li>`)
            .join("");

    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        document.querySelector("ul").innerHTML = "<li>ERROR: Network issue</li>";
        document.getElementById("sprite").src = "";
    }
}
