const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const height = parseFloat(req.body.height); // Height in centimeters
    const weight = parseFloat(req.body.weight); // Weight in kilograms

    if (isNaN(height) || isNaN(weight)) {
        return res.send('Please provide valid numeric values for height and weight.');
    }

    // Convert height from centimeters to meters
    const heightInMeters = height / 100;

    // Calculate BMI using the adjusted formula
    const bmi = weight / (heightInMeters * heightInMeters);

    const bmiFormatted = bmi.toFixed(2); // Format the BMI result with two decimal places

    res.send(`
        <html>
        <body>
            <h1>BMI Calculator</h1>
            <form action="/" method="POST">
                <input type="text" name="height" placeholder="Enter height in cm" /><br/>
                <input type="text" name="weight" placeholder="Enter weight in kg" /><br/>
                <button type="submit">Calculate BMI</button>
            </form>
            <p><h1>Your BMI is: ${bmiFormatted}</h1></p>
            <h1>BMI Ranges</h1>
            <ol>
                <li>Underweight: BMI less than 18.5</li>
                <li>Normal weight: BMI between 18.5 and 24.9</li>
                <li>Overweight: BMI between 25 and 29.9</li>
                <li>Obesity:
                    <ul>
                        <li>Class I: BMI between 30 and 34.9</li>
                        <li>Class II: BMI between 35 and 39.9</li>
                        <li>Class III: BMI 40 or greater</li>
                    </ul>
                </li>
            </ol>
        </body>
        </html>
    `);




})

app.listen(3000, () => {
    console.log("server is running at port 3000");
});
