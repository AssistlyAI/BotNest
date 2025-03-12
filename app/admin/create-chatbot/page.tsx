import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateChatBot() {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row bg-white p-10 rounded-md m-10">
      <Avatar seed="Virtual Chatbot" className="w-12 h-12 mr-2" />
      <div>
        <h1 className="text-xl lg:text-3xl font-semobold">Create</h1>
        <h2 className="font-light">
          Create a new chatbot for the conversation to assist you.
        </h2>
        <form>
          <Input placeholder="Chatbot Name" />
        </form>
        <Button className="p-10 mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          Create Chatbot
        </Button>
      </div>
    </div>
  );
}

export default CreateChatBot;
