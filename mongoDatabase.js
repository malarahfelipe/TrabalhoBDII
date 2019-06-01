const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://felipemm:HIY6A3lhufmkfiuZ@cluster0-bmbqw.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});

let produtos = require('./produtos.json');
let clientes = require('./clientes.json');
let vendas = require('./vendas.json');


let execute = () =>
 client.connect(async err => {
    await client.db('dbvendas').collection('produto').drop();
    await client.db('dbvendas').collection('cliente').drop();
    await client.db('dbvendas').collection('venda').drop();
    await client.db('dbvendas').createCollection('produto');
    await client.db('dbvendas').createCollection('cliente');
    await client.db('dbvendas').createCollection('venda');
    try {
        await Promise.all(produtos.map(produto => client.db('dbvendas').collection('produto').insertOne(produto)))
    } catch (err) {
        console.log(err)
    };
    try {
        await Promise.all(clientes.map(cliente => client.db('dbvendas').collection('cliente').insertOne(cliente)))
    } catch (err) {
        console.log(err)
    };
    try {
        await Promise.all(vendas.map(venda => client.db('dbvendas').collection('venda').insertOne(venda)))
    } catch (err) {
        console.log(err)
    };
    console.log('finished');
    return Promise.resolve();
});

execute();