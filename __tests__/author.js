import express from 'express'

import request from 'supertest'
import regeneratorRuntime from "regenerator-runtime"
import db from '../src/models/index'
import routes from '../src/routes/routes'

const app = express()
require("dotenv").config()

describe('author api tests', () => {

    let authorId = 1
    beforeAll(() => {
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        routes(app)
    })


    it('create author', (done) => {
        const currentDate = Date.now()
        request(app).post('/api/json/authors')
            .send({
                firstName: `first${currentDate}`,
                lastName: `last${currentDate}`,
                gender: "male",
                authorTypeId: 1
            })
            .expect(200)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({ message: 'Item created successfully' })
                    done()
                }
            })

    })

    it('list Authors', (done) => {
        request(app).get('/api/json/authors')
            .send()
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: 'Data fetched successfully',
                        data: expect.any(Array),
                        meta: {
                            total_records: expect.any(Number),
                            fetched_records: expect.any(Number),
                            total_pages: expect.any(Number),
                            current_page: expect.any(Number),
                            next: null,
                            previous: null

                        }
                    })

                    if (res.body.data.length > 0) {
                        authorId = res.body.data[0].id
                    }
                    done()
                }
            })
    })

    it('get author by id', (done) => {
        request(app).get(`/api/json/authors/${authorId}`)
            .send()
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: 'Item fetched successfully',
                        data: {
                            id: expect.any(Number),
                            firstName: expect.any(String),
                            lastName: expect.any(String),
                            gender: expect.any(String),
                            authorTypeId: expect.any(Number),
                            createdAt: expect.any(Number),
                            updatedAt: expect.any(Number),
                        }
                    })
                    done()
                }
            })
    })

    it('update author', (done) => {
        const currentDate = Date.now()
        request(app).put(`/api/json/authors/${authorId}`)
            .send({
                firstName: `updateF${currentDate}`,
                lastName: `updateL${currentDate}`,
                gender: "female",
                authorTypeId: 2
            })
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: 'Item updated successfully'
                    })
                    done()
                }
            })
    })

    it('delete author', (done) => {

        request(app).delete(`/api/json/authors/${authorId}`)
            .send()
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: 'Item deleted successfully'
                    })
                    done()
                }
            })
    })

    it('activate author', (done) => {
        request(app).post(`/api/json/authors/${authorId}/activate`)
            .send()
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: 'Item activated successfully'
                    })
                    done()
                }
            })
    })

    afterAll(() => {
        db.sequelize.close()
    })
})