module.exports = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "author Service",
        "description": "KIDSTAR backend author service",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    'host': `${process.env.BASE_URL}:${process.env.PORT}`,
    "basePath": "/api/json/authors",
    "tags": [
        {
            "name": "author",
            "description": "API for author in the system"
        }
    ],
    "schemes": [
        "http"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/": {
            "get": {
                "tags": [
                    "author"
                ],
                "summary": "Get all authors in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "post": {
                "tags": [
                    "author"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "firstName",
                        "description": "Author first name",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/author/firstName"
                        }
                    },
                    {
                        "in": "body",
                        "name": "lastName",
                        "description": "Author last name",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/author/lastName"
                        }
                    },
                    {
                        "in": "body",
                        "name": "gender",
                        "description": "author's gender",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/author/gender"
                        }
                    },
                    {
                        "in": "body",
                        "name": "authorTypeId",
                        "description": "author type id",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/author/authorTypeId"
                        }
                    }
                ],
                "summary": "Create an author in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/{id}": {
            "get": {
                "tags": [
                    "author"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "author ID",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    }
                ],
                "summary": "Get single author in system by id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "put": {
                "tags": [
                    "author"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "author order ID",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "firstName",
                        "description": "author first name",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/author/firstName"
                        }
                    },
                    {
                        "in": "body",
                        "name": "lastName",
                        "description": "author last name",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/author/lastName"
                        }
                    },
                    {
                        "in": "body",
                        "name": "gender",
                        "description": "author's gender",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/author/gender"
                        }
                    },
                    {
                        "in": "body",
                        "name": "authorTypeId",
                        "description": "author type id",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/author/authorTypeId"
                        }
                    }
                ],
                "summary": "Update author in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "delete": {
                "tags": [
                    "author"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "author order ID",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    }
                ],
                "summary": "delete author in system by id by marking him deleted",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/{id}/activate": {
            "post": {
                "tags": [
                    "author"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "author order ID",
                        "required": true,
                        "schema": {
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    }
                ],
                "summary": "activating deleted author in system by id by unmarking him as deleted",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        }

    },
    "definitions": {
        "author": {
            "required": [
                "id",
                "firstName",
                "lastName",
                "gender",
                "authorTypeId"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "uniqueItems": true
                },
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "gender": {
                    "type": "string",
                    "enum": ["female", "male"]

                },
                "authorTypeId": {
                    "type": "integer"
                }
            }
        }
    }
}