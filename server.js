const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id : 1, name: 'course1'},
    {id : 2, name: 'course2'},
    {id : 3, name: 'course3'}
]

app.get('/', (req, res) => {
    res.send('Hello!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    if (!req.body.name || req.body.name.length <3 )
    {
        res.status(400).send("noname"), () => {
            return;
        };
    }

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`The coures with ID: ${req.params.id} was not found`);
    else res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));