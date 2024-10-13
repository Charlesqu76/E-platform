import { useAppDispatch, useAppSelector } from "@/store";
import { setOpen } from "@/store/retailer";
import { Button, Drawer, Form, FormProps, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";

const { Item } = Form;

type FieldType = {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
};

const EditProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { open, modifyData, mode } = useAppSelector((state) => state.retailer);
  const dispatch = useAppDispatch();
  const clickButton: FormProps<FieldType>["onFinish"] = (value) => {
    setLoading(true);
    try {
      dispatch(setOpen(false));
    } finally {
      setLoading(false);
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
      onClose={() => dispatch(setOpen(false))}
      width={"60%"}
      title={mode.toUpperCase()}
      destroyOnClose
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
          <Button type="primary" htmlType="submit" loading={loading}>
            CONFIRM
          </Button>
        </Item>
      </Form>
    </Drawer>
  );
};

export default EditProduct;
