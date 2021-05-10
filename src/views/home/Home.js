import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Image } from 'react-bootstrap'
import Sunshine from '../../assets/sunshine.png'
function Home() {
    const [currentWeather, setCurrentWeather] = useState({})
    const [threeHour, setThreeHour] = useState({})
    const [location, setLocation] = useState({})
    const apiKey = "9daff99fb017dcc2d30ed2190b564f1b"

    const tempConvert = (kelvin) => {
        const celsius = kelvin - 273;
        let fahrenheit = Math.floor(celsius * (9 / 5) + 32)
        return fahrenheit
    }



    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setLocation({
                latitude: latitude,
                longitude: longitude
            })
            console.log("lattitude =" + location.latitude, "longitude =" + location.longitude)
        });

        async function fetchAPICurrent() {
            let currentData = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`)
            currentData = await currentData.json()
            setCurrentWeather(currentData)
        }
        async function fetchAPIForecast() {
            let fcData = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`)
            fcData = await fcData.json()
            setThreeHour(fcData)
        }
        fetchAPIForecast()
        fetchAPICurrent()

    }, []);
    console.log(currentWeather)
    console.log(threeHour)
    return (
        <div className="homePage">
            {currentWeather ? (<Card className="weatherCard">
                <Card.Body>
                    <Card.Title>{currentWeather.name}</Card.Title>
                    <div className="imageContainer">
                        <Image src={Sunshine} style={{ height: '100px', width: '100px', margin: 'auto' }} />
                        <div className="temperature">{tempConvert(currentWeather.main.temp)}{'\u00b0'}</div>
                    </div>
                    <Card.Subtitle className="mb-2 text-muted">{currentWeather.weather[0].description}</Card.Subtitle>
                    <div className="hourly">
                        <Card.Text>

                        </Card.Text>
                    </div>
                    {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>) : ''}
            {threeHour ? (<Card className="weatherCard">
                <div className="imageContainer">
                    <Image src={Sunshine} style={{ height: '100px', width: '100px', margin: 'auto' }} />
                    <div className="temperature">{'\u00b0'}</div>
                </div>
                <Card.Body>
                    <Card.Title>threeHour.location.name</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">threeHour.location.region</Card.Subtitle>
                    <div className="hourly">
                        <Card.Text>
                            1 PM 80{'\u00b0'}
                            <br />
                        2 PM 83{'\u00b0'}
                            <br />
                        3 PM 86{'\u00b0'}
                        </Card.Text>
                    </div>
                    {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>) : ''}
            <Card className="weatherCard">
                <div className="imageContainer">
                    <Image src={Sunshine} style={{ height: '100px', width: '100px', margin: 'auto' }} />
                    <div className="temperature">80{'\u00b0'}</div>
                </div>
                <Card.Body>
                    <Card.Title>City</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">State</Card.Subtitle>
                    <div className="hourly">
                        <Card.Text>
                            1 PM 80{'\u00b0'}
                            <br />
                            2 PM 83{'\u00b0'}
                            <br />
                            3 PM 86{'\u00b0'}
                        </Card.Text>
                    </div>
                    {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>
        </div>

    )
}

export default Home
