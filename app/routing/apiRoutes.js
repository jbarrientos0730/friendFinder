var friends = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        var newFriend = req.body
        friends.push(newFriend);

        var minimumDifference = 40;

        for(i=0; i<newFriend.scores.length; i++){
            newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }

        for(i=0; i<friends.length; i++) {
            var totalDifference = 0;
            for(j=0; j<friends[i].scores.length; j++) {
              var difference = Math.abs(newFriend.scores[j] - friends[i].scores[j]);
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