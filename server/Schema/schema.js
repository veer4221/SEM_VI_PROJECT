 
const graphql = require('graphql');
const { buildResolveInfo } = require('graphql/execution/execute');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;
const _ = require('lodash')
const Expense = require('../models/expense.model');
const User = require('../models/user.model');

const ExpanseType = new GraphQLObjectType({
    name: 'Expense',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        category: { type: GraphQLString },
        date: { type: GraphQLString },
        amount :{ type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent, args) {
                console.log(parent)
                // return _.find(authore,{id:parent.authorId})
                return User.findById(parent.userId)
            }
        }
    })
})
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        createDate:{ type: GraphQLString },
        updatedDate:{ type: GraphQLString },
        expense: {
            type: new GraphQLList(ExpanseType),
            resolve(parent, args) {
                console.log(parent)
                // return _.filter(books,{authorId:parent.id})
                return Expense.find({userId:parent.id})
            }
        }

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        expense: {
            type: ExpanseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // args.id
                //    return _.find(books,{id:args.id})
                return Expense.findById(args.id)
            }

        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // args.id
                //    return _.find(authore,{id:args.id})
                return User.findById(args.id)

            }

        },
        expenses: {
            type: new GraphQLList(ExpanseType),
            resolve(parent, args) {
                // return books
                return Expense.find({})
            }
        },
        Users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                // return authore
                return User.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                createDate:{ type: GraphQLString },
                updatedDate:{ type: GraphQLString },
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                   
                });
                return user.save()
            }
        },
        addExpanse: {
            type: ExpanseType,
            args: {
                
                
                name: { type: GraphQLString },
                category: { type: GraphQLString },
                date: { type: GraphQLString },
                amount :{ type: GraphQLInt },
                userId: { type: GraphQLID }
                
            },
            resolve(parent, args) {
                let expanse = new Expense({
                    name: args.name,
                    category: args.category,
                    amount :args.amount,
                    userId: args.userId
                });
                return expanse.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})