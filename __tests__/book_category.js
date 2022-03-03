/* __tests__/book_category.js */

import express from "express"
require("dotenv").config()
import request from 'supertest'
import bodyParser from "body-parser"
import regeneratorRuntime from "regenerator-runtime"

import routes from '../src/routes/routes'
import db from '../src/models'
    ;
const app = express()
let id = 1
//these values must be a true reflection of the database values or the tests will fail
let insertedId = 1, firstTranslationId = 1, secondTranslationId = 2
//-------------------------------

describe('book category APIs', () => {

    beforeAll(() => {
        app.use(bodyParser.json())
        routes(app)

    })
    it('fetch book category', done => {
        request(app).get('/api/json/book-categories')
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
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

    it('create book category', done => {
        const currentDate = Date.now()
        request(app).post('/api/json/book-categories')
            .send({
                code: `code-${currentDate}`,
                imageUrl: `https://fakeimgurl${currentDate}`,
                bookCategoryTranslations: [
                    {
                        name: `اسم${currentDate}`,
                        languageId: 1
                    },
                    {
                        name: `name${currentDate}`,
                        languageId: 2
                    }
                ]
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                    done(err)
                } else {
                    insertedId = res.body.data.id
                    firstTranslationId = res.body.data.bookCategoryTranslations[0].id
                    secondTranslationId = res.body.data.bookCategoryTranslations[1].id
                    expect(res.body).toMatchObject({
                        message: 'Item created successfully',
                        data: {
                            id: expect.any(Number),
                            code: `code-${currentDate}`,
                            imageUrl: null,
                            createdAt: expect.any(Number),
                            updatedAt: expect.any(Number),
                            isDeleted: false,
                            bookCategoryTranslations: [
                                {
                                    id: expect.any(Number),
                                    name: `اسم${currentDate}`,
                                    languageId: 1,
                                    bookCategoryId: expect.any(Number),
                                    createdAt: expect.any(Number),
                                    updatedAt: expect.any(Number),
                                    isDeleted: false,

                                },
                                {
                                    id: expect.any(Number),
                                    name: `name${currentDate}`,
                                    languageId: 2,
                                    bookCategoryId: expect.any(Number),
                                    createdAt: expect.any(Number),
                                    updatedAt: expect.any(Number),
                                    isDeleted: false,
                                }
                            ]
                        }
                    })
                    done()
                }
            })
    })

    it('get book category by id', done => {
        request(app).get(`/api/json/book-categories/${insertedId}`)
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
                        data: {
                            id: insertedId,
                            code: expect.any(String),
                            imageUrl: null,
                            createdAt: expect.any(Number),
                            updatedAt: expect.any(Number),
                            isDeleted: false,
                            bookCategoryTranslations: expect.any(Array)
                        }
                    })
                    done()
                }
            })
    })

    it('update book category', (done) => {
        const currentDate = Date.now()
        request(app).put(`/api/json/book-categories/${insertedId}`)
            .send({

                code: `udpatedCode-${currentDate}`,
                imageUrl: `fakeimgurl${currentDate}`,
                bookCategoryTranslations: [
                    {
                        id: firstTranslationId,
                        name: `-مطوراسم${currentDate}`,
                        languageId: 1,
                        bookCategoryId: insertedId
                    },
                    {
                        id: secondTranslationId,
                        name: `updatedName${currentDate}`,
                        languageId: 2,
                        bookCategoryId: insertedId
                    }
                ]

            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
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

    it('detete book category', (done) => {

        request(app).delete(`/api/json/book-categories/${insertedId}`)
            .send()
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.body).toMatchObject({ message: 'Item deleted successfully' })
                    done()
                }
            })
    })
    afterAll(async () => {
        const bookCategory = db.book_category
        const BookCategoryTranslation = db.book_category_translation
        await BookCategoryTranslation.destroy({ where: { book_category_id: insertedId } })
        await bookCategory.destroy({ where: { id: insertedId } })
        db.sequelize.close()
    })
})
