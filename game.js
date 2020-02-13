var socket = io();

 socket.on('player choice', function (username, choice) {
        choices.push({'user': username, 'choice': choice});
        console.log('%s chose %s.', username, choice);
if(choices.length == 2) 
        {
            console.log('[socket.io] Both players have made choices.');

            switch (choices[0]['choice'])
            {
                case 'rock':
                    switch (choices[1]['choice'])
                    {
                        case 'rock': 
                            io.emit('tie', choices);
                            break;

                        case 'paper':
                            io.emit('player 2 win', choices);               
                            break;
        
                        case 'scissors':
                            io.emit('player 1 win', choices);
                            break;

                        default:
                            break;
                    }
                    break;

                case 'paper':
                    switch (choices[1]['choice'])
                    {
                        case 'rock':
                            io.emit('player 1 win', choices);     
                            break;

                        case 'paper':
                            io.emit('tie', choices);
                            break;
        
                        case 'scissors':
                            io.emit('player 2 win', choices);
                            break;

                        default:
                            break;
                    }
                break;

                case 'scissors':
                    switch (choices[1]['choice'])
                    {
                        case 'rock':
                            io.emit('player 2 win', choices);    
                            break;

                        case 'paper':
                            io.emit('player 1 win', choices); 
                            break;
        
                        case 'scissors':
                            io.emit('tie', choices);
                            break;

                        default:
                            break;
                    }
                    break;

                default:
                    break;
            }

            choices = [];
        }


socket.emit('new player');
setInterval(function() {
socket.emit('movement', movement);
}, 1000 / 60);


 });
