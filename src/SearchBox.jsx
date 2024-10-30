import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(""); // State for error message

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "15facc5417abbc64b19c008d9ef28163";

    const getWeatherInfo = async () => {
        try {
            const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            
            if (!response.ok) { // Check if the response is not OK (status code not in the range 200-299)
                throw new Error("City not found"); // Throw an error if the city is not found
            }
            
            const jsonResponse = await response.json();
            console.log("API response:", jsonResponse);

            const result = {
                city: jsonResponse.name, // Add city name here
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelslike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
            console.log("Processed result:", result);
            return result;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError(error.message); // Set the error message to display to the user
            return null;
        }
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
        setError(""); // Reset the error message when the user types a new city
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const info = await getWeatherInfo();
        if (info) {
            updateInfo(info);
        }
        setCity(""); // Reset input after submitting
    };

    return (
        <div className="SearchBox">
            <h3>Search For The Weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />
                <br />
                <br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if exists */}
        </div>
    );
}
