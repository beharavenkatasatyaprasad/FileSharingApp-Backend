import {
    mongoClient
} from 'mongodb'
const url = 'mongodb+srv://satyaprasadbehara:RB9dY2QVDX8nDqHz@cluster0.mdyvh.mongodb.net/filesystem?retryWrites=true&w=majority';

const client =  mongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //connect to db

export default client;