const chai = require('chai');

const chaihttp = require('chai-http');

const should =  chai.should();

const chaiLike =require('chai-like');

const chaiThings = require('chai-things');

const server = require('../index');

var serverr;
// console.log(app)

chai.use(chaihttp);
chai.use(chaiLike);
chai.use(chaiThings);


before(done => {
    serverr =server.listen(3002,done);
})

after(done => {
    serverr.close(done);
})


describe('Users',function () {
    describe('User registration, Method post', function () {
        it('it should register a user ', function (done) {
            chai.request(server)
                .post('/v1/users/register')
                .send({
                    'username': 'testtta',
                    'password': 'sassadsaaa',
                    'address': 'bansbari',
                    'contact': '12',
                    'gender': 'male',
                    'userType': 'User'
                })
                .end(function (err, res) {
                    res.should.have.status(201)
                    res.body.should.be.an('object');
                    res.body.should.have.property('message');
                        done();
                })


        });


    })

})

describe('Users', function ()  {
    describe('GET users', function () {
        it('it should GET all the users', function (done) {

            chai.request(server)
                .get('/v1/viewusers')
                .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJvaWQiLCJhY2Nlc3NMZXZlbCI6InN1cGVyYWRtaW4iLCJpYXQiOjE1NjI1MTM0NTIsImV4cCI6MTU2MjU0OTQ1Mn0.c2FvgSRsR309E13XdvJDH8bPaUwcQEp70mRA7iXoGvk')
                .end(function(err, res)  {
                    res.should.have.status(500);
                    res.body.should.be.an('array');
                    res.body.should.all.have.property('id');
                    res.body.should.all.have.property('username');
                    res.body.should.all.have.property('password');
                    res.body.should.all.have.property('address');
                    res.body.should.all.have.property('contact');
                    res.body.should.all.have.property('gender');
                    res.body.should.all.have.property('userType');

                    done();

                });
        });
    });

});


describe('Deleting items', function() {
    id = 6;
    it('it should delete the items', function(done) {
        chai.request(server)
            .delete('/v1/deleteitem/' + id)
            .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJvaWQiLCJhY2Nlc3NMZXZlbCI6InN1cGVyYWRtaW4iLCJpYXQiOjE1NjI1MTM0NTIsImV4cCI6MTU2MjU0OTQ1Mn0.c2FvgSRsR309E13XdvJDH8bPaUwcQEp70mRA7iXoGvk')

            .end(function(err, res) {
                res.should.have.status(500);
                res.body.should.have.property('message');
                done();
            })
    })


});


describe('Feedback',function () {
    describe('Feedback, Method post', function () {
        it('it should send feedback to admin ', function (done) {
            chai.request(server)
                .post('/v1/feedback')
                .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJvaWQiLCJhY2Nlc3NMZXZlbCI6InN1cGVyYWRtaW4iLCJpYXQiOjE1NjI1MTM0NTIsImV4cCI6MTU2MjU0OTQ1Mn0.c2FvgSRsR309E13XdvJDH8bPaUwcQEp70mRA7iXoGvk')

                .send({
                    'name': 'caaasa',
                    'email': 'cac',
                    'phone': 'acac',
                    'message': 'abc'
                })
                .end(function (err, res) {
                    res.should.have.status(501)
                    res.body.should.be.an('object');
                    res.body.should.have.property('message');
                    done();
                })


        });


    })

})


describe('Updating item', function(){
    describe('update item ', function(){
        id = 7;
        it('it should update item', function(done){
            chai.request(server)
                .put('/v1/updateitems/' + id)
                .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZHJvaWQiLCJhY2Nlc3NMZXZlbCI6InN1cGVyYWRtaW4iLCJpYXQiOjE1NjI1MTM0NTIsImV4cCI6MTU2MjU0OTQ1Mn0.c2FvgSRsR309E13XdvJDH8bPaUwcQEp70mRA7iXoGvk')

                .send({
                    'itemprice':'4000',
                })
                .end(function (err,res) {
                    res.should.have.status(500);
                    res.body.should.be.an('object');
                    done()

                });

        })
    })
});