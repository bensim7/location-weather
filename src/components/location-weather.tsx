import React, { useState } from "react";
import axios from "axios";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

type LocationType = {
  city: string;
  country_name: string;
};

type WeatherType = {
  temperature: number;
  description: string;
  sunrise: string;
  sunset: string;
};

function LocationAndWeather() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchLocationAndWeather = async () => {
    setError(null);
    setLoading(true);
    setLocation(null);
    setWeather(null);

    try {
      //   Get the IP
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const ip = ipResponse.data.ip;

      //   Get location from IP
      const ipstackKey = process.env.REACT_APP_IPSTACK_API_KEY;
      const locationRes = await axios.get(`http://api.ipstack.com/${ip}`, {
        params: { access_key: ipstackKey },
      });

      const locationData = locationRes.data;

      if (locationData.error) {
        throw new Error(
          locationData.error.info || "Error in getting location information"
        );
      }

      const locationInfo: LocationType = {
        city: locationData.city,
        country_name: locationData.country_name,
      };

      setLocation(locationInfo);
      // console.log("---- Location data ----", locationInfo);

      // Get Weather from location
      const weatherstackKey = process.env.REACT_APP_WEATHERSTACK_API_KEY;
      const query = `${locationInfo.city},${locationInfo.country_name}`;
      // test query input set to another country to see if alternative query outside of local location works
      // const query = `new york, USA`;

      const weatherRes = await axios.get(
        "http://api.weatherstack.com/current",
        {
          params: {
            access_key: weatherstackKey,
            query: query,
          },
        }
      );

      const weatherData = weatherRes.data;

      if (weatherData.error) {
        throw new Error(
          weatherData.error.info || "Failed to get weather information"
        );
      }

      const weatherInfo: WeatherType = {
        temperature: weatherData.current.temperature,
        description: weatherData.current.weather_descriptions[0],
        sunrise: weatherData.current.astro.sunrise,
        sunset: weatherData.current.astro.sunset,
      };

      setWeather(weatherInfo);
      console.log("---- Weather Data -----", weatherData);
    } catch (err: any) {
      setError(
        err.response?.data?.error?.info ||
          err.message ||
          "An error has occured, please check with Ben"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    // responsive web design style changes if screen is more or less than sm or width of 640
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${
        darkMode ? "bg-blue-900 text-slate-200" : "bg-yellow-300 text-slate-700"
      }`}
    >
      <div className="flex flex-col items-center w-full max-w-2xl px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Location and Weather - Ben
        </h2>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full justify-center">
          <button
            onClick={fetchLocationAndWeather}
            className={`w-full max-w-md sm:w-auto px-6 py-2 rounded-lg shadow transition duration-200 text-base sm:text-lg ${
              darkMode
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Get Location & Weather
          </button>

          {/* Light Mode and Dark Mode Toggle */}
          <div
            onClick={toggleDarkMode}
            className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              darkMode ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                darkMode ? "translate-x-8" : "translate-x-0"
              }`}
            >
              <div className="flex items-center justify-center h-full">
                {darkMode ? (
                  <DarkModeIcon
                    style={{ fontSize: "16px" }}
                    className="text-slate-800"
                  />
                ) : (
                  <LightModeIcon
                    style={{ fontSize: "16px" }}
                    className="text-yellow-400"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* error messages or loading */}
        <div className="h-6 mb-4 text-sm">
          {loading && (
            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Loading...
            </p>
          )}
          {error && <p className="text-red-400">{error}</p>}
        </div>

        {/* Location */}
        {location ? (
          <div
            className={`rounded-xl shadow p-4 sm:p-6 w-full max-w-md text-center mb-6 ${
              darkMode
                ? "bg-slate-700 text-white"
                : "bg-amber-500 text-slate-900"
            }`}
          >
            <p className="text-base sm:text-lg font-semibold">Location</p>
            <p className="text-base sm:text-lg">City: {location.city}</p>
            <p className="text-base sm:text-lg">
              Country: {location.country_name}
            </p>
          </div>
        ) : (
          <div
            className={`rounded-xl shadow p-4 sm:p-6 w-full max-w-md text-center mb-6 h-36 opacity-60 flex items-center justify-center ${
              darkMode ? "bg-slate-500" : "bg-amber-500"
            }`}
          >
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-700"
              } text-sm sm:text-lg`}
            >
              Location Information Box
            </p>
          </div>
        )}

        {/* Weather */}
        {weather ? (
          <div
            className={`rounded-xl shadow p-4 sm:p-6 w-full max-w-md text-center ${
              darkMode
                ? "bg-slate-700 text-white"
                : "bg-amber-500 text-slate-900"
            }`}
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Weather by location
            </h2>
            <p className="text-sm sm:text-lg">
              Weather description: {weather.description}
            </p>
            <p className="text-sm sm:text-lg">
              Temperature: {weather.temperature}°C
            </p>
            <p className="text-sm sm:text-lg">
              Sunrise time: {weather.sunrise}
            </p>
            <p className="text-sm sm:text-lg">Sunset time: {weather.sunset}</p>
          </div>
        ) : (
          <div
            className={`rounded-xl shadow p-4 sm:p-6 w-full max-w-md text-center h-64 opacity-60 flex items-center justify-center ${
              darkMode ? "bg-slate-500" : "bg-amber-500"
            }`}
          >
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-700"
              } text-sm sm:text-lg`}
            >
              Weather Information Box
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationAndWeather;
