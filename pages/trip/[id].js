import { useRouter } from 'next/router';
import PageHeader from '@/components/PageHeader';
import Map from "@/components/Map"; 


export async function getStaticPaths() {
    const res = await fetch(`https://burgundy-sheep-toga.cyclic.app/api/trips?page=1&perPage=10`);
    const data = await res.json();

    const ids = data.map((trip) => ({ params: { id: trip._id } }));

    return {
        fallback: 'blocking',
        paths: ids,
    };
}
export async function getStaticProps(context) {

    
    const res = await fetch(`https://burgundy-sheep-toga.cyclic.app/api/trips/${context.params.id}`);
    const trip = await res.json();

    return {
        props: {
            trip
        }
  };
}


export default function Trips(props) {
    const router = useRouter();
    const { id } = router.query;
    
    if (!props.trip) {
        return null
    }
    else {
        return ( <>
            <PageHeader
                title={`Bike: ${props.trip?.bikeid}`}
                text={`${props.trip["start station name"]} - ${props.trip["end station name"]}`}
                showSubscriber={props.trip?.usertype === "Subscriber" ? true : false}
                showCustomer={props.trip?.usertype === "Customer" ? true : false}
            />
           

            <Map trip={props.trip}></Map>
            <br />
            <ul>
                <li><b>Trip Duration:</b> {props.trip?.tripduration}</li>
                <li><b>Birth Year:</b> {props.trip["birth year"]}</li>
                <li><b>Start Time:</b> {props.trip["start time"]}</li>
                <li><b>Stop Time:</b> {props.trip["stop time"]}</li>

            </ul>

        </>
        );
    }
}