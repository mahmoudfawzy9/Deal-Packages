
import express from 'express'
import bodyParser from 'body-parser'
require('dotenv').config()
import request from 'supertest'
import regeneratorRuntime from 'regenerator-runtime'

import routes from '../src/routes/routes'
import db from '../src/models'

const app = express()

describe('article author API s', () => {

    const articleId = 1
    beforeAll(() => {
        app.use(bodyParser.json())
        routes(app)
    })

    it('add authors to article', done => {
        request(app).post(`/api/json/articles/${articleId}/authors`)
            .send([
                {
                    authorId: 1,
                    authorTypeId: 2
                },
                {
                    authorId: 2,
                    authorTypeId: 1
                }
            ])
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: "Authors added successfully"
                    })
                    done()
                }
            })
    })

    it('list article authors', (done) => {
        request(app).get(`/api/json/articles/${articleId}/authors`)
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: 'Item fetched successfully',
                        data: expect.any(Array)
                    })
                    done()
                }
            })
    })

    it('update article authors', (done) => {
        request(app).put(`/api/json/articles/${articleId}/authors`)
            .send([
                {
                    authorId: 1,
                    authorTypeId: 2
                },
                {
                    authorId: 2,
                    authorTypeId: 1
                }
            ])
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: "Authors updated successfully"
                    })
                    done()
                }
            })

    });

    afterAll(() => {
        db.sequelize.close()
    })


})