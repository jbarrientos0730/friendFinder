var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("api/friends", function(req, res){
        
        friends.push(req.body);

        var minimumDifference = 40;

        for(i=0; i<req.body.scores.length; i++){
            req.body.scoreas[i] = parseInt(req.body.scores[i]);
        }

        for(i=0; i<friends.length; i++) {
            var totalDifference = 0;
            for(j=0; j<friends[i].scores.length; j++) {
              var difference = Math.abs(req.body.scores[j] - friends[i].scores[j]);
              totalDifference += difference;
            }
      
            if(totalDifference < minimumDifference) {
              bestFriend = i;
              minimumDifference = totalDifference;
            }
        }

        res.json(friends[bestFriend]);
    });
};