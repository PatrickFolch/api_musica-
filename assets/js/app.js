//conect<r a id
let pintarTask=(tracks, i)=>`
<div class='imagen_mini col-2'><img draggable='true' src=
            ${tracks[i].artwork_url} id=${tracks[i].id}
            'draggable='true' onDragStart='onDragStart(event)'></div>"
`


SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'

});

//SC.get('/tracks',{
//    q:'U2'
//
//}).then(function(traks){
//console.log('Listado de canciones->'+ JSON.stringify(traks, null, 2));
//})

SC.get('/tracks/39654171')
    .then(function (track) {
        console.log('Descripcion cancion->' + JSON.stringify(track, null, 2));
    })

/*SC.stream('/tracks/39654171').then(function(player){
    player.play();
}).catch(function(error){
alert('Error:->'+error);
});*/

//busqueda de id de las canciones
function busqueda() {
    var grupo = $('input').val();
    alert("Pulsado " + grupo);
    SC.get('/tracks', {
        q: grupo
    }).then(function (tracks) {
        console.log('Listado de canciones->' + JSON.stringify(tracks, null, 2));
        alert("Numero de canciones ->" + tracks.length);
        for (var i = 0; i < 10; i++) {
            $('.lista').append(pintarTask(tracks, i));
        }
    })

}

//dragable
function onDragEnd(event) {
    //console.log('Me has llamado');

}

function onDragStart(event) {
    //console.log(event);
    event.dataTransfer.setData('text', event.target.id)
    console.log('moviemdo =>' + event.target.id + '==' + event.dataTransfer.getData('text'));

}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    //alert('onDrop')
    var data = event.dataTransfer.getData('text')
    event.target.appendChild(document.getElementById(data));
    console.log(data);
    SC.stream('/tracks/'+data).then(function(player){
        player.play();
    }).catch(function(error){
    alert('Error:->'+error);
    });
}