import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

export default function PageHeader(props) {
    return (
        <>
        <Card className='bg-light'>
            <Card.Body>
                <h3>{props.title}</h3>
                <p>{props.text}</p>
                    <div className="float-end">
                        {props.showSubscriber && <button type="button" className="button Subscriber">Subscriber</button>}
                        {props.showCustomer && <button className="button Customer">Customer</button>}    
                </div>
            </Card.Body>
            </Card>
            <br />
            
            </>
        );
}