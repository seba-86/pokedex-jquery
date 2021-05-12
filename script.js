// https://pokeapi.co/api/v2/pokemon/ url de primeros 20
// "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20" URL para los siguientes 20
// <img src=''id='current-${n}' class='card-img-top' alt='error' width='100' height='100'>

$(document).ready(function () {
    function requestApi(pokemon) {
        var respuesta
        $.ajax({
            url: pokemon,
            context: document.body,
            method: 'GET',
            success: function (response) {
                var n = 1
                respuesta = response
                response.results.forEach(function (info) {
                    let details = `<div class='container col-md-4'>
                    <div class="card mb-5 mt-5 pt-5 pb-5" style="width: 18rem;">
                
                    <div class="card-body">
                      <h1 class="card-title">${info.name}</h1>
                      <a id='enlace-${n}' href="#" url="${info.url}" class="btn btn-primary pokemodal">¡Quiero ver más de este pokémon!</a>
                    </div>
                  </div> 
                  </div>`
                    $('#info').append(details);
                    n += 1;
                })

                var next_url = response.next
                // let nextAdress = `<a id='pokep' href= "${response.next}"> Siguientes 20 Pokemones </a>`
                // $('#next-button').append(nextAdress)

                $('.pokemodal').click(function (e) {
                    e.preventDefault();
                    let new_url = ($(this).attr('url'));
                    $.ajax({
                        url: new_url,
                        context: document.body,
                        method: 'GET',
                        success: function (response) {
                            
                            $('#url-pokemon-modal').html((response.species.name.charAt(0).toUpperCase() + response.species.name.substr(1).toLowerCase()));
                            response.abilities.forEach(function (abi) {
                                $("#abilityPokemon").append("<p class='list-ability'>" + abi.ability.name.charAt(0).toUpperCase() + abi.ability.name.substr(1).toLowerCase() + "</p>")
                            });
                            response.types.forEach(function (tipo) {
                                $("#typePokemon").append("<p>" + tipo.type.name.charAt(0).toUpperCase() + tipo.type.name.substr(1).toLowerCase() + "</p>")
                            });
                            response.moves.forEach(function (move, index) {
                                if (index < 5) {
                                    $("#movePokemon").append("<p>" + move.move.name.charAt(0).toUpperCase() + move.move.name.substr(1).toLowerCase() + "</p>")
                                }
                            });
                            response.game_indices.forEach(function (index) {
                                $("#generationPokemon").append("<p>" + index.version.name.charAt(0).toUpperCase() + index.version.name.substr(1).toLowerCase() + "</p>")
                            });
                        }
                    });
                    $('#myModal').modal('show');
                });

                function activeButtom() {
                    $('#btn').click(function () {
                        $('#info').empty('.pokemon')
                        $('#pokep').remove()
                        requestApi(next_url);
                    })
                }
                activeButtom()



            },
            error: function (error) {
                if (error.status == 404) {
                    console.log('El recurso solicitado no existe');
                }
            }
        })
        // console.log(respuesta);
    }
    requestApi('https://pokeapi.co/api/v2/pokemon/');



});