import { useRetailer } from "@/store/retailer";
import { EMode } from "@/type/retailer";
import { Button, Table, TableProps } from "antd";
import dayjs from "dayjs";

const ProductTable = () => {
  const { setMode, setOpen, setModifyData, products } = useRetailer(
    (state) => state
  );

  const clickAdd = () => {
    setModifyData({} as any);
    setMode(EMode.ADD);
    setOpen(true);
  };

  const clickEdit = (data: any) => {
    setMode(EMode.EDIT);
    setModifyData(data);
    setOpen(true);
  };

  const columns: TableProps["columns"] = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      filtered: true,
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      sorter: true,
    },
    { title: "rate", dataIndex: "ratings", sorter: true },
    {
      title: "releaseDate",
      dataIndex: "release_date",
      render: (v) => <span>{dayjs(v).format("YYYY-MM-DD")}</span>,
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
            onClick={() => clickEdit(record)}
          >
            EDIT
          </Button>

          {/* <Popconfirm
            title={undefined}
            description="Are you sure to delete this item?"
            // onConfirm={confirm}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" color="danger" variant="filled">
              DElETE
            </Button>
          </Popconfirm> */}
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={clickAdd}>
          ADD
        </Button>
      </div>
      <Table rowKey={"id"} dataSource={products} columns={columns} />
    </div>
  );
};

export default ProductTable;
