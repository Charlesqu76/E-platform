import { useAppDispatch, useAppSelector } from "@/store/retailer";
import { setMode, setModifyData, setOpen } from "@/store/retailer";
import { EMode } from "@/type/retailer";
import { Button, Popconfirm, Table, TableProps } from "antd";

const ProductTable = () => {
  const { productList } = useAppSelector((state) => state.retailer);
  const dispatch = useAppDispatch();
  const clickEdit = (data: any) => {
    dispatch(setMode(EMode.EDIT));
    dispatch(setOpen(true));
    dispatch(setModifyData(data));
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
    { title: "rate", dataIndex: "rate", sorter: true },
    {
      title: "releaseDate",
      dataIndex: "releaseDate",
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

          <Popconfirm
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
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table rowKey={"id"} dataSource={productList} columns={columns} />
    </div>
  );
};

export default ProductTable;
