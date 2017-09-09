const
      express = require('express'),
      Sequelize = require('sequelize'),
      db = new Sequelize('postgres://localhost:5432/testdb4'),
      bodyParser = require('body-parser'),
      app = express();


const Qian = db.define('qian', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

Qian.sync({ force: true })
    .then(() => {
          Qian.create({name: 'Qian'}),
          Qian.create({name: 'Jerry'}),
          Qian.create({name: 'Kaz'})
    })

app.use(require('morgan')('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/stuff', (req, res, next)=> {
  Qian.findAll()
  .then( stuff => {
    res.send(stuff);
  })
});

app.post('/', (req, res) => {
  Qian.create(req.body)
  .then( nameObj => {
    res.send(nameObj)
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));