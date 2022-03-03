/* __tests__/artifact.js */

import express from "express"
import bodyParser from "body-parser"
require("dotenv").config()
import request from 'supertest'
import regeneratorRuntime from "regenerator-runtime"

import routes from '../src/routes/routes'
import db from '../src/models'

const app = express()

describe('Artifact api tests', () => {

    let artifactId = null
    let storyId = 1 //this story id must exist in story table

    beforeAll(() => {
        app.use(bodyParser.json())
        routes(app)
    })

    it('create artifact', (done) => {
        const currentDate = Date.now()
        request(app).post('/api/json/artifacts')
            .send({
                name: `Artifact-${currentDate}`,
                platform:`android${currentDate}`,
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrLAZZRhW85ny1UWBbuyo4_ATKJgx7dHK6Q&usqp=CAU',
                storyId: storyId
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    artifactId = res.body.data.id
                    expect(res.body).toMatchObject({
                        message: 'Item created successfully',
                        data: {
                            createdAt: expect.any(Number),
                            updatedAt: expect.any(Number),
                            isDeleted: false,
                            id: expect.any(Number),
                            name: `Artifact-${currentDate}`,
                            url: null,
                            storyId: 1
                        }
                    })
                    done()
                }
            })
    })

    it('fetch artifact', done => {
        request(app).get('/api/json/artifacts')
            .send()
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
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
                    done()
                }
            })
    })

    it('view artifact', done => {
        request(app).get(`/api/json/artifacts/${artifactId}`)
            .send()
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({
                        message: 'Item fetched successfully',
                        data: {
                            id: expect.any(Number),
                            name: expect.any(String),
                            url: null,
                            storyId: expect.any(Number),
                            createdAt: expect.any(Number),
                            updatedAt: expect.any(Number),
                            isDeleted: false
                        }
                    })
                    done()
                }
            })
    })

    it('update artifact', done => {
        const currentDate = Date.now()
        request(app).put(`/api/json/artifacts/${artifactId}`)
            .send({
                name: `Artifact-${currentDate}-Updated`,
                platform:`IOS${currentDate}`,
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({ message: 'Item updated successfully' })
                    done()
                }
            })
    })

    it('delete artifact', async (done) => {
        const deleted = await request(app).delete(`/api/json/artifacts/${artifactId}`)
            .send()
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)

        expect(deleted.body).toMatchObject({ message: 'Item deleted successfully' })

        request(app).get(`/api/json/artifacts/${artifactId}`)
            .send()
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body.data.isDeleted).toBe(true)
                    done()
                }
            })

    })

    afterAll(async () => {
        const Artifact = db.artifact
        await Artifact.destroy({ where: { id: artifactId } })
        db.sequelize.close()
    })
})
