import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const CompanyDetails = ({ symbol }) => {
  const [company, setCompany] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/stocks/company/${symbol}`);
        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, [symbol]);

  const handleViewMore = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card p-3 shadow-sm border mt-4">
      <div className="row align-items-center">
        <div className="col-md-3 text-center">
          <img src={company.image} alt={`${company.companyName} logo`} style={{ width: "150px", backgroundColor: 'white' }} />
        </div>
        <div className="col-md-9">
          <h3 className="mb-0 fw-bold">{company.companyName}</h3>
          <p className="text-muted mb-0">{company.exchange}</p>
          <p className="text-muted mb-0">Price: ${company.price}</p>
          <p>
            {showFullDescription ? company.description : `${company.description.slice(0, 100)}...`}
            <button className="btn btn-link p-0 ms-2" onClick={handleViewMore}>
              {showFullDescription ? 'View Less' : 'View More'}
            </button>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h5 className="fw-bold">Company Details</h5>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CEO: {company.ceo}</td>
              <td>Country: {company.country}</td>
              <td>Sector: {company.sector}</td>
              <td>Industry: {company.industry}</td>
            </tr>
            <tr>
              <td>Market Cap: ${company.mktCap.toLocaleString()}</td>
              <td>Volume Average: {company.volAvg.toLocaleString()}</td>
              <td>Beta: {company.beta}</td>
              <td>Last Dividend: {company.lastDiv}</td>
            </tr>
            <tr>
              <td>Range: {company.range}</td>
              <td>Changes: {company.changes}</td>
              <td>DCF: {company.dcf}</td>
              <td>DCF Difference: {company.dcfDiff}</td>
            </tr>
            <tr>
              <td>CUSIP: {company.cusip}</td>
              <td>ISIN: {company.isin}</td>
              <td>Website: <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></td>
              <td>IPO Date: {company.ipoDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDetails;
