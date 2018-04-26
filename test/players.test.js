const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const should = chai.should();
const Player = require('../models/Player')
const Card = require('../models/Card')
const server = require('../app')

describe('players GET', function () {
  let id = ''
  beforeEach(function (done) {
    const card = new Card({
      name: "Soujo",
      superskill: "unlimited blade works",
      type: "archer",
      role: "range",
    })
    card.save((err,res) => {
      id = res._id
      done()
    })
  })

  beforeEach(function (done) {
    const newPlayer = new Player({
      nickname: "Erwar",
      memberid: "m0001",
      role: "Carry",
      datejoin: Date.now(),
      mmr: 9999,
      cardlist: [id],
    })
    newPlayer.save((err,res) => {
      done()
    })
  })

  afterEach(function (done) {
    Player.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Card.remove({}, function (err) {
      done()
    })
  })

  describe('get all players', function () {
    it('it should get all players data ', function (done) {
      chai.request(server)
      .get('/api/players')
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('players').with.lengthOf(1).should.be.an('object')
        res.body.players[0].should.have.property('cardlist').with.lengthOf(1)
        res.body.players[0].should.have.property('datejoin')
        res.body.players[0].should.have.property('nickname')
        res.body.players[0].should.have.property('memberid')
        res.body.players[0].should.have.property('role')
        res.body.players[0].should.have.property('datejoin')
        res.body.players[0].should.have.property('mmr')
        res.body.players[0].should.have.property('__v')
        res.body.players[0].cardlist[0].should.have.property('_id')
        res.body.players[0].cardlist[0].should.have.property('_id')
        res.body.players[0].cardlist[0].should.have.property('name')
        res.body.players[0].cardlist[0].should.have.property('superskill')
        res.body.players[0].cardlist[0].should.have.property('type')
        res.body.players[0].cardlist[0].should.have.property('role')
        res.should.have.status(200)
        done()
      })
    })
  })
})

describe('player POST', function () {
  let id_card = ''
  beforeEach(function (done) {
    const card = new Card({
      name: "Soujo",
      superskill: "unlimited blade works",
      type: "archer",
      role: "range",
    })
    card.save((err,res) => {
      id_card = res._id
      done()
    })
  })
  afterEach(function (done) {
    Player.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Card.remove({}, function (err) {
      done()
    })
  })

  describe('post one players', function () {
    it('it should post one player data ', function (done) {
      chai.request(server)
      .post('/api/players')
      .send({
        nickname: "Erwar",
        memberid: "m0001",
        role: "Carry",
        datejoin: Date.now(),
        mmr: 9999,
        cardlist: [id_card]
      })
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('player')
        res.body.player.should.have.property('cardlist').with.lengthOf(1)
        res.body.player.should.have.property('datejoin')
        res.body.player.should.have.property('nickname')
        res.body.player.should.have.property('memberid')
        res.body.player.should.have.property('role')
        res.body.player.should.have.property('datejoin')
        res.body.player.should.have.property('mmr')
        res.body.player.should.have.property('__v')
        res.should.have.status(201)
        done()
      })
    })
  })
})

describe('player UPDATE', function () {
  let id = ''
  let id_card = ''
  beforeEach(function (done) {
    const card = new Card({
      name: "Soujo",
      superskill: "unlimited blade works",
      type: "archer",
      role: "range",
    })
    card.save((err,res) => {
      id_card = res._id
      done()
    })
  })
  beforeEach(function (done) {
    const newPlayer = new Player({
      nickname: "Erwar",
      memberid: "m0001",
      role: "Carry",
      datejoin: Date.now(),
      mmr: 9999,
      cardlist: [id_card],
    })
    newPlayer.save((err,res) => {
      id = res._id
      done()
    })
  })

  afterEach(function (done) {
    Player.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Card.remove({}, function (err) {
      done()
    })
  })

  describe('update one player', function () {
    it('it should update one player data ', function (done) {
      chai.request(server)
      .put('/api/players/'+id)
      .send({
        nickname: "Erwar Kakkoi"
      })
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('player')
        res.body.player.should.have.property('cardlist').with.lengthOf(1)
        res.body.player.should.have.property('datejoin')
        res.body.player.should.have.property('nickname')
        res.body.player.should.have.property('memberid')
        res.body.player.should.have.property('role')
        res.body.player.should.have.property('datejoin')
        res.body.player.should.have.property('mmr')
        res.body.player.should.have.property('__v')
        res.body.player.nickname.should.equal('Erwar Kakkoi')
        res.should.have.status(201)
        done()
      })
    })
  })
})

describe('player DELETE', function () {
  beforeEach(function (done) {
    const card = new Card({
      name: "Soujo",
      superskill: "unlimited blade works",
      type: "archer",
      role: "range",
    })
    card.save((err,res) => {
      id = res._id
      done()
    })
  })
  beforeEach(function (done) {
    const newPlayer = new Player({
      nickname: "Erwar",
      memberid: "m0001",
      role: "Carry",
      datejoin: Date.now(),
      mmr: 9999,
      cardlist: [id],
    })
    newPlayer.save((err,res) => {
      done()
    })
  })

  afterEach(function (done) {
    Player.remove({}, function (err) {
      done()
    })
  })

  afterEach(function (done) {
    Card.remove({}, function (err) {
      done()
    })
  })

  describe('delete one players', function () {
    it('it should delete one players data ', function (done) {
      chai.request(server)
      .get('/api/player')
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('players').with.lengthOf(1).should.be.an('object')
        res.body.players[0].should.have.property('cardlist').with.lengthOf(1)
        res.body.players[0].should.have.property('datejoin')
        res.body.players[0].should.have.property('nickname')
        res.body.players[0].should.have.property('memberid')
        res.body.players[0].should.have.property('role')
        res.body.players[0].should.have.property('datejoin')
        res.body.players[0].should.have.property('mmr')
        res.body.players[0].should.have.property('__v')
        res.body.players[0].cardlist[0].should.have.property('_id')
        res.body.players[0].cardlist[0].should.have.property('_id')
        res.body.players[0].cardlist[0].should.have.property('name')
        res.body.players[0].cardlist[0].should.have.property('superskill')
        res.body.players[0].cardlist[0].should.have.property('type')
        res.body.players[0].cardlist[0].should.have.property('role')
        res.should.have.status(200)
        chai.request(server)
        .delete('/api/players/'+res.body.players[0]._id)
        .end(function(err, response){
          response.should.have.status(201);
          response.should.not.have.status(404);
          response.body.should.be.a('object');
          done();
        })
      })
    })
  })
})
