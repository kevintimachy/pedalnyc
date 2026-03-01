import PageHeader from "@/components/PageHeader";
import '../styles/Home.module.css';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Map from "@/components/Map";


export default function About() {
    const trip = {
        "start station location": {
            "coordinates":[-79.34943616, 43.79514851]
        },
        "end station location": {
            "coordinates":[-79.36750352, 43.85012304]
        },
        "start station name": "Seneca College Newnham Campus",
        "end station name": "Seneca College Markham Campus",
    };

    return (
        <>
            <PageHeader title="About" text="About me - Hello my name Kevin Timachy! I am a freelance web developer based in Toronto with a passion for creating efficient and innovative web solutions." showCustomer={false} showSubscriber={false} />

            <Card>
                <Container>
                    <Row>
                        <Col>
                            <Card.Body>
                                <Card.Title>Seneca Polytechnic College Newnham Campus</Card.Title>
                                <Card.Text>Seneca College of Applied Arts and Technology, operating as Seneca Polytechnic. is a multiple-campus public college in the Greater Toronto Area, and Peterborough, Ontario, Canada regions. It offers full-time and part-time programs at the baccalaureate, diploma, certificate, and graduate levels. Wikipedia
                                    <br />
                                    <br/>
                                    <b>Address:</b> 1750 Finch Ave E, North York, ON M2J 2X5
                                    <br />
                                    <br/>
                                    <b>Phone:</b> (416) 491-5050
                                    <br />
                                    <br/>
                                    <b>Undergraduate tution and fees:</b> 2,686 CAD, International tuition 11,970 CAD (2014 – 15)
                                    <br />
                                    <br />
                                    <b>Total enrollment:</b> 97,500 (2014)
                                    <br />
                                    <br/>
                                    <b>President:</b> David Agnew
                                    <br />
                                    <br/>
                                    <b>Mascot:</b> Sammy Sting
                                    <br />
                                    <br/>
                                    <b>Founded:</b>  1967
                                </Card.Text>
                            </Card.Body>
                        </Col>
                        <Col>
                            <Map trip={trip}></Map>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </>
    );
}