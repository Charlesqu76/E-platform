import { Button, Table, TableProps } from "antd";

const ProductTable = () => {
  const columns: TableProps["columns"] = [
    {
      title: "ID",
      key: "ID",
    },
    {
      title: "name",
      key: "name",
    },
    {
      title: "description",
      key: "description",
      filtered: true,
    },
    {
      title: "price",
      key: "price",
    },
    {
      title: "quantity",
      key: "quantity",
      sorter: true,
    },
    {
      title: "releaseDate",
      key: "releaseDate",
    },
    {
      title: "operation",
      render: (value, record, index) => (
        <div>
          <Button
            className="mr-1"
            size="small"
            color="primary"
            variant="filled"
          >
            EDIT
          </Button>
          <Button
            className="mr-1"
            size="small"
            color="default"
            variant="filled"
          >
            DISABLE
          </Button>
          <Button size="small" color="danger" variant="filled">
            DEl
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table rowKey={"ID"} dataSource={[{ ID: "1" }]} columns={columns} />
    </div>
  );
};

export default ProductTable;
