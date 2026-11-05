const mongoose = require('mongoose'); 
 
const MONGO_URI = 'mongodb://localhost:27017/Week8'; 
 
const PersonSchema = new mongoose.Schema({ 
    name: { 
        type: String, 
        required: true 
    }, 
    age: Number, 
    gender: String, 
    salary: Number,
    city: String
}); 
 
const Person = mongoose.model( 
    'modelname', 
    PersonSchema, 
    'personCollection' 
); 
 
// Function to insert one document 
async function insertOne() { 
 
    const doc1 = new Person({ 
        name: 'Rina', 
        age: 20, 
        gender: 'Female', 
        salary: 1227,
        city: 'London' 
    }); 
 
    const savedDoc = await doc1.save(); 
 
    console.log('One document inserted'); 
    console.log(savedDoc); 
}

async function insertMany() { 
 
    const manypersons = [  
        { name: 'SimonNHQ', age: 42, gender: 'Male', salary: 3456, city: 'New York'}, 
        { name: 'NeeshaNN', age: 53, gender: 'Female', salary: 1000, city: 'Los Angeles' }, 
        { name: 'MaryNHQ', age: 27, gender: 'Female', salary: 5402, city: 'Tokyo'}, 
        { name: 'MikeNJQ', age: 40, gender: 'Male', salary: 4519, city: 'Paris' } 
    ]; 
 
    const result = await Person.insertMany(manypersons); 
 
    console.log('Many documents inserted'); 
    console.log(result); 
} 

// Find people from a specific city 
async function findpeoplefromcity() { 
 
    const givenCity = 'New York'; 
 
    const docs = await Person.find({ 
        city: givenCity 
    }) 
    .sort({ salary: 1 }) 
    .select('name salary age city') 
    .limit(10); 
 
    console.log(`People from ${givenCity}:`); 
 
    docs.forEach(doc => { 
        console.log(doc.name + " from " + doc.city); 
    }); 
} 

async function main() { 
 
    try { 
 
        await mongoose.connect(MONGO_URI); 
        console.log(`Connected to ${MONGO_URI}`); 
 
        await insertOne();
        await insertMany();
        await findpeoplefromcity();
    
        } catch (err) { 
 
        console.error('Error:', err); 
 
    } finally { 
 
        await mongoose.connection.close(); 
        console.log('Connection closed'); 
 
    } 
} 
 
main();