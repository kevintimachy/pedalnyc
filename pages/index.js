import '../styles/Home.module.css';
import PageHeader from "@/components/PageHeader"
import { Table, Pagination } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const router = useRouter();
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(`https://burgundy-sheep-toga.cyclic.app/api/trips?page=${page}&perPage=10`);

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  function next() {
    setPage(page + 1);
  }

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <>
      <PageHeader title="Trips List" text="Full list of CitiBike Trips" showCustomer={true} showSubscriber={true} />
      <Table bordered hover className='table'>
        <thead>
          <tr>
            <th>Bike ID</th>
            <th>Start Station</th>
            <th>End Station</th>
            <th>Duration (Minutes)</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((trip) => (
            <tr
              key={trip._id}
              className={trip?.usertype === "Subscriber" ? "Subscriber" : "Customer"}
              onClick={() => { router.push(`/trip/${trip._id}`) }}
            >
              <td>{trip?.bikeid}</td>
              <td>{trip["start station name"]}</td>
              <td>{trip["end station name"]}</td>
              <td>{(trip?.tripduration / 60).toFixed(2)}</td>
            </tr>
          ))}

        </tbody>

      </Table>
      <Pagination>
        <Pagination.Prev onClick={previous} />

        <Pagination.Item active>{page}</Pagination.Item>

        <Pagination.Next onClick={next} />

      </Pagination>



    </>
  );
}
