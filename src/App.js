import React, { useState } from "react";
import { Container } from "react-bootstrap";

import useFetchJobs from "./utils/useFetchJobs";
import Job from "./Components/Job/Job";
import JobPagination from "./Components/JobPagination/JobPagination";
import SearchForm from "./Components/SearchForm/SearchForm";
import "./App.css";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = (event) => {
    event.preventDefault();
    const param = event.target.name;
    const value = event.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };
  return (
    <Container className="my-4">
      <h1 className="mb-4 text-center">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <div className="loader">Loading...</div>}
      {error && <h1>Error. Try refreshing</h1>}
      {!(loading || error) && jobs.length === 0 ? (
        <h2>No results found</h2>
      ) : (
        jobs.map((job) => <Job key={job.id} job={job} />)
      )}
      <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
