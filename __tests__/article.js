/* __tests__/article.js */

import express from "express"
import bodyParser from 'body-parser'
require("dotenv").config()
import request from 'supertest'
import regeneratorRuntime from "regenerator-runtime";

import routes from '../src/routes//routes'
import db from '../src/models'

const app = express()

let articleId = 1 //this id must exist in article table

describe('article API s', () => {

    beforeAll(() => {
        app.use(bodyParser.json())
        routes(app)
    })
    it('fetch article', done => {
        request(app).get('/api/json/articles')
            .send()
            .set('Accept', 'application/json')
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

    it('create article', done => {
        const currentDate = Date.now()
        request(app).post('/api/json/articles')
            .send({
                publisher_id: 6,
                title: `title-${currentDate}`,
                subtitle: 'Sub Title',
                body: 'article brief statement here',
                comment: 'article brief statement here',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrLAZZRhW85ny1UWBbuyo4_ATKJgx7dHK6Q&usqp=CAU',
                lang_id: 2,
            })
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    articleId = res.body.data.id
                    expect(res.body).toMatchObject({
                        message: 'Item created successfully',
                        data: {
                            id: expect.any(Number),
                            publisherId: 6,
                            title: `title-${currentDate}`,
                            subtitle: 'Sub Title',
                            brief: 'article brief statement here',
                            imageUrl: null,
                            langId: 2,
                            createdAt: expect.any(Number),
                            updatedAt: expect.any(Number),
                            isDeleted: false,
                        }
                    })
                    done()
                }
            })
    })

    it('find article by id', (done) => {
        request(app).get(`/api/json/articles/${articleId}`)
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
                            id: articleId,
                            authorId: expect.any(Number),
                            title: expect.any(String),
                            subtitle: expect.any(String),
                            body: expect.any(String),
                            comment: expect.any(String),
                            imageUrl: null,
                            langId: expect.any(Number),
                            createdAt: expect.any(Number),
                            updatedAt: expect.any(Number),
                            isDeleted: false,
                        }
                    })
                    done()
                }
            })
    })

    it('update article API', done => {
        const currentDate = Date.now()
        request(app).put(`/api/json/articles/${articleId}`)
            .send({
                author_id: 6,
                title: `updatedTitle-${currentDate}`,
                subtitle: 'up Sub Title',
                body: 'Article updated brief statement here',
                comment: 'Article updated brief statement here',
                imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfrLAZZRhW85ny1UWBbuyo4_ATKJgx7dHK6Q&usqp=CAU',
                lang_id: 2,
                bookCategories: [
                    { id: 1 }, { id: 2 }
                ],
                price: 200,
                typeId: 1,
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

    it('delete article', async (done) => {

        request(app).delete(`/api/json/articles/${articleId}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
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
        const Article = db.article;
        const ArticleCategory = db.article_category;
        const ArticleAuthor = db.article_author;

        await ArticleCategory.destroy({ where: { article_id: articleId } })
        await ArticleAuthor.destroy({ where: { article_id: articleId } })
        await Article.destroy({ where: { id: articleId } })

        db.sequelize.close()
    })
})