import {
  addProduct,
  getAIsearch,
  getProducts,
  modifyProduct,
} from "@/fetch/retailer";
import { useRetailer } from "@/store/retailer";
import { EMode, TAddData } from "@/type/retailer";
import {
  Button,
  Drawer,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
} from "antd";
import { useEffect, useState } from "react";

const { Item } = Form;

const EditProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [sLoading, setSLoading] = useState(false);
  const { open, modifyData, mode, setOpen, setProducts } = useRetailer(
    (state) => state
  );
  const clickButton: FormProps<TAddData>["onFinish"] = async (value) => {
    setLoading(true);
    try {
      if (mode === EMode.ADD) {
        await addProduct(value);
      }
      if (mode === EMode.EDIT) {
        await modifyProduct({ ...modifyData, ...value });
      }
      setProducts(await getProducts());
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const clickAisearch = async () => {
    try {
      setSLoading(true);
      const name = form.getFieldValue("name");
      if (!name) {
        message.error("name is required");
        return;
      }
      const data = await getAIsearch({ name: name });
      console.log(data);
    } finally {
      setSLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue(modifyData);
    } else {
      form.resetFields();
    }
  }, [open]);

  return (
    <Drawer
      open={open}
      maskClosable={false}
      onClose={() => setOpen(false)}
      width={"60%"}
      title={mode.toUpperCase()}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        onFinish={clickButton}
        requiredMark={false}
      >
        <Item label="name" name={"name"} rules={[{ required: true }]}>
          <Input />
        </Item>
        <Item label="description" name={"description"}>
          <Input.TextArea rows={4} />
        </Item>
        <Item label="price" name={"price"} rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Item>
        <Item label="quantity" name={"quantity"} rules={[{ required: true }]}>
          <InputNumber min={1} />
        </Item>
        <Item className="flex justify-end">
          <Button className="mr-2" onClick={clickAisearch} loading={sLoading}>
            AI Search
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            CONFIRM
          </Button>
        </Item>
      </Form>
    </Drawer>
  );
};

export default EditProduct;
