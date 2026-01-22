import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";

const cityConfig = {
  Ahmedabad: { latitude: 23.0225, longitude: 72.5714 },
  Delhi: { latitude: 28.6139, longitude: 77.209 },
  Mumbai: { latitude: 19.076, longitude: 72.8777 },
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Surat: { latitude: 21.1702, longitude: 72.8311 },
};

const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Freezing drizzle",
  57: "Heavy freezing drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Heavy rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm with hail",
};

const formatClock = (iso) =>
  iso
    ? new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";

const relativeTime = (iso) => {
  if (!iso) return "Awaiting data";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

function Weather() {
  const [city, setCity] = useState("Ahmedabad");
  const [refreshId, setRefreshId] = useState(0);
  const [state, setState] = useState({
    loading: true,
    error: null,
    payload: null,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const { latitude, longitude } = cityConfig[city];
     const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,pressure_msl,visibility&daily=sunrise,sunset&timezone=auto`;


      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Unable to reach weather service");
        }
        const json = await res.json();
        if (!isMounted) return;

        const { current_weather, hourly, daily } = json;
        const matchIdx = hourly?.time?.indexOf(current_weather?.time) ?? -1;

        const payload = {
          temperature: current_weather?.temperature ?? "--",
          condition: weatherCodes[current_weather?.weathercode] ?? "Updating",
          feelsLike:
            matchIdx >= 0
              ? Math.round(hourly?.apparent_temperature?.[matchIdx] ?? 0)
              : "--",
          humidity:
            matchIdx >= 0
              ? Math.round(hourly?.relativehumidity_2m?.[matchIdx] ?? 0)
              : "--",
          wind: Math.round(current_weather?.windspeed ?? 0),
          pressure:
            matchIdx >= 0
              ? Math.round(hourly?.pressure_msl?.[matchIdx] ?? 0)
              : "--",
          visibility:
            matchIdx >= 0 && hourly?.visibility?.[matchIdx] != null
              ? Math.round(hourly.visibility[matchIdx] / 1000)
              : "--",
          sunrise: daily?.sunrise?.[0],
          sunset: daily?.sunset?.[0],
          updated: current_weather?.time,
        };

        setState({ loading: false, error: null, payload });
      } catch (err) {
        if (!isMounted) return;
        setState({
          loading: false,
          error: err?.message || "Something went wrong",
          payload: null,
        });
      }
    };

    fetchWeather();
    return () => {
      isMounted = false;
    };
  }, [city, refreshId]);

  const handleRefresh = () => setRefreshId((id) => id + 1);

  const cityOptions = useMemo(() => Object.keys(cityConfig), []);
  const data = state.payload;

  return (
    <>
    <Navbar />
      <div className="weather-page my-5">
        <div className="container py-5 text-white">

          {/* HEADER */}
          <div className="text-center mb-4 weather-header">
            <span className="badge-soft">Latest weather</span>
            <h1 className="fw-bold mb-1" style={{color:"#aca5a5"}}>🌦️ WeatherNow Live</h1>
            <p className="text-light">
              Fresh conditions from Open-Meteo for your favourite cities.
            </p>
          </div>

          {/* CITY SELECT & ACTIONS */}
          <div className="weather-toolbar d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <div className="d-flex gap-2 align-items-center">
              <select
                className="form-select weather-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {cityOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <button
                className="btn btn-light refresh-btn"
                onClick={handleRefresh}
                disabled={state.loading}
              >
                {state.loading ? "Updating…" : "Refresh"}
              </button>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <span className="pill pill-live">Live</span>
              <span className="pill pill-ghost">
                {relativeTime(data?.updated)}
              </span>
            </div>
          </div>

          {/* ERROR STATE */}
          {state.error && (
            <div className="weather-main-card p-4 mb-4 text-center bg-danger bg-opacity-25 border border-danger">
              <p className="mb-1 fw-bold">Unable to load latest weather</p>
              <p className="mb-3">{state.error}</p>
              <button className="btn btn-outline-light btn-sm" onClick={handleRefresh}>
                Try again
              </button>
            </div>
          )}

          {/* MAIN WEATHER CARD */}
          <div className="weather-main-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
              <div>
                <p className="text-uppercase text-light small mb-1">{city}</p>
                <h1 className="display-2 fw-bold mb-0" style={{color:"#aca5a5"}}>
                  {state.loading ? "…" : `${data?.temperature ?? "--"}°C`}
                </h1>
                <p className="lead mb-0 text-light">
                  {state.loading ? "Fetching live weather" : data?.condition}
                </p>
              </div>
              <div className="text-end text-light">
                <p className="mb-1">
                  Feels like:{" "}
                  <span className="fw-bold" style={{color:"#aca5a5"}}>{data?.feelsLike ?? "--"}°C</span>
                </p>
                <p className="mb-1">
                  Wind: <span className="fw-bold" style={{color:"#aca5a5"}}>{data?.wind ?? "--"} km/h</span>
                </p>
                <p className="mb-0">
                  Pressure:{" "}
                  <span className="fw-bold" style={{color:"#aca5a5"}}>{data?.pressure ?? "--"} hPa</span>
                </p>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="pill pill-ghost">
                Updated: {relativeTime(data?.updated)}
              </span>
              <span className="pill pill-ghost">
                Sunrise: {formatClock(data?.sunrise)}
              </span>
              <span className="pill pill-ghost">
                Sunset: {formatClock(data?.sunset)}
              </span>
            </div>
          </div>

          {/* WEATHER DETAILS GRID */}
          <div className="row g-4">
            <div className="col-md-4">
              <div className="weather-detail-card">
                🌡️ Feels Like
                <h4>{data?.feelsLike ?? "--"}°C</h4>
              </div>
            </div>

            <div className="col-md-4">
              <div className="weather-detail-card">
                💧 Humidity
                <h4>{data?.humidity ?? "--"}%</h4>
              </div>
            </div>

            <div className="col-md-4">
              <div className="weather-detail-card">
                🌬️ Wind Speed
                <h4>{data?.wind ?? "--"} km/h</h4>
              </div>
            </div>

            <div className="col-md-4">
              <div className="weather-detail-card">
                📊 Pressure
                <h4>{data?.pressure ?? "--"} hPa</h4>
              </div>
            </div>

            <div className="col-md-4">
              <div className="weather-detail-card">
                👁️ Visibility
                <h4>
                  {data?.visibility ?? "--"}
                  {data?.visibility && data.visibility !== "--" ? " km" : ""}
                </h4>
              </div>
            </div>

            <div className="col-md-4">
              <div className="weather-detail-card">
                🕒 Last Updated
                <h4>{relativeTime(data?.updated)}</h4>
              </div>
            </div>

            <div className="col-md-6">
              <div className="weather-detail-card">
                🌅 Sunrise
                <h4>{formatClock(data?.sunrise)}</h4>
              </div>
            </div>

            <div className="col-md-6">
              <div className="weather-detail-card">
                🌇 Sunset
                <h4>{formatClock(data?.sunset)}</h4>
              </div>
            </div>
          </div>

          {/* LOADER */}
          {state.loading && (
            <div className="text-center text-light mt-4 small opacity-75">
              Fetching the latest weather snapshot…
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Weather;