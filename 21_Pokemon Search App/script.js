const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const resultDiv = document.querySelector(".top");
const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const sprite = document.getElementById("sprites");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specaialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
let inputLowerValue = "";

const getData = async (someUrl) => {
  try {
    const fetchedData = await fetch(someUrl);
    const jsonData = await fetchedData.json();

    // Check if the fetched data contains an error property
    if (jsonData.error) {
      alert("Pokémon not found");
      return;
    }

    types.innerHTML = "";
    const idData = jsonData.id;
    const nameData = jsonData.name.toUpperCase();
    const heightData = jsonData.height;
    const weightData = jsonData.weight;
    const spriteData = jsonData.sprites.front_default;
    const typesData = jsonData.types;
    const props = {};
    const typesArr = [];
    for (let i = 0; i < 6; i++) {
      props[jsonData.stats[i].stat.name] = jsonData.stats[i].base_stat;
    }

    console.log(fetchedData);
    console.log(jsonData.sprites);

    for (const el of typesData) {
      typesArr.push(el.type.name);
    }
    console.log(typesArr);
    pokemonName.textContent = `${nameData}`;
    pokemonId.textContent = `#${idData}`;
    weight.textContent = `Weight: ${weightData}`;
    height.textContent = `Height: ${heightData}`;
    sprite.innerHTML = `<img id="sprite" src="${spriteData}" alt="${nameData} logo"/>`;
    for (let i = 0; i < typesArr.length; i++) {
      let spanEl = document.createElement("span");
      spanEl.textContent = `${typesArr[i].toUpperCase()}`;
      spanEl.classList = `type ${typesArr[i]}`;
      types.appendChild(spanEl);
    }
    hp.textContent = `${props.hp}`;
    attack.textContent = `${props.attack}`;
    defense.textContent = `${props.defense}`;
    specialAttack.textContent = `${props["special-attack"]}`;
    specaialDefense.textContent = `${props["special-defense"]}`;
    speed.textContent = `${props.speed}`;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    alert("Pokémon not found");
  }
};

const searchPokemon = () => {
  if (input.value.length <= 0) {
    return "NO NO NO";
  }
  inputLowerValue = input.value.toLowerCase();
  const pokemonUrl = url + inputLowerValue;
  getData(pokemonUrl);
  input.value = "";
};

searchBtn.addEventListener("click", searchPokemon);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchPokemon();
  }
});
