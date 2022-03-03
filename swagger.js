module.exports = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "article Service",
        "description": "KIDSTAR backend article service",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    'host': `${process.env.BASE_URL}:${process.env.PORT}`,
    "basePath": "/",
    "tags": [
        {
            "name": "articles",
            "description": "APIs for articles module in the system"
        },
        {
            "name": "Book Categories",
            "description": "APIs for book categories module in the system"
        },

        {
            "name": "Artifacts",
            "description": "APIs for artifacts module in the system"
        },

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
        "/api/json/articles": {
            "get": {
                "tags": [
                    "articles"
                ],
                "summary": "Get all articles in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "post": {
                "tags": [
                    "articles"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "authorId",
                        "description": "ID of author in author service",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "title",
                        "description": "article title",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "subtitle",
                        "description": "article sub-title",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "body",
                        "description": "article brief",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "comment",
                        "description": "article brief",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "imageUrl",
                        "description": "article image url",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "langId",
                        "description": "article language id",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
        
                    {
                        "in": "body",
                        "name": "typeId",
                        "description": "article type id",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "article_category",
                        "description": "Array of article categories",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    }
                ],
                "summary": "Create article in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/json/articles/{id}": {
            "get": {
                "tags": [
                    "articles"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "article ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Get single article in system by id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "put": {
                "tags": [
                    "articles"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "article ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "authorId",
                        "description": "ID of author in author service",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "title",
                        "description": "article title",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "subtitle",
                        "description": "article sub-title",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "brief",
                        "description": "article brief",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "imageUrl",
                        "description": "article image url",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "langId",
                        "description": "article language id",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "typeId",
                        "description": "article type id",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "price",
                        "description": "article price",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    },
                    {
                        "in": "body",
                        "name": "article_category",
                        "description": "Array of article categories",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/article"
                        }
                    }
                ],
                "summary": "Update article in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "delete": {
                "tags": [
                    "articles"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "article ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Delete article in system by id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/json/articles/assign-category": {
            "post": {
                "tags": [
                    "articles"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "articleId",
                        "description": "ID of author in author service",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/articleCategory"
                        }
                    },
                    {
                        "in": "body",
                        "name": "categoryId",
                        "description": "ID of author in author service",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/articleCategory"
                        }
                    },
                ],
                "summary": "Assign book category to article",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
        },
        "/api/json/articles/un-assign-category/{id}": {
            "delete": {
                "tags": [
                    "articles"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "article Category ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Un-assign book category to article",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
        },
        "/api/json/book-categories": {
            "get": {
                "tags": [
                    "Book Categories"
                ],
                "summary": "Get all book categories in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "post": {
                "tags": [
                    "Book Categories"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "name",
                        "description": "Book category name",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/BookCategory"
                        }
                    }
                ],
                "summary": "Create book category in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/json/book-categories/{id}": {
            "get": {
                "tags": [
                    "Book Categories"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Book Category ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Get a specific book category in system with id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "put": {
                "tags": [
                    "Book Categories"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Book Category ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "name",
                        "description": "Book category name",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/BookCategory"
                        }
                    }
                ],
                "summary": "Update book category in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Book Categories"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Book Category ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Delete book category in system by id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },

        "/api/json/scenes": {
            "get": {
                "tags": [
                    "Scenes"
                ],
                "summary": "Get all scenes in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "post": {
                "tags": [
                    "Scenes"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "title",
                        "description": "Scene title",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    },
                    {
                        "in": "body",
                        "name": "imageUrl",
                        "description": "Scene image",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    },
                    {
                        "in": "body",
                        "name": "order",
                        "description": "Scene order",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    },
                    {
                        "in": "body",
                        "name": "script",
                        "description": "Scene script",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    },
                    {
                        "in": "body",
                        "name": "articleId",
                        "description": "article id of the scene",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    }
                ],
                "summary": "Create scene in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/json/scenes/{id}": {
            "get": {
                "tags": [
                    "Scenes"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Scene ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Get a specific scene in system with id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "put": {
                "tags": [
                    "Scenes"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Scene ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "title",
                        "description": "Scene title",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    },
                    {
                        "in": "body",
                        "name": "imageUrl",
                        "description": "Scene image",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    },
                    {
                        "in": "body",
                        "name": "order",
                        "description": "Scene order",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    },
                    {
                        "in": "body",
                        "name": "script",
                        "description": "Scene script",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    },
                    {
                        "in": "body",
                        "name": "articleId",
                        "description": "article id of the scene",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/Scene"
                        }
                    }
                ],
                "summary": "Update scene in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Scenes"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Scene ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Delete scene in system by id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },

        "/api/json/artifacts": {
            "get": {
                "tags": [
                    "Artifacts"
                ],
                "summary": "Get all artifacts in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "post": {
                "tags": [
                    "Artifacts"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "name",
                        "description": "Artifact name",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/Artifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "url",
                        "description": "Artifact image URL",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/Artifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "articleId",
                        "description": "article id of the scene",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/Artifact"
                        }
                    }
                ],
                "summary": "Create artifact in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/json/artifacts/{id}": {
            "get": {
                "tags": [
                    "Artifacts"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Artifact ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Get a specific artifact in system with id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "put": {
                "tags": [
                    "Artifacts"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Artifact ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "name",
                        "description": "Artifact name",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/Artifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "url",
                        "description": "Artifact image URL",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/Artifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "articleId",
                        "description": "article id of the scene",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/Artifact"
                        }
                    }
                ],
                "summary": "Update artifact in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Artifacts"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Artifact ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Delete artifact in system by id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },

        "/api/json/scene-artifacts": {
            "get": {
                "tags": [
                    "Scene Artifacts"
                ],
                "summary": "Get all scene artifacts in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "post": {
                "tags": [
                    "Scene Artifacts"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "scene_id",
                        "description": "ID of the scene",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "artifact_id",
                        "description": "ID of the artifact",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_position_x",
                        "description": "Default position of artifact in x-axis",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_position_y",
                        "description": "Default position of artifact in y-axis",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_position_z",
                        "description": "Default position of artifact in z-axis",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_color_r",
                        "description": "Default red (r)gba color of artifact",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_color_g",
                        "description": "Default green r(g)ba color of artifact",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_color_b",
                        "description": "Default blue rg(b)a color of artifact",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_color_a",
                        "description": "Default alpha rgb(a) color of artifact",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_scale_x",
                        "description": "Default scale in x-axis of artifact",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_scale_y",
                        "description": "Default scale in y-axis of artifact",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_scale_z",
                        "description": "Default scale in z-axis of artifact",
                        "required": true,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                ],
                "summary": "Create scene artifact in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
        "/api/json/scene-artifacts/{id}": {
            "get": {
                "tags": [
                    "Scene Artifacts"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Scene Artifact ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Get a specific scene artifact in system with id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "put": {
                "tags": [
                    "Scene Artifacts"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Scene Artifact ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                    {
                        "in": "body",
                        "name": "scene_id",
                        "description": "ID of the scene",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "artifact_id",
                        "description": "ID of the artifact",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_position_x",
                        "description": "Default position of artifact in x-axis",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_position_y",
                        "description": "Default position of artifact in y-axis",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_position_z",
                        "description": "Default position of artifact in z-axis",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_color_r",
                        "description": "Default red (r)gba color of artifact",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_color_g",
                        "description": "Default green r(g)ba color of artifact",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_color_b",
                        "description": "Default blue rg(b)a color of artifact",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_color_a",
                        "description": "Default alpha rgb(a) color of artifact",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_scale_x",
                        "description": "Default scale in x-axis of artifact",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_scale_y",
                        "description": "Default scale in y-axis of artifact",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                    {
                        "in": "body",
                        "name": "default_scale_z",
                        "description": "Default scale in z-axis of artifact",
                        "required": false,
                        "schema":{
                            "$ref":"#/definitions/SceneArtifact"
                        }
                    },
                ],
                "summary": "Update scene artifact in system",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            },
            "delete": {
                "tags": [
                    "Scene Artifacts"
                ],
                "parameters": [
                    {
                        "in": "path",
                        "name": "id",
                        "description": "Scene Artifact ID",
                        "required": true,
                        "schema":{
                            "type": "integer",
                            "format": "int32",
                            "minimum": 1
                        }
                    },
                ],
                "summary": "Delete scene artifact in system by id",
                "responses": {
                    "200": {
                        "description": "OK"
                    }
                }
            }
        },
    },
    "definitions": {
        "article": {
            "required": [
                "id",
                "authorId",
                "title",
                "subtitle",
                "brief",
                "imageUrl",
                "langId",
                "price",
                "typeId",
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "uniqueItems": true
                },
                "authorId": {
                    "type": "integer"
                },
                "title": {
                    "type": "string"
                },
                "subtitle": {
                    "type": "string"
                },
                "brief": {
                    "type": "string"
                },
                "imageUrl": {
                    "type": "string"
                },
                "langId": {
                    "type": "integer"
                },
                "price": {
                    "type": "float"
                },
                "typeId": {
                    "type": "integer"
                }
            }
        },

        "articleCategory": {
            "required": [
                "id",
                "articleId",
                "categoryId"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "uniqueItems": true
                },
                "articleId": {
                    "type": "integer"
                },
                "categoryId": {
                    "type": "integer"
                }
            }
        },

        "BookCategory": {
            "required": [
                "id",
                "name"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "uniqueItems": true
                },
                "name": {
                    "type": "string"
                }
            }
        },

        "Scene": {
            "required": [
                "id",
                "title",
                "imageUrl",
                "order",
                "script",
                "articleId"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "uniqueItems": true
                },
                "title": {
                    "type": "string"
                },
                "imageUrl": {
                    "type": "string"
                },
                "order": {
                    "type": "integer"
                },
                "script": {
                    "type": "string"
                },
                "articleId": {
                    "type": "integer"
                }
            }
        },

        "Artifact": {
            "required": [
                "id",
                "name",
                "url",
                "articleId"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "uniqueItems": true
                },
                "name": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                },
                "articleId": {
                    "type": "integer"
                }
            }
        },

        "SceneArtifact": {
            "required": [
                "id",
                "scene_id",
                "artifact_id",
                "default_position_x",
                "default_position_y",
                "default_position_z",
                "default_color_r",
                "default_color_g",
                "default_color_b",
                "default_color_a",
                "default_scale_x",
                "default_scale_y",
                "default_scale_z"
            ],
            "properties": {
                "id": {
                    "type": "integer",
                    "uniqueItems": true
                },
                "scene_id": {
                    "type": "integer"
                },
                "artifact_id": {
                    "type": "integer"
                },
                "default_position_x": {
                    "type": "float"
                },
                "default_position_y": {
                    "type": "float"
                },
                "default_position_z": {
                    "type": "float"
                },
                "default_color_r": {
                    "type": "float"
                },
                "default_color_g": {
                    "type": "float"
                },
                "default_color_b": {
                    "type": "float"
                },
                "default_color_a": {
                    "type": "float"
                },
                "default_scale_x": {
                    "type": "float"
                },
                "default_scale_y": {
                    "type": "float"
                },
                "default_scale_z": {
                    "type": "float"
                }
            }
        }
    }
}