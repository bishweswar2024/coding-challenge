import express from 'express';
const app = express();
const port = 3000;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/getGraphData', (req, res) => {
  res.json([{
    "key":"A",
    "description":"This is a description of A",
    "parent":""
  },
  {
    "key":"B",
    "description":"This is a description of B",
    "parent":"A"
  },
  {
    "key":"C",
    "description":"This is a description of C",
    "parent":"A"
  },
  {
    "key":"D",
    "description":"This is a description of D",
    "parent":"A"
  },
  {
    "key":"B-1",
    "description":"This is a description of B-1",
    "parent":"B"
  },
  {
    "key":"B-2",
    "description":"This is a description of B-2",
    "parent":"B"
  },
  {
    "key":"B-3",
    "description":"This is a description of B-3",
    "parent":"B"
  }]); 
});
app.listen(3000, function(req, res) { 
  console.log("Server is running at port 3000"); 
}); 