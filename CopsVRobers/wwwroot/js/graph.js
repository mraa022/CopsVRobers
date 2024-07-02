function validMove(sourceNode,targetNode){
            if(sourceNode == null){
                return true;
            }
            target_id = targetNode.id()
            var neighbors = sourceNode.neighborhood().nodes()
           
            for (var i=0; i<neighbors.length;i++){
                console.log(neighbors[i].id());
                if (neighbors[i].id()==target_id){
                    return true;
                }
            }
            return false;
}
function reset(cy){
    alert("game over. Cop won")
    cy.nodes().forEach(function (Node) {
                Node.style('background-image', 'none');
                
            });
    
}
function game_over(prev_cop, node, prev_robber){
    if (prev_cop == node || prev_robber ==node){
            return true;
        }
}
document.addEventListener('DOMContentLoaded', function () {
    var cy = cytoscape({
        container: document.getElementById('cy'),
        elements: [
            // nodes
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'c' } },
            { data: { id: 'd' } },
            { data: { id: 'e' } },
            // edges
            { data: { id: 'ab', source: 'a', target: 'b' }},
            { data: { id: 'ba', source: 'b', target: 'a' } , style:{'display': 'none'}},
            { data: { id: 'ac', source: 'a', target: 'c' } },
            { data: { id: 'ca', source: 'c', target: 'a' } , style:{'display': 'none'}},
            { data: { id: 'bd', source: 'b', target: 'd' } },
            { data: { id: 'db', source: 'd', target: 'b' } , style:{'display': 'none'}},
            { data: { id: 'ce', source: 'c', target: 'e' } },
            { data: { id: 'ec', source: 'e', target: 'c' } , style:{'display': 'none'}},
            { data: { id: 'de', source: 'd', target: 'e' }},
            { data: { id: 'ed', source: 'e', target: 'd' } , style:{'display': 'none'}}
        ],
        style: [
            {
                selector: 'node',
                style: {
                    'background-fit': 'cover',
                    'background-image': 'data(background_image)',
                    'background-color': '#666',
                    'label': 'data(id)',
                    'color': '#fff',
                    'text-valign': 'center',
                    'text-halign': 'center',
                     'text-opacity': 0 
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'curve-style': 'bezier'
                    
                }
            }
        ],
        layout: {
            name: 'grid',
            rows: 2
        }
    });
    var prev_cop = null;
    var prev_robber = null;
    var curr_player = "cop";
    
    cy.on('click', 'node', function(event) {
        

        var node = event.target;

        // cop's turn
        if (curr_player == "cop"){
            if (validMove(prev_cop,node)){
                if (!game_over(prev_cop,node,prev_robber)){
                    curr_player = "robber"
                    // clear prev node of cop img
                    if (prev_cop != null){
                        prev_cop.style({
                            'background-image': 'none'
                        });
                    }

                    cy.batch(function() {
                        var newBackgroundImage = 'url("data:image/jpeg;base64,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4HTfWDjnjwzKep7K2W961i6XdemuUnm/d9+E2FSUy20qfo/OyPKTCBAiFnZaxndttKl6yo22OBUTUa+7VAgDJkk5OOvzSecq63stu75K00yJbpnp5jcdxXC+5s9xQ2WyDz8s85KZ9ECH6rstc+/HcVb8kWIWLoO6FfydRtXNWfezkdfmg85c09n7RdXeF01fd92O4Qsajg2bj8we8N4ZTt5EY8cyTwIEb4nwK617mxQDfUF3ksz0sFYFE90bkYnmcqevXIxZnskzMWddOuVt21rlkqLvScIdo5EVPk4HN+kl5gQMXw7hASo1McKL7LUFbMgVTabETljkOQK9Oo6RxHSWvfQypSa03By1jKxDAqQFFZBABzzYdT06zKxAi44DfXUy0d2zWsFbvLrBsoQFUqrs7tiDjxI/rN6Ss/CdSbK3UaZO5RggBdx71YXumUqBtDDPeDmQANo5yQiB4wIt/o/ftGO5V2stfettudOHNZIQ7R32SmSG28z5DEqP2ZYWG6srursVqa2djWqZYupOCV3FieQOML1xJMIgRGjstaLFYvWdzb3YM42hrrLraUrxtdH7wrliMDng8sZngHCO4FhJLNYR1Zn2og211gtzIA/EmZWfFgeoiICIiAiIgf/Z")'; // Example new background image URL
                        
                        node.style({
                            'background-image': newBackgroundImage
                            });
                        });
                    prev_cop = node;
                }
                else{
                    reset(cy);
                    prev_cop=null;
                    prev_robber=null;
                    curr_player = "cop";
                }
                

            }
            else{
                alert("Cop invalid move")
            }
        }
        // robber's turn
        else{
            if (validMove(prev_robber,node)){
                if(!game_over(prev_cop,node,prev_robber)){
                    curr_player = "cop"
                    // clear prev node of cop img
                    if (prev_robber != null){
                        prev_robber.style({
                            'background-image': 'none'
                        });
                    }
                    cy.batch(function() {
                        var newBackgroundImage = 'url(https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L2pvYjk2OS0xMDEtcF8xLnBuZw.png)'
                        node.style({
                            'background-image': newBackgroundImage
                        });
                    });
                    prev_robber = node;

                }
                else{
                    reset(cy);
                    prev_cop=null;
                    prev_robber=null;
                    curr_player = "cop";
                }

            }
            else{
                alert("Robber invalid move")
            }
        }
        

    });
});
