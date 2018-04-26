const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const should = chai.should();
const Card = require('../models/Card')
const server = require('../app')

describe('cards GET', function () {
  beforeEach(function (done) {
      const card = new Card({
        name: "Soujo",
        superskill: "unlimited blade works",
        type: "archer",
        role: "range",
      })
      card.save((err,res) => {
        done()
      })
  })

  afterEach(function (done) {
    Card.remove({}, function (err) {
      done()
    })
  })

  describe('get all cards', function () {
    it('it should get all cards data ', function (done) {
      chai.request(server)
      .get('/api/cards')
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('cards').with.lengthOf(1).should.be.an('object')
        res.body.cards[0].should.have.property('name')
        res.body.cards[0].should.have.property('superskill')
        res.body.cards[0].should.have.property('type')
        res.body.cards[0].should.have.property('role')
        res.body.cards[0].should.have.property('__v')
        res.should.have.status(200)
        done()
      })
    })
  })
})

describe('card POST', function () {

  afterEach(function (done) {
    Card.remove({}, function (err) {
      done()
    })
  })

  describe('post one cards', function () {
    it('it should post one card data ', function (done) {
      chai.request(server)
      .post('/api/cards')
      .send({
        name: "Soujo",
        superskill: "unlimited blade works",
        type: "archer",
        role: "range"
      })
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('card')
        res.body.card.should.have.property('name')
        res.body.card.should.have.property('superskill')
        res.body.card.should.have.property('type')
        res.body.card.should.have.property('role')
        res.should.have.status(201)
        done()
      })
    })
  })
})

describe('card UPDATE', function () {
  let id = 'Soujo'
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

  afterEach(function (done) {
    Card.remove({}, function (err) {
      done()
    })
  })

  describe('update one card', function () {
    it('it should update one card data ', function (done) {
      chai.request(server)
      .put('/api/cards/'+id)
      .send({
        name: "Erwar Kakkoi"
      })
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('card')
        res.body.card.should.have.property('name')
        res.body.card.should.have.property('superskill')
        res.body.card.should.have.property('type')
        res.body.card.should.have.property('role')
        res.body.card.name.should.equal('Erwar Kakkoi')
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
      done()
    })
  })

  afterEach(function (done) {
    Card.remove({}, function (err) {
      done()
    })
  })

  describe('delete one cards', function () {
    it('it should delete one card data ', function (done) {
      chai.request(server)
      .get('/api/cards')
      .end(function(err, res) {
        res.body.should.be.an('object').to.have.property('msg')
        res.body.should.be.an('object').to.have.property('cards').with.lengthOf(1).should.be.an('object')
        res.body.cards[0].should.have.property('name')
        res.body.cards[0].should.have.property('superskill')
        res.body.cards[0].should.have.property('type')
        res.body.cards[0].should.have.property('role')
        res.body.cards[0].should.have.property('__v')
        res.should.have.status(200)
        chai.request(server)
        .delete('/api/cards/'+res.body.cards[0]._id)
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
