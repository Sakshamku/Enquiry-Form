import React from "react";
import { Button, Table } from "react-bootstrap";

const EnquiryTable = ({ enquiries, onEdit, onDelete }) => (
  <div className="table-responsive">
    <Table hover responsive bordered className="enquiry-table mb-0">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {enquiries.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.message}</td>
            <td className="table-actions">
              <Button
                size="sm"
                variant="outline-warning"
                onClick={() => onEdit(item)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(item._id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default EnquiryTable;
