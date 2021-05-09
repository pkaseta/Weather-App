import React from 'react'
import Card from 'react-bootstrap/Card'
import { Image } from 'react-bootstrap'
import Sunshine from '../../assets/sunshine.png'
function Home() {
    fetch("api.openweathermap.org / data / 2.5 / weather ? q = London, uk & callback=test & appid=9daff99fb017dcc2d30ed2190b564f1b")
        .then((res) => res.json())
        .then((data) => console.log(data))
    return (
        <div className="homePage">
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
