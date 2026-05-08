// Export utilities for downloading data

export function exportToCSV(data, filename, headers) {
  // Convert data to CSV format
  const csvRows = [];
  
  // Add header row
  csvRows.push(headers.join(","));
  
  // Add data rows
  data.forEach(row => {
    const values = headers.map(header => {
      const key = header.toLowerCase().replace(/\s+/g, "");
      const value = row[key] || row[header] || "";
      // Escape quotes and wrap in quotes if contains comma
      const escaped = String(value).replace(/"/g, '""');
      return escaped.includes(",") ? `"${escaped}"` : escaped;
    });
    csvRows.push(values.join(","));
  });
  
  // Create blob and download
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportFarmData(farms) {
  const headers = ["Name", "Location", "Distance", "Status", "Moisture", "Temperature", "pH"];
  const data = farms.map(farm => ({
    name: farm.name,
    location: farm.location,
    distance: farm.distance,
    status: farm.status,
    moisture: farm.moisture,
    temperature: farm.temp,
    ph: farm.ph
  }));
  exportToCSV(data, "farm_data", headers);
}

export function exportAlertData(alerts) {
  const headers = ["Title", "Farm", "Type", "Message", "Time", "Status"];
  const data = alerts.map(alert => ({
    title: alert.title,
    farm: alert.farm,
    type: alert.type,
    message: alert.message,
    time: alert.time,
    status: alert.read ? "Read" : "Unread"
  }));
  exportToCSV(data, "alerts_data", headers);
}

export function exportReportData(stats, period) {
  const headers = ["Metric", "Value", "Change", "Period"];
  const data = stats.map(stat => ({
    metric: stat.title,
    value: stat.value,
    change: stat.change,
    period: period
  }));
  exportToCSV(data, "report_data", headers);
}

// Generate PDF-like print view
export function printReport(reportData) {
  const printWindow = window.open("", "_blank");
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Hydroponic Report - ${new Date().toLocaleDateString()}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #2c3e50; border-bottom: 2px solid #4facfe; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f5f7fa; }
        .metric { color: #4facfe; }
        .value { font-weight: bold; }
        .footer { margin-top: 30px; font-size: 12px; color: #7f8c8d; }
      </style>
    </head>
    <body>
      <h1>Hydroponic Analytics Report</h1>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          ${reportData.map(item => `
            <tr>
              <td>${item.title}</td>
              <td class="value">${item.value}</td>
              <td class="metric">${item.change}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <div class="footer">
        <p>Hydroponic Smart Dashboard - Automated Report</p>
      </div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
}