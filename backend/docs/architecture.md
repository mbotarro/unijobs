# Architecture

The backend code was divided in different packages to make it more modular and turn updates and maintenance task into less unpleasant processes. 

The overview architecture can be seen in the figure below:



All UniJobs functionalities are implemented in 3 packages: UseCases, DAL and Models. To interact with the platform, we use a HTTP Server which uses Handlers to call the wanted use cases.

# UniJobs Service

## Models

In this package, all the Unijobs entities are defined with their respective properties. For example, in the UserModel, we put all the information that a User might have in the system. 

This package also acts as an interface protocol, enabling data transfer between other packages. For example, when a UserController inserts or gets a User from the DAL, it doesn't have to know how it's represented in the Database. It sends and gets an UserModel from the DAL.

## Data Abstraction Layer (DAL)

To avoid dealing with particularities of a DBMS, this package offers all interactions that can be done to store and get informations related to the Unijobs entities (Users, Offer, Requests, Categories).

So, for example, when inserting a User, all we need to do is populate a UserModel object and send it to the UserDAL. The userDAL will map the entity properties to the respective DataBase table columns and store it.

## Use Cases

This package implements all the functionalities offered by the platform. Each functionality is represented by an specific use case. All use cases related to an entity is gathered in a entity specific controller. So, for, example, the UserController has the methods: authenticate user, get user info, insert user and so forth. 

Each controller can interact with the DB by using a DAL instance. So, for example, if a User use case needs to get User and Request information, it can do so by using the respective methods offered by the UserDAL and RequestDAL.

To wrap all the platform use cases, we use a Controller class. In that way, by instantiating the controller, we can initialize all entities' controller, the DALs instances and interact with the whole system by just using a instance of this class. This is the perfect scenario to use the Singleton Design Pattern. 

# HTTP Server

The HTTP server is the way the frontend can call the use cases implemented by the UniJobs service. 

## Handlers

Each handler receives a HTTP Request, unwraps its body, checks it and call the respective use case offered by a controller. The response is then written in a HTTP Response and sent to the frontend. 

The handler package is also divided by entity (UserHandler, RequestHandler, OfferHandler, CategoryHandler) to better organize the code. A handler has methods to deal with specific HTTP URLs and methods. So, for example, the UserHandler will deal with GET and POST methods sent to URLs like *users/*, *users/\<id\>* and so on.

## Router

The HTTP server receives a Request from the frontend. It needs to know which function to call to deal with the Request. These functions are the handlers methods. The router acts as a broker to map an HTTP (URL,method) to a handler method.

For example, if the server receives a (*/requests/, GET*) request, the router will call the *GetLastRequests* method from the RequestHandler.

# Other packages

## Tools Package

The tools package contains auxiliar functions that can be used by different classes and packages and it's not specific to a given Unijobs entity. For example, it has a function to write a go struct as a JSON in the HTTP Response and functions to create fake data in the DB for tests' sake. 

## Errors package

This package centralizes all error messages that can be sent to the frontend by the Unijobs Server. It's am easy way to search for errors definition and change it, if it's necessary.






















