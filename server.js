const
      express = require('express'),
      Sequelize = require('sequelize'),
      db = new Sequelize('postgres://localhost:5432/testdb4'),
      bodyParser = require('body-parser'),
      app = express();


const List = db.define('qian', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

List.sync({ force: true })
    .then(() => {
          List.create({name: 'Qian'}),
          List.create({name: 'Jerry'}),
          List.create({name: 'Kaz'})
    })

app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/data', (req, res, next)=> {
  List.findAll()
  .then( data => {
    res.send(data);
  })
});

app.post('/', (req, res) => {
  List.create(req.body)
  .then( listObj => {
    res.send(listObj)
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));