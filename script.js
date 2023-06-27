const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

let poke_array=[];
let poke_array1;
let poke_array2=[];
let data;

let x;


async function CreateArray(){

	for(let i=1; i<=pokemon_count; i++){
		try{
			/*---------------------------------------------
			//ASI FUNCIONA			

			let response = await fetch("https://pokeapi.co/api/v2/pokemon/"+i); 
			let data = await response.json();

			createCard(data);
			-----------------------------------------------*/

			/*------------------------------------------------
			//ASI lOS DIBUJA DESORDENADOS

			data=getPokemon(i);
			
			data.then(data=>{
				createCard(data)
			});
			//------------------------------------------------*/

			/*--------------------------------------------------
			//ASI FUNCIONA TB: Seguramente sea la mejor forma
			
			poke_array[i-1]= await getPokemon(i);

			await createCard(poke_array[i-1]);
			--------------------------------------------------------*/
			//------------------------------------------------------
			//ASI FUNCIONA TB: Lleno el array con lo que me da la gana a mi nada mas
			
			data = await getPokemon(i);
			await poke_array.push({id:(data.id), img:(data.sprites.other["official-artwork"]["front_default"]), type:(data.types[0].type.name), "name":(data.name)});
			
			//--------------------------------------------------------*/

			/*-------------------------------------------------------
			//Por aqui no soy capaz de hacer que funcione

			x = getPokemon(i);
			//console.log(x);

			x.then(data=>{
				//console.log(data);
				poke_array.push({id:(data.id), img:(data.sprites.other["official-artwork"]["front_default"]), type:(data.types[0].type.name), "name":(data.name)});				
			});
			----------------------------------------------------------*/

		}
		catch{
			console.log("error");
		}		
	}

	//console.log(poke_array.sort( (a,b) => a.id - b.id ));
	return poke_array.sort( (a,b) => a.id - b.id );
}


poke_array1 = CreateArray();

poke_array1.then(x=>{
	x.forEach(y=>{createCard(y)});
})	

function createCard(data){
	let each_pokemon=poke_container.appendChild(document.createElement("div"));
		each_pokemon.classList.add("pokemon");
		//let pok_type=data.types[0].type.name;
		let pok_type=data.type;

		each_pokemon.style.backgroundColor=colors[pok_type];

		let each_pokemon__div_img=each_pokemon.appendChild(document.createElement("div"));
			each_pokemon__div_img.classList.add("img-container");
		let each_pokemon__div_img_img = each_pokemon__div_img.appendChild(document.createElement("img"));
			//each_pokemon__div_img_img.src=data.sprites.other["official-artwork"]["front_default"];
			each_pokemon__div_img_img.src=data.img;

		let each_pokemon__div_info=each_pokemon.appendChild(document.createElement("div"));
			each_pokemon__div_info.classList.add("info");
		let each_pokemon__div_info_span=each_pokemon__div_info.appendChild(document.createElement("span"));
			each_pokemon__div_info_span.classList.add("number");
			each_pokemon__div_info_span.textContent=data.id;
		let each_pokemon__div_info_h3=each_pokemon__div_info.appendChild(document.createElement("h3"));
			each_pokemon__div_info_h3.classList.add("name");
			each_pokemon__div_info_h3.textContent=data.name;
		let each_pokemon__div_info_small=each_pokemon.appendChild(document.createElement("small"));
			each_pokemon__div_info_small.classList.add("type");
			each_pokemon__div_info_small.innerHTML=`Type: <span>${pok_type}</span>`;
}

async function getPokemon(number){
	//let response = (await fetch("https://pokeapi.co/api/v2/pokemon/"+number)); 
	//let data = await response.json();

	let data = (await fetch("https://pokeapi.co/api/v2/pokemon/"+number)).json();

	//console.log(data);
	return data
}