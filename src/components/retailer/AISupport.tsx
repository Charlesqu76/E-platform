import { Button, Drawer } from "antd";
import ChatInterface from "../Chat";
import { useRetailer } from "@/store/r";

const AISupport = () => {
  const { open, setOpen } = useRetailer((state) => state);

  return (
    <div className="text-right mb-2">
      <Button className="" type="primary" onClick={() => setOpen(true)}>
        AI Support
      </Button>
      <Drawer
        title="AI Support"
        onClose={() => setOpen(false)}
        open={open}
        maskClosable={false}
        width={"70%"}
      >
        <ChatInterface />
      </Drawer>
    </div>
  );
};

export default AISupport;
