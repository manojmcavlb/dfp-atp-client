import React, { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEye } from 'react-icons/fa';
import ViewReport from '../ViewReport/ViewReport';
import './styles.css';

const ReportHistory = () => {
  const initialReports = [
    { date: '10 October 2025 11:00:00', testType: 'Production', productType: 'Remote Head' },
    { date: '10 October 2025 09:10:22', testType: 'Production', productType: 'Remote Head' },
    { date: '09 October 2025 08:33:00', testType: 'Customized', productType: 'Remote Head' },
    { date: '08 October 2025 11:22:45', testType: 'Production', productType: 'IoT Gateway' },
    { date: '07 October 2025 14:06:00', testType: 'Production', productType: 'Remote Head' },
    { date: '07 October 2025 18:30:45', testType: 'Production', productType: 'IoT Gateway' },
    { date: '06 October 2025 11:04:50', testType: 'Production', productType: 'IoT Gateway' },
    { date: '06 October 2025 08:08:30', testType: 'Production', productType: 'IoT Gateway' },
    { date: '04 October 2025 13:20:43', testType: 'Production', productType: 'Remote Head' },
  ];

  const [reports, setReports] = useState(initialReports);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  const [selectedReport, setSelectedReport] = useState(null);

  const sortedReports = useMemo(() => {
    let sortableItems = [...reports];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [reports, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort />;
    }
    if (sortConfig.direction === 'ascending') {
      return <FaSortUp />;
    }
    return <FaSortDown />;
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseReport = () => {
    setSelectedReport(null);
  };

  return (
    <div className="page-bg report-history-container">
      <main className="page-wrap">
        <h3 className="report-history-title">Report History</h3>
        <table className="table-reports">
          <thead>
            <tr>
              <th onClick={() => requestSort('date')}>
                Date/Time {getSortIcon('date')}
              </th>
              <th onClick={() => requestSort('testType')}>
                Test Type {getSortIcon('testType')}
              </th>
              <th onClick={() => requestSort('productType')}>
                Product Type {getSortIcon('productType')}
              </th>
              <th>View Report</th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.map((report, index) => (
              <tr key={index}>
                <td>{report.date}</td>
                <td>{report.testType}</td>
                <td>{report.productType}</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleViewReport(report)}>
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ViewReport report={selectedReport} onClose={handleCloseReport} />
      </main>
    </div>
  );
};

export default ReportHistory;